import * as React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from './ui/button';
import { CarCard } from './CarCard';
import { cn } from '~/lib/utils';
import { CarDto } from '~/lib/morent-api';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/types/NavigationProps';
import { useCars, UseCarsOptions } from '~/hooks/useCars';
import { Loading } from './Loading';
import { v4 as uuidv4 } from 'uuid'; // Add uuid for unique keys

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarListProps {
  title?: string;
  options?: UseCarsOptions;
  layout?: 'vertical' | 'horizontal' | 'grid';
  identifier?: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  showViewAll?: boolean;
  viewAllLink?: `/${string}`;
  containerClassName?: string;
  listHeaderComponent?: any;
  listFooterComponent?: any;
}

const DefaultOptions: UseCarsOptions = {
  page: 1,
  pageSize: 10,
};

export function CarList({
  title,
  options = DefaultOptions,
  layout = 'horizontal',
  identifier = '',
  favorites,
  onToggleFavorite,
  showViewAll = true,
  containerClassName,
  listHeaderComponent = () => <View></View>,
  listFooterComponent = () => <View></View>,
}: CarListProps) {
  const isHorizontal = layout === 'horizontal';
  const isGrid = layout === 'grid';
  const { navigate } = useNavigation<NavigationProps>();

  const [allCars, setAllCars] = React.useState<CarDto[]>([]);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const flatListRef = React.useRef<FlatList>(null);
  const instanceId = React.useMemo(() => identifier || uuidv4(), [identifier]); // Unique ID for this component instance

  const { cars, loading, error, setOptions, loadMore, hasMore } = useCars({
    ...options,
    page: 1,
    pageSize: options.pageSize || DefaultOptions.pageSize,
  });

  React.useEffect(() => {
    if (!loading) {
      if (cars.length === 0 && allCars.length === 0) {
        console.log('No cars to display');
        return;
      }

      const existingIds = new Set(allCars.map(car => car.id));
      const uniqueNewCars = cars.filter(car => !existingIds.has(car.id));

      if (uniqueNewCars.length !== cars.length) {
        console.warn(`Duplicate car IDs detected: ${cars.length - uniqueNewCars.length} duplicates`);
      }

      if (allCars.length === 0 || isLoadingMore === false) {
        console.log(`Initial load or filter change: setting ${uniqueNewCars.length} cars`);
        setAllCars(uniqueNewCars);
        setIsLoadingMore(false);

        if (flatListRef.current && !isHorizontal) {
          flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
      } else if (uniqueNewCars.length > 0) {
        console.log(`Appending ${uniqueNewCars.length} new cars`);
        setAllCars(prevCars => [...prevCars, ...uniqueNewCars]);
        setIsLoadingMore(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  }, [cars, loading]);

  React.useEffect(() => {
    console.log('Filter options changed, resetting cars');
    setOptions({
      ...options,
      page: 1,
    });
    setAllCars([]);
    setIsLoadingMore(false);
  }, [
    options.brand,
    options.type,
    options.capacity,
    options.fuelType,
    options.gearbox,
    options.minPrice,
    options.maxPrice,
    options.rating,
    options.location,
    options.search,
    options.sort,
    options.pageSize,
  ]);

  const handleLoadMore = () => {
    if (!loading && hasMore && !isLoadingMore) {
      console.log('Loading more cars');
      setIsLoadingMore(true);
      loadMore();
    }
  };

  const renderHeader = () => {
    if (!title) return null;

    return (
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-black text-primary">{title}</Text>
        {showViewAll && (
          <Button variant="secondary" onPress={() => navigate("CategoryScreen")}>
            <Text className="font-black">View All</Text>
          </Button>
        )}
      </View>
    );
  };

  const renderFooter = () => {
    if (!isLoadingMore) return listFooterComponent;

    return (
      <View className="py-4 w-full items-center justify-center">
        <Loading size="small" />
      </View>
    );
  };

  return (
    <View className={containerClassName}>
      {renderHeader()}
      {loading && !error ? (
        <View className="flex-1 items-center justify-center">
          <Loading />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal={isHorizontal}
          numColumns={isGrid ? 2 : 1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={allCars}
          extraData={allCars.length}
          keyExtractor={(item, index) => `${instanceId}_${item.id}_${index}`}
          contentContainerClassName={cn(
            isHorizontal ? "gap-x-4 px-4" : isGrid ? "gap-4 px-4" : "gap-y-4 px-0 pb-40",
          )}
          columnWrapperClassName={isGrid ? "gap-x-4" : undefined}
          renderItem={({ item }) => (
            <View
              className={cn(
                isHorizontal ? "" : isGrid ? "flex-1" : "py-2",
                isGrid && "max-w-[50%]",
              )}
              style={isGrid ? { width: (SCREEN_WIDTH - 40) / 2 } : undefined}
            >
              <CarCard
                car={item}
                layout={isHorizontal ? "vertical" : isGrid ? "grid" : "horizontal"}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={() => onToggleFavorite(item.id)}
                onPressRent={() => navigate("DetailScreen", { carId: item.id })}
              />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          ListHeaderComponent={listHeaderComponent}
          ListFooterComponent={renderFooter()}
          key={isGrid ? 'grid' : isHorizontal ? 'horizontal' : 'vertical'}
        />
      )}

      {error && (
        <View className="p-4 bg-red-50 rounded-md my-2">
          <Text className="text-red-600">Error loading cars. Please try again.</Text>
        </View>
      )}

      {!loading && allCars.length === 0 && (
        <View className="p-4 items-center justify-center">
          <Text className="text-gray-500">No cars found matching your criteria.</Text>
        </View>
      )}
    </View>
  );
}
import * as React from 'react';
import { FlatList, Pressable, SafeAreaView, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { Link } from 'expo-router';
import { CarCard, CarCardProps } from './CarCard';
import { cn } from '~/lib/utils';
import { CarDto } from '~/lib/morent-api';
import { Button } from './ui/button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '~/types/TabParamList';
import { RootStackParamList } from '~/types/RootStackParamList';
import { NavigationProps } from '~/types/NavigationProps';
import { useCars, UseCarsOptions } from '~/hooks/useCars';
import { Loading } from './Loading';

interface CarListProps {
  title?: string;
  options?: UseCarsOptions;
  layout?: 'vertical' | 'horizontal';
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  showViewAll?: boolean;
  viewAllLink?: `/${string}`;
  containerClassName?: string;
  listHeaderComponent?: any
  listFooterComponent?: any
}

const DefaultOptions: UseCarsOptions = {
  page: 1,
  pageSize: 10,
};

export function CarList({
  title,
  options = DefaultOptions,
  layout = 'horizontal',
  favorites,
  onToggleFavorite,
  showViewAll = true,
  containerClassName,
  listHeaderComponent = () => <View></View>,
  listFooterComponent = () => <View></View>
}: CarListProps) {
  const isHorizontal = layout === 'horizontal';
  const { navigate } = useNavigation<NavigationProps>()

  const [currentPage, setCurrentPage] = React.useState(options.page! || DefaultOptions.page!);
  const [allCars, setAllCars] = React.useState<CarDto[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const currentOptions = React.useMemo(() => ({
    ...options,
    page: currentPage,
    pageSize: options.pageSize || DefaultOptions.pageSize,
  }), [options, currentPage]);

  const { cars, loading, setOptions } = useCars();

    // Initial load and when filters change
  React.useEffect(() => {
    // Reset state when options (filter) changes from parent
    setCurrentPage(1);
    setAllCars([]);
    setHasMore(true);
    
    setOptions({
      ...options,
      page: 1
    });
  }, [
    // Only include filter properties, not pagination properties
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
    options.pageSize
    // Don't include options.page here as it would cause an infinite loop
  ]);

  // Process fetched data
  React.useEffect(() => {
    if (!loading) {
      if (cars.length === 0) {
        // No more cars to load
        setHasMore(false);
      } else if (currentPage === 1) {
        // First page, replace all cars
        setAllCars(cars);
      } else {
        // Append new cars, checking for duplicates by ID
        const newCarIds = new Set(cars.map(car => car.id));
        const uniqueExistingCars = allCars.filter(car => !newCarIds.has(car.id));
        setAllCars([...uniqueExistingCars, ...cars]);
      }
      setIsLoadingMore(false);
    }
  }, [cars, loading]);

  const handleLoadMore = () => {
    if (!loading && !isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      // Update options with new page
      setOptions(prevOptions => ({
        ...prevOptions,
        page: nextPage
      }));
    }
  };

  const renderHeader = () => {
    if (!title) return null;

    return (
      <View className={"flex-row justify-between items-center mb-4 "}>
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
      <View className="py-4">
        <Loading size="small" />
      </View>
    );
  }; 

  if (loading && allCars.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Loading />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className={containerClassName}>
      {renderHeader()}
      <FlatList
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={allCars}
        keyExtractor={item => item.id}
        contentContainerClassName={cn(
          isHorizontal ? "gap-x-4" : "gap-y-4 mb-20 pb-20",
          isHorizontal ? "px-4" : "px-0"
        )}
        renderItem={({ item }) => (
          <View className={isHorizontal ? "" : "py-2"}>
            <CarCard
              car={item}
              layout={isHorizontal ? "vertical" : "horizontal"}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => onToggleFavorite(item.id)}
            />
          </View>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
}
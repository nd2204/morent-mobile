import * as React from 'react';
import { FlatList, Pressable, View } from 'react-native';
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
  const { cars, loading, setOptions } = useCars();
  const [ page, setPage ] = React.useState(options.page ?? DefaultOptions.page!)

  const data = React.useMemo(() => {

  }, [cars])

  React.useEffect(() => {
    if (options) {
      setOptions(options)
    }
  }, [options])

  React.useEffect(() => {
    setOptions(options => options = {
      ...options,
      page: page + 1
    })
    if (!loading) {
      console.log(page, cars.length)
    }
  }, [page])

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

  const handleEndReached = () => {
    if (!loading) {
      setPage(p => p + 1)
    }
  }

  return (
    <View className={containerClassName}>
      {renderHeader()}
      <FlatList
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cars}
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
        onEndReached={handleEndReached}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
      />
    </View>
  );
}
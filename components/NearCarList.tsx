import * as React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { CarDto } from '~/lib/morent-api';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/types/NavigationProps';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarListProps {
  title?: string;
  identifier?: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  showViewAll?: boolean;
  viewAllLink?: `/${string}`;
  containerClassName?: string;
  listHeaderComponent?: any;
  listFooterComponent?: any;
}


export function NearCarList({
}: CarListProps) {
  const { navigate } = useNavigation<NavigationProps>();

  const [allCars, setAllCars] = React.useState<CarDto[]>([]);

}
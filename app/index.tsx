import * as React from 'react';
import { ActivityIndicator, SectionList, Text, View } from 'react-native';
import { Header } from '~/components/Header';
import { Hero } from '~/components/Hero';
import { PickUpDropOff } from '~/components/PickUpDropOff';
import { CarList } from '~/components/CarList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCars } from '~/hooks/useCars';
import { CarDto } from '~/lib/morent-api';
import { CarCardProps } from '~/components/CarCard';
import { Loading } from '~/components/Loading';

export default function Screen() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);
  
  const { cars, loading, error } = useCars({
    pageSize: 10
  });

  if (loading) {
    return (
      <Loading/>
    )
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleFilterPress = () => {
    setIsFilterVisible(!isFilterVisible);
    // TODO: Implement filter modal or dropdown
    console.log('Filter pressed');
  };

  const SECTIONS = [
    { type: 'hero', data: [null] },
    { type: 'pickUpDropOff', data: [null] },
    { type: 'popular', data: [cars.slice(0, 3)]},
    { type: 'recommended', data: [cars.slice(3)] }
  ];

  const renderItem = ({ item, section }: any) => {
    switch (section.type) {
      case 'hero':
        return <Hero />;
      case 'pickUpDropOff':
        return <PickUpDropOff />;
      case 'popular':
        if (loading)
          return <Loading/>
        if (cars.length > 0)
          return (
            <CarList
              title="Popular Cars"
              cars={item}
              layout="horizontal"
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              containerClassName="py-4 mx-4"
            />
          );
      case 'recommended':
        if (cars.length > 0)
          return (
            <CarList
              title="Recommended Cars"
              cars={item}
              layout="vertical"
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              containerClassName="py-4 mb-4 mx-4"
            />
          );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        onPressMenu={() => console.log('Menu pressed')}
        onPressAvatar={() => console.log('Avatar pressed')}
        onFilterPress={handleFilterPress}
        showSearchBar={true}
      />
      <SectionList
        sections={SECTIONS}
        renderItem={renderItem}
        renderSectionHeader={() => null}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}


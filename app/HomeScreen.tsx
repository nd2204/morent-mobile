import * as React from 'react';
import { SectionList, View } from 'react-native';
import { Hero } from '~/components/Hero';
import { PickUpDropOff } from '~/components/PickUpDropOff';
import { CarList } from '~/components/CarList';
import { useCars, UseCarsOptions } from '~/hooks/useCars';
import { Loading } from '~/components/Loading';

export default function HomeScreen() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);
  
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

  const popularOption : UseCarsOptions = {
    page: 2,
    pageSize: 5
  }

  const recomendedOption : UseCarsOptions = {
    pageSize: 10
  }

  const SECTIONS = [
    { type: 'hero', data: [null] },
    { type: 'pickUpDropOff', data: [null] },
    { type: 'popular', data: [popularOption]},
    { type: 'recommended', data: [recomendedOption] }
  ];

  const renderItem = ({ item, section }: any) => {
    switch (section.type) {
      case 'hero':
        return <Hero />;
      case 'pickUpDropOff':
        return <PickUpDropOff />;
      case 'popular':
        return (
          <CarList
            title="Popular Cars"
            layout="horizontal"
            options={item}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            containerClassName="py-4"
          />
        );
      case 'recommended':
        return (
          <CarList
            title="Recommended Cars"
            layout="vertical"
            options={item}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            containerClassName="py-4 mb-4"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 mt-6 px-6 bg-background">
      <SectionList
        className='gap-y-4'
        sections={SECTIONS}
        renderItem={renderItem}
        renderSectionHeader={() => null}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


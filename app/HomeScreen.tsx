import * as React from 'react';
import { SectionList, Text, View } from 'react-native';
import { Hero } from '~/components/Hero';
import { CarList } from '~/components/CarList';
import { useCars, UseCarsOptions } from '~/hooks/useCars';
import Map from '~/components/Map';
import { useLocationStore } from '~/store';
import * as Location from 'expo-location'

export default function HomeScreen() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission ] = React.useState(false);

  React.useEffect(() => {
    const requestLocation = async() => {
      let { status } = await Location.getForegroundPermissionsAsync()
      if (status !== 'granted') {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`
      })
    };

    requestLocation();
  }, [])


  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const popularOption: UseCarsOptions = {
    page: 2,
    pageSize: 5
  }

  const recomendedOption: UseCarsOptions = {
    pageSize: 10
  }

  const SECTIONS = [
    { type: 'hero', data: [null] },
    { type: 'location', data: [null] },
    { type: 'popular', data: [popularOption] },
    { type: 'recommended', data: [recomendedOption] }
  ];

  const renderItem = ({ item, section }: any) => {
    switch (section.type) {
      case 'hero':
        return <Hero />;
      case 'location':
        return (
          <>
            <View className={"flex-row justify-between items-center mb-4 "}>
              <Text className="text-2xl font-black text-primary">Your current location</Text>
            </View>
            <View className="h-[300px] overflow-hidden rounded-xl">
              <Map />
            </View>
          </>
        )
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


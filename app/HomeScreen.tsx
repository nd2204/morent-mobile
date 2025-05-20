import * as React from 'react';
import { SectionList, Text, TouchableOpacity, View } from 'react-native';
import { Hero } from '~/components/Hero';
import { CarList } from '~/components/CarList';
import { useCars, UseCarsOptions } from '~/hooks/useCars';
import Map from '~/components/Map';
import { useLocationStore } from '~/store';
import * as Location from 'expo-location'
import useLocation from '~/services/LocationService';
import { Card, CardContent, CardTitle } from '~/components/ui/card';
import { LocateIcon, MapPin } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~/types/NavigationProps';
import { Button }  from '~/components/ui/button'

export default function HomeScreen() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const [isFilterVisible, setIsFilterVisible] = React.useState(false);

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission ] = React.useState(false);
  const { getCurrentLocation } = useLocation();
  const { navigate } = useNavigation<NavigationProps>();

  React.useEffect(() => {
    const requestLocation = async() => {
      let location = await getCurrentLocation();
      if (location == null) return;

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`
      })

      console.log(JSON.stringify(location), address)
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
          <Card className='rounded-2xl overflow-hidden'>
            <View className='flex-row justify-start items-center my-4 ml-4'>
              <MapPin />
              <Text className='text-xl font-semibold'> Your current location</Text>
            </View>
            <CardContent className="h-[300px] border-top">
              <Map />
            </CardContent>
            <Button variant="secondary" onPress={() => navigate("SelectNearCarScreen")}>
              <Text>See all cars near you</Text>
            </Button>
          </Card>
        )
      case 'popular':
        return (
          <CarList
            title="Popular Cars"
            layout="horizontal"
            options={item}
            identifier="popular"
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            containerClassName="py-4"
          />
        );
      case 'recommended':
        return (
          <CarList
            title="Recommended Cars"
            layout="horizontal"
            options={item}
            identifier="recommended"
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


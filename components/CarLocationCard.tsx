import * as React from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { Fuel, GaugeCircle, MapPin, Users } from 'lucide-react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { cn } from '~/lib/utils';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { CarLocationDto } from '~/lib/morent-api';
import * as Location from 'expo-location'

// Register icons with NativeWind
[MapPin, Fuel, GaugeCircle, Users].forEach(iconWithClassName);

export interface CarLocationCardProps {
  car: CarLocationDto;
  layout?: 'vertical' | 'horizontal' | 'grid';
  onPressCard?: () => void;
  onPressRent?: () => void;
  onToggleFavorite?: () => void;
}

export function CarLocationCard({
  car,
  layout = 'vertical',
  onPressCard,
  onPressRent,
  onToggleFavorite,
}: CarLocationCardProps) {
  const isHorizontal = layout === 'horizontal';
  const [ carAddress, setCarAddress ] = React.useState<string>('N/a');

  const handlePressRent = () => {
    onPressRent && onPressRent();
  };

  React.useEffect(() => {
    const getCarAddress = async () => {
      const address = await Location.reverseGeocodeAsync({
        latitude: car.latitude,
        longitude: car.longitude
      });
      if (address[0].city) {
        setCarAddress(`${address[0].city}, ${address[0].district}`);
      }
      console.log(address)
    }

    getCarAddress();
  }, [car.carId])


  const renderTitle = () => {
    return (
      <View className="flex-row items-start justify-between">
        <View>
          <Text className="text-xl font-black">{car.title}</Text>
          <Text className="text-md font-semibold text-muted-foreground mt-1">{car.carModel.type}</Text>
        </View>
      </View>
    )
  }

  const renderFeature = () => {
    return (
      <View className={cn(
        'flex-col flex-wrap justify-center gap-2'
      )}>
        <View className='flex-row gap-3'>
          <View className="flex-row items-center gap-2">
            <Fuel size={20} className="text-muted-foreground" />
            <Text className="text-md text-muted-foreground font-semibold">{car.carModel.fuelTankCapacity}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Users size={20} className="text-muted-foreground" />
            <Text className="text-md text-muted-foreground font-semibold">{car.carModel.seatCapacity}</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <GaugeCircle size={20} className="text-muted-foreground" />
          <Text className="text-md text-muted-foreground font-semibold">{car.carModel.gearBox}</Text>
        </View>
      </View>
    )
  }

  return (
    <Card className={cn(
      'overflow-hidden bg-card flex-column flex-1 p-5 dark:bg-[#111111]',
      isHorizontal
        ? 'min-h-[180px]'
        : 'min-w-[280px]'
    )}>
      <TouchableOpacity
        className='flex-row items-center'
        onPress={onPressCard}
      >
        <View className='flex-1'>
          {renderTitle()}
          <View className='h-4' />
          {renderFeature()}
          <View className='h-4' />
          <View className={cn('flex-row mr-5')}>
            <View className="flex-row justify-end items-center">
              <MapPin size={20} className='text-muted-foreground'/>
              <Text className="text-md text-muted-foreground font-semibold ml-2">{carAddress}</Text>
            </View>
          </View>
        </View>


        <View className=''>
          <Button variant="default" className="h-full px-4" size="default" onPress={handlePressRent}>
            <Text className="text-primary-foreground font-semibold font-black">Rent Now</Text>
          </Button>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
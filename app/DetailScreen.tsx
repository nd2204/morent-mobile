import * as React from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { CarList } from '~/components/CarList';
import { ReviewsList } from '~/components/Review';
import { ChevronLeft, Fuel, GaugeCircle, Users } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { useCars } from '~/hooks/useCars';
import { CarDetailDto, CarDto } from '~/lib/morent-api';
import { useCarDetail } from '~/hooks/useCarDetail';
import { useColorScheme } from '~/lib/useColorScheme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '~/types/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '~/types/TabParamList';
import { useAuth } from '~/hooks/useAuth';
import { NavigationProps } from '~/types/NavigationProps';


// Register icons with NativeWind
[ChevronLeft, Fuel, GaugeCircle, Users].forEach(iconWithClassName);

export default function DetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'DetailScreen'>>();
  const { navigate } = useNavigation<NavigationProps>();
  const { car, loading } = useCarDetail(params.carId);
  const { isAuthenticated } = useAuth();
  const { colorScheme } = useColorScheme();
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const model = car?.carModel;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handlePaymentPress = () => {
    if (isAuthenticated)
      navigate(
        'PaymentScreen',
        {
          car: car!,
          totalCost: car?.pricePerDay!
        }
      )
    else
      navigate('AuthScreen')
  }

  console.log(JSON.stringify(car, null, 2))

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center align-center bg-background">
        <ActivityIndicator className="fg-background" size="large" color={colorScheme == "dark" ? "#fff" : "#000"} />
      </SafeAreaView>
    );
  }

  if (!car) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <Text>Car not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className='mx-2' showsVerticalScrollIndicator={false}>
        {/* Car Image */}
        <View className="px-4 pb-4">
          <Card className="overflow-hidden bg-card p-6">
            <Image
              source={{ uri: car.images[0].url }}
              className="w-full h-48"
              resizeMode="contain"
              accessibilityLabel={`Image of ${car.title}`}
            />
          </Card>
        </View>

        {/* Car Info */}
        <View className="px-4">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-2xl font-black">{car.title}</Text>
              <Text className="text-lg text-muted-foreground">{car.carModel.type}</Text>
            </View>
            <View className="items-end">
              <Text className="text-2xl font-black">${car.pricePerDay}</Text>
              <Text className="text-muted-foreground">/day</Text>
            </View>
          </View>

          <Text className="text-base text-muted-foreground mb-6">
            {car.description}
          </Text>

          <Card className="bg-card p-4 mb-6">
            <Text className="text-lg font-semibold mb-4">Specifications</Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Fuel size={24} className="text-muted-foreground mb-2" />
                <Text className="text-muted-foreground">{model?.fuelTankCapacity}</Text>
              </View>
              <View className="items-center">
                <GaugeCircle size={24} className="text-muted-foreground mb-2" />
                <Text className="text-muted-foreground">{model?.gearBox}</Text>
              </View>
              <View className="items-center">
                <Users size={24} className="text-muted-foreground mb-2" />
                <Text className="text-muted-foreground">{model?.seatCapacity}</Text>
              </View>
            </View>
          </Card>

          {/* Reviews Section */}
          <ReviewsList
            carId={car.id}
            className="mt-6"
          />

          <CarList
            title="Recent Cars"
            layout="horizontal"
            identifier='detail_recent'
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            containerClassName="mt-6"
          />

          <CarList
            title="Recommended Cars"
            layout="horizontal"
            identifier='detail_recommend'
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            containerClassName="mt-6 mb-4"
          />
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="p-4 border-t border-border bg-background">
        <Button
          className="w-full"
          onPress={handlePaymentPress}
        >
          <Text className="text-primary-foreground font-semibold">
          { isAuthenticated ? "Proceed to Payment" : "Login to start renting" }
          </Text>

        </Button>
      </View>
    </SafeAreaView>
  );
}
import * as React from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

// Register icons with NativeWind
[ChevronLeft, Fuel, GaugeCircle, Users].forEach(iconWithClassName);

const MOCK_REVIEWS = {
  '1': [
    {
      rating: 5,
      comment: "Amazing car! The performance is unmatched and the service was excellent. Would definitely rent again.",
      userName: "Alex Thompson",
      userImage: "https://i.pravatar.cc/150?u=alex",
      date: "March 15, 2024"
    },
    {
      rating: 5,
      comment: "Best supercar experience ever! The Koenigsegg exceeded all my expectations.",
      userName: "Sarah Chen",
      userImage: "https://i.pravatar.cc/150?u=sarah",
      date: "March 10, 2024"
    }
  ],
  '2': [
    {
      rating: 4,
      comment: "The GT-R is a beast! Great handling and power. Rental process was smooth.",
      userName: "Mike Johnson",
      userImage: "https://i.pravatar.cc/150?u=mike",
      date: "March 20, 2024"
    }
  ],
  '3': [
    {
      rating: 4,
      comment: "Perfect family SUV. Spacious and comfortable for long trips.",
      userName: "Emily Parker",
      userImage: "https://i.pravatar.cc/150?u=emily",
      date: "March 18, 2024"
    }
  ],
  '4': [
    {
      rating: 4,
      comment: "Very reliable SUV with great features. Fuel efficient too!",
      userName: "David Wilson",
      userImage: "https://i.pravatar.cc/150?u=david",
      date: "March 12, 2024"
    }
  ],
  '5': [
    {
      rating: 4,
      comment: "Good car for city driving. Compact yet spacious inside.",
      userName: "Lisa Anderson",
      userImage: "https://i.pravatar.cc/150?u=lisa",
      date: "March 8, 2024"
    }
  ]
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { car, loading } = useCarDetail(id as string);
  const { colorScheme } = useColorScheme();
  const [favorites, setFavorites] = React.useState<string[]>([]);
  const model = car?.carModel;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };
  
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
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full mr-4"
            onPress={() => router.navigate("/")}
          >
            <ChevronLeft size={24} className="text-foreground" />
          </Button>
          <Text className="text-xl font-bold text-primary">Car Details</Text>
        </View>

        {/* Car Image */}
        <View className="p-4">
          <Card className="overflow-hidden bg-card p-6">
            <Image
              source={{uri: car.images[0].url}}
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
              <Text className="text-2xl font-bold">{car.title}</Text>
              <Text className="text-lg text-muted-foreground">{car.carModel.type}</Text>
            </View>
            <View className="items-end">
              <Text className="text-2xl font-bold">${car.pricePerDay}</Text>
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
            reviews={MOCK_REVIEWS[id as keyof typeof MOCK_REVIEWS] || []}
            className="mt-6"
          />

          {/* <CarList
            title="Recent Cars"
            cars={RECENT_CARS}
            layout="horizontal"
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            containerClassName="mt-6"
          />

          <CarList
            title="Recommended Cars"
            cars={RECOMMENDED_CARS}
            layout="horizontal"
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            containerClassName="mt-6 mb-4"
          /> */}
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="p-4 border-t border-border bg-background">
        <Button 
          className="w-full" 
          onPress={() => router.push({
            pathname: '/payment',
            params: {
              carId: car.id,
              total: car.pricePerDay
            }
          })}
        >
          <Text className="text-primary-foreground font-semibold">
            Proceed to Payment
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
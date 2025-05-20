import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card, CardContent, CardTitle } from '~/components/ui/card';
import { ChevronLeft, CreditCard } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '~/types/NavigationProps';
import { RootStackParamList } from '~/types/RootStackParamList';
import { Separator } from '~/components/ui/separator';
import { Rating } from '~/components/ui/rating';
import { StripeProvider } from '@stripe/stripe-react-native';
import { createApiClients } from '~/lib/api-client';
import LocationService from '~/services/LocationService';
import useLocation from '~/services/LocationService';
import LocationPicker from '~/components/LocationPicker';
import { useLocationStore } from '~/store';
import { DateRangePicker } from '~/components/DatePicker';
import { DateType } from 'react-native-ui-datepicker';
import { PaymentMethodDto } from '~/lib/morent-api';

// Register icons with NativeWind
[ChevronLeft, CreditCard].forEach(iconWithClassName);

const { paymentApi } = createApiClients();
const { userApi } = createApiClients();

export default function PaymentScreen() {
  const navigator = useNavigation<NavigationProps>();
  const { dropoffLatitude: destinationLatitude, dropoffLongitude: destinationLongitude } = useLocationStore();
  const [dateRange, setDateRange] = React.useState<{
    startDate: DateType | null;
    endDate: DateType | null;
  }>();
  const { car, totalCost } = useRoute<RouteProp<RootStackParamList, "PaymentScreen">>().params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [ paymentMethods, setPaymentMethods ] = React.useState<PaymentMethodDto[]>([]);

  React.useEffect(() => {
    const getPaymentMethods = async () => {
      const { status, data } = await paymentApi.apiPaymentsMethodsGet();
      setPaymentMethods(data);
    }

    getPaymentMethods();
  }, [])

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      const {status, data} = await userApi.apiUsersMeRentalsPost({
        createRentalRequest: {
          carId: car.id,
          pickupDate: dateRange?.startDate?.toLocaleString()!,
          dropoffDate: dateRange?.endDate?.toLocaleString()!,
          pickupLocation: {
            longitude: 0,
            latitude: 0
          },
          dropoffLocation: {
            longitude: 0,
            latitude: 0
          }
        }
      })
      // navigator.navigate("RentalDetailScreen", { rentalId: "", });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <View className="flex-1 bg-background mt-6">
        <ScrollView className="flex-1 px-4 mb-6">
          <Animated.View entering={FadeInDown.delay(200).springify()}
            className="gap-y-4">
            <Card className="p-6">
              <Text className="text-2xl font-black mb-2">Rental Summary</Text>
              <Text className="text-lg text-base mb-4">
                Price may change depend on the length of the rental and the price of your rental car.
              </Text>
              <View className="flex-row gap-x-4">
                <Card className='border-0 bg-accent p-4 flex-1 max-w-[200px]'>
                  <Image source={{ uri: car.images[0].url }}
                    className="w-full h-20 max-h-48"
                    resizeMode="contain"
                    accessibilityLabel="Featured car"
                  />
                </Card>
                <View className='flex-4 justify-center'>
                  <Text className="text-xl font-semibold">
                    {car.title}
                  </Text>
                  <Rating className='mt-3' rating={car.averageRating} />
                  <Text className="text-lg mt-3">
                    {car.reviewsCount < 1 ? "No reviews yet" : car.reviewsCount} reviews
                  </Text>
                </View>
              </View>
              <View className="h-2"/>
              <DateRangePicker onChange={() => { }} />
              <Separator className='my-6' />
              <View className="flex-row justify-between mb-2">
                <Text className="text-xl font-black">Total Rental Price</Text>
                <Text className="text-xl font-black">${totalCost.toFixed(2)}</Text>
              </View>
            </Card>
            <Card className='p-4'>
              <CardTitle>
                Choose your payment method
              </CardTitle>
              <CardContent className='flex-1 flex-row flex-wrap mt-4'>
                {
                  paymentMethods.map(m => (
                    <Button variant="outline" key={m.id} className='h-[200px] w-[100px] flex-1'>
                      <View>

                      </View>
                      <Image
                        source={{ uri: m.logoUrl }}
                        className="w-full h-full"
                        resizeMode="contain"
                      />
                    </Button>
                  ))
                }
              </CardContent>
            </Card>

          </Animated.View>
        </ScrollView>


        {/* Bottom Action */}
        <View className="p-4 border-t border-border bg-background">
          <Button
            className="w-full"
            onPress={handlePayment}
            disabled={isLoading}
          >
            <Text className="text-primary-foreground font-semibold">
              {isLoading ? 'Processing Payment...' : `Pay $${totalCost}`}
            </Text>
          </Button>
        </View>
      </View>
    </StripeProvider>
  );
}
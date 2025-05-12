import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Card } from '~/components/ui/card';
import { ChevronLeft, CreditCard } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps } from '~/types/NavigationProps';
import { RootStackParamList } from '~/types/RootStackParamList';
import { PickUpDropOff } from '~/components/PickUpDropOff';
import { Separator } from '~/components/ui/separator';
import { Rating } from '~/components/ui/rating';

// Register icons with NativeWind
[ChevronLeft, CreditCard].forEach(iconWithClassName);

export default function PaymentScreen() {
  const navigator = useNavigation<NavigationProps>();
  const { car, totalCost } = useRoute<RouteProp<RootStackParamList, "PaymentScreen">>().params;
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardName, setCardName] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      // navigator.navigate("RentalDetailScreen", { rentalId: "", });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const isFormValid = 
    cardNumber.replace(/\s/g, '').length === 16 &&
    cardName.length > 0 &&
    expiryDate.length === 5 &&
    cvv.length === 3;

  return (
    <View className="flex-1 bg-background mt-6">
      <ScrollView className="flex-1 px-4 mb-6">
        <Animated.View entering={FadeInDown.delay(200).springify()}
          className="gap-y-4">
          <Card className="p-6">
            <Text className="text-2xl font-black mb-2">Rental Summary</Text>
            <Text className="text-lg font-bold text-grey-500 mb-4">
              Price may change depend on the length of the rental and the price of your rental car.
            </Text>
            <View className="flex-row gap-x-4">
              <Card className='border-0 bg-accent p-4 flex-1'>
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
                <Rating className='mt-3' rating={car.averageRating}/>
                <Text className="text-lg mt-3">
                  {car.reviewsCount < 1 ? "No reviews yet" : car.reviewsCount}
                </Text>
              </View>
            </View>
            <Separator className='my-6' />
            <View className="flex-row justify-between mb-2">
              <Text className="text-xl font-black">Total Rental Price</Text>
              <Text className="text-xl font-black">${totalCost.toFixed(2)}</Text>
            </View>
          </Card>

          <PickUpDropOff />

          <Card className="p-6">
            <View className="flex-row items-center mb-6">
              <CreditCard size={24} className="text-primary mr-2" />
              <Text className="text-lg font-semibold">Card Information</Text>
            </View>

            <View className="gap-y-4">
              <View>
                <Text className="text-sm font-medium mb-2">Card Number</Text>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View>
                <Text className="text-sm font-medium mb-2">Cardholder Name</Text>
                <Input
                  placeholder="John Doe"
                  value={cardName}
                  onChangeText={setCardName}
                  autoCapitalize="words"
                />
              </View>

              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-sm font-medium mb-2">Expiry Date</Text>
                  <Input
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium mb-2">CVV</Text>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 3))}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </Card>

        </Animated.View>
      </ScrollView>

      {/* Bottom Action */}
      <View className="p-4 border-t border-border bg-background">
        <Button
          className="w-full"
          onPress={handlePayment}
          disabled={!isFormValid || isLoading}
        >
          <Text className="text-primary-foreground font-semibold">
            {isLoading ? 'Processing Payment...' : `Pay $${totalCost}`}
          </Text>
        </Button>
      </View>
    </View>
  );
}
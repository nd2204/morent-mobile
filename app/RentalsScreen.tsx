import { useNavigation } from "@react-navigation/native";
import { Star } from "lucide-react-native";
import { View, Text, Pressable, Image, FlatList, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
import { Loading } from "~/components/Loading";
import { RatingButton } from "~/components/RatingButton";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useAuth } from "~/hooks/useAuth";
import { useUser } from "~/hooks/useUser";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { RentalDto, UserCarsReviewDto } from "~/lib/morent-api";
import { cn } from "~/lib/utils";
import { NavigationProps } from "~/types/NavigationProps";

[Star].forEach(e => iconWithClassName(e))

export default function RentalsScreen()
{
  const { user } = useAuth();
  const { reviews, reviewsLoading, loading } = useUser();

  const navigator = useNavigation<NavigationProps>();

  const handlePress = (rentalId: string, rentalDto: RentalDto) => {
    navigator.navigate('RentalDetailScreen', { rentalId: rentalId, rentalDto: rentalDto });
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'border-lime-500 text-green-800';
      case 'pending':
        return 'border-yellow-500 text-yellow-800';
      case 'completed':
        return 'border-green-500 text-blue-800';
      case 'cancelled':
        return 'border-red-500 text-red-800';
      default:
        return 'border-border text-gray-800';
    }
  };

  if (reviewsLoading) 
    return (
      <View className="flex-1 justify-center items-center">
        <Loading />
      </View>
    )
  
  if (!reviews || reviews.length < 1)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No rental information</Text>
      </View>
    )

  const renderItem = ({ item }: { item: UserCarsReviewDto }) => (
    <Animated.View entering={FadeInDown.delay(200).springify()} className="gap-y-4">
      <TouchableOpacity onPress={() => handlePress(item.rental.id, item.rental)}>
        <Card className={cn("mb-4 p-4 gap-y-5")}>
          <View className="flex-row items-center gap-x-4">
            <Image
              source={{ uri: item.carImageUrl }}
              style={{ width: 100, height: 60, borderRadius: 8 }}
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-xl font-semibold">
                {item.car.title}
              </Text>
              <Text className="text-sm text-muted-foreground">
                {item.car.carModel.type}
              </Text>
              <TouchableOpacity onPress={() => handlePress(item.rental.id, item.rental)}>
                <View className="flex-row justify-between mt-4">
                  <Text className="text-md font-medium text-foreground">
                    Rental periods
                  </Text>
                  <Text className="text-md font-semibold text-foreground">
                    {daysBetween(item.rental.pickupDate, item.rental.dropoffDate)}
                  </Text>
                </View>
                <View className="flex-row justify-between mt-2">
                  <Text className="text-md font-medium text-foreground">
                    Price per day
                  </Text>
                  <Text className="text-md font-semibold text-foreground">
                    ${item.car.pricePerDay.toFixed(2)}
                  </Text>
                </View>
                <Separator className="my-3" />
                <View className="flex-row justify-between">
                  <Text className="text-md font-medium text-foreground">
                    Total
                  </Text>
                  <Text className="text-md font-semibold text-foreground">
                    ${item.rental.totalCost.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {
            item.rental.status.toLowerCase() === "completed" ?
              <RatingButton rating={5} hollow />
              :
              item.rental.status.toLowerCase() === "active" ?
                <View className="flex-row gap-4">
                  <Button variant="outline" className="flex-row flex-1 items-center border-border">
                    <Text className="text-md font-medium text-center">Mark As Complete</Text>
                  </Button>
                  <Button variant="outline" className="flex-row flex-1 border-destructive items-center">
                    <Text className="text-md font-medium text-destructive text-center">Cancel Rental</Text>
                  </Button>
                </View>
                :
                item.rental.status.toLowerCase() === "reserved" ?
                  <Button variant="outline" onPress={() => navigator.navigate("PaymentScreen", { car: item.car, totalCost: item.rental.totalCost })}>
                    <Text>Proceed to payment</Text>
                  </Button>
                  :
                  item.rental.status.toLowerCase() === "confirmed" ?
                    <View>
                      <Text>
                        Pickup location: {item.rental.pickupLocation.address}
                      </Text>
                      <Text>
                        Please pickup the car during the rental periods
                      </Text>
                    </View>
                    : null
          }
        </Card>
      </TouchableOpacity >
    </Animated.View>
  );

  return (
    <View>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.rental.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}
/**
 * Returns the number of days difference between two dates.
 * Rounds up so that any partial day counts as a full day.
 */
function daysBetween(start: string | Date, end: string | Date): number {
  const a = typeof start === 'string' ? new Date(start) : start;
  const b = typeof end === 'string' ? new Date(end) : end;
  const msPerDay = 1000 * 60 * 60 * 24;
  // > 0 if end is after start
  const diff = b.getTime() - a.getTime();
  return Math.ceil(diff / msPerDay);
}
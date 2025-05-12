import * as React from 'react';
import { View } from 'react-native';
import { Text } from './ui/text';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage, getInitials } from './ui/avatar';
import { Star } from 'lucide-react-native';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';
import { useReviews } from '~/hooks/useReviews';
import { ReviewDto } from '~/lib/morent-api';


// Register icons with NativeWind
iconWithClassName(Star);

interface ReviewProps {
  review: ReviewDto
  className?: string;
}

export function Review({ review, className }: ReviewProps) {

  const date = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className={className}>
      <View className="p-4">
        <View className="flex-row items-center mb-3">
          <Avatar className="h-10 w-10 mr-3" alt="User avatar">
            <AvatarImage source={{ uri: review.userImageUrl }} />
            <AvatarFallback>
              <Text>{getInitials(review.userName)}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <Text className="font-semibold">{review.userName}</Text>
            <Text className="text-sm text-muted-foreground">{date}</Text>
          </View>
          <View className="flex-row items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <Text className="text-sm">{review.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text className="text-muted-foreground">{review.comment}</Text>
      </View>
    </Card>
  );
}

interface ReviewsListProps {
  carId?: string | string[]
  className?: string;
}

export function ReviewsList({ carId, className }: ReviewsListProps) {
  const { reviews, fetchReviews } = useReviews(carId as string);
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length);

  React.useEffect(() => {
    fetchReviews();
  }, [carId])
  
  return (
    <View className={className}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold">Reviews ({reviews.length})</Text>
        <View className="flex-row items-center">
          <Star size={18} className="text-yellow-400 fill-yellow-400 mr-2" />
          <Text className="font-semibold">{isNaN(averageRating) ? "No reviews yet" : averageRating.toFixed(1)}</Text>
        </View>
      </View>
      <View className="gap-4">
        {reviews.length < 1 && 
          <Card>
            <Text className='p-4 font-[500]'>Be the first to review this car by renting</Text>
          </Card>
        }
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </View>
    </View>
  );
}
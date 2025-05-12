
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button } from './button';
import { Star } from 'lucide-react-native';
import { cn } from '~/lib/utils';

interface RatingProps {
  rating: number;
  onPress?: () => void;
  showValue?: boolean;
  hollow?: boolean;
  className?: string;
  maxStars?: number;
}

export function Rating({
  rating,
  onPress,
  showValue = false,
  hollow = false,
  className,
  maxStars = 5
}: RatingProps) {
  // Calculate full and partial stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars <= 0.75;
  const emptyStars = Math.max(0, maxStars - fullStars - (hasHalfStar ? 1 : 0));
  
  // Format the rating with 1 decimal place
  const formattedRating = rating.toFixed(1);

  return (
    <View className={className}>
      <View className="flex-row items-center gap-x-1">
        {/* Render filled stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            size={16}
            className={cn("text-yellow-500 fill-yellow-500", hollow && "fill-[#D1D1D1] text-[#D1D1D1]")}
          />
        ))}

        {/* Render half star if needed */}
        {hasHalfStar && (
          <View className="relative">
            {/* Empty star background */}
            <Star
              size={16}
              className="text-yellow-500"
            />
            {/* Half-filled star (using overflow hidden) */}
            <View className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
              <Star
                size={16}
                className="text-yellow-500 fill-yellow-500"
              />
            </View>
          </View>
        )}

        {/* Render empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star
            key={`empty-${index}`}
            size={16}
            color="#D1D1D1"
          />
        ))}

        {/* Show numeric rating if enabled */}
        {showValue && (
          <Text className="text-md font-medium ml-1">{formattedRating}</Text>
        )}
      </View>
    </View>
  );
}
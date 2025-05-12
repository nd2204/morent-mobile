import React from 'react';
import { View, Text } from 'react-native';
import { Button } from './ui/button';
import { Star } from 'lucide-react-native';
import { cn } from '~/lib/utils';
import { Rating } from './ui/rating';

interface RatingButtonProps {
  rating: number;
  onPress?: () => void;
  showValue?: boolean;
  hollow?: boolean;
  className?: string;
  maxStars?: number;
}

export function RatingButton({
  rating,
  onPress,
  showValue = false,
  hollow = false,
  className,
  maxStars = 5
}: RatingButtonProps) {
  return (
    <Button
      variant="secondary"
      className={cn("flex-row justify-between items-center", className)}
      onPress={onPress}
    >
      <Text className="text-md font-medium">Rate this car</Text>
      <Rating rating={rating}/>
    </Button>
  );
}
import * as React from 'react';
import { Heart } from 'lucide-react-native';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';

// Register icons with NativeWind
iconWithClassName(Heart);

interface FavoriteButtonProps {
  isFavorite: boolean;
  size?: number
  onToggleFavorite: () => void;
}

export const FavoriteButton = React.memo(function FavoriteButton({
  isFavorite,
  size = 18,
  onToggleFavorite,
}: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      className="p-2 rounded-full bg-transparent"
      onPress={onToggleFavorite}
    >
      <Heart
        size={size}
        className={cn(
          isFavorite ? 'text-destructive fill-destructive' : 'text-ring fill-background'
        )}
      />
    </Button>
  );
});
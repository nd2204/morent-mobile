import * as React from 'react';
import { Image, View } from 'react-native';
import { Text } from './ui/text';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '~/types/TabParamList';

export function Hero() {
  const { navigate } = useNavigation<NativeStackNavigationProp<TabParamList>>();

  return (
    <View className='mb-4'>
      <View className="bg-background px-4 py-6">
        <View className="gap-y-4">
          <Text className="text-3xl font-black text-foreground leading-tight">
            The Best Platform for Car Rental
          </Text>
          <Text className="text-base font-semibold text-muted-foreground leading-relaxed">
            Ease of doing a car rental safely and reliably. Of course at a low price.
          </Text>
          <Button 
            className="mt-4 w-40" 
            onPress={() => navigate('CategoryScreen')}
          >
            <Text className="text-primary-foreground font-semibold">Explore Now</Text>
          </Button>
        </View>
        <View className="mt-6">
          <Image
            source={require('~/uploads/koenigsegg.png')}
            className="w-full h-48"
            resizeMode="contain"
            accessibilityLabel="Featured car"
          />
        </View>
      </View>
    </View>
  );
}
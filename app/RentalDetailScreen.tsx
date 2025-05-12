import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { CarLocationDto } from '~/lib/morent-api';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { RootStackParamList } from '~/types/RootStackParamList';
import { ChevronLeft, Calendar, MapPin, Clock, Tag, FileText } from 'lucide-react-native';
import { cn } from '~/lib/utils';

type RentalDetailsRouteProp = RouteProp<RootStackParamList, 'RentalDetailScreen'>;

export default function RentalDetailsScreen() {
  const navigation = useNavigation();
  const { rentalDto } = useRoute<RentalDetailsRouteProp>().params;
  
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-emerald-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const LocationBlock = ({
    location,
    isPickup = false,
  }: {
    location: CarLocationDto;
    isPickup?: boolean;
  }) => (
    <View className="flex-row items-start mb-6">
      <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-3">
        <MapPin size={18} color="#2563eb" />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-500 mb-1">
          {isPickup ? 'Pickup Location' : 'Drop-off Location'}
        </Text>
        <Text className="text-base font-medium mb-1">{location.address}</Text>
        <Text className="text-sm text-gray-500">{`${location.city}, ${location.country}`}</Text>
      </View>
    </View>
  );

  const InfoItem = ({ 
    icon, 
    label, 
    value,
    valueClass = ""
  }: { 
    icon: React.ReactNode; 
    label: string; 
    value: string;
    valueClass?: string;
  }) => (
    <View className="flex-row items-center mb-6">
      <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mr-3">
        {icon}
      </View>
      <View>
        <Text className="text-sm text-gray-500 mb-1">{label}</Text>
        <Text className={cn("text-base font-medium", valueClass)}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 mt-6">
      {/* Status Card */}
      <Card className="mx-4 mb-4">
        <CardContent className="flex-row items-center justify-between py-4">
          <View className="flex-row items-center">
            <FileText size={18} color="#4b5563" className="mr-4" />
            <Text className="text-base text-gray-600 ml-4">Current Status</Text>
          </View>
          <View className={cn("px-3 py-1 rounded-full", getStatusColor(rentalDto.status))}>
            <Text className="text-sm font-medium">{rentalDto.status}</Text>
          </View>
        </CardContent>
      </Card>

      {/* Rental ID */}
      <Card className="mx-4 mb-4">
        <CardContent className="py-4">
          <InfoItem
            icon={<Tag size={18} color="#2563eb" />}
            label="Rental ID"
            value={rentalDto.id}
          />
        </CardContent>
      </Card>

      {/* Dates Card */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Rental Period</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="flex-row mb-6">
            <View className="flex-1 border-r border-gray-200 pr-4">
              <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mb-2">
                <Calendar size={18} color="#2563eb" />
              </View>
              <Text className="text-sm text-gray-500 mb-1">Pickup Date</Text>
              <Text className="text-base font-medium mb-1">{formatDate(rentalDto.pickupDate)}</Text>
              <Text className="text-sm text-gray-500">{formatTime(rentalDto.pickupDate)}</Text>
            </View>
            <View className="flex-1 pl-4">
              <View className="h-10 w-10 rounded-full bg-primary/10 items-center justify-center mb-2">
                <Calendar size={18} color="#2563eb" />
              </View>
              <Text className="text-sm text-gray-500 mb-1">Drop-off Date</Text>
              <Text className="text-base font-medium mb-1">{formatDate(rentalDto.dropoffDate)}</Text>
              <Text className="text-sm text-gray-500">{formatTime(rentalDto.dropoffDate)}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Locations Card */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <LocationBlock location={rentalDto.pickupLocation} isPickup />
          <LocationBlock location={rentalDto.dropoffLocation} />
        </CardContent>
      </Card>

      {/* Payment Card */}
      <Card className="mx-4 mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoItem
            icon={<Tag size={18} color="#2563eb" />}
            label="Total Cost"
            value={`${rentalDto.currency} ${rentalDto.totalCost.toFixed(2)}`}
            valueClass="text-lg font-bold text-primary"
          />
          <InfoItem
            icon={<Clock size={18} color="#2563eb" />}
            label="Booked On"
            value={formatDate(rentalDto.createdAt)}
          />
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button variant="secondary" className="w-full h-14 px-4 mb-8" size="lg">
        <Text>
          Contact Support
        </Text>
      </Button>
    </ScrollView>
  );
}
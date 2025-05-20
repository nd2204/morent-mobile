import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import LocationPicker from '~/components/LocationPicker';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Children, ReactNode, useRef } from 'react';
import MapView, { LatLng } from 'react-native-maps';
import { CarLocationDto } from '~/lib/morent-api';

interface LocationLayoutProps {
  title?: string;
  onLocationChange?: (location: LatLng) => void;
  snapPoints?: string[] | number[];
  children: ReactNode;
  markers?: CarLocationDto[];
  onFocusMarker?: (markerId: string) => void;
}

const LocationLayout = ({
  title,
  onLocationChange = () => {},
  snapPoints = ["45%", "85%"],
  children,
  markers = [],
  onFocusMarker = () => {},
}: LocationLayoutProps) => {
  const navigator = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null); // Reference to LocationPicker's map

  const focusOnMarker = (markerId: string) => {
    const marker = markers.find(m => m.carId === markerId);
    if (marker && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
      onFocusMarker(markerId);
    }
  };

  return (
    <GestureHandlerRootView>
      <View className='flex-1 bg-white'>
        <View className='flex flex-col h-screen bg-blue-500'>
          <View className='flex flex-row absolute z-10 top-16 items-center justify-start px-10'>
            <TouchableOpacity onPress={() => navigator.canGoBack() && navigator.goBack()}>
              <View className="h-10 w-10 bg-white rounded-full justify-center items-center">
                <ChevronLeft className='w-6 h-6 mr-1'/>
              </View>
            </TouchableOpacity>
            <Text className='text-xl ml-5 font-semibold'>{title || 'Go back'}</Text>
          </View>
          <LocationPicker
            ref={mapRef}
            onLocationSelected={(location) => {
              onLocationChange(location);
            }}
            markers={markers}
            onMarkerPress={focusOnMarker}
          />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
        >
          <BottomSheetScrollView style={{flex: 1, padding: 20}}>
            {children}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  )
}

export default LocationLayout;
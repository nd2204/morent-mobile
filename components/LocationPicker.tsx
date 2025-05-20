import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import MapView, { LatLng, MapPressEvent, Marker, Region } from 'react-native-maps';
import { MarkerProps } from 'react-native-svg';
import { calculateRegion } from '~/lib/map';
import { CarLocationDto } from '~/lib/morent-api';
import { cn } from '~/lib/utils';
import { useLocationStore } from '~/store';

const { width, height } = Dimensions.get('window');

interface LocationPickerProps {
  onLocationSelected: (location: LatLng) => void,
  onMarkerPress?: (markerId: string) => void
  containerClassName?: string
  markers?: CarLocationDto[]
  ref?: React.Ref<MapView>
}
const LocationPicker = ({
  onLocationSelected,
  onMarkerPress,
  containerClassName,
  markers,
  ref
}: LocationPickerProps) => {
  const mapRef = useRef<MapView>(null);
  const {
    userLongitude,
    userLatitude,
    dropoffLongitude: destinationLongitude,
    dropoffLatitude: destinationLatitude
  } = useLocationStore();

  const [selectedLocation, setSelectedLocation] = useState<LatLng>({
    latitude: userLongitude ?? 21,
    longitude: userLatitude ?? 105,
  });

  const region = calculateRegion({
    userLatitude: userLongitude ?? 21,
    userLongitude: userLatitude ?? 105,
    destinationLongitude,
    destinationLatitude
  })

  // Handle map press to set marker
  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    onLocationSelected(coordinate);
  };

  return (
    <View className={cn('flex-1 min-h-[300px]', containerClassName)}>
      <MapView
        ref={mapRef}
        className='w-full h-full'
        initialRegion={region}
        style={StyleSheet.absoluteFillObject}
        onPress={handleMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            description={`Lat: ${selectedLocation.latitude.toFixed(4)}, Lon: ${selectedLocation.longitude.toFixed(4)}`}
          />
        )}
        {
          markers?.map(m => (
            <Marker
              coordinate={{latitude: m.latitude, longitude: m.longitude}}
              title="Selected Location"
              description={m.title}
              key={m.carId}
              onPress={() => onMarkerPress && onMarkerPress(m.carId)}
              // image={{uri: m.imageUrl}}
              // className='w-40 h-40'
            />
          ))
        }
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LocationPicker;
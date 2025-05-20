import * as React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Button } from '~/components/ui/button';
import { setShouldAnimateExitingForTag } from 'react-native-reanimated/lib/typescript/core';

export default function useLocation() {
  const [location, setLocation] = React.useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = React.useState('');
  const [permissionStatus, setPermissionStatus] = React.useState<Location.PermissionStatus>();

  const requestLocationPermission = async () => {
    try {
      // Request foreground location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          'Location Permission Required',
          'This app needs access to your location to function properly.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      setErrorMsg('Error requesting permissions');
      return false;
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) return;
    
    try {
      // Get current position with high accuracy
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(location);
      setErrorMsg('');
      return location;
    } catch (err) {
      console.error('Error getting current location:', err);
      setErrorMsg('Could not get your location');
    }
  };

  // Watch position (for real-time tracking)
  const [locationSubscription, setLocationSubscription] = React.useState<Location.LocationSubscription>();
  
  const startLocationTracking = async () => {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) return;
    
    // Remove any existing subscription
    if (locationSubscription) {
      locationSubscription.remove();
    }
    
    // Create a new subscription
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,  // Update every 5 seconds
        distanceInterval: 10, // Update if moved by 10 meters
      },
      (newLocation) => {
        setLocation(newLocation);
        console.log('New location:', newLocation);
      }
    );
    
    setLocationSubscription(subscription);
  };
  
  const stopLocationTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(undefined);
    }
  };

  // Clean up subscription when component unmounts
  React.useEffect(() => {
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [locationSubscription]);

  return {
    location, requestLocationPermission, getCurrentLocation, startLocationTracking, stopLocationTracking
  }
}

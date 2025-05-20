import * as React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Button } from '~/components/ui/button';

export default function LocationService() {
  const [location, setLocation] = React.useState<Location.LocationOptions>();
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
      setErrorMsg(null);
      return location;
    } catch (err) {
      console.error('Error getting current location:', err);
      setErrorMsg('Could not get your location');
    }
  };

  // Watch position (for real-time tracking)
  const [locationSubscription, setLocationSubscription] = React.useState(null);
  
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
      setLocationSubscription(null);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Service</Text>
      
      <View style={styles.permissionContainer}>
        <Text style={styles.subtitle}>Permission Status:</Text>
        <Text style={styles.statusText}>
          {permissionStatus ? permissionStatus : 'Not requested'}
        </Text>
        <Button onPress={requestLocationPermission} style={styles.button}>
          <Text>Request Location Permission</Text>
        </Button>
      </View>
      
      <View style={styles.locationContainer}>
        <Text style={styles.subtitle}>Current Location:</Text>
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : !location ? (
          <Text>No location data available</Text>
        ) : (
          <View>
            <Text style={styles.locationText}>
              Latitude: {location.coords.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {location.coords.longitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Accuracy: ±{location.coords.accuracy.toFixed(1)}m
            </Text>
            {location.coords.altitude !== null && (
              <Text style={styles.locationText}>
                Altitude: {location.coords.altitude.toFixed(1)}m
              </Text>
            )}
            <Text style={styles.locationText}>
              Timestamp: {new Date(location.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <Button onPress={getCurrentLocation} style={styles.button}>
          <Text>Get Current Location</Text>
        </Button>
        
        {!locationSubscription ? (
          <Button onPress={startLocationTracking} style={styles.button}>
            <Text>Start Location Tracking</Text>
          </Button>
        ) : (
          <Button onPress={stopLocationTracking} style={[styles.button, styles.stopButton]}>
            <Text>Stop Location Tracking</Text>
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  permissionContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  locationContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10,
    gap: 10,
  },
  button: {
    marginVertical: 5,
  },
  stopButton: {
    backgroundColor: '#ff6b6b',
  },
});
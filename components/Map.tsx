import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { calculateRegion } from "~/lib/map";
import { useCarStore, useLocationStore } from "~/store";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    dropoffLatitude: destinationLatitude,
    dropoffLongitude: destinationLongitude
  } = useLocationStore();

  const {
    selectedCar, setCarsLocation
  } = useCarStore();

  useEffect(() => {

  }, [])

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude
  })

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full"
      // tintColor="black"
      mapType={Platform.OS === 'ios' ? "mutedStandard" : "standard"}
      style={StyleSheet.absoluteFillObject}
      showsUserLocation={true}
      region={region}
    // userInterfaceStyle="light"
    >
    </MapView>
  );
};

export default Map;
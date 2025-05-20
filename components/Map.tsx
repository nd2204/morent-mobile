import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { calculateRegion } from "~/lib/map";
import { useLocationStore } from "~/store";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude
  } = useLocationStore();

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
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
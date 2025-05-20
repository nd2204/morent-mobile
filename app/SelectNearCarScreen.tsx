import LocationLayout from "~/components/LocationLayout";
import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { createApiClients } from "~/lib/api-client";
import { CarApiApiCarsNearGetRequest, CarLocationDto } from "~/lib/morent-api";
import { useLocationStore } from "~/store";
import useLocation from "~/services/LocationService";
import * as Location from 'expo-location'
import { Card } from "@rneui/base";
import { CarLocationCard } from "~/components/CarLocationCard";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "~/types/NavigationProps";
import { Marker } from "react-native-svg";

const { carApi } = createApiClients();

const SelectNearCarScreen = () => {
  const [ nearCars, setNearCars ] = useState<CarLocationDto[]>([])
  const { userLatitude, userLongitude, setUserLocation } = useLocationStore();
  const { location, getCurrentLocation } = useLocation();
  const navigator = useNavigation<NavigationProps>();

  useEffect(() => {
    const getNearCars = async () => {
      if (userLatitude == null || userLongitude == null) {
        getCurrentLocation();

        const address = await Location.reverseGeocodeAsync({
          latitude: location?.coords.latitude!,
          longitude: location?.coords.longitude!,
        });

        setUserLocation({
          latitude: location?.coords.longitude!,
          longitude: location?.coords.latitude!,
          address: `${address[0].name}, ${address[0].region}`
        })
      }

      const query: CarApiApiCarsNearGetRequest = {
        longitude: userLongitude!,
        latitude: userLatitude!,
        maxDistanceKm: 2
      }

      const { status, data } = await carApi.apiCarsNearGet(query);

      if (status == 200) {
        setNearCars(data);
      }
    }

    getNearCars();
  }, [])

  return (
    <LocationLayout
      title="Cars In Proximity"
      onLocationChange={() => {
      }}
      markers={nearCars}>
        <View className="gap-4">
        {
          nearCars.map(car =>
          (
            <CarLocationCard
              key={car.carId}
              car={car}
              onPressRent={() => navigator.navigate("DetailScreen", { carId: car.carId })}
            />
          ))
        }
      </View>
    </LocationLayout>
  )
}

export default SelectNearCarScreen;
import { create } from 'zustand'
import { CarLocationDto } from '~/lib/morent-api';
import { CarLocationStore, LocationStore } from '~/types/type'

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  dropoffLatitude: null,
  dropoffLongitude: null,
  dropoffAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    // const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    // if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      dropoffLatitude: latitude,
      dropoffLongitude: longitude,
      dropoffAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    // const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    // if (selectedDriver) clearSelectedDriver();
  },
}));

export const useCarStore = create<CarLocationStore>((set) => ({
  carsLocation: [] as CarLocationDto[],
  selectedCar: null,
  setSelectedCar: (carId: string) => set(() => ({ selectedCar: carId })),
  setCarsLocation: (carsLocation: CarLocationDto[]) => set(() => ({ carsLocation: carsLocation })),
  clearSelectedCars: () => set(() => ({ selectedCar: null }))
}));
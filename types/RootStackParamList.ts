import { CarDto, RentalDto } from "~/lib/morent-api";

// types.ts
export type RootStackParamList = {
  Tabs: undefined
  DetailScreen: { carId: string };
  PaymentScreen: { car: CarDto, totalCost: number };
  RentCarScreen: { car: CarDto, totalCost: number };
  SelectNearCarScreen: undefined;
  AuthScreen: undefined;
  RentalDetailScreen: { rentalId: string, rentalDto: RentalDto };
};
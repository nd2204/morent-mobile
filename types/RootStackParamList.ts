import { CarDto, RentalDto } from "~/lib/morent-api";

// types.ts
export type RootStackParamList = {
  Tabs: undefined
  DetailScreen: { carId: string };
  PaymentScreen: { car: CarDto, totalCost: number };
  AuthScreen: undefined
  RentalDetailScreen: { rentalId: string, rentalDto: RentalDto }
};
import { useEffect, useState } from "react";
import { createApiClients } from "~/lib/api-client";
import { CarDetailDto } from "~/lib/morent-api";

const { carApi } = createApiClients();

export function useCarDetail(id: string) {
  const [car, setCar] = useState<CarDetailDto | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCar = async () => {
    try {
      setLoading(true);
      const response = await carApi.apiCarsCarIdGet({ carId: id });
      setCar(response.data);
    } catch (err) {
      console.error('❌ API Error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch cars'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id]);

  return { car, loading, error, refetch: fetchCar };
} 
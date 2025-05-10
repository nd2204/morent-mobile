import { useState, useEffect } from 'react';
import { rentalApi } from '~/lib/api-client';
import type { RentalDto } from 'lib/morent-api';

export function useRentals() {
    const [rentals, setRentals] = useState<RentalDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchRentals = async () => {
        try {
            setLoading(true);
            const response = await rentalApi.apiRentalsGet();
            setRentals(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch rentals'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
    }, []);

    return { rentals, loading, error, refetch: fetchRentals };
} 
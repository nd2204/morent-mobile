import { useState, useEffect, useMemo } from 'react';
import { carApi } from '~/lib/api-client';
import type { CarDto } from 'lib/morent-api';

export interface UseCarsOptions {
    brand?: string;
    type?: string;
    capacity?: number;
    fuelType?: string;
    gearbox?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    location?: string;
    search?: string;
    sort?: string;
    page?: number;
    pageSize?: number;
}

export function useCars(options: UseCarsOptions = {}) {
    const [_cars, setCars] = useState<CarDto[]>([]);
    const [_loading, setLoading] = useState(true);
    const [_options, setOptions] = useState<UseCarsOptions>(options)
    const [_error, setError] = useState<Error | null>(null);

    // Memoize the options to prevent unnecessary re-renders
    const memoizedOptions = useMemo(() => ({
        carFilterBrand: _options.brand,
        carFilterType: _options.type,
        carFilterCapacity: _options.capacity,
        carFilterFuelType: _options.fuelType,
        carFilterGearbox: _options.gearbox,
        carFilterMinPrice: _options.minPrice,
        carFilterMaxPrice: _options.maxPrice,
        carFilterRating: _options.rating,
        carFilterLocation: _options.location,
        carFilterSearch: _options.search,
        carFilterSort: _options.sort,
        pagedQueryPage: _options.page,
        pagedQueryPageSize: _options.pageSize,
    }), [
        _options.brand,
        _options.type,
        _options.capacity,
        _options.fuelType,
        _options.gearbox,
        _options.minPrice,
        _options.maxPrice,
        _options.rating,
        _options.location,
        _options.search,
        _options.sort,
        _options.page,
        _options.pageSize,
    ]);

    const fetchCars = async () => {
        try {
            // console.log('🚀 Fetching cars with options:', JSON.stringify(memoizedOptions, null, 2));
            // console.log('🌐 Attempting to connect to:', API_URL);
            setLoading(true);
            
            const response = await carApi.apiCarsGet(memoizedOptions);
            // console.log('✅ API Response Status:', response.status);
            // console.log('📦 Response Data:', JSON.stringify(response.data, null, 2));
            
            setCars(response.data);
        } catch (err) {
            console.error('❌ API Error:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch cars'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [memoizedOptions]);

    return { cars: _cars, loading: _loading, error: _error, setOptions };
} 
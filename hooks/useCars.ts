import { useState, useEffect, useMemo, useCallback } from 'react';
import { createApiClients } from '~/lib/api-client';
import type { CarDto } from 'lib/morent-api';

const { carApi } = createApiClients();

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

export interface UseCarsResult {
    cars: CarDto[];
    loading: boolean;
    error: Error | null;
    setOptions: (options: UseCarsOptions) => void;
    loadMore: () => void;
    hasMore: boolean;
}

export function useCars(options: UseCarsOptions = {}): UseCarsResult {
    const [cars, setCars] = useState<CarDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [options_, setOptions_] = useState<UseCarsOptions>({
        ...options,
        page: options.page || 1,
        pageSize: options.pageSize || 10
    });
    const [error, setError] = useState<Error | null>(null);
    const [hasMore, setHasMore] = useState(true);
    
    // Memoize the options to prevent unnecessary re-renders
    const memoizedOptions = useMemo(() => ({
        carFilterBrand: options_.brand,
        carFilterType: options_.type,
        carFilterCapacity: options_.capacity,
        carFilterFuelType: options_.fuelType,
        carFilterGearbox: options_.gearbox,
        carFilterMinPrice: options_.minPrice,
        carFilterMaxPrice: options_.maxPrice,
        carFilterRating: options_.rating,
        carFilterLocation: options_.location,
        carFilterSearch: options_.search,
        carFilterSort: options_.sort,
        pagedQueryPage: options_.page,
        pagedQueryPageSize: options_.pageSize,
    }), [
        options_.brand,
        options_.type,
        options_.capacity,
        options_.fuelType,
        options_.gearbox,
        options_.minPrice,
        options_.maxPrice,
        options_.rating,
        options_.location,
        options_.search,
        options_.sort,
        options_.page,
        options_.pageSize,
    ]);

    const fetchCars = useCallback(async (isLoadingMore = false) => {
        try {
            if (!isLoadingMore) {
                setLoading(true);
            }
            
            const response = await carApi.apiCarsGet(memoizedOptions);
            
            const newCars = response.data;
            
            if (isLoadingMore) {
                setCars(prevCars => [...prevCars, ...newCars]);
            } else {
                setCars(newCars);
            }
            
            // If we received fewer items than requested, we've reached the end
            setHasMore(newCars.length >= (options_.pageSize || 10));
        } catch (err) {
            console.error('❌ API Error:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch cars'));
        } finally {
            setLoading(false);
        }
    }, [memoizedOptions]);

    // Initial fetch and when filters change, reset and fetch from page 1
    useEffect(() => {
        // When options change (except for page), we want to reset to page 1
        const isChangingPage = options_.page && options_.page > 1;
        
        if (!isChangingPage) {
            fetchCars(false);
        }
    }, [fetchCars, options_.page]);

    // Function to load more data
    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;
        
        setOptions_(prev => ({
            ...prev,
            page: (prev.page || 1) + 1
        }));
        
        fetchCars(true);
    }, [loading, hasMore, fetchCars]);

    // Function to set new options (resets pagination)
    const setOptions = useCallback((newOptions: UseCarsOptions) => {
        setOptions_({
            ...newOptions,
            page: 1 // Reset to page 1 when filters change
        });
        setHasMore(true); // Reset hasMore state
    }, []);

    return { 
        cars, 
        loading, 
        error, 
        setOptions,
        loadMore,
        hasMore
    };
}
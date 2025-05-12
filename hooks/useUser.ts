import { useState, useEffect } from 'react';
import { createApiClients } from '~/lib/api-client';
import { RentalDto, ReviewDto, UserCarsReviewDto, type UserDto } from 'lib/morent-api';

export function useUser() {
    const [userDetail, setUserDetail] = useState<UserDto>()
    const [reviews, setReviews] = useState<UserCarsReviewDto[]>([])
    const [rentals, setRentals] = useState<RentalDto[]>([])
    const [loading, setLoading] = useState(true);
    const [rentalsLoading, setRentalsLoading] = useState(true);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const { userApi } = createApiClients();

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await userApi.apiUsersMeGet();
            setUserDetail(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch user profile'));
        } finally {
            setLoading(false);
        }
    };

    const fetchUserReviews = async () => {
        try {
            setReviewsLoading(true);
            const response = await userApi.apiUsersMeReviewsGet();
            setReviews(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch user reviews'));
        } finally {
            setReviewsLoading(false);
        }
    };

    const fetchUserRentals = async () => {
        try {
            setRentalsLoading(true);
            const response = await userApi.apiUsersMeRentalsGet();
            setRentals(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch user reviews'));
        } finally {
            setRentalsLoading(false);
        }
    };


    // const updateProfileImage = async (imageFile: File) => {
    //     try {
    //         setLoading(true);
    //         await userApi.apiUsersMeProfileImagePost({ file: imageFile });
    //         await fetchUserProfile(); // Refresh user profile after update
    //     } catch (err) {
    //         setError(err instanceof Error ? err : new Error('Failed to update profile image'));
    //         throw err;
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        fetchUserProfile();
        fetchUserReviews();
    }, []);

    return { userDetail, reviews, rentals, loading, rentalsLoading, reviewsLoading, error, refetch: fetchUserProfile, fetchUserRentals, fetchUserReviews };
} 
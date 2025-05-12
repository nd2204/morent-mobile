import { useState } from 'react';
import { reviewApi } from '~/lib/api-client';
import type { LeaveReviewRequest, ReviewDto } from 'lib/morent-api';

export function useReviews(carId?: string) {
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchReviews = async () => {
        if (!carId) return;
        try {
            setLoading(true);
            const response = await reviewApi.apiReviewsCarCarIdGet({ carId });
            setReviews(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch reviews'));
        } finally {
            setLoading(false);
        }
    };

    const leaveReview = async (carId: string, review: LeaveReviewRequest) => {
        try {
            setLoading(true);
            await reviewApi.apiReviewsCarCarIdPost({
                carId: carId,
                leaveReviewRequest: review,
            });
            await fetchReviews(); // Refresh reviews after posting
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to leave review'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { reviews, loading, error, leaveReview, fetchReviews };
} 
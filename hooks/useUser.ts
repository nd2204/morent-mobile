import { useState, useEffect } from 'react';
import { userApi } from '~/lib/api-client';
import type { UserDto } from 'lib/morent-api';

export function useUser() {
    const [user, setUser] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await userApi.apiUsersMeGet();
            setUser(response.data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch user profile'));
        } finally {
            setLoading(false);
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
    }, []);

    return { user, loading, error, refetch: fetchUserProfile };
} 
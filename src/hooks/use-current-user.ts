import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth-store';

export default function useCurrentUser() {
    const { fetchCurrentUser } = useAuthStore();
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/auth-services.ts';
import { useAuthStore } from '@/store/auth-store';

export default function useCurrentUser() {
    const fetchCurrentUser = async () => {
        const user = await getCurrentUser();
        useAuthStore.setState({ currentUser: user });
        return user;
    }
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        retry: false,
        enabled: isAuthenticated,
        staleTime: 1000 * 60 * 5,
    });
}

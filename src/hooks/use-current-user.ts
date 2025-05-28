import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/auth-services';

export default function useCurrentUser() {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry: false,
    });
}

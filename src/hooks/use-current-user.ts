import {useQuery} from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth-store';
import {useAuthActions} from "@/store/auth-action.ts";

export default function useCurrentUser() {
    const {fetchCurrentUser} = useAuthActions();
    const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);


    return useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        retry: false,
        enabled: !isAuthInitialized,
        staleTime: 1000 * 60 * 5,
    });
}

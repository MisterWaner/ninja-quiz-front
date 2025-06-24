import { Outlet, Navigate } from 'react-router';
import useCurrentUser from '@/hooks/use-current-user';
import Loader from '@/components/global/Loader';

export default function ProtectedRoutes() {
    const { data: user, isLoading, isError } = useCurrentUser();

    if (isLoading)
        return (
            <Loader />
        );

    if (isError || !user) return <Navigate to='/connexion' />;

    return <Outlet />;
}

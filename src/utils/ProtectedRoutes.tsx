import { Outlet, Navigate } from 'react-router';
import useCurrentUser from '@/hooks/use-current-user';

export default function ProtectedRoutes() {
    const { data: user, isLoading, isError } = useCurrentUser();
    
    if (isLoading) return <div>Chargement...</div>;

    if (isError || !user) return <Navigate to='/connexion' />;

    return <Outlet />;
}

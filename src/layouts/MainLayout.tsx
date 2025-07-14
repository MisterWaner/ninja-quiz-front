import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AccountSideBar from '@/components/SideBar/AccountSideBar';
import PublicSideBar from '@/components/SideBar/PublicSideBar';
import Header from '@/components/global/Header';
import Wrapper from '@/components/global/Wrapper';
import { useAuthStore } from '@/store/auth-store.ts';
import useCurrentUser from '@/hooks/use-current-user.ts';
import Loader from '@/components/global/Loader';

export default function MainLayout() {
    const { isLoading } = useCurrentUser();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (isLoading) return <Loader />;

    return (
        <SidebarProvider>
            {isAuthenticated ? <AccountSideBar /> : <PublicSideBar />}
            <Header />
            <main className='relative top-28 w-full h-[calc(100dvh-112px)]'>
                <SidebarTrigger
                    className='text-slate-950 hover:cursor-pointer'
                    //onClick={handleSidebarClick}
                />
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </main>
        </SidebarProvider>
    );
}

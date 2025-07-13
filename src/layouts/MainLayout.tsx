import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AccountSideBar from '@/components/SideBar/AccountSideBar';
import PublicSideBar from '@/components/SideBar/PublicSideBar';
import Header from '@/components/global/Header';
import Wrapper from '@/components/global/Wrapper';
import { useAuthStore } from '@/store/auth-store.ts';
import Loader from '@/components/global/Loader';

export default function MainLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

    if (!isAuthInitialized) return <Loader />;

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

import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import SideBar from '@/components/SideBar/PublicSideBar';
import Header from '@/components/global/Header';
import Wrapper from '@/components/global/Wrapper';

export default function MainLayout() {
    return (
        <SidebarProvider>
            <SideBar />
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

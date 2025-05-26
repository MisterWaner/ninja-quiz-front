import { Link } from 'react-router';
import { LogOut } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from '@/components/ui/sidebar';
import { userMenuLinks } from '@/lib/menu-links';

import { useQuizStore } from '@/store/quiz-store';
import { useAuthStore } from '@/store/auth-store';

export default function AccountSideBar() {
    const { resetQuiz, resetProgress, resetScore, resetTimer } = useQuizStore();
    const { toggleSidebar, isMobile } = useSidebar();
    const { logoutUser } = useAuthStore();

    function handleSideBarClick() {
        if (isMobile) {
            toggleSidebar();
        }
    }

    function handleReset() {
        resetQuiz();
        resetProgress();
        resetScore();
        resetTimer();
    }

    return (
        <Sidebar className='fixed bg-slate-950 top-28 h-full'>
            <SidebarContent className='bg-slate-950 text-white w-full'>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {userMenuLinks.map((item) => (
                                <SidebarMenuItem
                                    className='px-4 py-2'
                                    key={item.id}
                                >
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.path}
                                            onClick={() => {
                                                handleSideBarClick();
                                                handleReset();
                                            }}
                                        >
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem className='px-4 py-2'>
                                <SidebarMenuButton asChild>
                                    <Link to='/connexion' onClick={logoutUser}>
                                        <LogOut />
                                        <span>Déconnexion</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

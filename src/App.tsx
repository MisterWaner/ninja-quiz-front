import { BrowserRouter, Routes, Route } from 'react-router';
import { useEffect } from 'react';
import useCurrentUser from './hooks/use-current-user';
import { useAuthActions } from './store/auth-action';
import MainLayout from '@/layouts/MainLayout';
import GameLayout from '@/layouts/GameLayout';
import AccountLayout from '@/layouts/AccountLayout';

import Home from '@/pages/Home';
import Signin from '@/pages/Signin';
import Ranks from '@/pages/Ranks';
import Login from '@/pages/Login';
import GameRoot from '@/pages/game/GameRoot';
import Quiz from '@/pages/game/Quiz';
import AccountHome from './pages/account/AccountHome';
import AccountSettings from './pages/account/AccountSettings';
import ProtectedRoutes from '@/utils/ProtectedRoutes';

function App() {
    const { setIsAuthenticated } = useAuthActions();
    const { data: currentUser } = useCurrentUser();

    useEffect(() => {
        if (currentUser) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [currentUser, setIsAuthenticated]);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route loader element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path='inscription' element={<Signin />} />
                        <Route path='connexion' element={<Login />} />
                        <Route path='classements' element={<Ranks />} />
                        <Route path='jouer'>
                            <Route element={<GameLayout />}>
                                <Route index element={<GameRoot />} />
                                <Route path=':type' element={<Quiz />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route loader element={<ProtectedRoutes />}>
                        <Route element={<AccountLayout />}>
                            <Route path='mon-compte'>
                                <Route index element={<AccountHome />} />
                                <Route
                                    path='parametres'
                                    element={<AccountSettings />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

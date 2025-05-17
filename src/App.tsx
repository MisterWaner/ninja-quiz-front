import { BrowserRouter, Routes, Route } from 'react-router';

import MainLayout from '@/layouts/MainLayout';

import Home from '@/pages/Home';
import Signin from '@/pages/Signin';
import Ranks from '@/pages/Ranks';
import Login from '@/pages/Login';

function App() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/inscription" element={<Signin />} />
                    <Route path="/connexion" element={<Login />} />
                    <Route path="/classements" element={<Ranks />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    </>;
}

export default App;

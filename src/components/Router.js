import Header from './Header';
import Library from '../pages/Library';
import Search from '../pages/Search';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

export default function Router() {
    const Layout = () => {
        return (
            <>
                <Header />
                <Library />
                <Outlet />
            </>
        )
    }
    const BrowserRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/search" element={<Search />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
 
    return (
        <>
            <BrowserRoutes />
        </>
    );
}
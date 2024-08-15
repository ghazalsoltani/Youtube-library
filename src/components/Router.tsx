// import Header from './Header';
import Library from '../pages/Library';
import Search from '../pages/Search';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

const Router: React.FC = () => {
    // Layout component with Header and Outlet
    const Layout: React.FC = () => {
        return (
            <>
                <Outlet /> {/* The Outlet component will render the matching child route component */}
            </>
        );
    };

    // Main routing structure
    const BrowserRoutes: React.FC = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* Define a dynamic route for user libraries */}
                        <Route path=":username" element={<Library />} />

                        {/* Route for search page */}
                        <Route path=":username/search" element={<Search />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    };

    return (
        <>
            <BrowserRoutes />
        </>
    );
};

export default Router;


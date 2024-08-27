//importations
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Library from '../pages/Library';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:username" element={<Library />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
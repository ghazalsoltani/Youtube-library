//importations
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Library from '../pages/Library';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to /home */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                {/* Library page with username */}
                <Route path="/:username" element={<Library />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
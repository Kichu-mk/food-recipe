import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Recipes from '../pages/Recipes';
import Favourite from '../pages/Favourite';
import AboutPage from '../pages/AboutPage';
const Router = () => {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </div>
    );
}

export default Router;

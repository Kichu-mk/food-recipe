import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Recipes from '../pages/Recipes';
import Favourite from '../pages/Favourite';
import AboutPage from '../pages/AboutPage';
import Recipe from '../pages/Recipe';
import AddRecipe from '../pages/AddRecipe';
import MyRecipes from '../pages/MyRecipes';
const Router = () => {

    return (
        <div className="">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/recipes/:id" element={<Recipe />} />
                <Route path="/recipes/new" element={<AddRecipe />} />
                <Route path="/my-recipes" element={<MyRecipes />} />
            </Routes>
        </div>
    );
}

export default Router;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipe, toggleFavourite as toggleFavoriteAPI } from '../api/recipes';
import assets from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';


const Favourite = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let token = localStorage.getItem("token") || null;


    const loadFavorites = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");

            if (!token || !user) {
                setError("Please login to view favorites");
                setLoading(false);
                return;
            }

            const recipes = [];
            if (user.favorites && user.favorites.length > 0) {
                for (const recipeId of user.favorites) {
                    try {
                        const recipe = await getRecipe(recipeId);
                        if (recipe && recipe._id && recipe.title) {
                            recipes.push(recipe);
                        } 
                    } catch (err) {
                        console.error(`Error fetching recipe ${recipeId}:`, err);
                    }
                }
            }

            setFavoriteRecipes(recipes);
            if (user) {
                user.favorites = recipes.map(r => r._id);
                localStorage.setItem("user", JSON.stringify(user));
            }
            setLoading(false);
        } catch (err) {
            console.error("Error loading favorites:", err);
            setError("Error loading your favorites");
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleRemoveFavorite = async (recipeId) => {
        try {
            const response = await toggleFavoriteAPI(recipeId);
            
            if (!response || response.error) {
                console.error("Failed to remove favorite");
                return;
            }
            
            setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe._id !== recipeId));
        
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                user.favorites = response.favorites || [];
                localStorage.setItem("user", JSON.stringify(user));
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading text="Loading your favorite recipes..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 mt-16 min-h-screen sm:w-[80%]">
            <div className="flex flex-col sm:flex-row justify-between items-center">
            <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-700 mb-8">My Favorite Recipes</motion.h1>
            {token && (
                <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
                className="flex items-center gap-2 w-1/2 justify-center sm:justify-end mb-3">   
                <Link
                    to="/recipes/new"
                    className="bg-amber-700 w-full max-sm:w-[75%] sm:w-auto text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors text-center mb-2"
                >
                    Add your Own
                </Link>
                </motion.div>
            )}
            </div>
            
            {favoriteRecipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-gray-500 mb-4">You haven't added any favorites yet!</p>
                    <Link
                        to="/recipes"
                        className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-[#f6836b] transition-colors"
                    >
                        Browse Recipes
                    </Link>
                </div>
            ) : (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {favoriteRecipes.map((recipe, index) => (
                        <motion.div className="" 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8, delay: index * 0.3 }}
                            viewport={{ once: false }}
                            key={index}
                        >
                            <RecipeCard
                                key={recipe._id}
                                recipeId={recipe._id}
                                recipeImage={recipe.image}
                                recipeTitle={recipe.title}
                                recipeTime={recipe.time}
                                recipeRating={recipe.rating}
                            />
                        </motion.div>

                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Favourite;
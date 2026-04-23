import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipe, toggleFavourite as toggleFavoriteAPI } from '../api/recipes';
import assets from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';


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

            // Fetch full recipe details for each favorite recipe ID
            const recipes = [];
            if (user.favorites && user.favorites.length > 0) {
                for (const recipeId of user.favorites) {
                    try {
                        const recipe = await getRecipe(recipeId);
                        recipes.push(recipe);
                    } catch (err) {
                        console.error(`Error fetching recipe ${recipeId}:`, err);
                    }
                }
            }

            setFavoriteRecipes(recipes);
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
            
            // Remove from local state
            setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe._id !== recipeId));
            
            // Update user data with response favorites
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-700 mb-8">My Favorite Recipes</h1>
            {token && (
                <Link
                    to="/recipes/new"
                    className="bg-amber-700 w-full max-sm:w-[75%] sm:w-auto text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors text-center mb-2"
                >
                    Add your Own
                </Link>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {favoriteRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe._id}
                            recipeId={recipe._id}
                            recipeImage={recipe.image}
                            recipeTitle={recipe.title}
                            recipeTime={recipe.time}
                            recipeRating={recipe.rating}
                        />

                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourite;
import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe, getRecipes } from "../api/recipes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import AvgRating from '../components/avgRating';
import { Trash2 } from "lucide-react";
import Loading from '../components/Loading';



const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = localStorage.getItem("token") || null;
    const handleDeleteRecipe = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            await deleteRecipe(id);
            load();
        }
    }
    const load = async () => {
        try {
          const data = await getRecipes();
    
          if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            const userRecipes = data.filter(recipe => recipe.userId === user._id);
            setMyRecipes(userRecipes);
          } else {
            setMyRecipes([]);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error loading recipes:", error);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        load();
      }, []);
    
      if (loading) return <div className="flex justify-center items-center h-screen">
        <Loading text="Loading your recipes..." />
      </div>;
    

    return (
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 mt-20 min-h-screen sm:w-[80%]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-700 mb-8">My Recipes</h1>
            {myRecipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-gray-500 mb-4">You haven't added any recipes yet!</p>
                    <Link
                        to="/recipes/new"
                        className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-[#f6836b] transition-colors"
                    >
                        Add Recipe
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {myRecipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {recipe.image && (
                                <img
                                    src={`http://localhost:5000/images/${recipe.image}`}
                                    alt={recipe.title}
                                    className="w-full h-40 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800 mb-2">{recipe.title}</h2>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-600 mb-3">
                                    <FontAwesomeIcon icon={faClock} className="text-amber-700" /> {recipe.time} mins
                                </p>
                                <div className="flex items-center mb-3 ml-auto">
                                    <AvgRating id={recipe._id} />
                                </div>
                                </div>
                                <div className="flex items-center gap-2 w-full">
                                    <Link
                                        to={`/recipes/${recipe._id}`}
                                        className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors w-full text-center text-sm"
                                    >
                                        View Recipe
                                    </Link>
                                    <button 
                                        onClick={() => handleDeleteRecipe(recipe._id)}
                                        className='p-2 hover:scale-110 transition-transform'>
                                        <Trash2 size={25} className="text-red-500 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyRecipes;

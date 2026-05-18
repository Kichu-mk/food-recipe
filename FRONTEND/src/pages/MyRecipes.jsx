import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRecipe, getRecipes } from "../api/recipes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import AvgRating from '../components/avgRating';
import { Trash2 } from "lucide-react";
import Loading from '../components/Loading';
import { motion } from 'framer-motion';



const MyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    let token = localStorage.getItem("token") || null;
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
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
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 20}}
            className="container mx-auto px-2 sm:px-6 lg:px-8 py-8 mt-20 min-h-screen sm:w-[80%]">
            <div className="flex max-sm:flex-col items-center justify-between">
             <motion.h1
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
                className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-amber-700 mb-4 sm:mb-8">My Recipes
             </motion.h1>
             <motion.div
             whileHover={{ scale: 1.05 }}
             className="flex items-center justify-center max-sm:w-full">
                <Link
                        to="/recipes/new"
                        className="bg-amber-700 w-full max-sm:w-[75%] sm:w-auto text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors text-center mb-4"
                    >
                        Add More Recipe
                    </Link>
             </motion.div>
            </div>
            {myRecipes.length === 0 ? (
                <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5}}
                className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl text-gray-500 mb-4">You haven't added any recipes yet!</p>
                    <Link
                        to="/recipes/new"
                        className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-[#f6836b] transition-colors"
                    >
                        Add Recipe
                    </Link>
                </motion.div>
            ) : (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {myRecipes.map((recipe, index) => (
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8, delay: index * 0.3 }}
                        viewport={{ once: false }}
                        key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {recipe.image && (
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                    src={`${API_URL}/images/${recipe.image}`}
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
                                    <motion.div className="w-full flex justify-center"
                                     whileHover={{ scale: 1.1 }}
                                     transition={{ duration: 0.4 }}
                                     >
                                        <Link
                                        to={`/recipes/${recipe._id}`}
                                        className="bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors w-full text-center text-sm"
                                    >
                                        View Recipe
                                    </Link>
                                    </motion.div>
                                    <button 
                                        onClick={() => handleDeleteRecipe(recipe._id)}
                                        className='p-2 hover:scale-110 transition-transform'>
                                        <Trash2 size={25} className="text-red-500 cursor-pointer" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}

export default MyRecipes;

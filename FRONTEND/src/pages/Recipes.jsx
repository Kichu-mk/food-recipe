import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes, toggleFavourite as toggleFavoriteAPI } from "../api/recipes";
import assets from "../assets/assets";
import AvgRating from "../components/avgRating";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";
import { motion } from "framer-motion";



const Recipes = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;
  let token = localStorage.getItem("token") || null;
  
  

  const load = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
      setAllRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const searchRecipes = (query) => {
    if (!query) {
      setRecipes(allRecipes); 
      setCurrentPage(1);
      return;
    }
    const filteredRecipes = allRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setRecipes(filteredRecipes);
    setCurrentPage(1);
  };


  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  if (loading) return <div className="flex justify-center items-center h-screen">
    <Loading text="Loading recipes..." />
  </div>;

  return (
    <div className="min-h-screen mt-20 flex flex-col items-center px-2 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl sm:pt-3 gap-2 sm:gap-4">
        <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1 }}
        className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 text-amber-700 text-center sm:text-left">Cook it. Taste it. Love it.</motion.h1>
        <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1 }}
        className="flex items-center w-full sm:w-auto justify-center mb-2">
          <input onChange={(e) => searchRecipes(e.target.value)} type="search" placeholder="Search recipes..." className="border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-amber-500" />
        </motion.div>
        {token && (
          <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1 }}>
            <Link
            to="/recipes/new"
            className="bg-amber-700 w-full max-sm:w-3/4 max-sm:mb-5 sm:w-auto text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors text-center mb-2"
            >
              Add your Own
            </Link>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {recipes && currentRecipes.map((recipe, index) => (
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
      {
        totalPages > 1 && (
          <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{y: 0, opacity: 1}}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
      className="flex gap-4 mt-6 items-center justify-center mb-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:border-amber-700 hover:text-amber-700 transition-colors"
        >
          Previous
        </button>
        <span className="text-amber-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:border-amber-700 hover:text-amber-700 transition-colors"
        >
          Next
        </button>
      </motion.div>  
        )
      }
      

      {recipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No recipes found. Be the first to add one!</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;

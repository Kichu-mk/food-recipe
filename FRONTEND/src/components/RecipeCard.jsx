import React from "react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import AvgRating from "../components/avgRating";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { toggleFavourite } from "../api/recipes";
import { motion } from "framer-motion";

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const RecipeCard = ({ recipeId, recipeImage, recipeTitle, recipeTime, recipeRating }) => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    let token = localStorage.getItem("token") || null;
    const [favourites, setFavourites] = React.useState([]);
    const navigate = useNavigate();

  const handleViewRecipe = () => {
    // Save scroll position before navigating
    sessionStorage.setItem("recipesScrollY", window.scrollY);
    console.log("Saved scroll:", window.scrollY); 
    navigate(`/recipes/${recipeId}`);
  };


    const handleToggleFavorite = async (id) => {
        if (!token) {
          alert("Please login to add favorites");
          return;
        }
    
        try {
          const response = await toggleFavourite(id);
          
          if (!response || response.error) {
            console.error("Failed to toggle favorite");
            return;
          }
            setFavourites(response.favorites || []);
            let user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              user.favorites = response.favorites || [];
                localStorage.setItem("user", JSON.stringify(user));
            }
        } catch (error) {
          console.error("Error toggling favorite:", error);
        }
      };
      React.useEffect(() => {
        if (token) {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            setFavourites(user.favorites || []);
          }
        }
      }, [token]);

  return (
    <>
      <motion.div
          key={recipeId}
          variants={cardVariant}
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        {recipeImage && (
          <motion.img
            src={`${API_URL}/images/${recipeImage}`} 
            alt={recipeTitle}
            className="w-full h-40 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        )}
        <div className="p-4">
          <h2 className="text-lg font-bold text-amber-700 mb-2">
            {recipeTitle}
          </h2>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600  text-center">
              <FontAwesomeIcon icon={faClock} className="text-amber-700" />{" "}
              {recipeTime} Mins
            </p>
            <div className="text-sm text-gray-600  text-center h-6">
              <AvgRating id={recipeId} />
            </div>
          </div>
          <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 ">
          <button
              type="button"
              onClick={handleViewRecipe}
              className="bg-amber-500 w-full text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors text-center"
            >
              View Details
          </button>
            {token && (
              <motion.button
              whileHover={{scale: 1.4}}
              transition={{ duration: 0.4}}
                onClick={() => handleToggleFavorite(recipeId)}
                className="p-2 cursor-pointer"
              >
                <motion.img
                  src={
                    favourites.includes(recipeId)
                      ? assets.addIcon
                      : assets.removeIcon
                  }
                  alt="Favourite Icon"
                  className="w-8 h-8 object-cover"
                />
              </motion.button>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default RecipeCard;

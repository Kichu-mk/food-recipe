import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";
import AvgRating from "../components/avgRating";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { toggleFavourite } from "../api/recipes";


const RecipeCard = ({ recipeId, recipeImage, recipeTitle, recipeTime, recipeRating }) => {
    let token = localStorage.getItem("token") || null;
    const [favourites, setFavourites] = React.useState([]);


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
      <div
        key={recipeId}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        {recipeImage && (
          <img
            src={`http://localhost:5000/images/${recipeImage}`}
            alt={recipeTitle}
            className="w-full h-40 object-cover"
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
            <div className="text-sm text-gray-600  text-center">
              <AvgRating id={recipeId} />
            </div>
          </div>
          <div className="flex items-center gap-2 ">
          <Link
              to={`/recipes/${recipeId}`}
              className="bg-amber-500 w-full text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors text-center"
            >
              View Details
          </Link>
            {token && (
              <button
                onClick={() => handleToggleFavorite(recipeId)}
                className="p-2 hover:scale-110 transition-transform"
              >
                <img
                  src={
                    favourites.includes(recipeId)
                      ? assets.addIcon
                      : assets.removeIcon
                  }
                  alt="Favourite Icon"
                  className="w-8 h-8 object-cover"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;

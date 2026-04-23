import { use, useEffect, useState } from "react";
import { getRecipe, rateRecipe } from "../api/recipes";

const RatingComponent = ({ recipeId }) => {
  const [rating, setRating] = useState(0);

  const loadUserRating = async () => {
    try {
      const recipeData = await getRecipe(recipeId);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) { 
        const userRating = recipeData.ratings.find(r => r.userId === user._id)?.rating;
        if (userRating) {
          setRating(userRating);
          console.log("User rating found:", userRating);
        }
        else {
          console.log("No user rating found.");
        }
      }
    } catch (error) {
      console.error("Error loading user rating:", error);
    }
  };

  
  const handleRating = async (rate) => {
    const recipeData = await getRecipe(recipeId);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to rate this recipe.");
      return;
    }
    const userId= user._id;

    if (!token) {
      alert("Please log in to rate this recipe.");
      return;
    }
    else {
      setRating(rate);
    }
    try {
        const res = await rateRecipe(recipeId, rate);
    } catch (error) {
        console.error("Error rating recipe:", error);
    }
  };
  useEffect(() => {
    loadUserRating();
  }, [recipeId]);

 return (
      <div className="flex flex-col items-center justify-center  rounded-lg bg-amber-100 p-4 shadow-md">
      <h3 className="text-md font-semibold text-amber-700">Add Your Rating</h3>
      <div className="flex flex-row space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRating(star)}
            className={`text-3xl ${
                star <= rating ? "text-amber-500" : "text-gray-300"        
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
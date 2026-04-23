import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../api/recipes";
import assets from "../assets/assets";
import AnimatedBackground from "../components/AnimeBg";
import { getUser } from "../api/user";
import RatingComponent from "../components/Rating";
import AvgRating from "../components/avgRating";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { ChefHat } from "lucide-react";


function Recipe() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [owner, setOwner] = useState(null);
  
  const load = async () => {
      const data = await getRecipe(id);
      setLoading(false);
      setRecipe(data);
      const user = await getUser(data.userId);
      if (user.error) {
        setOwner({ name: "Unknown" });
        return;
      } 
      else if (!user) {
        setOwner({ name: "Unknown" });
        return;
      }
      else if (user.name) {
        setOwner(user);
        return;
      }
    };
    useEffect(() => {
      load();
    }, []);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-4xl font-bold text-amber-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen mt-20 sm:mt-24">
      <AnimatedBackground />
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl md:max-w-6xl shadow-lg rounded-2xl mb-10 bg-transparent relative z-10">
        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-6 md:gap-10">
          <div className="flex flex-col justify-center w-full sm:w-1/2 shadow-lg p-6 rounded-2xl bg-amber-50">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-amber-700 text-center sm:text-left">{recipe.title}</h1>
            <div className="flex justify-between items-center ">
              <div className="text-base sm:text-lg text-gray-700 mb-6 flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="text-amber-700" />
                 {recipe.time} mins</div>
              {owner && (
                <div className="text-base sm:text-lg text-gray-700 mb-8 flex items-end gap-1 justify-end">
                 <ChefHat size={30} className="text-amber-700" /> 
                 {owner.name}
                </div>
              )}
            </div>
            <div className="flex justify-center items-center">
              <div className="ml-2 flex items-center justify-between w-full ">
                <div className="flex flex-col items-center">
                  <p className="text-base sm:text-lg text-amber-700 ">Average Rating</p>
                  <AvgRating id={recipe._id} />
                </div>
                <RatingComponent recipeId={recipe._id} />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 ">
            <img
              src={recipe.image ? `http://localhost:5000/images/${recipe.image}` : assets.food1}
              alt="Recipe Image"
              className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="flex  max-sm:flex-col sm:items-start sm:justify-center sm:gap-10">
        <div className="mt-8 shadow-lg p-6 rounded-2xl bg-amber-50 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-amber-700">Ingredients</h2>
          <ul className="list-disc pl-5 text-base sm:text-lg text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="mb-2">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8 shadow-lg p-6 rounded-2xl bg-amber-50 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-amber-700">Instructions</h2>
          <ol className="list-decimal pl-5 text-base sm:text-lg text-gray-700">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-2">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Recipe;
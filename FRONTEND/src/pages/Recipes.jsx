import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api/recipes";

const Recipes = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const load = async () => {
    const data = await getRecipes();
    setLoading(false);
    setRecipes(data);
  };
  useEffect(() => {
    load();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen mt-25 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {recipes.map((recipe) => (
           <div className="bg-amber-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-[300px]">
                <img src="https://source.unsplash.com/400x300/?food" alt="Recipe Image" className="w-full h-40 object-cover" />
                <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mt-2">Time: {recipe.time} mins</p>
                <button className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors">
                    View Recipe
                </button>
                </div>
           </div>
    ))}
      </div>
    </div>
  );
};

export default Recipes;

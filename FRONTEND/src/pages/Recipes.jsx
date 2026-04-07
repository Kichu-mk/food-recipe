import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../api/recipes";
import assets from "../assets/assets";

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
    <div className="min-h-screen mt-20 flex flex-col items-center">
      <div className="flex max-sm:flex-col sm:flex-row justify-between gap-full items-center w-full max-w-6xl pt-3">
        <h1 className="sm:text-4xl p-1 text-2xl font-bold mb-6 text-amber-700">Cook it. Taste it. Love it.</h1>
        <Link
          to="/recipes/new"
          className="bg-amber-500 max-sm:w-70 sm:w-auto text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors text-center"
        >
          Add your Own
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {recipes.map((recipe) => (
          <div className="bg-amber-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-[300px] rounded-lg shadow-xl 
            transform transition-transform duration-500 
            hover:rotate-x-6 hover:rotate-y-6 hover:scale-105">
            <img
              src={assets.food1}
              alt="Recipe Image"
              className="w-full h-40 object-cover"
            />
            <div className="p-4 gap-2.5 flex flex-col justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {recipe.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Time: {recipe.time} mins
              </p>
              <Link
                to={`/recipes/${recipe._id}`}
                key={recipe._id}
                className=" bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-[#f6836b] transition-colors w-full text-center"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;

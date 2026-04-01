import React from "react";
import assets from "../assets/assets";

const HomePage = () => {
  return (
    <div className="container h-screen mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl flex max-sm:flex-col max-sm:justify-center sm:justify-between items-center">
      <div className="">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Food Recipe</h1>
        <p className="text-lg sm:text-xl mb-6">Discover delicious recipes and share your own culinary creations with our vibrant community.</p>
        <a href="/recipes" className="inline-block px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-700 transition duration-300">Explore Recipes</a>
      </div>
        <div className="animation-container w-100 sm:w-180 ">
          <img src={assets.cook} alt="" className="animated-image" />
      </div>
    </div>
  );
};

export default HomePage;

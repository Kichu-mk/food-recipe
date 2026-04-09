import React from "react";
import assets from "../assets/assets";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <div className="container mt-16 mx-auto px-2 sm:px-6 lg:px-8 py-8 max-w-4xl md:max-w-6xl flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-8">
        <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-amber-700 text-center sm:text-left">Welcome to RuchiKuttu</h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-600 text-center sm:text-left">Discover delicious recipes and share your own culinary creations with our vibrant community.</p>
          <a href="/recipes" className="inline-block px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-[#f6836b] transition duration-300">Explore Recipes</a>
        </div>
        <div className="animation-container w-48 sm:w-72 md:w-96 flex justify-center">
          <img src={assets.cook} alt="" className="w-full h-auto" />
        </div>
      </div>
      <div className="w-full h-32 sm:h-48 flex items-end -z-10 inset-0"
        style={{ backgroundImage: `url(${assets.foodbg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      </div>
    </div>
  );
};

export default HomePage;

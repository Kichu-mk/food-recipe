import React from "react";
import assets from "../assets/assets";
import { Link } from "react-router-dom";
import { delay, motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 1 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 1,
    },
  },
};


const HomePage = () => {

  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mt-16 mx-auto px-2 sm:px-6 lg:px-8 py-8 max-w-4xl md:max-w-6xl flex flex-col lg:flex-row justify-center sm:justify-between items-center gap-8">
        <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start">
          <motion.h1
           variants={item}
           className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-amber-700 text-center sm:text-left">Welcome to RuchiKootu</motion.h1>
          <motion.p
           variants={item}
           className="text-base sm:text-lg md:text-xl mb-6 text-gray-600 text-center sm:text-left">Discover delicious recipes and share your own culinary creations with our vibrant community.</motion.p>
          <motion.div className=""
           variants={item}>
            <Link
            to="/recipes"
            className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-[#f6836b] transition-colors"
          >
            Explore Recipes
          </Link>
          </motion.div>
        </div>
        <motion.div
         variants={imageVariant}
         className="animation-container w-90 sm:w-100 md:w-150 flex justify-center">
          <img src={assets.cook} alt="" className="w-full h-auto" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1 }}
       className="w-full h-32 sm:h-48 flex items-end -z-10 inset-0"
        style={{ backgroundImage: `url(${assets.foodbg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      </motion.div>
    </div>
  );
};

export default HomePage;

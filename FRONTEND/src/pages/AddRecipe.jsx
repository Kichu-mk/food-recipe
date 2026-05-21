import React from "react";
import AnimatedBackground from "../components/AnimeBg";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api/recipes";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false); // ✅ add this
  const [progress, setProgress] = React.useState(0); // ✅ add this
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setProgress(30);
    const title = e.target[0].value;
    const time = e.target[1].value;
    const ingredients = e.target[2].value.split("\n");
    const instructions = e.target[3].value.split("\n");
    const file = e.target[4].files[0];
    try {
      setProgress(60);
      await createRecipe(title, ingredients, instructions, time, file);
      setProgress(100);
      toast.success("Recipe added successfully!");
      navigate("/recipes");
    } catch (error) {
      toast.error("Failed to add recipe. Try again.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };
  return (
    <div>
      <AnimatedBackground />
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="flex justify-center items-center min-h-screen px-2 sm:px-6 lg:px-8 py-8"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-8 rounded-lg shadow-md bg-white"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: 0.5,
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-amber-700"
          >
            Add Your Own Recipe
          </motion.h1>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              delay: 0.8,
            }}
            className=""
          >
            <input
              type="text"
              placeholder="Recipe Title"
              className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded hover:border-amber-500 outline-amber-700 text-base sm:text-lg"
              required
            />
            <input
              type="number"
              placeholder="Time (in minutes)"
              className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded hover:border-amber-500 outline-amber-700 text-base sm:text-lg"
              required
            />
            <textarea
              placeholder="Ingredients (one per line)"
              className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded h-28 sm:h-32 hover:border-amber-500 outline-amber-700 text-base sm:text-lg"
              required
            ></textarea>
            <textarea
              placeholder="Instructions (one per line)"
              className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded h-28 sm:h-32 hover:border-amber-500 outline-amber-700 text-base sm:text-lg"
              required
            ></textarea>
            <input
              type="file"
              name="file"
              className="text-gray-400 w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded hover:border-amber-500 outline-amber-700 "
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 text-white py-2 sm:py-3 rounded hover:bg-[#f6836b] transition-colors text-base sm:text-lg"
            >
              Submit Recipe
            </motion.button>
          </motion.div>
          {loading && (
            <div className="w-full bg-gray-200 rounded h-1 mt-2 overflow-hidden">
              <div
                className="h-1 bg-amber-500 rounded transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          {loading && (
            <p className="text-center text-sm text-gray-400 mt-1">
              Uploading your recipe...
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddRecipe;

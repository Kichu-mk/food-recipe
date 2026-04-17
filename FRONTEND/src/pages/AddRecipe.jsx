import React from 'react';
import AnimatedBackground from '../components/AnimeBg';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../api/recipes';

const AddRecipe = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const time = e.target[1].value;
        const ingredients = e.target[2].value.split('\n');
        const instructions = e.target[3].value.split('\n');
        const file = e.target[4].files[0];
        await createRecipe(title, ingredients, instructions, time, file);
        navigate('/recipes');
        window.alert("Recipe created successfully!");
    }
    return (
        <div>
            <AnimatedBackground />
            <div className="flex justify-center items-center min-h-screen px-2 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-8 rounded-lg shadow-md bg-white">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-amber-700">Add Your Own Recipe</h1>
                    <input type="text" placeholder="Recipe Title" className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded hover:border-amber-500 outline-amber-700 text-base sm:text-lg" required />
                    <input type="number" placeholder="Time (in minutes)" className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded hover:border-amber-500 outline-amber-700 text-base sm:text-lg" required />
                    <textarea placeholder="Ingredients (one per line)" className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded h-28 sm:h-32 hover:border-amber-500 outline-amber-700 text-base sm:text-lg" required></textarea>
                    <textarea placeholder="Instructions (one per line)" className="w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded h-28 sm:h-32 hover:border-amber-500 outline-amber-700 text-base sm:text-lg" required></textarea>
                    <input type="file" name="file" className="text-gray-400 w-full mb-4 p-2 sm:p-3 border border-gray-300 rounded hover:border-amber-500 outline-amber-700 " />
                    <button type="submit" className="w-full bg-amber-500 text-white py-2 sm:py-3 rounded hover:bg-[#f6836b] transition-colors text-base sm:text-lg">Submit Recipe</button>
                </form>
            </div>
        </div>
    );
}

export default AddRecipe;

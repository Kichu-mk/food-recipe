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
        console.log("title:", title);
        console.log("time:", time);
        console.log("ingredients:", ingredients);
        console.log("instructions:", instructions);
        await createRecipe(title, ingredients, instructions, time);
        navigate('/recipes');
    }
    return (
        <div>
            <AnimatedBackground />
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-6 text-center text-amber-700">Add Your Own Recipe</h1>
                    <input type="text" placeholder="Recipe Title" className="w-full mb-4 p-2 border border-gray-300 rounded hover:border-amber-500 outline-amber-700" required />
                    <input type="number" placeholder="Time (in minutes)" className="w-full mb-4 p-2 border border-gray-300 rounded hover:border-amber-500 outline-amber-700" required />
                    <textarea placeholder="Ingredients (one per line)" className="w-full mb-4 p-2 border border-gray-300 rounded h-32 hover:border-amber-500 outline-amber-700" required></textarea>
                    <textarea placeholder="Instructions (one per line)" className="w-full mb-4 p-2 border border-gray-300 rounded h-32 hover:border-amber-500 outline-amber-700" required></textarea>
                    <input type="file" className="text-gray-400 w-full mb-4 p-2 border border-gray-300 rounded hover:border-amber-500 outline-amber-700 " />
                    <button type="submit" className="w-full bg-amber-500 text-white py-2 rounded hover:bg-[#f6836b] transition-colors ">Submit Recipe</button>
                </form>
            </div>
        </div>
    );
}

export default AddRecipe;

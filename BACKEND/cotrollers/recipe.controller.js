const Recipes = require('../models/recipe.model');

const getRecipes = async(req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
}

const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
    return res.json(recipe);
}

const createRecipe = async (req, res) => {
    const { title, ingredients, instructions, time } =req.body;

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const newRecipe = await Recipes.create({
        title, ingredients, instructions, time
    })
    return res.json({ message: "Recipe created", newRecipe });
}

const updateRecipe = async(req, res) => {
    const { title, ingredients, instructions, time } =req.body;
    let recipe = await Recipes.findById(req.params.id);
    try{
        if(recipe) {
        await Recipes.findByIdAndUpdate(req.params.id,req.body, { new:true})
        res.json({title, ingredients, instructions, time}) 
        }   
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating recipe', error });
    }
}

const deleteRecipe = async (req, res) => {
    const recipe = await Recipes.findByIdAndDelete(req.params.id);
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }
    return res.json({ message: 'Recipe deleted successfully!' });
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
const Recipes = require('../models/recipe.model');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes = async(req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
}

const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
    return res.json(recipe);
}

const createRecipe = async (req, res) => {
    let { title, ingredients, instructions, time } = req.body;
    let image = req.file ? req.file.filename : undefined;

    // Ensure ingredients and instructions are arrays
    if (typeof ingredients === "string") {
        ingredients = ingredients.split('\n').filter(line => line.trim() !== '');
    }
    if (typeof instructions === "string") {
        instructions = instructions.split('\n').filter(line => line.trim() !== '');
    }

    if (!title || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const newRecipe = await Recipes.create({
        title,
        ingredients,
        instructions,
        time,
        image
    });
    return res.json({ message: "Recipe created", newRecipe });
}

const updateRecipe = async(req, res) => {
    let { title, ingredients, instructions, time } = req.body;

    // Ensure ingredients and instructions are arrays
    if (typeof ingredients === "string") {
        ingredients = ingredients.split('\n').filter(line => line.trim() !== '');
    }
    if (typeof instructions === "string") {
        instructions = instructions.split('\n').filter(line => line.trim() !== '');
    }

    let recipe = await Recipes.findById(req.params.id);
    try{
        if(recipe) {
            await Recipes.findByIdAndUpdate(req.params.id, {
                title,
                ingredients,
                instructions,
                time
            }, { new:true });
            res.json({title, ingredients, instructions, time});
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
    deleteRecipe,
    upload
}
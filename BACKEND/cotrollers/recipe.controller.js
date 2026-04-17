const Recipe = require('../models/recipe.model');
const multer = require('multer');

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
    try {
        const recipes = await Recipe.find();
        return res.json(recipes);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching recipes', error });
    }
}

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        return res.json(recipe);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching recipe', error });
    }
}

const createRecipe = async (req, res) => {
    try {
        let { title, ingredients, instructions, time } = req.body;
        let image = req.file ? req.file.filename : undefined;

        // Ensure ingredients and instructions are arrays
        if (typeof ingredients === "string") {
            ingredients = ingredients.split('\n').filter(line => line.trim() !== '');
        }
        if (typeof instructions === "string") {
            instructions = instructions.split('\n').filter(line => line.trim() !== '');
        }

        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            time,
            image,
            userId: req.userId
        });

        return res.status(201).json({ message: 'Recipe created successfully', recipe });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating recipe', error });
    }
}

const updateRecipe = async (req, res) => {
    try {
        let { title, ingredients, instructions, time } = req.body;
        
        if (typeof ingredients === "string") {
            ingredients = ingredients.split('\n').filter(line => line.trim() !== '');
        }
        if (typeof instructions === "string") {
            instructions = instructions.split('\n').filter(line => line.trim() !== '');
        }

        const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
            title,
            ingredients,
            instructions,
            time
        }, { new: true });

        return res.json({ message: 'Recipe updated successfully', recipe });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating recipe', error });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        return res.json({ message: 'Recipe deleted successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting recipe', error });
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    upload
}

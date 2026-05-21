const Recipe = require('../models/recipe.model');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'recipes',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

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
        
        let image = req.file ? req.file.path : undefined;

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

const recipeRating = async (req, res) => {
    try {
        let { rating, userId } = req.body;
        console.log(rating);
        console.log(userId);
        const recipe = await Recipe.findById(req.params.id);
        const existingRating = recipe.ratings.find(r => r.userId.toString() === userId);
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            recipe.ratings.push({ userId, rating });
        }
        await recipe.save();
        res.json({ message: 'Rating added successfully!' });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding rating', error });
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    upload,
    recipeRating
}

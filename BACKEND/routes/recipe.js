const express = require('express');
const { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, upload, recipeRating } = require('../cotrollers/recipe.controller');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', verifyToken, upload.single('file'), createRecipe);
router.put('/:id', verifyToken, updateRecipe);
router.delete('/:id', verifyToken, deleteRecipe);
router.put('/:id/rate', recipeRating);

module.exports = router;
const express = require('express');
const { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe } = require('../cotrollers/recipe.controller');
const router = express.Router();

router.get('/', getRecipes );
router.get('/:id', getRecipe );
router.post('/', createRecipe );
router.put('/:id', updateRecipe );
router.delete('/:id', deleteRecipe );

module.exports = router;
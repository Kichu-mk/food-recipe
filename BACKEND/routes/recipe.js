const express = require('express');
const { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, upload } = require('../cotrollers/recipe.controller');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', verifyToken, upload.single('file'), createRecipe);
router.put('/:id', verifyToken, updateRecipe);
router.delete('/:id', verifyToken, deleteRecipe);

module.exports = router;
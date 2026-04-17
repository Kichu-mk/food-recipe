const express = require('express');
const router = express.Router();
const { userSignUp, userLogin, getUser, toggleFavorite, getUserFavorites } = require('../cotrollers/user.controller');
const { verifyToken } = require('../middleware/auth');

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);

// Protected routes for favorites
router.post("/favorites/toggle", verifyToken, toggleFavorite);
router.get("/favorites", verifyToken, getUserFavorites);

module.exports = router;

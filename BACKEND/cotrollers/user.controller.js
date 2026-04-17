const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        } 
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } 
        const hashedPassword = await bcrypt.hash(password, 10);  
        const newUser = await User.create({ name, email, password: hashedPassword });    
        let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
        return res.status(200).json({ token, user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Signup error", error });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        let user = await User.findOne({ email });
        if(user && await bcrypt.compare(password, user.password)) {
            let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
            return res.status(200).json({ token, user });
        }
        else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Login error", error });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ email: user.email, id: user._id, name: user.name });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
}

const toggleFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.userId;
        
        if (!recipeId) {
            return res.status(400).json({ message: 'Recipe ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isFavorited = user.favorites.includes(recipeId);
        
        if (isFavorited) {
            user.favorites = user.favorites.filter(fav => fav !== recipeId);
        } else {
            user.favorites.push(recipeId);
        }
        
        await user.save();
        return res.status(200).json({ 
            message: isFavorited ? 'Recipe removed from favorites' : 'Recipe added to favorites',
            isFavorited: !isFavorited,
            favorites: user.favorites
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error toggling favorite', error });
    }
};

const getUserFavorites = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching favorites', error });
    }
};

module.exports = {
    userSignUp,
    userLogin,
    getUser,
    toggleFavorite,
    getUserFavorites
}

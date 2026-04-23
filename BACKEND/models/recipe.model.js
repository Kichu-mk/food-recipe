const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },
    time: {
        type: Number,
    },
    image: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
      rating: { type: Number, min: 1, max: 5 }
    }
  ]
},{timestamps: true});

module.exports = mongoose.model('Recipes', recipeSchema);
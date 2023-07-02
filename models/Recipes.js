/**
 * Importing the necessary modules.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creating a new Mongoose schema for the Recipe model.
 */
const RecipeSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    recipeName: {
        type: String,
        required: true,
    },
    recipeDescription: {
        type: String,
        required: true,
    },
    recipeIngredients: {
        type: Array,
    },
    recipeCategorys: {
        type: Array,
    },
    recipeDifficulty: {
        type: String,
        default: "Easy",
    },
    recipeCallories: {
        type: Number,
    },
    recipeTime: {
        type: String,
    },
    recipeRating: {
        type: Number,
        default: 0
    },
    recipeComments: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Image: {
        type: String,
    }
});

/**
 * Creating a Recipe model using the RecipeSchema.
 * The model represents a collection in the MongoDB database.
 * The first argument is the singular name of the collection that will be created for this model,
 * and the second argument is the schema to be used for the collection.
 */
const Recipe = mongoose.model('Recipe', RecipeSchema);

/**
 * Exporting the Recipe model to make it available for other parts of the codebase.
 */
module.exports = Recipe;

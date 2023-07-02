/**
 * Importing the necessary modules.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creating a new Mongoose schema for the Comment model.
 */
const CommentSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    recipeId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

/**
 * Creating a Comment model using the CommentSchema.
 * The model represents a collection in the MongoDB database.
 * The first argument is the singular name of the collection that will be created for this model,
 * and the second argument is the schema to be used for the collection.
 */
const Comment = mongoose.model('Comment', CommentSchema);

/**
 * Exporting the Comment model to make it available for other parts of the codebase.
 */
module.exports = Comment;

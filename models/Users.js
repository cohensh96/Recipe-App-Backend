/**
 * Importing the necessary modules.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creating a new Mongoose schema for the User model.
 */
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    roles: {
        User: { 
            type: Number,
            default: 80085
        },
        Admin: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: String
});

/**
 * Creating a User model using the userSchema.
 * The model represents a collection in the MongoDB database.
 * The first argument is the singular name of the collection that will be created for this model,
 * and the second argument is the schema to be used for the collection.
 */
const User = mongoose.model('User', userSchema);

/**
 * Exporting the User model to make it available for other parts of the codebase.
 */
module.exports = User;

/**
 * Importing the necessary modules.
 */
const express = require('express');

/**
 * Creating a new instance of an Express router.
 * The router allows us to define routes for our application.
 */
const router = express.Router();

/**
 * Importing the registerController from the '../controllers/registerController' file.
 * The registerController handles the logic for the user registration route.
 */
const registerController = require('../controllers/registerController');

/**
 * Route: /register
 */

// POST /register
// Route for user registration
router.post('/', registerController.registerUser);

/**
 * Exporting the router to make it available for other parts of the codebase.
 */
module.exports = router;

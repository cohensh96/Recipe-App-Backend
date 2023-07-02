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
 * Importing the loginController from the '../controllers/authController' file.
 * The loginController handles the logic for the authentication routes.
 */
const loginController = require('../controllers/authController');

/**
 * Defining the route for handling user logout.
 * This route handles the GET request for user logout.
 */
router.get('/', loginController.handleLogout);

/**
 * Exporting the router to make it available for other parts of the codebase.
 */
module.exports = router;

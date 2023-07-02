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
 * The loginController handles the logic for the login route.
 */
const loginController = require('../controllers/authController');

/**
 * Defining the route for the login functionality.
 * This route is accessible via a POST request to the root path ('/').
 * When a POST request is made to this route, the loginController's handleLogin function is invoked.
 */
router.route('/').post(loginController.handleLogin);

/**
 * Exporting the router to make it available for other parts of the codebase.
 */
module.exports = router;

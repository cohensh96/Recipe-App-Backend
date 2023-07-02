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
 * Importing the usersController from the '../controllers/usersController' file.
 * The usersController handles the logic for the user-related routes.
 */
const usersController = require('../controllers/usersController');

/**
 * Importing the verifyRoles middleware from the '../middleware/verifyRoles' file.
 * The verifyRoles middleware verifies the user's roles before allowing access to certain routes.
 */
const verifyRoles = require('../middleware/verifyRoles');

/**
 * Importing the ROLES_LIST from the '../config/rolesList' file.
 * The ROLES_LIST defines the roles allowed for user authorization.
 */
const ROLES_LIST = require('../config/rolesList');

/**
 * Route: /users
 */

// GET /users
// PUT /users
// Route for retrieving and updating user information
router.route('/')
    .get(usersController.getUserJWT)
    .put(usersController.updateUser);

/**
 * Route: /users/handle
 */

// GET /users/handle
// PUT /users/handle
// DELETE /users/handle
// Route for handling user management operations (only accessible by admins)
router.route('/handle')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .put(verifyRoles(ROLES_LIST.Admin), usersController.editRolesUser)
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

/**
 * Route: /users/:id
 */

// GET /users/:id
// Route for retrieving user information by ID (only accessible by admins)
router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

/**
 * Exporting the router to make it available for other parts of the codebase.
 */
module.exports = router;

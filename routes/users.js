const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');

/**
 * Route: /users
 */

// GET /users
// PUT /users
// Route for retrieving and updating user information

router.route('/').get(usersController.getUserJWT)
                 .put(usersController.updateUser);
/**
 * Route: /users/handle
 */

// GET /users/handle
// PUT /users/handle
// DELETE /users/handle
// Route for handling user management operations (only accessible by admins)

router.route('/handle')
.get(verifyRoles(ROLES_LIST.Admin),usersController.getAllUsers)
.put(verifyRoles(ROLES_LIST.Admin), usersController.editRolesUser)
.delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

/**
 * Route: /users/:id
 */

// GET /users/:id
// Route for retrieving user information by ID (only accessible by admins)

router.route('/:id').get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);


module.exports = router;
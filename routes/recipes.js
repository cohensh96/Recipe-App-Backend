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
 * Importing the verifyJWT middleware from the '../middleware/verfiyJWT' file.
 * The verifyJWT middleware is used to verify the JSON Web Token (JWT) for authentication.
 */
const verifyJWT = require('../middleware/verfiyJWT');

/**
 * Importing the recipeController from the '../controllers/recipesController' file.
 * The recipeController handles the logic for the recipe-related routes.
 */
const recipeController = require('../controllers/recipesController');

/**
 * Importing the upload and uniqeFile middleware.
 * The upload middleware is used for handling file uploads.
 * The uniqeFile middleware generates a unique file ID for uploaded files.
 */
const upload = require('../middleware/upload');
const uniqeFile = require('../middleware/uniqeFile');

/**
 * Route: /recipes
 */

// GET /recipes
// Route for getting all recipes
router.get('/', recipeController.getAllRecipes);

// POST /recipes
// Route for creating a new recipe
// The uniqeFile and upload middleware are used to handle file uploads.
// The verifyJWT middleware is used to verify the JWT for authentication.
router.post('/',verifyJWT, uniqeFile, upload.single('uploadedImage'),  recipeController.createRecipe);

// PUT /recipes
// Route for updating a recipe
// The verifyJWT middleware is used to verify the JWT for authentication.
router.put('/', verifyJWT, recipeController.updateRecipe);

// DELETE /recipes
// Route for deleting a recipe
// The verifyJWT middleware is used to verify the JWT for authentication.
router.delete('/', verifyJWT, recipeController.deleteRecipe);

/**
 * Route: /recipes/top
 */

// GET /recipes/top
// Route for getting the top rated recipes
router.get('/top', recipeController.getBestRecipes);

/**
 * Route: /recipes/search/:userlimit?
 */

// GET /recipes/search/:userlimit?
// Route for searching user recipes with optional limit
// The verifyJWT middleware is used to verify the JWT for authentication.
router.get('/search/:userlimit?', verifyJWT, recipeController.getUserRecipes);

/**
 * Route: /recipes/avarage
 */

// GET /recipes/avarage
// Route for getting the average rating of user recipes
// The verifyJWT middleware is used to verify the JWT for authentication.
router.get('/avarage', verifyJWT, recipeController.getUserAvarage);

/**
 * Route: /recipes/:id
 */

// GET /recipes/:id
// Route for getting a single recipe by ID
router.get('/:id', recipeController.getSingleRecipe);

/**
 * Exporting the router to make it available for other parts of the codebase.
 */
module.exports = router;

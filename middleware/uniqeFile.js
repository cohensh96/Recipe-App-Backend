/**
 * Importing the necessary modules and dependencies.
 */
const { v4: uuidv4 } = require('uuid');
const crypto = require("crypto");

/**
 * Middleware function to generate a unique file identifier.
 * Generates a unique ID using the UUIDv4 algorithm.
 * Assigns the generated ID to the 'imageId' property of the request object.
 * Calls the next() function to pass the request to the next middleware.
 */
const uniqueFile = (req, res, next) => {
    const id = crypto.randomBytes(16).toString("hex");
    req.imageId = id;
    next();
}

/**
 * Exporting the uniqueFile middleware function to make it available for other parts of the codebase.
 */
module.exports = uniqueFile;

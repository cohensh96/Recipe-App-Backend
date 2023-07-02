/**
 * Importing the necessary module.
 */
const jwt = require('jsonwebtoken');

/**
 * Middleware function to verify and decode a JSON Web Token (JWT) from the request headers.
 * Extracts the JWT from the 'Authorization' or 'authorization' header.
 * Verifies the JWT using the provided secret and handles the decoded payload.
 * Sets the user information and roles from the decoded payload to the request object.
 * Calls the next() function to pass the request to the next middleware.
 */
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the header starts with 'Bearer ' to ensure it's a valid token
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token using the provided secret
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Invalid token
            }

            // Set the user information and roles from the decoded payload to the request object
            req.user = decoded.UserInfo.username;
            req.firstname = decoded.UserInfo.firstname;
            req.lastname = decoded.UserInfo.lastname;
            req.email = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles;

            // Call the next() function to pass the request to the next middleware
            next();
        }
    );
};

/**
 * Exporting the verifyJWT middleware function to make it available for other parts of the codebase.
 */
module.exports = verifyJWT;

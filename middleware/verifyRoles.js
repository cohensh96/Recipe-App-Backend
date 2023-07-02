/**
 * Middleware function to verify user roles.
 * Takes a variable number of allowed roles as parameters.
 * Checks if the user has any of the allowed roles in the request's roles array.
 * If the user has an allowed role, calls the next() function to pass the request to the next middleware.
 * If the user does not have any allowed role, sends a 401 Unauthorized response.
 */
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if the request has roles assigned
        if (!req?.roles) {
            return res.sendStatus(401);
        }

        // Convert the allowed roles into an array
        const rolesArray = [...allowedRoles];

        // Check if any of the allowed roles match the user's roles
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        // If no match is found, send a 401 Unauthorized response
        if (!result) {
            return res.sendStatus(401);
        }

        // Call the next() function to pass the request to the next middleware
        next();
    };
};

/**
 * Exporting the verifyRoles middleware function to make it available for other parts of the codebase.
 */
module.exports = verifyRoles;

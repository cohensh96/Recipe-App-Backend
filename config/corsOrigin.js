/**
 * Importing the allowedOrigins array from the './allowedOrigins' module.
 * This array contains a list of allowed origins for CORS configuration.
 */
const allowedOrigins = require('./allowedOrigins');

/**
 * Configuration object for CORS (Cross-Origin Resource Sharing).
 * Defines the behavior for allowing or blocking requests from different origins.
 */
const corsSettings = {
    /**
     * The origin function is used to determine if a request should be allowed or blocked.
     * It receives the 'origin' parameter, which represents the origin of the incoming request.
     * The 'callback' parameter is used to signal whether the request is allowed or blocked.
     */
    origin: (origin, callback) => {
        /**
         * If the origin of the request is found in the allowedOrigins array
         * or if the origin is empty (e.g., for same-origin requests), allow the request.
         * The 'callback' function is called with 'null' as the first argument to indicate success.
         */
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            /**
             * If the origin is not found in the allowedOrigins array,
             * block the request by calling the 'callback' function with an error.
             */
            callback(new Error('Not allowed by CORS'));
        }
    },
    /**
     * The 'optionsSuccessStatus' property sets the status code to be sent for a successful preflight request.
     * In this case, a value of 200 is set to indicate a successful response.
     */
    optionsSuccessStatus: 200
};

/**
 * Exporting the corsSettings object to make it available for other parts of the codebase.
 * This object contains the configuration settings for CORS.
 */
module.exports = corsSettings;

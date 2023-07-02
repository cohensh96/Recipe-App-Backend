/**
 * Importing the 'mongoose' module, which provides a convenient way to interact with MongoDB databases.
 */
const mongoose = require('mongoose');

/**
 * Asynchronous function to establish a connection with the MongoDB database.
 * This function uses the 'mongoose.connect()' method to connect to the database.
 * It takes no parameters.
 */
const connectDB = async () => {
    try {
        /**
         * The 'mongoose.connect()' method is an asynchronous operation that establishes a connection
         * to the MongoDB database specified by the 'process.env.DATABASE_URI' environment variable.
         * The 'useUnifiedTopology' and 'useNewUrlParser' options are set to true for avoiding deprecation warnings.
         */
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        /**
         * If an error occurs during the database connection, it is caught and logged to the console.
         */
        console.log(error);
    }
};

/**
 * Exporting the 'connectDB' function to make it available for other parts of the codebase.
 * This function can be called to establish a connection with the MongoDB database.
 */
module.exports = connectDB;

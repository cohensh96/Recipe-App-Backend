/**
 * Importing the necessary models and dependencies required for user registration.
 */
const User = require("../models/Users");
const bcrypt = require('bcrypt');

/**
 * Registers a new user.
 * Requires various fields in the request body, including username, password, first name, last name, email, and password confirmation.
 * Validates the request body for missing fields and checks for duplicated usernames and emails.
 * Hashes the password using bcrypt and creates a new user document in the database.
 * Returns a success message indicating that the user has been registered.
 */
const registerUser = async (req, res) => {
    try {
        if (req?.body === undefined)
            return res.status(404).json({ "message": "Missing fields in user register" });

        const { username, password, firstname, lastname, email, confirm } = req.body;

        if (!req?.body?.username ||
            !req?.body?.password ||
            !req?.body?.firstname ||
            !req?.body?.lastname ||
            !req?.body?.email ||
            !req?.body?.confirm)
            return res.status(404).json({ "message": "Missing fields in user register" });

        if (req?.body?.password !== req?.body?.confirm)
            return res.status(404).json({ "message": "Some fields do not meet the requirements" });

        const duplicatedUser = await User.findOne({ username: req?.body?.username });
        const duplicatedEmail = await User.findOne({ email: req?.body?.email });

        if (duplicatedUser)
            return res.status(409).json({ "message": "Username already taken. Please choose a different one" });

        if (duplicatedEmail)
            return res.status(409).json({ "message": "Email already taken. Please choose a different one" });

        const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
        const result = User.create({
            username: req?.body?.username,
            password: hashedPassword,
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
        });

        return res.status(201).json({ "Success": `New user ${username} has been created` });
    } catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}

/**
 * Exporting the function to make it available for other parts of the codebase.
 */
module.exports = { registerUser };

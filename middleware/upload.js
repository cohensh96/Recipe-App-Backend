/**
 * Importing the necessary modules and dependencies.
 */
const multer = require('multer');
const fs = require('fs');
const path = require('path');

/**
 * Configuration for file upload using Multer.
 * Defines the storage destination and file naming conventions.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create the 'uploads' directory if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, "..", 'uploads'))) {
            fs.mkdirSync(path.join(__dirname, "..", 'uploads'));
        }
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the imageId and original file extension
        const ext = path.extname(file.originalname);
        req.fileName = `${req.imageId}${ext}`;
        cb(null, `${req.imageId}${ext}`);
    }
});

/**
 * File filter function for Multer to only allow specific file types.
 * Allows only image files with the MIME types of 'image/jpeg', 'image/png', and 'image/jpg'.
 */
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/**
 * Configure the multer upload middleware with the defined storage and file filter.
 */
const upload = multer({
    storage,
    fileFilter
});

/**
 * Export the upload middleware to make it available for other parts of the codebase.
 */
module.exports = upload;

const app = require('../backend/app');
const connectDatabase = require('../backend/config/database');

// Cache the database connection
let dbConnection = null;

module.exports = async (req, res) => {
    if (!dbConnection) {
        dbConnection = await connectDatabase();
    }

    // Cloudinary config (copied from server.js for serverless context)
    const cloudinary = require('cloudinary');
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return app(req, res);
};

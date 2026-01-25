const connectDatabase = require('../backend/config/database');

// Cache the database connection
let dbConnection = null;

module.exports = async (req, res) => {
    try {
        console.log("Function started...");

        // Lazy load app to catch startup errors
        const app = require('../backend/app');
        console.log("App loaded successfully.");

        if (!dbConnection) {
            dbConnection = await connectDatabase();
            console.log("Database connection attempted.");
        }

        // Cloudinary config
        const cloudinary = require('cloudinary');
        if (process.env.CLOUDINARY_NAME) {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
        }

        return app(req, res);
    } catch (error) {
        console.error("Vercel Function Crash:", error);
        res.status(500).json({
            success: false,
            message: "Vercel Function Crashed",
            error: error.message,
            stack: error.stack,
            env_debug: {
                mongo: !!process.env.MONGO_URI,
                node: process.version
            }
        });
    }
};

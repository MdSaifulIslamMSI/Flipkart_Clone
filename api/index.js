// Vercel serverless entry point — lazily initializes the Express app
// and database connection for each cold start.

const connectToDatabase = require("../backend/config/database");

let appInstance = null;

const getApp = async () => {
    if (!appInstance) {
        // Load env vars
        require("dotenv").config({ path: "./backend/config/config.env" });

        // Set up Cloudinary
        const cloudinary = require("cloudinary");
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // Connect to MongoDB
        await connectToDatabase();

        // Load the Express app
        appInstance = require("../backend/app");
    }
    return appInstance;
};

module.exports = async (req, res) => {
    try {
        const app = await getApp();
        return app(req, res);
    } catch (err) {
        console.error("Serverless function failed:", err);
        res.status(500).json({ success: false, message: "Server initialization failed" });
    }
};

// Main entry point — boots up the Express application and
// establishes connections to external services (DB, Cloudinary).

const expressApp = require("./backend/app");
const connectToDatabase = require("./backend/config/database");
const cloudinary = require("cloudinary");
const path = require("path");

// Load environment variables before anything else
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

// Catch any uncaught exceptions early so the process doesn't silently fail
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

// Wire up the database
connectToDatabase();

// Wire up Cloudinary for image hosting
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// In production, serve the React build as static files
if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname, "frontend", "build");
    expressApp.use(require("express").static(buildPath));

    // Any route that doesn't match an API endpoint gets the React app
    expressApp.get("*", (_req, res) => {
        res.sendFile(path.resolve(buildPath, "index.html"));
    });
}

// Start listening on the configured port
const PORT = process.env.PORT || 4000;
const server = expressApp.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
});

// If a promise is rejected and nobody catches it, shut down cleanly
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

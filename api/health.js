// Health check endpoint for Vercel deployments.
// Returns basic server status and environment readiness.

module.exports = (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        environment: {
            database: process.env.MONGO_URI ? "configured" : "missing",
            cloudinary: process.env.CLOUDINARY_NAME ? "configured" : "missing",
        },
    });
};

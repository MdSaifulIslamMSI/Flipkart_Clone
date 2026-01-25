module.exports = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Health check passed! Vercel is working.",
        env: {
            node: process.version,
            mongo_uri_exists: !!process.env.MONGO_URI,
            jwt_secret_exists: !!process.env.JWT_SECRET
        }
    });
};

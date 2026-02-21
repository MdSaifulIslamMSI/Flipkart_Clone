// Central error-handling middleware — transforms raw errors
// into clean JSON responses with the right HTTP status code.

const handleErrors = (err, _req, res, _next) => {
    // Default to 500 Internal Server Error if nothing else applies
    const statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong on our end";

    // MongoDB: invalid ObjectId format (e.g. wrong product ID in URL)
    if (err.name === "CastError") {
        message = `Invalid value for ${err.path}: ${err.value}`;
    }

    // MongoDB: duplicate key (e.g. email already registered)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(", ");
        message = `A record with that ${field} already exists`;
    }

    // JWT: token has been tampered with
    if (err.name === "JsonWebTokenError") {
        message = "Your authentication token is invalid. Please log in again.";
    }

    // JWT: token has expired
    if (err.name === "TokenExpiredError") {
        message = "Your session has expired. Please log in again.";
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = handleErrors;
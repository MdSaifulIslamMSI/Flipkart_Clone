// Custom error class — attaches an HTTP status code to each error
// so the central error handler knows what to respond with.

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = AppError;
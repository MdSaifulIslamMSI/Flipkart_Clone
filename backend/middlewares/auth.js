// Authentication and authorization middleware.
// verifyLogin — checks for a valid JWT in cookies
// restrictToRoles — limits access to specific user roles (e.g. admin)

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/errorHandler");
const catchAsync = require("./asyncErrorHandler");

// Checks if the user has a valid auth token in their cookies
const verifyLogin = catchAsync(async (req, _res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Please log in to access this page", 401));
    }

    // Decode the token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the full user document to the request for downstream use
    req.user = await User.findById(decoded.id);
    next();
});

// Restricts access to users whose role matches one of the allowed roles
const restrictToRoles = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("You do not have permission for this action", 403));
        }
        next();
    };
};

module.exports = { verifyLogin, restrictToRoles };
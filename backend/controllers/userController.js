// User controller — handles authentication (register, login, logout),
// profile management, password reset, and admin user operations.

const User = require("../models/userModel");
const catchAsync = require("../middlewares/asyncErrorHandler");
const AppError = require("../utils/errorHandler");
const sendAuthCookie = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// ── Authentication ─────────────────────────────────────

// POST /register — create a new user account
exports.signUpNewUser = catchAsync(async (req, res) => {
    const { name, email, gender, password, avatar } = req.body;

    let avatarData = { public_id: "default_avatar", url: "https://res.cloudinary.com/demo/image/upload/v1/avatars/default" };

    // Upload avatar image if provided
    if (avatar && avatar !== "/profile.png") {
        const uploadResult = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        avatarData = { public_id: uploadResult.public_id, url: uploadResult.secure_url };
    }

    const newUser = await User.create({
        name,
        email,
        gender,
        password,
        avatar: avatarData,
    });

    sendAuthCookie(newUser, 201, res);
});

// POST /login — authenticate with email and password
exports.authenticateUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please enter both email and password", 400));
    }

    // Need to explicitly select password since it's excluded by default
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new AppError("Invalid email or password", 401));
    }

    const passwordMatches = await user.verifyPassword(password);
    if (!passwordMatches) {
        return next(new AppError("Invalid email or password", 401));
    }

    sendAuthCookie(user, 200, res);
});

// GET /logout — clear the auth cookie
exports.signOutUser = catchAsync(async (_req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
});

// ── Profile Management ──────────────────────────────────

// GET /me — fetch the currently logged-in user's profile
exports.fetchMyProfile = catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
});

// PUT /me/update — update the logged-in user's profile
exports.updateMyProfile = catchAsync(async (req, res) => {
    const updates = { name: req.body.name, email: req.body.email };

    // If a new avatar was uploaded, replace the old one
    if (req.body.avatar && req.body.avatar !== "") {
        const currentUser = await User.findById(req.user.id);

        // Remove old avatar from Cloudinary (unless it's the default)
        if (currentUser.avatar?.public_id && currentUser.avatar.public_id !== "default_avatar") {
            await cloudinary.v2.uploader.destroy(currentUser.avatar.public_id);
        }

        const uploadResult = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        updates.avatar = { public_id: uploadResult.public_id, url: uploadResult.secure_url };
    }

    await User.findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true });
});

// PUT /password/update — change the logged-in user's password
exports.changePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const currentPasswordValid = await user.verifyPassword(req.body.oldPassword);
    if (!currentPasswordValid) {
        return next(new AppError("Current password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new AppError("New password and confirmation do not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendAuthCookie(user, 200, res);
});

// ── Password Reset Flow ────────────────────────────────

// POST /password/forgot — send a password reset email
exports.requestPasswordReset = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError("No account found with that email", 404));
    }

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `https://${req.get("host")}/password/reset/${resetToken}`;

    try {
        await sendEmail({
            email: user.email,
            templateId: process.env.SENDGRID_RESET_TEMPLATEID,
            data: { reset_url: resetUrl },
        });

        res.status(200).json({
            success: true,
            message: `Password reset link sent to ${user.email}`,
        });
    } catch (err) {
        // If email sending fails, clear the reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError("Failed to send reset email. Please try again.", 500));
    }
});

// PUT /password/reset/:token — set a new password using the reset token
exports.resetPassword = catchAsync(async (req, res, next) => {
    // Hash the token from the URL to compare with the stored hash
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new AppError("Reset token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendAuthCookie(user, 200, res);
});

// ── Admin: User Management ─────────────────────────────

// GET /admin/users — fetch all users
exports.fetchAllUsers = catchAsync(async (_req, res) => {
    const users = await User.find();
    res.status(200).json({ success: true, users });
});

// GET /admin/user/:id — fetch a single user by ID
exports.fetchSingleUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError(`User not found with ID: ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, user });
});

// PUT /admin/user/:id — update a user's role or details
exports.modifyUserRole = catchAsync(async (req, res, next) => {
    const updates = { name: req.body.name, email: req.body.email, role: req.body.role };

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
    });

    if (!user) {
        return next(new AppError(`User not found with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true });
});

// DELETE /admin/user/:id — remove a user and their avatar
exports.removeUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError(`User not found with ID: ${req.params.id}`, 404));
    }

    // Clean up avatar from cloud storage
    if (user.avatar?.public_id && user.avatar.public_id !== "default_avatar") {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    await user.remove();
    res.status(200).json({ success: true });
});
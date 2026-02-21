// User schema — defines the shape of user documents in MongoDB,
// including password hashing, JWT generation, and reset token logic.

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [2, "Name must be at least 2 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters"],
        select: false, // Never return password in queries by default
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash the password before saving, but only if it was modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// Create a signed JWT containing the user's ID
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare a plain-text password with the hashed one in the database
userSchema.methods.verifyPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate a random token for password reset and store its hash
userSchema.methods.createResetToken = function () {
    const rawToken = crypto.randomBytes(20).toString("hex");

    // Store a hashed version so the raw token isn't saved in the DB
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    // Token expires in 15 minutes
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return rawToken;
};

module.exports = mongoose.model("User", userSchema);
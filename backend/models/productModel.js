// Product schema — defines product documents including images,
// brand info, specifications, and customer reviews.

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    highlights: [{ type: String }],
    specifications: [
        {
            title: String,
            description: String,
        },
    ],
    price: {
        type: Number,
        required: [true, "Product price is required"],
        maxLength: [8, "Price cannot exceed 8 digits"],
    },
    cuttedPrice: {
        type: Number,
        required: [true, "Original price is required"],
    },
    images: [
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
    brand: {
        name: { type: String, required: true },
        logo: {
            public_id: { type: String, required: true },
            url: { type: String, required: true },
        },
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock count is required"],
        maxLength: [4, "Stock count cannot exceed 4 digits"],
        default: 1,
    },
    warranty: {
        type: Number,
        default: 1,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Indexes for faster lookups on commonly queried fields
productSchema.index({ name: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ ratings: -1 });

module.exports = mongoose.model("Product", productSchema);
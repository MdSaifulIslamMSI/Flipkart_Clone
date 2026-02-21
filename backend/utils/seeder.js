// Database seeder — populates the database with sample product data.
// Run this script directly: node backend/utils/seeder.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/productModel");
const connectToDatabase = require("../config/database");

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });

// Sample categories and their image search terms
const SAMPLE_CATEGORIES = [
    { name: "Smartphones", imageQuery: "smartphone" },
    { name: "Laptops", imageQuery: "laptop" },
    { name: "Fashion", imageQuery: "fashion-clothing" },
    { name: "Electronics", imageQuery: "electronics-gadget" },
    { name: "Home", imageQuery: "home-furniture" },
    { name: "Beauty", imageQuery: "beauty-products" },
];

// Generates a random integer between min and max (inclusive)
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Creates a single dummy product document
const createSampleProduct = (index, category) => ({
    name: `${category.name} Item ${index + 1} - Premium Collection`,
    description: `High-quality ${category.name.toLowerCase()} product with excellent features. This item offers great value for money and comes with a standard warranty.`,
    highlights: [
        "Premium quality materials",
        "1 year manufacturer warranty",
        "Free shipping available",
        `Best in ${category.name.toLowerCase()} category`,
    ],
    specifications: [
        { title: "Brand", description: "Lumina" },
        { title: "Category", description: category.name },
        { title: "Warranty", description: "1 Year" },
    ],
    price: randomBetween(499, 99999),
    cuttedPrice: randomBetween(100000, 150000),
    images: [
        {
            public_id: `sample_${category.name.toLowerCase()}_${index}`,
            url: `https://loremflickr.com/300/300/${category.imageQuery}?random=${Date.now() + index}`,
        },
    ],
    brand: {
        name: "Lumina",
        logo: {
            public_id: "sample_brand_logo",
            url: "https://loremflickr.com/100/100/logo?random=" + Date.now(),
        },
    },
    category: category.name,
    stock: randomBetween(0, 50),
    warranty: 1,
    ratings: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
    numOfReviews: randomBetween(5, 500),
    reviews: [],
    // Note: 'user' field requires a valid User ID from your database
    user: "6478a4b21c34a1b2c3d4e5f6", // placeholder — replace with real admin ID
});

// Main seeding function
const seedDatabase = async () => {
    try {
        await connectToDatabase();
        console.log("Connected to database for seeding...");

        // Clear existing products
        await Product.deleteMany();
        console.log("Cleared existing products.");

        // Generate sample products — 5 per category
        const sampleProducts = [];
        for (const category of SAMPLE_CATEGORIES) {
            for (let i = 0; i < 5; i++) {
                sampleProducts.push(createSampleProduct(i, category));
            }
        }

        await Product.insertMany(sampleProducts);
        console.log(`Seeded ${sampleProducts.length} sample products across ${SAMPLE_CATEGORIES.length} categories.`);

        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err.message);
        process.exit(1);
    }
};

seedDatabase();

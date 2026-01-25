const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');

dotenv.config({ path: 'backend/config/config.env' });

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        })
        .catch((err) => {
            console.log(err);
        })
}

// 10 Categories requested
const CATEGORIES = [
    'Mobiles', 'Electronics', 'Fashion', 'Home', 'Appliances',
    'Toys', 'Laptops', 'Headphones', 'Smartwatches', 'Accessories'
];

// Helper to generate random product
const generateProduct = (i, category) => {
    return {
        name: `${category} Product ${i} - ${Math.floor(Math.random() * 1000)}`,
        description: `This is a high-quality ${category} item. Feature rich and durable. Great for daily use.`,
        price: Math.floor(Math.random() * 50000) + 500,
        cuttedPrice: Math.floor(Math.random() * 60000) + 60000,
        images: [{
            public_id: `test_id_${i}`,
            url: "https://rukminim1.flixcart.com/image/416/416/xif0q/mobile/l/v/8/-original-imaghx9qudmydgc4.jpeg?q=70" // Generic fallback image
        }],
        brand: {
            name: "Generic Brand",
            logo: { public_id: "logo_id", url: "logo_url" }
        },
        category: category,
        stock: Math.floor(Math.random() * 100) + 1,
        ratings: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
        numOfReviews: Math.floor(Math.random() * 500),
        user: "64af6b3c10b7b2046d3e3240", // Mock ID
        specifications: [
            { title: "Quality", description: "Premium" },
            { title: "Warranty", description: "1 Year" }
        ],
        createdAt: Date.now()
    };
};

const seedProducts = async () => {
    try {
        await connectDatabase();

        // Wait for connection
        await new Promise(resolve => setTimeout(resolve, 1000));

        await Product.deleteMany();
        console.log('Old Products deleted');

        let allProducts = [];

        // Generate 20 products per category -> 200 total
        CATEGORIES.forEach(cat => {
            for (let i = 1; i <= 20; i++) {
                allProducts.push(generateProduct(i, cat));
            }
        });

        await Product.insertMany(allProducts);
        console.log(`Successfully added ${allProducts.length} products across ${CATEGORIES.length} categories.`);

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

seedProducts();

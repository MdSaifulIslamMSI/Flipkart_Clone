const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

dotenv.config({ path: 'backend/config/config.env' });

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB Connected");
        })
        .catch((err) => {
            console.log(err);
        })
}

// 10 Categories requested in previous turn
const CATEGORIES = [
    'Mobiles', 'Electronics', 'Fashion', 'Home', 'Appliances',
    'Toys', 'Laptops', 'Headphones', 'Smartwatches', 'Accessories'
];

// Category Specific Images (Stable Unsplash IDs)
const CATEGORY_IMAGES = {
    'Mobiles': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', // Phone
    'Electronics': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', // Monitor/Laptop setup
    'Fashion': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80', // T-shirt
    'Home': 'https://images.unsplash.com/photo-1522771753062-811c0556e494?w=500&q=80', // Sofa/Room
    'Appliances': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80', // Kitchen Mixer/Appliance
    'Toys': 'https://images.unsplash.com/photo-1566576912902-1b918b958c8e?w=500&q=80', // Toy Car
    'Laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', // Laptop
    'Headphones': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', // Headphone
    'Smartwatches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', // Watch
    'Accessories': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&q=80' // Shoes/Bag
};

// Helper to generate random product
const generateProduct = (i, category) => {
    return {
        name: `${category} Product ${i} - ${Math.floor(Math.random() * 1000)}`,
        description: `This is a high-quality ${category} item. Feature rich and durable. Great for daily use.`,
        price: Math.floor(Math.random() * 50000) + 500,
        cuttedPrice: Math.floor(Math.random() * 60000) + 60000,
        images: [{
            public_id: `test_id_${i}`,
            url: CATEGORY_IMAGES[category] || "https://rukminim1.flixcart.com/image/416/416/xif0q/mobile/l/v/8/-original-imaghx9qudmydgc4.jpeg?q=70"
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
        console.log("Products seeded");

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

seedProducts();

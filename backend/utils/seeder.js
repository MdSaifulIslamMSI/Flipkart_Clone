const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');

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

// 10 Categories
const CATEGORIES = [
    'Mobiles', 'Electronics', 'Fashion', 'Home', 'Appliances',
    'Toys', 'Laptops', 'Headphones', 'Smartwatches', 'Accessories'
];

// Map Categories to LoremFlickr Keywords
const CATEGORY_KEYWORDS = {
    'Mobiles': 'smartphone',
    'Electronics': 'technology',
    'Fashion': 'fashion,clothing',
    'Home': 'furniture,interior',
    'Appliances': 'appliance,kitchen',
    'Toys': 'toy',
    'Laptops': 'laptop,computer',
    'Headphones': 'headphones,audio',
    'Smartwatches': 'watch,smartwatch',
    'Accessories': 'accessories,bag'
};

// Helper to generate random product with unique image
const generateProduct = (i, category, globalIndex) => {
    const keyword = CATEGORY_KEYWORDS[category] || 'product';
    // Use lock to ensure unique image per product across all categories
    const uniqueImage = `https://loremflickr.com/640/480/${keyword}?lock=${globalIndex}`;

    return {
        name: `${category} Premium Item ${i} - ${Math.floor(Math.random() * 1000)}`,
        description: `Experience the best quality with this premium ${category} product. Designed for durability and styled for modern living. A perfect addition to your collection.`,
        price: Math.floor(Math.random() * 50000) + 999,
        cuttedPrice: Math.floor(Math.random() * 60000) + 60000,
        images: [{
            public_id: `lumina_prod_${globalIndex}`,
            url: uniqueImage
        }],
        brand: {
            name: "Lumina Select",
            logo: { public_id: "logo_id", url: "logo_url" }
        },
        category: category,
        stock: Math.floor(Math.random() * 100) + 10,
        ratings: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 to 5.0
        numOfReviews: Math.floor(Math.random() * 500) + 10,
        user: "64af6b3c10b7b2046d3e3240", // Mock ID
        specifications: [
            { title: "Material", description: "Premium Quality" },
            { title: "Warranty", description: "1 Year Manufacturer Warranty" },
            { title: "Origin", description: "Imported" }
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
        let globalIndex = 1;

        // Generate 20 products per category -> 200 total
        CATEGORIES.forEach(cat => {
            for (let i = 1; i <= 20; i++) {
                allProducts.push(generateProduct(i, cat, globalIndex));
                globalIndex++;
            }
        });

        await Product.insertMany(allProducts);
        console.log(`Successfully added ${allProducts.length} products across ${CATEGORIES.length} categories.`);
        console.log("Products seeded with unique images.");

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

seedProducts();

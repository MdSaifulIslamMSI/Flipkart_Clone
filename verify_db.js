const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: 'backend/config/config.env' });

const uri = process.env.MONGO_URI;

console.log('--- MongoDB Connection Test ---');
console.log('Current Working Directory:', process.cwd());

if (!uri) {
    console.error('ERROR: MONGO_URI is not defined in backend/config/config.env');
    // Try checking if the file exists
    const fs = require('fs');
    if (fs.existsSync('backend/config/config.env')) {
        console.log('backend/config/config.env exists.');
        const content = fs.readFileSync('backend/config/config.env', 'utf8');
        console.log('First 20 chars of config.env:', content.substring(0, 20));
    } else {
        console.error('backend/config/config.env DOES NOT exist.');
    }
    process.exit(1);
}

// Mask password for logging
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log(`Connecting to: ${maskedUri}`);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then((data) => {
        console.log(`\nSUCCESS: MongoDB Connected with server: ${data.connection.host}`);
        process.exit(0);
    })
    .catch((err) => {
        console.error('\nFAILURE: MongoDB Connection Error:');
        console.error(err.message);
        process.exit(1);
    });

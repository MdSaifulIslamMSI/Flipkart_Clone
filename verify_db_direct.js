const mongoose = require('mongoose');

// Extracted from successful nslookup via WARP
const hosts = [
    'ac-5ygvozz-shard-00-00.8lz6csf.mongodb.net:27017',
    'ac-5ygvozz-shard-00-01.8lz6csf.mongodb.net:27017',
    'ac-5ygvozz-shard-00-02.8lz6csf.mongodb.net:27017'
];

// Potential Passwords to test (based on config file ambiguity)
// 1. "MONGO38ASUS" (stripped brackets)
// 2. "<MONGO38ASUS>" (literal)
const passwordAttempt1 = 'MONGO38ASUS';
const passwordAttempt2 = '<MONGO38ASUS>';

const constructURI = (pwd) => {
    return `mongodb://flipkartadmin:${encodeURIComponent(pwd)}@${hosts.join(',')}?ssl=true&authSource=admin&appName=flipkart-cluster`;
};

async function testConnection() {
    console.log('--- Testing Direct MongoDB Connection (Bypassing SRV) ---');
    console.log('Hosts:', hosts);

    // Test 1: Without brackets
    console.log(`\n[Attempt 1] Testing with password: ${passwordAttempt1}`);
    try {
        await mongoose.connect(constructURI(passwordAttempt1), {
            serverSelectionTimeoutMS: 5000
        });
        console.log('SUCCESS! Connected with password: ' + passwordAttempt1);
        process.exit(0);
    } catch (err) {
        console.error('Failed:', err.message);
        if (err.message.includes('Authentication failed')) {
            console.log('-> DNS/Network OK, but Authentication Failed.');
        }
    }

    // Test 2: With brackets
    console.log(`\n[Attempt 2] Testing with password: ${passwordAttempt2}`);
    try {
        await mongoose.connect(constructURI(passwordAttempt2), {
            serverSelectionTimeoutMS: 5000
        });
        console.log('SUCCESS! Connected with password: ' + passwordAttempt2);
        process.exit(0);
    } catch (err) {
        console.error('Failed:', err.message);
    }

    console.log('\nAll attempts failed.');
    process.exit(1);
}

testConnection();

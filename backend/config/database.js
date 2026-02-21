// MongoDB connection helper — establishes a single connection
// to the Atlas cluster using the URI from environment variables.

const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connected: ${connection.connection.host}`);
    } catch (err) {
        console.error(`Database connection failed: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
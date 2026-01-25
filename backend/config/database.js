const mongoose = require('mongoose');

const connectDatabase = () => {
    return mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000, // Fail fast (5s) to see error in Vercel logs
    })
        .then((data) => {
            console.log(`MongoDB Connected with server: ${data.connection.host}`);
            return data;
        })
        .catch((err) => {
            console.error("MongoDB Connection Error:", err);
            throw err; // Re-throw to make the function fail visibly
        });
}

module.exports = connectDatabase;
const mongoose = require('mongoose');

const connectDatabase = () => {
    return mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000, // 30s
        socketTimeoutMS: 45000,
    })
        .then((data) => {
            console.log(`MongoDB Connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = connectDatabase;
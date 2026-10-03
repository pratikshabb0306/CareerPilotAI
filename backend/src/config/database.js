const mongoose = require("mongoose");

let connectionPromise = null;

const connectDB = async () => {
    // Already connected
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // Connection is already in progress
    if (connectionPromise) {
        return connectionPromise;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not defined");
    }

    connectionPromise = mongoose
        .connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        })
        .then(() => {
            console.log("MongoDB Connected Successfully");
            return mongoose.connection;
        })
        .catch((error) => {
            connectionPromise = null;
            console.error("MongoDB Connection Failed");
            console.error(error.message);
            throw error;
        });

    return connectionPromise;
};

module.exports = connectDB;

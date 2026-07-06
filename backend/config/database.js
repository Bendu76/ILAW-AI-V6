

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * File    : backend/config/database.js
 * Purpose : MongoDB Connection
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const mongoose = require("mongoose");
const environment = require("./environment");

/**
 * ==========================================
 * Mongoose Configuration
 * ==========================================
 */

mongoose.set("strictQuery", true);

/**
 * ==========================================
 * Connect Database
 * ==========================================
 */

const connectDatabase = async () => {

    try {

        /**
         * Prevent Duplicate Connections
         */
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        await mongoose.connect(
            environment.mongoUri,
            {
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000
            }
        );

        console.log(
            `✅ MongoDB Connected: ${mongoose.connection.db.databaseName}`
        );

    } catch (error) {

        console.error("❌ MongoDB Connection Failed");

        if (environment.nodeEnv !== "production") {
            console.error(error.message);
        }

        process.exit(1);

    }

};

module.exports = connectDatabase;
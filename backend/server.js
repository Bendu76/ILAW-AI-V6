

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * File    : backend/server.js
 * Purpose : Server Entry Point
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const app = require("./app");
const environment = require("./config/environment");
const connectDatabase = require("./config/database");

const startServer = async () => {

    try {

        /**
         * Connect Database
         */
        await connectDatabase();

        /**
         * Start Express Server
         */
        const server = app.listen(
            environment.port,
            () => {

                console.log("");
                console.log("====================================");
                console.log("✅ MongoDB Connected");
                console.log(`🚀 Server running on port ${environment.port}`);
                console.log(`🌍 Environment: ${environment.nodeEnv}`);
                console.log("====================================");
                console.log("");

            }
        );

        /**
         * Graceful Shutdown
         */
        const shutdown = () => {

            console.log("");
            console.log("🛑 Shutting down server...");

            server.close(() => {

                console.log("✅ Server stopped.");

                process.exit(0);

            });

        };

        process.on("SIGINT", shutdown);

        process.on("SIGTERM", shutdown);

    } catch (error) {

        console.error("");
        console.error("❌ Server failed to start.");
        console.error(error);
        console.error("");

        process.exit(1);

    }

};

startServer();
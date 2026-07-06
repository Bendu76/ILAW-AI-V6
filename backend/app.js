

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * File    : backend/app.js
 * Purpose : Express Application Configuration
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const environment = require("./config/environment");

// Routes
const authRoutes = require("./routes/authRoutes");
const generateRoutes = require("./routes/generateRoutes");

const app = express();

/**
 * ==========================================
 * Express Configuration
 * ==========================================
 */

// Required for Render / Reverse Proxy
app.set("trust proxy", 1);

// Hide Express Signature
app.disable("x-powered-by");

/**
 * ==========================================
 * Security Middleware
 * ==========================================
 */

// Helmet
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
    })
);

// Global Rate Limiter
const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 100,

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }

});

app.use(limiter);

/**
 * ==========================================
 * CORS Configuration
 * ==========================================
 */

const allowedOrigins = [
    environment.clientUrl
].filter(Boolean);

app.use(
    cors({

        origin(origin, callback) {

            /**
             * Allow requests without Origin
             * (Postman, Mobile Apps, Server-to-Server)
             */
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS.")
            );

        },

        credentials: true

    })
);

/**
 * ==========================================
 * Body Parser
 * ==========================================
 */

app.use(
    express.json({
        limit: "5mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "5mb"
    })
);

/**
 * ==========================================
 * Static Files
 * ==========================================
 */

app.use(
    express.static(
        path.join(__dirname, "../frontend/pages")
    )
);

app.use(
    "/css",
    express.static(
        path.join(__dirname, "../frontend/css")
    )
);

app.use(
    "/js",
    express.static(
        path.join(__dirname, "../frontend/js")
    )
);

app.use(
    "/images",
    express.static(
        path.join(__dirname, "../frontend/images")
    )
);

/**
 * ==========================================
 * Health Check
 * ==========================================
 */

app.get("/api", (req, res) => {

    res.status(200).json({

        success: true,

        message: "ILAW-AI-V6 API is running.",

        environment: environment.nodeEnv,

        version: "2.1.0"

    });

});

/**
 * ==========================================
 * API Routes
 * ==========================================
 */

app.use("/auth", authRoutes);

app.use("/generate", generateRoutes);

/**
 * ==========================================
 * 404 Handler
 * ==========================================
 */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found."

    });

});

/**
 * ==========================================
 * Global Error Handler
 * ==========================================
 */

app.use((err, req, res, next) => {

    if (environment.nodeEnv !== "production") {
        console.error(err);
    }

    res.status(err.status || 500).json({

        success: false,

        message: err.message || "Internal server error."

    });

});

/**
 * ==========================================
 * Export Application
 * ==========================================
 */

module.exports = app;
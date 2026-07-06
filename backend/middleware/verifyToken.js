

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Authentication Middleware
 * File    : backend/middleware/verifyToken.js
 * Purpose : Verify JWT Access Token
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

const verifyToken = (req, res, next) => {

    try {

        /**
         * Read Authorization Header
         */
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is missing."
            });
        }

        /**
         * Validate Authorization Format
         */
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format."
            });
        }

        /**
         * Extract Access Token
         */
        const [, token] = authHeader.split(" ");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token is missing."
            });
        }

        /**
         * Verify JWT
         */
        const decoded = jwt.verify(
            token,
            environment.jwtSecret
        );

        /**
         * Validate Token Payload
         */
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload."
            });
        }

        /**
         * Attach Authenticated User
         */
        req.user = decoded;

        return next();

    } catch (error) {

        /**
         * Development Logging
         */
        if (environment.nodeEnv !== "production") {
            console.error("JWT Error:", error.name);
        }

        /**
         * Generic Response
         * (Do not expose JWT internals)
         */
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }

};

module.exports = verifyToken;
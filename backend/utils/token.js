

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Token Utility
 * File    : backend/utils/token.js
 * Purpose : JWT Generation and Verification
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

const TOKEN_EXPIRATION = "7d";

/**
 * ==========================================
 * Generate JWT Access Token
 * ==========================================
 */
const generateToken = (user) => {

    if (!user) {
        throw new Error(
            "User information is required to generate a token."
        );
    }

    const userId = user.id || user._id;

    if (!userId) {
        throw new Error(
            "User ID is required to generate a token."
        );
    }

    return jwt.sign(
        {
            id: userId,
            email: user.email,
            role: user.role || "teacher"
        },
        environment.jwtSecret,
        {
            expiresIn: TOKEN_EXPIRATION
        }
    );

};

/**
 * ==========================================
 * Verify JWT Access Token
 * ==========================================
 */
const verifyToken = (token) => {

    if (!token) {
        throw new Error("Token is required.");
    }

    return jwt.verify(
        token,
        environment.jwtSecret
    );

};

/**
 * ==========================================
 * Export Token Utility
 * ==========================================
 */

module.exports = {

    generateToken,

    verifyToken

};
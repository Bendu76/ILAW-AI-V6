

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Password Utility
 * File    : backend/utils/password.js
 * Purpose : Password Hashing and Verification
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12;

/**
 * ==========================================
 * Hash Password
 * ==========================================
 */
const hashPassword = (plainPassword) => {

    if (!plainPassword) {
        throw new Error("Password is required.");
    }

    return bcrypt.hash(
        plainPassword,
        SALT_ROUNDS
    );

};

/**
 * ==========================================
 * Compare Password
 * ==========================================
 */
const comparePassword = (
    plainPassword,
    hashedPassword
) => {

    if (!plainPassword || !hashedPassword) {
        throw new Error(
            "Password comparison requires both values."
        );
    }

    return bcrypt.compare(
        plainPassword,
        hashedPassword
    );

};

/**
 * ==========================================
 * Export Password Utility
 * ==========================================
 */

module.exports = {

    hashPassword,

    comparePassword

};
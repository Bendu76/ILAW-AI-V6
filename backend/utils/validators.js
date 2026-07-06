

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Validation Utility
 * File    : backend/utils/validators.js
 * Purpose : Common Input Validation
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

/**
 * ==========================================
 * Validate Required Fields
 * ==========================================
 */
const validateRequired = (fields = {}) => {

    const missingFields = [];

    for (const [key, value] of Object.entries(fields)) {

        if (
            value === undefined ||
            value === null ||
            String(value).trim() === ""
        ) {
            missingFields.push(key);
        }

    }

    return {
        valid: missingFields.length === 0,
        missingFields
    };

};

/**
 * ==========================================
 * Validate Email
 * ==========================================
 */
const validateEmail = (email = "") => {

    email = String(email)
        .trim()
        .toLowerCase();

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

};

/**
 * ==========================================
 * Validate Password
 * ==========================================
 */
const validatePassword = (password = "") => {

    if (typeof password !== "string") {
        return false;
    }

    return password.length >= 8;

};

/**
 * ==========================================
 * Validate Maximum Length
 * ==========================================
 */
const validateMaxLength = (
    value,
    maxLength
) => {

    return (
        String(value).length <= maxLength
    );

};

/**
 * ==========================================
 * Sanitize String
 * ==========================================
 */
const sanitizeString = (value = "") => {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .trim()
        .replace(/\s+/g, " ");

};

/**
 * ==========================================
 * Export Validators
 * ==========================================
 */

module.exports = {

    validateRequired,

    validateEmail,

    validatePassword,

    validateMaxLength,

    sanitizeString

};
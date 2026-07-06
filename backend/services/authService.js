

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Authentication Service
 * File    : backend/services/authService.js
 * Purpose : User Registration and Login Logic
 * Version : 2.0.0 (Production Ready)
 * ==========================================
 */

const User = require("../models/User");
const passwordUtil = require("../utils/password");
const tokenUtil = require("../utils/token");
const validators = require("../utils/validators");

/**
 * ==========================================
 * Register User
 * ==========================================
 */
const registerUser = async ({
    fullname,
    position,
    email,
    password
}) => {

    // Sanitize Inputs
    fullname = validators.sanitizeString(fullname);
    position = validators.sanitizeString(position);
    email = validators
        .sanitizeString(email)
        .trim()
        .toLowerCase();

    // Validate Required Fields
    const validation = validators.validateRequired({
        fullname,
        position,
        email,
        password
    });

    if (!validation.valid) {
        throw new Error(
            `Missing fields: ${validation.missingFields.join(", ")}`
        );
    }

    // Validate Email
    if (!validators.validateEmail(email)) {
        throw new Error("Invalid email address.");
    }

    // Validate Password
    if (!validators.validatePassword(password)) {
        throw new Error("Password must be at least 8 characters.");
    }

    // Check Existing User
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email is already registered.");
    }

    // Hash Password
    const hashedPassword =
        await passwordUtil.hashPassword(password);

    // Create User
    const user = await User.create({
        fullname,
        position,
        email,
        password: hashedPassword
    });

    // Return Safe User Object
    return {
        id: user._id,
        fullname: user.fullname,
        position: user.position,
        email: user.email,
        role: user.role,
        credits: user.credits,
        freeGenerations: user.freeGenerations,
        isPremium: user.isPremium
    };

};

/**
 * ==========================================
 * Login User
 * ==========================================
 */
const loginUser = async ({
    email,
    password
}) => {

    // Sanitize Input
    email = validators
        .sanitizeString(email)
        .trim()
        .toLowerCase();

    // Validate Required Fields
    const validation = validators.validateRequired({
        email,
        password
    });

    if (!validation.valid) {
        throw new Error(
            `Missing fields: ${validation.missingFields.join(", ")}`
        );
    }

    // Find User
    const user = await User.findOne({
        email
    }).select("+password");

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Defensive Check
    if (!user.password) {
        throw new Error("Authentication failed.");
    }

    // Compare Password
    const passwordMatch =
        await passwordUtil.comparePassword(
            password,
            user.password
        );

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    // Check Account Status
    if (user.status !== "active") {
        throw new Error("Your account is not active.");
    }

    // Update Last Login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT Payload
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };

    // Generate JWT Token
    const token = tokenUtil.generateToken(payload);

    // Return Safe Response
    return {
        token,
        user: {
            id: user._id,
            fullname: user.fullname,
            position: user.position,
            email: user.email,
            role: user.role,
            credits: user.credits,
            freeGenerations: user.freeGenerations,
            isPremium: user.isPremium
        }
    };

};

/**
 * ==========================================
 * Export Service
 * ==========================================
 */

module.exports = {
    registerUser,
    loginUser
};
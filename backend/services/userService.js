

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : User Service
 * File    : backend/services/userService.js
 * Purpose : User Business Logic
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const User = require("../models/User");

/**
 * ==========================================
 * Get User By ID
 * ==========================================
 */
const getUserById = async (userId) => {

    if (!userId) {
        throw new Error("User ID is required.");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    return user;

};

/**
 * ==========================================
 * Get Safe User Profile
 * ==========================================
 */
const getSafeProfile = async (userId) => {

    const user = await getUserById(userId);

    const safeProfile = {

        id: user._id,

        fullname: user.fullname,

        position: user.position,

        email: user.email,

        role: user.role,

        credits: user.credits,

        freeGenerations: user.freeGenerations,

        isPremium: user.isPremium,

        status: user.status,

        lastLogin: user.lastLogin,

        createdAt: user.createdAt

    };

    return safeProfile;

};

/**
 * ==========================================
 * Consume Free Generation
 * ==========================================
 */
const consumeFreeGeneration = async (userId) => {

    const user = await getUserById(userId);

    if (user.freeGenerations <= 0) {
        return false;
    }

    user.freeGenerations -= 1;

    await user.save();

    return true;

};

/**
 * ==========================================
 * Consume Credit
 * ==========================================
 */
const consumeCredit = async (userId) => {

    const user = await getUserById(userId);

    if (user.credits <= 0) {
        return false;
    }

    user.credits -= 1;

    await user.save();

    return true;

};

/**
 * ==========================================
 * Update Last Login
 * ==========================================
 */
const updateLastLogin = async (userId) => {

    const user = await getUserById(userId);

    user.lastLogin = new Date();

    await user.save();

    return true;

};

/**
 * ==========================================
 * Export User Service
 * ==========================================
 */

module.exports = {

    getUserById,

    getSafeProfile,

    consumeFreeGeneration,

    consumeCredit,

    updateLastLogin

};


/**
 * ==========================================
 * Project : ILAW-AI-V6
 * Module  : User Model
 * File    : backend/models/User.js
 * Purpose : User Database Schema
 * Version : 2.0.0 Stable
 * ==========================================
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100
        },

        position: {
             type: String,
             trim: true,
             default: ""
        },        

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        role: {
            type: String,
            enum: ["teacher", "admin"],
            default: "teacher"
        },

        freeGenerations: {
            type: Number,
            default: 1,
            min: 0
        },

        credits: {
            type: Number,
            default: 0,
            min: 0
        },

        isPremium: {
            type: Boolean,
            default: false
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active"
        },

        lastLogin: {
            type: Date,
            default: null
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
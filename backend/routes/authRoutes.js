

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * File    : backend/routes/authRoutes.js
 * Purpose : Authentication Routes
 * Version : 2.0.0 (Production Ready)
 * ==========================================
 */

const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

/*
==========================================
PUBLIC ROUTES
==========================================
*/

// Register a new teacher/admin account
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

/*
==========================================
PROTECTED ROUTES
==========================================
*/

// Get authenticated user's profile
router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authorized",
        user: {
            id: req.user.id,
            fullname: req.user.fullname,
            email: req.user.email,
            role: req.user.role
        }
    });
});

module.exports = router;
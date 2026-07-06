

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Generate Routes
 * File    : backend/routes/generateRoutes.js
 * Purpose : Protected AI Generation Routes
 * Version : 2.0.0 (Production Ready)
 * ==========================================
 */

const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/verifyToken");

const generateController =
    require("../controllers/generateController");

/**
 * ==========================================
 * Protected AI Generation Endpoint
 * ==========================================
 */

router.post(

    "/",

    verifyToken,

    generateController.generateDetailedILAW

);

/**
 * ==========================================
 * Export Routes
 * ==========================================
 */

module.exports = router;
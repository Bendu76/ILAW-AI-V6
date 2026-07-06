
/**
 * ==========================================
 * Project : ILAW-AI-V6
 * Module  : Authentication Controller
 * File    : backend/controllers/authController.js
 * Purpose : Handle Authentication Requests
 * Version : 1.0.0
 * ==========================================
 */

const authService = require("../services/authService");
const response = require("../utils/response");

/**
 * ==========================================
 * Register Controller
 * ==========================================
 */
const register = async (req, res) => {

    try {

        const user = await authService.registerUser(req.body);

        return response.success(
            res,
            "Registration successful.",
            user,
            201
        );

    } catch (error) {

        return response.error(
            res,
            error.message,
            400
        );

    }

};

/**
 * ==========================================
 * Login Controller
 * ==========================================
 */
const login = async (req, res) => {

    try {

        const result = await authService.loginUser(req.body);

        return response.success(
            res,
            "Login successful.",
            result,
            200
        );

    } catch (error) {

        return response.error(
            res,
            error.message,
            401
        );

    }

};

/**
 * ==========================================
 * Export Controllers
 * ==========================================
 */
module.exports = {

    register,

    login

};
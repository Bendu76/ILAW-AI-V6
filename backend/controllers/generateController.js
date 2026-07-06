

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Generate Controller
 * File    : backend/controllers/generateController.js
 * Purpose : Handle Detailed ILAW Generation
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const aiService = require("../services/aiService");
const response = require("../utils/response");

/**
 * ==========================================
 * Generate Detailed ILAW
 * ==========================================
 */
const generateDetailedILAW = async (req, res) => {

    try {

        /**
         * Authentication Check
         */
        if (!req.user) {
            return response.error(
                res,
                "User authentication failed.",
                401
            );
        }

        /**
         * Normalize Request Data
         */
        const grade = String(req.body.grade || "").trim();
        const subject = String(req.body.subject || "").trim();
        const topic = String(req.body.topic || "").trim();
        const competency = String(req.body.competency || "").trim();
        const sessions = req.body.sessions;

        /**
         * Required Fields Validation
         */
        if (
            !grade ||
            !subject ||
            !topic ||
            !competency ||
            sessions === undefined ||
            sessions === null
        ) {
            return response.error(
                res,
                "All fields are required.",
                400
            );
        }

        /**
         * Input Length Validation
         */
        if (
            grade.length > 50 ||
            subject.length > 100 ||
            topic.length > 200 ||
            competency.length > 1000
        ) {
            return response.error(
                res,
                "One or more input fields exceed the allowed length.",
                400
            );
        }

        /**
         * Session Validation
         */
        const sessionCount = Number(sessions);

        if (
            !Number.isInteger(sessionCount) ||
            sessionCount < 1 ||
            sessionCount > 5
        ) {
            return response.error(
                res,
                "Sessions must be between 1 and 5.",
                400
            );
        }

        /**
         * Resolve Authenticated User ID
         */
        const userId =
            req.user.id ||
            req.user.userId ||
            req.user._id;

        if (!userId) {
            return response.error(
                res,
                "Invalid user session.",
                401
            );
        }

        /**
         * Generate AI Lesson
         */
        const result = await aiService.generateDetailedILAW({
            userId,
            grade,
            subject,
            topic,
            competency,
            sessions: sessionCount
        });

        /**
         * Success Response
         */
        return response.success(
            res,
            "ILAW generated successfully.",
            result,
            200
        );

    } catch (error) {

        if (process.env.NODE_ENV !== "production") {
            console.error("Generate Error:", error.message);
        }

        return response.error(
            res,
            error.message || "Failed to generate ILAW.",
            400
        );

    }

};

/**
 * ==========================================
 * Export Controller
 * ==========================================
 */

module.exports = {
    generateDetailedILAW
};
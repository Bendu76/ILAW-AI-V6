

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : AI Service
 * File    : backend/services/aiService.js
 * Purpose : Generate Detailed ILAW Lesson
 * Version : 3.1.0 (Production Ready)
 * ==========================================
 */

const openai = require("../config/openai");

const userService = require("./userService");
const languageService = require("./languageService");
const promptService = require("./promptService");

/**
 * ==========================================
 * Generate Detailed ILAW
 * ==========================================
 */

const generateDetailedILAW = async ({
    userId,
    grade,
    subject,
    topic,
    competency,
    sessions
}) => {

    /**
     * Validate User ID
     */
    if (!userId) {
        throw new Error("User ID missing from token.");
    }

    /**
     * Get Latest User
     */
    const user = await userService.getUserById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    /**
     * Check Account Status
     */
    if (user.status !== "active") {
        throw new Error("Your account is not active.");
    }

    /**
     * Check Available Usage
     * Admin accounts have unlimited generations.
     */
    const allowed =
        user.role === "admin" ||
        user.freeGenerations > 0 ||
        user.credits > 0;

    if (!allowed) {
        throw new Error(
            "No remaining free generations or credits."
        );
    }

    /**
     * Detect Lesson Language
     */
    const language =
        languageService.detectLanguage(subject);

    /**
     * Build AI Prompt
     */
    const prompt =
        promptService.buildDetailedILAWPrompt({

            grade,
            subject,
            topic,
            competency,
            sessions,
            language,

            teacherName:
                (user.fullname || "").toUpperCase(),

            position:
                user.position || ""

        });

    /**
     * Generate AI Lesson
     */
    const completion =
        await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            temperature: 0.2,

            max_tokens: 12000,

            messages: [

                {
                    role: "system",
                    content: `
You are a DepEd MATATAG ILAW Generator.

Return only complete HTML.

Never return markdown.

Never omit sections.

Always generate all requested sessions.
`
                },

                {
                    role: "user",
                    content: prompt
                }

            ]

        });

    /**
     * Validate AI Response
     */
    const html =
        completion?.choices?.[0]?.message?.content?.trim();

    if (!html) {
        throw new Error(
            "Failed to generate lesson plan."
        );
    }

    /**
     * Validate HTML Output
     */
    if (!html.startsWith("<")) {
        throw new Error(
            "Invalid AI response received."
        );
    }

    /**
     * Deduct Usage
     * Admin accounts are not charged.
     */
    if (user.role !== "admin") {

        if (user.freeGenerations > 0) {

            await userService.consumeFreeGeneration(
                userId
            );

        } else {

            await userService.consumeCredit(
                userId
            );

        }

    }

    /**
     * Refresh Latest User Information
     */
    const updatedUser =
        await userService.getUserById(userId);

    /**
     * Success Response
     */
    return {

        success: true,

        html,

        remainingCredits:
            updatedUser.credits,

        remainingFreeGenerations:
            updatedUser.freeGenerations,

        role:
            updatedUser.role,

        isPremium:
            updatedUser.isPremium

    };

};

module.exports = {

    generateDetailedILAW

};
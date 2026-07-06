

/**
 * ==========================================
 * Project : ILAW-AI-V6
 * Module  : Response Utility
 * File    : backend/utils/response.js
 * Purpose : Standard API Responses
 * Version : 1.0.0
 * ==========================================
 */

/**
 * Success Response
 */
const success = (
    res,
    message,
    data = null,
    statusCode = 200
) => {

    return res.status(statusCode).json({

        success: true,

        message,

        data

    });

};

/**
 * Error Response
 */
const error = (
    res,
    message,
    statusCode = 400
) => {

    return res.status(statusCode).json({

        success: false,

        message

    });

};

module.exports = {

    success,

    error

};
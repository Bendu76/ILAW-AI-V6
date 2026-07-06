
/**
 * ==========================================
 * Project : ILAW-AI-V6
 * File    : backend/middleware/authMiddleware.js
 * Purpose : JWT Authentication Middleware
 * ==========================================
 */
const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

module.exports = (req, res, next) => {

    //console.log("AUTH MIDDLEWARE HIT");

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Access denied."

            });

        }

if (!authHeader.startsWith("Bearer ")) {

    return res.status(401).json({

        success: false,

        message: "Invalid authorization format."

    });

}

        const token = authHeader.split(" ")[1];

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Token missing."

            });

        }

        const decoded = jwt.verify(

            token,

            environment.jwtSecret

        );
/*
        console.log("");
        console.log("========== JWT DECODED ==========");
        console.log(decoded);
        console.log("=================================");
        console.log("");
*/
        req.user = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or expired token."

        });

    }

};

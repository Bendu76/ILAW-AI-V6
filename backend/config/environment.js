

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});

const requiredVariables = [
    "NODE_ENV",
    "MONGODB_URI",
    "OPENAI_API_KEY",
    "JWT_SECRET",
    "CLIENT_URL"
];

requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`Missing required environment variable: ${variable}`);
    }
});

module.exports = {
    port: Number(process.env.PORT) || 3000,
    mongoUri: process.env.MONGODB_URI,
    openaiApiKey: process.env.OPENAI_API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
    clientUrl: process.env.CLIENT_URL
};
const OpenAI = require("openai");
const environment = require("./environment");

if (!environment.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
}

const openai = new OpenAI({
    apiKey: environment.openaiApiKey
});

module.exports = openai;
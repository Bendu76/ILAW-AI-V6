

/**
 * ==========================================
 * Project : ILAW-AI-V6
 * Module  : Language Service
 * File    : backend/services/languageService.js
 * Purpose : Detect Lesson Language
 * Version : 2.0.0
 * ==========================================
 */

/**
 * ==========================================
 * English Subjects
 * ==========================================
 */
const ENGLISH_SUBJECTS = [

    "creative technology",

    "research",

    "science",

    "mathematics",

    "math",

    "english",

    "ict",

    "computer",

    "computer education",

    "computer science",

    "programming",

    "robotics",

    "stem",

    "biology",

    "chemistry",
    
    "physics",

    "algebra",

    "sned"


];

/**
 * ==========================================
 * Filipino Subjects
 * ==========================================
 */
const FILIPINO_SUBJECTS = [

    "filipino",

    "araling panlipunan",

    "ap",

    "esp",

    "edukasyon sa pagpapakatao",

    "mapeh",

    "music",

    "arts",

    "physical education",

    "pe",

    "health",

    "epp",

    "edukasyong pantahanan at pangkabuhayan",

    "makabansa"


];

/**
 * ==========================================
 * Detect Language
 * ==========================================
 */
const detectLanguage = (subject = "") => {

    const normalizedSubject =
        String(subject)
            .trim()
            .toLowerCase();

    /**
     * Match English Subjects
     */
    const isEnglish =
        ENGLISH_SUBJECTS.some(item =>
            normalizedSubject.includes(item)
        );

    if (isEnglish) {

        return {

            code: "en",

            name: "English"

        };

    }

    /**
     * Match Filipino Subjects
     */
    const isFilipino =
        FILIPINO_SUBJECTS.some(item =>
            normalizedSubject.includes(item)
        );

    if (isFilipino) {

        return {

            code: "fil",

            name: "Filipino"

        };

    }

    /**
     * Default Language
     */
    return {

        code: "en",

        name: "English"

    };

};

/**
 * ==========================================
 * Export Service
 * ==========================================
 */

module.exports = {

    detectLanguage

};
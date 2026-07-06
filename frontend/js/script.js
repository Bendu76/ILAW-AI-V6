

/**
 * ==========================================
 * Project : ILAW-AI-V6
 * File    : frontend/js/script.js
 * Purpose : Frontend Functions
 * Version : 2.0.0
 * ==========================================
 */

const API_URL = "http://localhost:3000";

/**
 * ==========================================
 * Generate Detailed ILAW
 * ==========================================
 */

async function generateLessonPlan() {

    const grade =
        document.getElementById("grade").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const topic =
        document.getElementById("topic").value.trim();

    const competency =
        document.getElementById("competency").value.trim();

    const sessions =
        document.getElementById("sessions").value;

    /**
     * Basic Validation
     */

    if (
        !grade ||
        !subject ||
        !topic ||
        !competency
    ) {

        alert(
            "Please complete all required fields."
        );

        return;

    }

    const token =
        localStorage.getItem("token");

    if (!token) {

        alert(
            "Please login first."
        );

        window.location.href =
            "login.html";

        return;

    }

    try {

        document.getElementById("output").innerHTML =
            "<p>Generating ILAW Lesson Plan...</p>";

        const response =
            await fetch(
                `${API_URL}/generate`,
                {
                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        grade,
                        subject,
                        topic,
                        competency,
                        sessions

                    })

                }
            );

        const data =
            await response.json();

        if (!response.ok) {

            throw new Error(

                data.message ||

                "Failed to generate ILAW."

            );

        }

        /**
         * Display Generated ILAW
         */

        document.getElementById("output").innerHTML =

            data.data?.html ||

            "<p>No lesson plan generated.</p>";

        /**
         * Update Credits
         */

        if (data.data) {

            localStorage.setItem(

                "credits",

                data.data.remainingCredits

            );

            document.getElementById(

                "creditsDisplay"

            ).textContent =

                `Credits: ${data.data.remainingCredits}`;

        }

    } catch (error) {

        console.error(error);

        document.getElementById("output").innerHTML =

            `<p>${error.message}</p>`;

    }

}

/**
 * ==========================================
 * Logout
 * ==========================================
 */

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("credits");

    window.location.href =
        "login.html";

}

/**
 * ==========================================
 * Load Credits
 * ==========================================
 */

function loadCredits() {

    const credits =

        localStorage.getItem("credits")

        || 0;

    document.getElementById(

        "creditsDisplay"

    ).textContent =

        `Credits: ${credits}`;

}

/**
 * ==========================================
 * Initialize
 * ==========================================
 */

window.onload = () => {

    loadCredits();

const generateBtn =
        document.getElementById("generateBtn");

    if (generateBtn) {

        generateBtn.addEventListener(
            "click",
            generateLessonPlan
        );

    }

};


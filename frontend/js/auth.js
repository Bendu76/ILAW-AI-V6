

/**
 * ==========================================
 * Project : ILAW-AI-V6 Enterprise Edition
 * Module  : Frontend Authentication
 * File    : frontend/js/auth.js
 * Purpose : Register, Login and Logout
 * Version : 2.1.0 (Production Ready)
 * ==========================================
 */

const API_URL = window.location.origin;

/**
 * ==========================================
 * Register Teacher
 * ==========================================
 */
async function register(event) {

    event.preventDefault();

    const fullname =
        document.getElementById("fullname").value.trim();

    const position =
        document.getElementById("position").value;

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    if (!fullname || !position || !email || !password) {

        alert("Please complete all fields.");
        return;

    }

    try {

        const response = await fetch(
            `${API_URL}/auth/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    fullname,
                    position,
                    email,
                    password
                })

            }
        );

        const result = await response.json();

        if (!response.ok) {

            throw new Error(
                result.message || "Registration failed."
            );

        }

        alert("Registration successful!");

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert(
            error.message || "Unable to register."
        );

    }

}

/**
 * ==========================================
 * Login Teacher
 * ==========================================
 */
async function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    if (!email || !password) {

        alert("Please complete all fields.");
        return;

    }

    try {

        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            }
        );

        const result = await response.json();

        if (!response.ok) {

            throw new Error(
                result.message || "Login failed."
            );

        }

        localStorage.setItem(
            "token",
            result.data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(result.data.user)
        );

        alert("Login successful!");

        window.location.href =
            "dashboard.html";

    } catch (error) {

        console.error(error);

        alert(
            error.message || "Unable to login."
        );

    }

}

/**
 * ==========================================
 * Logout
 * ==========================================
 */
function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href =
        "login.html";

}

/**
 * ==========================================
 * Get JWT Token
 * ==========================================
 */
function getToken() {

    return localStorage.getItem("token");

}

/**
 * ==========================================
 * Check Login
 * ==========================================
 */
function isLoggedIn() {

    return !!getToken();

}

/**
 * ==========================================
 * Initialize
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            register
        );

    }

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            login
        );

    }

});
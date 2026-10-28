/* =========================================
   api.js — Central API helper
   All fetch calls go through here.
   Base URL: http://localhost:8000
========================================= */

const API_BASE = "http://localhost:8000";

/**
 * Make an authenticated or public API request.
 * @param {string} endpoint  - e.g. "/api/challenges"
 * @param {object} options   - fetch options (method, body, etc.)
 * @returns {Promise<any>}   - parsed JSON response
 */
async function apiRequest(endpoint, options = {}) {

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    // Attach JWT token if available
    const token = localStorage.getItem("token");
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    // Parse JSON regardless of status
    let data;
    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
        const message =
            data.detail ||
            data.message ||
            `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return data;
}


/* ─────────────────────────────────────────
   AUTH HELPERS
───────────────────────────────────────── */

const API = {

    // ── Auth ──────────────────────────────

    register(payload) {
        return apiRequest("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    login(payload) {
        return apiRequest("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    getMe() {
        return apiRequest("/api/auth/me");
    },

    // ── Challenges ────────────────────────

    getChallenges(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return apiRequest(`/api/challenges${qs ? "?" + qs : ""}`);
    },

    getChallenge(id) {
        return apiRequest(`/api/challenges/${id}`);
    },

    createChallenge(payload) {
        return apiRequest("/api/challenges", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    // ── Problems ─────────────────────────

    getProblems(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return apiRequest(`/api/problems${qs ? "?" + qs : ""}`);
    },

    submitProblem(payload) {
        return apiRequest("/api/problems", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    updateProblemStatus(id, payload) {
        return apiRequest(`/api/problems/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });
    },

    // ── Solutions ─────────────────────────

    getSolutions(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return apiRequest(`/api/solutions${qs ? "?" + qs : ""}`);
    },

    submitSolution(payload) {
        return apiRequest("/api/solutions", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    updateSolutionStatus(id, payload) {
        return apiRequest(`/api/solutions/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });
    },

    // ── Universities ──────────────────────

    getUniversities(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return apiRequest(`/api/universities${qs ? "?" + qs : ""}`);
    },

    getUniversity(id) {
        return apiRequest(`/api/universities/${id}`);
    },

    // ── Industries ────────────────────────

    getIndustries(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return apiRequest(`/api/industries${qs ? "?" + qs : ""}`);
    },

    getIndustry(id) {
        return apiRequest(`/api/industries/${id}`);
    },

    // ── Collaborations ────────────────────

    getCollaborations(params = {}) {
        const qs = new URLSearchParams(params).toString();
        return apiRequest(`/api/collaborations${qs ? "?" + qs : ""}`);
    },

    createCollaboration(payload) {
        return apiRequest("/api/collaborations", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

};

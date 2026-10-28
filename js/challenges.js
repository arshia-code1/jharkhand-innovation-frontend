/* =========================================
   challenges.js — Load challenges from API
   Requires: api.js loaded before this file
========================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const categorySearch      = document.getElementById("categorySearch");
    const districtSearch      = document.getElementById("districtSearch");
    const statusSearch        = document.getElementById("statusSearch");
    const challengeContainer  = document.getElementById("challengeContainer");

    if (
        !categorySearch ||
        !districtSearch ||
        !statusSearch   ||
        !challengeContainer
    ) {
        return;
    }


    // ─────────────────────────────────────
    // State
    // ─────────────────────────────────────

    let allChallenges = [];
    let debounceTimer = null;


    // ─────────────────────────────────────
    // Fetch challenges from API
    // ─────────────────────────────────────

    async function loadChallenges() {
        showLoading();

        try {
            const data = await API.getChallenges();
            allChallenges = data.challenges || [];
            displayChallenges(allChallenges);
        } catch (err) {
            challengeContainer.innerHTML = `
                <div class="card">
                    <h3>⚠️ Could not load challenges</h3>
                    <p>${err.message || "Please make sure the backend server is running."}</p>
                    <p style="margin-top:8px;font-size:13px;color:#666;">
                        Start it with: <code>uvicorn main:app --reload</code> inside the <code>backend/</code> folder.
                    </p>
                </div>
            `;
        }
    }


    // ─────────────────────────────────────
    // Render challenge cards
    // ─────────────────────────────────────

    function displayChallenges(data) {

        challengeContainer.innerHTML = "";

        if (!data || data.length === 0) {
            challengeContainer.innerHTML = `
                <div class="card">
                    <h3>No Challenges Found</h3>
                    <p>No challenge matches the selected filters.</p>
                </div>
            `;
            return;
        }

        data.forEach(function (challenge) {

            let statusClass = "badge-open";
            if (challenge.status === "In Progress") statusClass = "badge-progress";
            if (challenge.status === "Closed")      statusClass = "badge-closed";
            if (challenge.status === "Solved")      statusClass = "badge-solved";

            const prizeHtml = challenge.prize
                ? `<span class="badge badge-category">🏆 ${challenge.prize}</span>`
                : "";

            const deadlineHtml = challenge.deadline
                ? `<span class="badge badge-category">📅 ${challenge.deadline}</span>`
                : "";

            const solutionCount = challenge.solution_count || 0;

            challengeContainer.innerHTML += `
                <div class="card challenge-card">

                    <span class="badge badge-category">
                        ${challenge.category}
                    </span>

                    <h3>${challenge.title}</h3>

                    <p>${challenge.description}</p>

                    <div class="challenge-meta" style="flex-wrap:wrap;gap:8px;">
                        <span class="badge ${statusClass}">${challenge.status}</span>
                        <span class="badge badge-category">📍 ${challenge.district}</span>
                        ${prizeHtml}
                        ${deadlineHtml}
                        <span class="badge badge-category">💡 ${solutionCount} Solution${solutionCount !== 1 ? "s" : ""}</span>
                    </div>

                    <a
                        href="challenge-details.html?id=${challenge.id}"
                        class="btn btn-outline"
                        style="margin-top:12px;display:inline-block;"
                    >
                        View Details
                    </a>

                </div>
            `;
        });
    }


    // ─────────────────────────────────────
    // Filter locally (instant, no re-fetch)
    // ─────────────────────────────────────

    function applyFilters() {

        const categoryValue = categorySearch.value.toLowerCase().trim();
        const districtValue = districtSearch.value.toLowerCase().trim();
        const statusValue   = statusSearch.value;

        const filtered = allChallenges.filter(function (challenge) {

            const categoryMatch = challenge.category
                .toLowerCase()
                .includes(categoryValue);

            const districtMatch = challenge.district
                .toLowerCase()
                .includes(districtValue);

            const statusMatch =
                !statusValue || challenge.status === statusValue;

            return categoryMatch && districtMatch && statusMatch;
        });

        displayChallenges(filtered);
    }


    // ─────────────────────────────────────
    // Loading state
    // ─────────────────────────────────────

    function showLoading() {
        challengeContainer.innerHTML = `
            <div class="card" style="text-align:center;padding:40px;">
                <p style="font-size:18px;">⏳ Loading challenges…</p>
            </div>
        `;
    }


    // ─────────────────────────────────────
    // Event listeners
    // ─────────────────────────────────────

    categorySearch.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyFilters, 200);
    });

    districtSearch.addEventListener("input", function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(applyFilters, 200);
    });

    statusSearch.addEventListener("change", applyFilters);


    // ─────────────────────────────────────
    // Initial load
    // ─────────────────────────────────────

    await loadChallenges();

});
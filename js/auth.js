/* =========================================
   auth.js — Authentication (real API calls)
   Requires: api.js loaded before this file
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // ─────────────────────────────────────
    // LOGIN
    // ─────────────────────────────────────

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const role     = document.getElementById("role").value;
            const email    = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const btnEl    = loginForm.querySelector("button[type=submit]");

            if (!role || !email || !password) {
                showMessage("Please fill all the fields.", "error");
                return;
            }

            btnEl.disabled    = true;
            btnEl.textContent = "Logging in…";

            try {
                const data = await API.login({ email, password });

                // Verify role matches what was selected
                if (data.user.role !== role) {
                    showMessage(
                        `This account has role '${data.user.role}', not '${role}'. Please select the correct role.`,
                        "error"
                    );
                    btnEl.disabled    = false;
                    btnEl.textContent = "Login";
                    return;
                }

                // Persist session
                localStorage.setItem("token",      data.access_token);
                localStorage.setItem("isLoggedIn",  "true");
                localStorage.setItem("userRole",    data.user.role);
                localStorage.setItem("userName",    data.user.name);
                localStorage.setItem("userEmail",   data.user.email);
                localStorage.setItem("userId",      data.user.id);

                // Role-based redirect
                const redirectMap = {
                    citizen:    "../dashboard/citizen-dashboard.html",
                    university: "../dashboard/university-dashboard.html",
                    industry:   "../dashboard/industry-dashboard.html",
                    government: "../dashboard/government-dashboard.html",
                };
                window.location.href = redirectMap[data.user.role] || "../index.html";

            } catch (err) {
                showMessage(err.message || "Login failed. Please try again.", "error");
                btnEl.disabled    = false;
                btnEl.textContent = "Login";
            }

        });
    }


    // ─────────────────────────────────────
    // REGISTER
    // ─────────────────────────────────────

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const role            = document.getElementById("role").value;
            const name            = document.getElementById("name").value.trim();
            const email           = document.getElementById("email").value.trim();
            const password        = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();
            const btnEl           = registerForm.querySelector("button[type=submit]");

            if (!role || !name || !email || !password || !confirmPassword) {
                showMessage("Please fill all the fields.", "error");
                return;
            }

            if (password !== confirmPassword) {
                showMessage("Passwords do not match.", "error");
                return;
            }

            if (password.length < 6) {
                showMessage("Password must be at least 6 characters.", "error");
                return;
            }

            btnEl.disabled    = true;
            btnEl.textContent = "Registering…";

            // Optional: grab organization name if present on the form
            const organizationEl = document.getElementById("organization");
            const districtEl     = document.getElementById("district");

            const payload = {
                name,
                email,
                password,
                role,
                organization: organizationEl ? organizationEl.value.trim() : null,
                district:     districtEl     ? districtEl.value.trim()     : null,
            };

            try {
                const data = await API.register(payload);

                // Persist session (auto-login after register)
                localStorage.setItem("token",      data.access_token);
                localStorage.setItem("isLoggedIn",  "true");
                localStorage.setItem("userRole",    data.user.role);
                localStorage.setItem("userName",    data.user.name);
                localStorage.setItem("userEmail",   data.user.email);
                localStorage.setItem("userId",      data.user.id);

                showMessage("Registration successful! Redirecting…", "success");

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);

            } catch (err) {
                showMessage(err.message || "Registration failed. Please try again.", "error");
                btnEl.disabled    = false;
                btnEl.textContent = "Register";
            }

        });
    }


    // ─────────────────────────────────────
    // Helper: show inline message
    // ─────────────────────────────────────

    function showMessage(text, type = "error") {
        let msgEl = document.getElementById("authMessage");
        if (!msgEl) {
            msgEl = document.createElement("div");
            msgEl.id = "authMessage";
            msgEl.style.cssText =
                "margin-top:12px;padding:12px 16px;border-radius:8px;" +
                "font-size:14px;font-weight:500;";
            const form = loginForm || registerForm;
            form.appendChild(msgEl);
        }
        msgEl.textContent = text;
        msgEl.style.background = type === "success" ? "#d1fae5" : "#fee2e2";
        msgEl.style.color      = type === "success" ? "#065f46" : "#991b1b";
        msgEl.style.border     = type === "success"
            ? "1px solid #6ee7b7"
            : "1px solid #fca5a5";
    }

});
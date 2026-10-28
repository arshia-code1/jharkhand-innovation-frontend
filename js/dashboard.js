
document.addEventListener("DOMContentLoaded", function () {

    // Check whether user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (isLoggedIn !== "true" || !userRole) {
        alert("Please login first.");
        window.location.href = "../pages/login.html";
        return;
    }


    // Logout
    const logoutButton = document.querySelector(".logout-btn");

    if (logoutButton) {
        logoutButton.addEventListener("click", function (event) {

            event.preventDefault();

            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userEmail");

            alert("You have been logged out.");

            window.location.href = "../pages/login.html";
        });
    }

});
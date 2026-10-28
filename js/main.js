/* =========================================
   COMMON WEBSITE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       MOBILE MENU
    =============================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerHTML = isOpen ? "✕" : "☰";
        });
    }


    /* ===============================
       CLOSE MOBILE MENU
       WHEN LINK IS CLICKED
    =============================== */

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.innerHTML = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

    });


    /* ===============================
       ACTIVE NAVIGATION
    =============================== */

    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(function (link) {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });

});
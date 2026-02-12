document.addEventListener("DOMContentLoaded", function () {

    const placeholder = document.getElementById("header-placeholder");
    if (!placeholder) return;

    // Detect if page is root (dashboard)
    const isRootPage =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/");

    // Decide correct header path
    const headerPath = isRootPage
        ? "components/header.html"
        : "../../components/header.html";

    fetch(headerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Header file not found");
            }
            return response.text();
        })
        .then(data => {
            placeholder.innerHTML = data;

            // After header loads → control Back button
            const isDashboard = document.body.classList.contains("dashboard-body");

            const backBtn = document.getElementById("backButton");
            const welcome = document.getElementById("welcomeSection");

            if (!isDashboard && backBtn && welcome) {
                backBtn.style.display = "inline-block";
                welcome.style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error loading header:", error);
        });

});

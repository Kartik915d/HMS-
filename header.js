document.addEventListener("DOMContentLoaded", function () {

    fetch("header.html")
        .then(response => response.text())
        .then(data => {

            // Inject header
            document.getElementById("header-placeholder").innerHTML = data;

            // AFTER header is loaded → run initialization
            initializeHeader();
        });

});


function initializeHeader() {

    // ===== SHOW BACK BUTTON IF NOT DASHBOARD =====
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage !== "dashboard.html" && currentPage !== "") {
        const backBtn = document.getElementById("backButton");
        if (backBtn) backBtn.style.display = "inline-block";
    }

}
document.addEventListener("DOMContentLoaded", function () {

    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            // After header loads
            const isDashboard = document.body.classList.contains("dashboard-body");

            const backBtn = document.getElementById("backButton");
            const welcome = document.getElementById("welcomeSection");

            if (!isDashboard) {
                backBtn.style.display = "block";
                welcome.style.display = "none";
            }
        });

});

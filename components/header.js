console.log("HEADER JS WORKING");

document.addEventListener("DOMContentLoaded", function () {

    const placeholder = document.getElementById("header-placeholder");
    if (!placeholder) return;

    const isRootPage =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/");

    const headerPath = isRootPage
        ? "components/header.html"
        : "../../components/header.html";

    fetch(headerPath)
        .then(response => response.text())
        .then(data => {

            // 1. Inject header HTML
            placeholder.innerHTML = data;

            // 2. Back button logic
            const isDashboard = document.body.classList.contains("dashboard-body");
            const backBtn     = document.getElementById("backButton");
            const welcome     = document.getElementById("welcomeSection");

            if (!isDashboard && backBtn && welcome) {
                backBtn.style.display = "inline-block";
                welcome.style.display = "none";
            }

            // 3. Profile popup
            const profileBtn   = document.getElementById("profileBtn");
            const profilePopup = document.getElementById("profilePopup");

            if (!profileBtn || !profilePopup) {
                console.error("Header: profileBtn or profilePopup not found.");
                return;
            }

            // Toggle on circle click
            profileBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                const isOpen = profilePopup.classList.toggle("show");
                console.log("Popup toggled:", isOpen);
            });

            // Close on outside click
            document.addEventListener("click", function (e) {
                if (e.target !== profileBtn && !profilePopup.contains(e.target)) {
                    profilePopup.classList.remove("show");
                }
            });

        })
        .catch(err => console.error("Header load error:", err));

});
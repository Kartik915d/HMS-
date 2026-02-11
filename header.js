// ===== DATA ARRAYS =====

const quickAccessItems = [
    "Customer Master",
    "Tax Heads",
    "Tariff Heads",
    "Tariff Contract",
    "Marine Operation Dashboard",
    "SSR Master",
    "SSR Approval",
    "Train Visit"
    // 👉 Paste your full Quick Access list here
];

const vesselItems = [
    "SEASPAN LAHORE-R2894",
    "MAERSK CUBANGO-R2791",
    "CELSIUS EINDHOVEN-R2746",
    "MSC POSITANO-R2830"
    // 👉 Paste your full Vessel list here
];

// ===== LOAD ITEMS FUNCTION =====

function loadDropdown(listId, items) {
    const list = document.getElementById(listId);
    list.innerHTML = "";

    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "dropdown-item";
        div.innerText = item;

        div.addEventListener("click", function () {
            const dropdown = this.closest(".dropdown");
            dropdown.querySelector(".dropdown-header").innerText = item;
            dropdown.querySelector(".dropdown-body").style.display = "none";
        });

        list.appendChild(div);
    });
}

// ===== TOGGLE DROPDOWN =====

document.querySelectorAll(".dropdown-header").forEach(header => {
    header.addEventListener("click", function () {
        const body = this.nextElementSibling;
        body.style.display = body.style.display === "block" ? "none" : "block";
    });
});

// ===== SEARCH FILTER =====

document.querySelectorAll(".dropdown-search").forEach(input => {
    input.addEventListener("keyup", function () {
        const filter = this.value.toLowerCase();
        const items = this.nextElementSibling.querySelectorAll(".dropdown-item");

        items.forEach(item => {
            item.style.display = item.innerText.toLowerCase().includes(filter)
                ? "block"
                : "none";
        });
    });
});

// ===== INIT LOAD =====

loadDropdown("quickAccessList", quickAccessItems);
loadDropdown("vesselList", vesselItems);

let activeInput = null;
let dragging = null;
let mode = "hour";
let selectedHourAngle = 0;

/* ---------- DOM ---------- */

const modal = document.getElementById("clockModal");
const clock = document.getElementById("clock");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const actionBtn = document.querySelector(".primary");

/* ---------- UI ELEMENTS ---------- */

const label = document.createElement("div");
label.style.textAlign = "center";
label.style.fontWeight = "600";
label.style.marginBottom = "10px";

const preview = document.createElement("div");
preview.style.textAlign = "center";
preview.style.marginTop = "10px";
preview.style.padding = "6px 12px";
preview.style.border = "1px solid #ccc";
preview.style.borderRadius = "6px";
preview.style.fontSize = "14px";

/* ---------- OPEN / CLOSE ---------- */

function openClock(el) {
    activeInput = el.previousElementSibling;
    modal.style.display = "flex";

    mode = "hour";
    selectedHourAngle = 0;

    setHand(hourHand, 0);
    setHand(minuteHand, 0);

    hourHand.classList.remove("hidden");
    minuteHand.classList.add("hidden");

    label.textContent = "Select Hour";
    preview.textContent = "Selected Time: 12:00";

    if (!clock.parentElement.contains(label)) {
        clock.parentElement.prepend(label);
        clock.parentElement.append(preview);
    }

    actionBtn.textContent = "Next";
}

function closeClock() {
    modal.style.display = "none";
    dragging = null;
}

/* ---------- DRAG ---------- */

clock.addEventListener("mousedown", e => {
    if (e.target.classList.contains("hand")) {
        dragging = e.target;
        e.preventDefault();
    }
});

document.addEventListener("mouseup", () => dragging = null);

document.addEventListener("mousemove", e => {
    if (!dragging) return;

    const rect = clock.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    let rawAngle = Math.atan2(dy, dx) * 180 / Math.PI;

    // Convert so that 12 o'clock = 0°
    let angle = (rawAngle + 450) % 360;

    setHand(dragging, angle);

    if (mode === "hour") {
        selectedHourAngle = angle;
    }

    updatePreview();
});

/* ---------- SCROLL ---------- */

let scrollAccumulator = 0;
const SCROLL_THRESHOLD = 55;

clock.addEventListener("wheel", e => {
    e.preventDefault();

    scrollAccumulator += e.deltaY;

    if (Math.abs(scrollAccumulator) < SCROLL_THRESHOLD) return;

    const step = scrollAccumulator < 0 ? 1 : -1;
    scrollAccumulator = 0;

    if (mode === "hour") {
        selectedHourAngle =
            (selectedHourAngle + step * 30 + 360) % 360;

        setHand(hourHand, selectedHourAngle);
    }

    if (mode === "minute") {
        let minuteAngle = getClockAngle(minuteHand);
        minuteAngle =
            (minuteAngle + step * 6 + 360) % 360;

        setHand(minuteHand, minuteAngle);
    }

    updatePreview();
}, { passive: false });

/* ---------- SET TIME ---------- */

function setTime() {

    if (mode === "hour") {
        mode = "minute";

        hourHand.classList.add("hidden");
        minuteHand.classList.remove("hidden");

        label.textContent = "Select Minutes";
        actionBtn.textContent = "Set Time";
        return;
    }

    const minuteAngle = getClockAngle(minuteHand);

    let hour = Math.round(selectedHourAngle / 30) % 12;
    if (hour === 0) hour = 12;

    let minute = Math.round(minuteAngle / 6) % 60;

    activeInput.value =
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    closeClock();
}

/* ---------- LIVE PREVIEW ---------- */

function updatePreview() {

    let hour = Math.round(selectedHourAngle / 30) % 12;
    if (hour === 0) hour = 12;

    let minute = Math.round(getClockAngle(minuteHand) / 6) % 60;

    preview.textContent =
        `Selected Time: ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

/* ---------- HELPERS ---------- */

function setHand(hand, angle) {
    hand.style.transform = `rotate(${angle}deg)`;
}

function getClockAngle(hand) {
    const t = getComputedStyle(hand).transform;
    if (t === "none") return 0;

    const values = t.split("(")[1].split(")")[0].split(",");
    const angle = Math.atan2(values[1], values[0]) * 180 / Math.PI;

    return (angle + 360) % 360;
}

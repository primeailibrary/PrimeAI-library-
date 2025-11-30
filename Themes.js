// --------------------------
// Sidebar Toggle
// --------------------------
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});


// --------------------------
// Theme Switching System
// --------------------------
const themeButtons = document.querySelectorAll(".theme-option");

themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const selectedTheme = btn.getAttribute("data-theme");
        document.documentElement.setAttribute("data-theme", selectedTheme);

        // Local storage save
        localStorage.setItem("primeAI-theme", selectedTheme);

        // Active highlight
        themeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// --------------------------
// Load Theme from Storage
// --------------------------
const savedTheme = localStorage.getItem("primeAI-theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);

    document
        .querySelector(`[data-theme="${savedTheme}"]`)
        ?.classList.add("active");
}
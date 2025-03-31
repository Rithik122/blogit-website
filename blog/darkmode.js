document.addEventListener("DOMContentLoaded", function () {
    // Create a dark mode button dynamically (if it doesn't exist)
    if (!document.getElementById("darkModeToggle")) {
        let darkModeButton = document.createElement("button");
        darkModeButton.id = "darkModeToggle";
        darkModeButton.innerText = "🌙 Dark Mode";
        darkModeButton.style.position = "fixed";
        darkModeButton.style.top = "10px";
        darkModeButton.style.right = "10px";
        darkModeButton.style.padding = "10px";
        darkModeButton.style.zIndex = "1000";
        document.body.appendChild(darkModeButton);
    }

    const darkModeToggle = document.getElementById("darkModeToggle");

    // Check local storage for dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("darkmode");
        darkModeToggle.innerText = "☀️ Light Mode";
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("darkmode");

        if (document.body.classList.contains("darkmode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.innerText = "🌙 Dark Mode";
        }
    });
});

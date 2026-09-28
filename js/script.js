/* Task 2: accessible navigation, theme toggle, and contact validation */

const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

const themeButtons = document.querySelectorAll(".theme-toggle");

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);

    themeButtons.forEach((button) => {
        const dark = theme === "dark";
        button.setAttribute("aria-pressed", String(dark));
        button.textContent = dark ? "Light mode" : "Dark mode";
    });
}

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
}

themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const current = document.documentElement.dataset.theme || "light";
        applyTheme(current === "dark" ? "light" : "dark");
    });
});

const form = document.querySelector("#contact-form");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fields = [
            { id: "name", message: "Please enter your name." },
            { id: "email", message: "Please enter a valid email address." },
            { id: "subject", message: "Please enter a subject." },
            { id: "message", message: "Please enter your message." }
        ];

        let valid = true;
        let firstInvalid = null;

        fields.forEach(({ id, message }) => {
            const input = document.getElementById(id);
            const error = document.getElementById(`${id}-error`);

            if (!input.checkValidity()) {
                error.textContent = message;
                input.setAttribute("aria-invalid", "true");
                valid = false;
                firstInvalid ??= input;
            } else {
                error.textContent = "";
                input.removeAttribute("aria-invalid");
            }
        });

        const status = document.getElementById("form-status");

        if (!valid) {
            status.textContent = "Please correct the highlighted fields.";
            firstInvalid?.focus();
            return;
        }

        status.textContent =
            "Your message has been validated. This demo form does not send email because no backend is connected.";

        form.reset();
    });
}

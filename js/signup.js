/* =========================================================
   ELECTROX SIGNUP JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS
       ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });
    }


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const form = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    const password = document.getElementById("password");
    const confirmPassword =
        document.getElementById("confirmPassword");

    const terms = document.getElementById("terms");

    const signupButton =
        document.querySelector(".signup-btn");

    const successMessage =
        document.getElementById("successMessage");


    /* =====================================================
       PASSWORD TOGGLE
       ===================================================== */

    function setupPasswordToggle(buttonId, inputId) {

        const button = document.getElementById(buttonId);
        const input = document.getElementById(inputId);

        if (!button || !input) return;

        button.addEventListener("click", () => {

            const isPassword =
                input.type === "password";

            input.type =
                isPassword ? "text" : "password";

            const icon =
                button.querySelector("i");

            icon.className = isPassword
                ? "fa-regular fa-eye-slash"
                : "fa-regular fa-eye";

            button.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

            button.setAttribute(
                "title",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

        });

    }

    setupPasswordToggle(
        "passwordToggle",
        "password"
    );

    setupPasswordToggle(
        "confirmToggle",
        "confirmPassword"
    );


    /* =====================================================
       PASSWORD STRENGTH
       ===================================================== */

    const strengthBar =
        document.getElementById("strengthBar");

    const strengthText =
        document.getElementById("strengthText");

    password.addEventListener("input", () => {

        const value = password.value;

        let strength = 0;

        if (value.length >= 8) {
            strength++;
        }

        if (/[A-Z]/.test(value)) {
            strength++;
        }

        if (/[0-9]/.test(value)) {
            strength++;
        }

        if (/[^A-Za-z0-9]/.test(value)) {
            strength++;
        }

        const width = strength * 25;

        strengthBar.style.width = `${width}%`;

        if (!value) {

            strengthText.textContent =
                "Password strength";

        } else if (strength <= 1) {

            strengthText.textContent =
                "Weak";

        } else if (strength === 2) {

            strengthText.textContent =
                "Medium";

        } else if (strength === 3) {

            strengthText.textContent =
                "Strong";

        } else {

            strengthText.textContent =
                "Very strong";

        }

    });


    /* =====================================================
       CLEAR ERROR
       ===================================================== */

    function clearErrors() {

        document
            .querySelectorAll(".error-message")
            .forEach(error => {
                error.textContent = "";
            });

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        clearErrors();

        let valid = true;


        /* Name */
        if (fullName.value.trim().length < 3) {

            document.getElementById("nameError")
                .textContent =
                "Please enter your full name.";

            valid = false;

        }


        /* Email */
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            document.getElementById("emailError")
                .textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        /* Phone */
        const phonePattern =
            /^[0-9]{10}$/;

        if (!phonePattern.test(phone.value.trim())) {

            document.getElementById("phoneError")
                .textContent =
                "Enter a valid 10-digit phone number.";

            valid = false;

        }


        /* Password */
        if (password.value.length < 8) {

            document.getElementById("passwordError")
                .textContent =
                "Password must contain at least 8 characters.";

            valid = false;

        }


        /* Confirm Password */
        if (
            confirmPassword.value !==
            password.value
        ) {

            document.getElementById("confirmError")
                .textContent =
                "Passwords do not match.";

            valid = false;

        }


        /* Terms */
        if (!terms.checked) {

            document.getElementById("termsError")
                .textContent =
                "Please accept the terms and privacy policy.";

            valid = false;

        }


        if (!valid) {
            return;
        }


        /* =================================================
           SUCCESS
           ================================================= */

        signupButton.classList.add("loading");

        signupButton.querySelector("span")
            .textContent = "Creating Account...";


        successMessage.classList.add("show");


        /*
         * Frontend demo signup.
         * Redirects to login.html after successful validation.
         */

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1800);

    });


    /* =====================================================
       PHONE - ONLY NUMBERS
       ===================================================== */

    phone.addEventListener("input", () => {

        phone.value =
            phone.value.replace(/\D/g, "")
                .slice(0, 10);

    });


    /* =====================================================
       REAL-TIME CONFIRM PASSWORD
       ===================================================== */

    confirmPassword.addEventListener("input", () => {

        const error =
            document.getElementById("confirmError");

        if (
            confirmPassword.value &&
            confirmPassword.value !== password.value
        ) {

            error.textContent =
                "Passwords do not match.";

        } else {

            error.textContent = "";

        }

    });

});
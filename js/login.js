/* =========================================================
   ELECTROX LOGIN JAVASCRIPT
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

    const loginForm =
        document.getElementById("loginForm");

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const loginButton =
        document.querySelector(".login-btn");

    const statusMessage =
        document.getElementById("statusMessage");


    /* =====================================================
       PASSWORD SHOW / HIDE
       ===================================================== */

    passwordToggle.addEventListener("click", () => {

        const isPassword =
            password.type === "password";

        password.type =
            isPassword ? "text" : "password";

        const icon =
            passwordToggle.querySelector("i");

        icon.className = isPassword
            ? "fa-regular fa-eye-slash"
            : "fa-regular fa-eye";

        passwordToggle.setAttribute(
            "aria-label",
            isPassword
                ? "Hide password"
                : "Show password"
        );

        passwordToggle.setAttribute(
            "title",
            isPassword
                ? "Hide password"
                : "Show password"
        );

    });


    /* =====================================================
       CLEAR ERRORS
       ===================================================== */

    function clearErrors() {

        document
            .querySelectorAll(".error-message")
            .forEach(error => {
                error.textContent = "";
            });

    }


    /* =====================================================
       LOGIN SUBMIT
       ===================================================== */

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        clearErrors();

        statusMessage.classList.remove("show");

        let valid = true;


        /* ================================================
           EMAIL VALIDATION
           ================================================ */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            document.getElementById("emailError")
                .textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        /* ================================================
           PASSWORD VALIDATION
           ================================================ */

        if (password.value.length < 8) {

            document.getElementById("passwordError")
                .textContent =
                "Password must contain at least 8 characters.";

            valid = false;

        }


        if (!valid) {
            return;
        }


        /* ================================================
           SELECT ROLE
           ================================================ */

        const selectedRole =
            document.querySelector(
                'input[name="role"]:checked'
            );


        if (!selectedRole) {
            return;
        }


        const role =
            selectedRole.value;


        /* ================================================
           BUTTON LOADING
           ================================================ */

        loginButton.classList.add("loading");

        loginButton.querySelector("span")
            .textContent = "Signing In...";


        /* ================================================
           SUCCESS MESSAGE
           ================================================ */

        statusMessage.querySelector("span")
            .textContent =
            role === "admin"
                ? "Admin login successful. Opening dashboard..."
                : "Customer login successful. Opening dashboard...";

        statusMessage.classList.add("show");


        /* ================================================
           DASHBOARD REDIRECT
           ================================================ */

        setTimeout(() => {

            if (role === "admin") {

                window.location.href =
                    "admin.html";

            } else {

                window.location.href =
                    "customer.html";

            }

        }, 1200);

    });


    /* =====================================================
       FORGOT PASSWORD
       ===================================================== */

    const forgotPassword =
        document.getElementById("forgotPassword");

    forgotPassword.addEventListener("click", (event) => {

        event.preventDefault();

        alert(
            "Password reset functionality can be connected to your backend."
        );

    });


    /* =====================================================
       EMAIL LOWERCASE
       ===================================================== */

    email.addEventListener("blur", () => {

        email.value =
            email.value.trim().toLowerCase();

    });


    /* =====================================================
       ENTER KEY
       ===================================================== */

    password.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            loginForm.requestSubmit();

        }

    });

});
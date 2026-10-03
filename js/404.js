/* =========================================================
   ELECTROX 404 JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS ANIMATION
       ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    const header = document.querySelector(".site-header");

    function handleHeaderScroll() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuBtn && mobileNav) {

        menuBtn.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            menuBtn.setAttribute(
                "title",
                isOpen ? "Close menu" : "Open menu"
            );

            menuBtn.textContent = isOpen ? "×" : "☰";

        });


        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuBtn.setAttribute(
                    "title",
                    "Open menu"
                );

                menuBtn.textContent = "☰";

            });

        });

    }


    /* =====================================================
       404 NUMBER MOUSE EFFECT
       ===================================================== */

    const errorVisual = document.querySelector(".error-visual");

    const floatingChips =
        document.querySelectorAll(".floating-chip");

    if (errorVisual && floatingChips.length) {

        errorVisual.addEventListener("mousemove", (event) => {

            const rect =
                errorVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            floatingChips.forEach((chip, index) => {

                const strength = (index + 1) * 12;

                chip.style.transform =
                    `translate(${x * strength}px, ${y * strength}px)`;

            });

        });


        errorVisual.addEventListener("mouseleave", () => {

            floatingChips.forEach(chip => {
                chip.style.transform = "";
            });

        });

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backTop = document.querySelector(".back-top");

    if (backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }

        });


        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       KEYBOARD ESCAPE - CLOSE MENU
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (mobileNav) {
                mobileNav.classList.remove("open");
            }

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                menuBtn.setAttribute(
                    "title",
                    "Open menu"
                );

                menuBtn.textContent = "☰";
            }

        }

    });

});
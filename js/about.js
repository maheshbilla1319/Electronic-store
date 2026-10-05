/* =========================================================
   ELECTROX ABOUT PAGE JAVASCRIPT
========================================================= */

/* =========================================================
   AOS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", function () {

        mobileNav.classList.toggle("show");

        const isOpen = mobileNav.classList.contains("show");

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

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

document.querySelectorAll(".mobile-nav a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (mobileNav) {
            mobileNav.classList.remove("show");
        }

        if (menuBtn) {

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuBtn.setAttribute(
                "title",
                "Open menu"
            );

        }

    });

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeProgress =
                    1 - Math.pow(1 - progress, 3);

                current = Math.floor(
                    easeProgress * target
                );

                if (target >= 1000) {

                    counter.textContent =
                        current.toLocaleString() + "+";

                } else if (target === 98) {

                    counter.textContent = current + "%";

                } else {

                    counter.textContent = current + "+";

                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }

            }

            requestAnimationFrame(updateCounter);

            observer.unobserve(counter);

        });

    },
    {
        threshold: .5
    }
);

counters.forEach(function (counter) {
    counterObserver.observe(counter);
});


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", function () {

    if (!backTop) {
        return;
    }

    if (window.scrollY > 500) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }

});


if (backTop) {

    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

let scrollTimer;

window.addEventListener("scroll", function () {

    const header = document.querySelector(".site-header");

    if (!header) {
        return;
    }

    header.style.borderBottomColor = "var(--white)";

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(function () {

        header.style.borderBottomColor = "var(--cyan)";

    }, 150);

});


/* =========================================================
   IMAGE HOVER PARALLAX
========================================================= */

const imageCards = document.querySelectorAll(
    ".intro-image, .story-image, .team-image, .world-card"
);

imageCards.forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const image = card.querySelector("img");

        if (!image) {
            return;
        }

        const rect = card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - .5;

        const y =
            (event.clientY - rect.top) / rect.height - .5;

        image.style.transform =
            `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;

    });

    card.addEventListener("mouseleave", function () {

        const image = card.querySelector("img");

        if (image) {
            image.style.transform = "scale(1) translate(0, 0)";
        }

    });

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (mobileNav) {
            mobileNav.classList.remove("show");
        }

        if (menuBtn) {

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuBtn.setAttribute(
                "title",
                "Open menu"
            );

        }

    }

});
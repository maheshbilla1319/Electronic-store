/* =========================================================
   ELECTROX ELECTRONICS STORE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= AOS ================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.querySelector(".menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuBtn && mobileNav) {

        menuBtn.addEventListener("click", () => {
            mobileNav.classList.toggle("show");

            const expanded = mobileNav.classList.contains("show");
            menuBtn.setAttribute("aria-expanded", expanded);
        });

        mobileNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileNav.classList.remove("show");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* ================= HERO SLIDER ================= */

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    const nextBtn = document.querySelector(".slider-next");
    const prevBtn = document.querySelector(".slider-prev");

    let currentSlide = 0;
    let slideTimer;

    function showSlide(index) {

        if (!slides.length) return;

        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {
        clearInterval(slideTimer);

        slideTimer = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startSlider();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlider();
        });
    });

    showSlide(0);
    startSlider();


    /* ================= PRODUCT FILTER ================= */

    const filters = document.querySelectorAll(".filter");
    const products = document.querySelectorAll(".product-card");

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const selected = filter.dataset.filter;

            products.forEach(product => {

                const category = product.dataset.category;

                if (selected === "all" || category === selected) {

                    product.style.display = "block";

                    requestAnimationFrame(() => {
                        product.style.opacity = "1";
                        product.style.transform = "translateY(0)";
                    });

                } else {

                    product.style.opacity = "0";
                    product.style.transform = "translateY(15px)";

                    setTimeout(() => {
                        product.style.display = "none";
                    }, 250);
                }
            });

        });

    });


    /* ================= WISHLIST ================= */

    const heartButtons = document.querySelectorAll(".heart");

    heartButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent.trim() === "♡") {
                button.textContent = "♥";
            } else {
                button.textContent = "♡";
            }

        });

    });


    /* ================= COUNTDOWN ================= */

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    let offerEnd = Date.now() + (
        2 * 24 * 60 * 60 * 1000 +
        18 * 60 * 60 * 1000 +
        42 * 60 * 1000
    );

    function updateCountdown() {

        const remaining = offerEnd - Date.now();

        if (remaining <= 0) {
            offerEnd = Date.now() + (
                2 * 24 * 60 * 60 * 1000 +
                18 * 60 * 60 * 1000 +
                42 * 60 * 1000
            );
            return;
        }

        const days = Math.floor(
            remaining / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (remaining / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (remaining / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (remaining / 1000) % 60
        );

        if (daysElement) {
            daysElement.textContent = String(days).padStart(2, "0");
        }

        if (hoursElement) {
            hoursElement.textContent = String(hours).padStart(2, "0");
        }

        if (minutesElement) {
            minutesElement.textContent = String(minutes).padStart(2, "0");
        }

        if (secondsElement) {
            secondsElement.textContent = String(seconds).padStart(2, "0");
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* ================= NEWSLETTER ================= */

 const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const formMessage = document.getElementById("formMessage");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", event => {

        event.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {
            formMessage.textContent = "Please enter your email.";
            return;
        }

        if (!email.includes("@")) {
            formMessage.textContent = "Please enter a valid email.";
            return;
        }

        formMessage.textContent =
            "You're subscribed to ElectroX updates.";

        emailInput.value = "";

        /* Redirect to 404.html */
        setTimeout(() => {
            window.location.href = "404.html";
        }, 1200);

    });

}

    /* ================= BACK TO TOP ================= */

    const backTop = document.getElementById("backTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

        updateActiveNavigation();

    });


    if (backTop) {

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= ACTIVE NAV ================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav a");

    function updateActiveNavigation() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }

        });

    }


    /* ================= HOVER IMAGE EFFECT ================= */

    const categoryCards =
        document.querySelectorAll(".category-card");

    categoryCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const image = card.querySelector("img");

            if (!image) return;

            const rect = card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width - 0.5) * 8;

            const y =
                ((event.clientY - rect.top) / rect.height - 0.5) * 8;

            image.style.transform =
                `scale(1.08) translate(${x}px, ${y}px)`;

        });

        card.addEventListener("mouseleave", () => {

            const image = card.querySelector("img");

            if (image) {
                image.style.transform = "scale(1) translate(0,0)";
            }

        });

    });


    /* ================= SMOOTH ANCHOR ================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = 82;

            window.scrollTo({
                top: target.offsetTop - headerHeight,
                behavior: "smooth"
            });

        });

    });

});
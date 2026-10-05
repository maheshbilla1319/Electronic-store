/* =========================================================
   ELECTROX SERVICES JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= AOS ================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }


    /* ================= HEADER ================= */

    const header = document.querySelector(".site-header");

    function handleHeader() {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.querySelector(".menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuBtn && mobileNav) {

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

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

            });

        });

    }


    /* ================= OFFER SLIDER ================= */

    const slides = document.querySelectorAll(".offer-slide");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");
    const dotsContainer = document.querySelector(".slider-dots");

    let currentSlide = 0;
    let sliderTimer;


    if (slides.length && dotsContainer) {

        slides.forEach((slide, index) => {

            const dot = document.createElement("button");

            dot.className = "slider-dot";

            dot.setAttribute(
                "aria-label",
                `Show offer ${index + 1}`
            );

            dot.title = `Show offer ${index + 1}`;

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                showSlide(index);
                restartSlider();
            });

            dotsContainer.appendChild(dot);

        });


        const dots = dotsContainer.querySelectorAll(".slider-dot");


        function showSlide(index) {

            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }


            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );

            });


            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === currentSlide
                );

            });

        }


        function nextSlide() {
            showSlide(currentSlide + 1);
        }


        function previousSlide() {
            showSlide(currentSlide - 1);
        }


        function startSlider() {

            sliderTimer = setInterval(
                nextSlide,
                5000
            );

        }


        function restartSlider() {

            clearInterval(sliderTimer);
            startSlider();

        }


        if (nextBtn) {

            nextBtn.addEventListener("click", () => {

                nextSlide();
                restartSlider();

            });

        }


        if (prevBtn) {

            prevBtn.addEventListener("click", () => {

                previousSlide();
                restartSlider();

            });

        }


        showSlide(0);
        startSlider();

    }


    /* ================= COUNTERS ================= */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;
                const target = Number(
                    counter.dataset.target
                );

                let current = 0;
                const duration = 1600;
                const startTime = performance.now();


                function updateCounter(time) {

                    const progress = Math.min(
                        (time - startTime) / duration,
                        1
                    );

                    current = Math.floor(
                        progress * target
                    );

                    counter.textContent =
                        current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(
                            updateCounter
                        );
                    } else {
                        counter.textContent =
                            target.toLocaleString();

                        if (target === 98) {
                            counter.textContent = "98%";
                        }

                        if (target === 24) {
                            counter.textContent = "24/7";
                        }

                    }

                }


                requestAnimationFrame(updateCounter);

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* ================= BACK TO TOP ================= */

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


    /* ================= IMAGE LOAD EFFECT ================= */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

    });

});
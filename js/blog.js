/* =========================================================
   ELECTROX BLOG JAVASCRIPT
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
            offset: 80
        });

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn =
        document.querySelector(".menu-btn");

    const mobileNav =
        document.querySelector(".mobile-nav");


    if (menuBtn && mobileNav) {

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );


        menuBtn.addEventListener("click", () => {

            const opened =
                mobileNav.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                opened
                    ? "Close menu"
                    : "Open menu"
            );

        });


        mobileNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileNav.classList.remove(
                            "open"
                        );

                        menuBtn.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuBtn.setAttribute(
                            "aria-label",
                            "Open menu"
                        );

                    }
                );

            });

    }


    /* =====================================================
       DISCOUNT SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(
            ".discount-slide"
        );

    const prevBtn =
        document.querySelector(
            ".discount-prev"
        );

    const nextBtn =
        document.querySelector(
            ".discount-next"
        );

    const dotsContainer =
        document.querySelector(
            ".discount-dots"
        );

    let currentSlide = 0;
    let sliderTimer;


    if (
        slides.length &&
        dotsContainer
    ) {

        slides.forEach((slide, index) => {

            const dot =
                document.createElement("button");

            dot.className =
                "discount-dot";

            dot.setAttribute(
                "aria-label",
                `Show discount ${index + 1}`
            );

            dot.title =
                `Show discount ${index + 1}`;

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener(
                "click",
                () => {

                    showSlide(index);
                    restartSlider();

                }
            );

            dotsContainer.appendChild(dot);

        });


        const dots =
            dotsContainer.querySelectorAll(
                ".discount-dot"
            );


        function showSlide(index) {

            if (index >= slides.length) {

                currentSlide = 0;

            } else if (index < 0) {

                currentSlide =
                    slides.length - 1;

            } else {

                currentSlide = index;

            }


            slides.forEach(
                (slide, i) => {

                    slide.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                }
            );


            dots.forEach(
                (dot, i) => {

                    dot.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                }
            );

        }


        function nextSlide() {

            showSlide(
                currentSlide + 1
            );

        }


        function previousSlide() {

            showSlide(
                currentSlide - 1
            );

        }


        function startSlider() {

            sliderTimer =
                setInterval(
                    nextSlide,
                    5000
                );

        }


        function restartSlider() {

            clearInterval(
                sliderTimer
            );

            startSlider();

        }


        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                () => {

                    nextSlide();
                    restartSlider();

                }
            );

        }


        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                () => {

                    previousSlide();
                    restartSlider();

                }
            );

        }


        showSlide(0);

        startSlider();

    }


    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );

                    const duration = 1600;

                    const startTime =
                        performance.now();


                    function animateCounter(time) {

                        const progress =
                            Math.min(
                                (time - startTime) /
                                duration,
                                1
                            );


                        const value =
                            Math.floor(
                                progress * target
                            );


                        counter.textContent =
                            value.toLocaleString();


                        if (progress < 1) {

                            requestAnimationFrame(
                                animateCounter
                            );

                        } else {

                            counter.textContent =
                                target.toLocaleString();

                        }

                    }


                    requestAnimationFrame(
                        animateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(
            counter
        );

    });


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.querySelector(
            "#newsletterForm"
        );

    const newsletterEmail =
        document.querySelector(
            "#newsletterEmail"
        );

    const formMessage =
        document.querySelector(
            "#formMessage"
        );


    if (
        newsletterForm &&
        newsletterEmail &&
        formMessage
    ) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !newsletterEmail.checkValidity()
                ) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                    return;

                }


                formMessage.textContent =
                    "Thanks for subscribing to ElectroX.";

                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.querySelector(
            ".back-top"
        );


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backTop.classList.add(
                        "show"
                    );

                } else {

                    backTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

});
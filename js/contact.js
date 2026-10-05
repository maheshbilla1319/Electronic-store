/* =========================================================
   ELECTROX CONTACT JAVASCRIPT
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
       HEADER
    ===================================================== */

    const header =
        document.querySelector(".site-header");


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


        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileNav.classList.toggle(
                        "open"
                    );


                menuBtn.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                menuBtn.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );

            }
        );


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
   CONTACT FORM
===================================================== */

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!contactForm.checkValidity()) {

            formMessage.textContent =
                "Please complete all required fields.";

            contactForm.reportValidity();

            return;
        }

        formMessage.textContent =
            "Thank you. Your message has been received.";

        contactForm.reset();

        /* Redirect to 404 page */
        setTimeout(() => {
            window.location.href = "404.html";
        }, 1200);

    });

}

    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        question.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


                faqItems.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "open"
                        );

                        const otherQuestion =
                            otherItem.querySelector(
                                ".faq-question"
                            );

                        const otherAnswer =
                            otherItem.querySelector(
                                ".faq-answer"
                            );

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        otherAnswer.style.maxHeight =
                            null;

                    }
                );


                if (!isOpen) {

                    item.classList.add(
                        "open"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    });


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


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });

});
/* =====================================================
   ELECTROX CUSTOMER DASHBOARD JS
===================================================== */


/* =====================================================
   AOS
===================================================== */

AOS.init({
  duration: 850,
  easing: "ease-out-cubic",
  once: true,
  offset: 70
});


/* =====================================================
   SIDEBAR
===================================================== */

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarOverlay = document.getElementById("sidebarOverlay");


function openSidebar() {

  sidebar.classList.add("open");

  sidebarOverlay.classList.add("show");

  document.body.style.overflow = "hidden";
}


function closeSidebar() {

  sidebar.classList.remove("open");

  sidebarOverlay.classList.remove("show");

  document.body.style.overflow = "";
}


if (menuToggle) {

  menuToggle.addEventListener(
    "click",
    openSidebar
  );

}


if (sidebarClose) {

  sidebarClose.addEventListener(
    "click",
    closeSidebar
  );

}


if (sidebarOverlay) {

  sidebarOverlay.addEventListener(
    "click",
    closeSidebar
  );

}


/* =====================================================
   SIDEBAR ACTIVE MENU
===================================================== */

const menuLinks =
  document.querySelectorAll(".menu-link");


menuLinks.forEach(link => {

  link.addEventListener("click", function () {

    menuLinks.forEach(item => {

      item.classList.remove("active");

    });

    this.classList.add("active");


    if (window.innerWidth <= 900) {

      closeSidebar();

    }

  });

});


/* =====================================================
   LOGOUT
===================================================== */

const logoutBtn =
  document.getElementById("logoutBtn");


if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    function () {

      const confirmed = confirm(
        "Are you sure you want to logout?"
      );


      if (!confirmed) {

        return;

      }


      logoutBtn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Logging out...</span>
      `;


      setTimeout(() => {

        window.location.href = "login.html";

      }, 700);

    }
  );

}


/* =====================================================
   WISHLIST BUTTONS
===================================================== */

const wishlistButtons =
  document.querySelectorAll(".wishlist-btn");


wishlistButtons.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      this.classList.toggle("saved");


      const icon =
        this.querySelector("i");


      if (this.classList.contains("saved")) {

        icon.classList.remove(
          "fa-regular"
        );

        icon.classList.add(
          "fa-solid"
        );

      } else {

        icon.classList.remove(
          "fa-solid"
        );

        icon.classList.add(
          "fa-regular"
        );

      }

    }
  );

});


/* =====================================================
   REMOVE WISHLIST
===================================================== */

const removeWishlist =
  document.querySelectorAll(
    ".remove-wishlist"
  );


removeWishlist.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      const item =
        this.closest(".wishlist-item");


      if (!item) {
        return;
      }


      item.style.opacity = "0";
      item.style.transform = "translateX(30px)";


      setTimeout(() => {

        item.remove();

      }, 350);

    }
  );

});


/* =====================================================
   ADD TO CART
===================================================== */

const cartButtons =
  document.querySelectorAll(".cart-small");


const cartBadge =
  document.querySelector(".cart-btn span");


let cartCount = 2;


cartButtons.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      cartCount++;

      if (cartBadge) {

        cartBadge.textContent =
          cartCount;

      }


      const original =
        this.innerHTML;


      this.innerHTML =
        `<i class="fa-solid fa-check"></i>`;


      this.style.background =
        "#00D9FF";

      this.style.color =
        "#071A2B";


      setTimeout(() => {

        this.innerHTML =
          original;

        this.style.background = "";
        this.style.color = "";

      }, 1000);

    }
  );

});


/* =====================================================
   CART BUTTON
===================================================== */

const cartButton =
  document.querySelector(".cart-btn");


if (cartButton) {

  cartButton.addEventListener(
    "click",
    function () {

 

    }
  );

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

const notificationButton =
  document.querySelector(
    ".notification-btn"
  );


if (notificationButton) {

  notificationButton.addEventListener(
    "click",
    function () {

   

    }
  );

}


/* =====================================================
   SEARCH
===================================================== */

const searchButton =
  document.querySelector(
    '.header-icon[aria-label="Search"]'
  );





/* =====================================================
   TRACK ORDER
===================================================== */

const trackButton =
  document.querySelector(".track-btn");


if (trackButton) {

  trackButton.addEventListener(
    "click",
    function () {


    }
  );

}


/* =====================================================
   WINDOW RESIZE
===================================================== */

window.addEventListener(
  "resize",
  function () {

    if (window.innerWidth > 900) {

      closeSidebar();

    }

  }
);


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const statNumbers =
  document.querySelectorAll(
    ".stat-card h3"
  );


function animateCounter(element) {

  const original =
    element.textContent.trim();


  const isCurrency =
    original.includes("₹");


  const target =
    Number(
      original
        .replace(/[₹,]/g, "")
    );


  if (Number.isNaN(target)) {

    return;

  }


  let current = 0;

  const duration = 1200;

  const startTime =
    performance.now();


  function update(time) {

    const progress =
      Math.min(
        (time - startTime) / duration,
        1
      );


    current =
      Math.floor(
        progress * target
      );


    element.textContent =
      `${isCurrency ? "₹" : ""}${current.toLocaleString("en-IN")}`;


    if (progress < 1) {

      requestAnimationFrame(update);

    }

  }


  requestAnimationFrame(update);

}


const counterObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          animateCounter(
            entry.target
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: .5
    }
  );


statNumbers.forEach(number => {

  counterObserver.observe(number);

});
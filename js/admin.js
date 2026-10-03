/* =====================================================
   ELECTROX ADMIN DASHBOARD JS
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
  menuToggle.addEventListener("click", openSidebar);
}


if (sidebarClose) {
  sidebarClose.addEventListener("click", closeSidebar);
}


if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", closeSidebar);
}


/* =====================================================
   SIDEBAR ACTIVE MENU
===================================================== */

const menuLinks = document.querySelectorAll(".menu-link");

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

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", function () {

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

  });

}


/* =====================================================
   SALES FILTER
===================================================== */

const salesFilter = document.getElementById("salesFilter");

if (salesFilter) {

  salesFilter.addEventListener("change", function () {

    console.log(
      "Selected sales period:",
      this.value
    );

  });

}


/* =====================================================
   PRODUCT BUTTON
===================================================== */

const productButton = document.querySelector(".primary-btn");

if (productButton) {

  productButton.addEventListener("click", function () {

    alert("Add Product feature is ready to connect with your product form.");

  });

}


/* =====================================================
   HEADER SEARCH
===================================================== */

const searchButton = document.querySelector(
  '.header-icon[aria-label="Search"]'
);

if (searchButton) {

  searchButton.addEventListener("click", function () {

    alert("Search feature is ready to connect with your product/customer search.");

  });

}


/* =====================================================
   NOTIFICATION
===================================================== */

const notificationButton = document.querySelector(
  '.notification-btn'
);

if (notificationButton) {

  notificationButton.addEventListener("click", function () {

    alert(
      "You have 5 new notifications."
    );

  });

}


/* =====================================================
   WINDOW RESIZE
===================================================== */

window.addEventListener("resize", function () {

  if (window.innerWidth > 900) {
    closeSidebar();
  }

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const statNumbers = document.querySelectorAll(
  ".stat-card h3"
);

const animateCounter = (element) => {

  const originalText = element.textContent.trim();

  const hasRupee = originalText.includes("₹");
  const cleanNumber = originalText
    .replace(/[₹,]/g, "");

  const target = Number(cleanNumber);

  if (Number.isNaN(target)) {
    return;
  }

  let current = 0;

  const duration = 1200;
  const startTime = performance.now();

  function updateCounter(time) {

    const progress = Math.min(
      (time - startTime) / duration,
      1
    );

    current = Math.floor(
      progress * target
    );

    element.textContent =
      `${hasRupee ? "₹" : ""}${current.toLocaleString("en-IN")}`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }

  }

  requestAnimationFrame(updateCounter);

};


const observer = new IntersectionObserver(
  (entries, observerInstance) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        animateCounter(entry.target);

        observerInstance.unobserve(
          entry.target
        );

      }

    });

  },
  {
    threshold: 0.5
  }
);


statNumbers.forEach(number => {
  observer.observe(number);
});
const accountToggle = document.querySelector("[data-account-toggle]");
const accountDropdown = document.querySelector(".account-dropdown");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const overlay = document.querySelector("[data-getting-overlay]");
const openOverlayLinks = document.querySelectorAll("[data-open-getting]");
const closeOverlayButton = document.querySelector("[data-overlay-close]");
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll("[data-slide-target]"));
const prevSlideButton = document.querySelector("[data-prev-slide]");
const nextSlideButton = document.querySelector("[data-next-slide]");
let activeSlide = 0;
let slideTimer;

function createIcons() {
  window.lucide?.createIcons();
}

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeSlide);
  });
}

function restartSlider() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 9000);
}

function openGettingOverlay() {
  overlay?.classList.add("open");
  overlay?.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");
}

function closeGettingOverlay() {
  overlay?.classList.remove("open");
  overlay?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
}

accountToggle?.addEventListener("click", () => {
  const isOpen = accountDropdown?.classList.toggle("open") || false;
  accountToggle.setAttribute("aria-expanded", String(isOpen));
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("open") || false;
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

openOverlayLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openGettingOverlay();
  });
});

closeOverlayButton?.addEventListener("click", closeGettingOverlay);

overlay?.addEventListener("click", (event) => {
  if (event.target === overlay) closeGettingOverlay();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGettingOverlay();
    accountDropdown?.classList.remove("open");
  }
});

prevSlideButton?.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  restartSlider();
});

nextSlideButton?.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  restartSlider();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slideTarget || 0));
    restartSlider();
  });
});

const chapterSearch = document.querySelector("#chapter-search");
const searchMessage = document.querySelector("#search-message");

chapterSearch?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = new FormData(chapterSearch).get("search");
  const text = String(query || "").trim();
  searchMessage.textContent = text
    ? `已收到「${text}」查找需求，建議從藍星科技顧問諮詢開始。`
    : "請先輸入想查找的方案方向。";
});

const newsletterForm = document.querySelector("#newsletter-form");
const newsletterMessage = document.querySelector("#newsletter-message");

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = String(new FormData(newsletterForm).get("email") || "").trim();
  localStorage.setItem("bluestar-newsletter", email);
  newsletterForm.reset();
  newsletterMessage.textContent = "已收到訂閱資料。";
});

showSlide(0);
restartSlider();
createIcons();

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll("[data-slide-target]"));
const prevButton = document.querySelector(".slider-button.prev");
const nextButton = document.querySelector(".slider-button.next");
let activeSlide = 0;
let slideTimer;

function refreshIcons() {
  window.lucide?.createIcons();
}

function closeMenu() {
  siteNav?.classList.remove("open");
  document.body.classList.remove("menu-open");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
}

function restartSlider() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showSlide(activeSlide + 1), 7000);
}

prevButton?.addEventListener("click", () => {
  showSlide(activeSlide - 1);
  restartSlider();
});

nextButton?.addEventListener("click", () => {
  showSlide(activeSlide + 1);
  restartSlider();
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slideTarget || 0));
    restartSlider();
  });
});

const solutionSearch = document.querySelector("#solution-search");
const solutionInput = document.querySelector("#solution-input");
const searchResult = document.querySelector("#search-result");

const solutionMap = [
  { keys: ["內容", "自媒體", "短影音", "海報"], label: "建議先看「內容營運」，適合建立腳本、圖片、短影音與發佈節奏。" },
  { keys: ["流程", "自動化", "客服", "表單"], label: "建議先看「企業流程」，適合整理表單、通知、客服回覆與資料處理。" },
  { keys: ["課程", "內訓", "教學", "講師"], label: "建議先看「藍星學院」，適合規劃課程、教材、作業與陪跑流程。" },
];

solutionSearch?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = solutionInput?.value.trim() || "";
  const matched = solutionMap.find((item) => item.keys.some((key) => query.includes(key)));
  searchResult.textContent = matched?.label || "已收到查找需求，建議先留下聯絡方式，我們會協助判斷最適合的方案。";
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

const leadForm = document.querySelector("#lead-form");
const formStatus = document.querySelector("#form-status");

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  const lead = {
    name: String(formData.get("name") || "").trim(),
    contact: String(formData.get("contact") || "").trim(),
    need: String(formData.get("need") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.contact || !lead.need || !lead.message) {
    formStatus.textContent = "請先填完所有欄位。";
    return;
  }

  const leads = JSON.parse(localStorage.getItem("bluestar-leads") || "[]");
  leads.unshift(lead);
  localStorage.setItem("bluestar-leads", JSON.stringify(leads.slice(0, 20)));
  formStatus.textContent = `已收到 ${lead.name} 的需求，藍星科技會依照「${lead.need}」回覆建議。`;
  leadForm.reset();
});

const subscribeForm = document.querySelector("#subscribe-form");

subscribeForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(subscribeForm).get("email");
  localStorage.setItem("bluestar-newsletter", String(email || ""));
  subscribeForm.reset();
});

showSlide(0);
restartSlider();
refreshIcons();

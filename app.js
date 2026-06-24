const serviceData = {
  creator: {
    kicker: "創作者與品牌主",
    title: "AI 網紅內容系統",
    description: "建立短影音腳本、數字人、海報、社群貼文與發佈節奏，讓內容產能變得穩定。",
    points: ["短影音腳本與鏡頭規劃", "AI 圖像、海報與素材規格", "社群內容排程與轉換路徑"],
  },
  business: {
    kicker: "企業與門市團隊",
    title: "AI 流程自動化",
    description: "把常見諮詢、資料整理、表單回覆與客戶通知變成可追蹤的標準流程。",
    points: ["客戶需求表單與自動回覆", "內部任務檢查表與資料整理", "銷售、客服與行政流程優化"],
  },
  course: {
    kicker: "講師與培訓單位",
    title: "AI 課程與陪跑",
    description: "用真實工作任務設計課程，讓學員在課後能直接完成自己的內容或流程。",
    points: ["企業內訓與主題工作坊", "課後作業模板與學員追蹤", "講師教材、簡報與活動頁製作"],
  },
};

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const tabs = document.querySelectorAll(".service-tab");
const serviceKicker = document.querySelector("#service-kicker");
const serviceTitle = document.querySelector("#service-title");
const serviceDescription = document.querySelector("#service-description");
const servicePoints = document.querySelector("#service-points");

function renderService(key) {
  const service = serviceData[key];
  if (!service || !serviceKicker || !serviceTitle || !serviceDescription || !servicePoints) return;

  serviceKicker.textContent = service.kicker;
  serviceTitle.textContent = service.title;
  serviceDescription.textContent = service.description;
  servicePoints.innerHTML = service.points
    .map((point) => `<li><i data-lucide="check"></i><span>${point}</span></li>`)
    .join("");
  window.lucide?.createIcons();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    renderService(tab.dataset.service);
  });
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

window.lucide?.createIcons();

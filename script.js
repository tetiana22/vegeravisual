/* ================== MOBILE DRAWER ================== */
const burger = document.querySelector(".burger");
const mobileMenu = document.getElementById("mobile-menu");
const backdrop = document.querySelector(".backdrop");

function openMobile() {
  if (!burger || !mobileMenu || !backdrop) return;
  mobileMenu.hidden = false;
  backdrop.hidden = false;
  requestAnimationFrame(() => mobileMenu.classList.add("open"));
  burger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeMobile() {
  if (!burger || !mobileMenu || !backdrop) return;
  mobileMenu.classList.remove("open");
  burger.setAttribute("aria-expanded", "false");
  setTimeout(() => {
    mobileMenu.hidden = true;
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }, 250);
}

burger?.addEventListener("click", () => {
  mobileMenu.classList.contains("open") ? closeMobile() : openMobile();
});
backdrop?.addEventListener("click", closeMobile);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMobile();
});

/* ================== TAB NAVIGATION ================== */
const tabLinks = document.querySelectorAll(
  ".nav-link[data-cat], .m-link[data-cat]"
);
const sections = document.querySelectorAll(".cat-section");

function switchCat(cat) {
  // Активні класи для навігації
  tabLinks.forEach((x) =>
    x.classList.toggle("is-active", x.getAttribute("data-cat") === cat)
  );

  // Перемикання видимості секцій
  sections.forEach((s) => {
    if (s.getAttribute("data-cat") === cat) {
      s.classList.add("is-visible");
    } else {
      s.classList.remove("is-visible");
    }
  });

  // Плавна прокрутка до початку контенту
  document
    .querySelector("main")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

  closeMobile();
}

// Експорт у глобальну область для onclick="switchCat(...)" у HTML
window.switchCat = switchCat;

tabLinks.forEach((l) => {
  l.addEventListener("click", (e) => {
    const cat = l.getAttribute("data-cat");
    if (cat) {
      e.preventDefault();
      switchCat(cat);
    }
  });
});

/* ================== FOOTER YEAR ================== */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ================== LIGHTBOX ================== */
const lb = document.getElementById("lightbox");
const lbImg = lb?.querySelector("img");

// Використовуємо делегування подій для стабільній роботи Lightbox
document.addEventListener("click", (e) => {
  const tile = e.target.closest(".tile:not(.video-tile)");
  if (!tile) return;

  e.preventDefault();
  const img = tile.querySelector("img");
  if (!lb || !lbImg) return;

  lbImg.src = tile.getAttribute("href") || img?.src || "";
  lbImg.alt = img?.alt || "";
  lb.showModal();
});

lb?.querySelector(".close")?.addEventListener("click", () => lb.close());
lb?.addEventListener("click", (e) => {
  if (e.target === lb) lb.close();
});

/* ================== TOGGLE WEDDING STORIES ================== */
document.addEventListener("DOMContentLoaded", () => {
  const cardChloe = document.getElementById("toggle-chloe");
  const galleryChloe = document.getElementById("gallery-chloe");

  if (cardChloe && galleryChloe) {
    cardChloe.addEventListener("click", (e) => {
      e.stopPropagation();

      // Перемикання видимості галереї
      galleryChloe.classList.toggle("is-hidden");

      // Зміна тексту кнопки
      const btn = cardChloe.querySelector(".view-story-btn");
      if (btn) {
        const isHidden = galleryChloe.classList.contains("is-hidden");
        btn.textContent = isHidden ? "View Story ↓" : "Close Story ↑";
      }
    });
  }
});

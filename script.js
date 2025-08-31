/* ================== NAV: category tabs (desktop + mobile) ================== */
const tabLinks = document.querySelectorAll(
  ".nav-link[data-cat], .m-link[data-cat]"
);
const grids = document.querySelectorAll(".grid[data-cat]");

function switchCat(cat) {
  tabLinks.forEach((x) =>
    x.classList.toggle("is-active", x.getAttribute("data-cat") === cat)
  );
  grids.forEach((g) =>
    g.classList.toggle("is-visible", g.getAttribute("data-cat") === cat)
  );
  document
    .getElementById("galleries")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMobile(); // auto-close mobile menu after select
}
tabLinks.forEach((l) => {
  l.addEventListener("click", (e) => {
    const cat = l.getAttribute("data-cat");
    if (cat) {
      e.preventDefault();
      switchCat(cat);
    }
  });
});

/* ================== HEADER: burger + mobile drawer ================== */
const burger = document.querySelector(".burger");
const mobileMenu = document.getElementById("mobile-menu");
const backdrop = document.querySelector(".backdrop");

function openMobile() {
  if (!burger || !mobileMenu || !backdrop) return;
  mobileMenu.hidden = false;
  backdrop.hidden = false;
  requestAnimationFrame(() => mobileMenu.classList.add("open")); // start slide-in
  burger.classList.add("is-open");
  burger.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
  document.addEventListener("keydown", escClose);
}
function closeMobile() {
  if (!burger || !mobileMenu || !backdrop) return;
  mobileMenu.classList.remove("open");
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  document.removeEventListener("keydown", escClose);
  setTimeout(() => {
    mobileMenu.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove("no-scroll");
  }, 250); // keep in sync with CSS transition
}
function escClose(e) {
  if (e.key === "Escape") closeMobile();
}

burger?.addEventListener("click", () => {
  burger.classList.contains("is-open") ? closeMobile() : openMobile();
});
backdrop?.addEventListener("click", closeMobile);

// safety: click anywhere outside the drawer also closes it (in case backdrop is covered)
document.addEventListener("click", (e) => {
  if (mobileMenu?.hidden) return;
  const insideMenu = mobileMenu.contains(e.target);
  const onBurger = burger?.contains(e.target);
  if (!insideMenu && !onBurger) closeMobile();
});

// auto-close when switching to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMobile();
});

/* ================== FOOTER YEAR ================== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ================== LIGHTBOX (native <dialog>) ================== */
const lb = document.getElementById("lightbox");
const lbImg = lb?.querySelector("img");

document.querySelectorAll(".tile").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const img = a.querySelector("img");
    if (!lb || !lbImg) return;
    lbImg.src = a.getAttribute("href") || img?.src || "";
    lbImg.alt = img?.alt || "";
    lb.showModal();
  });
});

// close by X button
lb?.querySelector(".close")?.addEventListener("click", () => lb.close());

// close by clicking backdrop/empty area inside dialog
lb?.addEventListener("click", (e) => {
  if (e.target === lb) {
    lb.close();
    return;
  }
  const r = lb.getBoundingClientRect();
  const outside =
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom;
  if (outside) lb.close();
});

/* ================== CONTACT FORM -> mailto ================== */
const form = document.getElementById("contact-form");
const status = document.querySelector(".status");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  if (!fd.get("name") || !fd.get("email")) {
    status.textContent = "Please fill required fields.";
    return;
  }
  const subject = encodeURIComponent(fd.get("subject") || "Photo enquiry");
  const body = encodeURIComponent(
    `Name: ${fd.get("name")}
Email: ${fd.get("email")}
Subject: ${fd.get("subject") || ""}

Message:
${fd.get("message") || ""}? (From Vegera Visual website)`
  );
  window.location.href = `mailto:tetiana80@yahoo.com?subject=${subject}&body=${body}`;
  status.textContent =
    "Opening email app… If nothing happens, email me directly.";
});

/* ================== OPTIONAL: reveal on scroll ================== */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document
  .querySelectorAll(".tile, .contact, .about, .hero")
  .forEach((el) => io.observe(el));

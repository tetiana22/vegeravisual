/* --------- CATEGORY TABS (desktop + mobile) --------- */
const links = document.querySelectorAll(
  ".nav-link[data-cat], .m-link[data-cat]"
);
const grids = document.querySelectorAll(".grid[data-cat]");

function switchCat(cat) {
  links.forEach((x) => {
    const same = x.getAttribute("data-cat") === cat;
    x.classList.toggle("is-active", same);
  });
  grids.forEach((g) =>
    g.classList.toggle("is-visible", g.getAttribute("data-cat") === cat)
  );
  document
    .getElementById("galleries")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMobileMenu(); // auto-close on select
}

links.forEach((l) => {
  l.addEventListener("click", () => {
    const cat = l.getAttribute("data-cat");
    if (cat) switchCat(cat);
  });
});

/* --------- FOOTER YEAR --------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* --------- LIGHTBOX --------- */
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
lb?.querySelector(".close")?.addEventListener("click", () => lb.close());

/* --------- CONTACT FORM -> mailto --------- */
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
${fd.get("message") || ""}

(From Vegera Visual website)`
  );
  // ✅ закрили шаблонний рядок
  window.location.href = `mailto:tetiana80@yahoo.com?subject=${subject}&body=${body}`;
  status.textContent =
    "Opening email app… If nothing happens, email me directly.";
});

/* --------- Optional: Scroll-reveal --------- */
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

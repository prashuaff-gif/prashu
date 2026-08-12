// Typed text effect
const roles = ["Network Engineer", "Infrastructure Specialist", "Cloud & Linux Administrator", "Cybersecurity Enthusiast"];
let roleIndex = 0, charIndex = 0, typing = true;
const typedEl = document.getElementById("typed");

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (typing) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) { typing = false; setTimeout(typeLoop, 1500); return; }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) { typing = true; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeLoop, typing ? 90 : 45);
}
typeLoop();

// Cursor glow
const glow = document.getElementById("glow");
document.addEventListener("mousemove", (e) => {
  if (glow) glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
});

// Mobile nav toggle
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Smooth scroll + active link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});

const sections = document.querySelectorAll("section, header");
const navItems = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) current = sec.getAttribute("id");
  });
  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === "#" + current) item.classList.add("active");
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Animate skill bars
const bars = document.querySelectorAll(".bar-fill");
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute("data-width") + "%";
    }
  });
}, { threshold: 0.4 });
bars.forEach(bar => barObserver.observe(bar));

// Animate stat counters
const counters = document.querySelectorAll(".stat-card h3");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute("data-count");
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const update = () => {
        count += step;
        if (count >= target) { entry.target.textContent = target; }
        else { entry.target.textContent = count; requestAnimationFrame(update); }
      };
      update();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// Contact form (demo only)
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been noted. I will get back to you soon.");
    form.reset();
  });
}

// Back to top
const backTop = document.getElementById("backTop");
if (backTop) {
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Import via CDN
import gsap from "https://esm.sh/gsap@3.13.0";
import { ScrollTrigger } from "https://esm.sh/gsap@3.13.0/ScrollTrigger";
import Lenis from "https://esm.sh/lenis@1.3.14";

// --- Initialisation Lenis (smooth scroll optionnel) ---
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- Données des cartes ---


const items = [
  {
    label: "About",
    bgColor: "#241910",
    textColor: "#fff",
    links: [
      { label: "Company", ariaLabel: "About Company" },
      { label: "Careers", ariaLabel: "About Careers" }
    ]
  },
  {
    label: "Projects",
    bgColor: "#472e19ff",
    textColor: "#fff",
    links: [
      { label: "Featured", ariaLabel: "Featured Projects" },
      { label: "Case Studies", ariaLabel: "Project Case Studies" }
    ]
  },
  {
    label: "Contact",
    bgColor: "#693f1cff",
    textColor: "#fff",
    links: [
      { label: "Email", ariaLabel: "Email us" },
      { label: "Twitter", ariaLabel: "Twitter" },
      { label: "LinkedIn", ariaLabel: "LinkedIn" }
    ]
  }
];

// --- Sélection des éléments ---
const nav = document.querySelector(".card-nav");
const content = document.querySelector(".card-nav-content");
const hamburger = document.querySelector(".hamburger-menu");
const ctaButton = document.querySelector(".card-nav-cta-button");

let isExpanded = false;
let tl;

// --- Création dynamique des cartes ---
function createCards() {
  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("nav-card");
    card.style.backgroundColor = item.bgColor;
    card.style.color = item.textColor;

    const label = document.createElement("div");
    label.classList.add("nav-card-label");
    label.textContent = item.label;

    const linksContainer = document.createElement("div");
    linksContainer.classList.add("nav-card-links");

    item.links.forEach((lnk) => {
      const a = document.createElement("a");
      a.classList.add("nav-card-link");
      a.href = "#";
      a.setAttribute("aria-label", lnk.ariaLabel);
      a.textContent = lnk.label;
      linksContainer.appendChild(a);
    });

    card.appendChild(label);
    card.appendChild(linksContainer);
    content.appendChild(card);
  });
}

// --- Fonction pour calculer la hauteur totale ---
function calculateHeight() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    const topBar = 60;
    const padding = 16;
    const contentHeight = content.scrollHeight;
    return topBar + contentHeight + padding;
  }
  return 260;
}

// --- Timeline GSAP pour ouverture/fermeture ---
function createTimeline() {
  gsap.set(nav, { height: 60, overflow: "hidden" });
  gsap.set(".nav-card", { y: 50, opacity: 0 });

  const tl = gsap.timeline({ paused: true, ease: "power3.out" });
  tl.to(nav, {
    height: calculateHeight,
    duration: 0.4
  });
  tl.to(".nav-card", {
    y: 0,
    opacity: 1,
    duration: 0.4,
    stagger: 0.08
  }, "-=0.1");

  return tl;
}

// --- Toggle menu ---
function toggleMenu() {
  if (!tl) return;
  if (!isExpanded) {
    hamburger.classList.add("open");
    nav.classList.add("open");
    isExpanded = true;
    tl.play(0);
  } else {
    hamburger.classList.remove("open");
    tl.reverse();
    tl.eventCallback("onReverseComplete", () => {
      isExpanded = false;
      nav.classList.remove("open");
    });
  }
}

// --- Init ---
createCards();
tl = createTimeline();
hamburger.addEventListener("click", toggleMenu);

// --- Resize responsive ---
window.addEventListener("resize", () => {
  if (!tl) return;
  if (isExpanded) {
    gsap.set(nav, { height: calculateHeight() });
  }
});

import gsap from "https://esm.sh/gsap@3.13.0";

const track = document.querySelector(".logoloop__track");
const sequence = track.querySelector(".logoloop__list"); // ta première liste de logos

// Dupliquer la séquence pour boucle fluide
const clone = sequence.cloneNode(true);
track.appendChild(clone);

// Largeur d’une séquence
const listWidth = sequence.offsetWidth;

// Animation GSAP pour scroll infini
const loop = gsap.to(track, {
  x: -listWidth,
  duration: 30, // ajuste la vitesse ici
  ease: "none",
  repeat: -1,
});

// Pause/reprise au survol
track.addEventListener("mouseenter", () => gsap.to(loop, { timeScale: 0, duration: 0.3 }));
track.addEventListener("mouseleave", () => gsap.to(loop, { timeScale: 1, duration: 0.3 }));

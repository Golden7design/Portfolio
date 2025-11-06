import gsap from "https://esm.sh/gsap@3.13.0";
import { ScrollTrigger } from "https://esm.sh/gsap@3.13.0/ScrollTrigger";
import Lenis from "https://esm.sh/lenis@1.3.14";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.1, // plus bas = plus fluide
  });

  // --- Header shift helper: detect .card-nav-content and toggle body.nav-open ---
  // This helps browsers that don't support :has() and ensures the header shifts exactly
  // by the height of the card when it appears.
  function _setupHeaderShiftObserver() {
    const updateHeaderShift = () => {
      const card = document.querySelector('.card-nav-content');
      if (card) {
        const rect = card.getBoundingClientRect();
        const h = Math.round(rect.height);
        document.documentElement.style.setProperty('--header-shift', `${h}px`);
        document.body.classList.add('nav-open');
      } else {
        document.documentElement.style.removeProperty('--header-shift');
        document.body.classList.remove('nav-open');
      }
    };

    // Watch for additions/removals in the body
    const mo = new MutationObserver(() => {
      updateHeaderShift();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Also update on load and on resize
    window.addEventListener('load', updateHeaderShift);
    window.addEventListener('resize', updateHeaderShift);

    // If a card appears, watch its size changes to update the shift dynamically
    const resizeObserver = new ResizeObserver(() => updateHeaderShift());
    const watchForCard = () => {
      const card = document.querySelector('.card-nav-content');
      if (card) resizeObserver.observe(card);
      else resizeObserver.disconnect();
    };

    // Keep an interval to attach Resiz
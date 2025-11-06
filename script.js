import gsap from "https://esm.sh/gsap@3.13.0";
import { ScrollTrigger } from "https://esm.sh/gsap@3.13.0/ScrollTrigger";
import Lenis from "https://esm.sh/lenis@1.3.14";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.1, // plus bas = plus fluide
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  const frameCount = 200;
  const currentFrame = (i) => `./public/frames/frame_${(i + 1).toString().padStart(6, "0")}.jpg`;
  const images = [];
  const videoFrames = { frame: 0 };

  const setCanvasSize = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    context.scale(ratio, ratio);
  };
  setCanvasSize();

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }

  let currentFrameIndex = -1;
  const render = () => {
    const img = images[videoFrames.frame];
    if (!img || !img.complete || videoFrames.frame === currentFrameIndex) return;
    currentFrameIndex = videoFrames.frame;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "+=4000",
    scrub: 0.5,
    pin: true,
    onUpdate: (self) => {
      videoFrames.frame = Math.floor(self.progress * (frameCount - 1));
      render();
    },
  });
});

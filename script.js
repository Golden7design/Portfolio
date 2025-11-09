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
  const headerTitle = document.querySelector(".header h1");
  const headerParagraphs = document.querySelectorAll(".header p");

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
    // sample center area of the canvas and apply average color to header h1
    try {
      if (headerTitle) {
        const sampleSize = 5; // device pixels
        const sx = Math.max(0, Math.floor(canvas.width / 2) - Math.floor(sampleSize / 2));
        const sy = Math.max(0, Math.floor(canvas.height / 2) - Math.floor(sampleSize / 2));
        const w = Math.min(sampleSize, canvas.width - sx);
        const h = Math.min(sampleSize, canvas.height - sy);
        const data = context.getImageData(sx, sy, w, h).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          // invert the sampled color for the header
          const ir = 255 - r;
          const ig = 255 - g;
          const ib = 255 - b;
          const inverted = `rgb(${ir}, ${ig}, ${ib})`;
          if (headerTitle) headerTitle.style.color = inverted;
          if (headerParagraphs && headerParagraphs.length) {
            headerParagraphs.forEach(p => p.style.color = inverted);
          }
        }
      }
    } catch (err) {
      // Ignore if canvas is tainted (cross-origin) or any other error
    }
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

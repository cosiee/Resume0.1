// animations.js
import { gsap } from "gsap";




export function animateMeAndWiggles(meElement) {
  gsap.to(meElement, {
    duration: 1,
    y: 50,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
}

export function applyTransform(target, transformValue) {
  target.style.transform = `translateY(${transformValue}px)`;
}

export function updateTextElementPositions(target, scrollPosition) {
  const transformValue = scrollPosition * 0.5;
  applyTransform(target, transformValue);
}

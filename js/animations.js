// animations.js
import { gsap } from "gsap";

export function mountainSkyAnimation() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".scrollDist",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })
    .fromTo("#sky", { scale: 1, y: -80 }, { scale: 1.3, y: -650 }, 0)
    .fromTo("#mountBg", { scale: 1, y: 70 }, { scale: 1.3, y: -600 }, 0)
    .fromTo("#cloud1", { x: 200, y: 310 }, { x: -300, y: -600 }, 0);
}

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

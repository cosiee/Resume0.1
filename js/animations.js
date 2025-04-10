// animation.js
import { CloudManager } from './cloudManager.js';

export class Animations {
    constructor(domElements) {
        this.domElements = domElements;
    }

    mountainSkyAni() {
        try {
            if (!this.domElements?.scrollDist) {
                console.warn('scrollDist element not found');
                return;
            }

            // 1. FIRST reset all cloud positions (clear any existing transforms)
            const clouds = ["#cloud1", "#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud1M"];
            gsap.set(clouds, { clearProps: "x, y, scale" }); // Reset ONLY position/scale props

            // 2. Set EXACT starting positions (must match fromTo() start values)
            gsap.set("#cloud1, #cloud1M", { x: 150, y: 726, scale: 1.3 });
            gsap.set("#cloud2", { x: 400, y: 310, scale: 1 });
            gsap.set("#cloud3", { x: -200, y: 320, scale: 1 });
            gsap.set("#cloud4", { x: 300, y: 400, scale: 1 });
            gsap.set("#cloud5", { x: -100, y: 580, scale: 1.5 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: this.domElements.scrollDist,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

            // Mountain animations (unchanged)
            tl.fromTo("#sky", { scale: 1, x: 0, y: -80 }, { scale: 1.3, x: -150, y: -650 }, 0)
                .fromTo("#mountBg", { scale: 1, x: 0, y: 70 }, { scale: 1.3, x: -150, y: -600 }, 0)
                .fromTo("#mountBg2", { scale: 1, x: 0, y: 110 }, { scale: 1.3, x: -150, y: -670 }, 0)
                .fromTo("#mountMg", { scale: 1, x: 0, y: 345 }, { scale: 1.3, x: -150, y: -700 }, 0)
                .fromTo("#mountMgF", { scale: 1, x: 0, y: 200 }, { scale: 1.3, x: -150, y: -750 }, 0)
                .fromTo("#mountFg", { scale: 1, x: 0, y: 220 }, { scale: 1.3, x: -150, y: -850 }, 0);

            // 3. Cloud animations - REMOVED fromTo() and use to() instead
            // Since we already set the start positions, we only need to define where they're going
            tl.to("#cloud2", { x: -200, y: -500 }, 0)
                .to("#cloud3", { x: 500, y: -900 }, 0)
                .to("#cloud4", { x: -400, y: -750 }, 0)
                .to("#cloud5", { scale: 3, x: 300, y: -800 }, 0)
                .to("#cloud1, #cloud1M", { scale: 2.4, x: -420, y: -490 }, 0);

        } catch (error) {
            console.error("Animation failed:", error);
        }
    }
}
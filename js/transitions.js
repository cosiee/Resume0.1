// transitions.js
export class PageTransitions {
    constructor() {
        this.duration = 1.2;
    }

    async out() {
        const tl = gsap.timeline();
        tl.to("#transition-overlay", {
            opacity: 1,
            duration: this.duration * 0.6,
            ease: "power2.in"
        });
        return tl;
    }

    async in() {
        const tl = gsap.timeline();
        tl.to("#transition-overlay", {
            opacity: 0,
            duration: this.duration * 0.6,
            ease: "power2.out",
            delay: 0.4 // Slight delay for smoother re-entry
        });
        return tl;
    }
}
// Cloud Transition Manager
const CloudTransition = {
    init() {
        this.transitionTimeline = gsap.timeline({ paused: true })
            .to(".cloud-transition", {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power2.inOut",
                stagger: {
                    each: 0.3,
                    from: "edges"
                }
            })
            .to(".cloud-center", {
                scale: 30,
                opacity: 1,
                duration: 1,
                ease: "power2.in"
            }, "-=1")
            .to("body", {
                backgroundColor: "#fff",
                duration: 0.5
            }, "-=0.5");

        this.reverseTimeline = gsap.timeline({ paused: true })
            .to("body", {
                backgroundColor: "transparent",
                duration: 0.3
            })
            .to(".cloud-transition", {
                opacity: 0,
                scale: 0.5,
                duration: 1.2,
                ease: "power2.out",
                stagger: {
                    each: 0.2,
                    from: "center"
                }
            }, "-=0.2");
    },

    async triggerTransition() {
        return new Promise((resolve) => {
            this.transitionTimeline.restart();
            this.transitionTimeline.eventCallback("onComplete", resolve);
        });
    },

    async triggerReverse() {
        return new Promise((resolve) => {
            this.reverseTimeline.restart();
            this.reverseTimeline.eventCallback("onComplete", resolve);
        });
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    CloudTransition.init();

    // Example usage:
    document.querySelectorAll('[data-transition-nav]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            await CloudTransition.triggerTransition();

            // Simulate page load (replace with actual fetch/load)
            await new Promise(r => setTimeout(r, 1000));

            await CloudTransition.triggerReverse();
            window.location.href = e.target.href;
        });
    });
});
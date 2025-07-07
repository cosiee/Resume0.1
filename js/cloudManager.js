// cloudManager.js

export class CloudManager {
    static isTransitioning = false;
    static originalStates = {};
    static animationInProgress = false;

    static prepareForTransition() {
        if (this.animationInProgress) return;
        this.animationInProgress = true;
        this.isTransitioning = true;

        // Store original cloud positions and styles
        document.querySelectorAll('#cloud1, #cloud2, #cloud3, #cloud4, #cloud5, #cloud1M').forEach(cloud => {
            this.originalStates[cloud.id] = {
                opacity: cloud.style.opacity || '1',
                transform: cloud.style.transform || '',
                visibility: cloud.style.visibility || 'visible'
            };
        });
    }

    static async restoreAfterTransition() {
        if (!this.isTransitioning || !this.animationInProgress) return;

        const clouds = ["#cloud1", "#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud1M"];

        // First make sure clouds are visible
        gsap.set(clouds, { opacity: 1, visibility: 'visible' });

        // Then restore original states
        await gsap.to(clouds, {
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                this.isTransitioning = false;
                this.animationInProgress = false;
            }
        });

        // Restore individual properties
        Object.entries(this.originalStates).forEach(([id, props]) => {
            const cloud = document.getElementById(id);
            if (cloud) {
                cloud.style.opacity = props.opacity;
                cloud.style.transform = props.transform;
                cloud.style.visibility = props.visibility;
            }
        });
    }

    static reset() {
        this.isTransitioning = false;
        this.animationInProgress = false;
        this.originalStates = {};
    }
}
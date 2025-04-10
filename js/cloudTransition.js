import { CloudManager } from './cloudManager.js';

export class CloudTransition {
    static async triggerTransition(targetPage) {
        if (CloudManager.animationInProgress) return;

        CloudManager.prepareForTransition();

        // Animate clouds to center screen
        await gsap.to(["#cloud1", "#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud1M"], {
            opacity: 1,
            scale: 3,
            x: 0,
            y: 0,
            duration: 1.5,
            ease: "power2.inOut",
            overwrite: true
        });

        // Navigate after animation completes
        if (targetPage) {
            window.location.href = targetPage;
        }
    }

    static async triggerReverse() {
        if (CloudManager.animationInProgress) return;

        // First make clouds visible if they're hidden
        gsap.set(["#cloud1", "#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud1M"], {
            opacity: 0,
            visibility: 'visible'
        });

        // Then fade in quickly
        await gsap.to(["#cloud1", "#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud1M"], {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        // Finally restore original states
        await CloudManager.restoreAfterTransition();
    }

    static async resetClouds() {
        await CloudManager.restoreAfterTransition();
        CloudManager.reset();
    }
}
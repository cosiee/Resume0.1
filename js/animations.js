// animations.js
// import { gsap } from 'gsap';
import { CloudManager } from './cloudManager.js';

export class Animations {
    constructor(domElements) {
        this.domElements = domElements;
        this.transitionDuration = 3;
        this.cloudElements = ["#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud6"];
        this.activeTransition = null; // Track active transition
    }

    // async cloudTransitionOut(destination) {
    //     return new Promise((resolve) => {
    //         // 1. First hide all clouds and prepare for transition
    //         gsap.set(this.cloudElements, {
    //             display: 'block',
    //             opacity: 1,
    //             zIndex: 10000,
    //             position: 'fixed',
    //             willChange: 'transform, opacity'
    //         });

    //         // 2. Set specific starting positions
    //         // Cloud2 starts at bottom-right (custom position)
    //         gsap.set("#cloud2", {
    //             x: window.innerWidth * 0.8,  // 80% from left (right side)
    //             y: window.innerHeight * 0.9, // 90% from top (bottom)
    //             scale: 0.5,                  // Start smaller
    //             rotation: 15                 // Slight initial rotation
    //         });

    //         // Other clouds start from their mountainSkyAni end positions
    //         gsap.set("#cloud3", { x: 500, y: -900 });
    //         gsap.set("#cloud4", { x: -400, y: -750 });
    //         gsap.set("#cloud5", { scale: 3, x: 300, y: -800 });
    //         gsap.set("#cloud6", { x: -300, y: 970, scale: 1 });
    //         // 3. Create timeline
    //         this.activeTimeline = gsap.timeline({
    //             onComplete: () => {
    //                 resolve(true);
    //                 window.location.href = destination;
    //             }
    //         });

    //         // 4. Custom cloud2 animation (bottom-right to final position)
    //         this.activeTimeline.to("#cloud2", {
    //             x: -200,
    //             y: 910,
    //             scale: 2.8,
    //             opacity: 1,
    //             rotation: 0,                  // Remove rotation
    //             duration: 2.2,                // Slightly longer duration
    //             ease: "power4.out"            // Stronger easing for dramatic entry
    //         }, 0);

    //         // Other clouds animate normally
    //         this.activeTimeline.to("#cloud3", {
    //             x: 500,
    //             y: 1900,
    //             opacity: 1,
    //             duration: 1.8,
    //             ease: "power2.inOut"
    //         }, 0.2)
    //             .to("#cloud4", {
    //                 x: -400,
    //                 y: 900,
    //                 opacity: 1,
    //                 duration: 1.6,
    //                 ease: "power2.inOut"
    //             }, 0.3)
    //             .to("#cloud5", {
    //                 x: -400,
    //                 y: 900,
    //                 opacity: 1,
    //                 duration: 2,
    //                 ease: "power2.inOut"
    //             }, 0.1)
    //             .to("#cloud6", {
    //                 x: -400,
    //                 y: 500,
    //                 opacity: 1,
    //                 duration: 2,
    //                 ease: "power2.inOut"
    //             }, 0.1);

    //         gsap.set("#cloud2", {
    //             boxShadow: "0 0 10px cyan",
    //             border: "1px dashed white"
    //         });
    //         // Debug visualization (remove in production)
    //         this.activeTimeline.call(() => {
    //             console.log("Cloud2 current position:",
    //                 gsap.getProperty("#cloud2", "x"),
    //                 gsap.getProperty("#cloud2", "y"));
    //         }, null, 0.5);
    //     });

    // }

    // async cloudTransitionOut(destination) {
    //     try {
    //         console.log("--- STARTING cloudTransitionOut ---");

    //         // 1. Execution guard to prevent duplicate runs
    //         if (this._transitionIsRunning) {
    //             console.warn("Transition already in progress - aborting");
    //             return;
    //         }
    //         this._transitionIsRunning = true;

    //         // 2. Clean up any existing timeline
    //         if (this.activeTimeline) {
    //             this.activeTimeline.kill();
    //             window._debugTimeline = this.activeTimeline = null;
    //         }

    //         // 3. Create debug element if needed
    //         if (!document.querySelector("#debugElement")) {
    //             const debugEl = document.createElement("div");
    //             debugEl.id = "debugElement";
    //             debugEl.style.position = "absolute";
    //             debugEl.style.opacity = "0";
    //             document.body.appendChild(debugEl);
    //         }

    //         // 4. Reset all elements
    //         const clouds = ["#cloud1", "#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud6"];
    //         const maskElements = ["#cloud1 image"];

    //         gsap.set([...clouds], {
    //             attr: {
    //                 x: (i, target) => target.getAttribute("x") || 0,
    //                 y: (i, target) => target.getAttribute("y") || 0
    //             },
    //             zIndex: 9999,
    //             display: "block",
    //             opacity: 1
    //         });

    //         gsap.set(maskElements, {
    //             x: 0,
    //             y: 0,
    //             zIndex: 9999,
    //             display: "block",
    //             opacity: 1
    //         });

    //         // 5. Set starting positions
    //         const startPositions = {
    //             "#cloud1 image": { x: window.innerWidth, y: window.innerHeight * 0.9, scale: 0.5, rotation: 15 },
    //             "#cloud1": { attr: { x: window.innerWidth, y: window.innerHeight * 0.9 }, scale: 0.5, rotation: 15 },
    //             "#cloud2": { attr: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 }, scale: 0.5, rotation: 15 },
    //             "#cloud3": { attr: { x: 500, y: -900 } },
    //             "#cloud4": { attr: { x: -400, y: -750 } },
    //             "#cloud5": { attr: { x: 300, y: -800 }, scale: 3 },
    //             "#cloud6": { attr: { x: 0, y: 770 }, scale: 1 }
    //         };

    //         Object.entries(startPositions).forEach(([selector, props]) => {
    //             gsap.set(selector, props);
    //         });

    //         // 6. Create main timeline with robust callbacks
    //         this.activeTimeline = gsap.timeline({
    //             paused: true,
    //             onStart: () => {
    //                 console.log("TIMELINE STARTED", performance.now());
    //             },
    //             onUpdate: () => {
    //                 console.log("Timeline progress:", this.activeTimeline.progress());
    //             },
    //             onComplete: () => {
    //                 console.log("TIMELINE COMPLETED", performance.now());
    //                 this._transitionIsRunning = false;
    //                 setTimeout(() => {
    //                     window.location.href = destination;
    //                 }, 50);
    //             }
    //         });

    //         // Store for debugging
    //         window._debugTimeline = this.activeTimeline;

    //         // 7. Add animations
    //         // Mask element animation (transform-based)
    //         this.activeTimeline.to("#cloud1 image", {
    //             x: -200,
    //             y: 910,
    //             scale: 2.8,
    //             rotation: 0,
    //             duration: 2.2,
    //             ease: "power4.out",
    //             onStart: () => console.log("Mask animation started"),
    //             onComplete: () => console.log("Mask animation finished")
    //         }, "start");

    //         // Cloud animations (attribute-based)
    //         this.activeTimeline.to("#cloud1", {
    //             attr: { x: -200, y: 910 },
    //             scale: 2.8,
    //             rotation: 0,
    //             duration: 2.2,
    //             ease: "power4.out"
    //         }, "start");

    //         this.activeTimeline.to("#cloud2", {
    //             attr: { x: -200, y: 910 },
    //             scale: 2.8,
    //             rotation: 0,
    //             duration: 2.2,
    //             ease: "power4.out"
    //         }, "start");

    //         this.activeTimeline.to("#cloud3", {
    //             attr: { x: -200, y: 910 },
    //             scale: 2.8,
    //             rotation: 0,
    //             duration: 2.2,
    //             ease: "power4.out"
    //         }, "start");

    //         this.activeTimeline.to("#cloud4", {
    //             attr: { x: 500, y: 1900 },
    //             duration: 1.8,
    //             ease: "power2.inOut"
    //         }, "start");

    //         this.activeTimeline.to("#cloud5", {
    //             attr: { x: -200, y: 910 },
    //             scale: 2.8,
    //             rotation: 0,
    //             duration: 2.2,
    //             ease: "power4.out"
    //         }, "start");

    //         this.activeTimeline.to("#cloud6", {
    //             attr: { x: 0, y: 650 },
    //             duration: 1.8,
    //             scale: 3,
    //             ease: "power2.inOut"
    //         }, "start");

    //         // Debug element animation
    //         this.activeTimeline.to("#debugElement", {
    //             opacity: 1,
    //             duration: 0.1,
    //             onComplete: () => console.log("Debug element visible")
    //         }, "start");

    //         console.log("Timeline duration:", this.activeTimeline.duration());
    //         this.activeTimeline.play();

    //     } catch (error) {
    //         console.error("Transition failed:", error);
    //         this._transitionIsRunning = false;
    //     }
    // }

    async cloudTransitionOut(destination) {
        // 1. Early exit if already running
        if (window._transitionActive) return;
        window._transitionActive = true;

        try {
            console.log("--- STARTING cloudTransitionOut ---");

            // 2. Batch DOM reads first
            const elements = {
                mask: document.querySelector("#cloud1 image"),
                cloud1: document.querySelector("#cloud1"),
                cloud2: document.querySelector("#cloud2"),
                cloud3: document.querySelector("#cloud3"),
                cloud4: document.querySelector("#cloud4"),
                cloud5: document.querySelector("#cloud5"),
                cloud6: document.querySelector("#cloud6"),
                debug: document.querySelector("#debugElement")
            };

            // 3. Create debug element if missing (without triggering reflow)
            if (!elements.debug) {
                elements.debug = document.createElement("div");
                elements.debug.id = "debugElement";
                elements.debug.style.cssText = "position:absolute;opacity:0;pointer-events:none;";
                document.body.appendChild(elements.debug);
            }

            // 4. Kill any existing animations
            if (this.activeTimeline?.isActive()) {
                this.activeTimeline.kill();
            }
            gsap.globalTimeline.clear();

            // 5. Set initial states (batch writes)
            gsap.set([elements.mask, ...Object.values(elements).filter(Boolean)], {
                display: "block",
                opacity: 1,
                zIndex: 10000,
                overwrite: "auto"
            });

            // 6. Create timeline with performance optimizations
            this.activeTimeline = gsap.timeline({
                paused: true,
                onStart: () => {
                    console.log("TIMELINE STARTED", performance.now());
                    document.body.style.pointerEvents = "none";
                },
                onComplete: () => {
                    console.log("TIMELINE COMPLETED");
                    window._transitionActive = false;
                    document.body.style.pointerEvents = "";
                    setTimeout(() => window.location.href = destination, 50);
                }
            });

            // 7. Add animations with will-change hints
            this.activeTimeline
                // Mask element
                .set(elements.mask, { willChange: "transform" })
                .fromTo(elements.mask,
                    { x: window.innerWidth, y: window.innerHeight * 0.9, scale: 0.5, rotation: 15 },
                    { x: -200, y: 910, scale: 2.8, rotation: 0, duration: 2.2, ease: "power4.out" },
                    "start")

                // Cloud 1
                .set(elements.cloud1, { willChange: "transform" })
                .to(elements.cloud1, {
                    attr: { x: -200, y: 910 },
                    scale: 2.8,
                    rotation: 0,
                    duration: 2.2,
                    ease: "power4.out"
                }, "start")

                // Cloud 2
                .set(elements.cloud2, { willChange: "transform" })
                .to(elements.cloud2, {
                    attr: { x: -200, y: 910 },
                    scale: 2.8,
                    rotation: 0,
                    duration: 2.2,
                    ease: "power4.out"
                }, "start")

                // Cloud 3
                .set(elements.cloud3, { willChange: "transform" })
                .to(elements.cloud3, {
                    attr: { x: -200, y: 910 },
                    scale: 2.8,
                    rotation: 0,
                    duration: 2.2,
                    ease: "power4.out"
                }, "start")

                // Cloud 4 (special path)
                .set(elements.cloud4, { willChange: "transform" })
                .to(elements.cloud4, {
                    attr: { x: 500, y: 1900 },
                    duration: 1.8,
                    ease: "power2.inOut"
                }, "start")

                // Cloud 5
                .set(elements.cloud5, { willChange: "transform" })
                .to(elements.cloud5, {
                    attr: { x: -200, y: 910 },
                    scale: 2.8,
                    rotation: 0,
                    duration: 2.2,
                    ease: "power4.out"
                }, "start")

                // Cloud 6 (special path)
                .set(elements.cloud6, { willChange: "transform" })
                .to(elements.cloud6, {
                    attr: { x: 0, y: 650 },
                    duration: 1.8,
                    scale: 3,
                    ease: "power2.inOut"
                }, "start")

                // Debug element
                .to(elements.debug, {
                    opacity: 1,
                    duration: 0.1
                }, "start");

            console.log("Timeline duration:", this.activeTimeline.duration());
            this.activeTimeline.play();

        } catch (error) {
            console.error("Transition failed:", error);
            window._transitionActive = false;
            document.body.style.pointerEvents = "";
            gsap.globalTimeline.clear();
        }
    }

    async cloudTransitionIn() {
        if (this.activeTransition) {
            this.activeTransition.kill();
        }

        return new Promise((resolve) => {
            console.log('Transition IN started');
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(this.cloudElements, {
                        zIndex: 'auto',
                        position: 'absolute',
                        willChange: ''
                    });
                    document.documentElement.style.pointerEvents = '';
                    console.log('Transition IN complete');
                    resolve();
                }
            });

            this.activeTransition = tl;

            tl.fromTo(this.cloudElements,
                { scale: 3, x: 0, y: 0, opacity: 1 },
                {
                    scale: 1,
                    x: (i) => [-420, -200, 500, -400, 300][i],
                    y: (i) => [-490, -500, -900, -750, -800][i],
                    opacity: 1,
                    duration: this.transitionDuration,
                    ease: "power2.inOut"
                }
            );
        });
    }

    async mountainSkyAni() {
        try {
            // Clear any existing ScrollTriggers
            ScrollTrigger.getAll().forEach(st => st.kill());

            if (!this.domElements?.scrollDist) {
                console.warn('scrollDist element not found');
                return;
            }

            // Reset all elements with proper attribute fallbacks
            const clouds = ["#cloud1", "#cloud2", "#cloud3", "#cloud4", "#cloud5", "#cloud6"];
            const maskElements = ["#cloud1 image"]; // Target the image inside the mask
            const mountains = ["#sky", "#mountBg", "#mountBg2", "#mountMg", "#mountMgF", "#mountFg"];

            gsap.set([...clouds, ...mountains], {
                attr: {
                    x: (i, target) => target.getAttribute("x") || 0,
                    y: (i, target) => target.getAttribute("y") || 0
                },
                scale: 1
            });
            gsap.set(maskElements, {
                x: 0,
                y: 0
            });


            // Set exact starting positions
            gsap.set("#cloud1 image", { x: 120, y: 540, scale: 1.3 }); // Mask element (transforms)
            // Set starting positions using attr
            gsap.set("#cloud1, #cloud1M", { attr: { x: 120, y: 540, }, scale: 1.3 });
            gsap.set("#cloud2", { attr: { x: 400, y: 310 } });
            gsap.set("#cloud3", { attr: { x: -200, y: 320 } });
            gsap.set("#cloud4", { attr: { x: 300, y: 400 } });
            gsap.set("#cloud5", { attr: { x: -100, y: 580 }, scale: 1.5 });
            gsap.set("#cloud6", { attr: { x: -300, y: 970 } });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: this.domElements.scrollDist,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });


            // Mountain animations with attr
            tl.fromTo("#sky",
                { attr: { x: 0, y: -80 }, scale: 1 },
                { attr: { x: -150, y: -650 }, scale: 1.3 }, 0
            )
                .fromTo("#mountBg",
                    { attr: { x: 0, y: 70 }, scale: 1 },
                    { attr: { x: -150, y: -600 }, scale: 1.3 }, 0
                )
                .fromTo("#mountBg2",
                    { attr: { x: 0, y: 110 }, scale: 1 },
                    { attr: { x: -150, y: -670 }, scale: 1.3 }, 0
                )
                .fromTo("#mountMg",
                    { attr: { x: 0, y: 345 }, scale: 1 },
                    { attr: { x: -150, y: -700 }, scale: 1.3 }, 0
                )
                .fromTo("#mountMgF",
                    { attr: { x: 0, y: 200 }, scale: 1 },
                    { attr: { x: -150, y: -750 }, scale: 1.3 }, 0
                )
                .fromTo("#mountFg",
                    { attr: { x: 0, y: 220 }, scale: 1 },
                    { attr: { x: -150, y: -850 }, scale: 1.3 }, 0
                );

            //mask animations
            tl.to("#cloud1 image",
                { x: -420, y: -490, scale: 2.4 }, 0
            );

            // Cloud animations with attr
            tl.to("#cloud2", { attr: { x: -200, y: -500 } }, 0)
                .to("#cloud3", { attr: { x: 500, y: -900 } }, 0)
                .to("#cloud4", { attr: { x: -400, y: -750 } }, 0)
                .to("#cloud5", { attr: { x: 300, y: -800 }, scale: 3 }, 0)
                .to("#cloud1, #cloud1M", { attr: { x: -420, y: -490 }, scale: 2.4 }, 0);

        } catch (error) {
            console.error("Animation failed:", error);
        }
    }


    // Helper method to check element existence
    checkElementsExist(selectors) {
        return selectors.every(selector => {
            const exists = document.querySelector(selector);
            if (!exists) {
                console.warn(`GSAP target ${selector} not found`);
                return false;
            }
            return true;
        });
    }
}





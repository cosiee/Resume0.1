document.addEventListener("DOMContentLoaded", function () {
    // Opening animations
    playOpeningAnimations();

    // Thumbnail animations setup
    setupThumbnailAnimations();
});

function playOpeningAnimations() {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".scrollDist",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
        },
    })
    // Define your opening animations here
    // Example:
    .fromTo(
        "#sky",
        { scale: 1, x: 0, y: -80 },
        { scale: 1.3, x: -150, y: -650 },
        0
    )
    // Continue defining your opening animations...
}

function setupThumbnailAnimations() {
    const thumbs = document.querySelectorAll(".thumbs");

    thumbs.forEach(thumb => {
        thumb.addEventListener("mouseenter", function () {
            gsap.to(thumb, { scale: 1.2, duration: 0.5 });
        });

        thumb.addEventListener("mouseleave", function () {
            gsap.to(thumb, { scale: 1, duration: 0.5 });
        });
    });
}

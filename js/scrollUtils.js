// scrollUtils.js
// sets focus on sliders as the enter the viewport center


// js/scrollUtils.js
export function setupScrollFocus() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded. Ensure scripts are included in HTML.');
    return;
  }

  const sliders = document.querySelectorAll('.slider');
  sliders.forEach((slider) => {
    const titleBar = slider.querySelector('.titleBar');
    if (!titleBar) {
      console.warn(`No .titleBar found in slider ${slider.id}`);
      return;
    }
    const titleBarChildren = titleBar.querySelectorAll('*');
    if (!titleBarChildren.length) {
      console.warn(`No children found in .titleBar of slider ${slider.id}`);
      return;
    }
    console.log(`Found ${titleBarChildren.length} children in ${slider.id}`, titleBarChildren);

    // Initial state with visibility override
    gsap.set(titleBar, { display: 'block', visibility: 'visible' });
    gsap.set(titleBarChildren, {
      y: 100, // Initial translateY in pixels
      opacity: 0,
      onComplete: () => console.log(`Initial state set for ${slider.id}`, gsap.getProperty(titleBarChildren[0], 'y'), gsap.getProperty(titleBarChildren[0], 'opacity')),
    });

    let animation = null; // Store the animation instance for reversal

    ScrollTrigger.create({
      trigger: slider,
      start: "center center", // Trigger when slider center meets viewport center
      onEnter: () => {
        console.log(`Entering range for slider ${slider.id}`);
        slider.classList.add('is-focused'); // Add class for blue border
        // Persist visibility and force reflow
        titleBar.style.display = 'block';
        titleBar.style.visibility = 'visible';
        window.getComputedStyle(titleBar).transform; // Force reflow
        animation = gsap.to(titleBarChildren, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
          onStart: () => console.log(`Animation started for ${slider.id}`),
          onUpdate: () => console.log(`Animation updating for ${slider.id}, y: ${gsap.getProperty(titleBarChildren[0], 'y')}, opacity: ${gsap.getProperty(titleBarChildren[0], 'opacity')}`),
          onComplete: () => {
            console.log(`Animation completed for ${slider.id}`, gsap.getProperty(titleBarChildren[0], 'y'), gsap.getProperty(titleBarChildren[0], 'opacity'));
            // Ensure final state persists
            gsap.set(titleBarChildren, { clearProps: 'all' });
          },
        });
      },
      onEnterBack: () => {
        console.log(`Entering back range for slider ${slider.id}`);
        slider.classList.add('is-focused'); // Add class for blue border
        titleBar.style.display = 'block';
        titleBar.style.visibility = 'visible';
        window.getComputedStyle(titleBar).transform; // Force reflow
        animation = gsap.to(titleBarChildren, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
          onStart: () => console.log(`Animation started for ${slider.id}`),
          onUpdate: () => console.log(`Animation updating for ${slider.id}, y: ${gsap.getProperty(titleBarChildren[0], 'y')}, opacity: ${gsap.getProperty(titleBarChildren[0], 'opacity')}`),
          onComplete: () => {
            console.log(`Animation completed for ${slider.id}`, gsap.getProperty(titleBarChildren[0], 'y'), gsap.getProperty(titleBarChildren[0], 'opacity'));
            gsap.set(titleBarChildren, { clearProps: 'all' });
          },
        });
      },
      onLeave: () => {
        slider.classList.remove('is-focused'); // Remove class when leaving
        if (animation) animation.reverse(0);
      },
      onLeaveBack: () => {
        slider.classList.remove('is-focused'); // Remove class when scrolling up past
        if (animation) animation.reverse(0);
      },
    });
  });
}
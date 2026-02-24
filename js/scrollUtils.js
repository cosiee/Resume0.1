// scrollUtils.js
// sets focus on sliders as the enter the viewport center


export function setupScrollFocus() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded. Ensure scripts are included in HTML.');
    return;
  }

  const sliders = document.querySelectorAll('.slider');
  sliders.forEach((slider) => {
    const titleBar = slider.querySelector('.titleBar');
    if (!titleBar) return;

    const titleBarChildren = titleBar.querySelectorAll('*');
    if (!titleBarChildren.length) return;

    // Initial state – exactly like your original
    gsap.set(titleBar, { display: 'block', visibility: 'visible' });
    gsap.set(titleBarChildren, { y: 100, opacity: 0 });

    // THIS IS THE ONLY REAL CHANGE: create ONE timeline once, outside ScrollTrigger
    const animTl = gsap.timeline({ paused: true })
      .to(titleBarChildren, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
        // stagger: 0.01, // optional – remove if you don’t want stagger
        onStart: () => console.log(`Animation started for ${slider.id || 'unnamed'}`),
        onUpdate: () => console.log(`Updating ${slider.id || 'unnamed'}`),
        onComplete: () => {
          console.log(`Animation completed for ${slider.id || 'unnamed'}`);
          // keep your exact original behaviour
          gsap.set(titleBarChildren, { clearProps: 'all' });
        }
      });

    ScrollTrigger.create({
      trigger: slider,
      start: "top 90%",         
      end: "bottom 5%",        

      onEnter: () => {
        slider.classList.add('is-focused');
        titleBar.style.display = 'block';
        titleBar.style.visibility = 'visible';
        void titleBar.offsetHeight;        // your original reflow trick – kept
        animTl.restart();                  // ← now uses the reusable timeline
      },
      onEnterBack: () => {
        slider.classList.add('is-focused');
        titleBar.style.display = 'block';
        titleBar.style.visibility = 'visible';
        void titleBar.offsetHeight;
        animTl.restart();
      },
      onLeave: () => {
        slider.classList.remove('is-focused');
        animTl.reverse();                  // ← now reverses perfectly every time
      },
      onLeaveBack: () => {
        slider.classList.remove('is-focused');
        animTl.reverse()
      },

onRefresh: (self) => {
  if (self.isActive) {
    slider.classList.add('is-focused');
    // One tiny 0-duration tween forces a real repaint on mobile
    gsap.to(titleBarChildren, { y: 0, opacity: 1, duration: 0, force3D: true });
    animTl.progress(1);
  }
}
    });
  });

  ScrollTrigger.refresh();
}
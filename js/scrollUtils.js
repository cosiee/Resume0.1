// scrollUtils.js
// sets focus on sliders as the enter the viewport center

// export function setupScrollFocus() {
//   if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
//     console.error('GSAP or ScrollTrigger not loaded. Ensure scripts are included in HTML.');
//     return;
//   }

//   const sliders = document.querySelectorAll('.slider');
//   sliders.forEach((slider) => {
//     const titleBar = slider.querySelector('.titleBar');
//     if (!titleBar) {
//       console.warn(`No .titleBar found in slider ${slider.id}`);
//       return;
//     }
//     const titleBarChildren = titleBar.querySelectorAll('*');
//     if (!titleBarChildren.length) {
//       console.warn(`No children found in .titleBar of slider ${slider.id}`);
//       return;
//     }
//     console.log(`Found ${titleBarChildren.length} children in ${slider.id}`, titleBarChildren);

//     // Initial state with visibility override
//     gsap.set(titleBar, { display: 'block', visibility: 'visible' });
//     gsap.set(titleBarChildren, {
//       y: 100, // Initial translateY in pixels
//       opacity: 0,
//       onComplete: () => console.log(`Initial state set for ${slider.id}`, gsap.getProperty(titleBarChildren[0], 'y'), gsap.getProperty(titleBarChildren[0], 'opacity')),
//     });

//     let animation = null; // Store the animation instance for reversal

//     ScrollTrigger.create({
//       trigger: slider,
//       start: "center center", // Trigger when slider center meets viewport center
//       onEnter: () => {
//         console.log(`Entering range for slider ${slider.id}`);
//         slider.classList.add('is-focused'); // Add class for blue border
//         // Persist visibility and force reflow
//         titleBar.style.display = 'block';
//         titleBar.style.visibility = 'visible';
//         window.getComputedStyle(titleBar).transform; // Force reflow
//         animation = gsap.to(titleBarChildren, {
//           y: 0,
//           opacity: 1,
//           duration: 0.3,
//           ease: 'power1.out',
//           onStart: () => console.log(`Animation started for ${slider.id}`),
//           onUpdate: () => console.log(`Animation updating for ${slider.id}, y: ${gsap.getProperty(titleBarChildren[0], 'y')}, opacity: ${gsap.getProperty(titleBarChildren[0], 'opacity')}`),
//           onComplete: () => {
//             console.log(`Animation completed for ${slider.id}`, gsap.getProperty(titleBarChildren[0], 'y'), gsap.getProperty(titleBarChildren[0], 'opacity'));
//             // Ensure final state persists
//             gsap.set(titleBarChildren, { clearProps: 'all' });
//           },
//         });
//       },
//       onEnterBack: () => {
//         console.log(`Entering back range for slider ${slider.id}`);
//         slider.classList.add('is-focused'); // Add class for blue border
//         titleBar.style.display = 'block';
//         titleBar.style.visibility = 'visible';
//         window.getComputedStyle(titleBar).transform; // Force reflow
//         animation = gsap.to(titleBarChildren, {
//           y: 0,
//           opacity: 1,
//           duration: 0.3,
//           ease: 'power1.out',
//           onStart: () => console.log(`Animation started for ${slider.id}`),
//           onUpdate: () => console.log(`Animation updating for ${slider.id}, y: ${gsap.getProperty(titleBarChildren[0], 'y')}, opacity: ${gsap.getProperty(titleBarChildren[0], 'opacity')}`),
//           onComplete: () => {
//             console.log(`Animation completed for ${slider.id}`, gsap.getProperty(titleBarChildren[0], 'y'), gsap.getProperty(titleBarChildren[0], 'opacity'));
//             gsap.set(titleBarChildren, { clearProps: 'all' });
//           },
//         });
//       },
//       onLeave: () => {
//         slider.classList.remove('is-focused'); // Remove class when leaving
//         if (animation) animation.reverse(0);
//       },
//       onLeaveBack: () => {
//         slider.classList.remove('is-focused'); // Remove class when scrolling up past
//         if (animation) animation.reverse(0);
//       },
//     });
//   });
// }

// export function setupScrollFocus() {
//   if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
//     console.error('GSAP or ScrollTrigger not loaded.');
//     return;
//   }

//   gsap.utils.toArray('.slider').forEach((slider) => {
//     const titleBar = slider.querySelector('.titleBar');
//     if (!titleBar) return;

//     const titleBarChildren = titleBar.querySelectorAll('*');
//     if (!titleBarChildren.length) return;

//     // Initial off-screen state (exactly like yours)
//     gsap.set(titleBar, { display: 'block', visibility: 'visible' });
//     gsap.set(titleBarChildren, { y: 100, opacity: 0 });

//     // ONE persistent timeline — this is the only real change needed
//     const tl = gsap.timeline({ paused: true, defaults: { ease: 'power1.out' } })
//       .to(titleBarChildren, {
//         y: 0,
//         opacity: 1,
//         duration: 0.35,
//         stagger: 0.07,  // optional: keeps your beautiful line-by-line reveal
//         // All your original callbacks preserved:
//         onStart: () => console.log(`Animation started for ${slider.id || 'slider'}`),
//         onUpdate: () => {
//           const first = titleBarChildren[0];
//           console.log(`Updating ${slider.id || 'slider'} → y: ${gsap.getProperty(first, 'y').toFixed(1)}, opacity: ${gsap.getProperty(first, 'opacity').toFixed(2)}`);
//         },
//         onComplete: () => {
//           console.log(`Animation completed for ${slider.id || 'slider'}`);
//           // You wanted this: clear inline styles only when fully done
//           gsap.set(titleBarChildren, { clearProps: 'all' });
//         },
//         onReverseComplete: () => {
//           console.log(`Reverse completed for ${slider.id || 'slider'}`);
//           // Optional: re-apply hidden state if you want hard reset
//            gsap.set(titleBarChildren, { y: 100, opacity: 0 });
//         }
//       });

//     ScrollTrigger.create({
//       trigger: slider,
//       start: "center center",
//       end: "center center+=1", // tiny end buffer prevents flicker

//       onEnter: () => {
//         slider.classList.add('is-focused');
//         titleBar.style.display = 'block';
//         titleBar.style.visibility = 'visible';
//         void titleBar.offsetHeight; // force reflow (your trick — kept!)
//         tl.restart(); // restart = play from beginning (safe + smooth)
//       },
//       onEnterBack: () => {
//         slider.classList.add('is-focused');
//         titleBar.style.display = 'block';
//         titleBar.style.visibility = 'visible';
//         void titleBar.offsetHeight;
//         tl.restart();
//       },
//       onLeave: () => {
//         slider.classList.remove('is-focused');
//         tl.reverse(); // Now works perfectly every time
//       },
//       onLeaveBack: () => {
//         slider.classList.remove('is-focused');
//         tl.reverse();
//       }
//     });

//     // Optional: expose for console debugging
//     // window.debugTl = window.debugTl || {}; 
//     // window.debugTl[slider.id || 'unknown'] = tl;
//   });

//   ScrollTrigger.refresh();
// }

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
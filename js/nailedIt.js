     (function() {
            emailjs.init("BSXVEqtYjrl5zOaJX"); // Your actual public key — perfect!
        })();
   

   // <!-- Contact Modal Script - Guaranteed to work -->

        // Wait a tiny bit for navbar.js to finish (since it's a module without defer)
        setTimeout(() => {
            const host = document.getElementById('contact-host');
            if (!host) {
                console.error('Contact host element not found!');
                return;
            }

            const shadow = host.attachShadow({ mode: 'open' });

            shadow.innerHTML = `
                <div id="glass-contact-modal" class="glass-contact-modal contact-form-hidden">
                    <button class="glass-close-btn" aria-label="Close contact form">×</button>
                    <div class="glass-overlay"></div>

                    <div class="glass-contact-inner">
                        <h2 class="glass-title">Contact Andrew</h2>
                        <p class="glass-subtitle">Enter your details below, And I'll take it from there</p>

                        <form id="contactForm">
                            <div class="glass-field">
                                <label for="reason">Reason for Contact *</label>
                                <select id="reason" required>
                                    <option value="">Select an option</option>
                                    <option value="Request of work">Need a Job Done</option>
                                    <option value="Testimonial of work completed">Testimonial of Work Completed</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="glass-field"><label for="name">Name *</label><input type="text" id="name" required></div>
                            <div class="glass-field"><label for="email">Email *</label><input type="email" id="email" required></div>
                            <div class="glass-field"><label for="phone">Telephone Number</label><input type="tel" id="phone"></div>
                            <div class="glass-field"><label for="eircode">Eircode (optional)</label><input type="text" id="eircode"></div>
                            <div class="glass-field"><label for="message">Message *</label><textarea id="message" rows="5" required></textarea></div>
                            <div class="glass-submit"><button type="submit">Send Message</button></div>
                            <div id="status"></div>
                        </form>
                    </div>
                </div>

                <style>
                    .contact-form-hidden { display: none !important; }
                    .glass-overlay {
                        position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 998;
                        opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
                    }
                    .glass-contact-modal:not(.contact-form-hidden) ~ .glass-overlay {
                        opacity: 1; pointer-events: auto;
                    }
                    .glass-contact-modal {
                        position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
                        z-index: 1000; width: 500px; max-width: 90vw; max-height: 90vh;
                        padding: 40px; border: 1px solid rgba(255,255,255,0.2); border-radius: 20px;
                        background: rgba(208,205,205,0.4); backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(0,0,0,0.9);
                        overflow-y: auto; box-sizing: border-box;
                    }
                    .glass-contact-inner { font-family: "Open Sans",Helvetica,Arial,sans-serif; display: flex; flex-direction: column; gap: 30px; color: #fff; }
                    .glass-title { text-align: center; font-size: 2rem; font-weight: bold; margin: 0; }
                    .glass-subtitle { text-align: center; font-weight: bold; font-size: 1.6rem; margin: 0 0 10px 0; }
                    .glass-field label { display: block; font-weight: bold; margin: 10px 0 3px; font-size: 1.5rem; }
                    .glass-field input, .glass-field select, .glass-field textarea {
                        width: 100%; padding: 10px; font-size: 1.6rem; background: rgba(255,255,255,0.85);
                        border: 1px solid rgba(0,0,0,0.2); border-radius: 10px; color: #000; box-sizing: border-box;
                    }
                    .glass-field input:focus, .glass-field select:focus, .glass-field textarea:focus {
                        background: #fff; box-shadow: 0 0 0 3px rgba(0,0,0,0.1); outline: none;
                    }
                    .glass-submit { text-align: center; margin-top: 20px; }
                    .glass-submit button { padding: 16px 50px; font-size: 1.3rem; background: #333; color: white; border: none; border-radius: 10px; cursor: pointer; }
                    .glass-submit button:hover { background: #555; }
                    #status { text-align: center; font-weight: bold; margin-top: 20px; min-height: 30px; font-size: 1.1rem; }
                    .glass-close-btn {
                        position: absolute; top: 15px; right: 20px; background: transparent; border: none;
                        font-size: 2.8rem; font-weight: bold; color: #fff; cursor: pointer;
                        width: 50px; height: 50px; line-height: 45px; text-align: center; z-index: 1002;
                    }
                    .glass-close-btn:hover { color: #ccc; }
                </style>
            `;

            const contactLink = document.getElementById('contactLink');
            const modal = shadow.getElementById('glass-contact-modal');
            const closeBtn = shadow.querySelector('.glass-close-btn');
            const overlay = shadow.querySelector('.glass-overlay');
            const form = shadow.getElementById('contactForm');
            const status = shadow.getElementById('status');

            if (!contactLink || !modal) {
                console.error('Contact link or modal not found');
                return;
            }

            const closeModal = () => {
                modal.classList.add('contact-form-hidden');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                if (window.pageDomUtils?.enablePageInteractions) {
                    window.pageDomUtils.enablePageInteractions();
                }
            };

            contactLink.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('contact-form-hidden');

                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = `${scrollbarWidth}px`;

                if (window.pageDomUtils?.disablePageInteractions) {
                    window.pageDomUtils.disablePageInteractions();
                } else {
                    console.warn('pageDomUtils not ready yet for disable');
                }
            });

            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('contact-form-hidden')) {
                    closeModal();
                }
            });

            // EmailJS — use your real service/template IDs
            form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    status.style.color = '#ffffff';

    const templateParams = {
        name:    shadow.getElementById('name')?.value    || '',
        email:   shadow.getElementById('email')?.value   || '',
        phone:   shadow.getElementById('phone')?.value   || 'Not provided',
        eircode: shadow.getElementById('eircode')?.value || 'Not provided',
        reason:  shadow.getElementById('reason')?.value  || '',
        message: shadow.getElementById('message')?.value || ''
    };

                emailjs.send('service_fhvgxq4', 'template_9gc3y2e', templateParams) 
                   .then(() => {
            status.textContent = 'Message sent successfully! Thank you.';
            status.style.color = '#aaffaa';
            form.reset();
            setTimeout(() => { status.textContent = ''; }, 6000);
        })
        .catch((error) => {
            status.textContent = 'Failed to send. Check console.';
            status.style.color = '#ff6666';
            console.error('EmailJS error:', error);
        });
            });
        }, 100); 


document.addEventListener('DOMContentLoaded', () => {
    // Your animate-on-scroll logic (unchanged)
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));

    // ────────────────────────────────────────────────
    // Hero logic starts here
    // ────────────────────────────────────────────────
    const logo = document.getElementById('logoHover');
    const heroReveal = document.getElementById('heroReveal');
    const heroContactBtn = document.getElementById('hero-contact-btn');
    const heroCloseBtn = document.querySelector('.hero-close-btn');

    if (!logo || !heroReveal) {
        console.warn('Hero elements missing');
        return;
    }

    let hideTimeout = null;

    const showHero = () => {
        clearTimeout(hideTimeout);
        heroReveal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const scheduleHide = () => {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            heroReveal.classList.remove('active');
            document.body.style.overflow = 'visible';
        }, 120); // small delay to allow moving from logo → hero without flicker
    };

    const cancelHide = () => {
        clearTimeout(hideTimeout);
    };

    // Trigger show on logo hover
    logo.addEventListener('mouseenter', showHero);

    // When mouse leaves the **whole** hero wrapper → schedule hide
    heroReveal.addEventListener('mouseleave', scheduleHide);

    // When mouse enters hero (from logo or anywhere) → cancel any pending hide
    heroReveal.addEventListener('mouseenter', cancelHide);

    // Close button
    heroCloseBtn?.addEventListener('click', (e) => {
        
        e.stopPropagation();
        heroReveal.classList.remove('active');
        document.body.style.overflow = 'visible';
    });

    // Click outside (overlay only)
    heroReveal.addEventListener('click', (e) => {
        if (e.target === heroReveal) {
            heroReveal.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });

    // CTA button – open contact + hide hero
    heroContactBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('contactLink')?.click();
        heroReveal.classList.remove('active');
        document.body.style.overflow = 'visible';
    });

    // Mobile / touch fallback: toggle on tap
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        if (heroReveal.classList.contains('active')) {
            heroReveal.classList.remove('active');
            document.body.style.overflow = 'visible';
        } else {
            showHero();
        }
    });

    // Mobile auto-show
    if (window.matchMedia('(hover: none)').matches) {
        setTimeout(showHero, 1800);
    }
});

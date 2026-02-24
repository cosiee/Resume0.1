// js/contactForm.js

class ContactForm {
    constructor() {
        this.host = document.getElementById('contact-host');
        if (!this.host) {
            console.error('Contact host element not found!');
            return;
        }

        this.init();
    }

    init() {
        const shadow = this.host.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <link rel="stylesheet" href="../css/contactFormStyles.css">

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
                                <option value="Request of work">Need a job done</option>
                                <option value="Testimonial of work completed">Testimonial of work completed</option>
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
        `;

        // Elements
        this.contactLink = document.getElementById('contactLink');
        this.modal = shadow.getElementById('glass-contact-modal');
        this.closeBtn = shadow.querySelector('.glass-close-btn');
        this.overlay = shadow.querySelector('.glass-overlay');
        this.form = shadow.getElementById('contactForm');
        this.status = shadow.getElementById('status');

        if (!this.contactLink || !this.modal) {
            console.error('Contact link or modal not found');
            return;
        }

        this.bindEvents();
    }

    bindEvents() {
        const closeModal = () => {
            this.modal.classList.add('contact-form-hidden');
            document.body.style.overflow = 'visible';
            document.body.style.paddingRight = '';
            document.documentElement.style.overflow = 'visible';

            if (window.pageDomUtils?.enablePageInteractions) {
                window.pageDomUtils.enablePageInteractions();
            }

            // Ensure sliders re-layout
            window.dispatchEvent(new Event('resize'));
        };

        this.contactLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.classList.remove('contact-form-hidden');

            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;

            if (window.pageDomUtils?.disablePageInteractions) {
                window.pageDomUtils.disablePageInteractions();
            }
        });

        this.closeBtn.addEventListener('click', closeModal);
        this.overlay.addEventListener('click', closeModal);
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('contact-form-hidden')) {
                closeModal();
            }
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.status.textContent = 'Sending...';
            this.status.style.color = '#ffffff';

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
                    this.status.textContent = 'Message sent successfully! Thank you.';
                    this.status.style.color = '#aaffaa';
                    this.form.reset();
                    setTimeout(() => { this.status.textContent = ''; }, 6000);
                })
                .catch((error) => {
                    this.status.textContent = 'Failed to send. Check console.';
                    this.status.style.color = '#ff6666';
                    console.error('EmailJS error:', error);
                });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
export class DomUtils {
  constructor(selectors) {
    if (!selectors) throw new Error("DomUtils requires selectors object");
    this.selectors = selectors;
    this.elements = this.getDomElements();
    this.cachedEndTopY = null;
    this.cachedEndBottomY = null;
    this.thumbWidth = 0;
    this.screenWidthHalved = window.innerWidth / 2;
    this.screenHeightHalved = window.innerHeight / 2;
    this.endTopY = 0;
    this.endLeftX = 0;
    this.endRightX = 0;
    this.endBottomY = 0;
    this.initEventListeners();
  }

  /* ======================== */
  /* === DOM Element Utils === */
  /* ======================== */
  detectPage() {
    if (document.querySelector('#software')) return 'index';
    else if (document.querySelector('#softwareLink')) return 'software'; // Changed from '#software'
    else if (document.querySelector('#slider1')) return 'photography';
    else if (document.querySelector('#diy')) return 'diy';
    else if (document.querySelector('#motion')) return 'motion';
    else if (document.querySelector('#animation')) return 'animation';
    else if (document.querySelector('#video')) return 'video';
    return 'unknown';
  }

  isIndexPage() { return this.detectPage() === 'index'; }
  isPhotographyPage() { return this.detectPage() === 'photography'; }
  isDiyPage() { return this.detectPage() === 'diy'; }
  isMotionPage() { return this.detectPage() === 'motion'; }
  isAnimationPage() { return this.detectPage() === 'animation'; }
  isVideoPage() { return this.detectPage() === 'video'; }

  getViewportCenter() { return { x: window.innerWidth / 2, y: window.innerHeight / 2 }; }

  getModalPosition() {
    const center = this.getViewportCenter();
    const isLandscape = window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches;
    const baseSize = Math.min(500, window.innerWidth * 0.8);
    return { width: baseSize, height: baseSize, left: center.x - (baseSize / 2), top: isLandscape ? center.y * 0.7 : center.y * 0.65 };
  }

  getWipPosition() {
    const center = this.getViewportCenter();
    const isLandscape = window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches;
    return { width: Math.min(600, window.innerWidth * 0.8), height: Math.min(600, window.innerWidth * 0.8), left: center.x - (Math.min(600, window.innerWidth * 0.8) / 2), top: isLandscape ? center.y * 0.6 : center.y * 0.55 };
  }

  getDomElements() {
    const elements = {};
    Object.entries(this.selectors).forEach(([key, selector]) => {
      if (Array.isArray(selector)) elements[key] = selector.map(s => document.querySelector(s)).filter(el => el);
      else elements[key] = document.querySelector(selector);
    });
    // Fallback for thumbElements if not in selectors
    if (!elements.thumbElements && this.isIndexPage()) elements.thumbElements = document.querySelectorAll('.thumbnail');
    return elements;
  }

  /* ======================== */
  /* === Thumbnail Utils ==== */
  /* ======================== */
  getThumbWidthWithMargin() { return this.elements?.thumbElements?.[0] ? parseFloat(window.getComputedStyle(this.elements.thumbElements[0]).width) + parseFloat(window.getComputedStyle(this.elements.thumbElements[0]).marginRight) * 2 : 300; }
  getThumbWidthWithoutMargin() { return this.elements?.thumbElements?.[0] ? parseFloat(window.getComputedStyle(this.elements.thumbElements[0]).width) : 325; }
  getThumbMargin() { return this.elements?.thumbElements?.[0] ? parseFloat(window.getComputedStyle(this.elements.thumbElements[0]).marginRight) : 0; }
  getComputedStyleValue(element, property) { return element ? parseInt(window.getComputedStyle(element).getPropertyValue(property)) : 0; }

  /* ======================== */
  /* === Position Utils ===== */
  /* ======================== */
  initEventListeners() {
    window.addEventListener("resize", () => {
      this.cachedEndTopY = null;
      this.cachedEndBottomY = null;
      this.updateDimensions();
    });
  }

  updateEndTopY() {
    const isLandscape = window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches;
    this.endTopY = isLandscape ? window.innerHeight * 1.275 : window.innerHeight * 1.325;
    return this.endTopY;
  }

  getEndTopY() { if (this.cachedEndTopY === null) this.cachedEndTopY = this.updateEndTopY(); return this.cachedEndTopY; }

  updateEndBottomY() {
    const isLandscape = window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches;
    if (!this.elements?.thumbElements?.length) return isLandscape ? window.innerHeight * 0.7 : window.innerHeight * 0.75;
    const thumbWidth = this.getThumbWidthWithMargin();
    this.endBottomY = isLandscape ? window.innerHeight * 1.275 + thumbWidth : window.innerHeight * 1.325 + thumbWidth;
    return this.endBottomY;
  }

  getEndBottomY() { if (this.cachedEndBottomY === null) this.cachedEndBottomY = this.updateEndBottomY(); return this.cachedEndBottomY; }

  /* ======================== */
  /* === Animation Utils ==== */
  /* ======================== */
  collectThumbs() { if (!this.isIndexPage()) return; const endTopY = this.getEndTopY(); const endBottomY = this.getEndBottomY(); const thumbMargin = this.getThumbMargin(); const thumbWidth = this.getThumbWidthWithoutMargin(); this.endLeftX = (window.innerWidth / 2) - (thumbWidth + thumbMargin); this.endRightX = (window.innerWidth / 2) - thumbMargin; const elements = [{ selector: '#software', x: this.endLeftX, y: endTopY + thumbMargin }, { selector: '#photography', x: this.endRightX, y: endTopY + thumbMargin }, { selector: '#diy', x: this.endRightX, y: endBottomY - thumbMargin }, { selector: '#motion', x: this.endLeftX, y: endBottomY - thumbMargin }]; elements.forEach(({ selector, x, y }) => { const element = document.querySelector(selector); if (element) gsap.to(selector, { scale: 1, x: x, y: y, duration: 1, ease: "power2.out" }); }); }
  spaceoutThumbs() { if (!this.isIndexPage()) return; this.cachedEndTopY = null; this.cachedEndBottomY = null; this.updateEndTopY(); this.updateEndBottomY(); gsap.to("#software", { x: this.endLeftX, y: this.getEndTopY(), duration: 1, ease: "power2.out" }); gsap.to("#photography", { x: this.endRightX, y: this.getEndTopY(), duration: 1, ease: "power2.out" }); gsap.to("#diy", { x: this.endRightX, y: this.getEndBottomY(), duration: 1, ease: "power2.out" }); gsap.to("#motion", { x: this.endLeftX, y: this.getEndBottomY(), duration: 1, ease: "power2.out" }); }

  /* ======================== */
  /* === Modal/Form Utils === */
  /* ======================== */
  updateModalDimensions() {
    const modalBox = document.querySelector(".modalbox .box");
    const softwareThumb = document.querySelector("#software");
    if (!modalBox) return;
    if (this.isIndexPage() && softwareThumb) {
      const thumbWidth = this.getThumbWidthWithoutMargin();
      const newWidth = Math.max(thumbWidth * 2 + 4, 300);
      const centerX = window.innerWidth / 2 + 8;
      const newLeft = centerX - newWidth / 2;
      const softwareRect = softwareThumb.getBoundingClientRect();
      const softwareY = softwareRect.top + window.scrollY;
      const offsetY = 9.4;
      const newTop = softwareY + offsetY;
      modalBox.style.width = `${newWidth}px`;
      modalBox.style.height = `${newWidth}px`;
      modalBox.style.left = `${newLeft}px`;
      modalBox.style.top = `${newTop}px`;
    } else {
      const center = this.getViewportCenter();
      const baseSize = Math.min(500, window.innerWidth * 0.8);
      modalBox.style.width = `${baseSize}px`;
      modalBox.style.height = `${baseSize}px`;
      modalBox.style.left = `${center.x - (baseSize / 2)}px`;
      modalBox.style.top = `${center.y * 0.3}px`;
      modalBox.style.position = "fixed";
    }
  }

  formControl() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;
    if (this.isIndexPage()) {
      const softwareThumb = document.querySelector("#software");
      if (softwareThumb) {
        const softwareRect = softwareThumb.getBoundingClientRect();
        const softwareY = softwareRect.top + window.scrollY;
        const offsetY = 12;
        const formY = softwareY + offsetY;
        const style = window.getComputedStyle(contactForm);
        const formWidth = parseFloat(style.width);
        const formX = window.innerWidth / 2 - (formWidth / 2) + 6.75;
        contactForm.style.left = `${formX}px`;
        contactForm.style.top = `${formY}px`;
      }
    } else {
      contactForm.style.position = "fixed";
      contactForm.style.left = "50%";
      contactForm.style.top = "50%";
      contactForm.style.transform = "translate(-50%, -50%)";
    }
    const statement = document.getElementById("statementContact");
    if (statement) {
      statement.style.zIndex = "1000";
      contactForm.style.zIndex = "1001";
    }
  }

  hideForm() {
    const form = document.getElementById("contactForm");
    if (form) form.style.display = "none";
    const statement = document.getElementById("statementContact");
    if (statement) statement.style.display = "none";
    document.documentElement.style.overflow = "";
    this.enablePageInteractions();
  }

  /* ======================== */
  /* === Update Methods ===== */
  /* ======================== */
  updateDimensionsNoMargins() {
    setTimeout(() => {
      this.thumbWidth = Math.min(300, window.innerWidth / 6);
      this.screenWidthHalved = window.innerWidth / 2;
      this.screenHeightHalved = window.innerHeight / 2;
      const widthThumb = this.getThumbWidthWithoutMargin();
      const marginWidth = this.getThumbMargin();
      this.updateEndTopY();
      const updatedEndTopY = this.getEndTopY();
      if (updatedEndTopY === undefined) { console.error("Error: getEndTopY() returned undefined!"); return; }
      this.endTopY = updatedEndTopY + marginWidth - 15;
      this.endLeftX = this.screenWidthHalved - (widthThumb + marginWidth);
      this.endRightX = this.screenWidthHalved - marginWidth;
      this.endBottomY = this.updateEndBottomY() - marginWidth - 15;
      this.collectThumbs();
      this.updateModalDimensions();
      this.formControl();
    }, 450);
  }

  updateDimensions() {
    this.thumbWidth = Math.min(300, window.innerWidth / 6);
    this.screenWidthHalved = window.innerWidth / 2;
    this.screenHeightHalved = window.innerHeight / 2;
    this.endLeftX = this.screenWidthHalved - this.getThumbWidthWithMargin();
    this.updateEndTopY();
    const updatedEndTopY = this.getEndTopY();
    if (updatedEndTopY === undefined) { console.error("Error: getEndTopY() returned undefined!"); return; }
    this.endTopY = updatedEndTopY;
    this.endRightX = this.screenWidthHalved;
    this.updateEndBottomY();
  }

  /* ======================== */
  /* === Utility Methods ==== */
  /* ======================== */
  centerElement(element) { if (!element) return; const rect = element.getBoundingClientRect(); window.scrollTo({ top: rect.top + window.pageYOffset - window.innerHeight / 2, left: rect.left + window.pageXOffset - window.innerWidth / 2, behavior: "smooth" }); }
  debounce(func, delay) { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), delay); }; }
  showStatementContact() {
    const statement = document.getElementById("statementContact");
    const form = document.getElementById("contactForm");
    if (statement) {
      statement.style.display = "block";
      this.updateModalDimensions();
      if (!this.isIndexPage()) {
        const center = this.getViewportCenter();
        const modalBox = statement.querySelector(".box");
        if (modalBox) {
          modalBox.style.position = "fixed";
          modalBox.style.left = `${center.x - (modalBox.offsetWidth / 2)}px`;
          modalBox.style.top = `${center.y - (modalBox.offsetWidth / 3.4)}px`;
        }
      }
    }
    if (form) form.style.display = "none";
  }

  disablePageInteractions() {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => { link.style.pointerEvents = 'none'; link.style.opacity = '0.5'; });
    const modalClose = document.getElementById('modalClose');
    if (modalClose) { modalClose.style.pointerEvents = 'none'; modalClose.style.opacity = '0.5'; }
  }

  enablePageInteractions() {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => { link.style.pointerEvents = 'auto'; link.style.opacity = '1'; });
    const modalClose = document.getElementById('modalClose');
    if (modalClose) { modalClose.style.pointerEvents = 'auto'; modalClose.style.opacity = '1'; }
  }

  showForm() {
    this.formControl();
    const form = document.getElementById("contactForm");
    if (form) form.style.display = "block";
    this.disablePageInteractions();
  }
}

export function createDomUtils(selectors) { return new DomUtils(selectors); }
// domUtils.js
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

  getDomElements() {
    const elements = {};
    Object.entries(this.selectors).forEach(([key, selector]) => {
      if (Array.isArray(selector)) {
        elements[key] = selector.map(s => document.querySelector(s)).filter(el => el);
      } else {
        elements[key] = document.querySelector(selector);
      }
    });

    // Log missing elements
    Object.entries(elements).forEach(([key, value]) => {
      if (!value) console.error(`Missing DOM element: ${key}`);
    });

    return elements;
  }

  /* ======================== */
  /* === Thumbnail Utils ==== */
  /* ======================== */

  getThumbWidthWithMargin() {
    if (!this.elements?.thumbElements?.[0]) {
      console.error("thumbElements not found!");
      return 0;
    }
    const style = window.getComputedStyle(this.elements.thumbElements[0]);
    return parseFloat(style.width) + parseFloat(style.marginRight) * 2;
  }

  getThumbWidthWithoutMargin() {
    if (!this.elements?.thumbElements?.[0]) return 0;
    return parseFloat(window.getComputedStyle(this.elements.thumbElements[0]).width);
  }

  getThumbMargin() {
    if (!this.elements?.thumbElements?.[0]) return 0;
    return parseFloat(window.getComputedStyle(this.elements.thumbElements[0]).marginRight);
  }

  getComputedStyleValue(element, property) {
    if (!element) return 0;
    return parseInt(window.getComputedStyle(element).getPropertyValue(property));
  }

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

  getEndTopY() {
    if (this.cachedEndTopY === null) {
      this.cachedEndTopY = this.updateEndTopY();
    }
    return this.cachedEndTopY;
  }

  updateEndBottomY() {
    const isLandscape = window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches;
    const thumbWidth = this.getThumbWidthWithMargin();
    this.endBottomY = isLandscape ?
      window.innerHeight * 1.275 + thumbWidth :
      window.innerHeight * 1.325 + thumbWidth;
    return this.endBottomY;
  }

  getEndBottomY() {
    if (this.cachedEndBottomY === null) {
      this.cachedEndBottomY = this.updateEndBottomY();
    }
    return this.cachedEndBottomY;
  }

  /* ======================== */
  /* === Animation Utils ==== */
  /* ======================== */

  collectThumbs() {
    if (!this.elements) return;

    const endTopY = this.getEndTopY();
    const endBottomY = this.getEndBottomY();
    const thumbMargin = this.getThumbMargin();
    const thumbWidth = this.getThumbWidthWithoutMargin();

    this.endLeftX = (window.innerWidth / 2) - (thumbWidth + thumbMargin);
    this.endRightX = (window.innerWidth / 2) - thumbMargin;

    ['#software', '#photography', '#diy', '#motion'].forEach((selector, i) => {
      const x = i % 2 === 0 ? this.endLeftX : this.endRightX;
      const y = i < 2 ? endTopY : endBottomY;

      gsap.to(selector, {
        scale: 1,
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });
    });
  }

  spaceoutThumbs() {
    if (!this.elements) return;

    gsap.to("#software", {
      x: this.endLeftX,
      y: this.getEndTopY(),
      duration: 1,
      ease: "power2.out",
    });
    gsap.to("#photography", {
      x: this.endRightX,
      y: this.getEndTopY(),
      duration: 1,
      ease: "power2.out",
    });
    gsap.to("#diy", {
      x: this.endRightX,
      y: this.endBottomY,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to("#motion", {
      x: this.endLeftX,
      y: this.endBottomY,
      duration: 1,
      ease: "power2.out",
    });
  }

  /* ======================== */
  /* === Modal/Form Utils === */
  /* ======================== */

  updateModalDimensions() {
    const modalBox = document.querySelector(".modalbox .box");
    if (!modalBox || !this.elements?.thumbElements?.[0]) return;

    const thumbWidth = this.getThumbWidthWithoutMargin();
    const newWidth = Math.max(thumbWidth * 2 + 4, 300);
    const centerX = window.innerWidth / 2 + 8;
    const newLeft = centerX - newWidth / 2;
    const newTop = this.getEndTopY() + 9.4;

    modalBox.style.width = `${newWidth}px`;
    modalBox.style.height = `${newWidth}px`;
    modalBox.style.left = `${newLeft}px`;
    modalBox.style.top = `${newTop}px`;
  }

  formControl() {
    const contactForm = document.querySelector(".formDiv#contactForm");
    if (!contactForm) return;

    const style = window.getComputedStyle(contactForm);
    const formX = window.innerWidth / 2 - (parseFloat(style.width) / 2) + 6.75;
    const formY = this.getEndTopY() + 12;

    contactForm.style.left = `${formX}px`;
    contactForm.style.top = `${formY}px`;
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

      if (updatedEndTopY === undefined) {
        console.error("Error: getEndTopY() returned undefined!");
        return;
      }

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
    if (updatedEndTopY === undefined) {
      console.error("Error: getEndTopY() returned undefined!");
      return;
    }

    this.endTopY = updatedEndTopY;
    this.endRightX = this.screenWidthHalved;
    this.updateEndBottomY();
  }

  /* ======================== */
  /* === Utility Methods ==== */
  /* ======================== */

  centerElement(element) {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.pageYOffset - window.innerHeight / 2,
      left: rect.left + window.pageXOffset - window.innerWidth / 2,
      behavior: "smooth"
    });
  }

  debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  showStatementContact() {
    const statement = document.getElementById("statementContact");
    const form = document.getElementById("contactForm");
    if (statement) statement.style.display = "block";
    if (form) form.style.display = "none";
  }

  showForm() {
    this.formControl();
    const form = document.getElementById("contactForm");
    if (form) form.style.display = "block";
  }
}

/* ======================== */
/* === Standalone Exports == */
/* ======================== */

// For backwards compatibility
export function createDomUtils(selectors) {
  return new DomUtils(selectors);
}
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
      // });

      // // Log missing elements
      // Object.entries(elements).forEach(([key, value]) => {
      //   if (!value) console.error(`Missing DOM element: ${key}`);
    });

    return elements;
  }

  /* ======================== */
  /* === Thumbnail Utils ==== */
  /* ======================== */

  getThumbWidthWithMargin() {
    if (!this.elements?.thumbElements?.[0]) {

      return 300;
    }
    const style = window.getComputedStyle(this.elements.thumbElements[0]);
    return parseFloat(style.width) + parseFloat(style.marginRight) * 2;
  }

  getThumbWidthWithoutMargin() {
    if (!this.elements?.thumbElements?.[0]) return 325;
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

  // updateEndBottomY() {
  //   const isLandscape = window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches;
  //   const thumbWidth = this.getThumbWidthWithMargin();

  //   if (!this.elements?.thumbElements?.length) {
  //     return isLandscape ?
  //       window.innerHeight * 0.7 :
  //       window.innerHeight * 0.75;
  //   }

  //   return isLandscape ?
  //     window.innerHeight * 1.275 + thumbWidth :
  //     window.innerHeight * 1.325 + thumbWidth;


  //   this.endBottomY = isLandscape ?
  //     window.innerHeight * 1.275 + thumbWidth :
  //     window.innerHeight * 1.325 + thumbWidth;
  //   return this.endBottomY;
  // }

  updateEndBottomY() {
    const isLandscape = window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches;

    // For pages without thumbnails (like photography.html)
    if (!this.elements?.thumbElements?.length) {
      this.endBottomY = isLandscape ?
        window.innerHeight * 0.7 :
        window.innerHeight * 0.75;
      return this.endBottomY;
    }

    // Original positioning logic for index.html
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
    // if (!this.elements) return;

    if (!this.elements?.thumbElements?.length) {
      return;
    }

    const endTopY = this.getEndTopY();
    const endBottomY = this.getEndBottomY();
    const thumbMargin = this.getThumbMargin();
    const thumbWidth = this.getThumbWidthWithoutMargin();

    this.endLeftX = (window.innerWidth / 2) - (thumbWidth + thumbMargin);
    this.endRightX = (window.innerWidth / 2) - thumbMargin;

    const elements = [
      { selector: '#software', x: this.endLeftX, y: endTopY + thumbMargin },
      { selector: '#photography', x: this.endRightX, y: endTopY + thumbMargin },
      { selector: '#diy', x: this.endRightX, y: endBottomY - thumbMargin },
      { selector: '#motion', x: this.endLeftX, y: endBottomY - thumbMargin }
    ];

    elements.forEach(({ selector, x, y }) => {
      const element = document.querySelector(selector);
      if (element) {
        gsap.to(selector, {
          scale: 1,
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out"
        });
      }
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
    const softwareThumb = document.querySelector("#software");

    if (!modalBox || !softwareThumb || !this.elements?.thumbElements?.[0]) return;

    // 1. Keep existing sizing/X-position logic
    const thumbWidth = this.getThumbWidthWithoutMargin();
    const newWidth = Math.max(thumbWidth * 2 + 4, 300);
    const centerX = window.innerWidth / 2 + 8;
    const newLeft = centerX - newWidth / 2;

    // 2. NEW: Set Y-position to match #software (with optional offset)
    const softwareRect = softwareThumb.getBoundingClientRect();
    const softwareY = softwareRect.top + window.scrollY;
    const offsetY = 9.4; // Adjust this if needed (matches your original +9.4 offset)
    const newTop = softwareY + offsetY;

    // Apply styles
    modalBox.style.width = `${newWidth}px`;
    modalBox.style.height = `${newWidth}px`;
    modalBox.style.left = `${newLeft}px`;
    modalBox.style.top = `${newTop}px`;

  }

  // formControl() {
  //   const contactForm = document.querySelector(".formDiv#contactForm");
  //   if (!contactForm) return;

  //   const style = window.getComputedStyle(contactForm);
  //   const formX = window.innerWidth / 2 - (parseFloat(style.width) / 2) + 6.75;
  //   const formY = this.getEndTopY() + 12;

  //   contactForm.style.left = `${formX}px`;
  //   contactForm.style.top = `${formY}px`;
  // }

  isIndexPage() {
    return !!document.querySelector('#software');
  }
  formControl() {
    // const contactForm = document.querySelector(".formDiv#contactForm");
    // const softwareThumb = document.querySelector("#software");

    const contactForm = document.querySelector(".formDiv#contactForm");
    if (!contactForm) return;

    if (this.isIndexPage()) {
      // Original index.html positioning logic
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
      // Photography page and other pages
      contactForm.style.position = "fixed";
      contactForm.style.left = "50%";
      contactForm.style.top = "50%";
      contactForm.style.transform = "translate(-50%, -50%)";
      contactForm.style.maxWidth = "90%";
      contactForm.style.maxHeight = "90%";
      contactForm.style.overflowY = "auto";
    }

    // // Check if we have thumbnails for positioning
    // const softwareThumb = document.querySelector("#software");

    // if (softwareThumb) {
    //   // Original positioning logic using thumbnails
    //   const softwareRect = softwareThumb.getBoundingClientRect();
    //   const softwareY = softwareRect.top + window.scrollY;
    //   const offsetY = 12;
    //   const formY = softwareY + offsetY;

    //   const style = window.getComputedStyle(contactForm);
    //   const formWidth = parseFloat(style.width);
    //   const formX = window.innerWidth / 2 - (formWidth / 2) + 6.75;

    //   contactForm.style.left = `${formX}px`;
    //   contactForm.style.top = `${formY}px`;
    // } else {
    //   // Fallback centered positioning
    //   const formWidth = Math.min(500, window.innerWidth * 0.9);
    //   contactForm.style.width = `${formWidth}px`;
    //   contactForm.style.left = `${(window.innerWidth - formWidth) / 2}px`;
    //   contactForm.style.top = `${window.innerHeight * 0.15}px`;
    //   contactForm.style.position = "fixed";
    // }




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
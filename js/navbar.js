// navbar.js
import { DomUtils } from "./domUtils.js";

export class Navbar {
  static BASE_SCROLL_DURATION = 6.8;
  static REFERENCE_SCROLL_HEIGHT = 1000;
  static landscapeMediaQuery = window.matchMedia(
    "(orientation: landscape) and (max-width: 991.98px) and (max-height: 600px)"
  );

  constructor(selectors) {
    if (!selectors) throw new Error("Navbar requires selectors object");
    this.selectors = selectors;
    this.domUtils = new DomUtils(selectors);
    this.elements = this.domUtils.elements;
    this.hoverTimeout = null;
    this.setupMediaListeners();
  }

  setupMediaListeners() {
    Navbar.landscapeMediaQuery.addEventListener('change', () => {
      this.handleOrientationChange();
    });
  }

  handleOrientationChange() {
    // Clear cached values
    this.domUtils.cachedEndTopY = null;
    this.domUtils.cachedEndBottomY = null;

    // Update positions
    this.domUtils.updateEndTopY();
    this.domUtils.updateEndBottomY();

    // Recalculate any dependent values
    if (this.domUtils.elements.thumbElements) {
      this.domUtils.collectThumbs();
    }
  }

  init(triggerOffset = 320) {
    if (!this.elements) {
      console.error("Navbar elements missing!");
      return;
    }
    this.enableStickyNavbar(triggerOffset);
    this.setupNavbarEvents();
    this.setupDynamicLinks();
  }

  autoScrollNow() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      console.log("No scrollable space");
      return;
    }

    gsap.to(document.documentElement, {
      scrollTo: { y: maxScroll, autoKill: false },
      duration: 5.8,


      ease: CustomEase.create(
        "custom",
        "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1"
      ),
    });
  }

  showWip() {
    if (!this.elements.thumbElements?.length) {
      console.error("thumbElements missing!");
      return;
    }

    this.updateWIPDimensions();
    document.getElementById("wip").style.display = "block";
    this.domUtils.collectThumbs();
  }

  hideWip() {
    document.getElementById("wip").style.display = "none";
  }

  hideScrollBar() {
    document.documentElement.style.overflow = "hidden";
  }

  showScrollBar() {
    document.documentElement.style.overflow = "";
  }

  /* -------------------- Internal Methods -------------------- */

  enableStickyNavbar(triggerOffset) {
    $(window).scroll(() => {
      const scrollDistOffset = $(".scrollDist").offset()?.top || 0;
      const scrollDistHeight = $(".scrollDist").outerHeight() || 0;
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();

      const isLandscapeSmall = Navbar.landscapeMediaQuery.matches;
      const isSmallHeight = windowHeight < triggerOffset;
      const inSmallHeightScrollRange = scrollTop > scrollDistOffset &&
        scrollTop < scrollDistOffset + scrollDistHeight;
      const inNormalHeightScrollRange = scrollTop > scrollDistOffset + triggerOffset &&
        scrollTop < scrollDistOffset + scrollDistHeight;

      if (inNormalHeightScrollRange || (isLandscapeSmall && isSmallHeight && inSmallHeightScrollRange)) {
        $(".navbar").addClass("sticky");
      } else {
        $(".navbar").removeClass("sticky");
      }
    });
  }

  setupNavbarEvents() {
    // Only setup events if elements exist
    if (this.elements.navSoftware && this.elements.navDropMenuSoftware) {
      this.setupDropdownHover(
        this.elements.navSoftware,
        this.elements.navDropMenuSoftware,
        this.elements.thumbSoft
      );
    }

    if (this.elements.navMotion && this.elements.navDropMenuMotion) {
      this.setupDropdownHover(
        this.elements.navMotion,
        this.elements.navDropMenuMotion,
        this.elements.thumbMot
      );
    }

    // Add null checks for click events
    if (this.elements.navHome) {

      this.setupClickEvent(this.elements.navHome, () => this.autoScrollNow());
    }

    if (this.elements.navContact) {

      this.setupClickEvent(this.elements.navContact, () => {
        this.hideScrollBar();
        this.domUtils.updateModalDimensions();
        this.domUtils.showStatementContact();
        this.domUtils.showForm();
        this.domUtils.collectThumbs();
      });
    }

    // WIP events
    ["navAnimation", "navVideo", "navDiy", "navPhotography", "navPython", "navJava", "navSql", "navReact"]
      .forEach(id => this.setupClickEvent(this.elements[id], () => this.showWip()));
  }

  setupDynamicLinks() {
    document.querySelectorAll("a[data-link]").forEach(link => {
      link.setAttribute("href", link.dataset.link);
    });
  }

  // 
  updateWIPDimensions() {
    const wipBox = document.querySelector(".wip .box");
    const softwareThumb = document.querySelector("#software");

    if (!wipBox || !softwareThumb || !this.elements?.thumbElements?.[0]) {
      console.error("Missing elements for WIP dimensions");
      return;
    }

    // Keep existing sizing logic
    const thumbWidth = this.getThumbWidthWithoutMargin();
    const newWidth = Math.max(thumbWidth * 2 + 4, 300);
    const centerX = window.innerWidth / 2 + 8;
    const newLeft = centerX - newWidth / 2;

    // Align Y-position with #software (like updateModalDimensions)
    const softwareRect = softwareThumb.getBoundingClientRect();
    const softwareY = softwareRect.top + window.scrollY;
    const offsetY = 9.4; // Match modal's offset for consistency
    const newTop = softwareY + offsetY;

    // Apply styles
    wipBox.style.width = `${newWidth}px`;
    wipBox.style.height = `${newWidth}px`;
    wipBox.style.left = `${newLeft}px`;
    wipBox.style.top = `${newTop}px`;
    wipBox.style.position = "absolute";

    console.log("WIP positioned:", {
      softwareY,
      finalTop: newTop,
      width: newWidth
    });
  }

  /* -------------------- Helper Methods -------------------- */

  setupDropdownHover(navItem, dropdownMenu, thumbElement) {
    if (!navItem || !dropdownMenu) return;

    navItem.addEventListener("mouseenter", () => {
      this.showDropMenu(dropdownMenu);
      navItem.classList.add("active");
      if (thumbElement) thumbElement.classList.add("active");
    });

    navItem.addEventListener("mouseleave", () => {
      this.delayedHide(dropdownMenu);
      navItem.classList.remove("active");
      if (thumbElement) thumbElement.classList.remove("active");
    });

    dropdownMenu.addEventListener("mouseenter", () => this.cancelHide());
    dropdownMenu.addEventListener("mouseleave", () => this.delayedHide(dropdownMenu));
  }

  setupClickEvent(element, callback) {
    if (!element || !callback) return;
    element.addEventListener("click", callback);
  }

  showDropMenu(menu) {
    if (menu) menu.style.display = "flex";
  }

  hideDropdown(menu) {
    if (menu) menu.style.display = "none";
  }

  delayedHide(menu) {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = setTimeout(() => this.hideDropdown(menu), 200);
  }

  cancelHide() {
    clearTimeout(this.hoverTimeout);
  }

  getThumbWidthWithMargin() {
    if (!this.elements.thumbElements?.[0]) return 0;
    const style = window.getComputedStyle(this.elements.thumbElements[0]);
    return parseFloat(style.width) + parseFloat(style.marginRight) * 2;
  }

  getThumbWidthWithoutMargin() {
    if (!this.elements.thumbElements?.[0]) return 0;
    return parseFloat(window.getComputedStyle(this.elements.thumbElements[0]).width);
  }

  getEndTopY() {
    // Implement or import this from domUtils
    return window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches
      ? window.innerHeight * 1.275
      : window.innerHeight * 1.325;
  }
}

/* -------------------- Legacy Exports for Backward Compatibility -------------------- */
export function createNavbar(selectors) {
  return new Navbar(selectors);
}

export const autoScrollNow = (selectors) => new Navbar(selectors).autoScrollNow();
export const showWip = (selectors) => new Navbar(selectors).showWip();
export const hideWip = (selectors) => new Navbar(selectors).hideWip();
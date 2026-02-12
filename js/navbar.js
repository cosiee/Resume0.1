import { CloudTransition } from "./cloudTransition.js";
import { DomUtils } from "./domUtils.js";
import { Animations } from "./animations.js";

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
    window.pageDomUtils = this.domUtils; //added for nailedIt
    this.elements = this.domUtils.elements;
    this.hoverTimeout = null;
    this._lastClick = 0;
    this._transitionActive = false;
    this.setupMediaListeners();
    this.initializeFormCloseButton();
  }

  setupMediaListeners() {
    Navbar.landscapeMediaQuery.addEventListener("change", () =>
      this.handleOrientationChange()
    );
  }

  handleOrientationChange() {
    this.domUtils.cachedEndTopY = null;
    this.domUtils.cachedEndBottomY = null;
    this.domUtils.updateEndTopY();
    this.domUtils.updateEndBottomY();
    if (this.domUtils.elements.thumbElements) this.domUtils.collectThumbs();
  }

  init(triggerOffset = 320) {
    if (!this.elements) {
      console.error("Navbar elements missing!");
      return;
    }
    this.enableStickyNavbar(triggerOffset);
    this.setupNavbarEvents();
    this.setupDynamicLinks();
    this.setupMobileBehavior();
  }

  autoScrollNow() {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      console.log("No scrollable space");
      return;
    }
    gsap.to(document.documentElement, {
      scrollTo: { y: maxScroll, autoKill: false },
      duration: 3.8,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1"
      ),
    });
  }

  setupMobileBehavior() {
    const navToggler = document.querySelector(".navbar-toggler");
    if (navToggler) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
          document.querySelector(".navbar").classList.add("scrolled");
          navToggler.style.visibility = "visible";
          navToggler.style.opacity = "1";
        } else {
          document.querySelector(".navbar").classList.remove("scrolled");
          navToggler.style.visibility = "hidden";
          navToggler.style.opacity = "0";
        }
      });
      if (window.scrollY > 20) {
        document.querySelector(".navbar").classList.add("scrolled");
        navToggler.style.visibility = "visible";
        navToggler.style.opacity = "1";
      }
    }
  }

  showWip() {
    const wipElement = document.getElementById("wip");
    if (!wipElement) {
      console.warn("WIP element not found in DOM");
      return;
    }
    this.updateWIPDimensions();
    wipElement.style.display = "block";
    if (this.domUtils.isIndexPage() && this.elements.thumbElements?.length)
      this.domUtils.collectThumbs();
  }

  updateWIPDimensions() {
    const wipBox = document.querySelector(".wip .box");
    if (!wipBox) return;
    if (this.domUtils.isIndexPage()) {
      const softwareThumb = document.querySelector("#software");
      if (softwareThumb && this.elements?.thumbElements?.[0]) {
        const thumbWidth = this.domUtils.getThumbWidthWithoutMargin();
        const newWidth = Math.max(thumbWidth * 2 + 4, 300);
        const centerX = window.innerWidth / 2 + 8;
        const newLeft = centerX - newWidth / 2;
        const softwareRect = softwareThumb.getBoundingClientRect();
        const softwareY = softwareRect.top + window.scrollY;
        const offsetY = 9.4;
        const newTop = softwareY + offsetY;
        wipBox.style.width = `${newWidth}px`;
        wipBox.style.height = `${newWidth}px`;
        wipBox.style.left = `${newLeft}px`;
        wipBox.style.top = `${newTop}px`;
        wipBox.style.position = "absolute";
        return;
      }
    }
    const center = this.domUtils.getViewportCenter();
    const baseSize = Math.min(550, window.innerWidth * 0.85);
    wipBox.style.width = `${baseSize}px`;
    wipBox.style.height = `${baseSize}px`;
    wipBox.style.left = `${center.x - baseSize / 2}px`;
    wipBox.style.top = `${center.y * 0.25}px`;
    wipBox.style.position = "fixed";
  }

  hideWip() {
    const wipElement = document.getElementById("wip");
    if (wipElement) wipElement.style.display = "none";
  }
  hideScrollBar() {
    document.documentElement.style.overflow = "hidden";
  }
  showScrollBar() {
    document.documentElement.style.overflow = "";
  }

  enableStickyNavbar(triggerOffset) {
    $(window).scroll(() => {
      const scrollDistOffset = $(".scrollDist").offset()?.top || 0;
      const scrollDistHeight = $(".scrollDist").outerHeight() || 0;
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      const isLandscapeSmall = Navbar.landscapeMediaQuery.matches;
      const isSmallHeight = windowHeight < triggerOffset;
      const inSmallHeightScrollRange =
        scrollTop > scrollDistOffset &&
        scrollTop < scrollDistOffset + scrollDistHeight;
      const inNormalHeightScrollRange =
        scrollTop > scrollDistOffset + triggerOffset &&
        scrollTop < scrollDistOffset + scrollDistHeight;
      if (
        inNormalHeightScrollRange ||
        (isLandscapeSmall && isSmallHeight && inSmallHeightScrollRange)
      )
        $(".navbar").addClass("sticky");
      else $(".navbar").removeClass("sticky");
    });
  }

  setupNavbarEvents() {
    if (this.elements.navSoftware && this.elements.navDropMenuSoftware)
      this.setupDropdownHover(
        this.elements.navSoftware,
        this.elements.navDropMenuSoftware,
        this.elements.thumbSoft
      );
    if (this.elements.navMotion && this.elements.navDropMenuMotion)
      this.setupDropdownHover(
        this.elements.navMotion,
        this.elements.navDropMenuMotion,
        this.elements.thumbMot
      );
    if (this.elements.navHome)
      this.setupClickEvent(this.elements.navHome, (e) => {
        if (e.target.hasAttribute("data-transition-nav")) {
          e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute("data-link"));
        }
      });
    if (this.elements.navContact)
      this.setupClickEvent(this.elements.navContact, (e) => {
        if (this.elements.navContact.tagName === "A") e.preventDefault();
        this.hideScrollBar();
        this.domUtils.formControl();
        this.domUtils.showStatementContact();
        this.domUtils.showForm();
        if (this.domUtils.isIndexPage()) this.domUtils.collectThumbs();
        console.log("Contact form opened on:", this.domUtils.detectPage());
      });
    this.initializeFormCloseButton();
    ["navPython", "navJava", "navSql", "navReact"].forEach((id) => {
      if (this.elements[id])
        this.setupClickEvent(this.elements[id], () => {
          this.showWip();
          this.hideScrollBar();
        });
    });
    if (this.elements.navPhotography)
      this.setupClickEvent(this.elements.navPhotography, (e) => {
        if (e.target.hasAttribute("data-transition-nav")) {
          e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute("data-link"));
        }
      });
    if (this.elements.navDiy)
      this.setupClickEvent(this.elements.navDiy, (e) => {
        if (e.target.hasAttribute("data-transition-nav")) {
          e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute("data-link"));
        }
      });
    if (this.elements.navVideo)
      this.setupClickEvent(this.elements.navVideo, (e) => {
        if (e.target.hasAttribute("data-transition-nav")) {
          e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute("data-link"));
        }
      });
    if (this.elements.navAnimation)
      this.setupClickEvent(this.elements.navAnimation, (e) => {
        if (e.target.hasAttribute("data-transition-nav")) {
          e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute("data-link"));
        }
      });
    const wipClose = document.getElementById("modalWipClose");
    if (wipClose)
      wipClose.addEventListener("click", (e) => {
        e.preventDefault();
        this.hideWip();
        this.showScrollBar();
      });
  }

  async handleTransitionNavigation(url) {
    try {
      document.documentElement.style.pointerEvents = "none";
      sessionStorage.setItem("shouldTransitionIn", "true");
      const animations = new Animations(this.domUtils.elements);
      const success = await animations.cloudTransitionOut(url);
      if (!success) throw new Error("Transition failed");
    } catch (error) {
      console.error("Transition failed:", error);
      window.location.href = url;
    } finally {
      document.documentElement.style.pointerEvents = "";
    }
  }

  initializeFormCloseButton() {
    const attachCloseHandler = () => {
      const closeButton = document.getElementById("contactFormClose");
      if (closeButton && !closeButton._closeListenerAttached) {
        closeButton.addEventListener("click", (e) => {
          e.preventDefault();
          this.handleFormClose();
        });
        closeButton._closeListenerAttached = true;
      }
    };
    attachCloseHandler();
  }

  handleFormClose() {
    const form = document.getElementById("contactForm");
    if (form) form.style.display = "none";
    const statement = document.getElementById("statementContact");
    if (statement) statement.style.display = "none";
    this.showScrollBar();
    this.domUtils.enablePageInteractions();
    if (this.domUtils.isIndexPage()) {
      document.getElementById("thumbnails").style.display = "block";
      this.domUtils.spaceoutThumbs();
    }
  }

  setupDynamicLinks() {
    document
      .querySelectorAll("a[data-link]")
      .forEach((link) => link.setAttribute("href", link.dataset.link));
  }

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
    dropdownMenu.addEventListener("mouseleave", () =>
      this.delayedHide(dropdownMenu)
    );
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
    return this.domUtils.getThumbWidthWithMargin();
  }
  getThumbWidthWithoutMargin() {
    return this.domUtils.getThumbWidthWithoutMargin();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("mouseenter", () => {
      const menu = toggle.nextElementSibling;
      if (menu && window.innerWidth >= 992) {
        menu.classList.add("show");
        menu.style.display = "flex";
        menu.style.flexDirection = "row";
      }
    });
    toggle.addEventListener("mouseleave", () => {
      const menu = toggle.nextElementSibling;
      if (menu && window.innerWidth >= 992) {
        menu.classList.remove("show");
        menu.style.display = "none";
      }
    });
  });
});

export function createNavbar(selectors) {
  return new Navbar(selectors);
}
export const autoScrollNow = (selectors) =>
  new Navbar(selectors).autoScrollNow();
export const showWip = (selectors) => new Navbar(selectors).showWip();
export const hideWip = (selectors) => new Navbar(selectors).hideWip();

// navbar.js
// import { CloudManager } from "./cloudManager.js";
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
    this.elements = this.domUtils.elements;
    this.hoverTimeout = null;
    this._lastClick = 0;
    this._transitionActive = false;
    this.setupMediaListeners();
    this.initializeFormCloseButton();
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
    this.setupMobileBehavior();
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
setupMobileBehavior() {
  // Make mobile navbar appear on scroll like desktop
  const navToggler = document.querySelector('.navbar-toggler');
  if (navToggler) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        document.querySelector('.navbar').classList.add('scrolled');
        navToggler.style.visibility = 'visible';
        navToggler.style.opacity = '1';
      } else {
        document.querySelector('.navbar').classList.remove('scrolled');
        navToggler.style.visibility = 'hidden';
        navToggler.style.opacity = '0';
      }
    });
    
    // Initialize state on load
    if (window.scrollY > 20) {
      document.querySelector('.navbar').classList.add('scrolled');
      navToggler.style.visibility = 'visible';
      navToggler.style.opacity = '1';
    }
  }
}

  showWip() {
    const wipElement = document.getElementById("wip");

    // Safely check if WIP element exists
    if (!wipElement) {
      console.warn("WIP element not found in DOM");
      return;
    }

    // Update dimensions based on page type
    this.updateWIPDimensions();

    // Display the WIP message
    wipElement.style.display = "block";

    // Only collect thumbs if on index page with thumbnails
    if (this.domUtils.isIndexPage() && this.elements.thumbElements?.length) {
      this.domUtils.collectThumbs();
    }
  }

  updateWIPDimensionsFallback() {
    const wipBox = document.querySelector(".wip .box");
    if (!wipBox) return;

    // Center the WIP modal in the viewport
    const newWidth = Math.min(600, window.innerWidth * 0.8);
    wipBox.style.width = `${newWidth}px`;
    wipBox.style.height = `${newWidth}px`;
    wipBox.style.left = `${(window.innerWidth - newWidth) / 2}px`;
    wipBox.style.top = `${window.innerHeight * 0.2}px`;
    wipBox.style.position = "fixed";
  }

  // hideWip() {
  //   document.getElementById("wip").style.display = "none";
  // }

  hideWip() {
    const wipElement = document.getElementById("wip");
    if (wipElement) {
      wipElement.style.display = "none";
    }
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
      this.setupClickEvent(this.elements.navHome, (e) => {
        if (e.target.hasAttribute('data-transition-nav')) {
          e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute('data-link'));
        }
      });
      // this.setupClickEvent(this.elements.navHome, () => this.autoScrollNow());
    }



    if (this.elements.navContact) {
      this.setupClickEvent(this.elements.navContact, (e) => {
        if (this.elements.navContact.tagName === 'A') {
          e.preventDefault();
        }

        // 1. Hide scrollbar to prevent background scrolling
        this.hideScrollBar();

        // 2. Initialize form positioning - critical for all pages
        this.domUtils.formControl();

        // 3. Show the initial statement (before form)
        this.domUtils.showStatementContact();

        // 4. Display the form itself
        this.domUtils.showForm();

        // 5. Special handling for index page only
        if (this.domUtils.isIndexPage()) {
          // Reposition thumbnails around the form
          this.domUtils.collectThumbs();

          // Additional index-specific logic if needed
          // this.handleIndexPageFormOpen();
        }

        // For analytics or debugging
        console.log('Contact form opened on:', this.domUtils.detectPage());
      });
    }

    // Ensure close button works even if initialized early
    this.initializeFormCloseButton();



    // , "navPhotography, "navVideo",
    ["navAnimation", "navDiy", "navPython", "navJava", "navSql", "navReact"]
      .forEach(id => {
        if (this.elements[id]) {
          this.setupClickEvent(this.elements[id], () => {
            this.showWip();
            this.hideScrollBar();
          });
        }
      });
// this is handling navbar and corresponding thumbnail links
    if (this.elements.navPhotography) {
      this.setupClickEvent(this.elements.navPhotography, (e) => {
         if (e.target.hasAttribute('data-transition-nav')) {
           e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute('data-link'));
         }
      });
      
        // this.setupClickEvent(this.elements.navPhotography, () => this.autoScrollNow());
    }

    if (this.elements.navVideo) {
      this.setupClickEvent(this.elements.navVideo, (e) => {
         if (e.target.hasAttribute('data-transition-nav')) {
           e.preventDefault();
          this.handleTransitionNavigation(e.target.getAttribute('data-link'));
         }
      });
      
        // this.setupClickEvent(this.elements.navVideo, () => this.autoScrollNow());
      
    }



  

    // Close button handler
    const wipClose = document.getElementById("modalWipClose");
    if (wipClose) {
      wipClose.addEventListener("click", (e) => {
        e.preventDefault();
        this.hideWip();
        this.showScrollBar();
      });
    }
  }

  async handlePhotoClick(e) {
    e.preventDefault();
    const now = performance.now();

    // 1. Throttle rapid clicks
    if (now - this._lastClick < 1000) return;
    this._lastClick = now;

    // 2. Check if already on target page
    if (window.location.pathname.endsWith('photography.html')) return;

    // 3. Prevent duplicate transitions
    if (this._transitionActive) {
      console.log('Transition already in progress');
      return;
    }
    this._transitionActive = true;

    console.log('Initiating photography transition');

    try {
      // 4. Set transition flag for incoming page
      sessionStorage.setItem('shouldTransitionIn', 'true');

      // 5. Create animations instance
      const animations = new Animations(this.domUtils.elements);

      // 6. Schedule the transition
      const runTransition = () => {
        animations.cloudTransitionOut('photography.html')
          .catch(error => {
            console.error('Transition failed:', error);
            window.location.href = 'photography.html';
          });
      };

      // Use optimal scheduling
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(runTransition, { timeout: 500 });
      } else {
        requestAnimationFrame(() => {
          setTimeout(runTransition, 0);
        });
      }

    } catch (error) {
      console.error('Transition initialization failed:', error);
      this._transitionActive = false;
      window.location.href = 'photography.html';
    }
  }

  async handleNavigationClick(e) {
    e.preventDefault();
    await CloudTransition.handleTransitionNavigation(this.href);
  }


  async handleTransitionNavigation(url) {
    try {
      // 1. Freeze UI
      document.documentElement.style.pointerEvents = 'none';

      // 2. Set transition flags
      sessionStorage.setItem('shouldTransitionIn', 'true');

      // 3. Start transition
      const animations = new Animations(this.domUtils.elements);
      const success = await animations.cloudTransitionOut(url);

      if (!success) {
        throw new Error('Transition failed');
      }

    } catch (error) {
      console.error('Transition failed:', error);
      // Fallback to normal navigation
      window.location.href = url;
    }
  }
  // async handleTransitionNavigation(url) {
  //   try {
  //     // 1. Freeze UI
  //     document.documentElement.style.pointerEvents = 'none';

  //     // 2. Hide interfering elements
  //     this.hideWip();
  //     this.hideScrollBar();

  //     // 3. Trigger cloud transition
  //     const transitionSuccess = await CloudTransition.triggerTransition();

  //     if (!transitionSuccess) {
  //       console.warn('Proceeding with direct navigation');
  //       window.location.href = url;
  //       return;
  //     }

  //     // 4. Optional: Add slight delay before navigation
  //     await new Promise(resolve => setTimeout(resolve, 300));

  //     // 5. Navigate
  //     window.location.href = url;

  //   } catch (error) {
  //     console.error('Transition failed:', error);
  //     // Fallback to normal navigation
  //     window.location.href = url;
  //   } finally {
  //     // Always restore pointer events if navigation fails
  //     document.documentElement.style.pointerEvents = '';
  //   }
  // }



  initializeFormCloseButton() {
    // Method to attach the event listener
    const attachCloseHandler = () => {
      const closeButton = document.getElementById('contactFormClose');

      if (closeButton && !closeButton._closeListenerAttached) {
        closeButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleFormClose();
        });
        closeButton._closeListenerAttached = true; // Prevent duplicate listeners

      }
    };

    // Check if the close button is already in the DOM
    attachCloseHandler();
  }

  handleFormClose() {
    // Hide the form
    const form = document.getElementById('contactForm');
    if (form) form.style.display = 'none';

    // Hide statement if visible
    const statement = document.getElementById('statementContact');
    if (statement) statement.style.display = 'none';

    // Restore scrolling
    this.showScrollBar();
    this.domUtils.enablePageInteractions();
    // Special handling for index page
    if (this.domUtils.isIndexPage()) {
      document.getElementById('thumbnails').style.display = 'block';
      this.domUtils.spaceoutThumbs();
    }
  }


  setupDynamicLinks() {
    document.querySelectorAll("a[data-link]").forEach(link => {
      link.setAttribute("href", link.dataset.link);
    });
  }
  updateWIPDimensions() {
    const wipBox = document.querySelector(".wip .box");
    if (!wipBox) return;

    if (this.domUtils.isIndexPage()) {
      // Original index.html thumbnail-based positioning
      const softwareThumb = document.querySelector("#software");
      if (softwareThumb && this.elements?.thumbElements?.[0]) {
        const thumbWidth = this.getThumbWidthWithoutMargin();
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

    // Fallback positioning for all other pages
    const center = this.domUtils.getViewportCenter();
    const baseSize = Math.min(550, window.innerWidth * 0.85);

    wipBox.style.width = `${baseSize}px`;
    wipBox.style.height = `${baseSize}px`;
    wipBox.style.left = `${center.x - (baseSize / 2)}px`;
    wipBox.style.top = `${center.y * 0.25}px`;
    wipBox.style.position = "fixed";
  }

  // updateWIPDimensions() {
  //   const wipBox = document.querySelector(".wip .box");
  //   const softwareThumb = document.querySelector("#software");

  //   if (!wipBox) return;

  //   if (this.domUtils.isIndexPage() && softwareThumb) {
  //     // Original index.html positioning logic
  //     const thumbWidth = this.getThumbWidthWithoutMargin();
  //     const newWidth = Math.max(thumbWidth * 2 + 4, 300);
  //     const centerX = window.innerWidth / 2 + 8;
  //     const newLeft = centerX - newWidth / 2;

  //     const softwareRect = softwareThumb.getBoundingClientRect();
  //     const softwareY = softwareRect.top + window.scrollY;
  //     const offsetY = 9.4;
  //     const newTop = softwareY + offsetY;

  //     wipBox.style.width = `${newWidth}px`;
  //     wipBox.style.height = `${newWidth}px`;
  //     wipBox.style.left = `${newLeft}px`;
  //     wipBox.style.top = `${newTop}px`;
  //     wipBox.style.position = "absolute";
  //   } else {
  //     // Standard positioning for all other pages
  //     const center = this.domUtils.getViewportCenter();
  //     const baseSize = Math.min(550, window.innerWidth * 0.85);

  //     wipBox.style.width = `${baseSize}px`;
  //     wipBox.style.height = `${baseSize}px`;
  //     wipBox.style.left = `${center.x - (baseSize / 2)}px`;
  //     wipBox.style.top = `${center.y * 0.25}px`;
  //     wipBox.style.position = "fixed";
  //   }
  // }
  // 
  // updateWIPDimensions() {
  //   const wipBox = document.querySelector(".wip .box");
  //   const softwareThumb = document.querySelector("#software");

  //   if (!wipBox || !softwareThumb || !this.elements?.thumbElements?.[0]) {
  //     console.error("Missing elements for WIP dimensions");
  //     return;
  //   }

  //   // Keep existing sizing logic
  //   const thumbWidth = this.getThumbWidthWithoutMargin();
  //   const newWidth = Math.max(thumbWidth * 2 + 4, 300);
  //   const centerX = window.innerWidth / 2 + 8;
  //   const newLeft = centerX - newWidth / 2;

  //   // Align Y-position with #software (like updateModalDimensions)
  //   const softwareRect = softwareThumb.getBoundingClientRect();
  //   const softwareY = softwareRect.top + window.scrollY;
  //   const offsetY = 9.4; // Match modal's offset for consistency
  //   const newTop = softwareY + offsetY;

  //   // Apply styles
  //   wipBox.style.width = `${newWidth}px`;
  //   wipBox.style.height = `${newWidth}px`;
  //   wipBox.style.left = `${newLeft}px`;
  //   wipBox.style.top = `${newTop}px`;
  //   wipBox.style.position = "absolute";

  //   console.log("WIP positioned:", {
  //     softwareY,
  //     finalTop: newTop,
  //     width: newWidth
  //   });
  // }

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
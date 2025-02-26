// navbar.js
import { showWip, hideWip } from "./messagesAndForms";
// Handles the sticky navbar logic
export function enableStickyNavbar(triggerOffset) {
  $(window).scroll(function () {
    var scrollDistOffset = $(".scrollDist").offset()?.top || 0;
    var scrollDistHeight = $(".scrollDist").outerHeight() || 0;
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    var isLandscapeSmall = window.matchMedia(
      "(orientation: landscape) and (max-width: 991.98px)"
    ).matches;
    
    var isSmallHeight = windowHeight < triggerOffset;

    var inSmallHeightScrollRange =
      scrollTop > scrollDistOffset &&
      scrollTop < scrollDistOffset + scrollDistHeight;
    
    var inNormalHeightScrollRange =
      scrollTop > scrollDistOffset + triggerOffset &&
      scrollTop < scrollDistOffset + scrollDistHeight;
    // Apply sticky logic
    if (
      inNormalHeightScrollRange ||
      (isLandscapeSmall && isSmallHeight && inSmallHeightScrollRange)
    ) {
      $(".navbar").addClass("sticky");
      console.log("Navbar is now sticky"); // ✅ Debugging
    } else {
      $(".navbar").removeClass("sticky");
      console.log("Navbar is NOT sticky"); // ✅ Debugging
    }
  });
}


// Assigns href to navbar links
export function setupDynamicLinks() {
  document.querySelectorAll("a[data-link]").forEach((link) => {
    link.setAttribute("href", link.dataset.link);
  });
}

// navbar.js - Centralized Navbar Behavior

let hoverTimeout; // Used for delayed dropdown hiding

export function setupNavbarEvents(domElements) {
  if (!domElements) {
    console.error("Navbar elements not found!");
    return;
  }

  // Setup dropdown hover behavior
  setupDropdownHover(domElements.navSoftware, domElements.navDropMenuSoftware, domElements.thumbSoft);
  setupDropdownHover(domElements.navMotion, domElements.navDropMenuMotion, domElements.thumbMot);

  // Setup click behaviors
  setupClickEvent(domElements.navHome, autoScrollNow);
  setupClickEvent(domElements.navContact, () => {
    hideScrollBar();
    showStatementContact();
    showForm();
  });

  // Attach "Work In Progress" (WIP) message to specific links
  ["navAnimation", "navVideo", "navDiy", "navPhotography", "navPython", "navJava", "navReact"].forEach((id) => {
    setupClickEvent(domElements[id], showWip);
  });
}

// 🔹 Handles dropdown hover behavior
function setupDropdownHover(navItem, dropdownMenu, thumbElement) {
  if (!navItem || !dropdownMenu || !thumbElement) return;

  navItem.addEventListener("mouseenter", function () {
    showDropMenu(dropdownMenu);
    navItem.classList.add("active");
    thumbElement.classList.add("active");
  });

  navItem.addEventListener("mouseleave", function () {
    delayedHide(dropdownMenu);
    navItem.classList.remove("active");
    thumbElement.classList.remove("active");
  });

  dropdownMenu.addEventListener("mouseenter", cancelHide);
  dropdownMenu.addEventListener("mouseleave", () => delayedHide(dropdownMenu));
}

// 🔹 Handles click events
function setupClickEvent(navItem, callback) {
  if (!navItem || !callback) return;
  navItem.addEventListener("click", callback);
}

// 🔹 Show dropdown menu
function showDropMenu(menu) {
  menu.style.display = "flex";
}

// 🔹 Hide dropdown menu
function hideDropdown(menu) {
  menu.style.display = "none";
}

// 🔹 Delayed hiding (smooth interaction)
function delayedHide(menu) {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => {
    hideDropdown(menu);
  }, 200);
}

// 🔹 Cancel hide delay (keep menu open when hovered)
function cancelHide() {
  clearTimeout(hoverTimeout);
}

export function autoScrollNow() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  console.log("maxScroll: ", maxScroll);
  if (maxScroll <= 0) {
    console.log("No scrollable space");
    return; // Exit if there's no scrollable space
  }

  // Automatically scroll to the bottom over # seconds on page load
  gsap.to(document.documentElement, {
    // Explicitly target document root for scrolling
    scrollTo: {
      y: maxScroll, // Scroll to the bottom of the page dynamically
      autoKill: false, // Disable autoKill to prevent interruptions
    },
    duration: SCROLL_DURATION, // Scroll over # seconds
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1 "
    ), // Easing function for scroll
  });
}
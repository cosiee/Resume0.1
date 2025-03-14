// navbar.js
import {
  getDomElements, getEndTopY, getThumbWidthWithoutMargin,
  updateDimensionsNoMargins, showStatementContact,
  showForm
} from "./domUtils.js";


const domElements = getDomElements();
export const SCROLL_DURATION = 6.8;


const totalThumbWidth = getThumbWidthWithMargin();


export function setupNavbar(domElements, triggerOffset = 320) {
  if (!domElements) {
    console.error(" Navbar elements missing!");
    return;
  }
  enableStickyNavbar(triggerOffset); // Make navbar sticky
  setupNavbarEvents(domElements); // Attach event listeners
  setupDynamicLinks(); // Assign dynamic links
}

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
    } else {
      $(".navbar").removeClass("sticky");
    }
  });
}


// Assigns href to navbar links
export function setupDynamicLinks() {
  document.querySelectorAll("a[data-link]").forEach((link) => {
    link.setAttribute("href", link.dataset.link);
  });
}

let hoverTimeout;

export function setupNavbarEvents(domElements) {
  if (!domElements) {
    console.error("Navbar elements not found!");
    return;
  }
  // Setup dropdown hover behaviour
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
function setupDropdownHover(navItem, dropdownMenu, thumbElements) {
  if (!navItem || !dropdownMenu) {
    console.error(" Missing required navbar elements:", { navItem, dropdownMenu, thumbElements });
    return;
  }

  navItem.addEventListener("mouseenter", function () {
    showDropMenu(dropdownMenu);
    navItem.classList.add("active");
    if (thumbElements) thumbElements.classList.add("active");
  });

  navItem.addEventListener("mouseleave", function () {
    delayedHide(dropdownMenu);
    navItem.classList.remove("active");
    if (thumbElements) thumbElements.classList.remove("active");
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

// export function autoScrollNow() {
//   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//   console.log("maxScroll: ", maxScroll);
//   if (maxScroll <= 0) {
//     console.log("No scrollable space");
//     return; // Exit if there's no scrollable space
//   }

//   // Automatically scroll to the bottom over # seconds on page load
//   gsap.to(document.documentElement, {
//     // Explicitly target document root for scrolling
//     scrollTo: {
//       y: maxScroll, // Scroll to the bottom of the page dynamically
//       autoKill: false, // Disable autoKill to prevent interruptions
//     },
//     duration: SCROLL_DURATION, // Scroll over # seconds
//     ease: CustomEase.create(
//       "custom",
//       "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1 "
//     ), // Easing function for scroll
//   });
// }


const BASE_SCROLL_DURATION = 6.8; // 100% max scroll time
const REFERENCE_SCROLL_HEIGHT = 1000; // Assume 2000px as full duration reference

export function autoScrollNow() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) {
    console.log("No scrollable space");
    return;
  }

  // Dynamically calculate SCROLL_DURATION based on maxScroll
  const scrollPercentage = Math.min(maxScroll / REFERENCE_SCROLL_HEIGHT, 1); // Max 100%
  const SCROLL_DURATION = BASE_SCROLL_DURATION * scrollPercentage;

  gsap.to(document.documentElement, {
    scrollTo: { y: maxScroll, autoKill: false },
    duration: SCROLL_DURATION, // ✅ Dynamic duration
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1 "
    ),
    
  });
}



// Displays WIP message
export function showWip() {
  const domElements = getDomElements();

  if (!domElements.thumbElements || domElements.thumbElements.length === 0) {
    console.error("Error: thumbElements is missing or empty!", domElements.thumbElements);
    return;
  }

  const endTopY = getEndTopY();
  updateWIPDimensions(endTopY, domElements.thumbElements);
  updateDimensionsNoMargins();
  document.getElementById("wip").style.display = "block";
  
}

// Hides WIP message
export function hideWip() {
  document.getElementById("wip").style.display = "none";
}

// Hides the scrollbar
export function hideScrollBar() {
  document.documentElement.style.overflow = "hidden"; // Hide scroll on the entire document
}

// Shows the scrollbar
export function showScrollBar() {
  document.documentElement.style.overflow = ""; // Show scroll on the entire document
}

export function updateWIPDimensions(endTopY, thumbElements) {
  const wip = document.querySelector(".wip .box");

  if (!thumbElements || thumbElements.length === 0) {
    console.error(" Error: thumbElements is missing or empty! in updateWIPDimensions()-navbar.js", thumbElements);
    return;
  }
  if (!wip) {
    console.error("Error: wip is undefined in updateWIPDimensions!");
    return
  }
  if (!wip || !thumbElements) {
    console.error("Missing elements:", { wip, thumbElements });
    return;
  }

  const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();
  // Calculate new width and height for the wip message 
  const newWidth = Math.max(thumbWidthWithoutMargin * 2 + 4, 300);
  const newHeight = newWidth; // Assuming we want a square modal

  // Update wip message dimensions
  wip.style.width = `${newWidth}px`;
  wip.style.height = `${newHeight}px`;

  // Calculate the center of the screen
  const centerX = window.innerWidth / 2 + 8; //refining positioning

  // Calculate the new left position to center the modal box- x axis
  const newLeft = centerX - newWidth / 2;
  // Use the passed endTopY for the new top position
  const newTop = getEndTopY() + 9.4; //  works for alignment on y axis

  wip.style.position = "absolute";
  wip.style.left = `${newLeft}px`;
  wip.style.top = `${newTop}px`;

}

export function getThumbWidthWithMargin() {
  const computedStyle = window.getComputedStyle(domElements.thumbElements[0]);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));
  const thumbMargin = parseFloat(
    computedStyle.getPropertyValue("margin-right")
  );

  return thumbWidth + thumbMargin * 2;
}



export const landscapeMediaQuery = window.matchMedia(
  "(orientation: landscape) and (max-width: 991.98px) and (max-height: 600px)"
);





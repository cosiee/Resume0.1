// navbar.js
// import { showWip, hideWip } from "./messagesAndForms";
// Handles the sticky navbar logic

// Main function to initialize the navbar
import { getDomElements, getEndTopY } from "./domUtils.js";


const domElements = getDomElements(); 
export const SCROLL_DURATION = 6.8;


const totalThumbWidth = getThumbWidthWithMargin();


export function setupNavbar( domElements, triggerOffset = 320) {
  if (!domElements) {
    console.error("❌ Navbar elements missing!");
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

// navbar.js - Centralized Navbar Behavior

let hoverTimeout; // Used for delayed dropdown hiding

export function setupNavbarEvents(domElements) {
  if (!domElements) {
    console.error("Navbar elements not found!");
    return;
  }

  console.log("✅ domElements before setupDropdownHover:", domElements);
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

// export function showStatementContact() {
//   updateDimensionsNoMargins();
//   document.getElementById("statementContact").style.display = "block";
//   document.getElementById("contactForm").style.display = "none";
//   collectThumbs();
// }

// 🔹 Handles dropdown hover behavior
function setupDropdownHover(navItem, dropdownMenu, thumbElements) {
  if (!navItem || !dropdownMenu) {
    console.error("❌ Missing required navbar elements:", { navItem, dropdownMenu, thumbElements });
    return;
  }

  navItem.addEventListener("mouseenter", function () {
    showDropMenu(dropdownMenu);
    navItem.classList.add("active");
    if (thumbElements) thumbElements.classList.add("active"); // ✅ Only add if exists
  });

  navItem.addEventListener("mouseleave", function () {
    delayedHide(dropdownMenu);
    navItem.classList.remove("active");
    if (thumbElements) thumbElements.classList.remove("active"); // ✅ Only remove if exists
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

// Displays WIP message
export function showWip() {
  // // const domElements = getDomElements(); // ✅ Ensure we have latest elements

  // console.log("✅ domElements in showWip:", domElements); // ✅ Debugging

  // if (!domElements.thumbElements || domElements.thumbElements.length === 0) {
  //   console.error("❌ Error: thumbElements is missing or empty!", domElements.thumbElements);
  //   return;
  // }
  // updateWIPDimensions(getEndTopY(), domElements.thumbElements);
  // updateDimensionsNoMargins();
  // document.getElementById("wip").style.display = "block";

  const domElements = getDomElements();
  console.log("✅ domElements in showWip:", domElements);

  if (!domElements.thumbElements || domElements.thumbElements.length === 0) {
    console.error("❌ Error: thumbElements is missing or empty!", domElements.thumbElements);
    return;
  }

  const endTopY = getEndTopY(); // ✅ Fetch value dynamically
  console.log("✅ Fetched endTopY in navbar.js:", endTopY);

  updateWIPDimensions(endTopY, domElements.thumbElements);
  updateDimensionsNoMargins();
  document.getElementById("wip").style.display = "block";


  collectThumbs();
}
//   updateWIPDimensions(getEndTopY(), thumbElements);
//   updateDimensionsNoMargins();
//   document.getElementById("wip").style.display = "block";
//   document.getElementById("contactForm").style.display = "none";
// }


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
    console.error("❌ Error: thumbElements is missing or empty! in updateWIPDimensions()-navbar.js", thumbElements);
    return;
  }
  if (!wip) {
    console.error("Error: wip is undefined in updateWIPDimensions!");
    return
  }
  if (!wip || !thumbElements){
    console.error("Missing elements:", { wip, thumbElements });
    return;
  }

  // const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();

  // // Calculate new width and height for the modal box
  // const newWidth = Math.max(thumbWidthWithoutMargin * 2 + 4, 300);
  // const newHeight = newWidth; // Assuming we want a square wip

  // // Update modal dimensions
  // wip.style.width = `${newWidth}px`;
  // wip.style.height = `${newHeight}px`;

  // // Calculate the center of the screen
  // const centerX = window.innerWidth / 2 + 6; //refining positioning

  // // Calculate the new left position to center the modal box
  // const newLeft = centerX - newWidth / 2;

  // // Use the passed endTopY for the new top position
  // const newTop = endTopY + 12.5; //  works for alignment on y axis

  // // Update modal position
  // wip.style.position = "absolute";
  // wip.style.left = `${newLeft}px`;
  // wip.style.top = `${newTop}px`;

  // // modalBox.style.display = "block";

  const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();
  const newWidth = Math.max(thumbWidthWithoutMargin * 2 + 4, 300);
  const newHeight = newWidth; // Assuming a square WIP

  wip.style.width = `${newWidth}px`;
  wip.style.height = `${newHeight}px`;

  const centerX = window.innerWidth / 2 + 6;
  const newLeft = centerX - newWidth / 2;
  const newTop = endTopY + 12.5;

  wip.style.position = "absolute";
  wip.style.left = `${newLeft}px`;
  wip.style.top = `${newTop}px`;

  console.log("✅ WIP dimensions updated with thumbElements.");
}

// export function getThumbWidthWithoutMargin() {
//   // const domElements = getDomElements();
//   const computedStyle = window.getComputedStyle(domElements.thumbElements[0]);
//   const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));

//   return thumbWidth;
// }

export function getThumbMargin() {
  const computedStyle = window.getComputedStyle(domElements.thumbElements[0]);
  const thumbMargin = parseFloat(
    computedStyle.getPropertyValue("margin-right")
  );
  return thumbMargin;
}

export function getThumbWidthWithMargin() {
  const computedStyle = window.getComputedStyle(domElements.thumbElements[0]);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));
  const thumbMargin = parseFloat(
    computedStyle.getPropertyValue("margin-right")
  );

  return thumbWidth + thumbMargin * 2;
}

// function getComputedStyleValue(element, property) {

//   return parseInt(window.getComputedStyle(element).getPropertyValue(property));
// }

// let screenWidthHalved = svg.viewBox.baseVal.width / 2;
// let screenHeightHalved = svg.viewBox.baseVal.height / 2;
// export let endLeftX, endRightX, endBottomY; 
// let thumbWidth = getComputedStyleValue(
//   document.querySelector(".thumbShape"),
//   "width"
// );

export const landscapeMediaQuery = window.matchMedia(
  "(orientation: landscape) and (max-width: 991.98px) and (max-height: 600px)"
);

// export function updateModalDimensions(endTopY) {
//   const modalBox = document.querySelector(".modalbox .box");

//   if (!modalBox || !domElements.thumbElements[0]) return;

//   const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();

//   // Calculate new width and height for the modal box
//   const newWidth = Math.max(thumbWidthWithoutMargin * 2 + 4, 300);
//   const newHeight = newWidth; // Assuming we want a square modal

//   // Update modal dimensions
//   modalBox.style.width = `${newWidth}px`;
//   modalBox.style.height = `${newHeight}px`;

//   // Calculate the center of the screen
//   const centerX = window.innerWidth / 2 + 6; //refining positioning

//   // Calculate the new left position to center the modal box
//   const newLeft = centerX - newWidth / 2;

//   // Use the passed endTopY for the new top position
//   const newTop = getEndTopY() + 12.5; //  works for alignment on y axis

//   // Update modal position
//   modalBox.style.position = "absolute";
//   modalBox.style.left = `${newLeft}px`;
//   modalBox.style.top = `${newTop}px`;

//   // modalBox.style.display = "block";
// }



// Contact form sizing and positioning
export function formControl(endTopY) {
  const contactForm = document.querySelector(".formDiv#contactForm");

  if (!contactForm) return;

  const computedStyleForm = window.getComputedStyle(contactForm);
  const formWidth = parseFloat(computedStyleForm.getPropertyValue("width"));
  const formHeight = parseFloat(computedStyleForm.getPropertyValue("height"));

  // Calculate form position
  const formX = window.innerWidth / 2 - formWidth / 2 + 6.75;
  const formY = getEndTopY() + 12; //+ 190;

  // Update modal position
  contactForm.style.position = "absolute";
  contactForm.style.left = `${formX}px`;
  contactForm.style.top = `${formY}px`;
}


// export function updateDimensions() {
//    thumbWidth = Math.min(300, window.innerWidth / 6);
//   screenWidthHalved = window.innerWidth / 2;
//   screenHeightHalved = window.innerHeight / 2;

//   endLeftX = screenWidthHalved - totalThumbWidth;

//   updateEndTopY(); // ✅ Update the value first
//   const updatedEndTopY = getEndTopY(); // ✅ Retrieve the updated value

//   if (updatedEndTopY === undefined) {
//     console.error("Error: getEndTopY() returned undefined!");
//     return; // Stop execution if the value is not set
//   }

//   const endTopY = updatedEndTopY; // ✅ Use a local variable, do not redeclare globally

//   endRightX = screenWidthHalved;
//   updateEndBottomY();
// }

// export function spaceoutThumbs() {
//   gsap.to("#software", {
//     x: endLeftX,
//     y: getEndTopY(),
//     duration: 1,
//     ease: "power2.out",
//   });
//   gsap.to("#photography", {
//     x: endRightX,
//     y: getEndTopY(),
//     duration: 1,
//     ease: "power2.out",
//   });
//   gsap.to("#diy", {
//     x: endRightX,
//     y: endBottomY,
//     duration: 1,
//     ease: "power2.out",
//   });
//   gsap.to("#motion", {
//     x: endLeftX,
//     y: endBottomY,
//     duration: 1,
//     ease: "power2.out",
//   });
// }


// export function updateDimensionsNoMargins() {
//   setTimeout(() => {
//     const thumbWidth = Math.min(300, window.innerWidth / 6);
//     console.log("thumbWidth: ", thumbWidth);
//     const screenWidthHalved = window.innerWidth / 2;
//     const screenHeightHalved = window.innerHeight / 2;
//     const widthThumb = getThumbWidthWithoutMargin();
//     const marginWidth = getThumbMargin();

//     updateEndTopY();

//     const updatedEndTopY = getEndTopY(); // ✅ Fetch dynamically
//     if (updatedEndTopY === undefined) {
//       console.error("Error: getEndTopY() returned undefined!");
//       return; 
//     }

//     const endTopY = updatedEndTopY + marginWidth - 15; 
//     const endLeftX = screenWidthHalved - (widthThumb + marginWidth);
//     const endRightX = screenWidthHalved - marginWidth;
//     const endBottomY = updateEndBottomY() - marginWidth - 15;

//     collectThumbs();
//     updateModalDimensions(endTopY);
//     formControl(endTopY);
//   }, 450); // delay to ensure scrollbar removal takes effect
// }

// export function updateEndBottomY() {
//   if (
//     window.matchMedia("(orientation: landscape) and (max-width: 991.98px)")
//       .matches
//   ) {
//     endBottomY = window.innerHeight * 1.275 + totalThumbWidth; // Adjust multiplier for this condition
//   } else {
//     endBottomY = window.innerHeight * 1.325 + totalThumbWidth;
//   }
//   return endBottomY;
// }

// export function collectThumbs() {
//   gsap.to(domElements.thumbElements[0], {
//     scale: 1,
//     x: endLeftX,
//     y: getEndTopY(),
//     duration: 1,
//     ease: "power2.out",
//   }); console.log("collectThumbs-navbar 467 software : ", domElements.thumbElements[0] + " endLeftX: " + endLeftX + "getEndTopY() " + getEndTopY() + " MOTION: " + motion);
//   gsap.to(photography, {
//     scale: 1,
//     x: endRightX,
//     y: getEndTopY(),
//     duration: 1,
//     ease: "power2.out",
//   });
//   gsap.to("#diy", {
//     scale: 1,
//     x: endRightX,
//     y: endBottomY,
//     duration: 1,
//     ease: "power2.out",
//   });
//   gsap.to("#motion", {
//     scale: 1,
//     x: endLeftX,
//     y: endBottomY,
//     duration: 1,
//     ease: "power2.out",
//   });
// }



// export function updateEndTopY() {
//   if (window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches) {
//     endTopY = window.innerHeight * 1.275;
//   } else {
//     endTopY = window.innerHeight * 1.325;
//   }
//   return endTopY;
// }

// export function getEndTopY() {
//   return endTopY;
// }


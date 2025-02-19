const prioritizedImages = [
  "#sky",
  "#mountMgF",
  "#mountFg",
  "#cloud1",
  "#mountBg",
  "#mountBg2",
  "#meElement",
];

const thumbnailsContainer = document.querySelector("#thumbnails");

const svg = document.querySelector("#svg");
svg.style.visibility = "hidden"; // Hide SVG initially

const cloud1 = document.getElementById("cloud1");
const thumbElement = document.querySelector(".thumbShape");

const thumbNails = document.querySelector(".thumbnails");
thumbNails.style.opacity = 0;
const seeText = document.querySelector("#see");
seeText.style.opacity = 0;
// seeText.style.visibility = "visible";

const down = document.querySelector("#down");

const meElement = document.getElementById("me");
meElement.disabled = true;
const meShaker = document.getElementById("meshaker");

const thumbnailImages = [
  ...[
    "url('css/assets/b1.webp')",
    "url('css/assets/b2.webp')",
    "url('css/assets/b3.webp')",
    "url('css/assets/b4.webp')",
    "url('css/assets/b5.webp')",
    "url('css/assets/b6.webp')",
    "url('css/assets/b7.webp')",
    "url('css/assets/b8.webp')",
    "url('css/assets/b9.webp')",
    "url('css/assets/b10.webp')",
    "url('css/assets/b12.webp')",
    "url('css/assets/b13.webp')",
    "url('css/assets/b14.webp')",
  ], // Software images
  ...[
    "url('css/assets/r1.webp')",
    "url('css/assets/r2.webp')",
    "url('css/assets/r3.webp')",
    "url('css/assets/r4.webp')",
    "url('css/assets/r5.webp')",
    "url('css/assets/r6.webp')",
    "url('css/assets/r7.webp')",
    "url('css/assets/r8.webp')",
    "url('css/assets/r9.webp')",
    "url('css/assets/r10.webp')",
    "url('css/assets/r11.webp')",
    "url('css/assets/r12.webp')",
  ], // Photography images
  ...[
    "url('css/assets/g1.webp')",
    "url('css/assets/g2.webp')",
    "url('css/assets/g3.webp')",
    "url('css/assets/g4.webp')",
    "url('css/assets/g5.webp')",
    "url('css/assets/g6.webp')",
    "url('css/assets/g7.webp')",
    "url('css/assets/g8.webp')",
    "url('css/assets/g9.webp')",
    "url('css/assets/g10.webp')",
  ], // Motion images
  ...[
    "url('css/assets/y1.webp')",
    "url('css/assets/y2.webp')",
    "url('css/assets/y3.webp')",
    "url('css/assets/y4.webp')",
    "url('css/assets/y5.webp')",
    "url('css/assets/y6.webp')",
    "url('css/assets/y7.webp')",
    "url('css/assets/y8.webp')",
    "url('css/assets/y9.webp')",
    "url('css/assets/y10.webp')",
    "url('css/assets/y11.webp')",
  ], // DIY images
];

const scrollDist = document.querySelector(".scrollDist");

document.addEventListener("DOMContentLoaded", function () {
  preloadImages(prioritizedImages, () => {
    svg.style.visibility = "visible"; // Show SVG after preloading
    mountainSkyAni();
  });
});

gsap.set(".scrollDist", {
  width: "100%",
  height: "200%",
  background: "#fff",
});

// GSAP initial setups
gsap.set("#mountains", {
  position: "fixed",
  background: "#fff",
  width: "100%",
  maxWidth: "1200px",
  height: "100%",
  top: 0,
  left: "50%",
  x: "-50%", //these are offseting, sizing needs to be adjusted so these are not required. look at svg and scroll-Dist
});

function mountainSkyAni() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".scrollDist",
        start: "top top",
        end: "bottom bottom",
        duration: 4,
        scrub: 1,
      },
    })
    .fromTo(
      "#sky",
      { scale: 1, x: 0, y: -80 },
      { scale: 1.3, x: -150, y: -650 },
      0
    )
    .fromTo(
      "#mountBg",
      { scale: 1, x: 0, y: 70 },
      { scale: 1.3, x: -150, y: -600 },
      0
    )
    .fromTo("#cloud2", { x: 400, y: 310 }, { x: -200, y: -600 }, 0)
    .fromTo(
      "#mountBg2",
      { scale: 1, x: 0, y: 110 },
      { scale: 1.3, x: -150, y: -670 },
      0
    )
    .fromTo("#cloud3", { x: -200, y: 300 }, { x: 500, y: -1000 }, 0)
    .fromTo(
      "#mountMg",
      { scale: 1, x: 0, y: 345 },
      { scale: 1.3, x: -150, y: -700 },
      0
    )
    .fromTo("#cloud4", { x: 300, y: 320 }, { x: -400, y: -850 }, 0)
    .fromTo(
      "#mountMgF",
      { scale: 1, x: 0, y: 200 },
      { scale: 1.3, x: -150, y: -750 },
      0
    )
    .fromTo(
      "#mountFg",
      { scale: 1, x: 0, y: 220 },
      { scale: 1.3, x: -150, y: -850 },
      0
    )
    .fromTo(
      "#cloud5",
      { scale: 1.5, x: -100, y: 380 },
      { scale: 3, x: 300, y: -950 },
      0
    )
    .fromTo(
      "#cloud1, #cloud1M",
      { scale: 1.3, x: -10, y: 576 },
      { scale: 2, x: -500, y: -690 },
      0
    );
}

function preloadImages(imageIds, callback) {
  let loadedCount = 0;
  const totalImages = imageIds.length;

  imageIds.forEach((id) => {
    const imgElement = document.querySelector(id);
    if (imgElement && imgElement.getAttribute("href")) {
      const img = new Image();
      img.src = imgElement.getAttribute("href");
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          callback();
        }
      };
    } else {
      loadedCount++;
      if (loadedCount === totalImages) {
        callback();
      }
    }
  });
}

function getRandomImage(imagesArray) {
  return imagesArray[Math.floor(Math.random() * imagesArray.length)];
}

function setRandomBackgroundWithTransition(containerId, imagesArray) {
  const container = document.getElementById(containerId);
  console.log("container", container);
  // Preload the next image
  const newImageUrl = getRandomImage(imagesArray)
    .replace("url('", "")
    .replace("')", "");
  const img = new Image();
  img.src = newImageUrl;

  img.onload = () => {
    // Avoid setting the same image twice
    const currentImage = container.style.backgroundImage;

    // Smoothly transition to the new image
    container.style.backgroundImage = `url('${newImageUrl}')`;
  };

  // Generate a fresh random interval and clear any previous time values
  const randomTime = Math.floor(Math.random() * (12000 - 5000)) + 5000;
  setTimeout(
    () => setRandomBackgroundWithTransition(containerId, imagesArray),
    randomTime
  );
  console.log("RandomTime 2: ", randomTime);
}

function preloadThumbnailImages(imagesArray) {
  imagesArray.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl.replace("url('", "").replace("')", "");
  });
}

preloadThumbnailImages(thumbnailImages);
thumbnailsContainer.style.visibility = "visible"; // Show thumbnails after loading

function getRandomImage(imagesArray) {
  return imagesArray[Math.floor(Math.random() * imagesArray.length)];
}

function setRandomBackgroundWithTransition(containerId, imagesArray) {
  const container = document.getElementById(containerId);
  const newImageUrl = getRandomImage(imagesArray)
    .replace("url('", "")
    .replace("')", "");
  const img = new Image();
  img.src = newImageUrl;

  img.onload = () => {
    container.style.backgroundImage = `url('${newImageUrl}')`;
  };

  const randomTime = Math.floor(Math.random() * (12000 - 5000)) + 5000;
  setTimeout(
    () => setRandomBackgroundWithTransition(containerId, imagesArray),
    randomTime
  );
}

// Initiate random backgrounds after preloading
setRandomBackgroundWithTransition("software", thumbnailImages.slice(0, 13));
setRandomBackgroundWithTransition("photography", thumbnailImages.slice(14, 25));
setRandomBackgroundWithTransition("motion", thumbnailImages.slice(26, 35));
setRandomBackgroundWithTransition("diy", thumbnailImages.slice(36));

animateMeAndWiggles();

// GSAP timeline for scroll-triggered animations
// Disable automatic scroll restoration on page reload
window.history.scrollRestoration = "manual";

function autoScrollNow() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

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
    duration: 6.8, // Scroll over # seconds
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1 "
    ), // Easing function for scroll
  });
}

function autoScroll() {
  // Reset scroll position to the top before starting animation
  window.scrollTo(0, 0);
  setTimeout(() => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

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
      duration: 6.8, // Scroll over 6.8 seconds
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1 "
      ), // Easing function for smooth scrolling
      // onStart: () => console.log('Auto-scrolling started'),
      // onUpdate: () => console.log('Scrolling in progress: ', window.scrollY), // Check the scroll progress
      // onComplete: () => console.log('Auto-scrolling completed')
    });
  }, 3000); // Add a delay of 3seconds before starting the scroll to let the layout settle
}

window.addEventListener("load", function () {
  // mountainSkyAni();
  updateMeElement();
  updateDimensions();
  updateModalDimensions();
  animateThumbs();

  autoScroll();
});

// ###################################################################################

// Thumbnails positioning based on window size
function getComputedStyleValue(element, property) {
  return parseInt(window.getComputedStyle(element).getPropertyValue(property));
}

function getThumbWidthWithMargin() {
  const computedStyle = window.getComputedStyle(thumbElement);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));
  const thumbMargin = parseFloat(
    computedStyle.getPropertyValue("margin-right")
  );

  return thumbWidth + thumbMargin * 2;
}

// const svg = document.querySelector("svg");
let thumbWidth = getComputedStyleValue(
  document.querySelector(".thumbShape"),
  "width"
);
let screenWidthHalved = svg.viewBox.baseVal.width / 2;
let screenHeightHalved = svg.viewBox.baseVal.height / 2;
let endLeftX, endRightX, endTopY, endBottomY;

const landscapeMediaQuery = window.matchMedia(
  "(orientation: landscape) and (max-width: 991.98px) and (max-height: 600px)"
);
const totalThumbWidth = getThumbWidthWithMargin();

// Functions to position thumbnails when media query is satisfied
function updateEndTopY() {
  if (
    window.matchMedia("(orientation: landscape) and (max-width: 991.98px)")
      .matches
  ) {
    endTopY = window.innerHeight * 1.275; // Adjust multiplier for this condition
  } else {
    endTopY = window.innerHeight * 1.325; // Default multiplier
  }
  return endTopY;
  console.log("Updated endTopY:", endTopY);
}
function updateEndBottomY() {
  if (
    window.matchMedia("(orientation: landscape) and (max-width: 991.98px)")
      .matches
  ) {
    endBottomY = window.innerHeight * 1.275 + totalThumbWidth; // Adjust multiplier for this condition
  } else {
    endBottomY = window.innerHeight * 1.325 + totalThumbWidth;
  }
  return endBottomY;
}

// Listen for changes in the media query
landscapeMediaQuery.addEventListener("change", updateEndTopY, updateEndBottomY);

function updateDimensions() {
  thumbWidth = Math.min(300, window.innerWidth / 6);
  screenWidthHalved = window.innerWidth / 2;
  screenHeightHalved = window.innerHeight / 2;
  // const totalThumbWidth = getThumbWidthWithMargin();
  // console.log("window.innerWidth", window.innerWidth);
  // console.log("window.innerHeight", window.innerHeight);
  endLeftX = screenWidthHalved - totalThumbWidth;

  updateEndTopY();
  // endTopY = window.innerHeight * 1.325;
  endRightX = screenWidthHalved;

  updateEndBottomY();
  // endBottomY = window.innerHeight * 1.325 + totalThumbWidth;
}

function spaceoutThumbs() {
  gsap.to("#software", {
    x: endLeftX,
    y: endTopY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#photography", {
    x: endRightX,
    y: endTopY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#diy", {
    x: endRightX,
    y: endBottomY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#motion", {
    x: endLeftX,
    y: endBottomY,
    duration: 1,
    ease: "power2.out",
  });
}

function getThumbWidthWithoutMargin() {
  const computedStyle = window.getComputedStyle(thumbElement);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));

  return thumbWidth;
}
function getThumbMargin() {
  const computedStyle = window.getComputedStyle(thumbElement);
  const thumbMargin = parseFloat(
    computedStyle.getPropertyValue("margin-right")
  );
  return thumbMargin;
}

function updateDimensionsNoMargins() {
  setTimeout(() => {
    thumbWidth = Math.min(300, window.innerWidth / 6);
    console.log("thumbWidth: ", thumbWidth);
    screenWidthHalved = window.innerWidth / 2;
    screenHeightHalved = window.innerHeight / 2;
    const widthThumb = getThumbWidthWithoutMargin();
    const marginWidth = getThumbMargin();

    endLeftX = screenWidthHalved - (widthThumb + marginWidth);
    endTopY = updateEndTopY() + marginWidth - 15;
    endRightX = screenWidthHalved - marginWidth;
    endBottomY = updateEndBottomY() - marginWidth - 15;

    collectThumbs();
    updateModalDimensions(endTopY);
    formControl(endTopY);
  }, 450); // delay to ensure scrollbar removal takes effect
}
//when 'ME' is clicked this bunches the thumbnails together for background to modal
function collectThumbs() {
  gsap.to("#software", {
    scale: 1,
    x: endLeftX,
    y: endTopY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#photography", {
    scale: 1,
    x: endRightX,
    y: endTopY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#diy", {
    scale: 1,
    x: endRightX,
    y: endBottomY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#motion", {
    scale: 1,
    x: endLeftX,
    y: endBottomY,
    duration: 1,
    ease: "power2.out",
  });
}

function updateWIPDimensions(endTopY) {
  const wip = document.querySelector(".wip .box");

  if (!wip || !thumbElement) return;

  const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();

  // Calculate new width and height for the modal box
  const newWidth = Math.max(thumbWidthWithoutMargin * 2 + 4, 300);
  const newHeight = newWidth; // Assuming we want a square wip

  // Update modal dimensions
  wip.style.width = `${newWidth}px`;
  wip.style.height = `${newHeight}px`;

  // Calculate the center of the screen
  const centerX = window.innerWidth / 2 + 6; //refining positioning

  // Calculate the new left position to center the modal box
  const newLeft = centerX - newWidth / 2;

  // Use the passed endTopY for the new top position
  const newTop = endTopY + 12.5; //  works for alignment on y axis

  // Update modal position
  wip.style.position = "absolute";
  wip.style.left = `${newLeft}px`;
  wip.style.top = `${newTop}px`;

  // modalBox.style.display = "block";
}

function updateModalDimensions(endTopY) {
  const modalBox = document.querySelector(".modalbox .box");

  if (!modalBox || !thumbElement) return;

  const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();

  // Calculate new width and height for the modal box
  const newWidth = Math.max(thumbWidthWithoutMargin * 2 + 4, 300);
  const newHeight = newWidth; // Assuming we want a square modal

  // Update modal dimensions
  modalBox.style.width = `${newWidth}px`;
  modalBox.style.height = `${newHeight}px`;

  // Calculate the center of the screen
  const centerX = window.innerWidth / 2 + 6; //refining positioning

  // Calculate the new left position to center the modal box
  const newLeft = centerX - newWidth / 2;

  // Use the passed endTopY for the new top position
  const newTop = endTopY + 12.5; //  works for alignment on y axis

  // Update modal position
  modalBox.style.position = "absolute";
  modalBox.style.left = `${newLeft}px`;
  modalBox.style.top = `${newTop}px`;

  // modalBox.style.display = "block";
}

function getScrollbarWidth() {
  // Create a temporary div element
  const div = document.createElement("div");

  // Apply styles to make it scrollable and remove it from visibility
  div.style.overflow = "scroll"; // Force scrollbars
  div.style.visibility = "hidden"; // Hide it
  div.style.position = "absolute"; // Take it out of the flow
  div.style.width = "100px"; // Set a fixed width

  // Append the div to the body
  document.body.appendChild(div);

  // Calculate the scrollbar width
  const scrollbarWidth = div.offsetWidth - div.clientWidth;

  // Remove the div after calculation
  document.body.removeChild(div);

  return scrollbarWidth;
}

// Contact form sizing and positioning
function formControl(endTopY) {
  const contactForm = document.querySelector(".formDiv#contactForm");

  if (!contactForm) return;

  const computedStyleForm = window.getComputedStyle(contactForm);
  const formWidth = parseFloat(computedStyleForm.getPropertyValue("width"));
  const formHeight = parseFloat(computedStyleForm.getPropertyValue("height"));

  // Calculate form position
  const formX = window.innerWidth / 2 - formWidth / 2 + 6.75;
  const formY = endTopY + 12; //+ 190;

  // Update modal position
  contactForm.style.position = "absolute";
  contactForm.style.left = `${formX}px`;
  contactForm.style.top = `${formY}px`;
}

function debounce(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

// Ensure updateDimensionsNoMargins is called on resize and DOM content load
window.addEventListener(
  "resize",
  debounce(() => {
    updateDimensions();
    updateModalDimensions();
    updateDimensionsNoMargins();
  }, 200)
);

// initial thumb centering animation, called in a DOMContentLoaded
function animateThumbs() {
  thumbNails.style.opacity = 1;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".scrollDist",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    })

    .fromTo(
      "#software",
      { opacity: 0.85, scale: 0.2, x: endLeftX - 1750, y: endTopY - 750 },
      { opacity: 1, scale: 1, x: endLeftX, y: endTopY },
      0
    )
    .fromTo(
      "#photography",
      { opacity: 0.85, scale: 0.2, x: endRightX + 1250, y: endTopY - 750 },
      { opacity: 1, scale: 1, x: endRightX, y: endTopY },
      0
    )
    .fromTo(
      "#diy",
      { opacity: 0.85, scale: 3, x: endRightX + 1250, y: endBottomY + 750 },
      { opacity: 1, scale: 1, x: endRightX, y: endBottomY },
      0
    )
    .fromTo(
      "#motion",
      { opacity: 0.85, scale: 3, x: endLeftX - 1750, y: endBottomY + 750 },
      { opacity: 1, scale: 1, x: endLeftX, y: endBottomY },
      0
    );
}
// #############################################################################################

const thresholdScale = 1.5; //set scale value, to allow for the crossing-fading effect SEE/ME

function getScaleValue(element) {
  if (!element) {
    console.error("Error: Element is undefined or null.");
    return 1; // Default to scale value of 1 if the element is not valid
  }

  try {
    const computedStyle = window.getComputedStyle(element);
    const matrix = computedStyle.transform || computedStyle.webkitTransform;

    if (matrix && matrix !== "none") {
      const matrixValues = matrix.split("(")[1].split(")")[0].split(",");
      const scaleX = parseFloat(matrixValues[0]);
      return Math.abs(scaleX);
    } else {
      return 1; // Default scale value if no transform is applied
    }
  } catch (error) {
    console.error("Error getting scale value:", error);
    return 1; // Default to scale value of 1 in case of error
  }
}

function updateMeElement() {
  const scaleValue = getScaleValue(cloud1);
  if (scaleValue >= thresholdScale) {
    if (meElement.style.display === "none") {
      meElement.style.display = "block"; // Enable #me
      down.style.display = "none";
      // Re-enable event listeners if necessary
      meElement.addEventListener(
        "click",
        hideScrollBar,
        updateDimensionsNoMargins
      ); //, scrollToBottom
    }
  } else {
    if (meElement.style.display !== "none") {
      meElement.style.display = "none"; // Disable #me
      down.style.display = "block";
      // Disable or remove event listeners
      meElement.removeEventListener(
        "click",
        hideScrollBar,
        updateDimensionsNoMargins
      ); //, scrollToBottom
    }
  }
}

// MutationObserver for #cloud1 element to track changes
const observer = new MutationObserver(updateMeElement);
observer.observe(cloud1, { attributes: true, childList: true, subtree: true });

// Initial call to update the state based on current scale
updateMeElement();

// Scroll event listener to toggle sticky collapsed-navbar for landscape below orienttion
$(window).scroll(function () {
  var scrollDistOffset = $(".scrollDist").offset().top;
  var scrollDistHeight = $(".scrollDist").outerHeight();
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();

  var isLandscapeSmall = window.matchMedia(
    "(orientation: landscape) and (max-width: 991.98px)"
  ).matches;
  var isSmallHeight = windowHeight < 320;
  var inSmallHeightScrollRange =
    scrollTop > scrollDistOffset &&
    scrollTop < scrollDistOffset + scrollDistHeight;
  var inNormalHeightScrollRange =
    scrollTop > scrollDistOffset + 320 &&
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

// Function to hide the scrollbar
function hideScrollBar() {
  document.documentElement.style.overflow = "hidden"; // Hide scroll on the entire document
}

// Function to show the scrollbar
function showScrollBar() {
  document.documentElement.style.overflow = ""; // Show scroll on the entire document
}

// ##########################################################################

//################ Navigation between index.html#thumbs,
// modalBox(statementContact) & Contact Form ###########

function showForm() {
  formControl();
  document.getElementById("contactForm").style.display = "block";
}

function showStatementContact() {
  updateDimensionsNoMargins();
  document.getElementById("statementContact").style.display = "block";
  document.getElementById("contactForm").style.display = "none";
}

function showWip() {
  updateWIPDimensions(endTopY - 4);
  updateDimensionsNoMargins();
  document.getElementById("wip").style.display = "block";
  document.getElementById("contactForm").style.display = "none";
}

function hideWip() {
  document.getElementById("wip").style.display = "none";
}

function centreThumbs() {
  gsap.to("#software", {
    scale: 1,
    x: endLeftX,
    y: endTopY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#photography", {
    scale: 1,
    x: endRightX,
    y: endTopY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#diy", {
    scale: 1,
    x: endRightX,
    y: endBottomY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#motion", {
    scale: 1,
    x: endLeftX,
    y: endBottomY,
    duration: 1,
    ease: "power2.out",
  });
}

function showThumbs() {
  document.getElementById("contactForm").style.display = "none";
  document.getElementById("statementContact").style.display = "none";
  document.getElementById("thumbnails").style.display = "block";
  showScrollBar();
  updateDimensions();
}

function hideForm() {
  document.getElementById("contactForm").style.display = "none";
  // document.getElementById("statementContact").style.display = "block";
}

// align SEE/ME text & ME animate wiggles
function animateMeAndWiggles() {
  // Ensure 'meElement' and 'meShaker' are declared and exist in the DOM

  if (!meElement || !meShaker) {
    console.error(
      "Required DOM elements not found. Check element IDs for 'me' and 'meshaker'."
    );
    return; // Stop further execution if elements are missing
  }

  let hoverAnimationInterval;
  let isHoverWiggling = false;
  let angle = 0; // Variable to track the wiggle angle
  let animationInterval;
  let isIdleWiggling = false; // Flag to track idle wiggle animation
  let initialTransform = ""; // Store initial centering transform

  // Function to get the width of the text element
  function getTextWidth(element) {
    return element.getBBox().width; // Get bounding box width of text element
  }

  function updateTextElementPositions() {
    // Get the SVG dimensions
    const svg = document.querySelector("svg");
    const svgWidth = svg.viewBox.baseVal.width || svg.clientWidth;
    const svgHeight = svg.viewBox.baseVal.height || svg.clientHeight;

    // Calculate the center of the SVG
    const svgCenterX = svgWidth / 2;
    const svgCenterY = svgHeight / 2;

    let seeY, meY;

    // Check if the orientation is landscape
    if (
      window.matchMedia("(orientation: landscape) and (max-width: 991.98px)")
        .matches
    ) {
      // Adjust Y positions for landscape orientation
      seeY = svgCenterY - 330;
      meY = svgCenterY - 330;
    } else {
      // Adjust Y positions for portrait orientation and larger landscape screens
      seeY = svgCenterY - 210;
      meY = svgCenterY - 210;
    }

    // Position "SEE" and "ME" at the center of the SVG with adjusted Y coordinates
    const seeX = svgCenterX;
    const meX = svgCenterX;

    // Apply the translation (without affecting rotation)
    gsap.to("#see", {
      x: seeX,
      y: seeY,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to("#me", {
      x: meX,
      y: meY,
      duration: 1,
      ease: "power2.out",
    });

    // Store the initial translation for the ME element
    initialTransform = `translate(${meX}px, ${meY}px)`;
    applyTransform(); // Apply the current transformation
    seeText.style.opacity = 0;
    down.style.opacity = 0;
  }

  // Function to apply combined transformation (centering + rotation)
  function applyTransform() {
    meElement.style.transform = `${initialTransform} rotate(${angle}deg)`; // Combine rotation and translation

    seeText.style.opacity = 1;
    down.style.opacity = 1;
    seeText.style.visibility = "visible";
  }

  // Function to handle orientation change
  function handleOrientationChange() {
    updateTextElementPositions(); // Update positions on orientation change
  }

  // Add an event listener for orientation changes
  window.addEventListener("orientationchange", handleOrientationChange);

  // Initial call to set positions correctly
  updateTextElementPositions();

  // Function to start the hover wiggle animation
  function startHoverWiggle() {
    if (!isHoverWiggling) {
      isHoverWiggling = true;
      hoverAnimationInterval = setInterval(hoverWiggle, 9); // Wiggle every #ms
    }
  }

  // Function to stop the hover wiggle animation
  function stopHoverWiggle() {
    clearInterval(hoverAnimationInterval);
    isHoverWiggling = false;
    angle = 0; // Reset angle when hover stops
    applyTransform(); // Reset to initial state
  }

  // Function to handle the hover wiggle animation
  function hoverWiggle() {
    // Update the rotation angle
    angle += 1;
    if (angle === 3 || angle === -3) {
      angle *= -1; // Reverse direction when angle reaches 5 or -5
    }
    applyTransform(); // Apply the combined transform (rotation + position)
  }

  // Function to start the idle wiggle animation
  function startIdleWiggle() {
    if (!isIdleWiggling) {
      isIdleWiggling = true;
      idleWiggle(); // Start idle wiggle animation
    }
  }

  // Function to stop the idle wiggle animation
  function stopIdleWiggle() {
    clearInterval(animationInterval);
    isIdleWiggling = false;
    angle = 0; // Reset angle
    applyTransform(); // Reset to the centered position
  }

  // Function to handle the idle wiggle animation
  function idleWiggle() {
    wiggle(); // Start the wiggle animation
    setTimeout(() => {
      stopIdleWiggle(); // Stop idle wiggle after 0.7 seconds
      setTimeout(
        startIdleWiggle,
        Math.floor(Math.random() * (16000 - 7000 + 1)) + 7000
      ); // Restart idle wiggle after a random interval
    }, 700);
  }

  // Function to handle the wiggle animation
  function wiggle() {
    let wiggleAngle = 0;
    let direction = 1;

    // Perform one iteration of the wiggle animation
    function performWiggle() {
      wiggleAngle += direction;
      if (wiggleAngle === 1 || wiggleAngle === -1) {
        direction *= -1; // Reverse direction at the extremes
      }
      meElement.style.transform = `${initialTransform} rotate(${wiggleAngle}deg)`; // Apply the wiggle transformation
    }

    // Start the animation interval for the wiggle effect
    animationInterval = setInterval(performWiggle, 30);
  }

  // Event listeners for hover wiggle on "ME"
  meShaker.addEventListener("mouseenter", function () {
    // Combine scaling with the existing transform (centering + wiggle)
    meElement.style.transform = `${initialTransform} rotate(${angle}deg)`;
    startHoverWiggle(); // Start hover wiggle
  });

  meShaker.addEventListener("mouseleave", function () {
    // Reset the scaling and keep the initial transform (centering + reset rotation)
    meElement.style.transform = `${initialTransform} rotate(0deg)`;
    stopHoverWiggle(); // Stop hover wiggle
  });
  meElement.addEventListener("mouseenter", function () {
    meElement.style.transform = `${initialTransform} rotate(0deg) scale(1.115)`;
  });
  meElement.addEventListener("mouseleave", function () {
    meElement.style.transform = `${initialTransform} rotate(0deg) scale(1)`;
  });
  // Function to dynamically update text positions on resize
  function onResize() {
    updateTextElementPositions(); // Update position on window resize
    updateDimensions();
    updateModalDimensions();
    updateDimensionsNoMargins();
  }

  // Initialize text positioning and idle wiggle on window load
  updateTextElementPositions(); // Center the text elements
  startIdleWiggle(); // Start the idle wiggle animation

  // Update text positions when window is resized
  window.onresize = onResize;
}

// Beginning of Handling hover on Thumbs Triggering Navbar elements and dropdowns

const thumbSoft = document.querySelector("#software");
const navbarSoft = document.querySelector("#softwareLink");

const thumbPhoto = document.querySelector("#photography");
const navbarPhoto = document.querySelector("#photographyLink");

const thumbMot = document.querySelector("#motion");
const navbarMot = document.querySelector("#motionLink");

const thumbDiy = document.querySelector("#diy");
const navbarDiy = document.querySelector("#diyLink");

const softwareDropMenuLink = document.querySelector("#softwareDropMenuLink");
const motionDropMenuLink = document.querySelector("#motionDropMenuLink");

// Track whether the mouse is still inside the navbar or dropdown
let hoverTimeout;

function showDropMenu(dropMenu) {
  dropMenu.style.display = "flex";
}

function hideDropdown(dropMenu) {
  dropMenu.style.display = "none";
}

// Function to handle delayed hiding of the dropdown
function delayedHide(dropdownMenu) {
  clearTimeout(hoverTimeout);

  hoverTimeout = setTimeout(() => {
    hideDropdown(dropdownMenu);
  }, 200); // 200ms delay to allow smooth interaction
}

// Function to keep the dropdown visible as long as the mouse is inside
function cancelHide() {
  clearTimeout(hoverTimeout); // Cancel any pending hide actions
}

thumbSoft.addEventListener("mouseenter", function () {
  showDropMenu(softwareDropMenuLink);
  navbarSoft.classList.add("active");
  thumbSoft.classList.add("active");
});
navbarSoft.addEventListener("mouseenter", function () {
  showDropMenu(softwareDropMenuLink);
  navbarSoft.classList.add("active");
  thumbSoft.classList.add("active");
});

thumbSoft.addEventListener("mouseleave", function () {
  delayedHide(softwareDropMenuLink);
  navbarSoft.classList.remove("active");
  thumbSoft.classList.remove("active");
});
navbarSoft.addEventListener("mouseleave", function () {
  delayedHide(softwareDropMenuLink);
  navbarSoft.classList.remove("active");
  thumbSoft.classList.remove("active");
});

softwareDropMenuLink.addEventListener("mouseenter", function () {
  cancelHide();
});

softwareDropMenuLink.addEventListener("mouseleave", function () {
  delayedHide(softwareDropMenuLink);
});

thumbMot.addEventListener("mouseenter", function () {
  showDropMenu(motionDropMenuLink);
  navbarMot.classList.add("active");
  thumbMot.classList.add("active");
});
navbarMot.addEventListener("mouseenter", function () {
  showDropMenu(motionDropMenuLink);
  navbarMot.classList.add("active");
  thumbMot.classList.add("active");
});

thumbMot.addEventListener("mouseleave", function () {
  delayedHide(motionDropMenuLink);
  navbarMot.classList.remove("active");
  thumbMot.classList.remove("active");
});
navbarMot.addEventListener("mouseleave", function () {
  delayedHide(motionDropMenuLink);
  navbarMot.classList.remove("active");
  thumbMot.classList.remove("active");
});
motionDropMenuLink.addEventListener("mouseenter", function () {
  cancelHide();
});
motionDropMenuLink.addEventListener("mouseleave", function () {
  delayedHide(motionDropMenuLink);
});

thumbPhoto.addEventListener("mouseenter", function () {
  navbarPhoto.classList.add("active");
  thumbPhoto.classList.add("active");
});

thumbPhoto.addEventListener("mouseleave", function () {
  navbarPhoto.classList.remove("active");
  thumbPhoto.classList.remove("active");
});

thumbDiy.addEventListener("mouseenter", function () {
  navbarDiy.classList.add("active");
  thumbDiy.classList.add("active");
});

thumbDiy.addEventListener("mouseleave", function () {
  navbarDiy.classList.remove("active");
  thumbDiy.classList.remove("active");
});


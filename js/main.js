// Ensure #me element is initially disabled
const meElement = document.getElementById("me");
meElement.disabled = true;

// Correctly reference the single element with ID "cloud1"
const cloud1 = document.getElementById("cloud1");
const thumbElement = document.querySelector(".thumbShape");

const thumbNails = document.querySelector(".thumbnails");
thumbNails.style.opacity=0;

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

// Random background images for thumbnails
document.addEventListener("DOMContentLoaded", function () {
  const softwareImages = [
    "url('css/assets/b1.jpg')",
    "url('css/assets/b2.jpg')",
    "url('css/assets/b3.jpg')",
    "url('css/assets/b4.jpg')",
    "url('css/assets/b5.jpg')",
    "url('css/assets/b6.jpg')",
    "url('css/assets/b7.jpg')",
    "url('css/assets/b8.jpg')",
    "url('css/assets/b9.jpg')",
    "url('css/assets/b10.jpg')",
    "url('css/assets/b12.jpg')",
    "url('css/assets/b13.jpg')",
    "url('css/assets/b14.jpg')",
  ];
  const photographyImages = [
    "url('css/assets/r1.jpg')",
    "url('css/assets/r2.jpg')",
    "url('css/assets/r3.jpg')",
    "url('css/assets/r4.jpg')",
    "url('css/assets/r5.jpg')",
    "url('css/assets/r6.jpg')",
    "url('css/assets/r7.jpg')",
    "url('css/assets/r8.jpg')",
    "url('css/assets/r9.jpg')",
    "url('css/assets/r10.jpg')",
    "url('css/assets/r11.jpg')",
    "url('css/assets/r12.jpg')",
  ];
  const motionImages = [
    "url('css/assets/g1.jpg')",
    "url('css/assets/g2.jpg')",
    "url('css/assets/g3.jpg')",
    "url('css/assets/g4.jpg')",
    "url('css/assets/g5.jpg')",
    "url('css/assets/g6.jpg')",
    "url('css/assets/g7.jpg')",
    "url('css/assets/g8.jpg')",
    "url('css/assets/g9.jpg')",
    "url('css/assets/g10.jpg')",
  ];
  const diyImages = [
    "url('css/assets/y1.jpg')",
    "url('css/assets/y2.jpg')",
    "url('css/assets/y3.jpg')",
    "url('css/assets/y4.jpg')",
    "url('css/assets/y5.jpg')",
    "url('css/assets/y6.jpg')",
    "url('css/assets/y7.jpg')",
    "url('css/assets/y8.jpg')",
    "url('css/assets/y9.jpg')",
    "url('css/assets/y10.jpg')",
    "url('css/assets/y11.jpg')",
  ];

  function getRandomImage(imagesArray) {
    return imagesArray[Math.floor(Math.random() * imagesArray.length)];
  }

  function setRandomBackground(containerId, imagesArray) {
    const container = document.getElementById(containerId);
    container.style.backgroundImage = getRandomImage(imagesArray);
    const randomTime = Math.floor(Math.random() * (10000 - 5000)) + 5000;
    setTimeout(() => setRandomBackground(containerId, imagesArray), randomTime);
  }

  setRandomBackground("software", softwareImages);
  setRandomBackground("photography", photographyImages);
  setRandomBackground("motion", motionImages);
  setRandomBackground("diy", diyImages);
});

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
  window.scrollTo(0, 0); // Force scroll to top

  // Add a small delay before calculating maxScroll to ensure everything is loaded

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
  }, 3400); // Add a delay of 3.4seconds before starting the scroll to let the layout settle
}

window.addEventListener("load", function () {
  mountainSkyAni();
  updateMeElement();
  updateDimensions();
  updateModalDimensions();
  animateThumbs();
  autoScroll();
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

const svg = document.querySelector("svg");
let thumbWidth = getComputedStyleValue(
  document.querySelector(".thumbShape"),
  "width"
);
let screenWidthHalved = svg.viewBox.baseVal.width / 2;
let screenHeightHalved = svg.viewBox.baseVal.height / 2;
let endLeftX, endRightX, endTopY, endBottomY;

function updateDimensions() {
  thumbWidth = Math.min(300, window.innerWidth / 6);
  screenWidthHalved = window.innerWidth / 2;
  screenHeightHalved = window.innerHeight / 2;
  const totalThumbWidth = getThumbWidthWithMargin();
  console.log("window.innerWidth", window.innerWidth);
  console.log("window.innerHeight", window.innerHeight);
  endLeftX = screenWidthHalved - totalThumbWidth;
  endTopY = window.innerHeight * 1.325;
  endRightX = screenWidthHalved;
  endBottomY = window.innerHeight * 1.325 + totalThumbWidth;
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
    endTopY = window.innerHeight * 1.3 + marginWidth;
    endRightX = screenWidthHalved - marginWidth;
    endBottomY = window.innerHeight * 1.3 + (widthThumb + marginWidth);


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
  const newTop = endTopY + 12.5; // 22.5 works for alignment on y axis

  // Update modal position
  modalBox.style.position = "absolute";
  modalBox.style.left = `${newLeft}px`;
  modalBox.style.top = `${newTop}px`;

  // modalBox.style.display = "block";
}
function formControl(endTopY) {
  const contactForm = document.querySelector(".formDiv#contactForm");

  // const modalBox = document.querySelector(".modalbox .box");

  if (!contactForm) return;

  const computedStyleForm = window.getComputedStyle(contactForm);
  const formWidth = parseFloat(computedStyleForm.getPropertyValue("width"));
  const formHeight = parseFloat(computedStyleForm.getPropertyValue("height"));

  // Calculate form position
  const formX = window.innerWidth / 2 - formWidth + 8;
  const formY = endTopY + 190;

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
  thumbNails.style.opacity=1;
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
      { opacity: 0, scale: 0.2, x: endLeftX - 1750, y: endTopY - 750 },
      { opacity: 1, scale: 1, x: endLeftX, y: endTopY },
      0
    )
    .fromTo(
      "#photography",
      { opacity: 0, scale: 0.2, x: endRightX + 1250, y: endTopY - 750 },
      { opacity: 1, scale: 1, x: endRightX, y: endTopY },
      0
    )
    .fromTo(
      "#diy",
      { opacity: 0, scale: 3, x: endRightX + 1250, y: endBottomY + 750 },
      { opacity: 1, scale: 1, x: endRightX, y: endBottomY },
      0
    )
    .fromTo(
      "#motion",
      { opacity: 0, scale: 3, x: endLeftX - 1750, y: endBottomY + 750 },
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
      document.getElementById("down").style.display = "none";
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
      document.getElementById("down").style.display = "block";
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

// Scroll event listener to toggle sticky navbar
$(window).scroll(function () {
  if ($(window).scrollTop() > 320) {
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
// Wait for the DOM to fully load
window.onload = function () {
  // Ensure 'meElement' and 'meShaker' are declared and exist in the DOM
  const meElement = document.getElementById("me");
  const meShaker = document.getElementById("meshaker"); // Ensure this element exists in the HTML

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

  // Function to center the text elements in the SVG
  function updateTextElementPositions() {
    // Get the SVG dimensions
    const svg = document.querySelector("svg");
    const svgWidth = svg.viewBox.baseVal.width || svg.clientWidth;
    const svgHeight = svg.viewBox.baseVal.height || svg.clientHeight;

    // Calculate the center of the SVG
    const svgCenterX = svgWidth / 2;
    const svgCenterY = svgHeight / 2;

    // Position "SEE" and "ME" at the center of the SVG
    const seeX = svgCenterX;
    const seeY = svgCenterY - 210; // Adjust Y position for SEE
    const meX = svgCenterX;
    const meY = svgCenterY - 210; // Adjust Y position for ME

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
  }

  // Function to apply combined transformation (centering + rotation)
  function applyTransform() {
    meElement.style.transform = `${initialTransform} rotate(${angle}deg)`; // Combine rotation and translation
  }

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
};

// Beginning of Handling hover on Thumbs Triggering Navbar elements ###############################

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
  // Clear any existing timeout
  clearTimeout(hoverTimeout);
  // Set a timeout to hide the menu after a short delay
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

// Function to output the height of the .scrollDist element
function outputScrollDistHeight() {
  const scrollDist = document.querySelector(".scrollDist");
  if (scrollDist) {
    console.log("Current scrollDist height:", scrollDist.offsetHeight + "px");
  }
}

// Add event listener to call the function on window resize
window.addEventListener("resize", outputScrollDistHeight);

// Initial call to log the height when the page loads
outputScrollDistHeight();

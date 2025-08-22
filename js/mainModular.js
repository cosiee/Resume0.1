// mainModular.js
import { CloudManager } from './cloudManager.js';
import { CloudTransition } from './cloudTransition.js';
import { Animations } from './animations.js';
import { DomUtils } from "./domUtils.js";
import { initThumbnails, preloadCriticalImages } from "./preload.js";
import { Navbar } from './navbar.js';




export const selectors = {
  scrollDist: ".scrollDist",

  // mountains and sky
  svg: "#svg",
  cloud1: "#cloud1",
  mountBg: "#mountBg",
  mountBg2: "#mountBg2",
  mountMg: "#mountMg",
  mountMgF: "#mountMgF",
  mountFg: "#mountFg",
  cloud2: "#cloud2",
  cloud3: "#cloud3",
  cloud4: "#cloud4",
  cloud5: "#cloud5",

  // see/me text & arrow
  seeText: "#see",
  meElement: "#me",
  meShaker: "#meshaker",
  down: "#down",

  //Navigation buttons, Statements & Form
  modalClose: "#modalClose",
  modalSig: "#modalSig",
  contactFormClose: "#contactFormClose",
  formButton: "#formButton",
  modalWipClose: "#modalWipClose",

  // Navbar Links & Dropdowns
  navHome: "#navHome",
  navSoftware: "#softwareLink",
  navDropMenuSoftware: "#softwareDropMenuLink",
  navHtml: "#navHtml",
  navCss: "#navCss",
  navJavascript: "#navJavascript",
  navJava: "#navJava",
  navPython: "#navPython",
  navSql: "#navSql",
  navReact: "#navReact",
  navPhotography: "#photographyLink",
  navDiy: "#diyLink",
  navMotion: "#motionLink",
  navDropMenuMotion: "#motionDropMenuLink",
  navAnimation: "#navAnimation",
  navVideo: "#navVideo",
  navContact: "#contactLink",

  // Thumbnails

  thumbnailsContainer: "#thumbnails",
  thumbElements: [".thumbShape"],
  thumbNails: ".thumbnails",

  software: "#software",
  photography: "#photography",
  motion: "#motion",
  diy: "#diy",



};




const navbar = new Navbar(selectors);
const duration = Navbar.BASE_SCROLL_DURATION; // For static property

// Initialize and get elements



const prioritizedImages = [
  "#sky",
  "#mountMgF",
  "#mountFg",
  "#cloud1",
  "#mountBg",
  "#mountBg2"
];


const domUtils = new DomUtils(selectors);
const domElements = domUtils.elements
const animations = new Animations(domElements);

domElements.seeText.style.opacity = 0;
domElements.down.style.opacity = 0;

const backgroundContainers = ['software', 'photography', 'motion', 'diy'];


document.addEventListener("DOMContentLoaded", async function () {
  // Hide background containers initially 
  backgroundContainers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.opacity = 0;
  });
navbar.hideScrollBar();
  try {
    // Load critical images first - this should be FIRST
    await preloadCriticalImages(prioritizedImages);

    // Make SVG visible and start animations
    if (domElements.svg) {
      domElements.svg.style.visibility = "visible";


      animations.mountainSkyAni();

      // Debugging
      // Debug cloud positions
      const debugCloudPositions = () => {
        ["cloud1", "cloud2", "cloud3", "cloud4", "cloud5"].forEach(id => {
          const el = document.getElementById(id);
          if (el) {
            const transform = el.getAttribute("transform") || "none";
            const bounds = el.getBBox();
            // console.log(`${id}:`, {
            //   transform,
            //   position: { x: bounds.x, y: bounds.y },
            //   computed: gsap.getProperty(el)
            // });
          }
        });
      };

      // Run after SVG loads
      setTimeout(debugCloudPositions, 500);

      // This should run immediately after preload
    }
console.log("Z-Index Hierarchy:");
const elements = [
  {zIndex: window.getComputedStyle(domElements.meElement).zIndex, element: domElements.meElement},
  {zIndex: window.getComputedStyle(domElements.meShaker).zIndex, element: domElements.meShaker},
  {zIndex: 1050, element: document.querySelector('#topNav')},
  {zIndex: 2, element: document.querySelector('#thumbnails')}
];
console.log(elements.filter(e => e.element));
    // Load remaining assets in background
    setTimeout(() => {
      initThumbnails();
    }, 0);

    // Setup photography link if available
    // if (domElements.navPhotography) {
    //   domElements.navPhotography.addEventListener('click', async (e) => {
    //     e.preventDefault();
    //     await CloudTransition.triggerTransition('photography.html');
    //   });
    // } else {
    //   console.warn('Photography link not found in DOM');
    // }

    // Initialize CloudTransition AFTER main animation is set up
    // CloudTransition.triggerReverse();

  } catch (error) {
    console.error("Initialization failed:", error);
    // Fallback: Still make SVG visible
    if (domElements.svg) domElements.svg.style.visibility = "visible";
  }

  // Initialize navbar and other components
  navbar.init(320);
  domUtils.updateEndTopY(); // controls positioning of elements in index.html

  // Shows thumbnails background images
  backgroundContainers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.opacity = 1;
  });
});
// ###################################################################################
// window listeners:

// Disable automatic scroll restoration on page reload
window.history.scrollRestoration = "manual";
// once 'load' event is triggered, the following functions are executed
window.addEventListener("load", function () {
  updateMeElement();
  domUtils.updateDimensions();
  domUtils.updateModalDimensions();
  animateThumbs();
  autoScroll();
  animateMeAndWiggles();
});

// Add cleanup function
function cleanup() {
  observer.disconnect();
  ScrollTrigger.getAll().forEach(st => st.kill());
  window.removeEventListener("orientationchange", handleOrientationChange);
}

// Call on beforeunload
window.addEventListener("beforeunload", cleanup);

// Listen for changes in the media query
// landscapeMediaQuery.addEventListener("change", domUtils.updateEndTopY, domUtils.updateEndBottomY);

// Handles Down Arrow link click - to auto-scroll
domElements.down.addEventListener("click", function () {
  navbar.autoScrollNow();
});

// window listeners end

// Animations, Functions, variables & listeners

// Sets up the mountain sky animation positioning
gsap.set(domElements.scrollDist, {
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


// // function mountainSkyAni() {
// //   try {
// //     const tl = gsap.timeline({
// //       scrollTrigger: {
// //         trigger: domElements.scrollDist,
// //         start: "top top",
// //         end: "bottom bottom",
// //         scrub: 1
// //       }
// //     });

// //     // Mountain animations (always run)
// //     tl.fromTo("#sky",
// //       { scale: 1, x: 0, y: -80 },
// //       { scale: 1.3, x: -150, y: -650 }, 0)
// //       .fromTo("#mountBg",
// //         { scale: 1, x: 0, y: 70 },
// //         { scale: 1.3, x: -150, y: -600 }, 0)
// //       .fromTo("#mountBg2",
// //         { scale: 1, x: 0, y: 110 },
// //         { scale: 1.3, x: -150, y: -670 }, 0)
// //       .fromTo("#mountMg",
// //         { scale: 1, x: 0, y: 345 },
// //         { scale: 1.3, x: -150, y: -700 }, 0)
// //       .fromTo("#mountMgF",
// //         { scale: 1, x: 0, y: 200 },
// //         { scale: 1.3, x: -150, y: -750 }, 0)
// //       .fromTo("#mountFg",
// //         { scale: 1, x: 0, y: 220 },
// //         { scale: 1.3, x: -150, y: -850 }, 0);

// //     // Cloud animations (only when not transitioning)
// //     if (!CloudManager.isTransitioning) {
// //       tl.fromTo("#cloud2",
// //         { opacity: 1, x: 400, y: 310 },
// //         { x: -200, y: -600 }, 0)
// //         .fromTo("#cloud3",
// //           { opacity: 1, x: -200, y: 300 },
// //           { x: 500, y: -1000 }, 0)
// //         .fromTo("#cloud4",
// //           { opacity: 1, x: 300, y: 320 },
// //           { x: -400, y: -850 }, 0)
// //         .fromTo("#cloud5",
// //           { opacity: 1, scale: 1.5, x: -100, y: 380 },
// //           { scale: 3, x: 300, y: -950 }, 0)
// //         .fromTo("#cloud1, #cloud1M",
// //           { opacity: 1, scale: 1.3, x: -10, y: 576 },
// //           { scale: 2, x: -500, y: -690 }, 0);
// //     }

// //   } catch (error) {
// //     console.error("Animation failed:", error);
// //     // Fallback: Show static background
// //     gsap.set("#sky, #mountBg, #mountMgF", { opacity: 1 });
// //   }
// // }
// // Mountain Sky Animation
// function mountainSkyAni() {
//   try {
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: domElements.scrollDist,
//           start: "top top",
//           end: "bottom bottom",
//           duration: 4,
//           scrub: 1,
//         },
//       })
//       .fromTo(
//         "#sky",
//         { scale: 1, x: 0, y: -80 },
//         { scale: 1.3, x: -150, y: -650 },
//         0
//       )
//       .fromTo(
//         "#mountBg",
//         { scale: 1, x: 0, y: 70 },
//         { scale: 1.3, x: -150, y: -600 },
//         0
//       )
//       .fromTo("#cloud2",
//         { opacity: 1, x: 400, y: 310 },
//         { x: -200, y: -600 },
//         0
//       )
//       .fromTo(
//         "#mountBg2",
//         { scale: 1, x: 0, y: 110 },
//         { scale: 1.3, x: -150, y: -670 },
//         0
//       )
//       .fromTo("#cloud3",
//         { opacity: 1, x: -200, y: 300 },
//         { x: 500, y: -1000 },
//         0
//       )
//       .fromTo(
//         "#mountMg",
//         { scale: 1, x: 0, y: 345 },
//         { scale: 1.3, x: -150, y: -700 },
//         0
//       )
//       .fromTo("#cloud4",
//         { opacity: 1, x: 300, y: 320 },
//         { x: -400, y: -850 },
//         0
//       )
//       .fromTo(
//         "#mountMgF",
//         { scale: 1, x: 0, y: 200 },
//         { scale: 1.3, x: -150, y: -750 },
//         0
//       )
//       .fromTo(
//         "#mountFg",
//         { scale: 1, x: 0, y: 220 },
//         { scale: 1.3, x: -150, y: -850 },
//         0
//       )
//       .fromTo(
//         "#cloud5",
//         { opacity: 1, scale: 1.5, x: -100, y: 380 },
//         { scale: 3, x: 300, y: -950 },
//         0
//       )
//       .fromTo(
//         "#cloud1, #cloud1M",
//         { opacity: 1, scale: 1.3, x: -10, y: 576 },
//         { scale: 2, x: -500, y: -690 },
//         0
//       );
//   } catch (error) {
//     console.error("Animation failed:", error);
//     // Fallback: Show static background
//     gsap.set("#sky, #mountBg, #mountMgF", { opacity: 1 });
//   }
// }

// // End of Mountain Sky Animation

// Me Element Animations

// Function to start the hover wiggle animation, functions, variables and listeners
let hoverAnimationInterval;
let isHoverWiggling = false;
let angle = 0; // Variable to track the wiggle angle
let animationInterval;
let isIdleWiggling = false; // Flag to track idle wiggle animation
let initialTransform = ""; // Store initial centering transform

const thresholdScale = 1.639; //set scale value, to allow for the crossing-fading effect SEE/ME

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
  const scaleValue = getScaleValue(domElements.cloud1);
  if (scaleValue >= thresholdScale) {
    if (domElements.meElement.style.display === "none") {
      domElements.meElement.style.display = "block"; // Enable #me
      domElements.down.style.display = "none";
      // Re-enable event listeners if necessary
      domElements.meElement.addEventListener("click", function (event) {
        event.stopPropagation();
        navbar.hideScrollBar();
        navbar.autoScrollNow();
        domUtils.showStatementContact();
        domUtils.updateDimensionsNoMargins();
      });
    }
  } else {
    if (domElements.meElement.style.display !== "none") {
      domElements.meElement.style.display = "none"; // Disable #me
      domElements.down.style.display = "block";
    }
  }
}

// MutationObserver for #cloud1 element to track changes
const observer = new MutationObserver(updateMeElement);
observer.observe(domElements.cloud1, { attributes: true, childList: true, subtree: true });

// Initial call to update the state based on current scale
updateMeElement();


// Aligns SEE/ME text & ME animate wiggles
function animateMeAndWiggles() {
  if (!domElements.meElement || !domElements.meShaker) {
    console.error(
      "Required DOM elements not found. Check element IDs for 'me' and 'meshaker'."
    );
    return; // Stop further execution if elements are missing
  }
  if (domElements.meShaker && domElements.meElement) {
  domElements.meShaker.addEventListener("mouseenter", function() {
    console.log("meShaker hover detected"); // Debug log
    domElements.meElement.style.transform = `${initialTransform} rotate(${angle}deg)`;
    startHoverWiggle();
  });

  }
  // Function to get the width of the text element
  function getTextWidth(element) {
    return element.getBBox().width; // Get bounding box width of text element
  }


  // Function to handle orientation change
  function handleOrientationChange() {
    updateTextElementPositions(); // Update positions on orientation change
  }

  // Add an event listener for orientation changes
  window.addEventListener("orientationchange", handleOrientationChange);

  // Initial call to set positions correctly
  updateTextElementPositions();



  // Function to dynamically update text positions on resize
  const onResize = domUtils.debounce(() => {
    updateTextElementPositions();
    domUtils.updateDimensions();
    domUtils.updateModalDimensions();
    navbar.updateWIPDimensions();
    domUtils.updateDimensionsNoMargins();
  }, 200);

  window.addEventListener("resize", onResize);


  // Initialize text positioning and idle wiggle on window load
  updateTextElementPositions(); // Center the text elements

  startIdleWiggle(); // Start the idle wiggle animation

  // Update text positions when window is resized
  window.onresize = onResize;
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
  domElements.seeText.style.opacity = 0;
  domElements.down.style.opacity = 0;
}

// Function to apply combined transformation (centering + rotation)
function applyTransform() {
  domElements.meElement.style.transform = `${initialTransform} rotate(${angle}deg)`; // Combine rotation and translation
  domElements.seeText.style.opacity = 1;
  domElements.down.style.opacity = 1;
  domElements.seeText.style.visibility = "visible";
}

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
    domElements.meElement.style.transform = `${initialTransform} rotate(${wiggleAngle}deg)`; // Apply the wiggle transformation
  }

  // Start the animation interval for the wiggle effect
  animationInterval = setInterval(performWiggle, 30);
}

// Event listeners for hover wiggle on "ME"
domElements.meShaker.addEventListener("mouseenter", function () {
  // Combine scaling with the existing transform (centering + wiggle)
console.log("where is meShaker?");
  domElements.meElement.style.transform = `${initialTransform} rotate(${angle}deg)`;
  startHoverWiggle(); // Start hover wiggle
});
domElements.meShaker.addEventListener("mouseleave", function () {
  // Reset the scaling and keep the initial transform (centering + reset rotation)
  domElements.meElement.style.transform = `${initialTransform} rotate(0deg)`;
  stopHoverWiggle(); // Stop hover wiggle
});
domElements.meElement.addEventListener("mouseenter", function () {
  domElements.meElement.style.transform = `${initialTransform} rotate(0deg) scale(1.09)`;
});
domElements.meElement.addEventListener("mouseleave", function () {
  domElements.meElement.style.transform = `${initialTransform} rotate(0deg) scale(1)`;
});

//Navbar functions, variables & listeners

let hoverTimeout;

function showDropMenu(dropMenu) {
  dropMenu.style.display = "flex";
}
function hideDropdown(dropMenu) {
  dropMenu.style.display = "none";
}

// Function to keep the dropdown visible as long as the mouse is inside
// function cancelHide() {
//   clearTimeout(hoverTimeout); // Cancel any pending hide actions
// }


// Function to handle delayed hiding of the dropdown
function delayedHide(dropdownMenu) {
  clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(() => {
    hideDropdown(dropdownMenu);
  }, 200); // 200ms delay to allow smooth interaction
}


//Navbar functions, variables & listeners end

//Thumbnails functions, variables & listeners
const thumbSoft = document.querySelector("#software");
const thumbDiy = document.querySelector("#diy");
const thumbMot = document.querySelector("#motion");
const thumbPhoto = document.querySelector("#photography");


thumbSoft.addEventListener("mouseleave", function () {
  delayedHide(domElements.navDropMenuSoftware);
  domElements.navSoftware.classList.remove("active");
  thumbSoft.classList.remove("active");
});
thumbMot.addEventListener("mouseenter", function () {
  showDropMenu(domElements.navDropMenuMotion);
  domElements.navMotion.classList.add("active");
  thumbMot.classList.add("active");
});
thumbMot.addEventListener("mouseleave", function () {
  delayedHide(domElements.navDropMenuMotion);
  domElements.navMotion.classList.remove("active");
  thumbMot.classList.remove("active");
});
thumbSoft.addEventListener("mouseenter", function () {
  showDropMenu(domElements.navDropMenuSoftware);
  domElements.navSoftware.classList.add("active");
  thumbSoft.classList.add("active");
});

thumbPhoto.addEventListener("mouseenter", function () {
  domElements.navPhotography.classList.add("active");
  thumbPhoto.classList.add("active");
});

thumbPhoto.addEventListener("mouseleave", function () {
  domElements.navPhotography.classList.remove("active");
  thumbPhoto.classList.remove("active");
});

thumbDiy.addEventListener("mouseenter", function () {
  domElements.navDiy.classList.add("active");
  thumbDiy.classList.add("active");
});

thumbDiy.addEventListener("mouseleave", function () {
  domElements.navDiy.classList.remove("active");
  thumbDiy.classList.remove("active");
});

// Hides the Contact Form and Welcome message & Displays Thumbnails & ScrollBar
function showThumbs() {
  hideForm();
  // document.getElementById("contactForm").style.display = "none";
  document.getElementById("statementContact").style.display = "none";
  document.getElementById("thumbnails").style.display = "block";
  navbar.showScrollBar();
  domUtils.updateDimensions();
}

// Hides the Contact Form
function hideForm() {
  document.getElementById("contactForm").style.display = "none";
  // document.getElementById("statementContact").style.display = "block";
}

function centreThumbs() {
  console.log("centreThumbs");
  gsap.to("#software", {
    scale: 1,
    x: domUtils.endLeftX,
    y: domUtils.getEndTopY(),
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#photography", {
    scale: 1,
    x: domUtils.endRightX,
    y: domUtils.getEndTopY(),
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#diy", {
    scale: 1,
    x: domUtils.endRightX,
    y: domUtils.endBottomY,
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#motion", {
    scale: 1,
    x: domUtils.endLeftX,
    y: domUtils.endBottomY,
    duration: 1,
    ease: "power2.out",
  });
}
// controls thumnails entry animation
function animateThumbs() {
  domElements.thumbNails.style.opacity = 1;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: domElements.scrollDist,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    })

    .fromTo(
      "#software",
      { opacity: 0.85, scale: 0.2, x: domUtils.endLeftX - 1750, y: domUtils.getEndTopY() - 750 },
      { opacity: 1, scale: 1, x: domUtils.endLeftX, y: domUtils.getEndTopY() },
      0
    )
    .fromTo(
      "#photography",
      { opacity: 0.85, scale: 0.2, x: domUtils.endRightX + 1250, y: domUtils.getEndTopY() - 750 },
      { opacity: 1, scale: 1, x: domUtils.endRightX, y: domUtils.getEndTopY() },
      0
    )
    .fromTo(
      "#diy",
      { opacity: 0.85, scale: 3, x: domUtils.endRightX + 1250, y: domUtils.endBottomY + 750 },
      { opacity: 1, scale: 1, x: domUtils.endRightX, y: domUtils.endBottomY },
      0
    )
    .fromTo(
      "#motion",
      { opacity: 0.85, scale: 3, x: domUtils.endLeftX - 1750, y: domUtils.endBottomY + 750 },
      { opacity: 1, scale: 1, x: domUtils.endLeftX, y: domUtils.endBottomY },
      0
    );
}


// Handles software Thumbs link click - to WIP message
domElements.software.addEventListener("click", function () {
  navbar.showWip(domElements.thumbElements[0]);
});


// if (this.elements.navPhotography) {
//       this.setupClickEvent(this.elements.navPhotography, (e) => {
//          if (e.target.hasAttribute('data-transition-nav')) {
//            e.preventDefault();
//           this.handleTransitionNavigation(e.target.getAttribute('data-link'));
//          }
//       });
      
//         this.setupClickEvent(this.elements.navPhotography, () => this.autoScrollNow());
//     }


// ***********Check navbar.js

// // Handles photography Thumbs link click - to WIP message
// domElements.photography.addEventListener("click", function () {
//   navbar.showWip(domElements.thumbElements[1]);
// });

// Handles motion Thumbs link click - to WIP message
domElements.motion.addEventListener("click", function () {
  navbar.showWip(domElements.thumbElements[2]);
});

// Handles DIY Thumbs link click - to WIP message
domElements.diy.addEventListener("click", function () {
  navbar.showWip(domElements.thumbElements[3]);
});

//Thumbnails functions, variables & listeners end



// Scrolling handling

// delays and contorls the automated scrolling
function autoScroll() {
  window.scrollTo(0, 0); // Reset scroll position to the top before starting animation
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
      duration: 5.8, // Scroll time: SCROLL_DURATION, see navbar.js
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.525,0.106 0.676,0.356 0.728,0.516 0.774,0.577 0.78,1 1,1 "
      ),
    });
  }, 3000); // Add a delay of 3seconds before starting the scroll to let the layout settle
}


// Handles index.html specify navigation links
domElements.modalClose.addEventListener("click", function () {
  navbar.showScrollBar();
  showThumbs();
  domUtils.updateDimensions();
  domUtils.spaceoutThumbs();
});

// Handles Welcome Message signature click - to contact form
domElements.modalSig.addEventListener("click", function () {
  domUtils.showForm();
});

// Handles contact form close button click
domElements.contactFormClose.addEventListener("click", function () {
  showThumbs();
  domUtils.spaceoutThumbs();
});

// Handles the form submission click and display layout
domElements.formButton.addEventListener("click", function () {
  showThumbs();
  domUtils.spaceoutThumbs();
});


// Handles WIP message close link click - return to main layout
domElements.modalWipClose.addEventListener("click", function () {
  navbar.showScrollBar();
  showThumbs();
  domUtils.updateDimensions();
  domUtils.spaceoutThumbs();
  navbar.hideWip();
});

// Handles index.html specify navigation links End






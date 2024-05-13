// opening animation "SEE/ME" mountains and clouds

// import { TimelineLite, Back } from "gsap/dist/gsap";

gsap.set("#mountains", {
  position: "fixed",
  background: "#fff",
  width: "100%",
  maxWidth: "1200px",
  height: "100%",
  top: 0,
  left: "50%",
  x: "-50%",
});

// Thumb randomisation
document.addEventListener("DOMContentLoaded", function () {
  // Array of image URLs for each category
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

  const videographyImages = [
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

  // Function to randomly select an image URL from an array
  function getRandomImage(imagesArray) {
    return imagesArray[Math.floor(Math.random() * imagesArray.length)];
  }

  // Function to set background image for a container and schedule next change
  function setRandomBackground(containerId, imagesArray) {
    const container = document.getElementById(containerId);
    container.style.backgroundImage = getRandomImage(imagesArray);

    // Schedule next change after a random time (between 5 to 10 seconds)
    const randomTime = Math.floor(Math.random() * (10000 - 5000)) + 5000;
    setTimeout(() => setRandomBackground(containerId, imagesArray), randomTime);
  }

  // Set initial background images and schedule changes
  setRandomBackground("software", softwareImages);
  setRandomBackground("photography", photographyImages);
  setRandomBackground("videography", videographyImages);
  setRandomBackground("diy", diyImages);
});

// opening Animations ##################################################################
gsap.set(".scrollDist", { width: "100%", height: "200%", background: "#fff" });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scrollDist",
      start: "top top",
      end: "bottom bottom",
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

  .fromTo(
    "#cloud2", 
    { x: 400, y: 310 }, 
    { x: -200, y: -600 }, 
    0
  )

  .fromTo(
    "#mountBg2",
    { scale: 1, X: 0, y: 110 },
    { scale: 1.3, x: -150, y: -670 },
    0
  )

  .fromTo("#cloud3", { x: -200, y: 300 }, { x: 500, y: -1000 }, 0)

  .fromTo(
    "#mountMg",
    { scale: 1, X: 0, y: 345 },
    { scale: 1.3, x: -150, y: -700 },
    0
  )

  .fromTo("#cloud4", { x: 300, y: 320 }, { x: -400, y: -850 }, 0)

  .fromTo(
    "#mountMgF",
    { scale: 1, X: 0, y: 200 },
    { scale: 1.3, x: -150, y: -750 },
    0
  )

  .fromTo(
    "#mountFg",
    { scale: 1, X: 0, y: 220 },
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
    "#cloud1",
    { scale: 1.3, x: -10, y: 576 },
    { scale: 2, x: -500, y: -690 },
    0
  );

// End of Cloud & Mountains animation #######################################################################

// Begining of Thumbnails animation #######################################################################

// Function to retrieve computed style value of an element
let resizeTimer;

window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateDimensions, 250); // Adjust the debounce delay as needed
});

function getComputedStyleValue(element, property) {
  return parseInt(window.getComputedStyle(element).getPropertyValue(property));
}

// Function to calculate the total width of the thumbnail including margin
function getThumbWidthWithMargin() {
  const thumbElement = document.querySelector(".thumbShape"); // Select the thumbnail element
  const computedStyle = window.getComputedStyle(thumbElement); // Get the computed style
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width")); // Get the width of the thumbnail
  const thumbMargin = parseFloat(computedStyle.getPropertyValue("margin-right")); // Get the right margin of the thumbnail

  // Calculate total width including margin
  const thumbWidthWithMargin = thumbWidth + (thumbMargin*2);

  return thumbWidthWithMargin;
}

// Initialization of variables
const svg = document.querySelector("svg"); // Select the SVG element
const thumbElement = document.querySelector(".thumbShape"); // Select the thumbnail element
let thumbWidth = getComputedStyleValue(thumbElement, "width"); // Get the width of the thumbnail
let screenWidthHalved = svg.viewBox.baseVal.width / 2; // Calculate the midpoint of the SVG element's x-axis
let screenHeightHalved = svg.viewBox.baseVal.height / 2;
let endLeftX; // Define endLeftX variable
let endRightX; // Define endRightX variable
let endTopY; // Define endLeftY variable
let endBottomY; // Define endRightY variable

// Function to update thumbWidth and screenWidthHalved based on window size
// Function to update thumb positions and sizes based on window size
function updateDimensions() {
  thumbWidth = Math.min(300, window.innerWidth / 6);
  screenWidthHalved = window.innerWidth / 2;
  screenHeightHalved = window.innerHeight / 2;
  const totalThumbWidth = getThumbWidthWithMargin();

  endLeftX = screenWidthHalved - totalThumbWidth;
  endTopY = window.innerHeight * 1.25;
  endRightX = screenWidthHalved;
  endBottomY = window.innerHeight * 1.25 + totalThumbWidth;

  // Update the position of thumbnails
  gsap.to("#software", { x: endLeftX, y: endTopY });
  gsap.to("#photography", { x: endRightX, y: endTopY });
  gsap.to("#diy", { x: endRightX, y: endBottomY });
  gsap.to("#videography", { x: endLeftX, y: endBottomY });
  console.log("2");
}

// Call updateDimensions function when the window is resized or page is loaded
window.addEventListener("resize", updateDimensions);
 window.addEventListener("DOMContentLoaded", updateDimensions);


// function updateDimensions() {
//   thumbWidth = Math.min(300, window.innerWidth / 6); // Update thumbWidth while ensuring it doesn't exceed a certain maximum value
//   screenWidthHalved = window.innerWidth / 2; // Update half-width of the screen
//   screenHeightHalved = window.innerHeight / 2;
//   const totalThumbWidth = getThumbWidthWithMargin(); // Total width including margins

//   // Calculate the x&ycoordinates of the leftmost thumbs end positions
//   endLeftX = screenWidthHalved - totalThumbWidth;
//   endTopY = window.innerHeight*1.25 ;

//   console.log("totalThumbWidth: " +totalThumbWidth);
//   console.log("window.innerHeight: " +window.innerHeight);
//   console.log("endTopY: " +endTopY);


//   // Calculate the x-coordinate of the rightmost thumb's end position
//   endRightX = screenWidthHalved;
//   endBottomY = window.innerHeight*1.25 + totalThumbWidth;
//   console.log("endBottomY: " +endBottomY);
// }

// // Initial call to updateDimensions to set initial values
// updateDimensions();

// // Event listener for window resize
// window.addEventListener("resize", updateDimensions);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scrollDist",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
    },
  })

 
  .fromTo(
    "#software",
    { scale: 1.5, x: endLeftX - 2500, y: endTopY },
    { scale: 1, x: endLeftX, y: endTopY, ease: "power2.out"},
    0
  )
  
  .fromTo(
    "#photography",
    { scale: 1.5, x: endRightX + 2500, y: endTopY },
    { scale: 1, x: endRightX, y: endTopY, ease: "power2.out"},
    0
  )
  .fromTo(
    "#diy",
    { scale: 1.5, x: endRightX + 2500, y: endBottomY+1440 },
    { scale: 1, x: endRightX, y: endBottomY, ease: "power2.out"},
    0
  )
  .fromTo(
    "#videography",
    { scale: 1.5, x: endLeftX - 2500, y: endBottomY+1440 },
    { scale: 1, x: endLeftX, y: endBottomY, ease: "power2.out"},
    0
  );
  console.log("1");
 

// #######################################################################

// thumb Animations on clicks############################################################
$(".close").on("click", (e) => {
  gsap.to(".thumbs#diy", { x: 620, y: -270 }, 1);
  gsap.to(".thumbs#videography", { x: 320, y: -270 }, 2);
  gsap.to(".thumbs#software", { x: 320, y: -570 }, 4);
  gsap.to(".thumbs#photography", { x: 620, y: -570 }, 3);
});

$(".sig, .meLink, #contactLink").on("click", (e) => {
  gsap.to(".thumbs#diy", { x: 590, y: -290 }, 1);
  gsap.to(".thumbs#videography", { x: 340, y: -290 }, 2);
  gsap.to(".thumbs#software", { x: 340, y: -540 }, 4);
  gsap.to(".thumbs#photography", { x: 590, y: -540 }, 3);
});

$(".scroll-arrow").on("click", function(event) {
  // Prevent default click behavior (including browser scroll)
  event.preventDefault();

  // Calculate the scroll position relative to the document
  const targetElement = document.getElementById("svg");
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

  // Trigger smooth scroll animation
  gsap.to(window, { scrollTo: targetPosition, duration: 4, ease: "power3.inOut", onComplete: function() {
    // Animation complete, do any additional tasks here if needed
  } });
});








// Begining of Scroll Bar Display control ##################################################

// Function to hide the scrollbar
function hideScrollBar() {
  document.documentElement.style.overflow = "hidden"; // Hide scroll on the entire document
}

// Function to show the scrollbar
function showScrollBar() {
  document.documentElement.style.overflow = ""; // Show scroll on the entire document
}

// End of Scroll Bar Display control ###################################################

// Navigation between index.html#thumbs, modalBox(statementContact) & Contact Form

function showForm() {
  document.getElementById("contactForm").style.display = "block";
}

function showStatementContact() {
  document.getElementById("statementContact").style.display = "block";
  document.getElementById("contactForm").style.display = "none";
}

function showThumbs() {
  document.getElementById("statementContact").style.display = "none";
  document.getElementById("thumbs").style.display = "block";
}

function hideForm() {
  document.getElementById("contactForm").style.display = "none";
  document.getElementById("statementContact").style.display = "block";
}

function hideForm2() {
  document.getElementById("contactForm").style.display = "none";
  document.getElementById("#thumbs").style.display = "block";
}

function submitForm() {
  hideForm();
}

// ==========================================================
/* Main Navigation dropdown
------------------------------------------------------ */

$(window).scroll(function () {
  if ($(window).scrollTop() > 320) {
    $(".navbar").addClass("sticky");
  } else {
    $(".navbar").removeClass("sticky");
  }
});

// ==========================================================
// #########   index.html animate thumbnails & navbar items & meshaker animating 'ME'  ###

document.addEventListener("DOMContentLoaded", function () {
  const thumbSoft = document.querySelector("#software");
  const navbarSoft = document.querySelector(".dropdown-toggle");

  const thumbPhoto = document.querySelector("#photography");
  const navbarPhoto = document.querySelector("#photographyLink");

  const thumbVid = document.querySelector("#videography");
  const navbarVid = document.querySelector("#videographyLink");

  const thumbDiy = document.querySelector("#diy");
  const navbarDiy = document.querySelector("#diyLink");

  // ################ Begining of MeText Animations ############################################
  const meText = document.getElementById("me");
const meShaker = document.getElementById("meshaker");
let hoverAnimationInterval;
let isHoverWiggling = false;
let angle = 0; // Declare angle variable outside of hoverWiggle function
let animationInterval;
let isIdleWiggling = false; // Flag to track idle wiggle animation

let initialTransform; // Declare initialTransform without assigning a value initial

// Capture the initial transform when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  captureInitialTransform();

  function captureInitialTransform() {

    console.log("meText:", meText);
    initialTransform = window
      .getComputedStyle(meText)
      .getPropertyValue("transform");
      console.log("transform: "+initialTransform);
  }
});

// Function to stop the hover wiggle animation
function stopHoverWiggle() {
  console.log("Stopping hover wiggle animation.");
  clearInterval(hoverAnimationInterval);
  isHoverWiggling = false;
  console.log("Hover wiggle animation stopped.");
  meText.style.transform = `translate(520px, 20vh) rotate(0deg)`;
}

// Function to start the hover wiggle animation
function startHoverWiggle() {
  console.log("Starting hover wiggle animation.");
  if (!isHoverWiggling) {
    isHoverWiggling = true;
    hoverAnimationInterval = setInterval(hoverWiggle, 30);
    // console.log("Hover wiggle animation started.");
  }
}

// Function to handle the hover event
function handleHover(event) {
  if (event.type === "mouseenter") {
    startHoverWiggle();
  } else if (event.type === "mouseleave") {
    stopHoverWiggle();
  }
}

// Function to handle the hover wiggle animation
function hoverWiggle() {
  // Update the rotation angle
  angle += 1;
  if (angle === 1 || angle === -1) {
    angle *= -1; // Reverse direction when angle reaches 1 or -1
  }
  meText.style.transform = `translate(520px, 20vh) rotate(${angle}deg)`; // Apply the transformation
}

// Event listener for mouse enter and mouse leave to handle hover
meShaker.addEventListener("mouseenter", handleHover);
meShaker.addEventListener("mouseleave", handleHover);

// Function to start the idle wiggle animation
function startIdleWiggle() {
  if (!isIdleWiggling) {
    isIdleWiggling = true;
    idleWiggle();
  }
}

// Function to stop the idle wiggle animation
function stopIdleWiggle() {
  if (isIdleWiggling) {
    clearInterval(animationInterval);
    isIdleWiggling = false;

    // Reset meText rotation to 0 degrees
    meText.style.transform = `translate(520px, 20vh) rotate(0deg)`;
  }
}


// Function to handle the idle wiggle animation
function idleWiggle() {
  wiggle(); // Start the wiggle animation
  setTimeout(() => {
    stopIdleWiggle(); // Stop idle wiggle animation after 0.7 second
    setTimeout(
      startIdleWiggle,
      Math.floor(Math.random() * (16000 - 7000 + 1)) + 7000
    ); // Restart idle wiggle animation after random interval
  }, 700);
}

// Function to handle the wiggle animation
function wiggle() {
  let angle = 0;
  let direction = 1;

  // Perform one iteration of the wiggle animation
  function performWiggle() {
    angle += direction;
    if (angle === 1 || angle === -1) {
      direction *= -1;
    }
    meText.style.transform = `translate(520px, 20vh)rotate(${angle}deg)`; // Apply the transformation
  }

  // Start the animation interval
  animationInterval = setInterval(performWiggle, 30);
}

// Start idle wiggle animation initially
startIdleWiggle();

// ################ END of MeText Animations ############################################

meText.addEventListener("mouseenter", function () {
  meText.style.transform = `translate(520px, 20vh) scale(1.015)`;
  // meText.style.shadowColor = grey;
});

meText.addEventListener("mouseleave", function () {
  meText.style.transform = `translate(520px, 20vh) scale(1)`;
});

  
//   const meText = document.getElementById("me");
//   const meShaker = document.getElementById("meshaker");
//   let hoverAnimationInterval;
//   let isHoverWiggling = false;
//   let angle = 0; // Declare angle variable outside of hoverWiggle function
//   let animationInterval;
//   let isIdleWiggling = false; // Flag to track idle wiggle animation

//   let initialTransform = window
//     .getComputedStyle(meText)
//     .getPropertyValue("transform");

//   // Function to stop the hover wiggle animation
//   function stopHoverWiggle() {
//     console.log("Stopping hover wiggle animation.");
//     clearInterval(hoverAnimationInterval);
//     isHoverWiggling = false;
//     console.log("Hover wiggle animation stopped.");
//     meText.style.transform = `translate(520px, 20vh) rotate(0deg)`; // Reset the position
//   }

//   // Function to start the hover wiggle animation
//   function startHoverWiggle() {
//     console.log("Starting hover wiggle animation.");
//     if (!isHoverWiggling) {
//       isHoverWiggling = true;
//       hoverAnimationInterval = setInterval(hoverWiggle, 30);
//       // console.log("Hover wiggle animation started.");
//     }
//   }

//   // Function to handle the hover event
//   function handleHover(event) {
//     if (event.type === "mouseenter") {
//       startHoverWiggle();
//     } else if (event.type === "mouseleave") {
//       stopHoverWiggle();
//     }
//   }

//   // Function to handle the hover wiggle animation
//   function hoverWiggle() {
//     // Update the rotation angle
//     angle += 1;
//     if (angle === 1 || angle === -1) {
//       angle *= -1; // Reverse direction when angle reaches 1 or -1
//     }
//     meText.style.transform = `translate(520px, 20vh) rotate(${angle}deg)`; // Apply the transformation
//   }

//   // Event listener for mouse enter and mouse leave to handle hover
//   meShaker.addEventListener("mouseenter", handleHover);
//   meShaker.addEventListener("mouseleave", handleHover);

//   // Function to start the idle wiggle animation
//   function startIdleWiggle() {
//     if (!isIdleWiggling) {
//       isIdleWiggling = true;
//       idleWiggle();
//     }
//   }

//   // Function to stop the idle wiggle animation
// // Function to stop the idle wiggle animation
// function stopIdleWiggle() {
//   if (isIdleWiggling) {
//     clearInterval(animationInterval);
//     isIdleWiggling = false;

//     // Reset meText to its initial position
//     meText.style.transform = initialTransform;
//   }
// }


//   // Function to handle the idle wiggle animation
//   function idleWiggle() {
//     wiggle(); // Start the wiggle animation
//     setTimeout(() => {
//       stopIdleWiggle(); // Stop idle wiggle animation after 0.7 second
//       setTimeout(
//         startIdleWiggle,
//         Math.floor(Math.random() * (16000 - 7000 + 1)) + 7000
//       ); // Restart idle wiggle animation after random interval
//     }, 700);
//   }

//   // Function to handle the wiggle animation
//   function wiggle() {
//     let angle = 0;
//     let direction = 1;

//     // Perform one iteration of the wiggle animation
//     function performWiggle() {
//       angle += direction;
//       if (angle === 1 || angle === -1) {
//         direction *= -1;
//       }
//       meText.style.transform = `translate(520px, 20vh)rotate(${angle}deg)`; // Apply the transformation
//     }

//     // Start the animation interval
//     animationInterval = setInterval(performWiggle, 30);
//   }

//   // Start idle wiggle animation initially
//   startIdleWiggle();

//   // ################ END of MeText Animations ############################################

//   meText.addEventListener("mouseenter", function () {
//     meText.style.transform = `translate(520px, 20vh) scale(1.015)`;
//     // meText.style.shadowColor = grey;
//   });

//   meText.addEventListener("mouseleave", function () {
//     meText.style.transform = `translate(520px, 20vh) scale(1)`;
//   });

  thumbPhoto.addEventListener("mouseenter", function () {
    navbarPhoto.style.scale = 1.3;
    navbarPhoto.style.color = "#6e6f79";
    thumbPhoto.style.scale = 1.004;
  });

  thumbPhoto.addEventListener("mouseleave", function () {
    navbarPhoto.style.scale = 1;
    navbarPhoto.style.color = "#162a43";
    thumbPhoto.style.scale = 1;
  });

  navbarPhoto.addEventListener("mouseenter", function () {
    navbarPhoto.style.scale = 1.15;
    navbarPhoto.style.color = "#6e6f79";
  });

  navbarPhoto.addEventListener("mouseleave", function () {
    navbarPhoto.style.scale = 1;
    navbarPhoto.style.color = "#162a43";
  });

  thumbSoft.addEventListener("mouseenter", function () {
    navbarSoft.style.scale = 1.3;
    navbarSoft.style.color = "#6e6f79";
    thumbSoft.style.scale = 1.004;
  });

  thumbSoft.addEventListener("mouseleave", function () {
    navbarSoft.style.scale = 1;
    navbarSoft.style.color = "#162a43";
    thumbSoft.style.scale = 1;
  });

  navbarSoft.addEventListener("mouseenter", function () {
    navbarSoft.style.scale = 1.1;
    navbarSoft.style.color = "#6e6f79";
  });

  navbarSoft.addEventListener("mouseleave", function () {
    navbarSoft.style.scale = 1;
    navbarSoft.style.color = "#162a43";
  });

  thumbVid.addEventListener("mouseenter", function () {
    navbarVid.style.scale = 1.3;
    navbarVid.style.color = "#6e6f79";
    thumbVid.style.scale = 1.004;
  });

  thumbVid.addEventListener("mouseleave", function () {
    navbarVid.style.scale = 1;
    navbarVid.style.color = "#162a43";
    thumbVid.style.scale = 1;
  });

  navbarVid.addEventListener("mouseenter", function () {
    navbarVid.style.scale = 1.1;
    navbarVid.style.color = "#6e6f79";
  });

  navbarVid.addEventListener("mouseleave", function () {
    navbarVid.style.scale = 1;
    navbarVid.style.color = "#162a43";
  });

  thumbDiy.addEventListener("mouseenter", function () {
    navbarDiy.style.scale = 1.3;
    navbarDiy.style.color = "#6e6f79";
    thumbDiy.style.scale = 1.004;
  });

  thumbDiy.addEventListener("mouseleave", function () {
    navbarDiy.style.scale = 1;
    navbarDiy.style.color = "#162a43";
    thumbDiy.style.scale = 1;
  });

  navbarDiy.addEventListener("mouseenter", function () {
    navbarDiy.style.scale = 1.1;
    navbarDiy.style.color = "#6e6f79";
  });

  navbarDiy.addEventListener("mouseleave", function () {
    navbarDiy.style.scale = 1;
    navbarDiy.style.color = "#162a43";
  });
});

// ==========================================================
// #########  END of  index.html animate thumbnails & navbar items & meshaker animating 'ME'  ###

// // Wait for the DOM to fully load
// window.onload = function() {
//     // Ensure 'meElement' and 'meShaker' are declared and exist in the DOM
//     const meElement = document.getElementById("me");
//     const meShaker = document.getElementById("meshaker"); // Ensure this element exists in the HTML
  
//     if (!meElement || !meShaker) {
//       console.error("Required DOM elements not found. Check element IDs for 'me' and 'meshaker'.");
//       return; // Stop further execution if elements are missing
//     }
  
//     let hoverAnimationInterval;
//     let isHoverWiggling = false;
//     let angle = 0; // Variable to track the wiggle angle
//     let animationInterval;
//     let isIdleWiggling = false; // Flag to track idle wiggle animation
//     let initialTransform = ""; // Store initial centering transform
  
//     // Function to get the width of the text element
//     function getTextWidth(element) {
//       return element.getBBox().width; // Get bounding box width of text element
//     }
  
//     // Function to center the text elements in the SVG
//     function updateTextElementPositions() {
//       // Get the SVG dimensions
//       const svg = document.querySelector("svg");
//       const svgWidth = svg.viewBox.baseVal.width || svg.clientWidth;
//       const svgHeight = svg.viewBox.baseVal.height || svg.clientHeight;
  
//       // Calculate the center of the SVG
//       const svgCenterX = svgWidth / 2;
//       const svgCenterY = svgHeight / 2;
  
//       // Position "SEE" and "ME" at the center of the SVG
//       const seeX = svgCenterX;
//       const seeY = svgCenterY - 250; // Adjust Y position for SEE
//       const meX = svgCenterX;
//       const meY = svgCenterY - 250; // Adjust Y position for ME
  
//       // Apply the translation (without affecting rotation)
//       gsap.to("#see", {
//         x: seeX,
//         y: seeY,
//         duration: 1,
//         ease: "power2.out",
//       });
  
//       gsap.to("#me", {
//         x: meX,
//         y: meY,
//         duration: 1,
//         ease: "power2.out",
//       });
  
//       // Store the initial translation for the ME element
//       initialTransform = `translate(${meX}px, ${meY}px)`;
//       applyTransform(); // Apply the current transformation
//     }
  
//     // Function to apply combined transformation (centering + rotation)
//     function applyTransform() {
//       meElement.style.transform = `${initialTransform} rotate(${angle}deg)`; // Combine rotation and translation
//     }
  
//     // Function to start the hover wiggle animation
//     function startHoverWiggle() {
//       if (!isHoverWiggling) {
//         isHoverWiggling = true;
//         hoverAnimationInterval = setInterval(hoverWiggle, 9); // Wiggle every #ms
//       }
//     }
  
//     // Function to stop the hover wiggle animation
//     function stopHoverWiggle() {
//       clearInterval(hoverAnimationInterval);
//       isHoverWiggling = false;
//       angle = 0; // Reset angle when hover stops
//       applyTransform(); // Reset to initial state
//     }
  
//     // Function to handle the hover wiggle animation
//     function hoverWiggle() {
//       // Update the rotation angle
//       angle += 1;
//       if (angle === 5 || angle === -5) {
//         angle *= -1; // Reverse direction when angle reaches 5 or -5
//       }
//       applyTransform(); // Apply the combined transform (rotation + position)
//     }
  
//     // Function to start the idle wiggle animation
//     function startIdleWiggle() {
//       if (!isIdleWiggling) {
//         isIdleWiggling = true;
//         idleWiggle(); // Start idle wiggle animation
//       }
//     }
  
//     // Function to stop the idle wiggle animation
//     function stopIdleWiggle() {
//       clearInterval(animationInterval);
//       isIdleWiggling = false;
//       angle = 0; // Reset angle
//       applyTransform(); // Reset to the centered position
//     }
  
//     // Function to handle the idle wiggle animation
//     function idleWiggle() {
//       wiggle(); // Start the wiggle animation
//       setTimeout(() => {
//         stopIdleWiggle(); // Stop idle wiggle after 0.7 seconds
//         setTimeout(
//           startIdleWiggle,
//           Math.floor(Math.random() * (16000 - 7000 + 1)) + 7000
//         ); // Restart idle wiggle after a random interval
//       }, 700);
//     }
  
//     // Function to handle the wiggle animation
//     function wiggle() {
//       let wiggleAngle = 0;
//       let direction = 1;
  
//       // Perform one iteration of the wiggle animation
//       function performWiggle() {
//         wiggleAngle += direction;
//         if (wiggleAngle === 1 || wiggleAngle === -1) {
//           direction *= -1; // Reverse direction at the extremes
//         }
//         meElement.style.transform = `${initialTransform} rotate(${wiggleAngle}deg)`; // Apply the wiggle transformation
//       }
  
//       // Start the animation interval for the wiggle effect
//       animationInterval = setInterval(performWiggle, 30);
//     }
  
//     // Event listeners for hover wiggle on "ME"
//     meShaker.addEventListener("mouseenter", function(){
//         // Combine scaling with the existing transform (centering + wiggle)
//         meElement.style.transform = `${initialTransform} rotate(${angle}deg)`; 
//         startHoverWiggle();  // Start hover wiggle
//     });
  
//     meShaker.addEventListener("mouseleave", function(){
//         // Reset the scaling and keep the initial transform (centering + reset rotation)
//         meElement.style.transform = `${initialTransform} rotate(0deg)`; 
//         stopHoverWiggle();  // Stop hover wiggle
//     });
//     meElement.addEventListener("mouseenter", function(){
//         meElement.style.transform = `${initialTransform} rotate(0deg) scale(1.115)`; 
//     });
//     meElement.addEventListener("mouseleave", function(){
//         meElement.style.transform = `${initialTransform} rotate(0deg) scale(1)`; 
//     });
//     // Function to dynamically update text positions on resize
//     function onResize() {
//       updateTextElementPositions(); // Update position on window resize
//     }
  
//     // Initialize text positioning and idle wiggle on window load
//     updateTextElementPositions(); // Center the text elements
//     startIdleWiggle(); // Start the idle wiggle animation
  
//     // Update text positions when window is resized
//     window.onresize = onResize;
//   };
  
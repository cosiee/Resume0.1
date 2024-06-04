// Ensure #me element is initially disabled
const meElement = document.getElementById("me");
meElement.disabled = true;

// Correctly reference the single element with ID "cloud1"
const cloud1 = document.getElementById("cloud1");




// GSAP initial setups
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

gsap.set(".scrollDist", { width: "100%", height: "200%", background: "#fff" });

// Random background images for containers
document.addEventListener("DOMContentLoaded", function () {
  const softwareImages = ["url('css/assets/b1.jpg')", "url('css/assets/b2.jpg')", "url('css/assets/b3.jpg')", "url('css/assets/b4.jpg')", "url('css/assets/b5.jpg')", "url('css/assets/b6.jpg')", "url('css/assets/b7.jpg')", "url('css/assets/b8.jpg')", "url('css/assets/b9.jpg')", "url('css/assets/b10.jpg')", "url('css/assets/b12.jpg')", "url('css/assets/b13.jpg')", "url('css/assets/b14.jpg')"];
  const photographyImages = ["url('css/assets/r1.jpg')", "url('css/assets/r2.jpg')", "url('css/assets/r3.jpg')", "url('css/assets/r4.jpg')", "url('css/assets/r5.jpg')", "url('css/assets/r6.jpg')", "url('css/assets/r7.jpg')", "url('css/assets/r8.jpg')", "url('css/assets/r9.jpg')", "url('css/assets/r10.jpg')", "url('css/assets/r11.jpg')", "url('css/assets/r12.jpg')"];
  const videographyImages = ["url('css/assets/g1.jpg')", "url('css/assets/g2.jpg')", "url('css/assets/g3.jpg')", "url('css/assets/g4.jpg')", "url('css/assets/g5.jpg')", "url('css/assets/g6.jpg')", "url('css/assets/g7.jpg')", "url('css/assets/g8.jpg')", "url('css/assets/g9.jpg')", "url('css/assets/g10.jpg')"];
  const diyImages = ["url('css/assets/y1.jpg')", "url('css/assets/y2.jpg')", "url('css/assets/y3.jpg')", "url('css/assets/y4.jpg')", "url('css/assets/y5.jpg')", "url('css/assets/y6.jpg')", "url('css/assets/y7.jpg')", "url('css/assets/y8.jpg')", "url('css/assets/y9.jpg')", "url('css/assets/y10.jpg')", "url('css/assets/y11.jpg')"];

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
  setRandomBackground("videography", videographyImages);
  setRandomBackground("diy", diyImages);
});

// GSAP timeline for scroll-triggered animations
gsap.timeline({
  scrollTrigger: {
    trigger: ".scrollDist",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
})
.fromTo("#sky", { scale: 1, x: 0, y: -80 }, { scale: 1.3, x: -150, y: -650 }, 0)
.fromTo("#mountBg", { scale: 1, x: 0, y: 70 }, { scale: 1.3, x: -150, y: -600 }, 0)
.fromTo("#cloud2", { x: 400, y: 310 }, { x: -200, y: -600 }, 0)
.fromTo("#mountBg2", { scale: 1, x: 0, y: 110 }, { scale: 1.3, x: -150, y: -670 }, 0)
.fromTo("#cloud3", { x: -200, y: 300 }, { x: 500, y: -1000 }, 0)
.fromTo("#mountMg", { scale: 1, x: 0, y: 345 }, { scale: 1.3, x: -150, y: -700 }, 0)
.fromTo("#cloud4", { x: 300, y: 320 }, { x: -400, y: -850 }, 0)
.fromTo("#mountMgF", { scale: 1, x: 0, y: 200 }, { scale: 1.3, x: -150, y: -750 }, 0)
.fromTo("#mountFg", { scale: 1, x: 0, y: 220 }, { scale: 1.3, x: -150, y: -850 }, 0)
.fromTo("#cloud5", { scale: 1.5, x: -100, y: 380 }, { scale: 3, x: 300, y: -950 }, 0)
.fromTo("#cloud1, #cloud1M", { scale: 1.3, x: -10, y: 576 }, { scale: 2, x: -500, y: -690 }, 0);


// ###################################################################################



// Thumbnails positioning based on window size
function getComputedStyleValue(element, property) {
  return parseInt(window.getComputedStyle(element).getPropertyValue(property));
}

function getThumbWidthWithMargin() {
  const thumbElement = document.querySelector(".thumbShape");
  const computedStyle = window.getComputedStyle(thumbElement);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));
  const thumbMargin = parseFloat(computedStyle.getPropertyValue("margin-right"));

  return thumbWidth + (thumbMargin * 2);
  
}



const svg = document.querySelector("svg");
let thumbWidth = getComputedStyleValue(document.querySelector(".thumbShape"), "width");
let screenWidthHalved = svg.viewBox.baseVal.width / 2;
let screenHeightHalved = svg.viewBox.baseVal.height / 2;
let endLeftX, endRightX, endTopY, endBottomY;




function updateDimensions() {
  thumbWidth = Math.min(300, window.innerWidth / 6);
  screenWidthHalved = window.innerWidth / 2;
  screenHeightHalved = window.innerHeight / 2;
  const totalThumbWidth = getThumbWidthWithMargin();

  endLeftX = screenWidthHalved - totalThumbWidth;
  endTopY = window.innerHeight * 1.25;
  endRightX = screenWidthHalved;
  endBottomY = window.innerHeight * 1.25 + totalThumbWidth;

  gsap.to("#software", { x: endLeftX, y: endTopY, duration: 1, ease: "power2.out" });
  gsap.to("#photography", { x: endRightX, y: endTopY, duration: 1, ease: "power2.out" });
  gsap.to("#diy", { x: endRightX, y: endBottomY, duration: 1, ease: "power2.out" });
  gsap.to("#videography", { x: endLeftX, y: endBottomY, duration: 1, ease: "power2.out" });


}

function getThumbWidthWithoutMargin() {
  const thumbElement = document.querySelector(".thumbShape");
  const computedStyle = window.getComputedStyle(thumbElement);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));

  return thumbWidth;
}
function getThumbMargin() {
  const thumbElement = document.querySelector(".thumbShape");
  const computedStyle = window.getComputedStyle(thumbElement);
  const thumbMargin = parseFloat(computedStyle.getPropertyValue("margin-right"));
  return thumbMargin;
}


function updateDimensionsNoMargins() {
  hideScrollBar();
  scrollToBottom();

setTimeout(() => {
  thumbWidth = Math.min(300, window.innerWidth / 6);
  screenWidthHalved = window.innerWidth / 2;
  screenHeightHalved = window.innerHeight / 2;
  const widthThumb = getThumbWidthWithoutMargin();
  const marginWidth = getThumbMargin();

  endLeftX = screenWidthHalved - (widthThumb + marginWidth);
  endTopY = (window.innerHeight * 1.25) + marginWidth;
  endRightX = screenWidthHalved - marginWidth;
  endBottomY = (window.innerHeight * 1.25) + (widthThumb + marginWidth);

  console.log("Thumb Y EndTopY: ", endTopY);

  gsap.to("#software", { x: endLeftX, y: endTopY, duration: 1, ease: "power2.out" });
  gsap.to("#photography", { x: endRightX, y: endTopY, duration: 1, ease: "power2.out" });
  gsap.to("#diy", { x: endRightX, y: endBottomY, duration: 1, ease: "power2.out" });
  gsap.to("#videography", { x: endLeftX, y: endBottomY, duration: 1, ease: "power2.out" });

  updateModalDimensions(endTopY);  // Pass endTopY to updateModalDimensions
}, 50);  // Small delay to ensure scrollbar removal takes effect

  // updateModalDimensions(endTopY);  // Pass endTopY to updateModalDimensions

}

function updateModalDimensions(endTopY) {
  const modalBox = document.querySelector(".modalbox .box");
  const thumbElement = document.querySelector(".thumbShape");

  if (!modalBox || !thumbElement) return;

  const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();

  // Calculate new width and height for the modal box
  const newWidth = Math.max((thumbWidthWithoutMargin * 2)+4, 300);
  const newHeight = newWidth; // Assuming we want a square modal

  // Update modal dimensions
  modalBox.style.width = `${newWidth}px`;
  modalBox.style.height = `${newHeight}px`;

  // Calculate the center of the screen
  const centerX = (window.innerWidth / 2)+4.4;

  // Calculate the new left position to center the modal box
  const newLeft = centerX - (newWidth / 2);

  // Use the passed endTopY for the new top position
  const newTop = endTopY+20.5; // 22.5 works for alignment on y axis
  
 



  // Update modal position
  modalBox.style.position = 'absolute';
  modalBox.style.left = `${newLeft}px`;
  modalBox.style.top = `${newTop}px`;

  

  // modalBox.style.display = "block";

}


// Ensure updateDimensionsNoMargins is called on resize and DOM content load
window.addEventListener("resize", () => {
  
  updateDimensions();
  updateModalDimensions();
  updateDimensionsNoMargins()
});

document.addEventListener("DOMContentLoaded", () => {
  updateDimensions();
  // updateDimensionsNoMargins();
  updateModalDimensions();
});

// Initial call
updateDimensions();
updateModalDimensions();







gsap.timeline({
  scrollTrigger: {
    trigger: ".scrollDist",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
  },
})
.fromTo("#software", { scale: 1.5, x: endLeftX - 1750, y: endTopY - 750 }, { scale: 1, x: endLeftX, y: endTopY }, 0)
.fromTo("#photography", { scale: 1.5, x: endRightX + 1250, y: endTopY - 750 }, { scale: 1, x: endRightX, y: endTopY }, 0)
.fromTo("#diy", { scale: 1.5, x: endRightX + 1250, y: endBottomY + 750 }, { scale: 1, x: endRightX, y: endBottomY }, 0)
.fromTo("#videography", { scale: 1.5, x: endLeftX - 1750, y: endBottomY + 750 }, { scale: 1, x: endLeftX, y: endBottomY }, 0);


// #############################################################################################



const thresholdScale = 1.5589;


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
  
      // Re-enable event listeners if necessary
      meElement.addEventListener('click', hideScrollBar);
    }
  } else {
    if (meElement.style.display !== "none") {
      meElement.style.display = "none"; // Disable #me
  
      // Disable or remove event listeners
      meElement.removeEventListener('click', hideScrollBar);
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



// ####################### ME click scroll function 

function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
}

// function scrollToBottom() {
//   document.querySelectorAll("#me").forEach((btn, index) => {
//     btn.addEventListener("click", () => {
//       gsap.to(window, {duration: 2, scrollTo:{y:"#bottom" + (index + 1), offsetY:70}});
//     });
//   });
  
// }

// function scrollToBottom(duration) {
//   const start = window.scrollY;
//   const distance = document.body.scrollHeight - window.innerHeight - start;
//   const startTime = performance.now();

//   function ease(t) {
//     return t<0.5 ? 2*t*t : -1+(4-2*t)*t; // Easing function for smooth scrolling
//   }

//   function scroll(time) {
//     const elapsed = time - startTime;
//     const progress = Math.min(elapsed / duration, 1);
//     window.scrollTo(0, start + distance * ease(progress));

//     if (elapsed < duration) {
//       requestAnimationFrame(scroll);
//     }
//   }

//   requestAnimationFrame(scroll);
// }





// Navigation between index.html#thumbs, modalBox(statementContact) & Contact Form
  
function showForm() {
  document.getElementById("contactForm").style.display = "block";
}

function showStatementContact() {
  document.getElementById("statementContact").style.display = "block";
  document.getElementById("contactForm").style.display = "none";
}

function centreThumbs(){
  gsap.to("#software", { x: endLeftX, y: endTopY, duration: 1, ease: "power2.out" });
  gsap.to("#photography", { x: endRightX, y: endTopY, duration: 1, ease: "power2.out" });
  gsap.to("#diy", { x: endRightX, y: endBottomY, duration: 1, ease: "power2.out" });
  gsap.to("#videography", { x: endLeftX, y: endBottomY, duration: 1, ease: "power2.out" });
}

function showThumbs() {
  document.getElementById("statementContact").style.display = "none";
  document.getElementById("thumbnails").style.display = "block";
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


  // ################ Begining of MeText Animations ############################################
  // const meElement = document.getElementById("me");
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
  
      
      initialTransform = window
        .getComputedStyle(meElement)
        .getPropertyValue("transform");
        // console.log("transform: "+initialTransform);
    }
  });
  
  // Function to stop the hover wiggle animation
  function stopHoverWiggle() {
    // console.log("Stopping hover wiggle animation.");
    clearInterval(hoverAnimationInterval);
    isHoverWiggling = false;
    // console.log("Hover wiggle animation stopped.");
    meElement.style.transform = `translate(520px, 20vh) rotate(0deg)`;
  }
  
  // Function to start the hover wiggle animation
  function startHoverWiggle() {
    // console.log("Starting hover wiggle animation.");
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
    meElement.style.transform = `translate(520px, 20vh) rotate(${angle}deg)`; // Apply the transformation
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
  
      // Reset meElement rotation to 0 degrees
      meElement.style.transform = `translate(520px, 20vh) rotate(0deg)`;
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
      meElement.style.transform = `translate(520px, 20vh)rotate(${angle}deg)`; // Apply the transformation
    }
  
    // Start the animation interval
    animationInterval = setInterval(performWiggle, 30);
  }
  
  // Start idle wiggle animation initially
  startIdleWiggle();

  meElement.addEventListener("mouseenter", function () {
    meElement.style.transform = `translate(520px, 20vh) scale(1.015)`;
    // meElement.style.shadowColor = grey;
  });
  
  meElement.addEventListener("mouseleave", function () {
    meElement.style.transform = `translate(520px, 20vh) scale(1)`;
  });


  
// Beginning of Handling hover on Thumbs Triggering Navbar elements ###############################

  const thumbSoft = document.querySelector("#software");
  const navbarSoft = document.querySelector(".dropdown-toggle");

  const thumbPhoto = document.querySelector("#photography");
  const navbarPhoto = document.querySelector("#photographyLink");

  const thumbVid = document.querySelector("#videography");
  const navbarVid = document.querySelector("#videographyLink");

  const thumbDiy = document.querySelector("#diy");
  const navbarDiy = document.querySelector("#diyLink");

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


// ==========================================================
// #########  END of  index.html animate thumbnails & navbar items & meshaker animating 'ME'  ###
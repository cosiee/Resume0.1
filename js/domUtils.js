// domUtils.js
export function getDomElements() {
  return {
    // mountains & clouds index.html
    svg: document.querySelector("#svg"),
    cloud1: document.getElementById("cloud1"),

    // see/me text index.html
    seeText: document.querySelector("#see"),
    meElement: document.getElementById("me"),
    meShaker: document.getElementById("meshaker"),

    // arrow index.html
    down: document.getElementById("down"),
    down: document.querySelector("#down"),

    // Navigation buttons index.html Statement & Form
    modalClose: document.getElementById("modalClose"),
    modalSig: document.getElementById("modalSig"),
    contactFormClose: document.getElementById("contactFormClose"),
    formButton: document.getElementById("formButton"),
    modalWipClose: document.getElementById("modalWipClose"),

    // Navbar links & Lists
    navHome: document.getElementById("navHome"),
    navSoftware: document.getElementById("softwareLink"),
    navDropMenuSoftware: document.querySelector("#softwareDropMenuLink"),
    navHtml: document.getElementById("navHtml"),
    navCss: document.getElementById("navCss"),
    navJavascript: document.getElementById("navJavascript"),
    navJava: document.getElementById("navJava"),
    navPython: document.getElementById("navPython"),
    navSql: document.getElementById("navSql"),
    navReact: document.getElementById("navReact"),
    navPhotography: document.getElementById("photographyLink"),
    navDiy: document.getElementById("diyLink"),
    navMotion: document.getElementById("motionLink"),
    navDropMenuMotion: document.querySelector("#motionDropMenuLink"),
    navAnimation: document.getElementById("navAnimation"),
    navVideo: document.getElementById("navVideo"),
    navContact: document.getElementById("contactLink"),

    // Thumbnails index.html
    thumbnailsContainer: document.querySelector("#thumbnails"),
    thumbElements: document.querySelectorAll(".thumbShape"),
    thumbNails: document.querySelector(".thumbnails"),
    software: document.getElementById("software"),
    photography: document.getElementById("photography"),
    motion: document.getElementById("motion"),
    diy: document.getElementById("diy"),
  };
  console.log(" domElements loaded:", elements); //  Log full object

  Object.entries(elements).forEach(([key, value]) => {
    if (!value) console.error(` Missing DOM element: ${key}`);
  });

  return elements;
}

export function centerElement(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.scrollTo({
    top: rect.top + scrollTop - window.innerHeight / 2,
    left: rect.left + scrollLeft - window.innerWidth / 2,
    behavior: "smooth",
  });
}

export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// These are placed here to imitgate conflict
// Used to position thumbnails, modalbox, WIP-msg and contact form when media query is satisfied
let endTopY = 0;
export let endLeftX, endRightX, endBottomY;
let screenWidthHalved = svg.viewBox.baseVal.width / 2;
let screenHeightHalved = svg.viewBox.baseVal.height / 2;
const totalThumbWidth = getThumbWidthWithMargin();

function getThumbWidthWithMargin() {
  const computedStyle = window.getComputedStyle(getDomElements().thumbElements[0]);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));
  const thumbMargin = parseFloat(
    computedStyle.getPropertyValue("margin-right")
  );

  return thumbWidth + thumbMargin * 2;
}


let cachedEndTopY = null; //  Store the value
export function getEndTopY() {
  if (cachedEndTopY !== null) {
    return cachedEndTopY; //  Use cached value instead of recalculating
  }

  cachedEndTopY = updateEndTopY(); // Compute once and store
  return cachedEndTopY;
}

//  Reset cache when needed (e.g., window resize)
window.addEventListener("resize", () => {
  cachedEndTopY = null;
});


// Functions to position thumbnails when media query is satisfied
export function updateEndTopY() {
  if (window.matchMedia("(orientation: landscape) and (max-width: 991.98px)").matches) {
    endTopY = window.innerHeight * 1.275;
  } else {
    endTopY = window.innerHeight * 1.325;
  }
  return endTopY;
}
export function getThumbWidthWithoutMargin() {
  const computedStyle = window.getComputedStyle(getDomElements().thumbElements[0]);
  const thumbWidth = parseFloat(computedStyle.getPropertyValue("width"));

  return thumbWidth;
}


export function updateDimensionsNoMargins() {
  setTimeout(() => {
    thumbWidth = Math.min(300, window.innerWidth / 6);
    console.log("thumbWidth: ", thumbWidth);
    screenWidthHalved = window.innerWidth / 2;
    screenHeightHalved = window.innerHeight / 2;
    const widthThumb = getThumbWidthWithoutMargin();
    const marginWidth = getThumbMargin();

    updateEndTopY();

    const updatedEndTopY = getEndTopY(); //  Fetch dynamically
    if (updatedEndTopY === undefined) {
      console.error("Error: getEndTopY() returned undefined!");
      return;
    }

    const endTopY = updatedEndTopY + marginWidth - 15;
    endLeftX = screenWidthHalved - (widthThumb + marginWidth);
    endRightX = screenWidthHalved - marginWidth;
    endBottomY = updateEndBottomY() - marginWidth - 15;

    collectThumbs();
    updateModalDimensions(endTopY);
    formControl(endTopY);
  }, 450); // delay to ensure scrollbar removal takes effect
}

export function collectThumbs() {
  gsap.to("#software", {
    scale: 1,
    x: endLeftX,
    y: getEndTopY(),
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#photography", {
    scale: 1,
    x: endRightX,
    y: getEndTopY(),
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
export function updateModalDimensions(endTopY) {
  const modalBox = document.querySelector(".modalbox .box");

  if (!modalBox || !getDomElements().thumbElements[0]) return;

  const thumbWidthWithoutMargin = getThumbWidthWithoutMargin();

  // Calculate new width and height for the modal box
  const newWidth = Math.max(thumbWidthWithoutMargin * 2 + 4, 300);
  const newHeight = newWidth; // Assuming we want a square modal

  // Update modal dimensions
  modalBox.style.width = `${newWidth}px`;
  modalBox.style.height = `${newHeight}px`;

  // Calculate the center of the screen
  const centerX = window.innerWidth / 2 + 8; //refining positioning

  // Calculate the new left position to center the modal box- x axis
  const newLeft = centerX - newWidth / 2;

  // Use the passed endTopY for the new top position
  const newTop = getEndTopY() + 9.4; //  works for alignment on y axis

  // Update modal position
  modalBox.style.position = "absolute";
  modalBox.style.left = `${newLeft}px`;
  modalBox.style.top = `${newTop}px`;

  // modalBox.style.display = "block";
}

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


let thumbWidth = getComputedStyleValue(
  document.querySelector(".thumbShape"),
  "width"
);


function getComputedStyleValue(element, property) {

  return parseInt(window.getComputedStyle(element).getPropertyValue(property));
}
export function updateDimensions() {
  thumbWidth = Math.min(300, window.innerWidth / 6);
  screenWidthHalved = window.innerWidth / 2;
  screenHeightHalved = window.innerHeight / 2;

  endLeftX = screenWidthHalved - totalThumbWidth;

  updateEndTopY(); //  Update the value first
  const updatedEndTopY = getEndTopY(); //  Retrieve the updated value

  if (updatedEndTopY === undefined) {
    console.error("Error: getEndTopY() returned undefined!");
    return; // Stop execution if the value is not set
  }

  const endTopY = updatedEndTopY; //  Use a local variable, do not redeclare globally

  endRightX = screenWidthHalved;
  updateEndBottomY();
}

function getThumbMargin() {
  const computedStyle = window.getComputedStyle(getDomElements().thumbElements[0]);
  const thumbMargin = parseFloat(
    computedStyle.getPropertyValue("margin-right")
  );
  return thumbMargin;
}
export function updateEndBottomY() {
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
export function spaceoutThumbs() {
  gsap.to("#software", {
    x: endLeftX,
    y: getEndTopY(),
    duration: 1,
    ease: "power2.out",
  });
  gsap.to("#photography", {
    x: endRightX,
    y: getEndTopY(),
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

export function showStatementContact() {
  updateDimensionsNoMargins();
  document.getElementById("statementContact").style.display = "block";
  document.getElementById("contactForm").style.display = "none";
}


// Displays Contact Form
export function showForm() {
  formControl();
  document.getElementById("contactForm").style.display = "block";
}
// 
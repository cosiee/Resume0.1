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
  console.log("✅ domElements loaded:", elements); // ✅ Log full object

  Object.entries(elements).forEach(([key, value]) => {
    if (!value) console.error(`❌ Missing DOM element: ${key}`);
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



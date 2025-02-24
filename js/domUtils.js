// domUtils.js
export function getDomElements() {
    return {
      thumbnailsContainer: document.querySelector("#thumbnails"),
      svg: document.querySelector("#svg"),
      cloud1: document.getElementById("cloud1"),
      thumbElement: document.querySelector(".thumbShape"),
      thumbNails: document.querySelector(".thumbnails"),
      seeText: document.querySelector("#see"),
      down: document.querySelector("#down"),
      meElement: document.getElementById("me"),
      meShaker: document.getElementById("meshaker"),
      modalClose: document.getElementById("modalClose"),
      modalSig: document.getElementById("modalSig"),   
      contactFormClose: document.getElementById("contactFormClose"), 
      formButton: document.getElementById("formButton"),
      navHome: document.getElementById("navHome"),
      contactLink: document.getElementById("contactLink"),
      navAnimation: document.getElementById("navAnimation"), 
      navVideo: document.getElementById("navVideo"),
      modalWipClose: document.getElementById("modalWipClose"),    
      diyLink: document.getElementById("diyLink"),  
      photographyLink: document.getElementById("photographyLink"),
      navSql: document.getElementById("navSql"),
      navPython: document.getElementById("navPython"),
      navJava: document.getElementById("navJava"),
      down: document.getElementById("down"),
      software: document.getElementById("software"),
      photography: document.getElementById("photography"),
      motion: document.getElementById("motion"),
      diy: document.getElementById("diy")
    };
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

  
  
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
  
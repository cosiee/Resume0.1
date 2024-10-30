// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const thumbSoft = document.querySelector("#software");
    const navbarSoft = document.querySelector(".dropdown-toggle");
  
    const thumbPhoto = document.querySelector("#photography");
    const navbarPhoto = document.querySelector("#photographyLink");
  
    const thumbMot = document.querySelector("#motion");
    const navbarMot = document.querySelector("#motionLink"); // Ensure this id matches your HTML
  
    const thumbDiy = document.querySelector("#diy");
    const navbarDiy = document.querySelector("#diyLink");
  
    // Check if elements are found before adding event listeners
    if (navbarMot) {
      // Function to handle adding active class
      function handleActive(navbarItem) {
        document.querySelectorAll('.nav-link').forEach((nav) => {
          nav.classList.remove('active');
        });
        navbarItem.classList.add('active');
      }
  
      // Event Listeners
      navbarSoft.addEventListener('click', () => handleActive(navbarSoft));
      navbarPhoto.addEventListener('click', () => handleActive(navbarPhoto));
      navbarMot.addEventListener('click', () => handleActive(navbarMot)); // For Motion
      navbarDiy.addEventListener('click', () => handleActive(navbarDiy));
    } else {
      console.error('Element #motionLink not found in the DOM');
    }
  });
  
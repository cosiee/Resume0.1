//photography.js
// This file is responsible for the photography section of the website.
import { DomUtils } from "./domUtils.js";
// import { initThumbnails, preloadCriticalImages } from "./preload.js";
import { Navbar } from './navbar.js';

export const selectors = {
  scrollDist: ".scrollDist",

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

  slider1: "#slider1",
  slider2: "#slider2",
  slider3: "#slider3",
  slider4: "#slider4",
  slider5: "#slider5",
  slider6: "#slider6",
  slider7: "#slider7",
  slider7: "#slider8"
};




const navbar = new Navbar(selectors);
// const duration = Navbar.BASE_SCROLL_DURATION; // For static property

const domUtils = new DomUtils(selectors);
// const domElements = domUtils.elements

// Initialize gallery modal functionality
function initGalleryModal() {
  // Create modal elements if they don't exist
  let modal = document.getElementById('galleryModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'galleryModal';
    modal.className = 'gallery-modal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
      <div class="gallery-modal-content">
        <span class="gallery-modal-close">&times;</span>
        <div class="gallery-main-image">
          <img src="" alt="Enlarged view">
        </div>
        <div class="gallery-thumbnails"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Set up close button
  document.querySelector('.gallery-modal-close').addEventListener('click', closeGalleryModal);
  
  // Close when clicking outside image
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeGalleryModal();
    }
  });
}

function setupSliderClickHandlers() {
  // Get all sliders on the page
  const sliders = document.querySelectorAll('.slider');
  
  sliders.forEach(slider => {
    // Get all DIV children of the slider (alternative to > div selector)
    const slides = Array.from(slider.children).filter(child => child.tagName === 'DIV');
    
    slides.forEach((slide, index) => {
      // Make sure the slide is clickable
      slide.style.cursor = 'pointer';
      
      // Add click handler
      slide.addEventListener('click', function() {
        openGalleryModal(slider, index);
      });
    });
  });
}

function openGalleryModal(slider, clickedIndex) {
  const modal = document.getElementById('galleryModal');
  const mainImage = modal.querySelector('.gallery-main-image img');
  const thumbnailsContainer = modal.querySelector('.gallery-thumbnails');
  
  // Clear previous thumbnails
  thumbnailsContainer.innerHTML = '';
  
  // Get all DIV children of the slider
  const slides = Array.from(slider.children).filter(child => child.tagName === 'DIV');
  
  // Process each slide
  slides.forEach((slide, index) => {
    // Get the background image URL
    const bgImage = window.getComputedStyle(slide).backgroundImage;
    const imageUrl = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    
    // Create thumbnail
    const thumbnail = document.createElement('div');
    thumbnail.className = 'gallery-thumbnail';
    if (index === clickedIndex) {
      thumbnail.classList.add('active');
      // Set the main image
      mainImage.src = imageUrl;
    }
    
    thumbnail.style.backgroundImage = `url(${imageUrl})`;
    
    // Click handler for thumbnail
    thumbnail.addEventListener('click', function() {
      // Update main image
      mainImage.src = imageUrl;
      
      // Update active thumbnail
      Array.from(thumbnailsContainer.children).forEach(thumb => {
        thumb.classList.remove('active');
      });
      this.classList.add('active');
    });
    
    thumbnailsContainer.appendChild(thumbnail);
  });
  
  // Show the modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}


function closeGalleryModal() {
  document.getElementById('galleryModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

document.addEventListener("DOMContentLoaded", function () {
  const navbar = new Navbar(selectors);
  const domUtils = new DomUtils(selectors);

  // Initialize navbar with contact form handler
  navbar.init(20);
  navbar.initializeFormCloseButton();
  // Set up contact link with proper fallback
  if (domUtils.elements.navContact) {
    domUtils.elements.navContact.addEventListener("click", function () {
      navbar.hideScrollBar();
      domUtils.formControl(); // This will use the fallback positioning
      domUtils.showStatementContact();
      domUtils.showForm();
    })

    $(window).on('load', function () {
      $("#slider1").sliderResponsive(); // Default settings

      $("#slider2").sliderResponsive({
        fadeSpeed: 300,
        autoPlay: "off",
        showArrows: "on",
        hideDots: "on"
      });

      $("#slider3").sliderResponsive({
        hoverZoom: "off",
        hideDots: "on"
      });

      $("#slider4").sliderResponsive({
        fadeSpeed: 300,
        autoPlay: "off",
        showArrows: "on",
        hideDots: "on"
      });

      $("#slider5").sliderResponsive({
        fadeSpeed: 300,
        autoPlay: "off",
        showArrows: "on",
        hideDots: "on"
      });

      $("#slider6").sliderResponsive();
    });


  }

  setupEventListeners();
initGalleryModal();
  setupSliderClickHandlers();
    
});


function setupEventListeners() {
  // Setup event listeners for elements that exist on this page
  if (domUtils.elements.modalClose) {
    domUtils.elements.modalClose.addEventListener("click", function () {
      navbar.showScrollBar();
      // Page-specific cleanup if needed
    });
  }





}








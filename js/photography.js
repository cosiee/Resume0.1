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
// Gallery Modal Elements
let galleryModal;
let galleryMainSlider;
let galleryThumbnails;

// Add to photography.js

// Update the initGalleryModal function
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
        <div class="gallery-main-slider"></div>
        <div class="gallery-thumbnails"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Get all slider images from all sliders
  const sliders = document.querySelectorAll('.slider');
  
  // Add click event to each slider's slides
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('div:not(.arrows):not(.titleBar)');
    
    slides.forEach((slide, index) => {
      if (slide.style.backgroundImage || window.getComputedStyle(slide).backgroundImage !== 'none') {
        slide.style.cursor = 'pointer';
        slide.addEventListener('click', function() {
          openGalleryModal(slide, index, slider);
        });
      }
    });
  });
  
  // Close modal when X is clicked
  const closeBtn = document.querySelector('.gallery-modal-close');
  closeBtn.addEventListener('click', closeGalleryModal);
  
  // Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeGalleryModal();
    }
  });
}

// Update the openGalleryModal function
// function openGalleryModal(clickedSlide, slideIndex, sliderContainer) {
//   const modal = document.getElementById('galleryModal');
//   const mainSlider = modal.querySelector('.gallery-main-slider');
//   const thumbnails = modal.querySelector('.gallery-thumbnails');
  
//   // Clear previous content
//   mainSlider.innerHTML = '';
//   thumbnails.innerHTML = '';
  
//   // Get all slides from the clicked slider
//   const allSlides = Array.from(sliderContainer.children)
//     .filter(el => {
//       // Filter out non-slide elements (arrows, title bars, etc.)
//       return !el.classList.contains('arrows') && 
//              !el.classList.contains('titleBar') &&
//              (el.style.backgroundImage || window.getComputedStyle(el).backgroundImage !== 'none');
//     });
  
//   // Create main slider content
//   allSlides.forEach((slide, index) => {
//     const slideClone = document.createElement('div');
//     slideClone.className = 'gallery-slide';
    
//     // Copy background image
//     const bgImage = slide.style.backgroundImage || window.getComputedStyle(slide).backgroundImage;
//     slideClone.style.backgroundImage = bgImage;
//     slideClone.style.backgroundSize = 'contain';
//     slideClone.style.backgroundRepeat = 'no-repeat';
//     slideClone.style.backgroundPosition = 'center';
    
//     slideClone.style.display = index === slideIndex ? 'block' : 'none';
//     mainSlider.appendChild(slideClone);
    
//     // Create thumbnail
//     const thumb = document.createElement('div');
//     thumb.className = 'gallery-thumb';
//     if (index === slideIndex) thumb.classList.add('active');
    
//     thumb.style.backgroundImage = bgImage;
//     thumb.style.backgroundSize = 'cover';
//     thumb.style.backgroundPosition = 'center';
    
//     thumb.addEventListener('click', () => {
//       // Update main slider
//       Array.from(mainSlider.children).forEach((s, i) => {
//         s.style.display = i === index ? 'block' : 'none';
//       });
      
//       // Update active thumbnail
//       Array.from(thumbnails.children).forEach(t => {
//         t.classList.toggle('active', t === thumb);
//       });
//     });
    
//     thumbnails.appendChild(thumb);
//   });
  
//   // Show modal
//   modal.style.display = 'flex';
//   document.body.style.overflow = 'hidden';
// }

// Update the openGalleryModal function to include the new layout structure
function openGalleryModal(clickedSlide, slideIndex, sliderContainer) {
  const modal = document.getElementById('galleryModal');
  const mainSlider = modal.querySelector('.gallery-main-slider');
  const thumbnails = modal.querySelector('.gallery-thumbnails');
  
  // Clear previous content
  mainSlider.innerHTML = '';
  thumbnails.innerHTML = '';
  
  // Get all slides from the clicked slider
  const allSlides = Array.from(sliderContainer.children)
    .filter(el => {
      return !el.classList.contains('arrows') && 
             !el.classList.contains('titleBar') &&
             (el.style.backgroundImage || window.getComputedStyle(el).backgroundImage !== 'none');
    });
  
  // Create main slider content with new structure
  const galleryContent = document.createElement('div');
  galleryContent.className = 'gallery-content-wrapper';
  
  // Create main image container
  const mainImageContainer = document.createElement('div');
  mainImageContainer.className = 'gallery-main-image';
  
  // Create navigation arrows
  const prevArrow = document.createElement('div');
  prevArrow.className = 'gallery-prev';
  prevArrow.innerHTML = '❮';
  
  const nextArrow = document.createElement('div');
  nextArrow.className = 'gallery-next';
  nextArrow.innerHTML = '❯';
  
  // Create image counter
  const imageCounter = document.createElement('div');
  imageCounter.className = 'gallery-counter';
  imageCounter.textContent = `${slideIndex + 1} / ${allSlides.length}`;
  
  mainSlider.appendChild(galleryContent);
  galleryContent.appendChild(prevArrow);
  galleryContent.appendChild(mainImageContainer);
  galleryContent.appendChild(nextArrow);
  galleryContent.appendChild(imageCounter);
  
  // Create slides
  allSlides.forEach((slide, index) => {
    const slideClone = document.createElement('div');
    slideClone.className = 'gallery-slide';
    
    // Copy background image
    const bgImage = slide.style.backgroundImage || window.getComputedStyle(slide).backgroundImage;
    slideClone.style.backgroundImage = bgImage;
    slideClone.style.backgroundSize = 'contain';
    slideClone.style.backgroundRepeat = 'no-repeat';
    slideClone.style.backgroundPosition = 'center';
    
    slideClone.style.display = index === slideIndex ? 'block' : 'none';
    mainImageContainer.appendChild(slideClone);
    
    // Create thumbnail
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumb';
    if (index === slideIndex) thumb.classList.add('active');
    
    thumb.style.backgroundImage = bgImage;
    thumb.style.backgroundSize = 'cover';
    thumb.style.backgroundPosition = 'center';
    
    thumb.addEventListener('click', () => {
      // Update main slider
      Array.from(mainImageContainer.children).forEach((s, i) => {
        s.style.display = i === index ? 'block' : 'none';
      });
      
      // Update active thumbnail
      Array.from(thumbnails.children).forEach(t => {
        t.classList.toggle('active', t === thumb);
      });
      
      // Update counter
      imageCounter.textContent = `${index + 1} / ${allSlides.length}`;
    });
    
    thumbnails.appendChild(thumb);
  });
  
  // Add navigation functionality
  prevArrow.addEventListener('click', () => {
    const currentIndex = Array.from(mainImageContainer.children).findIndex(
      slide => slide.style.display === 'block'
    );
    const prevIndex = (currentIndex - 1 + allSlides.length) % allSlides.length;
    
    mainImageContainer.children[currentIndex].style.display = 'none';
    mainImageContainer.children[prevIndex].style.display = 'block';
    
    // Update active thumbnail
    Array.from(thumbnails.children).forEach((thumb, i) => {
      thumb.classList.toggle('active', i === prevIndex);
    });
    
    // Update counter
    imageCounter.textContent = `${prevIndex + 1} / ${allSlides.length}`;
  });
  
  nextArrow.addEventListener('click', () => {
    const currentIndex = Array.from(mainImageContainer.children).findIndex(
      slide => slide.style.display === 'block'
    );
    const nextIndex = (currentIndex + 1) % allSlides.length;
    
    mainImageContainer.children[currentIndex].style.display = 'none';
    mainImageContainer.children[nextIndex].style.display = 'block';
    
    // Update active thumbnail
    Array.from(thumbnails.children).forEach((thumb, i) => {
      thumb.classList.toggle('active', i === nextIndex);
    });
    
    // Update counter
    imageCounter.textContent = `${nextIndex + 1} / ${allSlides.length}`;
  });
  
  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  const modal = document.getElementById('galleryModal');
  modal.style.display = 'none';
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

// Initialize gallery modal
  initGalleryModal();
  // setupSliderClickHandlers();
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








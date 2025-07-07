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



// initGalleryModal function
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


function openGalleryModal(clickedSlide, slideIndex, sliderContainer) {
  const modal = document.getElementById('galleryModal');
  modal.innerHTML = `
    <div class="gallery-modal-content">
      <span class="gallery-close-btn">&times;</span>
      <div class="gallery-main-container">
        <div class="gallery-slide-container"></div>
        <button class="gallery-nav-btn prev-btn">&#10094;</button>
        <button class="gallery-nav-btn next-btn">&#10095;</button>
      </div>
      <div class="gallery-thumbnails-container">
        <div class="gallery-thumbnails-wrapper"></div>
      </div>
    </div>
  `;

  const slideContainer = modal.querySelector('.gallery-slide-container');
  const thumbnailsWrapper = modal.querySelector('.gallery-thumbnails-wrapper');
  const closeBtn = modal.querySelector('.gallery-close-btn');
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');

  // Debug styling - temporary
  // thumbnailsWrapper.style.border = '2px solid red';
  // thumbnailsWrapper.style.backgroundColor = 'rgba(255,0,0,0.1)';

  // Get all slides (excluding arrows and titleBar)
  const allSlides = Array.from(sliderContainer.children)
    .filter(div => {
      const isSlide = div.tagName === 'DIV' && 
                    !div.classList.contains('arrows') && 
                    !div.classList.contains('titleBar');
      return isSlide;
    });

  // Create slides and thumbnails
  allSlides.forEach((slide, index) => {
    const bgImage = window.getComputedStyle(slide).backgroundImage;
    
    // Main slide
    const slideElement = document.createElement('div');
    slideElement.className = 'gallery-slide';
    slideElement.style.cssText = `
      background-image: ${bgImage};
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      display: ${index === slideIndex ? 'block' : 'none'};
    `;
    slideContainer.appendChild(slideElement);
    
    // Thumbnail
    const thumbElement = document.createElement('div');
  thumbElement.className = 'gallery-thumb';
  thumbElement.style.cssText = `
    background-image: ${bgImage};
    background-size: cover;
    background-position: center;
    width: 60px;  // Changed from 60px to match container
    height: 60px;
    flex-shrink: 0;
    display: block; // Ensure visibility
    cursor: pointer;
    border-radius: 6px;
    border: 2px solid ${index === slideIndex ? '#fff' : 'transparent'};
    opacity: ${index === slideIndex ? '1' : '0.7'};
    transition: all 0.3s ease;
  `;
  
  // Keep all interactive functionality
  thumbElement.addEventListener('click', () => {
    showSlide(index);
    thumbElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  });
  
  console.log(`Appending thumbnail ${index}`, thumbElement);
  thumbnailsWrapper.appendChild(thumbElement);
});

thumbnailsWrapper.style.minWidth = `${( 10) * allSlides.length}px`;
console.log('Forced wrapper width:', thumbnailsWrapper.style.minWidth);

  // Navigation functions
  function showSlide(index) {
    const slides = modal.querySelectorAll('.gallery-slide');
    const thumbs = modal.querySelectorAll('.gallery-thumb');
    
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    
    thumbs.forEach((thumb, i) => {
      thumb.style.opacity = i === index ? '1' : '0.7';
      thumb.style.borderColor = i === index ? '#fff' : 'transparent';
    });
  }

  function showNextSlide() {
    const currentIndex = Array.from(modal.querySelectorAll('.gallery-slide'))
      .findIndex(slide => slide.style.display === 'block');
    const nextIndex = (currentIndex + 1) % allSlides.length;
    showSlide(nextIndex);
    
    const activeThumb = modal.querySelectorAll('.gallery-thumb')[nextIndex];
    activeThumb?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function showPrevSlide() {
    const currentIndex = Array.from(modal.querySelectorAll('.gallery-slide'))
      .findIndex(slide => slide.style.display === 'block');
    const prevIndex = (currentIndex - 1 + allSlides.length) % allSlides.length;
    showSlide(prevIndex);
    
    const activeThumb = modal.querySelectorAll('.gallery-thumb')[prevIndex];
    activeThumb?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  // Event listeners
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  prevBtn.addEventListener('click', showPrevSlide);
  nextBtn.addEventListener('click', showNextSlide);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function handleKeyDown(e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') showPrevSlide();
      if (e.key === 'ArrowRight') showNextSlide();
      if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });

  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Center the initial active thumbnail
  setTimeout(() => {
    const activeThumb = modal.querySelectorAll('.gallery-thumb')[slideIndex];
    activeThumb?.scrollIntoView({
      block: 'nearest',
      inline: 'center'
    });
  }, 100);
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
//       return !el.classList.contains('arrows') && 
//              !el.classList.contains('titleBar') &&
//              (el.style.backgroundImage || window.getComputedStyle(el).backgroundImage !== 'none');
//     });
  
//   // Create main slider content with new structure
//   const galleryContent = document.createElement('div');
//   galleryContent.className = 'gallery-content-wrapper';
  
//   // Create main image container
//   const mainImageContainer = document.createElement('div');
//   mainImageContainer.className = 'gallery-main-image';
  
//   // Create navigation arrows
//   const prevArrow = document.createElement('div');
//   prevArrow.className = 'gallery-prev';
//   prevArrow.innerHTML = '❮';
  
//   const nextArrow = document.createElement('div');
//   nextArrow.className = 'gallery-next';
//   nextArrow.innerHTML = '❯';
  
//   // Create image counter
//   const imageCounter = document.createElement('div');
//   imageCounter.className = 'gallery-counter';
//   imageCounter.textContent = `${slideIndex + 1} / ${allSlides.length}`;
  
//   mainSlider.appendChild(galleryContent);
//   galleryContent.appendChild(prevArrow);
//   galleryContent.appendChild(mainImageContainer);
//   galleryContent.appendChild(nextArrow);
//   galleryContent.appendChild(imageCounter);
  
//   // Create slides
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
//     mainImageContainer.appendChild(slideClone);
    
//     // Create thumbnail
//     const thumb = document.createElement('div');
//     thumb.className = 'gallery-thumb';
//     if (index === slideIndex) thumb.classList.add('active');
    
//     thumb.style.backgroundImage = bgImage;
//     thumb.style.backgroundSize = 'cover';
//     thumb.style.backgroundPosition = 'center';
    
//     thumb.addEventListener('click', () => {
//       // Update main slider
//       Array.from(mainImageContainer.children).forEach((s, i) => {
//         s.style.display = i === index ? 'block' : 'none';
//       });
      
//       // Update active thumbnail
//       Array.from(thumbnails.children).forEach(t => {
//         t.classList.toggle('active', t === thumb);
//       });
      
//       // Update counter
//       imageCounter.textContent = `${index + 1} / ${allSlides.length}`;
//     });
    
//     thumbnails.appendChild(thumb);
//   });
  
//   // Add navigation functionality
//   prevArrow.addEventListener('click', () => {
//     const currentIndex = Array.from(mainImageContainer.children).findIndex(
//       slide => slide.style.display === 'block'
//     );
//     const prevIndex = (currentIndex - 1 + allSlides.length) % allSlides.length;
    
//     mainImageContainer.children[currentIndex].style.display = 'none';
//     mainImageContainer.children[prevIndex].style.display = 'block';
    
//     // Update active thumbnail
//     Array.from(thumbnails.children).forEach((thumb, i) => {
//       thumb.classList.toggle('active', i === prevIndex);
//     });
    
//     // Update counter
//     imageCounter.textContent = `${prevIndex + 1} / ${allSlides.length}`;
//   });
  
//   nextArrow.addEventListener('click', () => {
//     const currentIndex = Array.from(mainImageContainer.children).findIndex(
//       slide => slide.style.display === 'block'
//     );
//     const nextIndex = (currentIndex + 1) % allSlides.length;
    
//     mainImageContainer.children[currentIndex].style.display = 'none';
//     mainImageContainer.children[nextIndex].style.display = 'block';
    
//     // Update active thumbnail
//     Array.from(thumbnails.children).forEach((thumb, i) => {
//       thumb.classList.toggle('active', i === nextIndex);
//     });
    
//     // Update counter
//     imageCounter.textContent = `${nextIndex + 1} / ${allSlides.length}`;
//   });
  
//   // Show modal
//   modal.style.display = 'flex';
//   document.body.style.overflow = 'hidden';
// }

// Update the openGalleryModal function
// function openGalleryModal(clickedSlide, slideIndex, sliderContainer) {
//   const modal = document.getElementById('galleryModal');
//   modal.innerHTML = `
//     <div class="gallery-modal-content">
//       <span class="gallery-close-btn">&times;</span>
//       <div class="gallery-main-container">
//         <div class="gallery-slide-container"></div>
//         <button class="gallery-nav-btn prev-btn">&#10094;</button>
//         <button class="gallery-nav-btn next-btn">&#10095;</button>
//       </div>
//       <div class="gallery-thumbnails-container"></div>
//     </div>
//   `;

//   const slideContainer = modal.querySelector('.gallery-slide-container');
//   const thumbnailsContainer = modal.querySelector('.gallery-thumbnails-container');
//   const closeBtn = modal.querySelector('.gallery-close-btn');
//   const prevBtn = modal.querySelector('.prev-btn');
//   const nextBtn = modal.querySelector('.next-btn');

//   // Get all slides from the clicked slider
//   const allSlides = Array.from(sliderContainer.children)
//     .filter(el => {
//       return !el.classList.contains('arrows') && 
//              !el.classList.contains('titleBar') &&
//              (el.style.backgroundImage || window.getComputedStyle(el).backgroundImage !== 'none');
//     });

//   // Create slides and thumbnails
//   allSlides.forEach((slide, index) => {
//     const bgImage = slide.style.backgroundImage || window.getComputedStyle(slide).backgroundImage;
    
//     // Create main slide
//     const slideElement = document.createElement('div');
//     slideElement.className = 'gallery-slide';
//     slideElement.style.backgroundImage = bgImage;
//     slideElement.style.display = index === slideIndex ? 'block' : 'none';
//     slideContainer.appendChild(slideElement);
    
//     // Create thumbnail
//     const thumbElement = document.createElement('div');
//     thumbElement.className = 'gallery-thumb';
//     thumbElement.style.backgroundImage = bgImage;
//     if (index === slideIndex) thumbElement.classList.add('active');
    
//     thumbElement.addEventListener('click', () => {
//       showSlide(index);
//     });
    
//     thumbnailsContainer.appendChild(thumbElement);
//   });

//   // Navigation functions
//   function showSlide(index) {
//     const slides = modal.querySelectorAll('.gallery-slide');
//     const thumbs = modal.querySelectorAll('.gallery-thumb');
    
//     slides.forEach((slide, i) => {
//       slide.style.display = i === index ? 'block' : 'none';
//     });
    
//     thumbs.forEach((thumb, i) => {
//       thumb.classList.toggle('active', i === index);
//     });
//   }

//   function showNextSlide() {
//     const currentIndex = Array.from(modal.querySelectorAll('.gallery-slide'))
//       .findIndex(slide => slide.style.display === 'block');
//     const nextIndex = (currentIndex + 1) % allSlides.length;
//     showSlide(nextIndex);
//   }

//   function showPrevSlide() {
//     const currentIndex = Array.from(modal.querySelectorAll('.gallery-slide'))
//       .findIndex(slide => slide.style.display === 'block');
//     const prevIndex = (currentIndex - 1 + allSlides.length) % allSlides.length;
//     showSlide(prevIndex);
//   }

//   // Event listeners
//   closeBtn.addEventListener('click', closeGalleryModal);
//   prevBtn.addEventListener('click', showPrevSlide);
//   nextBtn.addEventListener('click', showNextSlide);
  
//   modal.addEventListener('click', (e) => {
//     if (e.target === modal) {
//       closeGalleryModal();
//     }
//   });

//   // Keyboard navigation
//   document.addEventListener('keydown', function handleKeyDown(e) {
//     if (modal.style.display === 'flex') {
//       if (e.key === 'ArrowLeft') showPrevSlide();
//       if (e.key === 'ArrowRight') showNextSlide();
//       if (e.key === 'Escape') closeGalleryModal();
//     }
//   });

//   // Show modal
//   modal.style.display = 'flex';
//   document.body.style.overflow = 'hidden';
// }


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








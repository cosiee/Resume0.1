//videography.js

import { DomUtils } from "./domUtils.js";
import { Navbar } from "./navbar.js"

class WebPAnimationController {
  constructor() {
    this.localStaticBase = "assets/animationStills/";
    this.sliders = [];
  }

  init() {
    this.sliders = document.querySelectorAll('.slider');
    this.processSliders();
  }

  processSliders() {
    this.sliders.forEach(slider => {
      const slides = slider.querySelectorAll('div:not(.arrows):not(.titleBar)');
      
      slides.forEach(slide => {
        const bgImage = window.getComputedStyle(slide).backgroundImage;
        const cloudinaryUrl = this.extractUrl(bgImage);
        
        if (!cloudinaryUrl) return;

        const staticFilename = this.getLocalStaticPath(cloudinaryUrl);
        slide.dataset.animatedUrl = cloudinaryUrl;
        slide.dataset.staticUrl = staticFilename;
        
        // Set initial static image
        slide.style.backgroundImage = `url(${staticFilename})`;
        
        // Event listeners
        slide.addEventListener('mouseenter', () => {
          slide.style.backgroundImage = `url(${cloudinaryUrl})`;
        });
        
        slide.addEventListener('mouseleave', () => {
          slide.style.backgroundImage = `url(${staticFilename})`;
        });
      });
    });
  }

  extractUrl(bgImage) {
    const urlMatch = bgImage.match(/url\(["']?(https:\/\/res\.cloudinary\.com[^"']+)["']?\)/);
    return urlMatch ? urlMatch[1] : null;
  }

  getLocalStaticPath(cloudinaryUrl) {
    const filename = cloudinaryUrl.split('/').pop();
    const baseName = filename.replace('.webp', '-static.webp');
    return `${this.localStaticBase}${baseName}`;
  }
}

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


  slider7: "#slider7",
  slider8: "#slider8",
  slider9: "#slider9",
  slider10: "#slider10",
  slider11: "#slider11",
  slider12: "#slider12"
};

const navbar = new Navbar(selectors);
// const duration = Navbar.BASE_SCROLL_DURATION; // For static property

const domUtils = new DomUtils(selectors);
// const domElements = domUtils.elements
// Gallery Modal Elements
let galleryModal;
let galleryMainSlider;
let galleryThumbnails;

const galleryData = {

  // Videos
  philippines: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752940235/Philippines_optimized2_hsqssk.webp",
    ],
    video: "qhpP6xXJFHI" // YouTube video ID
  },
  
  indonesia: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753215210/Indonesia_dmqffm.webp",
    ],
    video: "xQlCL6j8dsA" // YouTube video ID
  },
  newzealand: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753701614/NewZealand_wwi4sl.webp",
   ],
    video: "05Tj8vPWId0" // YouTube video ID
  },
  egypt: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753704798/egypt_qtskpg.webp",
    ],
    video: "rDUgpw18aLg" // YouTube video ID
  },

  samoa: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753788913/samoa_bg2tli.webp",
       ],
    video: "76nhoXgqC7c" // YouTube video ID
  },
  nepal: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753790248/nepal_cix1jj.webp",
       ],
    video: "m4PsWWbZiDI" // YouTube video ID
  },

  // Animations
  craicinit: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753790248/nepal_cix1jj.webp",
       ],
    video: "Hk5KfzTXpuI" // YouTube video ID
  },





};



function openVideoModal(sliderContainer) {
  // Create or get modal element
  const modal = document.getElementById('galleryModal') || document.createElement('div');
  modal.id = 'galleryModal';
  modal.className = 'video-modal';
  if (!document.getElementById('galleryModal')) {
    document.body.appendChild(modal);
  }

  // Gallery mapping
  const galleryMap = {
    slider7: "philippines",
    slider8: "newzealand",
    slider9: "indonesia",
    slider10: "egypt",
    slider11: "samoa",
    slider12: "nepal"
    // Add other sliders as needed
  };

  const galleryId = galleryMap[sliderContainer.id];
  const videoId = galleryData[galleryId]?.video;

  if (!videoId) return; // Exit if no video

  // Modal HTML with centered 90% container
  modal.innerHTML = `
    <div class="video-modal-overlay">
      <div class="video-modal-container">
        <div class="video-wrapper">
          <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                  frameborder="0" 
                  allowfullscreen></iframe>
        </div>
        <button class="close-btn">&times;</button>
      </div>
    </div>
  `;

  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  // Close functionality
  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.querySelector('iframe').src = '';
  };

  modal.querySelector('.close-btn').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => e.target === modal && closeModal());
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
}

// function openVideoModal(sliderContainer) {
// Update initGalleryModal to use the simplified video modal
function initGalleryModal() {
  const sliders = document.querySelectorAll(".slider");
  
  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll("div:not(.arrows):not(.titleBar)");
    
    slides.forEach((slide) => {
      slide.style.cursor = "pointer";
      slide.addEventListener("click", () => openVideoModal(slider));
    });
  });
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
    });

    // window.addEventListener("load", preloadFullGalleryImages);

    initializeSliders();
  }

  setupEventListeners();

  // Initialize gallery modal
  initGalleryModal();
  // setupSliderClickHandlers();

  const sliders = document.querySelectorAll('.slider');
  
  

const animationController = new WebPAnimationController();
  animationController.init();
  console.log('Testing static path:', 
  animationController.getLocalStaticPath(
    "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752940235/Philippines_optimized2_hsqssk.webp"
  )
);


});


  // Get all slider images from all sliders
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll("div:not(.arrows):not(.titleBar)");

    slides.forEach((slide, index) => {
      if (
        slide.style.backgroundImage ||
        window.getComputedStyle(slide).backgroundImage !== "none"
      ) {
        slide.style.cursor = "pointer";
        slide.addEventListener("click", function () {
          openGalleryModal(slide, index, slider);
        });
      }
    });
  });

  // Close modal when X is clicked
  const closeBtn = document.querySelector(".gallery-modal-close");
  closeBtn.addEventListener("click", closeGalleryModal);

  // Close modal when clicking outside content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeGalleryModal();
    }
  });


function openGalleryModal(clickedSlide, slideIndex, sliderContainer) {
  const modal = document.getElementById("galleryModal");
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

  const slideContainer = modal.querySelector(".gallery-slide-container");
  const thumbnailsWrapper = modal.querySelector(".gallery-thumbnails-wrapper");
  const closeBtn = modal.querySelector(".gallery-close-btn");
  const prevBtn = modal.querySelector(".prev-btn");
  const nextBtn = modal.querySelector(".next-btn");

  // Determine which gallery we're opening based on slider ID
  const galleryMap = {

    slider7: "philippines",
    slider8: "newzealand",
    slider9: "indonesia",
    slider10: "egypt",
    slider11: "samoa",
    slider12: "nepal"
  };

  const galleryId = galleryMap[sliderContainer.id] || "default";

  // COMBINE PREVIEW + FULL IMAGES
  const previewImages = galleryData[galleryId]?.preview || [];
  const fullImages = galleryData[galleryId]?.full || [];
  const allImages = [...previewImages, ...fullImages]; // Merge both arrays

  // Create slides and thumbnails from ALL images
  allImages.forEach((imgUrl, index) => {
    // Main slide
    const slideElement = document.createElement("div");
    slideElement.className = "gallery-slide";
    slideElement.style.cssText = `
      background-image: url(${imgUrl});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      display: ${index === slideIndex ? "block" : "none"};
    `;
    slideContainer.appendChild(slideElement);

    // Thumbnail
    const thumbElement = document.createElement("div");
    thumbElement.className = "gallery-thumb";
    thumbElement.style.cssText = `
      background-image: url(${imgUrl});
      background-size: cover;
      background-position: center;
      background-repeat: no;
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      display: block;
      cursor: pointer;
      border-radius: 6px;
      border: 2px solid ${index === slideIndex ? "#fff" : "transparent"};
      opacity: ${index === slideIndex ? "1" : "0.7"};
      transition: all 0.3s ease;
    `;

    thumbElement.addEventListener("click", () => {
      showSlide(index);
      thumbElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    });

    thumbnailsWrapper.appendChild(thumbElement);
  });

  // Set wrapper dimensions
  thumbnailsWrapper.style.minWidth = `${(60 + 10) * allImages.length}px`;
  thumbnailsWrapper.style.margin = "0 auto";

  // Navigation functions
  function showSlide(index) {
    const slides = modal.querySelectorAll(".gallery-slide");
    const thumbs = modal.querySelectorAll(".gallery-thumb");

    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });

    thumbs.forEach((thumb, i) => {
      thumb.style.opacity = i === index ? "1" : "0.7";
      thumb.style.borderColor = i === index ? "#fff" : "transparent";
    });
  }

  function showNextSlide() {
    const currentIndex = Array.from(
      modal.querySelectorAll(".gallery-slide")
    ).findIndex((slide) => slide.style.display === "block");
    const nextIndex = (currentIndex + 1) % allImages.length;
    showSlide(nextIndex);

    const activeThumb = modal.querySelectorAll(".gallery-thumb")[nextIndex];
    activeThumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function showPrevSlide() {
    const currentIndex = Array.from(
      modal.querySelectorAll(".gallery-slide")
    ).findIndex((slide) => slide.style.display === "block");
    const prevIndex = (currentIndex - 1 + allImages.length) % images.length;
    showSlide(prevIndex);

    const activeThumb = modal.querySelectorAll(".gallery-thumb")[prevIndex];
    activeThumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  // Event listeners
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  prevBtn.addEventListener("click", showPrevSlide);
  nextBtn.addEventListener("click", showNextSlide);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function handleKeyDown(e) {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") showPrevSlide();
      if (e.key === "ArrowRight") showNextSlide();
      if (e.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  });

  // Show modal
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Center the initial active thumbnail
  setTimeout(() => {
    const activeThumb = modal.querySelectorAll(".gallery-thumb")[slideIndex];
    activeThumb?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, 100);
}

function closeGalleryModal() {
  const modal = document.getElementById("galleryModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function setupEventListeners() {
  // Setup event listeners for elements that exist on this page
  if (domUtils.elements.modalClose) {
    domUtils.elements.modalClose.addEventListener("click", function () {
      navbar.showScrollBar();
      // Page-specific cleanup if needed
    });
  }
}


function initializeSliders() {
  // Verify plugin is available
  if (!$.fn.sliderResponsive) {
    console.error("sliderResponsive plugin not found");
    return;
  }

  const sliderConfigs = {
   
    "#slider7": { gallery: "philippines", options: {} },
    "#slider8": { gallery: "newzealand", options: {} },
    "#slider9": { gallery: "indonesia", options: {} },
    "#slider10": { gallery: "egypt", options: {} },
    "#slider11": { gallery: "samoa", options: {} },
    "#slider12": { gallery: "nepal", options: {} },


  };

  // First initialize all sliders with their default content
  $(window).on("load", function () {


    $("#slider7").sliderResponsive();
    $("#slider8").sliderResponsive();
    $("#slider9").sliderResponsive();
    $("#slider10").sliderResponsive();
    $("#slider11").sliderResponsive();
    $("#slider12").sliderResponsive();

  });






  // Then replace content while preserving functionality
  // setTimeout(() => {
  Object.entries(sliderConfigs).forEach(([sliderId, config]) => {
    const $slider = $(sliderId);
    if (!$slider.length) return;

    // Get reference to plugin instance before modifying DOM
    const sliderInstance = $slider.data("sliderResponsive");

    // Store structural element
    
    const $titleBar = $slider.find(".titleBar").detach();


    // Clear slides only
    $slider.find("> div").not(".arrows, .titleBar").remove();

    // Add new slides
    galleryData[config.gallery]?.preview.forEach((imgUrl) => {
      $slider.append($("<div>").css("background-image", `url(${imgUrl})`));
    });

    // Reattach structural element
    
    $slider.append($titleBar);
  

    // Reinitialize if needed
    if (sliderInstance) {
      sliderInstance.size = $slider.find("> div").length;
      sliderInstance.position = 0;
      $slider.find("div:first-of-type").addClass("show").show();
      $slider.find("> div").not(".show").hide();
      // if ($dots.length) {
      //   $slider.find(".showli").removeClass("showli");
      //   $slider.find("> ul > li:first").addClass("showli");
      // }
    }
  });
  // }, 20); // Delay to ensure initial initialization completes
}

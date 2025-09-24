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
          if (cloudinaryUrl.endsWith('.mp4')) {
            this.handleVideoHover(slide, cloudinaryUrl);
          } else {
            slide.style.backgroundImage = `url(${cloudinaryUrl})`;
          }
        });
        
        slide.addEventListener('mouseleave', () => {
          if (cloudinaryUrl.endsWith('.mp4')) {
            this.handleVideoLeave(slide);
          } else {
            slide.style.backgroundImage = `url(${staticFilename})`;
          }
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
    let baseName;
    
    if (filename.endsWith('.webp')) {
      baseName = filename.replace('.webp', '-static.webp');
    } else if (filename.endsWith('.mp4')) {
      baseName = filename.replace('.mp4', '-static.webp');
    } else {
      baseName = filename;
    }
    
    return `${this.localStaticBase}${baseName}`;
  }

  handleVideoHover(slide, videoUrl) {
    let video = slide.querySelector('video');
    
    // Create video element if it doesn't exist
    if (!video) {
      video = document.createElement('video');
      video.src = videoUrl;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.position = 'absolute';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      video.style.display = 'none'; // Start hidden
      slide.appendChild(video);
    }

    // Show video and hide static image
    video.style.display = 'block';
    slide.style.backgroundImage = 'none';
    
    // Reset and play video
    video.currentTime = 0;
    video.play().catch(e => console.log('Video play failed:', e));
  }

  handleVideoLeave(slide) {
    const video = slide.querySelector('video');
    if (video) {
      video.pause();
      video.style.display = 'none'; // Hide video
    }
    // Show static image
    slide.style.backgroundImage = `url(${slide.dataset.staticUrl})`;
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
  slider12: "#slider12",

  slider13: "#slider13",
  slider14: "#slider14",
  slider15: "#slider15",
  slider16: "#slider16",
  slider17: "#slider17",
  slider18: "#slider18",

  slider19: "#slider19",
  slider20: "#slider20",
  slider21: "#slider21",
  slider22: "#slider22",
  slider23: "#slider23",
  slider24: "#slider24",
  slider25: "#slider25",
  slider26: "#slider26",
  slider27: "#slider27"
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
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753809078/craicinit_wvskmy.mp4",
       ],
    video: "Hk5KfzTXpuI" // YouTube video ID
  },
  invite: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753955518/invite_bqvhyz.mp4",
       ],
    video: "YYtQM6siWnk" // YouTube video ID
  },

  thanks: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753956855/Thanks_d1a8ez.mp4",
       ],
    video: "1RxAHs7cE0Y" // YouTube video ID
  },

  indoAni: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753972928/IndoAni_rv3yus.mp4",
       ],
    video: "tpriKnDglCY" // YouTube video ID
  },
  philliAni: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753972928/PhilliAni_jbsoss.mp4",
       ],
    video: "V4ynt1X0rHQ" // YouTube video ID
  },

  timeLapse: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753972927/TimeLapse_dkdhwq.mp4",
       ],
    video: "V4ynt1X0rHQ" // YouTube video ID
  },

// Projects
  loggia: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194494/Loggia_tjmphl.webp",
       ],
    video: "wvEHub7-F3s" // YouTube video ID
  },
  panelling: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194493/Paneling1-2_a0qnkc.webp",
       ],
    video: "QcLegwyHlrM" // YouTube video ID
  },

  flooring: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194492/Flooring1-1_g7zwmb.webp",
       ],
    video: "P5I5u0pv-DI" // YouTube video ID
  },

  panelling1: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194494/Paneling1-1_lz41eo.webp",
       ],
    video: "8zTVQQLQIl0" // YouTube video ID
  },

  bunks: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194493/BunkBeds_elypk3.webp",
       ],
    video: "rqsVKFsAuHg" // YouTube video ID
  },

  lori: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194494/LoriBed_f1mayu.webp",
       ],
    video: "n3SJgvm9DLA" // YouTube video ID
  },
  panelling2: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194492/Paneling_kzkmng.webp",
       ],
    video: "DaUU-uep3Pk" // YouTube video ID
  },

  queen: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194493/BunkBeds_elypk3.webp",
       ],
    video: "rqsVKFsAuHg" // YouTube video ID
  },

  computerBuild: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194494/LoriBed_f1mayu.webp",
       ],
    video: "n3SJgvm9DLA" // YouTube video ID
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

    // Videos
    slider7: "philippines",
    slider8: "newzealand",
    slider9: "indonesia",
    slider10: "egypt",
    slider11: "samoa",
    slider12: "nepal",

    // Animations
    slider13: "craicinit",
    slider14: "invite",
    slider15: "thanks",
    slider16: "indoAni",
    slider17: "philliAni",
    slider18: "timeLapse",

  slider19: "loggia",
  slider20: "panelling",
  slider21: "flooring",
  slider22: "panelling1",
  slider23: "bunks",
  slider24: "lori",
  slider25: "panelling2",
  slider26: "queen",
  slider27: "computerBuild"
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

  // Determine which photo-gallery we're opening based on slider ID
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
  //  photography.html
    "#slider7": { gallery: "philippines", options: {} },
    "#slider8": { gallery: "newzealand", options: {} },
    "#slider9": { gallery: "indonesia", options: {} },
    "#slider10": { gallery: "egypt", options: {} },
    "#slider11": { gallery: "samoa", options: {} },
    "#slider12": { gallery: "nepal", options: {} },

// animation.html
    "#slider13": { gallery: "craicinit", options: {} },
    "#slider14": { gallery: "invite", options: {} },
    "#slider15": { gallery: "thanks", options: {} },
    "#slider16": { gallery: "indoAni", options: {} },
    "#slider17": { gallery: "philliAni", options: {} },
    "#slider18": { gallery: "timeLapse", options: {} },

  // diy.html
    "#slider19": { gallery: "loggia", options: {} },
    "#slider20": { gallery: "panelling", options: {} },
    "#slider21": { gallery: "flooring", options: {} },
    "#slider22": { gallery: "panelling1", options: {} },
    "#slider23": { gallery: "bunks", options: {} },
    "#slider24": { gallery: "lori", options: {} },
    "#slider25": { gallery: "panelling2", options: {} },
    "#slider26": { gallery: "queen", options: {} },
    "#slider27": { gallery: "computerBuild", options: {} },


  };

  // First initialize all sliders with their default content
  $(window).on("load", function () {


    $("#slider7").sliderResponsive();
    $("#slider8").sliderResponsive();
    $("#slider9").sliderResponsive();
    $("#slider10").sliderResponsive();
    $("#slider11").sliderResponsive();
    $("#slider12").sliderResponsive();

    $("#slider13").sliderResponsive();
    $("#slider14").sliderResponsive();
    $("#slider15").sliderResponsive();
    $("#slider16").sliderResponsive();
    $("#slider17").sliderResponsive();
    $("#slider18").sliderResponsive();

    $("#slider19").sliderResponsive();
    $("#slider20").sliderResponsive();
    $("#slider21").sliderResponsive();
    $("#slider22").sliderResponsive();
    $("#slider23").sliderResponsive();
    $("#slider24").sliderResponsive();
    $("#slider25").sliderResponsive();
    $("#slider26").sliderResponsive();
    $("#slider27").sliderResponsive();

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
    }
  });
 
}

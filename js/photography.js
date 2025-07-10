//photography.js
// This file is responsible for the photography section of the website.
import { DomUtils } from "./domUtils.js";
// import { initThumbnails, preloadCriticalImages } from "./preload.js";
import { Navbar } from "./navbar.js";

console.log('Is sliderResponsive available?', $.fn.sliderResponsive);



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
  slider7: "#slider8",
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
  ireland: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118986/compressed-img-6855-copy_f9big6.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118990/compressed-summer-0468_szmnqj.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118989/compressed-summer-0460_w1ralb.webp",
      
    ],
    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118993/compressed-summer-0547_ufbms7.webp",
    ]
  },
  maylaysia: {
    preview: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203043/IMG_7623_abm9su.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203049/DSC04958_fez1yc.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203058/IMG_8813_tsebmj.webp'

    ],
    full: [
      // 'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203058/IMG_8813_tsebmj.webp'
    ]

  },
  indonesia: {
    preview: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036323/indoRTRPix_-4334_rb0axe.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036322/indoRTRPix_-4175_gyxbkj.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036321/indoRTRPix_-3922_hglvii.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036317/indoRTRPix_-3263_cplk9b.webp'
    ],
    full: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036320/indoRTRPix_-2621_jtflh9.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036318/indoRTRPix_-1429_oxhhhq.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036317/indoRTRPix_-3263_cplk9b.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036320/indoRTRPix_-4159_equalj.webp'
    ]
  },
  egypt: {
    preview: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103545/compressed-egypt-rtrpix-7464_hyfadx.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103545/compressed-egypt-rtrpix-7145_zqfbul.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103554/compressed-egypt-rtrpix-8872_z6fhnb.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103554/compressed-egypt-rtrpix-8569_fwdcgz.webp'
    ],
    full: [

      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103555/compressed-egypt-rtrpix-9252_e462bb.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103552/compressed-egypt-rtrpix-8188_prhy17.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103554/compressed-egypt-rtrpix-8724_xrmxf7.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103548/compressed-egypt-rtrpix-8048_wxzwun.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103546/compressed-egypt-rtrpix-7796_ohjxup.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103544/compressed-egypt-rtrpix-7008_gkdpsx.webp'

    ]
  },
  nepal: {
    preview: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200658/Annnapurna_South_Fang2_vwgzr9.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200638/IMG_3438_zou1cl.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200634/IMG_2753_nlwdto.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200634/IMG_3872_g5lkrk.webp'
    ],
    full: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203027/IMG_2845_01_l6wz9a.webp'

    ]
  },

  jordan: {
    preview: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207138/Jordan-RTRPix-6082_pgsgwd.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207226/Jordan-RTRPix-6064_vjpu7j.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207379/Jordan-RTRPix-6584_ass3ed.webp',
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207320/Jordan-RTRPix-5947_yedzwy.webp'


    ],

    full: [
      'https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207316/Jordan-RTRPix-6451_zvwmqz.webp'
      

    ]
  }

  
};




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


    window.addEventListener('load', preloadFullGalleryImages);


  initializeSliders();

  }

  setupEventListeners();

  // Initialize gallery modal
  initGalleryModal();
  // setupSliderClickHandlers();
});


function preloadFullGalleryImages() {
  Object.values(galleryData).forEach(gallery => {
    gallery.full.forEach(imgUrl => {
      const img = new Image();
      img.src = imgUrl;
    });
  });
}


// initGalleryModal function
function initGalleryModal() {
  // Create modal elements if they don't exist
  let modal = document.getElementById("galleryModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "galleryModal";
    modal.className = "gallery-modal";
    modal.style.display = "none";

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
}




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
    'slider1': 'ireland',
    'slider2': 'maylaysia',
    'slider3': 'indonesia',
    'slider4': 'egypt',
    'slider5': 'nepal',
    'slider6': 'jordan'
  };

  const galleryId = galleryMap[sliderContainer.id] || 'default';
  
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
    const currentIndex = Array.from(modal.querySelectorAll(".gallery-slide"))
      .findIndex(slide => slide.style.display === "block");
    const nextIndex = (currentIndex + 1) % allImages.length;
    showSlide(nextIndex);
    
    const activeThumb = modal.querySelectorAll(".gallery-thumb")[nextIndex];
    activeThumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }

  function showPrevSlide() {
    const currentIndex = Array.from(modal.querySelectorAll(".gallery-slide"))
      .findIndex(slide => slide.style.display === "block");
    const prevIndex = (currentIndex - 1 + allImages.length) % images.length;
    showSlide(prevIndex);
    
    const activeThumb = modal.querySelectorAll(".gallery-thumb")[prevIndex];
    activeThumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
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
      inline: "center"
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




// function initializeSliders() {
//   // Verify plugin exists
//   if (!$.fn.sliderResponsive) {
//     console.error('Slider plugin not loaded!');
//     return;
//   }

//   const sliderConfigs = {
//     '#slider1': { gallery: 'ireland', options: {} },
//     '#slider2': { 
//       gallery: 'maylaysia',
//       options: { fadeSpeed: 300, showArrows: "on", hideDots: "on" }
//     },
//     '#slider3': { 
//       gallery: 'indonesia',
//       options: { fadeSpeed: 300, showArrows: "on", hideDots: "on" }
//     },
//     '#slider4': { 
//       gallery: 'egypt',
//       options: { fadeSpeed: 300, showArrows: "on", hideDots: "on" }
//     },
//     '#slider5': { 
//       gallery: 'nepal',
//       options: { fadeSpeed: 300, showArrows: "on", hideDots: "on" }
//     },
//     '#slider6': { gallery: 'jordan', options: {} }
//   };

//   Object.entries(sliderConfigs).forEach(([sliderId, config]) => {
//     const $slider = $(sliderId);
//     if (!$slider.length) return;

//     // Clear only slide divs (keep arrows and titleBar)
//     $slider.children('div').not('.arrows, .titleBar').remove();

//     // Add new slides
//     galleryData[config.gallery]?.preview.forEach(imgUrl => {
//       $slider.append($('<div>').css('background-image', `url(${imgUrl})`));
//     });

//     // Initialize with timeout to ensure DOM is ready
//     setTimeout(() => {
//       $slider.sliderResponsive(config.options);
      
//       // Verify initialization
//       if (!$slider.data('sliderResponsive')) {
//         console.error(`Failed to initialize ${sliderId}`);
//       }
//     }, 50);
//   });
// }

function initializeSliders() {
  // Verify plugin is available
  if (!$.fn.sliderResponsive) {
    console.error('sliderResponsive plugin not found');
    return;
  }

  const sliderConfigs = {
    '#slider1': { gallery: 'ireland', options: {} },
    '#slider2': { 
      gallery: 'maylaysia',
      options: { fadeSpeed: 300, autoPlay: "off", showArrows: "on", hideDots: "on" }
    },
    '#slider3': { 
      gallery: 'indonesia',
      options: { hoverZoom: "off", hideDots: "on" }
    },
    '#slider4': { 
      gallery: 'egypt',
      options: { fadeSpeed: 300, autoPlay: "off", showArrows: "on", hideDots: "on" }
    },
    '#slider5': { 
      gallery: 'nepal',
      options: { fadeSpeed: 300, autoPlay: "off", showArrows: "on", hideDots: "on" }
    },
    '#slider6': { gallery: 'jordan', options: {} }
  };

  // First initialize all sliders with their default content
  $(window).on("load", function() {
    $("#slider1").sliderResponsive();
    $("#slider2").sliderResponsive({
      fadeSpeed: 300,
 
      showArrows: "on",
      hideDots: "on",
    });
    $("#slider3").sliderResponsive({
      hoverZoom: "off",
      hideDots: "on",
    });
    $("#slider4").sliderResponsive({
      fadeSpeed: 300,
     
      showArrows: "on",
      hideDots: "on",
    });
    $("#slider5").sliderResponsive({
      fadeSpeed: 300,
 
      showArrows: "on",
      hideDots: "on",
    });
    $("#slider6").sliderResponsive();
  });

  // Then replace content while preserving functionality
  // setTimeout(() => {
    Object.entries(sliderConfigs).forEach(([sliderId, config]) => {
      const $slider = $(sliderId);
      if (!$slider.length) return;

      // Get reference to plugin instance before modifying DOM
      const sliderInstance = $slider.data('sliderResponsive');
      
      // Store structural elements
      const $arrows = $slider.find('.arrows').detach();
      const $titleBar = $slider.find('.titleBar').detach();
      const $dots = $slider.find('ul').detach();

      // Clear slides only
      $slider.find('> div').not('.arrows, .titleBar').remove();

      // Add new slides
      galleryData[config.gallery]?.preview.forEach(imgUrl => {
        $slider.append($('<div>').css('background-image', `url(${imgUrl})`));
      });

      // Reattach structural elements
      $slider.append($arrows);
      $slider.append($titleBar);
      if ($dots.length) $slider.append($dots);

      // Reinitialize if needed
      if (sliderInstance) {
        sliderInstance.size = $slider.find("> div").length;
        sliderInstance.position = 0;
        $slider.find("div:first-of-type").addClass("show").show();
        $slider.find("> div").not(".show").hide();
        if ($dots.length) {
          $slider.find(".showli").removeClass("showli");
          $slider.find("> ul > li:first").addClass("showli");
        }
      }
    });
  // }, 20); // Delay to ensure initial initialization completes
}
import { CloudManager } from "./cloudManager.js";
import { CloudTransition } from "./cloudTransition.js";
import { Animations } from "./animations.js";
import { DomUtils } from "./domUtils.js";
import { initThumbnails, preloadCriticalImages } from "./preload.js";
import { Navbar } from './navbar.js';

export const selectors = {
  scrollDist: ".scrollDist",

  //Navigation buttons, Statements & Form
  modalClose: "#modalClose",
  modalSig: "#modalSig",
  contactFormClose: "#contactFormClose",
  formButton: "#formButton",
  modalWipClose: "#modalWipClose",

  // Clouds
  cloud1: "#cloud1",
  cloud2: "#cloud2",
  cloud3: "#cloud3",
  cloud4: "#cloud4",
  cloud5: "#cloud5",


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
};




const navbar = new Navbar(selectors);
// const duration = Navbar.BASE_SCROLL_DURATION; // For static property

const domUtils = new DomUtils(selectors);
const domElements = domUtils.elements
const animations = new Animations(domElements);


document.addEventListener("DOMContentLoaded", async function () {

  const navbar = new Navbar(selectors);
  const domUtils = new DomUtils(selectors);
  animations.mountainSkyAni();

  await CloudTransition.triggerReverse();



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
    });


  }
  document.getElementById('home-link').addEventListener('click', async (e) => {
    e.preventDefault();
    await CloudTransition.triggerTransition('index.html');
  });

  // Run reverse transition on load
  CloudTransition.triggerReverse();
  setupEventListeners();
  // initSliders();
});


function setupEventListeners() {
  // Setup event listeners for elements that exist on this page
  if (domUtils.elements.modalClose) {
    domUtils.elements.modalClose.addEventListener("click", function () {
      navbar.showScrollBar();
      // Page-specific cleanup if needed
    });
  }

  // Add other event listeners as needed
}

// function initSliders() {
//   // Your existing slider initialization code
//   $("#slider1").sliderResponsive({
//     slidePause: 5000,
//   });

//   $("#slider2").sliderResponsive({
//     fadeSpeed: 300,
//     autoPlay: "off",
//     showArrows: "on",
//     hideDots: "on"
//   });

//   $("#slider3").sliderResponsive({
//     hoverZoom: "off",
//     hideDots: "on"
//   });
// }

// // $(window).scroll(function () {
// //   var scrollDistOffset = $(".scrollDist").offset().top;
// //   var scrollDistHeight = $(".scrollDist").outerHeight();
// //   var scrollTop = $(window).scrollTop();
// //   var windowHeight = $(window).height();

// //   var isLandscapeSmall = window.matchMedia(
// //     "(orientation: landscape) and (max-width: 991.98px)"
// //   ).matches;
// //   var isSmallHeight = windowHeight < 6;



// //   console.log("triggerOffset: ", triggerOffset);
// //   console.log("scrollDistOffset: ", scrollDistOffset);
// //   console.log("scrollDistHeight: ", scrollDistHeight);
// //   console.log("scrollTop: ", scrollTop);


// //   var inSmallHeightScrollRange =
// //     scrollTop > scrollDistOffset &&
// //     scrollTop < scrollDistOffset + scrollDistHeight;
// //   var inNormalHeightScrollRange =
// //     scrollTop > scrollDistOffset + 6 &&
// //     scrollTop < scrollDistOffset + scrollDistHeight;

// //   // Apply sticky logic
// //   if (
// //     inNormalHeightScrollRange ||
// //     (isLandscapeSmall && isSmallHeight && inSmallHeightScrollRange)
// //   ) {
// //     $(".navbar").addClass("sticky");
// //   } else {
// //     $(".navbar").removeClass("sticky");
// //   }
// // });


// // // Photography Sliders

// (function ($) {
//   "use strict";
//   $.fn.sliderResponsive = function (settings) {

//     var set = $.extend(
//       {
//         slidePause: 5000,
//         fadeSpeed: 800,
//         autoPlay: "on",
//         showArrows: "off",
//         hideDots: "off",
//         hoverZoom: "on",
//         titleBarTop: "off"
//       },
//       settings
//     );

//     var $slider = $(this);
//     var size = $slider.find("> div").length; //number of slides
//     var position = 0; // current position of carousal
//     var sliderIntervalID; // used to clear autoplay

//     // Add a Dot for each slide
//     $slider.append("<ul></ul>");
//     $slider.find("> div").each(function () {
//       $slider.find("> ul").append('<li></li>');
//     });

//     // Put .show on the first Slide
//     $slider.find("div:first-of-type").addClass("show");

//     // Put .showLi on the first dot
//     $slider.find("li:first-of-type").addClass("showli")

//     //fadeout all items except .show
//     $slider.find("> div").not(".show").fadeOut();

//     // If Autoplay is set to 'on' than start it
//     if (set.autoPlay === "on") {
//       startSlider();
//     }

//     // If showarrows is set to 'on' then don't hide them
//     if (set.showArrows === "on") {
//       $slider.addClass('showArrows');
//     }

//     // If hideDots is set to 'on' then hide them
//     if (set.hideDots === "on") {
//       $slider.addClass('hideDots');
//     }

//     // If hoverZoom is set to 'off' then stop it
//     if (set.hoverZoom === "off") {
//       $slider.addClass('hoverZoomOff');
//     }

//     // If titleBarTop is set to 'on' then move it up
//     if (set.titleBarTop === "on") {
//       $slider.addClass('titleBarTop');
//     }

//     // function to start auto play
//     function startSlider() {
//       sliderIntervalID = setInterval(function () {
//         nextSlide();
//       }, set.slidePause);
//     }

//     // on mouseover stop the autoplay and clear interval
//     $slider.mouseover(function () {
//       clearInterval(sliderIntervalID);
//     });

//     // on mouseout starts the autoplay by calling startSlider
//     $slider.mouseout(function () {
//       startSlider();
//     });

//     //on right arrow click
//     $slider.find("> .right").click(nextSlide)

//     //on left arrow click
//     $slider.find("> .left").click(prevSlide);

//     // Go to next slide
//     function nextSlide() {
//       position = $slider.find(".show").index() + 1;
//       if (position > size - 1) position = 0;
//       changeCarousel(position);
//     }

//     // Go to previous slide
//     function prevSlide() {
//       position = $slider.find(".show").index() - 1;
//       if (position < 0) position = size - 1;
//       changeCarousel(position);
//     }

//     //when user clicks slider button
//     $slider.find(" > ul > li").click(function () {
//       position = $(this).index();
//       changeCarousel($(this).index());
//     });

//     //this changes the image and button selection
//     function changeCarousel() {
//       $slider.find(".show").removeClass("show").fadeOut();
//       $slider
//         .find("> div")
//         .eq(position)
//         .fadeIn(set.fadeSpeed)
//         .addClass("show");
//       // The Dots
//       $slider.find("> ul").find(".showli").removeClass("showli");
//       $slider.find("> ul > li").eq(position).addClass("showli");
//     }

//     return $slider;
//   };
// })(jQuery);






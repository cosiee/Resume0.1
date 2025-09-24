// galleryUtils.js
import { DomUtils } from "./domUtils.js";
import { Navbar } from "./navbar.js";

export const galleryUtils = {
  selectors: {
    // Base selectors (can be extended by individual modules)
    modalClose: "#modalClose",
    modalSig: "#modalSig",
    contactFormClose: "#contactFormClose",
    formButton: "#formButton",
    modalWipClose: "#modalWipClose",
    galleryContainer: "#galleryContainer",
  },

  initGalleryModal(sliders, openModalFn) {
    sliders.forEach((slider) => {
      const slides = slider.querySelectorAll("div:not(.arrows):not(.titleBar)");
      slides.forEach((slide) => {
        slide.style.cursor = "pointer";
        slide.addEventListener("click", () => openModalFn(slider));
      });
    });
  },

  initializeSliders(sliderConfigs, galleryData) {
    if (!$.fn.sliderResponsive) {
      console.error("sliderResponsive plugin not found");
      return;
    }

    $(window).on("load", function () {
      Object.keys(sliderConfigs).forEach((sliderId) => {
        $(sliderId).sliderResponsive();
      });
    });

    Object.entries(sliderConfigs).forEach(([sliderId, config]) => {
      const $slider = $(sliderId);
      if (!$slider.length) return;

      const sliderInstance = $slider.data("sliderResponsive");
      const $arrows = $slider.find(".arrows").detach();
      const $titleBar = $slider.find(".titleBar").detach();
      const $dots = $slider.find("ul").detach();

      $slider.find("> div").not(".arrows, .titleBar").remove();
      galleryData[config.gallery]?.preview.forEach((imgUrl) => {
        $slider.append($("<div>").css("background-image", `url(${imgUrl})`));
      });

      $slider.append($arrows);
      $slider.append($titleBar);
      if ($dots.length) $slider.append($dots);

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
  },
};
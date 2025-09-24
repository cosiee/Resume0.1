import { galleryUtils } from "./galleryUtils.js";
import { DomUtils } from "./domUtils.js";
import { Navbar } from "./navbar.js";

export const selectors = {
  ...galleryUtils.selectors,
  slider1: "#slider1",
  slider2: "#slider2",
  slider3: "#slider3",
  slider4: "#slider4",
  slider5: "#slider5",
  slider6: "#slider6",
  slider26: "#slider26",
  slider27: "#slider27",
  slider28: "#slider28",
};

const galleryData = {
  ireland: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507660/_MG_3449_cnkwkn.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507660/_MG_3439_erby5e.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507663/_MG_3240_fqtxam.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507661/_MG_3108_hmfkom.webp",
    ],
    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118993/compressed-summer-0547_ufbms7.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118987/compressed-img-7289_kcqe20.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118987/compressed-img-7639_gwc3qc.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118988/compressed-img-7658-copy_oud2ro.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118987/compressed-lighthouse-fenit-1393_uxbdjj.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118991/compressed-summer-0477_cbnncw.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118992/compressed-summer-0505_boozks.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507662/_MG_2885_jnamx3.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507662/_MG_2899_cxuqz6.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507661/_MG_3076_xa6xnc.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118989/compressed-summer-0460_w1ralb.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118990/compressed-summer-0468_szmnqj.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507660/_MG_3408_c9dmdn.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118986/compressed-img-6855-copy_f9big6.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507659/_MG_3346_bqsk2e.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507659/_MG_3342_entsia.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507658/_MG_3241_gbnkaw.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507657/_MG_3278_dcwh3w.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507656/_MG_3233_qg4gdh.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752507656/_MG_3156_fhlypn.webp"
    ],
  },
  maylaysia: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203043/IMG_7623_abm9su.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203049/DSC04958_fez1yc.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203058/IMG_8813_tsebmj.webp",
    ],
    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203037/IMG_0669_d2bkqo.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203062/DSC04937_xasjqr.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203057/IMG_8734_ujgnhi.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203055/IMG_9441_skeod6.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203054/IMG_9060_wnlhmf.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203040/IMG_8680_y4mpjx.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203040/DSC05086_ps4lhu.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203040/IMG_7594_2_ees3nh.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203035/IMG_0087_uhzopu.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203055/IMG_9433_x4pv3x.webp",
    ],
  },
  indonesia: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036323/indoRTRPix_-4334_rb0axe.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036322/indoRTRPix_-4175_gyxbkj.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036321/indoRTRPix_-3922_hglvii.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036317/indoRTRPix_-3263_cplk9b.webp",
    ],
    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036320/indoRTRPix_-2621_jtflh9.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036318/indoRTRPix_-1429_oxhhhq.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036320/indoRTRPix_-4159_equalj.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036323/indoRTRPix_--5_bgkrpk.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036318/indoRTRPix_-1559_mjrr5c.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036318/indoRTRPix_-1620_q0exvq.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036319/indoRTRPix_-4040_dgsnkc.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744036318/indoRTRPix_-2890_ckspew.webp",
    ],
  },
  egypt: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103545/compressed-egypt-rtrpix-7464_hyfadx.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103546/compressed-egypt-rtrpix-7796_ohjxup.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103554/compressed-egypt-rtrpix-8872_z6fhnb.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103554/compressed-egypt-rtrpix-8569_fwdcgz.webp",
    ],
    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103555/compressed-egypt-rtrpix-9252_e462bb.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103552/compressed-egypt-rtrpix-8188_prhy17.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103554/compressed-egypt-rtrpix-8724_xrmxf7.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103548/compressed-egypt-rtrpix-8048_wxzwun.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103543/compressed-egypt-rtrpix-6758_eeixsa.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103544/compressed-egypt-rtrpix-7008_gkdpsx.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103545/compressed-egypt-rtrpix-7145_zqfbul.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103544/compressed-egypt-rtrpix-7111_e30c1f.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103544/compressed-egypt-rtrpix-4711_cc3unk.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103546/compressed-egypt-rtrpix-7859_w2fx7r.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103546/compressed-egypt-rtrpix-7219_seve1r.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103548/compressed-egypt-rtrpix-8030_dsh4hp.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103549/compressed-egypt-rtrpix-8057_mgaf4a.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103549/compressed-egypt-rtrpix-8062_fyvf50.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103549/compressed-egypt-rtrpix-7021_ht5f14.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103551/compressed-egypt-rtrpix-8170_wewwra.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103550/compressed-egypt-rtrpix-8113_irwa5m.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103553/compressed-egypt-rtrpix-8079_gz6fdl.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103552/compressed-egypt-rtrpix-8185_efwwkj.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103553/compressed-egypt-rtrpix-8341_ypzs7a.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103553/compressed-egypt-rtrpix-8191_fbgf33.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744103553/compressed-egypt-rtrpix-8189_oydwvg.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118960/compressed-great-giza-pyramids-egypt-2014-9_wwzogz.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1744118960/compressed-great-giza-pyramids-egypt-2014-4_muyz5z.webp",
    ],
  },
  nepal: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200658/Annnapurna_South_Fang2_vwgzr9.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749203027/IMG_2845_01_l6wz9a.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200634/IMG_2753_nlwdto.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200634/IMG_3872_g5lkrk.webp",
    ],
    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749200638/IMG_3438_zou1cl.webp",
    ],
  },

  jordan: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207138/Jordan-RTRPix-6082_pgsgwd.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207226/Jordan-RTRPix-6064_vjpu7j.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207379/Jordan-RTRPix-6584_ass3ed.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207320/Jordan-RTRPix-5947_yedzwy.webp",
    ],

    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207316/Jordan-RTRPix-6451_zvwmqz.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207182/Jordan-RTRPix-6132_in2kkk.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207271/Jordan-RTRPix-5758_jw3lyk.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1749207410/Jordan-RTRPix-6568_xsskaa.webp",
    ],
  },

    queen: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1754403827/IMG_20220829_211725_zk3dq2.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1754403827/IMG_20220829_224954_lr2qyc.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1754403828/IMG_20220917_183836_uppfkm.webp",

    ],

    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1754403828/IMG_20220918_104403_koyqad.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1754403828/IMG_20220918_104812_paepeh.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1754403829/IMG_20220918_104806_vlb6jw.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1754403831/IMG_20220921_175339_yj9pcv.webp",
 
    ],
  },
    computerBuild: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758708526/IMG_20240111_145247_landscape_ekyh5h.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758708254/IMG_20240111_145242_in2b4t.webp",
    ],

    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758708257/IMG_20240111_145336_t3q7po.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758708258/IMG_20240111_164344_tmrauj.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758708255/IMG_20240111_145258_bb4o5q.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758708255/IMG_20240111_145247_xyb2qu.webp",
    ],
  },
      graphicsDesign: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758709539/Ela3BirthdayCake-site_rrufph.webp",

    ],

    full: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758709539/Ela_cake_4-site_apboun.webp",
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758709540/Eabha6-site_rd7s2n.webp",

    ],
  },
};
function openGalleryModal(clickedSlide, slideIndex, sliderContainer) {
  const modal = document.getElementById("galleryModal") || document.createElement("div");
  modal.id = "galleryModal";
  modal.className = "gallery-modal";
  if (!document.getElementById("galleryModal")) document.body.appendChild(modal);

  const galleryMap = {
    slider1: "ireland",
    slider2: "maylaysia",
    slider3: "indonesia",
    slider4: "egypt",
    slider5: "nepal",
    slider6: "jordan",
    slider26: "queen",
    slider27: "computerBuild",
    slider28: "graphicsDesign",
  };

  const galleryId = galleryMap[sliderContainer.id] || "default";
  const previewImages = galleryData[galleryId]?.preview || [];
  const fullImages = galleryData[galleryId]?.full || [];
  const allImages = [...previewImages, ...fullImages];

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

  allImages.forEach((imgUrl, index) => {
    const slideElement = document.createElement("div");
    slideElement.className = "gallery-slide";
    slideElement.style.cssText = `background-image: url(${imgUrl}); background-size: contain; background-repeat: no-repeat; background-position: center center; display: ${index === slideIndex ? "block" : "none"}`;
    slideContainer.appendChild(slideElement);

    const thumbElement = document.createElement("div");
    thumbElement.className = "gallery-thumb";
    thumbElement.style.cssText = `background-image: url(${imgUrl}); background-size: cover; background-position: center; background-repeat: no; width: 60px; height: 60px; flex-shrink: 0; display: block; cursor: pointer; border-radius: 6px; border: 2px solid ${index === slideIndex ? "#fff" : "transparent"}; opacity: ${index === slideIndex ? "1" : "0.7"}; transition: all 0.3s ease`;
    thumbElement.addEventListener("click", () => {
      showSlide(index);
      thumbElement.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
    thumbnailsWrapper.appendChild(thumbElement);
  });

  thumbnailsWrapper.style.minWidth = `${(60 + 10) * allImages.length}px`;
  thumbnailsWrapper.style.margin = "0 auto";

  function showSlide(index) {
    const slides = modal.querySelectorAll(".gallery-slide");
    const thumbs = modal.querySelectorAll(".gallery-thumb");
    slides.forEach((slide, i) => slide.style.display = i === index ? "block" : "none");
    thumbs.forEach((thumb, i) => {
      thumb.style.opacity = i === index ? "1" : "0.7";
      thumb.style.borderColor = i === index ? "#fff" : "transparent";
    });
  }

  function showNextSlide() {
    const currentIndex = Array.from(modal.querySelectorAll(".gallery-slide")).findIndex(slide => slide.style.display === "block");
    const nextIndex = (currentIndex + 1) % allImages.length;
    showSlide(nextIndex);
    modal.querySelectorAll(".gallery-thumb")[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function showPrevSlide() {
    const currentIndex = Array.from(modal.querySelectorAll(".gallery-slide")).findIndex(slide => slide.style.display === "block");
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    showSlide(prevIndex);
    modal.querySelectorAll(".gallery-thumb")[prevIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  closeBtn.addEventListener("click", () => { modal.style.display = "none"; document.body.style.overflow = "auto"; });
  prevBtn.addEventListener("click", showPrevSlide);
  nextBtn.addEventListener("click", showNextSlide);
  modal.addEventListener("click", (e) => e.target === modal && (modal.style.display = "none", document.body.style.overflow = "auto"));
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") showPrevSlide();
      if (e.key === "ArrowRight") showNextSlide();
      if (e.key === "Escape") { modal.style.display = "none"; document.body.style.overflow = "auto"; }
    }
  });

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  setTimeout(() => modal.querySelectorAll(".gallery-thumb")[slideIndex]?.scrollIntoView({ block: "nearest", inline: "center" }), 100);
}

function initializeSliders() {
  if (!$.fn.sliderResponsive) {
    console.error("sliderResponsive plugin not found");
    return;
  }

  const isMobile = window.innerWidth <= 992;

  const sliderConfigs = {
    "#slider1": { gallery: "ireland", options: {} },
    "#slider2": { gallery: "maylaysia", options: { fadeSpeed: 300, autoPlay: "off", showArrows: isMobile ? "off" : "on", hideDots: isMobile ? "off" : "on" } },
    "#slider3": { gallery: "indonesia", options: { hoverZoom: "off", hideDots: "on" } },
    "#slider4": { gallery: "egypt", options: { fadeSpeed: 300, autoPlay: "off", showArrows: isMobile ? "off" : "on", hideDots: isMobile ? "off" : "on" } },
    "#slider5": { gallery: "nepal", options: { fadeSpeed: 300, autoPlay: "off", showArrows: isMobile ? "off" : "on", hideDots: isMobile ? "off" : "on" } },
    "#slider6": { gallery: "jordan", options: {} },
    "#slider26": { gallery: "queen", options: {} },
    "#slider27": { gallery: "computerBuild", options: {} },
    "#slider28": { gallery: "graphicsDesign", options: {} },
  };

  $(window).on("load", function () {
    Object.keys(sliderConfigs).forEach((sliderId) => $(sliderId).sliderResponsive());
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

  // Attach event listeners after sliders are initialized
  const photoSliders = document.querySelectorAll('.slider[data-type="photo"]');
  photoSliders.forEach((slider) => {
    const slides = slider.querySelectorAll("div:not(.arrows):not(.titleBar)");
    slides.forEach((slide, index) => {
      if (window.getComputedStyle(slide).backgroundImage !== "none") { // Check computed style after initialization
        slide.style.cursor = "pointer";
        slide.addEventListener("click", () => openGalleryModal(slide, index, slider));
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const domUtils = new DomUtils(selectors);
  const navbar = new Navbar(selectors);
  navbar.init(20);
  navbar.initializeFormCloseButton();

  if (domUtils.elements.navContact) {
    domUtils.elements.navContact.addEventListener("click", () => {
      navbar.hideScrollBar();
      domUtils.formControl();
      domUtils.showStatementContact();
      domUtils.showForm();
    });
    window.addEventListener("load", () => Object.values(galleryData).forEach(gallery => gallery.full.forEach(imgUrl => new Image().src = imgUrl)));
  }

  // Initial slider setup
  initializeSliders();
});
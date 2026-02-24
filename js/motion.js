import { galleryUtils } from "./galleryUtils.js";
import { DomUtils } from "./domUtils.js"; // Add this import
import { Navbar } from "./navbar.js";
import { WebPAnimationController } from "./webpAnimationController.js";
import { setupScrollFocus } from "./scrollUtils.js";

//Check to see what page to apply coreect videos
const isNailedItPage = () => window.location.pathname.includes('nailedit.html');

export const selectors = {
  scrollDist: ".scrollDist",

  // Navigation buttons, Statements & Form
  modalClose: "#modalClose",
  modalSig: "#modalSig",
  contactFormClose: "#contactFormClose",
  formButton: "#formButton",
  modalWipClose: "#modalWipClose",

  // Navbar Links & Dropdowns
  navHome: "#navHome",
  navSoftware: "#softwareLink",
  navDropMenuSoftware: "#softwareDropMenuSoftware",
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
  navDropMenuMotion: "#motionDropMenuMotion",
  navAnimation: "#navAnimation",
  navVideo: "#navVideo",
  navContact: "#contactLink",

  // All sliders present
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
  slider29: "#slider29",
};

const navbar = new Navbar(selectors);
const domUtils = new DomUtils(selectors);

const galleryData = {
  // Videos
  philippines: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1752940235/Philippines_optimized2_hsqssk.webp",
    ],
    video: "qhpP6xXJFHI", // YouTube video ID
  },
  indonesia: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753215210/Indonesia_dmqffm.webp",
    ],
    video: "xQlCL6j8dsA", // YouTube video ID
  },
  newzealand: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753701614/NewZealand_wwi4sl.webp",
    ],
    video: "05Tj8vPWId0", // YouTube video ID
  },
  egypt: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753704798/egypt_qtskpg.webp",
    ],
    video: "rDUgpw18aLg", // YouTube video ID
  },
  samoa: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753788913/samoa_bg2tli.webp",
    ],
    video: "76nhoXgqC7c", // YouTube video ID
  },
  nepal: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1753790248/nepal_cix1jj.webp",
    ],
    video: "m4PsWWbZiDI", // YouTube video ID
  },

  // Animations
  craicinit: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753809078/craicinit_wvskmy.mp4",
    ],
    video: "Hk5KfzTXpuI", // YouTube video ID
  },
  invite: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753955518/invite_bqvhyz.mp4",
    ],
    video: "YYtQM6siWnk", // YouTube video ID
  },
  thanks: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753956855/Thanks_d1a8ez.mp4",
    ],
    video: "1RxAHs7cE0Y", // YouTube video ID
  },
  indoAni: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753972928/IndoAni_rv3yus.mp4",
    ],
    video: "tpriKnDglCY", // YouTube video ID
  },
  philliAni: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753972928/PhilliAni_jbsoss.mp4",
    ],
    video: "V4ynt1X0rHQ", // YouTube video ID
  },
  timeLapse: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/video/upload/v1753972927/TimeLapse_dkdhwq.mp4",
    ],
    video: "V4ynt1X0rHQ", // YouTube video ID
  },

  // Projects
  loggia: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194494/Loggia_tjmphl.webp",
    ],
    video: isNailedItPage() ? "vlXgJA2RGFQ" : "V4ynt1X0rHQ", // YouTube video IDs
  },
  panelling: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194493/Paneling1-2_a0qnkc.webp",
    ],
    video: isNailedItPage() ? "JhYTDktVIIE" : "QcLegwyHlrM", // YouTube video ID
  },
  flooring: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194492/Flooring1-1_g7zwmb.webp",
    ],
    video: isNailedItPage() ? "mguVizKT5lw" : "P5I5u0pv-DI", // YouTube video ID
  },
  panelling1: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194494/Paneling1-1_lz41eo.webp",
    ],
    video: isNailedItPage() ? "G4HBEyi37PQ" : "P5I5u0pv-DI", // YouTube video ID
  },
  bunks: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194493/BunkBeds_elypk3.webp",
    ],
    video: isNailedItPage() ? "PiMZ1FoyG-I" : "rqsVKFsAuHg", // YouTube video ID
  },
  lori: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194494/LoriBed_f1mayu.webp",
    ],
    video: isNailedItPage() ? "yiQozmHdHAY" : "n3SJgvm9DLA", // YouTube video ID
  },
  panelling2: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194492/Paneling_kzkmng.webp",
    ],
    video: isNailedItPage() ? "Su36F2cKqyY" : "DaUU-uep3Pk", // YouTube video ID
  },
   kitchen: {
    preview: [
      "https://res.cloudinary.com/dxwwm0vlj/image/upload/v1758194493/Kitchen_wbhgxb.webp",
    ],
    video: isNailedItPage() ? "k5Qa7ieUQ2M" : "IFvNA4ngcRI", // YouTube video ID
  },
};

function openVideoModal(sliderContainer) {
  const modal =
    document.getElementById("galleryModal") || document.createElement("div");
  modal.id = "galleryModal";
  modal.className = "video-modal";
  if (!document.getElementById("galleryModal"))
    document.body.appendChild(modal);

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
    // Projects
    slider19: "loggia",
    slider20: "panelling",
    slider21: "flooring",
    slider22: "panelling1",
    slider23: "bunks",
    slider24: "lori",
    slider25: "panelling2",
    slider29: "kitchen",
  };

  const galleryId = galleryMap[sliderContainer.id];
  const videoId = galleryData[galleryId]?.video;

  if (!videoId) return;

  modal.innerHTML = `
    <div class="video-modal-overlay">
      <div class="video-modal-container">
        <div class="video-wrapper">
          <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
        </div>
        <button class="close-btn">&times;</button>
      </div>
    </div>
  `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modal.querySelector("iframe").src = "";
  };

  modal.querySelector(".close-btn").addEventListener("click", closeModal);
  modal.addEventListener(
    "click",
    (e) => {
      if (e.target === modal) closeModal();
    },
    { passive: true }
  );
  document.addEventListener(
    "keydown",
    (e) => e.key === "Escape" && closeModal(),
    { passive: true }
  );
}

function initGalleryModal() {
  const videoSliders = document.querySelectorAll('.slider[data-type="video"]');
  videoSliders.forEach((slider) => {
    const slides = slider.querySelectorAll("div:not(.arrows):not(.titleBar)");
    slides.forEach((slide) => {
      slide.style.cursor = "pointer";
      slide.addEventListener("click", () => openVideoModal(slider));
    });
  });
}

function initializeSliders() {
  if (!$.fn.sliderResponsive) {
    console.error("sliderResponsive plugin not found");
    return;
  }

  const sliderConfigs = {
    // Videos
    "#slider7": { gallery: "philippines", options: {} },
    "#slider8": { gallery: "newzealand", options: {} },
    "#slider9": { gallery: "indonesia", options: {} },
    "#slider10": { gallery: "egypt", options: {} },
    "#slider11": { gallery: "samoa", options: {} },
    "#slider12": { gallery: "nepal", options: {} },

    // Animations
    "#slider13": { gallery: "craicinit", options: {} },
    "#slider14": { gallery: "invite", options: {} },
    "#slider15": { gallery: "thanks", options: {} },
    "#slider16": { gallery: "indoAni", options: {} },
    "#slider17": { gallery: "philliAni", options: {} },
    "#slider18": { gallery: "timeLapse", options: {} },

    // Projects
    "#slider19": { gallery: "loggia", options: {} },
    "#slider20": { gallery: "panelling", options: {} },
    "#slider21": { gallery: "flooring", options: {} },
    "#slider22": { gallery: "panelling1", options: {} },
    "#slider23": { gallery: "bunks", options: {} },
    "#slider24": { gallery: "lori", options: {} },
    "#slider25": { gallery: "panelling2", options: {} },
    "#slider29": { gallery: "kitchen", options: {} },
  };

  $(window).on("load", function () {
    Object.keys(sliderConfigs).forEach((sliderId) =>
      $(sliderId).sliderResponsive()
    );
  });

  Object.entries(sliderConfigs).forEach(([sliderId, config]) => {
    const $slider = $(sliderId);
    if (!$slider.length) return;

    const sliderInstance = $slider.data("sliderResponsive");
    const $titleBar = $slider.find(".titleBar").detach();
    const $arrows = $slider.find(".arrows").detach();

    $slider.find("> div").not(".arrows, .titleBar").remove();
    galleryData[config.gallery]?.preview.forEach((imgUrl) => {
      $slider.append($("<div>").css("background-image", `url(${imgUrl})`));
    });

    $slider.append($titleBar);
    $slider.append($arrows);

    if (sliderInstance) {
      sliderInstance.size = $slider.find("> div").length;
      sliderInstance.position = 0;
      $slider.find("div:first-of-type").addClass("show").show();
      $slider.find("> div").not(".show").hide();
    }
  });
}

function setupEventListeners() {
  if (domUtils.elements.modalClose) {
    domUtils.elements.modalClose.addEventListener("click", function () {
      navbar.showScrollBar();
      closeVideoModal();
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  navbar.init(20);
  navbar.initializeFormCloseButton();

  if (domUtils.elements.navContact) {
    domUtils.elements.navContact.addEventListener("click", function () {
      navbar.hideScrollBar();
      domUtils.formControl();
      domUtils.showStatementContact();
      domUtils.showForm();
    });
  }

  initializeSliders();
  initGalleryModal();
  setupScrollFocus();

  const animationController = new WebPAnimationController();
  animationController.init();
});

function closeVideoModal() {
  const modal = document.getElementById("galleryModal");
  if (modal) {
    const iframe = modal.querySelector("iframe");
    if (iframe) iframe.src = ""; // Stop YouTube video
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modal.remove();
  }
}

// opening animation "SEE/ME" mountains and clouds

// import { TimelineLite, Back } from "gsap/dist/gsap";

gsap.set(".main", {
  position: "fixed",
  background: "#fff",
  width: "100%",
  maxWidth: "1200px",
  height: "100%",
  top: 0,
  left: "50%",
  x: "-50%",
});
gsap.set(".scrollDist", { width: "100%", height: "200%", background: "#fff" });
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".scrollDist",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  })

  .fromTo(
    "#sky",
    { scale: 1, x: 0, y: -80 },
    { scale: 1.3, x: -150, y: -650 },
    0
  )
  .fromTo(
    "#mountBg",
    { scale: 1, x: 0, y: 70 },
    { scale: 1.3, x: -150, y: -600 },
    0
  )
  .fromTo("#cloud2", { x: 400, y: 310 }, { x: -200, y: -600 }, 0)
  .fromTo(
    "#mountBg2",
    { scale: 1, X: 0, y: 110 },
    { scale: 1.3, x: -150, y: -670 },
    0
  )
  .fromTo("#cloud3", { x: -200, y: 300 }, { x: 500, y: -1000 }, 0)
  .fromTo(
    "#mountMg",
    { scale: 1, X: 0, y: 345 },
    { scale: 1.3, x: -150, y: -700 },
    0
  )
  .fromTo("#cloud4", { x: 300, y: 320 }, { x: -400, y: -850 }, 0)
  .fromTo(
    "#mountMgF",
    { scale: 1, X: 0, y: 200 },
    { scale: 1.3, x: -150, y: -750 },
    0
  )
  .fromTo(
    "#mountFg",
    { scale: 1, X: 0, y: 220 },
    { scale: 1.3, x: -150, y: -850 },
    0
  )
  .fromTo(
    "#cloud5",
    { scale: 1.5, x: -100, y: 380 },
    { scale: 3, x: 300, y: -950 },
    0
  )
  .fromTo(
    "#cloud1",
    { scale: 1.3, x: -10, y: 576 },
    { scale: 2, x: -500, y: -690 },
    0
  )
  // console.log("Hello world2!"+navbarSoft)
  .fromTo(
    ".thumbs#software",
    { scale: 2.5, x: -1500, y: -570 },
    { scale: 1, x: 320, y: -570 },
    0
  )
  // console.log("Hello world3!"+navbarSoft)
  .fromTo(
    ".thumbs#photography",
    { scale: 2.5, x: 2400, y: -570 },
    { scale: 1, x: 620, y: -570 },
    0
  )
  .fromTo(
    ".thumbs#diy",
    { scale: 2.5, x: 2400, y: 700 },
    { scale: 1, x: 620, y: -270 },
    0
  )
  .fromTo(
    ".thumbs#videography",
    { scale: 2.5, x: -1500, y: 700 },
    { scale: 1, x: 320, y: -270 },
    0
  );

// $('#down').on('mouseenter', (e)=>{ gsap.to('#down', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
// $('#down').on('mouseleave', (e)=>{ gsap.to('#down', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
$(".scroll-arrow").on("click", (e) => {
  gsap.to(window, { scrollTo: 600, duration: 3, ease: "power3.inOut" });
}); // scrollTo requires the ScrollTo plugin (not to be confused w/ ScrollTrigger)

// ==========================================================
/* Main Navigation dropdown
------------------------------------------------------ */

$(window).scroll(function () {
  if ($(window).scrollTop() > 320) {
    $(".navbar").addClass("sticky");
  } else {
    $(".navbar").removeClass("sticky");
  }
});


// ==========================================================
// index.html animate thumbnails and navbar items

document.addEventListener("DOMContentLoaded", function () {

  const thumbSoft = document.querySelector("#software");
  const navbarSoft = document.querySelector(".dropdown-toggle");

  const thumbPhoto = document.querySelector("#photography");
  const navbarPhoto = document.querySelector("#photographyLink");

  const thumbVid = document.querySelector("#videography");
  const navbarVid = document.querySelector("#videographyLink");

  const thumbDiy = document.querySelector("#diy");
  const navbarDiy = document.querySelector("#diyLink");


  thumbPhoto.addEventListener("mouseenter", function () {
    console.log("Hello world!"+navbarPhoto);
    navbarPhoto.style.scale = 1.3;
    navbarPhoto.style.color = "#6e6f79";
    thumbPhoto.style.scale = 1.004;
  });

  thumbPhoto.addEventListener("mouseleave", function () {
    navbarPhoto.style.scale = 1;
    navbarPhoto.style.color = "#162a43";
    thumbPhoto.style.scale = 1;
  });

  navbarPhoto.addEventListener("mouseenter", function () {
    navbarPhoto.style.scale = 1.15;
    navbarPhoto.style.color = "#6e6f79";
    
  });

  navbarPhoto.addEventListener("mouseleave", function () {
    navbarPhoto.style.scale = 1;
    navbarPhoto.style.color = "#162a43";
    
  });


  thumbSoft.addEventListener("mouseenter", function () {
    navbarSoft.style.scale = 1.3;
    navbarSoft.style.color = "#6e6f79";
    thumbSoft.style.scale = 1.004;
  });

  thumbSoft.addEventListener("mouseleave", function () {
    navbarSoft.style.scale = 1;
    navbarSoft.style.color = "#162a43";
    thumbSoft.style.scale = 1;
  });

  navbarSoft.addEventListener("mouseenter", function () {
    navbarSoft.style.scale = 1.1;
    navbarSoft.style.color = "#6e6f79";
    
  });

  navbarSoft.addEventListener("mouseleave", function () {
    navbarSoft.style.scale = 1;
    navbarSoft.style.color = "#162a43";
    
  });


  thumbVid.addEventListener("mouseenter", function () {
    navbarVid.style.scale = 1.3;
    navbarVid.style.color = "#6e6f79";
    thumbVid.style.scale = 1.004;
  });

  thumbVid.addEventListener("mouseleave", function () {
    navbarVid.style.scale = 1;
    navbarVid.style.color = "#162a43";
    thumbVid.style.scale = 1;
  });

  navbarVid.addEventListener("mouseenter", function () {
    navbarVid.style.scale = 1.1;
    navbarVid.style.color = "#6e6f79";
    
  });

  navbarVid.addEventListener("mouseleave", function () {
    navbarVid.style.scale = 1;
    navbarVid.style.color = "#162a43";
  
  });


  thumbDiy.addEventListener("mouseenter", function () {
    navbarDiy.style.scale = 1.3;
    navbarDiy.style.color = "#6e6f79";
    thumbDiy.style.scale = 1.004;
  });

  thumbDiy.addEventListener("mouseleave", function () {
    navbarDiy.style.scale = 1;
    navbarDiy.style.color = "#162a43";
    thumbDiy.style.scale = 1;
  });

  navbarDiy.addEventListener("mouseenter", function () {
    navbarDiy.style.scale = 1.1;
    navbarDiy.style.color = "#6e6f79";
  
  });

  navbarDiy.addEventListener("mouseleave", function () {
    navbarDiy.style.scale = 1;
    navbarDiy.style.color = "#162a43";

  });
});

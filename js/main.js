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


// Thumb randomisation
document.addEventListener("DOMContentLoaded", function() {
  // Array of image URLs for each category
  const softwareImages = [
    "url('css/assets/b1.jpg')",
    "url('css/assets/b2.jpg')",
    "url('css/assets/b3.jpg')",
    "url('css/assets/b4.jpg')",
    "url('css/assets/b5.jpg')",
    "url('css/assets/b6.jpg')",
    "url('css/assets/b7.jpg')",
    "url('css/assets/b8.jpg')",
    "url('css/assets/b9.jpg')",
    "url('css/assets/b10.jpg')",
    "url('css/assets/b12.jpg')",
    "url('css/assets/b13.jpg')",
    "url('css/assets/b14.jpg')"
  ];

  const photographyImages = [
  "url('css/assets/r1.jpg')",
  "url('css/assets/r2.jpg')",
  "url('css/assets/r3.jpg')",
  "url('css/assets/r4.jpg')",
  "url('css/assets/r5.jpg')",
  "url('css/assets/r6.jpg')",
  "url('css/assets/r7.jpg')",
  "url('css/assets/r8.jpg')",
  "url('css/assets/r9.jpg')",
  "url('css/assets/r10.jpg')",
  "url('css/assets/r11.jpg')",
  "url('css/assets/r12.jpg')"
  ];

  const videographyImages = [
  "url('css/assets/g1.jpg')",
  "url('css/assets/g2.jpg')",
  "url('css/assets/g3.jpg')",
  "url('css/assets/g4.jpg')",
  "url('css/assets/g5.jpg')",
  "url('css/assets/g6.jpg')",
  "url('css/assets/g7.jpg')",
  "url('css/assets/g8.jpg')",
  "url('css/assets/g9.jpg')",
  "url('css/assets/g10.jpg')"
  ];

  const diyImages = [
  "url('css/assets/y1.jpg')",
  "url('css/assets/y2.jpg')",
  "url('css/assets/y3.jpg')",
  "url('css/assets/y4.jpg')",
  "url('css/assets/y5.jpg')",
  "url('css/assets/y6.jpg')",
  "url('css/assets/y7.jpg')",
  "url('css/assets/y8.jpg')",
  "url('css/assets/y9.jpg')",
  "url('css/assets/y10.jpg')",
  "url('css/assets/y11.jpg')"
  ];

  // Function to randomly select an image URL from an array
  function getRandomImage(imagesArray) {
    return imagesArray[Math.floor(Math.random() * imagesArray.length)];
  }

  // Function to set background image for a container and schedule next change
  function setRandomBackground(containerId, imagesArray) {
    const container = document.getElementById(containerId);
    container.style.backgroundImage = getRandomImage(imagesArray);

    // Schedule next change after a random time (between 5 to 10 seconds)
    const randomTime = Math.floor(Math.random() * (10000 - 5000)) + 5000;
    setTimeout(() => setRandomBackground(containerId, imagesArray), randomTime);
  }

  // Set initial background images and schedule changes
  setRandomBackground("software", softwareImages);
  setRandomBackground("photography", photographyImages);
  setRandomBackground("videography", videographyImages);
  setRandomBackground("diy", diyImages);
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

  .fromTo("#cloud2",
    { x: 400, y: 310 },
    { x: -200, y: -600 },
    0
  )

  .fromTo(
    "#mountBg2",
    { scale: 1, X: 0, y: 110 },
    { scale: 1.3, x: -150, y: -670 },
    0
  )

  .fromTo("#cloud3",
    { x: -200, y: 300 },
    { x: 500, y: -1000 },
    0
  )

  .fromTo(
    "#mountMg",
    { scale: 1, X: 0, y: 345 },
    { scale: 1.3, x: -150, y: -700 },
    0
  )

  .fromTo("#cloud4",
   { x: 300, y: 320 }, 
   { x: -400, y: -850 }, 
   0
  )

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

  .fromTo(
    ".thumbs#software",
    { scale: 2.5, x: -1500, y: -570 },
    { scale: 1, x: 320, y: -570 },
    0
  )

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



$(".sig, .close").on("click", (e) => {

  gsap
      .to(
        ".thumbs#diy",
        { x: 620, y: -270 },
        1
      )
  gsap    
      .to(
        ".thumbs#videography",
        { x: 320, y: -270 },
        2
      )
  gsap
      .to(
        ".thumbs#software",
        { x: 320, y: -570 },
        4
      )
  gsap  
      .to(
        ".thumbs#photography",
        { x: 620, y: -570 },
        3
      )

 
}); 


$(".meLink").on("click", (e) => {
  

  gsap
      .to(
        ".thumbs#diy",
        { x: 590, y: -290 },
        1
      )
  gsap    
      .to(
        ".thumbs#videography",
        { x: 340, y: -290 },
        2
      )
  gsap
      .to(
        ".thumbs#software",
        { x: 340, y: -540 },
        4
      )
  gsap  
      .to(
        ".thumbs#photography",
        { x: 590, y: -540 },
        3
      )
}); 

//removes and adds scroll bar 
function toggleScroll() {
  var body = document.body;
  if (body.style.overflow === 'hidden') {
      body.style.overflow = 'auto';
  } else {
      body.style.overflow = 'hidden';
  }
}
// add removes contact form
function showForm() {
  document.getElementById('statmentContact').style.display = 'none';
  document.getElementById('contactForm').style.display = 'block';
}

function hideForm() {
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('statmentContact').style.display = 'block';
}

function submitForm() {
  // Handle form submission
  // For example, you can use AJAX to submit the form data

  // After form submission, hide the form and show the modal box
  hideForm();
}

$(".scroll-arrow").on("click", (e) => {
  gsap.to(window, { scrollTo: 600, duration: 3, ease: "power3.inOut" });
});

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

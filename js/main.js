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
    { scale: 1.3, x: 0, y: 576 },
    { scale: 2, x: -500, y: -690 },
    0
  )
  .fromTo(
    ".container1",
    { x: 455, y: 576 },
    { x: 455, y: -570 },
    0 
  );

// $('#down').on('mouseenter', (e)=>{ gsap.to('#down', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
// $('#down').on('mouseleave', (e)=>{ gsap.to('#down', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
$(".scroll-arrow").on("click", (e) => {
  gsap.to(window, { scrollTo: 600, duration: 4, ease: "power3.inOut" });
}); // scrollTo requires the ScrollTo plugin (not to be confused w/ ScrollTrigger)

/*----------------------------------------------------*/
/* Main Navigation 
------------------------------------------------------ */

$(window).scroll(function () {
  if ($(window).scrollTop() > 320) {
    $(".navbar").addClass("sticky");
  } else {
    $(".navbar").removeClass("sticky");
  }
});

// // Mobile Navigation
// $('.mobile-toggle').click(function() {
//     if ($('.main_nav').hasClass('open-nav')) {
//         $('.main_nav').removeClass('open-nav');
//     } else {
//         $('.main_nav').addClass('open-nav');
//     }
// });

// $('.main_nav li a').click(function() {
//     if ($('.main_nav').hasClass('open-nav')) {
//         $('.navigation').removeClass('open-nav');
//         $('.main_nav').removeClass('open-nav');
//     }
// });

/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

// jQuery(document).ready(function($) {

//    $('.smoothscroll','.arrowDown','.arrowUp').on('click',function (e) {
// 	    e.preventDefault();

// 	    var target = this.hash,
// 	    $target = $(target);

// 	    $('html, body').stop().animate({
// 	        'scrollTop': $target.offset().top
// 	    }, 800, 'swing', function () {
// 	        window.location.hash = target;
// 	    });
// 	});

// });

// TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4);
// 
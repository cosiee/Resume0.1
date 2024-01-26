gsap.set('.main', {position:'fixed', background:'#fff', width:'100%', maxWidth:'1200px', height:'100%', top:0, left:'50%', x:'-50%'})
gsap.set('.scrollDist', {width:'100%', height:'200%', background:'#ddd'})
gsap.timeline({scrollTrigger:{trigger:'.scrollDist', start:'top top', end:'bottom bottom', scrub:1}})
   
    .fromTo('.sky', {scale: 1, x:0, y:-205},{scale: 1.3, x:-150, y:-650}, 0)
    .fromTo('.mountBg', {scale: 1, X:0, y:-0},{scale: 1.3, x:-150, y:-600}, 0)
    .fromTo('.cloud2', {x: 400, y: 290},{x: -200, y:-600}, 0)
    .fromTo('.mountBg2', {scale: 1, X:0, y:80},{scale: 1.3, x:-150, y:-670}, 0)
    .fromTo('.cloud3', {x: -400, y:290},{x: 500, y:-1000}, 0)
    .fromTo('.mountMg', {scale: 1, X:0, y:278},{scale: 1.3, x:-150, y:-700}, 0)
    .fromTo('.cloud4', {x: -100, y:280},{x: -400, y:-850}, 0)
    .fromTo('.mountMgF', {scale: 1, X:0, y:170},{scale: 1.3, x:-150, y:-750}, 0) 
    .fromTo('.mountFg', {scale: 1, X:0, y:220},{scale: 1.3, x:-150, y:-850}, 0)
    .fromTo('.cloud5', {scale: 1, x: -100, y:360},{scale: 3, x: 300, y:-950}, 0)
    .fromTo('.cloud1', {scale: 1, x:0, y: 576},{scale: 2, x:-600,  y:-690}, 0)


    $(window).scroll(function() {
  
        if ($(window).scrollTop() > 2200) {
            $('.main_nav').addClass('sticky');
        } else {
            $('.main_nav').removeClass('sticky');
        }
      });
    
    $('#down').on('mouseenter', (e)=>{ gsap.to('#down', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
    $('#down').on('mouseleave', (e)=>{ gsap.to('#down', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
    $('#down').on('click', (e)=>{ gsap.to(window, {scrollTo:800, duration:4.5, ease:'power1.inOut'}); } ) // scrollTo requires the ScrollTo plugin (not to be confused w/ ScrollTrigger)

    // // $('#up').on('mouseenter', (e)=>{ gsap.to('#up', {y:0, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
    // // $('#up').on('mouseleave', (e)=>{ gsap.to('#up', {y:10, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
    // $('#up').on('click', (e)=>{ gsap.to(window, {scrollTo: 0 , duration:2, ease:'power1.inOut'}); })


    /*----------------------------------------------------*/
/* Quote Loop
------------------------------------------------------ */

function fade($ele) {
    $ele.fadeIn(1000).delay(3000).fadeOut(1000, function() {
        var $next = $(this).next('.quote');
        fade($next.length > 0 ? $next : $(this).parent().children().first());
   });
}
fade($('.quoteLoop > .quote').first());


/*----------------------------------------------------*/
/* Navigation
------------------------------------------------------ */

$(window).scroll(function() {

    if ($(window).scrollTop() > 600) {
        $('.main_nav').addClass('sticky');
    } else {
        $('.main_nav').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.main_nav').removeClass('open-nav');
    } else {
        $('.main_nav').addClass('open-nav');
    }
});

$('.main_nav li a').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_nav').removeClass('open-nav');
    }
});


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

jQuery(document).ready(function($) {

   $('.smoothscroll','.arrowDown','.arrowUp').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});
  
});


TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4); 
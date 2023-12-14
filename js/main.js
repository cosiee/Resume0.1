gsap.set('.main', {position:'fixed', background:'#fff', width:'100%', maxWidth:'1200px', height:'100%', top:0, left:'50%', x:'-50%'})
gsap.set('.scrollDist', {width:'100%', height:'200%', background:'#ddd'})
gsap.timeline({scrollTrigger:{trigger:'.scrollDist', start:'top top', end:'bottom bottom', scrub:1}})
   
    .fromTo('.sky', {y:-205},{y:-650}, 0)
    .fromTo('.mountBg', {y:0},{y:-600}, 0)
    .fromTo('.cloud2', {y: 375},{y:-680}, 0)
    .fromTo('.mountBg2', {y:80},{y:-670}, 0)
    .fromTo('.cloud3', {y:265},{y:-800}, 0)
    .fromTo('.mountMg', {y:278},{y:-700}, 0)
    .fromTo('.cloud4', {y:310},{y:-850}, 0)
    .fromTo('.mountMgF', {y:170},{y:-750}, 0) 
    .fromTo('.mountFg', {y:220},{y:-850}, 0)
    .fromTo('.cloud5', {y:380},{y:-950}, 0)
    .fromTo('.cloud1', {y: 595},{y:-750}, 0)
   

    $(window).scroll(function() {
  
        if ($(window).scrollTop() > 50) {
            $('.main_nav').addClass('sticky');
        } else {
            $('.main_nav').removeClass('sticky');
        }
      });
    
    $('#arrowBtn').on('mouseenter', (e)=>{ gsap.to('.arrowDown', {y:10, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
    $('#arrowBtn').on('mouseleave', (e)=>{ gsap.to('.arrowDown', {y:0, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
    $('#arrowBtn').on('click', (e)=>{ gsap.to(window, {scrollTo:innerHeight, duration:4.5, ease:'power1.inOut'}); } ) // scrollTo requires the ScrollTo plugin (not to be confused w/ ScrollTrigger)

     $('#arrowBtn2').on('mouseenter', (e)=>{ gsap.to('.arrowUp', {y:0, duration:0.8, ease:'back.inOut(3)', overwrite:'auto'}); })
     $('#arrowBtn2').on('mouseleave', (e)=>{ gsap.to('.arrowUp', {y:10, duration:0.5, ease:'power3.out', overwrite:'auto'}); })
     $('#arrowBtn2').on('click', (e)=>{ gsap.to(window, {scrollTo: 0 , duration:2, ease:'power1.inOut'}); })


     
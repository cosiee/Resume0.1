// Navbar sticky control needs adjusting

$(window).scroll(function () {
  var scrollDistOffset = $(".scrollDist").offset().top;
  var scrollDistHeight = $(".scrollDist").outerHeight();
  var scrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();

  var isLandscapeSmall = window.matchMedia(
    "(orientation: landscape) and (max-width: 991.98px)"
  ).matches;
  var isSmallHeight = windowHeight < 320;
  var inSmallHeightScrollRange =
    scrollTop > scrollDistOffset &&
    scrollTop < scrollDistOffset + scrollDistHeight;
  var inNormalHeightScrollRange =
    scrollTop > scrollDistOffset + 320 &&
    scrollTop < scrollDistOffset + scrollDistHeight;

  // Apply sticky logic
  if (
    inNormalHeightScrollRange ||
    (isLandscapeSmall && isSmallHeight && inSmallHeightScrollRange)
  ) {
    $(".navbar").addClass("sticky");
  } else {
    $(".navbar").removeClass("sticky");
  }
});
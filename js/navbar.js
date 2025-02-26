// stickyNavbar.js

// Handles the sticky navbar logic
export function enableStickyNavbar(triggerOffset) {
  $(window).scroll(function () {
    var scrollDistOffset = $(".scrollDist").offset()?.top || 0;
    var scrollDistHeight = $(".scrollDist").outerHeight() || 0;
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    var isLandscapeSmall = window.matchMedia(
      "(orientation: landscape) and (max-width: 991.98px)"
    ).matches;
    
    var isSmallHeight = windowHeight < triggerOffset;

    var inSmallHeightScrollRange =
      scrollTop > scrollDistOffset &&
      scrollTop < scrollDistOffset + scrollDistHeight;
    
    var inNormalHeightScrollRange =
      scrollTop > scrollDistOffset + triggerOffset &&
      scrollTop < scrollDistOffset + scrollDistHeight;

    console.log("triggerOffset: ", triggerOffset);
    console.log("scrollDistOffset: ", scrollDistOffset);
    console.log("scrollDistHeight: ", scrollDistHeight);
    console.log("scrollTop: ", scrollTop);
    console.log("windowHeight: ", windowHeight);
    console.log("isLandscapeSmall: ", isLandscapeSmall);
    console.log("isSmallHeight: ", isSmallHeight);
    console.log("inSmallHeightScrollRange: ", inSmallHeightScrollRange);
    console.log("inNormalHeightScrollRange: ", inNormalHeightScrollRange);
    // Apply sticky logic
    if (
      inNormalHeightScrollRange ||
      (isLandscapeSmall && isSmallHeight && inSmallHeightScrollRange)
    ) {
      $(".navbar").addClass("sticky");
      console.log("Navbar is now sticky"); // ✅ Debugging
    } else {
      $(".navbar").removeClass("sticky");
      console.log("Navbar is NOT sticky"); // ✅ Debugging
    }
  });
}

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
      var isSmallHeight = windowHeight < 320;
      var inSmallHeightScrollRange =
        scrollTop > scrollDistOffset &&
        scrollTop < scrollDistOffset + scrollDistHeight;
      var inNormalHeightScrollRange =
        scrollTop > scrollDistOffset + triggerOffset &&
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
  }
  
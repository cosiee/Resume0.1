// navbar.js

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


// Assigns href to navbar links
export function setupDynamicLinks() {
  document.querySelectorAll("a[data-link]").forEach((link) => {
    link.setAttribute("href", link.dataset.link);
  });
}
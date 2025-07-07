(function ($) {
    $.fn.sliderResponsive = function (settings) {
        const set = $.extend({
            slidePause: 5000,
            fadeSpeed: 800,
            autoPlay: "on",
            showArrows: "off",
            hideDots: "off",
            hoverZoom: "on",
            titleBarTop: "off"
        }, settings);

        const $slider = $(this);
        const size = $slider.find("> div").length;
        let position = 0;
        let sliderIntervalID;

        // Initialize dots
        if (set.hideDots === "off") {
            $slider.append("<ul class='slider-dots'></ul>");
            $slider.find("> div").each(function () {
                $slider.find("> ul").append('<li></li>');
            });
        }

        // Set initial slide
        $slider.find("div:first-of-type").addClass("show");
        $slider.find("li:first-of-type").addClass("showli");
        $slider.find("> div").not(".show").hide();

        // Auto-play setup
        if (set.autoPlay === "on") startSlider();

        // Apply settings
        if (set.showArrows === "on") $slider.addClass('show-arrows');
        if (set.hideDots === "on") $slider.addClass('hide-dots');
        if (set.hoverZoom === "off") $slider.addClass('no-hover-zoom');
        if (set.titleBarTop === "on") $slider.addClass('title-bar-top');

        // Event handlers
        $slider.hover(
            () => clearInterval(sliderIntervalID),
            () => set.autoPlay === "on" && startSlider()
        );

        $slider.find("> .right").click(nextSlide);
        $slider.find("> .left").click(prevSlide);
        $slider.find("> ul > li").click(function () {
            changeCarousel($(this).index());
        });

        function startSlider() {
            sliderIntervalID = setInterval(nextSlide, set.slidePause);
        }

        function nextSlide() {
            position = ($slider.find(".show").index() + 1) % size;
            changeCarousel(position);
        }

        function prevSlide() {
            position = ($slider.find(".show").index() - 1 + size) % size;
            changeCarousel(position);
        }

        function changeCarousel(pos) {
            $slider.find(".show").removeClass("show").fadeOut(set.fadeSpeed);
            $slider.find("> div").eq(pos).fadeIn(set.fadeSpeed).addClass("show");
            $slider.find(".showli").removeClass("showli");
            $slider.find("> ul > li").eq(pos).addClass("showli");
        }

        function onClick(){
            
        }

        return $slider;
    };
})(jQuery);





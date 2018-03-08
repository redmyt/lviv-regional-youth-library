// Provides initializing and completely settings for owl-carousel slider
(function () {
    // Initialize owl-carousel slider on the page 
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel();
    });

    // Make slider responsive and set basic settings 
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dotsEach: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: false,
                loop: true
            },
            450: {
                items: 2,
                dots: false,
                nav: false,
                loop: true
            },
            740: {
                items: 3,
                dots: false,
                nav: false,
                loop: true
            },
            1000: {
                items: 4,
                nav: false,
                loop: true
            },
            1200: {
                items: 5,
                nav: false,
                loop: true
            }
        }
    });

    // Stop the slider when user hover it and star one againg after user's mouseleave 
    $('.partners-panel').hover(
        function () {
            $('.owl-carousel').trigger('stop.owl.autoplay');
        }, function () {
            $('.owl-carousel').trigger('play.owl.autoplay', [2000, 2000]);
        }
    );

})();
// Provides initializing and completely settings for owl-carousel slider
(function initOwlSlider() {
    // Initialize owl-carousel slider on the page 
    $(document).ready(function(){
      $(".owl-carousel").owlCarousel();
    });

    // Make slider responsive and set basic settings 
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dotsEach: true,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause:true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                loop: true
            },
            600: {
                items: 3,
                nav: false,
                loop: true
            },
            1000: {
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
            $('.owl-carousel').trigger('play.owl.autoplay', [1000, 1000]);
        }
    );

})();


// Following function controls all navigation behavior
(function initNavigationChanges() {

    // Save navigation block, navigation links and logo section to a variable. Also get logo-block-element height an save it
    var $navigation = $('.navigation'),
        $navLinks = $('.navigation__nav-link'),
        $logo = $('.logo'),
        logoHeight = parseInt( $($logo).height() );

    // Add scroll event hendler for window and make navigation fixed when user scroll window over logo height
    $(window).on("scroll", function () {
        
        // Get current window scroll position
        var windowTopScroll = parseInt( $(window).scrollTop() );

        // When scroll position is over logo height add fixed styles for navigation block and add margin bottom for logo which equal navigation height
        if (windowTopScroll > logoHeight) {
            $($navigation).addClass('navigation_fixed');  
            $($logo).css( "margin-bottom", $($navigation).height() );        
        } else {
            $($navigation).removeClass('navigation_fixed');
            $($logo).css("margin-bottom", 0);        
        }
    });

    // Add click event hendler for each nav-link
    $navLinks.each(function () {
        $(this).on('click', function () {

            // Remove 'active' style from all nav-links and add it for link been clicked 
            removeClassFromElements($navLinks, 'navigation__nav-link_active');
            $(this).addClass('navigation__nav-link_active');
        });
    });

    // Followind function remove some class from group of elements
    function removeClassFromElements(elements, className) {
        $(elements).each(function () {
            $(this).removeClass(className);  
        });
    }
})();



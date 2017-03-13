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

// Provides core logic for new-books slider
(function initNewBooksSlier() {
    
    // Save all new book pictures for sliding to one variable 
    var slidingPictures = $('.new-books-slider__sliding-picture-wrapper').toArray(),
        // Save sliding pictures wrapper to variable 
        slidingPicturesWrapper = $('.new-books-slider__picteres-slide-section'), 
        // Variable for checking the slider pause
        isPaused = false;

    // Start slide each of books picture
    var sliderInterval = setInterval(function() {
        if (isPaused === false) {
            slidThePictures(slidingPictures, slidingPicturesWrapper);  
        }
    }, 25);

    // Set mousewheel event listener to body for control one scrolling
    disableBodyScroling()

    // Allow user's control for slider by mousewheel
    mousePictureSliding(slidingPicturesWrapper);

    // Stop the slider when user hovers it
    $(slidingPicturesWrapper).hover(function() {
        isPaused = true;
    }, function() {
        isPaused = false;
    });

    // function descriptions ------------------------------------------------------------------------------------------

    // Implement the slider. Change scroll position of picture wrapper and when the first element height becomes equals scroll position change the DOM picture position
    function  slidThePictures(itemsForSliding, slidingElementsWrapper) {
        // Get firs slide picture element height and picture wrapper scroll position
        var firstSlidingElement = itemsForSliding[0],
            firstElementHeight = parseInt( $(firstSlidingElement).css('height') ),
            parentElementScroll = parseInt( $(slidingElementsWrapper).scrollTop() );
        
        // Set first element at the end of picture list when picture wrapper scroll position becomes equal first element height or scroll picture wrapper one more 
        if (parentElementScroll === firstElementHeight) {
            var bodyScrollPosition = parseInt( document.body.scrollTop );
            $(slidingElementsWrapper).append(firstSlidingElement);
            document.body.scrollTop = bodyScrollPosition;
            itemsForSliding.shift();
            itemsForSliding. push(firstSlidingElement);
            $(slidingElementsWrapper).scrollTop(0);
        } else {
            parentElementScroll++;
            $(slidingElementsWrapper).scrollTop(parentElementScroll);
        }
    }

    // Stop the body scrolling when user hover on the slider and allow scroling after that 
    function disableBodyScroling() {
        $('body').on('mousewheel', function(e) {
            // Refuse or allow body scroll depending on slider paused
            if (isPaused === true) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                return true;
            }
        });
    }

    // When user rotate mouse cicle under the slide he can scroll it as one want
    function mousePictureSliding(slidingElementsWrapper) {
        // Add mousewheel event for slide wrpper
        $(slidingPicturesWrapper).on('mousewheel', function(e) {
            // identify mousewheel direction
            var mousewheelDirection = parseInt(e.deltaY) === 1 ? 'up' : 'down';
            // save previous wrapper scroll position
            parentElementScroll = parseInt( $(slidingElementsWrapper).scrollTop() );
            // change wrpper scroll position depending on mousewheel direction
            if(mousewheelDirection === 'up') {
                parentElementScroll -= 50;
                $(slidingElementsWrapper).scrollTop(parentElementScroll);
            } else {
                parentElementScroll += 50;
                $(slidingElementsWrapper).scrollTop(parentElementScroll);
            }
        }); 
    }

})();


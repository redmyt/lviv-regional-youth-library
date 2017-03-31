// Set night styles when it is evening in the Ukraine
(function setNightStyles () {

    // Switch styles for all needed elements
    switchTimeStyles('.body', 'body_style_night');
    switchTimeStyles('.header', 'header_style_night');
    switchTimeStyles('.navigation', 'navigation_style_night');
    switchTimeStyles('.navigation__item', 'navigation__item_style_night');

    // Get Ukraine time from any point of word
    function getUkraineTime() {
        var currentUserHour = new Date().getHours(),
            userTimeZone = (new Date().getTimezoneOffset() / 60),
            timeZoneHoursDifference = userTimeZone - (-3);
        return currentUserHour + timeZoneHoursDifference;
    };

    // Switch element styles at evening and morning
    function switchTimeStyles(element, classWithStyles) {
        if (getUkraineTime() > 18 || getUkraineTime() < 9) {
            $(element).addClass(classWithStyles);
        }
    }

})();

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

    // Save navigation block, navigation items and header section to a variables.
    var $navigation = $('.navigation'),
        $navItems = $('.navigation__item'),
        $header = $('.header');

    // Add scroll event hendler for window and make navigation fixed when user scroll window over the navigation block
    $(window).on("scroll", function () {

        // Get header-block-element and navigation-block-element heights an save them. Also get current window scroll position.
        var navigationHeight = parseInt( $($navigation).outerHeight() ),
            windowTopScroll = parseInt( $(window).scrollTop() ),
            headerHeight =  parseInt( $($header).outerHeight() );

        // When scroll position is over header height add fixed styles for navigation block
        if (windowTopScroll > headerHeight - navigationHeight) {
            $($navigation).addClass('header__navigation_fixed');
            $($header).css("padding-bottom", navigationHeight);
        } else {
            $($navigation).removeClass('header__navigation_fixed');
            $($header).css( "padding-bottom", 0);
        }
    });

    // Add click event hendler for each nav-item
    $navItems.each(function () {
        $(this).on('click', function () {

            // Remove 'active' style and add 'inactive' stlye from all nav-items and make 'active' onle one link been clicked 
            $navItems.removeClass('navigation__item_active').addClass('navigation__item_inactive');
            $(this).toggleClass('navigation__item_active navigation__item_inactive');
        });
    });
    
})();

// Provides core logic for new-books slider
(function initNewBooksSlier() {
    
    // Save all new book pictures for sliding to one variable 
    var slidingPictures = $('.new-books-slider__sliding-picture-wrapper').toArray(),
        // Save sliding pictures wrapper to variable 
        slidingPicturesWrapper = $('.new-books-slider__picteres-slide-section'), 
        // Variable for checking the slider pause
        isPaused = false,
        // Save slider control buttons to one variable
        controlButtons = $('.new-books-slider__control-button');

    // Start slide each of books picture
    var sliderInterval = setInterval(function() {
        if (isPaused === false) {
            slidThePictures(slidingPictures, slidingPicturesWrapper, 1);  
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

    // TODO
    controlButtons.on('click', function() {
        changePictureSlidingScrollPosition(this.dataset.scrollDirection);
    });

    // function descriptions ////////////////////////////////////////////////////////////////////////////

    // Implement the slider. Change scroll position of picture wrapper and when the scroll position of sliding elements wrapper becomes equals the first element height change the DOM position of first slider picture
    function  slidThePictures(itemsForSliding, slidingElementsWrapper, scrollStap) {
        // Get firs slide picture element height and picture wrapper scroll position
        var firstSlidingElement = itemsForSliding[0],
            firstElementHeight = parseInt( $(firstSlidingElement).css('height') ),
            parentElementScroll = parseInt( $(slidingElementsWrapper).scrollTop() );
        

        // Set first element at the end of picture list when picture wrapper scroll position becomes equal first element height or scroll picture wrapper one more 
        if (parentElementScroll >= firstElementHeight) {
            var bodyScrollPosition = parseInt( document.body.scrollTop );
            $(slidingElementsWrapper).append(firstSlidingElement);

            // Subtract height of first element from slider wrapper scroll top (for firefox)
            parentElementScroll -= parseInt( $(firstSlidingElement).outerHeight() );
            document.body.scrollTop = bodyScrollPosition;
            itemsForSliding.shift();
            itemsForSliding. push(firstSlidingElement);

            // Set sliding elements wrapper scroll top like the nubmer which we got from subtracting height of first element from slider wrapper scroll top and add scrollStap for avionding the slider to stop
            $(slidingElementsWrapper).scrollTop(parentElementScroll + scrollStap);
        } else {
            // Change scroll top of sliding elements wrapper on certain scrollStap
            parentElementScroll = parentElementScroll + scrollStap;
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
    function mousePictureSliding() {

        // Add mousewheel event for slide wrpper
        $(slidingPicturesWrapper).on('mousewheel', function(e) {
            
            // Identify mousewheel direction
            var mousewheelDirection = parseInt(e.deltaY) === 1 ? 'up' : 'down';
            changePictureSlidingScrollPosition(mousewheelDirection);
        }); 
    }

    // Change slider wrapper scroll position depending on user's choosed direction
    function changePictureSlidingScrollPosition(direction) {

        // Save previous wrapper scroll position
        var parentElementScroll = parseInt( $(slidingPicturesWrapper).scrollTop() );
        
        // Chage sliding elements wrapper scroll position
        if(direction === 'up') {
            parentElementScroll -= 50;
            $(slidingPicturesWrapper).scrollTop(parentElementScroll);
        } else {
            parentElementScroll += 50;
            $(slidingPicturesWrapper).scrollTop(parentElementScroll);
        }
    }

})();
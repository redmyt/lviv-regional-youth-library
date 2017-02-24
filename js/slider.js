(function initSlider () {

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
            // Refuse or allo body scroll depending on slider paused
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



// $('.btn').click(function() {
//   slidThePictures(slidingPictures, slidingPicturesWrapper);
// });

})();
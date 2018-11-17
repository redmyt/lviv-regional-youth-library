// Save all new book pictures for sliding to one variable
var slidingPictures = $('.new-books-slider__sliding-picture-wrapper').toArray(),
    // Save sliding pictures wrapper to variable
    slidingPicturesWrapper = $('.new-books-slider__picteres-slide-section'),
    // Variable for checking the slider pause
    isPaused = false;

// Start slide each of books picture
var sliderInterval = setInterval(function () {
    if (!isPaused) {
        slidThePictures(slidingPictures, slidingPicturesWrapper, 1);
    }
}, 30);

// Set mousewheel event listener to body for control one scrolling
disableBodyScrolling();

// Allow user's control for slider by mousewheel
mousePictureSliding(slidingPicturesWrapper);

// Stop the slider when user hovers it
$(slidingPicturesWrapper).hover(function () {
    isPaused = true;
}, function () {
    isPaused = false;
});

slidingPicturesWrapper.on('click', function() {
    window.location.hash = 'bookshelf';
});

// |--------------------| function descriptions |--------------------|

// Implement the slider. Change scroll position of picture wrapper and when the scroll position of sliding elements wrapper becomes equals the first element height change the DOM position of first slider picture
function slidThePictures(itemsForSliding, slidingElementsWrapper, scrollTop) {
    // Get firs slide picture element height and picture wrapper scroll position
    var firstSlidingElement = itemsForSliding[0],
        firstElementHeight = parseInt($(firstSlidingElement).css('height')),
        parentElementScroll = parseInt($(slidingElementsWrapper).scrollTop());


    // Set first element at the end of picture list when picture wrapper scroll position becomes equal first element height or scroll picture wrapper one more
    if (parentElementScroll >= firstElementHeight) {
        var bodyScrollPosition = parseInt(document.body.scrollTop);
        $(slidingElementsWrapper).append(firstSlidingElement);

        // Subtract height of first element from slider wrapper scroll top (for firefox)
        parentElementScroll -= parseInt($(firstSlidingElement).outerHeight());
        document.body.scrollTop = bodyScrollPosition;
        itemsForSliding.shift();
        itemsForSliding.push(firstSlidingElement);

        // Set sliding elements wrapper scroll top like the number which we got from subtracting height of first element from slider wrapper scroll top and add scrollTop to avoid the slider to stop
        $(slidingElementsWrapper).scrollTop(parentElementScroll + scrollTop);
    } else {
        // Change scroll top of sliding elements wrapper on certain scrollTop
        parentElementScroll = parentElementScroll + scrollTop;
        $(slidingElementsWrapper).scrollTop(parentElementScroll);
    }
}

// Stop the body scrolling when user hover on the slider and allow scrolling after that
function disableBodyScrolling() {
    $('body').on('mousewheel', function (e) {
        // Refuse or allow body scroll depending on slider paused
        if (isPaused === true) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            return true;
        }
    });
}

// When user rotate mouse circle under the slide he can scroll it as one want
function mousePictureSliding() {

    // Add mousewheel event for slide wrapper
    var lastWheel = +new Date();
    $(slidingPicturesWrapper).on('mousewheel', function (e) {
        if (+new Date() - lastWheel > 75) {
            var mousewheelDirection = parseInt(e.deltaY) > 0 ? 'up' : 'down';
            changePictureSlidingScrollPosition(mousewheelDirection);
            lastWheel = +new Date();
        }
    });
}

// Change slider wrapper scroll position depending on user's chosen direction
function changePictureSlidingScrollPosition(direction) {

    // Save previous wrapper scroll position
    var parentElementScroll = parseInt($(slidingPicturesWrapper).scrollTop());

    // Change sliding elements wrapper scroll position
    if (direction === 'up') {
        parentElementScroll -= 50;
        $(slidingPicturesWrapper).scrollTop(parentElementScroll);
    } else {
        parentElementScroll += 50;
        $(slidingPicturesWrapper).scrollTop(parentElementScroll);
    }
}

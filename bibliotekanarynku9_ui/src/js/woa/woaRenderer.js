var $firstWindowOnAmericaImage = $('.window-on-america__first-animate-picture'),
    $secondWindowOnAmericaImage = $('.window-on-america__second-animate-picture');

// Apply the woa pictures animation when user go to woa section
function switchOnWoaAnimation(animateImages, animationDuration) {
    var windowOnAmericaAnimationIterator = setWindowOnAmericaAnimationIterator(animateImages);

    return setInterval(function () {
        windowOnAmericaImageAnimation(animateImages);
    }, animationDuration);

    // Implement the pictures animation
    function windowOnAmericaImageAnimation(animateImages) {
        var currentAnimatePicture = animateImages[windowOnAmericaAnimationIterator];
        windowOnAmericaAnimationIterator = (windowOnAmericaAnimationIterator === animateImages.length - 1) ? 0 : windowOnAmericaAnimationIterator + 1;
        var nextAnimatePicture = animateImages[windowOnAmericaAnimationIterator];
        $(currentAnimatePicture).removeClass('window-on-america__animate-picture_visible', {
            duration: 3000,
            complete: function() {
                $(nextAnimatePicture).addClass('window-on-america__animate-picture_visible', 3000);
            }
        });
    }

    // Set the actual animation iterator for woa images animation
    function setWindowOnAmericaAnimationIterator(animateImages) {
        var windowOnAmericaAnimationIterator;
        for (var i = 0; i < animateImages.length; i++) {
            if ($(animateImages[i]).hasClass('window-on-america__animate-picture_visible')) {
                windowOnAmericaAnimationIterator = i;
                break;
            }
        }
        return windowOnAmericaAnimationIterator;
    }
}

// Stop the certain woa animation
function switchOfWoaAnimation(animation) {
    if (animation) {
        clearInterval(animation);
    }
}

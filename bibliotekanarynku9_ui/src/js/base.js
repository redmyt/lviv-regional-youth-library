var $scrollContainer = $('html'),
    $activeView = $('.main-content'),
    firstWoaAnimation = null,
    secondWoaAnimation = null,
    woaHash = 'window-on-america';

window.addEventListener('hashchange', function() {
    var currentHash = getPageHash();

    // Switch on or switch off woa animation
    if (currentHash === woaHash) {
        firstWoaAnimation = switchOnWoaAnimation($firstWindowOnAmericaImage, 7000);
        secondWoaAnimation = switchOnWoaAnimation($secondWindowOnAmericaImage, 15000);
    } else {
        switchOfWoaAnimation(firstWoaAnimation);
        switchOfWoaAnimation(secondWoaAnimation);
    }

    // Set the window scroll top at the beginning of the main content section
    var navigationHeight = getHeaderItemsParameters().navigationHeight,
        windowTopScroll = getHeaderItemsParameters().windowTopScroll,
        headerHeight = getHeaderItemsParameters().headerHeight;

    if (windowTopScroll > headerHeight) {
        $scrollContainer.stop().animate({
            scrollTop: parseInt($activeView.offset().top - navigationHeight)
        }, {
            easing: 'easeInOutCubic',
            duration: 1250
        });
    }
});
window.onhashchange();

window.onresize = function() {
    // Truncate the articles text when user resize the window
    truncateSpillingText();
};

var $scrollContainer = $('html'),
    $activeView = $('.main-content');

window.addEventListener('hashchange', function() {

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

var lastWindowWidth = $(window).width();
window.onresize = function() {
    if ($(window).width() !== lastWindowWidth) {
        // Truncate the articles text when user resize the window
        truncateSpillingText();
        lastWindowWidth = $(window).width();
    }
};

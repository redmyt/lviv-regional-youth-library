var availableHashes = getAvailableHashes(),
    $scrollElement = isWebKit() ? $('body') : $('html'),
    firstWoaAnimation = null,
    secondWoaAnimation = null,
    defaultActiveViewClass = '.news-board',
    defaultActiveNavItemSelector = '[data-target="news-board"]',
    mainContentActiveItemClass = 'main-content__item_active',
    navigationActiveItemClass = 'navigation__item_active',
    woaHash = 'window-on-america';

window.onhashchange = function() {
    var currentHash = window.location.hash.slice(1),
        isHashCorrect = verifyHash(currentHash, availableHashes),
        activeViewClass = isHashCorrect ? '.' + currentHash : defaultActiveViewClass,
        activeNavItemSelector = isHashCorrect ? '[data-target="' + currentHash + '"]' : defaultActiveNavItemSelector,
        $activeView = $(activeViewClass),
        $activeNavItem = $(activeNavItemSelector);

    // Get visible main content item and active navigation link
    emphasizeOneOfTheSetElement($activeView, $mainContentItems, mainContentActiveItemClass);
    emphasizeOneOfTheSetElement($activeNavItem, $navItems, navigationActiveItemClass);
    applicationSpillingTextTruncating();

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
        $scrollElement.stop().animate({
            scrollTop: parseInt($activeView.offset().top - navigationHeight)
        }, {
            easing: 'easeInOutCubic',
            duration: 1250
        });
    }
};
window.onhashchange();

var lastWindowWidth = $(window).width();
window.onresize = function() {
    // Truncate the articles text when user resize the window

    if ($(window).width() !== lastWindowWidth) {
        applicationSpillingTextTruncating();
        lastWindowWidth = $(window).width();
    }
};

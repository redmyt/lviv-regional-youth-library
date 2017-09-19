var availableHashes = getAvailableHashes(),
    $scrollElement = isWebKit() ? $('body') : $('html'),
    firstWoaAnimation,
    secondWoaAnimation;

window.onhashchange = function() {
    var currentHash = window.location.hash.slice(1),
        isHashCorrect = verifyHash(currentHash, availableHashes),
        activeViewClass = isHashCorrect ? '.' + currentHash : '.news-board',
        activeNavItemSelector = isHashCorrect ? '[data-target="' + currentHash + '"]' : '[data-target="news-board"]',
        $activeView = $(activeViewClass),
        $activeNavItem = $(activeNavItemSelector);

    // Get visible main content item and active navigation link
    emphasizeOneOfTheSetElement($activeView, $mainContentItems, 'main-content__item_active');
    emphasizeOneOfTheSetElement($activeNavItem, $navItems, 'navigation__item_active');
    applicationSpillingTextTruncating();

    // Switch on or switch off woa animation
    if(currentHash === 'window-on-america') {
        firstWoaAnimation = switchOnWoaAnimation($firstWindowOnAmericaImage, 20000);
        secondWoaAnimation = switchOnWoaAnimation($secondWindowOnAmericaImage, 25000);
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
    if ($(window).width() !== lastWindowWidth) {
        applicationSpillingTextTruncating();
        lastWindowWidth = $(window).width();
    }
}

function verifyHash(currentHash, availableHashes) {
    var isHashCorrect = false;
 
    for (var i = 0; i < availableHashes.length; i++) {
        if (currentHash === availableHashes[i]) {
            isHashCorrect = true;
            break;
        }
    }

    return isHashCorrect;
}

function getAvailableHashes() {
    var availableHashes = [],
        $navLinks = $('.navigation__link');

    $navLinks.each(function(index, element) {
        var navLinkHref = element.href,
            navLinkHash = navLinkHref.slice(navLinkHref.indexOf('#') + 1);

        availableHashes.push(navLinkHash);
    });

    return availableHashes;
}

function emphasizeOneOfTheSetElement(element, setOfElements, emphasizeClass) {
    $(setOfElements).each(function () {
        $(this).removeClass(emphasizeClass);
    });
    $(element).addClass(emphasizeClass);
}

// Verify does user has Webkit browser
function isWebKit() {
    if (navigator.userAgent.indexOf('WebKit') === -1) {
        return false;
    }

    return true;
}
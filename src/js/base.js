var availableHashes = getAvailableHashes(),
    $scrollElement = isOpera() ? $('body') : $('html'),
    firstWoaAnimation,
    secondWoaAnimation;

window.onhashchange = function() {
    var currentHash = window.location.hash.slice(1),
        isHashCorrect = verifyHash(currentHash, availableHashes),
        activeViewClass = isHashCorrect ? '.' + currentHash : '.news-board',
        activeNavLinkSelector = isHashCorrect ? '[data-target="' + currentHash + '"]' : '[data-target="news-board"]',
        $activeView = $(activeViewClass),
        $activeNavLink = $(activeNavLinkSelector);

    // Get visible main content item and active navigation link
    emphasizeOneOfTheSetElement($activeView, $mainContentItems, 'main-content__item_active');
    emphasizeOneOfTheSetElement($activeNavLink, $navItems, 'navigation__item_active');
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
    var availableHashes = [];
    $navItems.each(function(index, element) {
        var navItemHash = element.dataset.target;
        availableHashes.push(navItemHash);
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
function isOpera() {
    if (navigator.userAgent.indexOf('OPR') === -1) {
        return false;
    }

    return true;
}
function getAvailableHashes() {
    /*
    Function which goes through the all navigation links
    and returned the list of their href values.
    */

    var availableHashes = [],
        $navLinks = $('.navigation__link');

    $navLinks.each(function(_, element) {
        var navLinkHref = element.href,
            navLinkHash = navLinkHref.slice(navLinkHref.indexOf('#') + 1);

        availableHashes.push(navLinkHash);
    });

    return availableHashes;
}

function verifyHash(currentHash, availableHashes) {
    /*
    Function that verifies if the user enters the
    possible hash to route it.
    */

    var isHashCorrect = false;

    for (var i = 0; i < availableHashes.length; i++) {
        if (currentHash === availableHashes[i]) {
            isHashCorrect = true;
            break;
        }
    }

    return isHashCorrect;
}

function emphasizeOneOfTheSetElement(element, setOfElements, emphasizeClass) {
    /*
    Function which adds the certain class name only for one element of the
    set and removes this class name from any else element.
    */

    $(setOfElements).each(function () {
        $(this).removeClass(emphasizeClass);
    });
    $(element).addClass(emphasizeClass);
}

// Create needed html element with certain classes
function createPageElement(elementTag, elementClasses) {
    var $newPageElement = $(elementTag);
    $newPageElement.addClass(elementClasses);
    return $newPageElement;
}

// Verify does user has Webkit browser
function isWebKit() {
    return !(navigator.userAgent.indexOf('WebKit') === -1);
}

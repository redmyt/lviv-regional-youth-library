function getPageHash() {
    /*
    Function which returns the current page hash without the
    sharp symbol.
    */

    return window.location.hash.slice(1);
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
    return navigator.userAgent.indexOf('WebKit') !== -1;
}

var availableHashes = getAvailableHashes();

window.onhashchange = function() {
    var currentHash = window.location.hash.slice(1),
        activeElementClass = '',
        activeNavLinkSelector = '',
        isHashCorrect = verifyHash(currentHash, availableHashes);

    activeElementClass = isHashCorrect ? '.' + currentHash : 'news-board';
    activeNavLinkSelector = isHashCorrect ? '[data-target="' + currentHash + '"]' : '[data-target="news-board"]';
    } else {
        ac
    }

    emphasizeOneOfTheSetElement($(activeNavLinkSelector), $navItems, 'navigation__item_active');
    emphasizeOneOfTheSetElement($(activeElementClass), $mainContentItems, 'main-content__item_active');
    applicationSpillingTextTruncating();
};

window.onhashchange();

function verifyHash(currentHash, availableHashes) {
    var isHashCorrect = false;
 
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        if (currentHash === element) {
            isHashCorrect = true;
            break;
        }
    }

    return isHashCorrect;
}

function getAvailableHashes() {
    var availableHashes = [];
    $navItems.each(function(index, element) {
        var navItemHash = elem.dataset.target;
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
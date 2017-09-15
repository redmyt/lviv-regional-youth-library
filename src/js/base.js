window.onhashchange = function() {
    var currentHash = window.location.hash.slice(1);
        activeElementClass = '.' + currentHash,
        activeNavLinkSelector = '[data-target="' + currentHash + '"]';

    emphasizeOneOfTheSetElement($(activeNavLinkSelector), $navItems, 'navigation__item_active');
    emphasizeOneOfTheSetElement($(activeElementClass), $mainContentItems, 'main-content__item_active');
    applicationSpillingTextTruncating();
};

$(document).ready(function() {
    window.onhashchange();
});

function emphasizeOneOfTheSetElement(element, setOfElements, emphasizeClass) {
    $(setOfElements).each(function () {
        $(this).removeClass(emphasizeClass);
    });
    $(element).addClass(emphasizeClass);
}
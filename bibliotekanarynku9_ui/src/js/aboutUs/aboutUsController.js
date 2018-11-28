var aboutUsActiveViewClass = '.about-us',
    aboutUsActiveNavItemSelector = '[data-target="about-us"]',
    $aboutUsActiveView = $(aboutUsActiveViewClass),
    $aboutUsActiveNavItem = $(aboutUsActiveNavItemSelector);

function aboutUsController() {
    emphasizeOneOfTheSetElement($aboutUsActiveNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($aboutUsActiveView, $mainContentItems, mainContentActiveItemClass);
}

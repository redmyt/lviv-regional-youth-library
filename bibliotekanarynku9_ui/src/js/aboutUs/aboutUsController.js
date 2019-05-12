var aboutUsActiveViewClass = '.about-us',
    aboutUsActiveNavItemSelector = '[data-target="about"]',
    $aboutUsActiveView = $(aboutUsActiveViewClass),
    $aboutUsActiveNavItem = $(aboutUsActiveNavItemSelector);

function aboutUsController() {
    emphasizeOneOfTheSetElement($aboutUsActiveView, $mainContentItems, mainContentActiveItemClass);
    emphasizeOneOfTheSetElement($aboutUsActiveNavItem, $navItems, navigationActiveItemClass);
}

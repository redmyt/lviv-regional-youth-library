var charityDetailsActiveViewClass = '.charity-details',
    charityDetailsActiveNavItemSelector = '[data-target="charity-details"]',
    $charityDetailsActiveView = $(charityDetailsActiveViewClass),
    $charityDetailsActiveNavItem = $(charityDetailsActiveNavItemSelector);

function charityDetailsController() {
    emphasizeOneOfTheSetElement($charityDetailsActiveView, $mainContentItems, mainContentActiveItemClass);
    emphasizeOneOfTheSetElement($charityDetailsActiveNavItem, $navItems, navigationActiveItemClass);
}

var woaActiveViewClass = '.window-on-america',
    woaActiveNavItemSelector = '[data-target="woa"]',
    $woaActiveView = $(woaActiveViewClass),
    $woaActiveNavItem = $(woaActiveNavItemSelector),
    firstWoaAnimation = null,
    secondWoaAnimation = null;

function woaController() {
    emphasizeOneOfTheSetElement($woaActiveView, $mainContentItems, mainContentActiveItemClass);
    emphasizeOneOfTheSetElement($woaActiveNavItem, $navItems, navigationActiveItemClass);

    // Switch on woa animation
    firstWoaAnimation = switchOnWoaAnimation($firstWindowOnAmericaImage, 7000);
    secondWoaAnimation = switchOnWoaAnimation($secondWindowOnAmericaImage, 12000);
}

// Clean the woa animation timer when user is not on the woa page.
function woaCleanUpHook(rootPath) {
    if (rootPath !== 'woa') {
        switchOfWoaAnimation(firstWoaAnimation);
        switchOfWoaAnimation(secondWoaAnimation);
    }
}

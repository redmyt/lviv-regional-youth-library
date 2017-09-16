// Save navigation block, navigation items, header section and collapsed button to a variables.
var $header = $('.header'),
    $navigation = $('.navigation'),
    $navItems = $('.navigation__item'),
    $navItemsList = $('.navigation__items-list'),
    $collapsedButton = $('.navigation__collapsed-button');

// Save all main content items for changing its visibility
var $mainContentItems = $('.main-content__item');

// Add scroll event handler for window and make navigation fixed when user scroll window over the navigation block
$(window).on('scroll', function () {
    var navigationHeight = getHeaderItemsParameters().navigationHeight,
        windowTopScroll = getHeaderItemsParameters().windowTopScroll,
        headerHeight = getHeaderItemsParameters().headerHeight;

    // When scroll position is over header height add fixed styles for navigation block
    if (windowTopScroll > headerHeight - navigationHeight) {
        $($navigation).addClass('header__navigation_fixed');
        $($header).css("padding-bottom", navigationHeight);
    } else {
        $($navigation).removeClass('header__navigation_fixed');
        $($header).css("padding-bottom", 0);
    }

    // Collapse menu when user fire scroll event
    if (!$navItemsList.hasClass('navigation__items-list_style_collapsed')) {
        $navItemsList.addClass('navigation__items-list_style_collapsed');
    }
});

// Add click event handler for each nav-item
$navItems.each(function () {
    $(this).on('click', function () {
        window.location.hash = this.dataset.target;
    });
});

// Show or hide collapsed menu when user click the collapsed button
$collapsedButton.on('click', function () {
    $navItemsList.toggleClass('navigation__items-list_style_collapsed');
});

// Get header-block-element and navigation-block-element heights an save them. Also get current window scroll position.
function getHeaderItemsParameters() {
    var navigationHeight = parseInt($($navigation).outerHeight()),
        windowTopScroll = parseInt($(window).scrollTop()),
        headerHeight = parseInt($($header).outerHeight());

    return {
        navigationHeight: navigationHeight,
        windowTopScroll: windowTopScroll,
        headerHeight: headerHeight
    };
}
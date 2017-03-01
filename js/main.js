// Following function controls all navigation behavior
(function initNavigationChanges() {
    // Save navigation block and navigation links to a variable
    var $navigation = $('.navigation'),
        $navLinks = $('.navigation__nav-link');
    // Add click event hendler for each nav-link
    $navLinks.each(function() {
        $(this).on('click', function() {
            // Remove 'active' style from all nav-links and add it for link been clicked 
            removeClassFromElements($navLinks, 'navigation__nav-link_active');
            $(this).addClass('navigation__nav-link_active');
        });
    });
    // Followind function remove some class from group of elements
    function removeClassFromElements(elements, className) {
        $(elements).each(function() {
            $(this).removeClass(className);  
        });
    }
})();
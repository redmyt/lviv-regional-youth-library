// Initialize Owl carousel slider on the page 
$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

// Following function controls all navigation behavior
(function initNavigationChanges() {

    // Save navigation block and navigation links to a variable. Also get logo-block-element height an save it
    var $navigation = $('.navigation'),
        $navLinks = $('.navigation__nav-link'),
        logoHeight = parseInt( $('.logo').height() );

    // Add scroll event hendler for window and make navigation fixed when user scroll window over logo height
    $(window).on("scroll", function () {
        
        // Get current window scroll position
        var windowTopScroll = parseInt( $(window).scrollTop() );

        // When scroll position is over logo height add fixed styles for navigation block
        if (windowTopScroll > logoHeight) {
            $($navigation).addClass('navigation_fixed');            
        } else {
            $($navigation).removeClass('navigation_fixed');
        }
    });

    // Add click event hendler for each nav-link
    $navLinks.each(function () {
        $(this).on('click', function () {

            // Remove 'active' style from all nav-links and add it for link been clicked 
            removeClassFromElements($navLinks, 'navigation__nav-link_active');
            $(this).addClass('navigation__nav-link_active');
        });
    });

    // Followind function remove some class from group of elements
    function removeClassFromElements(elements, className) {
        $(elements).each(function () {
            $(this).removeClass(className);  
        });
    }
})();



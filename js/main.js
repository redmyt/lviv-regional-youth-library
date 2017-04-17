// Add certain emphasize class for the one of the set elemet and remove that class from the other set elements
function emphasizeOneOfTheSetElement(element, setOfElements, emphasizeClass) {
    $(setOfElements).each(function() {
        $(this).removeClass(emphasizeClass);
    })
    $(element).addClass(emphasizeClass);
}

// Set night styles when it is evening in the Ukraine
(function setNightStyles () {

    // Switch styles for all needed elements
    switchTimeStyles('.body', 'body_style_night');
    switchTimeStyles('.header', 'header_style_night');
    switchTimeStyles('.navigation', 'navigation_style_night');
    switchTimeStyles('.navigation__item', 'navigation__item_style_night'),
    switchTimeStyles('.navigation__collapsed-button', 'navigation__collapsed-button_style_night');

    // Get Ukraine time from any point of word
    function getUkraineTime() {
        var currentUserHour = new Date().getHours(),
            userTimeZone = (new Date().getTimezoneOffset() / 60),
            timeZoneHoursDifference = userTimeZone - (-3);
        return currentUserHour + timeZoneHoursDifference;
    };

    // Switch element styles at evening and morning
    function switchTimeStyles(element, classWithStyles) {
        if (getUkraineTime() > 18 || getUkraineTime() < 9) {
            $(element).addClass(classWithStyles);
        }
    }

})();

// Provides initializing and completely settings for owl-carousel slider
(function initOwlSlider() {
    // Initialize owl-carousel slider on the page 
    $(document).ready(function(){
      $(".owl-carousel").owlCarousel();
    });

    // Make slider responsive and set basic settings 
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dotsEach: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause:true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                loop: true
            },
            600: {
                items: 3,
                nav: false,
                loop: true
            },
            1000: {
                items: 5,
                nav: false,
                loop: true
            }
        }
    });    

    // Stop the slider when user hover it and star one againg after user's mouseleave 
    $('.partners-panel').hover(
        function () {
            $('.owl-carousel').trigger('stop.owl.autoplay');
        }, function () {
            $('.owl-carousel').trigger('play.owl.autoplay', [2000, 2000]);
        }
    );

})();

// Following function controls all navigation behavior
(function initNavigationChanges() {

    // Save navigation block, navigation items, header section and collapser button to a variables.
    var $header = $('.header'),
        $navigation = $('.navigation'),
        $navItems = $('.navigation__item'),
        $navItemsList = $('.navigation__items-list'),
        $collapsedButton = $('.navigation__collapsed-button');
    
    // Save all main content items for shanging its visibility    
    var $mainContentItems = $('.main-comtent__item');

    // Add scroll event hendler for window and make navigation fixed when user scroll window over the navigation block
    $(window).on('scroll', function () {

        // Get header-block-element and navigation-block-element heights an save them. Also get current window scroll position.
        var navigationHeight = parseInt( $($navigation).outerHeight() ),
            windowTopScroll = parseInt( $(window).scrollTop() ),
            headerHeight =  parseInt( $($header).outerHeight() );

        // When scroll position is over header height add fixed styles for navigation block
        if (windowTopScroll > headerHeight - navigationHeight) {
            $($navigation).addClass('header__navigation_fixed');
            $($header).css("padding-bottom", navigationHeight);
        } else {
            $($navigation).removeClass('header__navigation_fixed');
            $($header).css("padding-bottom", 0);
        }
    });

    // Add click event hendler for each nav-item
    $navItems.each(function () {
        $(this).on('click', function () {
            // Make clicked item style active
            emphasizeOneOfTheSetElement(this, $navItems, 'navigation__item_active');

            // Get visible main content item
            var $visibleMainContentItem = $(this.dataset.target);
            // Make other main content items invisible
            emphasizeOneOfTheSetElement($visibleMainContentItem, $mainContentItems, 'main-comtent__item_active');
        });
    });

    // Show or hide collapsed menu when user click the collapsed button
    $collapsedButton.on('click', function() {
        $navItemsList.toggleClass('navigation__items-list_style_collapsed');    
        
        // Remove large paddin which been added when menu was open
        $($header).css("padding-bottom", 0);
        $(window).scroll();
    });
    
})();

// Following function controls all main content behavior
(function initMainContentChnges() {

    // Array for saving all xml news articles from the "news" document
    var xmlNewsArticles = [];

    // Get AJAX request for the "news" document and put all separate xml news articles to array 
    $.ajax({
        type: 'GET',
        url: "../news.xml",
        dataType: "xml",
        success: function(data) {
            $(data).find('article').each(function() {
                xmlNewsArticles.push(this);
            });
            addElementsToPage( parseNewsItemsToHtml(xmlNewsArticles), $('.news-board') );
        }
    });


    function parseNewsItemsToHtml(xmlNewsArticles) {

        // Array for saving all html news articles after its parsing
        var htmlNewsArticles = [];

        $(xmlNewsArticles).each(function () {

            // Create elements for the html markup
            var $newsArticle = createPageElement('<article>', 'news-article news-article_style_default clearfix'),
                $newsHeading = createPageElement('<h3>', 'news-article__heading page-header'),
                $newsPictureWrapper = createPageElement('<figure>', 'news-article__picture-wrapper picture-wrapper'),
                $newsPicture = createPageElement('<img>', 'news-article__pictire'),
                $newsParagraph = createPageElement('<p>', 'news-article__paragraph news-article__paragraph_style_default'),
                $newsLink = createPageElement('<a>', 'news-article__link page-link');

            // Get needed value for certain xml tags
            $newsHeading.text( $(this).find('name').text() );
            $newsPictureWrapper.append($newsPicture);
            $newsPicture.attr( 'src', $(this).find('image').text() );
            $newsParagraph.text( $(this).find('content').text() );
            $newsLink.text( $(this).find('facebookLink').text() );

            // Add all html article's children to one
            $newsArticle.append($newsHeading);
            $newsArticle.append($newsPictureWrapper);
            $newsArticle.append($newsParagraph);
            $newsArticle.append($newsLink);

            // Add complete article to the articles array
            htmlNewsArticles.push($newsArticle);
        });
        return htmlNewsArticles;
    }

    function addElementsToPage(elements, appendElementTo) {
        $(appendElementTo).append(elements);
    }

    function createPageElement(elementTag, elementClasses) {
        var $newPageElement = $(elementTag);
        $newPageElement.addClass(elementClasses);
        return $newPageElement;
    }

})();

// Provides core logic for new-books slider
(function initNewBooksSlier() {
    
    // Save all new book pictures for sliding to one variable 
    var slidingPictures = $('.new-books-slider__sliding-picture-wrapper').toArray(),
        // Save sliding pictures wrapper to variable 
        slidingPicturesWrapper = $('.new-books-slider__picteres-slide-section'), 
        // Variable for checking the slider pause
        isPaused = false,
        // Save slider control buttons to one variable
        controlButtons = $('.new-books-slider__control-button');

    // Start slide each of books picture
    var sliderInterval = setInterval(function() {
        if (isPaused === false) {
            slidThePictures(slidingPictures, slidingPicturesWrapper, 1);  
        }
    }, 25);

    // Set mousewheel event listener to body for control one scrolling
    disableBodyScroling()

    // Allow user's control for slider by mousewheel
    mousePictureSliding(slidingPicturesWrapper);

    // Stop the slider when user hovers it
    $(slidingPicturesWrapper).hover(function() {
        isPaused = true;
    }, function() {
        isPaused = false;
    });

    // TODO
    controlButtons.on('click', function() {
        changePictureSlidingScrollPosition(this.dataset.scrollDirection);
    });

    // function descriptions ////////////////////////////////////////////////////////////////////////////

    // Implement the slider. Change scroll position of picture wrapper and when the scroll position of sliding elements wrapper becomes equals the first element height change the DOM position of first slider picture
    function  slidThePictures(itemsForSliding, slidingElementsWrapper, scrollStap) {
        // Get firs slide picture element height and picture wrapper scroll position
        var firstSlidingElement = itemsForSliding[0],
            firstElementHeight = parseInt( $(firstSlidingElement).css('height') ),
            parentElementScroll = parseInt( $(slidingElementsWrapper).scrollTop() );
        

        // Set first element at the end of picture list when picture wrapper scroll position becomes equal first element height or scroll picture wrapper one more 
        if (parentElementScroll >= firstElementHeight) {
            var bodyScrollPosition = parseInt( document.body.scrollTop );
            $(slidingElementsWrapper).append(firstSlidingElement);

            // Subtract height of first element from slider wrapper scroll top (for firefox)
            parentElementScroll -= parseInt( $(firstSlidingElement).outerHeight() );
            document.body.scrollTop = bodyScrollPosition;
            itemsForSliding.shift();
            itemsForSliding. push(firstSlidingElement);

            // Set sliding elements wrapper scroll top like the nubmer which we got from subtracting height of first element from slider wrapper scroll top and add scrollStap for avionding the slider to stop
            $(slidingElementsWrapper).scrollTop(parentElementScroll + scrollStap);
        } else {
            // Change scroll top of sliding elements wrapper on certain scrollStap
            parentElementScroll = parentElementScroll + scrollStap;
            $(slidingElementsWrapper).scrollTop(parentElementScroll);
        }
    }

    // Stop the body scrolling when user hover on the slider and allow scroling after that 
    function disableBodyScroling() {
        $('body').on('mousewheel', function(e) {
            // Refuse or allow body scroll depending on slider paused
            if (isPaused === true) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                return true;
            }
        });
    }

    // When user rotate mouse cicle under the slide he can scroll it as one want
    function mousePictureSliding() {

        // Add mousewheel event for slide wrpper
        $(slidingPicturesWrapper).on('mousewheel', function(e) {
            
            // Identify mousewheel direction
            var mousewheelDirection = parseInt(e.deltaY) === 1 ? 'up' : 'down';
            changePictureSlidingScrollPosition(mousewheelDirection);
        }); 
    }

    // Change slider wrapper scroll position depending on user's choosed direction
    function changePictureSlidingScrollPosition(direction) {

        // Save previous wrapper scroll position
        var parentElementScroll = parseInt( $(slidingPicturesWrapper).scrollTop() );
        
        // Chage sliding elements wrapper scroll position
        if(direction === 'up') {
            parentElementScroll -= 50;
            $(slidingPicturesWrapper).scrollTop(parentElementScroll);
        } else {
            parentElementScroll += 50;
            $(slidingPicturesWrapper).scrollTop(parentElementScroll);
        }
    }

})();

// Following function controls all footer behavior
(function initFooterChanges() {

    // Save mail and skype icons and texts
    var $mailIcon = $('.contact-information__mail-link'),
        $skypeIcon = $('.contact-information__skype-link'),
        $mailText = $('.contacts__mail-text'),
        $skypeText = $('.contacts__skype-text');

    // Add mail and skype texts to one set
    var contactsShowingElements = [$mailText, $skypeText];

    // Show the mail text when user click the mail icon
    $mailIcon.click(function() {
        emphasizeOneOfTheSetElement($mailText, contactsShowingElements, 'contacts__skype-mail-text_visible');
        emphasizeOneOfTheSetElement($skypeText, contactsShowingElements, 'contacts__skype-mail-text_invisible');
    });

    // Show the mail text when user click the mail icon
    $skypeIcon.click(function() {
        emphasizeOneOfTheSetElement($skypeText, contactsShowingElements, 'contacts__skype-mail-text_visible');
        emphasizeOneOfTheSetElement($mailText, contactsShowingElements, 'contacts__skype-mail-text_invisible');
    });

})();

// Google maps module
(function initGoogleMap() {
    google.maps.event.addDomListener(window, 'load', init);
    var map, markersArray = [];

    function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                if (location.open_hours.length > 0){
                                    for (var i = 0; i < location.open_hours.length; ++i) {
                                        if (i !== 0){
                                            items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                        }
                                        var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                    }
                                    return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 } else {
                                    return '';
                                }
                                break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML = 
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }

    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(49.84187833736642,24.03229847171019),
            zoom: 17,
            gestureHandling: 'auto',
            fullscreenControl: false,
            zoomControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: true,
            scrollwheel: false,
            streetViewControl: true,
            draggable : true,
            clickableIcons: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        var mapElement = document.getElementById('google-map-frame');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            {"title":"площа Ринок, 9","address":"площа Ринок, 9, Львів, Львівська область, Украина","desc":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":49.841895,"lng":24.033230000000003,"vicinity":"Галицький район","open_hours":"","marker":{"url":"https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi_hdpi.png","scaledSize":{"width":25,"height":42,"j":"px","f":"px"},"origin":{"x":0,"y":0},"anchor":{"x":12,"y":42}},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
        ];
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
    }
})();
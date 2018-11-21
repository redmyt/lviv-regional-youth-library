// Switch styles for all needed elements
switchTimeStyles('.body', 'body_style_night');
switchTimeStyles('.header', 'header_style_night');
switchTimeStyles('.navigation', 'navigation_style_night');
switchTimeStyles('.navigation__item', 'navigation__item_style_night');
switchTimeStyles('.navigation__collapsed-button', 'navigation__collapsed-button_style_night');
switchTimeStyles('.main-content', 'main-content_style_night');
switchTimeStyles('.main-content-article', 'main-content-article_style_night');
switchTimeStyles('.news__more-articles-button', 'news__more-articles-button_style_night');

// Get Ukraine time from any point of word
function getUkraineTime() {
    var currentUserHour = new Date().getHours(),
        userTimeZone = (new Date().getTimezoneOffset() / 60),
        timeZoneHoursDifference = userTimeZone - (-3);
    return currentUserHour + timeZoneHoursDifference;
}

// Switch element styles at evening and morning
function switchTimeStyles(element, classWithStyles) {
    if (getUkraineTime() > 17 || getUkraineTime() < 9) {
        $(element).addClass(classWithStyles);
    }
}

var dateMonthLocalizationMap = {
    1: 'Січня',
    2: 'Лютого',
    3: 'Березня',
    4: 'Квітня',
    5: 'Травня',
    6: 'Червня',
    7: 'Липня',
    8: 'Серпня',
    9: 'Вересня',
    10: 'Жовтня',
    11: 'Листопада',
    12: 'Грудня'
};

function getDateData(rawDate) {
    /*
    Function which parse the accepted date string to the
    flexible dict format.
    */

    var date = new Date(rawDate),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hour = date.getHours() + date.getTimezoneOffset() / 60,
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minutes: minutes
    };
}

function dateParser(dateData) {
    /* Parse the date object to beauty date format */

    return dateData.day + '-го' + ' ' + dateMonthLocalizationMap[dateData.month] + ' ' + dateData.year;
}

function dateTimeParser(dateData) {
    /* Parse the date object to beauty deteTime format */

    return dateData.day + '-го' + ' ' + dateMonthLocalizationMap[dateData.month] + ' ' + dateData.year + ' ' + dateData.hour + ':' + dateData.minutes;
}

function getPageHash() {
    /*
    Function which returns the current page hash without the
    sharp symbol.
    */

    return window.location.hash.slice(1);
}

function emphasizeOneOfTheSetElement(element, setOfElements, emphasizeClass) {
    /*
    Function which adds the certain class name only for one element of the
    set and removes this class name from any else element.
    */

    $(setOfElements).each(function () {
        $(this).removeClass(emphasizeClass);
    });
    $(element).addClass(emphasizeClass);
}

function createPageElement(elementTag, elementClasses) {
    /* Create needed html element with certain classes */

    var $newPageElement = $(elementTag);
    $newPageElement.addClass(elementClasses);
    return $newPageElement;
}

function splitTextToParagraphs(text) {
    /* Divide the accepted text to the paragraphs base on new line special character. */

    return text ? text.split('\n') : [];
}

function setLanguageHeader(language) {
    /* Set the Accept-Language header for the each request to the api. */

    return function(request) {
        request.setRequestHeader('Accept-Language', language || defaultLanguage);
    };
}

function parseImagePath(path) {
    var parsedPath = '';
    if (path) {
        var staticIndex = path.indexOf('/static/');
        parsedPath = staticIndex !== -1 ? path.slice(staticIndex) : path;
    }
    return parsedPath;
}

function isWebKit() {
    return navigator.userAgent.includes('WebKit');
}

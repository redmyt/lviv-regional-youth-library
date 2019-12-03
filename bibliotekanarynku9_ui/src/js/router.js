var routerRegexp = /^([A-z-]+)\/?(\d+)?/;

window.onhashchange = function() {
    var hash = getPageHash(),
        hashProcessedData = routerRegexp.exec(hash),
        rootPath = getRootPath(hashProcessedData),
        recourseId = getRecourseId(hashProcessedData);

    cleanUpHashChangeHook(rootPath);

    switch(rootPath) {
        case 'news':
            newsController(recourseId);
            break;
        case 'announcement':
            announcementController(recourseId);
            break;
        case 'project':
            projectController(recourseId);
            break;
        case 'press':
            pressController(recourseId);
            break;
        case 'woa':
            woaController();
            break;
        case 'book':
            bookController(recourseId);
            break;
        case 'about':
            aboutUsController();
            break;
        case 'charity-details':
            charityDetailsController();
            break;
        default:
            newsController();
    }
};

function getRecourseId(hashData) {
    return hashData ? hashData[2] : 0;
}

function getRootPath(hashData) {
    return hashData ? hashData[1] : '';
}

// Function for cleaning the other controllers timer objects.
function cleanUpHashChangeHook(rootPath) {
    woaCleanUpHook(rootPath);
}

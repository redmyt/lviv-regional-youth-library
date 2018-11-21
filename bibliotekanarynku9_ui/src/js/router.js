var routerRegexp = /^([A-z]+)\/?(\d+)?/;

window.onhashchange = function() {
    var hash = getPageHash(),
        hashProcessedData = routerRegexp.exec(hash),
        rootPath = getRootPath(hashProcessedData),
        recourseId = getRecourseId(hashProcessedData);

    switch(rootPath) {
        case 'news':
            newsController(recourseId);
    }
};

function getRecourseId(hashData) {
    return hashData[2];
}

function getRootPath(hashData) {
    return hashData[1];
}

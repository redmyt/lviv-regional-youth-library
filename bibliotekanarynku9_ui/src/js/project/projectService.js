var projectPath = schema + host + apiPath + 'project/';

function getListProjectService(url) {
    var endpoint = url || projectPath;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

function getDetailedProjectService(newsId) {
    var endpoint = projectPath + newsId;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

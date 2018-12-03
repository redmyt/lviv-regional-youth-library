var projectPath = apiPath + 'project/';

function getListProjectService(url) {
    var endpoint = url || projectPath;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

function getDetailedProjectService(projectId) {
    var endpoint = projectPath + projectId;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

var announcementPath = schema + host + apiPath + 'announcement/';

function getListAnnouncementService(url) {
    var endpoint = url || announcementPath;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

function getDetailedAnnouncementService(announcementId) {
    var endpoint = announcementPath + announcementId;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

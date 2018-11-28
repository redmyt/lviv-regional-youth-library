var pressPath = schema + host + apiPath + 'press_post/';

function getListPressService(url) {
    var endpoint = url || pressPath;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

function getDetailedPressService(pressId) {
    var endpoint = pressPath + pressId;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

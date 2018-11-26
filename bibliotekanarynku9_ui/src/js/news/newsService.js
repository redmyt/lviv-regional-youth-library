var newsPath = schema + host + apiPath + 'news_post/';

function getListNewsService(url) {
    var endpoint = url || newsPath;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

function getDetailedNewsService(newsId) {
    var endpoint = newsPath + newsId;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

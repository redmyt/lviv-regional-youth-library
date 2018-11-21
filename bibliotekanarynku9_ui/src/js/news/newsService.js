var newsPath = schema + host + apiPath + 'news_post/';

function getListNewsService(url) {
    var endpoint = url || newsPath;
    return $.getJSON(endpoint);
}

function getDetailedNewsService(newsId) {
    var endpoint = newsPath + newsId;
    return $.getJSON(endpoint);
}

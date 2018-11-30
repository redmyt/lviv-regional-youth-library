var bookPath = schema + host + apiPath + 'book/';

function getListBookService(url) {
    var endpoint = url || bookPath;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

function getDetailedBookService(bookId) {
    var endpoint = bookPath + bookId;
    return $.ajax({
        url: endpoint,
        datatype: defaultDataType,
        beforeSend: setLanguageHeader()
    });
}

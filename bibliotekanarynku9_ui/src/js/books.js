// Array for saving all html book articles after its parsing
var bookshelfItems = [];

// Get AJAX request for the "books" document and put all separate html book items to array
$.getJSON('./books.json', function (books) {

    // Parse each xml book item to html and save them
    books.forEach(function (book, index) {
        var $currentBook = parseArticleItemToHtml(book);
        bookshelfItems.push($currentBook);
    });

    bookshelfItems.forEach(function (htmlBookItem) {
        $('.bookshelf').append(htmlBookItem);
    });

    switchTimeStyles('.main-content-article', 'main-content-article_style_night');

    if (parseInt($(window).width()) < 880) {
        truncateSpillingText();
    }
});

// Parse certain xml news article to a html news article
function parseArticleItemToHtml(article, articleType) {

    // Create elements for the html markup
    var $article = createPageElement('<article>', 'main-content-article main-content-article_style_default main-content-article_style_day rounded'),
        $articleHeading = (article.name) ? createPageElement('<h3>', 'main-content-article__heading page-header') : null,
        $articleBody = createPageElement('<section>', 'main-content-article__body clearfix'),
        $articlePictureWrapper = createPageElement('<figure>', 'main-content-article__picture-wrapper picture-wrapper'),
        $articlePicture = createPageElement('<img>', 'page-picture page-picture__style_default rounded');

    // Array for one or more articles paragraphs
    var articleParagraphs = [];

    // Create needed amount of articles paragraphs
    article.paragraphs.forEach(function (currentParagraph, index) {
        var $currentParagraph = createPageElement('<p>', 'main-content-article__paragraph main-content-article__paragraph_style_default');
        $currentParagraph.text(currentParagraph);
        articleParagraphs.push($currentParagraph);
    });

    // Get needed value for certain xml tags and set element's attachment
    $articlePicture.attr( 'src', article.image);
    $articlePictureWrapper.append($articlePicture);
    $articleBody.append($articlePictureWrapper, articleParagraphs);
    if ($articleHeading) {
        $articleHeading.text(article.name);
        $article.append($articleHeading);
    }
    $article.append($articleBody);

    if (articleType === 'news') {
        var $articleLink = createPageElement('<a>', 'main-content-article__link page-link');
        $articleLink.text('Дізнатись більше...');
        $articleLink.attr('href', article.link);
        $articleLink.attr('target', '_blank');
        $article.append($articleLink);
    }

    return $article;
}

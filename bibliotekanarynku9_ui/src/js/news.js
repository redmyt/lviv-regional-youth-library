var $showMoreButton = $('.news-board__more-articles-button');

// Array for saving all html news articles after its parsing
var htmlNewsArticles = [];

// Save index of the next element that must be showed on the page
var nextShowingNewsItemIndex = 0;
// Get AJAX request for the "news" document and put all separate html news articles to array
$.getJSON('./news.json', function(articles) {

    // Parse each xml news article to html and save them
    articles.forEach(function (article, index) {
        var $currentArticle = parseArticleItemToHtml(article, 'news');
        htmlNewsArticles.push($currentArticle);
    });
    showNewsArticles();
    applicationSpillingTextTruncating();
});

// Show five next invisible news articles
function showNewsArticles() {
    for (var i = 0; i < 5; i++) {
        $showMoreButton.before(htmlNewsArticles[nextShowingNewsItemIndex]);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        nextShowingNewsItemIndex++;
    }
}

// Show next five invisible articles
$showMoreButton.click(function () {
    showNewsArticles();
    switchTimeStyles('.main-content-article', 'main-content-article_style_night');
    applicationSpillingTextTruncating();
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

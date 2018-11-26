var activeViewClass = '.news',
    activeNavItemSelector = '[data-target="news"]',
    $activeView = $(activeViewClass),
    $activeNavItem = $(activeNavItemSelector),
    $showMoreButton = $('.news__more-articles-button'),
    nextArticlesUrl = '';

function newsController(newsId) {
    emphasizeOneOfTheSetElement($activeNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($activeView, $mainContentItems, mainContentActiveItemClass);

    if (newsId) {
        getDetailedNewsService(newsId)
        .done(function(data) {
            var $article = renderNewsArticle(data, true);
            $activeView.html($article);
            switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        })
        .fail(function() {
            $activeView.html(renderNotFoundError());
        });
        return;
    }

    getListNewsService()
    .done(function(data) {
        var articlesList = renderNewsList(data.results);
        $activeView.html(articlesList);
        $activeView.append($showMoreButton);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        nextArticlesUrl = data.next;
    })
    .fail(function() {
        $activeView.html(renderNotFoundError());
    });
}

$(document).on('click', '.news__more-articles-button', function () {
    getListNewsService(nextArticlesUrl)
    .done(function(data) {
        var articlesList = renderNewsList(data.results);
        $showMoreButton.before(articlesList);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        nextArticlesUrl = data.next;
        if (!nextArticlesUrl) {
            $showMoreButton.remove();
        }
    })
    .fail(function() {
        $activeView.html(renderNotFoundError());
    });
});

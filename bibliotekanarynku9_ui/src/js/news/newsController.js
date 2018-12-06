var newsActiveViewClass = '.news',
    newsActiveNavItemSelector = '[data-target="news"]',
    $newsActiveView = $(newsActiveViewClass),
    $newsActiveNavItem = $(newsActiveNavItemSelector),
    $newsShowMoreButton = $('.more-articles-button__news'),
    newsNextArticlesUrl = '';

function newsController(newsId) {
    emphasizeOneOfTheSetElement($newsActiveNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($newsActiveView, $mainContentItems, mainContentActiveItemClass);

    if (newsId) {
        getDetailedNewsService(newsId)
        .done(function(data) {
            var $article = renderNewsArticle(data, true);
            $newsActiveView.html($article);
            switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        })
        .fail(function() {
            $newsActiveView.html(renderNewsNotFoundError());
        });
        return;
    }

    getListNewsService()
    .done(function(data) {
        var articlesList = renderNewsList(data.results);
        $newsActiveView.html(articlesList);
        $newsShowMoreButton.removeClass('more-articles-button_style_invisible');
        if (data.count > 5) {
            $newsActiveView.append($newsShowMoreButton);
        }
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        newsNextArticlesUrl = data.next;
    })
    .fail(function() {
        $newsActiveView.html(renderNewsNotFoundError());
    });
}

$(document).on('click', '.more-articles-button__news', function () {
    getListNewsService(newsNextArticlesUrl)
    .done(function(data) {
        var articlesList = renderNewsList(data.results);
        $newsShowMoreButton.before(articlesList);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        newsNextArticlesUrl = data.next;
        if (!newsNextArticlesUrl) {
            $newsShowMoreButton.remove();
        }
    })
    .fail(function() {
        $newsActiveView.html(renderNewsNotFoundError());
    });
});

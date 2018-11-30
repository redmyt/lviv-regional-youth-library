var bookActiveViewClass = '.book',
    bookActiveNavItemSelector = '[data-target="book"]',
    $bookActiveView = $(bookActiveViewClass),
    $bookActiveNavItem = $(bookActiveNavItemSelector),
    $bookShowMoreButton = $('.more-articles-button__book'),
    bookNextArticlesUrl = '';

function bookController(bookId) {
    emphasizeOneOfTheSetElement($bookActiveNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($bookActiveView, $mainContentItems, mainContentActiveItemClass);

    if (bookId) {
        getDetailedBookService(bookId)
        .done(function(data) {
            var $article = renderBookArticle(data, true);
            $bookActiveView.html($article);
            switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        })
        .fail(function() {
            $bookActiveView.html(renderBookNotFoundError());
        });
        return;
    }

    getListBookService()
    .done(function(data) {
        var articlesList = renderBookList(data.results);
        $bookActiveView.html(articlesList);
        $bookShowMoreButton.removeClass('more-articles-button_style_invisible');
        $bookActiveView.append($bookShowMoreButton);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        bookNextArticlesUrl = data.next;
    })
    .fail(function() {
        $bookActiveView.html(renderBookNotFoundError());
    });
}

$(document).on('click', '.more-articles-button__book', function () {
    getListBookService(bookNextArticlesUrl)
    .done(function(data) {
        var articlesList = renderBookList(data.results);
        $bookShowMoreButton.before(articlesList);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        bookNextArticlesUrl = data.next;
        if (!bookNextArticlesUrl) {
            $bookShowMoreButton.remove();
        }
    })
    .fail(function() {
        $bookActiveView.html(renderBookNotFoundError());
    });
});

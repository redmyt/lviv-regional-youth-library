var pressActiveViewClass = '.press',
    pressActiveNavItemSelector = '[data-target="press"]',
    $pressActiveView = $(pressActiveViewClass),
    $pressActiveNavItem = $(pressActiveNavItemSelector),
    $pressShowMoreButton = $('.more-articles-button__press'),
    pressNextArticlesUrl = '';

function pressController(pressId) {
    emphasizeOneOfTheSetElement($pressActiveNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($pressActiveView, $mainContentItems, mainContentActiveItemClass);

    if (pressId) {
        getDetailedPressService(pressId)
        .done(function(data) {
            var $article = renderPressArticle(data, true);
            $pressActiveView.html($article);
            switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        })
        .fail(function() {
            $pressActiveView.html(renderPressNotFoundError());
        });
        return;
    }

    getListPressService()
    .done(function(data) {
        var articlesList = renderPressList(data.results);
        $pressActiveView.html(articlesList);
        $pressShowMoreButton.removeClass('more-articles-button_style_invisible');
        $pressActiveView.append($pressShowMoreButton);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        pressNextArticlesUrl = data.next;
    })
    .fail(function() {
        $pressActiveView.html(renderPressNotFoundError());
    });
}

$(document).on('click', '.more-articles-button__press', function () {
    getListPressService(pressNextArticlesUrl)
    .done(function(data) {
        var articlesList = renderPressList(data.results);
        $pressShowMoreButton.before(articlesList);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        pressNextArticlesUrl = data.next;
        if (!pressNextArticlesUrl) {
            $pressShowMoreButton.remove();
        }
    })
    .fail(function() {
        $pressActiveView.html(renderPressNotFoundError());
    });
});

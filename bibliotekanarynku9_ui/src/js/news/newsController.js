var activeViewClass = '.news',
    activeNavItemSelector = '[data-target="news"]',
    $activeView = $(activeViewClass),
    $activeNavItem = $(activeNavItemSelector),
    $showMoreButton = $('.news__more-articles-button');

function newsController(newsId) {
    emphasizeOneOfTheSetElement($activeNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($activeView, $mainContentItems, mainContentActiveItemClass);

    if (newsId) {
        getDetailedNewsService(newsId)
        .done(function(data) {
            console.log(data);
        })
        .fail(function() {
            $activeView.html(renderNewsDetailError());
        });

        return;
    }

    getListNewsService()
    .done(function(data) {
        console.log(data);
    })
    .fail(function() {
        console.log('err');
    });

}

var announcementActiveViewClass = '.announcement',
    announcementActiveNavItemSelector = '[data-target="announcement"]',
    $announcementActiveView = $(announcementActiveViewClass),
    $announcementActiveNavItem = $(announcementActiveNavItemSelector),
    $announcementShowMoreButton = $('.more-articles-button__announcement'),
    announcementNextArticlesUrl = '';

function announcementController(announcementId) {
    emphasizeOneOfTheSetElement($announcementActiveNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($announcementActiveView, $mainContentItems, mainContentActiveItemClass);

    if (announcementId) {
        getDetailedAnnouncementService(announcementId)
        .done(function(data) {
            var $article = renderAnnouncementArticle(data, true);
            $announcementActiveView.html($article);
            switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        })
        .fail(function() {
            $announcementActiveView.html(renderAnnouncementNotFoundError());
        });
        return;
    }

    getListAnnouncementService()
    .done(function(data) {
        var articlesList = renderAnnouncementList(data.results);
        $announcementActiveView.html(articlesList);
        $announcementShowMoreButton.removeClass('more-articles-button_style_invisible');
        if (data.count > 5) {
            $announcementActiveView.append($announcementShowMoreButton);
        }
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        announcementNextArticlesUrl = data.next;
    })
    .fail(function() {
        $announcementActiveView.html(renderAnnouncementNotFoundError());
    });
}

$(document).on('click', '.more-articles-button__announcement', function () {
    getListAnnouncementService(announcementNextArticlesUrl)
    .done(function(data) {
        var articlesList = renderAnnouncementList(data.results);
        $announcementShowMoreButton.before(articlesList);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        announcementNextArticlesUrl = data.next;
        if (!announcementNextArticlesUrl) {
            $announcementShowMoreButton.remove();
        }
    })
    .fail(function() {
        $announcementActiveView.html(renderAnnouncementNotFoundError());
    });
});

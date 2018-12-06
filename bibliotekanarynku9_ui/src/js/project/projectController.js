var projectActiveViewClass = '.project',
    projectActiveNavItemSelector = '[data-target="project"]',
    $projectActiveView = $(projectActiveViewClass),
    $projectActiveNavItem = $(projectActiveNavItemSelector),
    $projectShowMoreButton = $('.more-articles-button__project'),
    projectNextArticlesUrl = '';

function projectController(projectId) {
    emphasizeOneOfTheSetElement($projectActiveNavItem, $navItems, navigationActiveItemClass);
    emphasizeOneOfTheSetElement($projectActiveView, $mainContentItems, mainContentActiveItemClass);

    if (projectId) {
        getDetailedProjectService(projectId)
        .done(function(data) {
            var $article = renderProjectArticle(data, true);
            $projectActiveView.html($article);
            switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        })
        .fail(function() {
            $projectActiveView.html(renderProjectNotFoundError());
        });
        return;
    }

    getListProjectService()
    .done(function(data) {
        var articlesList = renderProjectList(data.results);
        $projectActiveView.html(articlesList);
        $projectShowMoreButton.removeClass('more-articles-button_style_invisible');
        if (data.count > 5) {
            $projectActiveView.append($projectShowMoreButton);
        }
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        projectNextArticlesUrl = data.next;
    })
    .fail(function() {
        $projectActiveView.html(renderProjectNotFoundError());
    });
}

$(document).on('click', '.more-articles-button__project', function () {
    getListProjectService(projectNextArticlesUrl)
    .done(function(data) {
        var articlesList = renderProjectList(data.results);
        $projectShowMoreButton.before(articlesList);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        truncateSpillingText();
        projectNextArticlesUrl = data.next;
        if (!projectNextArticlesUrl) {
            $projectShowMoreButton.remove();
        }
    })
    .fail(function() {
        $projectActiveView.html(renderProjectNotFoundError());
    });
});

var truncateLineCoefficient = 200;

// Truncate and show the first paragraph's text of each article.
function truncateSpillingText() {
    var $truncatedParagraphs = $('.main-content-article__body').find('p:first-of-type');
    $truncatedParagraphs.addClass('main-content-article__paragraph_style_truncated');
    $truncatedParagraphs.trunk8({
        lines: getTruncatedLinesAmount(),
        fill: '<span class="truncated-dots">...</span>'
    });
}

// Determine truncated lines amount which depend on user screen size.
function getTruncatedLinesAmount() {
    return Math.round($(window).width() / truncateLineCoefficient);
}

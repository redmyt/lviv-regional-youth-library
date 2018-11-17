// Allow user read full article and show it if it wants
$(document).on('click', '.read-more', function () {
    // Save needed article paragraphs
    var $currentTruncatedParagraph = $(this).parent(),
        $allArticleParagraphs = $(this).parents('.main-content-article__body').children('p'),
        $lastArticleParagraph = $(this).parents('.main-content-article__body').children('p:last-of-type');

    // Make all article paragraphs visible and create read-less button
    $allArticleParagraphs.addClass('main-content-article__paragraph_style_visible');
    var $readLessButton = $('<a class="read-less truncated-button page-link">&nbsp;&laquo;&nbsp;</a>');

    // Show the truncated paragraph and add read-less button to the last one
    $currentTruncatedParagraph.trunk8('revert');
    $lastArticleParagraph.append($readLessButton);
    return false;
});

// Add click event handler for the read-less button
$(document).on('click', '.read-less', function () {
    var currentArticlePosition = parseInt($(this).parents('.main-content-article').offset().top),
        $allArticleParagraphs = $(this).parents('.main-content-article__body').children('p'),
        $firstArticleParagraph = $(this).parents('.main-content-article__body').children('p:first-of-type');
    $allArticleParagraphs.removeClass('main-content-article__paragraph_style_visible');
    $firstArticleParagraph.trunk8({
        lines: getTruncatedLinesAmount()
    });
    var navigationHeight = getHeaderItemsParameters().navigationHeight;
    $(window).scrollTop(currentArticlePosition - navigationHeight);
    $(this).remove();
    return false;
});

// Truncate text which spilling over the paragraph at mobile screen
function truncateSpillingText() {

    // Show the first paragraph of each visible article and trankate one
    var $truncatedParagraphs = $('.main-content-article__body').find('p:first-of-type');
    $truncatedParagraphs.addClass('main-content-article__paragraph_style_trunkated');
    $truncatedParagraphs.trunk8({
        lines: getTruncatedLinesAmount(),
        fill: '<a class="read-more truncated-button page-link">&nbsp;&raquo;&nbsp;</a>'
    });
}

// Apply the spilling text truncate when user screen width more than 880px
function applicationSpillingTextTruncating() {
    if (parseInt( $(window).width() ) < 880) {
        truncateSpillingText();
    } else {
        var $truncatedParagraphs = $('.main-content-article__body').find('p:first-of-type');
        if ($truncatedParagraphs.hasClass('main-content-article__paragraph_style_trunkated')) {
            $truncatedParagraphs.trunk8('revert');
            $('.read-more, read-less').remove();
        }
    }
}

// Determine truncated lines amount which depend on user screen size
function getTruncatedLinesAmount() {
    return $(window).width() > 556 ? 7 : 4;
}

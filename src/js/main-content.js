var $showMoreButton = $('.news-board__more-articles-button');

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

// Show next five invisible articles
$showMoreButton.click(function () {
    showNewsArticles();
    switchTimeStyles('.main-content-article', 'main-content-article_style_night');
    applicationSpillingTextTruncating();
});

// Array for saving all html book articles after its parsing
// var bookshelfItems = [];

// Get AJAX request for the "books" document and put all separate html book items to array 
// $.ajax({
//     type: 'GET',
//     url: './books.xml',
//     dataType: 'xml',
//     success: function (data) {
//         // Parse each xml book item to html and save them
//         $(data).find('book').each(function (index, xmlBook) {
//             var $currentBook = parseXmlArticleItemToHtml(xmlBook, 'book');
//             bookshelfItems.push($currentBook);
//         });

//         bookshelfItems.forEach(function (htmlBookItem) {
//             $('.bookshelf').append(htmlBookItem);
//         });

//         switchTimeStyles('.main-content-article', 'main-content-article_style_night');

//         if (parseInt($(window).width()) < 880) {
//             truncateSpillingText();
//         }
//     }
// });

// Show five next invisible news articles 
function showNewsArticles() {
    for (var i = 0; i < 5; i++) {
        $showMoreButton.before(htmlNewsArticles[nextShowingNewsItemIndex]);
        switchTimeStyles('.main-content-article', 'main-content-article_style_night');
        nextShowingNewsItemIndex++;
    }
}

// Parse certain xml news article to a html news article
function parseArticleItemToHtml(article, articleType) {

    // Create elements for the html markup
    var $article = createPageElement('<article>', 'main-content-article main-content-article_style_default main-content-article_style_day rounded'),
        $articleHeading = createPageElement('<h3>', 'main-content-article__heading page-header'),
        $articleBody = createPageElement('<section>', 'main-content-article__body clearfix'),
        $articlePictureWrapper = createPageElement('<figure>', 'main-content-article__picture-wrapper picture-wrapper'),
        $articlePicture = createPageElement('<img>', 'page-picture page-picture__style_default rounded');

    // Array for one or more articles paragraphs
    var articleParagraphs = [];

    console.log(article);
    // Create needed amount of articles paragraphs
    article.paragraphs.forEach(function (currentParagraph, index) {
        var $currentParagraph = createPageElement('<p>', 'main-content-article__paragraph main-content-article__paragraph_style_default');
        $currentParagraph.text(currentParagraph);
        articleParagraphs.push($currentParagraph);
    });

    // Get needed value for certain xml tags and set element's attachment
    $articleHeading.text(article.name);
    $articlePicture.attr( 'src', article.image);
    $articlePictureWrapper.append($articlePicture);
    $articleBody.append($articlePictureWrapper, articleParagraphs);

    $article.append($articleHeading);
    $article.append($articleBody);

    if (articleType === 'news') {
        var $articleLink = createPageElement('<a>', 'main-content-article__link page-link');
        $articleLink.text('Дізнатись більше...');
        $articleLink.attr('href', article.link);
        $article.append($articleLink);
    }

    return $article;
}

// Create needed html element with certain classes
function createPageElement(elementTag, elementClasses) {
    var $newPageElement = $(elementTag);
    $newPageElement.addClass(elementClasses);
    return $newPageElement;
}

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

var $firstWindowOnAmericaImage = $('.window-on-america__first-animate-picture'),
    $secondWindowOnAmericaImage = $('.window-on-america__second-animate-picture');

// Apply the woa pictures animation when user go to woa section
function switchOnWoaAnimation(animateImages, animationDuration) {
    var windowOnAmericaAnimationIterator = setWindowOnAmericaAnimationIterator(animateImages);

    return setInterval(function () {
        windowOnAmericaImageAnimation(animateImages);
    }, animationDuration);
    
    // Implement the pictures animation
    function windowOnAmericaImageAnimation(animateImages) {
        var currentAnimatePicture = animateImages[windowOnAmericaAnimationIterator];
        windowOnAmericaAnimationIterator = (windowOnAmericaAnimationIterator === animateImages.length - 1) ? 0 : windowOnAmericaAnimationIterator + 1;
        var nextAnimatePicture = animateImages[windowOnAmericaAnimationIterator];
        $(currentAnimatePicture).removeClass('window-on-america__animate-picture_visible', {
            duration: 3000,
            complete: function() {
                $(nextAnimatePicture).addClass('window-on-america__animate-picture_visible', 3000);
            }
        });
    }

    // Set the actual animation iterator for woa images animation
    function setWindowOnAmericaAnimationIterator(animateImages) {

        var windowOnAmericaAnimationIterator;

        for (var i = 0; i < animateImages.length; i++) {
            if ($(animateImages[i]).hasClass('window-on-america__animate-picture_visible')) {
                windowOnAmericaAnimationIterator = i;
                break;
            }
        }

        return windowOnAmericaAnimationIterator;
    }
}

// Stop the certain woa animation
function switchOfWoaAnimation(animation) {
    if (animation) {
        clearInterval(animation);
    }
}

// Determine truncated lines amount which depend on user screen size
function getTruncatedLinesAmount() {
    return $(window).width() > 556 ? 7 : 4;
}
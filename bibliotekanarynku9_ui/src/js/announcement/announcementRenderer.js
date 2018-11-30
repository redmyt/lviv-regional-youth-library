function renderAnnouncementNotFoundError() {
    var elem = createPageElement('<div>', 'main-content__not-found-message');
    return elem.text('На жаль вказаного Вами анонсу не існує. Спробуйте обрати інший. Дякуюємо за розуміння =)');
}

function renderAnnouncementList(announcementList) {
    var htmlAnnouncementList = [];
    for (var i = 0; i < announcementList.length; i++) {
        var announcement = announcementList[i];
        htmlAnnouncementList.push(renderAnnouncementArticle(announcement));
    }
    return htmlAnnouncementList;
}

function renderAnnouncementArticle(announcementArticle, isDetailed) {
    var translation = announcementArticle.translations[0];
    if (translation) {
        var paragraphs = splitTextToParagraphs(translation.description),
            links = translation.links,
            $article = createPageElement('<article>',
                'main-content-article main-content-article_style_default main-content-article_style_day rounded'
            ),
            $articleHeading = createPageElement('<h3>',
                'main-content-article__heading main-content-article__heading_style_default_secondary page-header'
            ),
            $articleDate = createPageElement('<h4>',
                'main-content-article__date-heading main-content-article__date-heading_style_default page-header'
            ),
            $articleBody = createPageElement('<section>', 'main-content-article__body clearfix'),
            $articlePictureWrapper = createPageElement('<figure>',
                'main-content-article__picture-wrapper picture-wrapper'
            ),
            $articlePicture = createPageElement('<img>', 'page-picture page-picture__style_default rounded'),
            $articleOrganizer = null;

        var htmlParagraphs = [];
        paragraphs.forEach(function (paragraph) {
            var $paragraph = createPageElement('<p>',
                'main-content-article__paragraph'
            );
            if (isDetailed) {
                $paragraph.addClass('main-content-article__paragraph_style_visible');
            }
            $paragraph.text(paragraph);
            htmlParagraphs.push($paragraph);
        });

        if (isDetailed && translation.organizer) {
            $articleOrganizer = createPageElement('<h4>', 'page-header_style_left');
            $articleOrganizer.text('Організатор: ' + translation.organizer);
        }

        var htmlLinks = [];
        links.forEach(function (link) {
            var $link = createPageElement('<a>',
                'main-content-article__link main-content-article__link_style_default page-link'
            );
            $link.text(link.label);
            $link.attr('href', link.href);
            $link.attr('target', '_blank');
            htmlLinks.push($link);
        });

        $articleHeading.text(translation.title);
        $articleDate.text(dateTimeParser(getDateData(announcementArticle.start_at)));
        $articleHeading.click(function() {
            window.location.hash = 'announcement/' + announcementArticle.id;
        });
        $articlePicture.attr('src', announcementArticle.avatar);
        $articlePictureWrapper.append($articlePicture);
        $articleBody.append($articlePictureWrapper, htmlParagraphs);
        $article.append($articleHeading);
        $article.append($articleDate);
        $article.append($articleBody);
        $article.append($articleOrganizer);
        $article.append(htmlLinks);
        return $article;
    }
}

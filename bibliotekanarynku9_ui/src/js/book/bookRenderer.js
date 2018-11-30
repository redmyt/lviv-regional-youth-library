function renderBookNotFoundError() {
    var elem = createPageElement('<div>', 'main-content__not-found-message');
    return elem.text('На жаль вказаної Вами книги не існує. Спробуйте обрати іншу. Дякуюємо за розуміння =)');
}

function renderBookList(bookList) {
    var htmlBookList = [];
    for (var i = 0; i < bookList.length; i++) {
        var bookPost = bookList[i];
        htmlBookList.push(renderBookArticle(bookPost));
    }
    return htmlBookList;
}

function renderBookArticle(bookArticle, isDetailed) {
    var translation = bookArticle.translations[0];
    if (translation) {
        var paragraphs = splitTextToParagraphs(translation.description),
            $article = createPageElement('<article>',
                'main-content-article main-content-article_style_default main-content-article_style_day rounded'
            ),
            $articleHeading = createPageElement('<h3>',
                'main-content-article__heading main-content-article__heading_style_default page-header'
            ),
            $articleBody = createPageElement('<section>', 'main-content-article__body clearfix'),
            $articlePictureWrapper = createPageElement('<figure>',
                'main-content-article__picture-wrapper picture-wrapper'
            ),
            $articlePicture = createPageElement('<img>', 'page-picture page-picture__style_default rounded'),
            $articleAuthor = null,
            $articlePublishedAt = null;

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

        if (isDetailed) {
            $articleAuthor = createPageElement('<h4>', 'page-header_style_left');
            $articleAuthor.text('Авторство: ' + translation.author);
        }

        if (isDetailed && bookArticle.published_at) {
            $articlePublishedAt = createPageElement('<h4>', 'page-header_style_left');
            $articlePublishedAt.text('Видана: ' + dateParser(getDateData(bookArticle.published_at)));
        }

        $articleHeading.text(translation.title);
        $articleHeading.click(function() {
            window.location.hash = 'book/' + bookArticle.id;
        });
        $articlePicture.attr('src', bookArticle.avatar);
        $articlePictureWrapper.append($articlePicture);
        $articleBody.append($articlePictureWrapper, htmlParagraphs);
        $article.append($articleHeading);
        $article.append($articleBody);
        $article.append($articleAuthor);
        $article.append($articlePublishedAt);
        return $article;
    }
}

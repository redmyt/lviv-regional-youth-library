import axios from 'axios';
import {apiPath, getCSRFToken, processUserImageData, LANGUAGE_CODES} from '../../helpers';

const bookPath = 'book/';

export const getBookListService = (inputUrl) => {
    const url = inputUrl || apiPath + bookPath;
    return axios.get(url);
};

export const getBookById = (bookId) => {
    const url = `${apiPath}${bookPath}${bookId}/`;
    return axios.get(url);
};

export const postBookService = (avatar, publishedAt) => {
    const url = `${apiPath}${bookPath}`;
    let data = {avatar: processUserImageData(avatar)};
    if (publishedAt) {data.published_at = publishedAt;}
    return axios.post(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const postBookTranslationService = (bookId, title, description, author, language) => {
    const url = `${apiPath}${bookPath}${bookId}/translation/`;
    const data = {
        title: title,
        description: description,
        language: LANGUAGE_CODES[language]
    };
    if (author) data.author = author;
    return axios.post(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putBookService = (bookId, avatarData, publishedAt) => {
    const url = `${apiPath}${bookPath}${bookId}/`,
        data = {},
        avatar = processUserImageData(avatarData);
    if (avatar) {data.avatar = avatar;}
    if (publishedAt) {data.published_at = publishedAt;}
    return axios.put(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putBookTranslationService = (bookId, translationId, title, description, author) => {
    const url = `${apiPath}${bookPath}${bookId}/translation/${translationId}/`;
    return axios.put(url, {
        title: title,
        description: description,
        author: author
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteBookService = (bookId) => {
    const url = `${apiPath}${bookPath}${bookId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteBookTranslationService = (bookId, translationId) => {
    const url = `${apiPath}${bookPath}${bookId}/translation/${translationId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

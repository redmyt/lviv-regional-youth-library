import axios from 'axios';
import {apiPath, getCSRFToken, processUserImageData, LANGUAGE_CODES} from '../../helpers';

const newsPath = 'news_post/';

export const getNewsListService = (inputUrl) => {
    const url = inputUrl || apiPath + newsPath;
    return axios.get(url);
};

export const getNewsById = (newsId) => {
    const url = `${apiPath}${newsPath}${newsId}/`;
    return axios.get(url);
};

export const postNewsService = avatar => {
    const url = `${apiPath}${newsPath}`;
    let data = {avatar: processUserImageData(avatar)};
    return axios.post(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const postNewsTranslationService = (newsId, title, description, language) => {
    const url = `${apiPath}${newsPath}${newsId}/translation/`;
    return axios.post(url, {
        title: title,
        description: description,
        language: LANGUAGE_CODES[language]
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const postNewsTranslationLinkService = (newsId, translationId, label, href) => {
    const url = `${apiPath}${newsPath}${newsId}/translation/${translationId}/link/`;
    return axios.post(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putNewsService = (newsId, avatar) => {
    const url = `${apiPath}${newsPath}${newsId}/`;
    let data = {avatar: processUserImageData(avatar)};
    return axios.put(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putNewsTranslationService = (newsId, translationId, title, description) => {
    const url = `${apiPath}${newsPath}${newsId}/translation/${translationId}/`;
    return axios.put(url, {
        title: title,
        description: description
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putNewsTranslationLinkService = (newsId, translationId, linkId, label, href) => {
    const url = `${apiPath}${newsPath}${newsId}/translation/${translationId}/link/${linkId}/`;
    return axios.put(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteNewsService = newsId => {
    const url = `${apiPath}${newsPath}${newsId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteNewsTranslationService = (newsId, translationId) => {
    const url = `${apiPath}${newsPath}${newsId}/translation/${translationId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteNewsTranslationLinkService = (newsId, translationId, linkId) => {
    const url = `${apiPath}${newsPath}${newsId}/translation/${translationId}/link/${linkId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

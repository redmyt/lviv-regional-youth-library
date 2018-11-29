import axios from 'axios';
import {apiPath, getCSRFToken, removeBase64Prefix, LANGUAGE_CODES} from '../../helpers';

const pressPostPath = 'press_post/';

export const getPressPostListService = (inputUrl) => {
    const url = inputUrl || apiPath + pressPostPath;
    return axios.get(url);
};

export const getPressPostById = (pressPostId) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/`;
    return axios.get(url);
};

export const postPressPostService = avatar => {
    const url = `${apiPath}${pressPostPath}`;
    let data = {avatar: removeBase64Prefix(avatar)};
    return axios.post(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const postPressPostTranslationService = (pressPostId, title, description, language) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/translation/`;
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

export const postPressPostTranslationLinkService = (pressPostId, translationId, label, href) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/translation/${translationId}/link/`;
    return axios.post(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putPressPostService = (pressPostId, avatar) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/`;
    let data = {avatar: removeBase64Prefix(avatar)};
    return axios.put(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putPressPostTranslationService = (pressPostId, translationId, title, description) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/translation/${translationId}/`;
    return axios.put(url, {
        title: title,
        description: description
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putPressPostTranslationLinkService = (pressPostId, translationId, linkId, label, href) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/translation/${translationId}/link/${linkId}/`;
    return axios.put(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deletePressPostService = pressPostId => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deletePressPostTranslationService = (pressPostId, translationId) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/translation/${translationId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deletePressPostTranslationLinkService = (pressPostId, translationId, linkId) => {
    const url = `${apiPath}${pressPostPath}${pressPostId}/translation/${translationId}/link/${linkId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

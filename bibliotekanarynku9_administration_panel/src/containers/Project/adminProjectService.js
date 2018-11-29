import axios from 'axios';
import {apiPath, getCSRFToken, removeBase64Prefix, LANGUAGE_CODES} from '../../helpers';

const projectPath = 'project/';

export const getProjectListService = (inputUrl) => {
    const url = inputUrl || apiPath + projectPath;
    return axios.get(url);
};

export const getProjectById = (projectId) => {
    const url = `${apiPath}${projectPath}${projectId}/`;
    return axios.get(url);
};

export const postProjectService = avatar => {
    const url = `${apiPath}${projectPath}`;
    let data = {avatar: removeBase64Prefix(avatar)};
    return axios.post(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const postProjectTranslationService = (projectId, title, description, language) => {
    const url = `${apiPath}${projectPath}${projectId}/translation/`;
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

export const postProjectTranslationLinkService = (projectId, translationId, label, href) => {
    const url = `${apiPath}${projectPath}${projectId}/translation/${translationId}/link/`;
    return axios.post(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putProjectService = (projectId, avatar) => {
    const url = `${apiPath}${projectPath}${projectId}/`;
    let data = {avatar: removeBase64Prefix(avatar)};
    return axios.put(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putProjectTranslationService = (projectId, translationId, title, description) => {
    const url = `${apiPath}${projectPath}${projectId}/translation/${translationId}/`;
    return axios.put(url, {
        title: title,
        description: description
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putProjectTranslationLinkService = (projectId, translationId, linkId, label, href) => {
    const url = `${apiPath}${projectPath}${projectId}/translation/${translationId}/link/${linkId}/`;
    return axios.put(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteProjectService = projectId => {
    const url = `${apiPath}${projectPath}${projectId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteProjectTranslationService = (projectId, translationId) => {
    const url = `${apiPath}${projectPath}${projectId}/translation/${translationId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteProjectTranslationLinkService = (projectId, translationId, linkId) => {
    const url = `${apiPath}${projectPath}${projectId}/translation/${translationId}/link/${linkId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

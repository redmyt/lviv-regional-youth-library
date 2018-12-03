import axios from 'axios';
import {apiPath, getCSRFToken, removeBase64Prefix, LANGUAGE_CODES} from '../../helpers';

const announcementPath = 'announcement/';

export const getAnnouncementsListService = (inputUrl) => {
    const url = inputUrl || apiPath + announcementPath;
    return axios.get(url);
};

export const getAnnouncementById = (announcementId) => {
    const url = `${apiPath}${announcementPath}${announcementId}/`;
    return axios.get(url);
};

export const postAnnouncementService = (avatar, startAt) => {
    const url = `${apiPath}${announcementPath}`;
    let data = {avatar: removeBase64Prefix(avatar)};
    if (startAt) {data.start_at = startAt;}
    return axios.post(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const postAnnouncementTranslationService = (announcementId, title, description, organizer, language) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/`;
    const data = {
        title: title,
        description: description,
        language: LANGUAGE_CODES[language]
    };
    if (organizer) data.organizer = organizer;
    return axios.post(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const postAnnouncementTranslationLinkService = (announcementId, translationId, label, href) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/${translationId}/link/`;
    return axios.post(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putAnnouncementService = (announcementId, avatar, startAt) => {
    const url = `${apiPath}${announcementPath}${announcementId}/`;
    let data = {avatar: removeBase64Prefix(avatar)};
    if (startAt) {data.start_at = startAt;}
    return axios.put(url, data, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putAnnouncementTranslationService = (announcementId, translationId, title, description, organizer) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/${translationId}/`;
    return axios.put(url, {
        title: title,
        description: description,
        organizer: organizer
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putAnnouncementTranslationLinkService = (announcementId, translationId, linkId, label, href) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/${translationId}/link/${linkId}/`;
    return axios.put(url, {
        label: label,
        href: href
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteAnnouncementService = (announcementId) => {
    const url = `${apiPath}${announcementPath}${announcementId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteAnnouncementTranslationService = (announcementId, translationId) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/${translationId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const deleteAnnouncementTranslationLinkService = (announcementId, translationId, linkId) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/${translationId}/link/${linkId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

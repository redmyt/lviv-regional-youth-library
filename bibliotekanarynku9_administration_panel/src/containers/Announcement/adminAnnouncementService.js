import axios from 'axios';
import {apiPath, getCSRFToken, removeBase64Prefix} from '../../helpers';

const announcementPath = 'announcement/';

export const getAnnouncementsListService = (inputUrl) => {
    const url = inputUrl || apiPath + announcementPath;
    return axios.get(url);
};

export const getAnnouncementById = (announcementId) => {
    const url = `${apiPath}${announcementPath}${announcementId}/`;
    return axios.get(url);
};

export const postAnnouncementService = avatar => {
    const url = `${apiPath}${announcementPath}`;
    return axios.post(url, {
        avatar: removeBase64Prefix(avatar)
    }, {
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
    return axios.put(url, {
        avatar: removeBase64Prefix(avatar),
        start_at: startAt
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

export const putAnnouncementTranslationService = (announcementId, translationId, title, description) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/${translationId}/`;
    return axios.put(url, {
        title: title,
        description: description
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

export const deleteAnnouncementTranslationLinkService = (announcementId, translationId, linkId) => {
    const url = `${apiPath}${announcementPath}${announcementId}/translation/${translationId}/link/${linkId}/`;
    return axios.delete(url, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        }
    });
};

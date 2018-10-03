import axios from 'axios';
import {apiPath, getCSRFToken, removeBase64Prefix} from '../../../helpers';

const announcementPath = 'announcement/';

export const getAnnouncementsListService = (language, inputUrl) => {
    const url = inputUrl || apiPath + announcementPath;
    return axios.get(url, {
        headers: {
            'Accept-Language': language
        }
    });
};

export const getAnnouncementById = (announcementId, language) => {
    const url = apiPath + announcementPath + announcementId;
    return axios.get(url, {
        headers: {
            'Accept-Language': language
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

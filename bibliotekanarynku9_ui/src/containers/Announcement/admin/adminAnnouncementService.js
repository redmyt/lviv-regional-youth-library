import axios from 'axios';
import {apiPath, getCSRFToken} from '../../../helpers';

const announcementPath = 'announcement/';

export const getAnnouncementService = (language, inputUrl) => {
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

export const putAnnouncementService = (announcementId, avatar, startAt) => {
    const url = `${apiPath}${announcementPath}${announcementId}/`;
    return axios.put(url, {
        avatar: avatar,
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

import axios from 'axios';
import {apiPath} from '../../../helpers';

const announcementPath = 'announcement/';

export const getAnnouncementService = (language, inputUrl) => {
    let url = inputUrl || apiPath + announcementPath;
    return axios.get(url, {
        headers: {
            'Accept-Language': language
        }
    });
};

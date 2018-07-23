import axios from 'axios';
import {apiPath} from '../../helpers';

export const getManageItems = () => {
    const manageAppsPath = 'admin/manage_apps/',
        url = apiPath + manageAppsPath;
    return axios.get(url);
};

export const getLogout = () => {
    const logoutPath = 'auth/logout',
        url = apiPath + logoutPath;
    return axios.get(url);
};

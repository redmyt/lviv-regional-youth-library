import axios from 'axios';
import {apiPath} from '../../helpers';

export const getManageApps = () => {
    const manageAppsPath = 'admin/manage_apps/',
        url = apiPath + manageAppsPath;
    return axios.get(url);
};

export const getLogout = () => {
    const logoutPath = 'auth/logout/',
        url = apiPath + logoutPath;
    return axios.get(url);
};

export const requestPermissions = () => {
    const permissionsPath = 'admin/permissions/',
        url = apiPath + permissionsPath;
    return axios.get(url);
};

export const requestToAdmin = () => {
    const permissionsPath = 'admin/request/',
        url = apiPath + permissionsPath;
    return axios.get(url);
};

import axios from 'axios';
import {apiPath} from '../../helpers';

export const getManageItems = () => {
    const manageAppsPath = 'admin/manage_apps/',
        url = apiPath + manageAppsPath;
    return axios.get(url);
};

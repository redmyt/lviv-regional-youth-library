import axios from 'axios';
import {apiPath} from '../../helpers';

const loginPath = 'auth/login/';

export const postLoginService = (email, password) => {
    const url = apiPath + loginPath;
    return axios.post(url, {
        email,
        password
    });
};

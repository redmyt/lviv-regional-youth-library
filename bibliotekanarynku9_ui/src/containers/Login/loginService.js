import axios from 'axios';
import {apiUrl} from '../../helpers';

const loginPath = 'auth/login/';

export const postLoginService = (email, password) => {
    const url = apiUrl + loginPath;
    console.log(email, password, url);
    return axios.post(url, {
        email,
        password
    });
};

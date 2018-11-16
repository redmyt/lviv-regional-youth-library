import axios from 'axios';
import {apiPath} from '../../helpers';

const registerPath = 'auth/register/';

export const postRegisterService = (firstName, lastName, email, password) => {
    const url = apiPath + registerPath;
    return axios.post(url, {
        'first_name': firstName,
        'last_name': lastName,
        'email': email,
        'password': password
    });
};

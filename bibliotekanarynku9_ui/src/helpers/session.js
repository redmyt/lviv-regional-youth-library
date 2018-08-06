export const apiPath = '/api/v1/';

export const isLogged = () => document.cookie.indexOf('user_id') !== -1;

export const getCSRFToken = () => document.cookie.slice(
    document.cookie.indexOf('csrftoken') + 'csrftoken'.length + 1
);
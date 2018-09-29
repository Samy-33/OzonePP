import { USER_LOGIN_URL, CHECK_TOKEN_URL, LOGOUT_URL } from './auth.const';

export const postLoginRequest = (headers, postData) => {
    return fetch(USER_LOGIN_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(postData)
    })
    .then(response => response.json());
};

export const validateTokenRequest = (headers) => {
    return fetch(CHECK_TOKEN_URL, {headers, method: 'POST'})
        .then(response => response.json());
};

export const postLogoutRequest = (headers) => {
    return fetch(LOGOUT_URL, {headers, method: 'POST'})
        .then(response => response.json());
}
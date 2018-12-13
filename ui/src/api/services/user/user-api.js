import { USER_DETAIL_URL } from './user-api.const';

export const getUserDetailRequest = (headers, username) => {
    let url = `${USER_DETAIL_URL}${username}/`;
    return fetch(url, {headers})
        .then(response => response.json());
};
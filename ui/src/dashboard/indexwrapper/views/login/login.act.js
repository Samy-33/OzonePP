import { AUTH_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILED, THROBBER_TOGGLE } from "../../state-service/auth/auth.const";
import $ from '../../state-service/auth/auth.srv';


export const requestLogin = (loginCredentials) => {
    return dispatch => {

        let username = loginCredentials.username;
        let password = loginCredentials.password;
        
        dispatch({type:THROBBER_TOGGLE });

        $.authService.logInUser(username, password)
            .then(response => {
                if(response.status === AUTH_SUCCESS) {
                    dispatch(loginSuccess(response.data));
                } else {
                    dispatch(loginFailed(response.errors))
                }
            })
            .catch(err => {
                console.log(`${__dirname}/auth.act.js :: requestLogin - ${err}`);
            });
    };
};

export const loginSuccess = (userData) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userData
    };
};

export const loginFailed = (errors) => {
    return {
        type: LOGIN_FAILED,
        payload: errors
    };
};
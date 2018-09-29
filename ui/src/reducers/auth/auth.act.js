import { 
    LOGIN_SUCCESS, LOGIN_FAILED, TOKEN_VALIDATION_SUCCESS,
    TOKEN_VALIDATION_FAILED, REQUEST_LOGOUT,
} from './auth.const';
import $ from './auth.srv';


export const requestLogin = (loginCredentials) => {
    return dispatch => {

        let username = loginCredentials.username;
        let password = loginCredentials.password;
        
        $.authService.logInUser(username, password)
            .then(response => {
                if(response.status === 'Success') {
                    dispatch(loginSuccess(response));
                } else {
                    dispatch(loginFailed(response.errors))
                }
            })
            .catch(err => {
                console.log(err);
            })
    };
};

export const loginSuccess = (userData) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userData
    };
}

export const loginFailed = (errors) => {
    return {
        type: LOGIN_FAILED,
        payload: errors
    };
}


export const validateToken = () => {
    return dispatch => {
        $.authService.validateAuthToken()
            .then(response => {
                console.log(response);
                if(response.isValid) {
                    dispatch(tokenValidationSuccess(response));
                } else {
                    dispatch(tokenValidationFailed(response));
                }
            })
            .catch(err => {
                console.log(`${__dirname}/auth.act.js :: validateToken - ${err}`);
            })
    };
};

export const tokenValidationSuccess = response => {
    return {
        type: TOKEN_VALIDATION_SUCCESS,
        payload: response
    };
};

export const tokenValidationFailed = response => {
    return {
        type: TOKEN_VALIDATION_FAILED,
        payload: response
    };
};

export const requestLogout = () => {
    return {
        type: REQUEST_LOGOUT,
    };
};
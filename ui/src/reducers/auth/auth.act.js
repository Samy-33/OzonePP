import { 
    LOGIN_SUCCESS, LOGIN_FAILED, TOKEN_VALIDATION_SUCCESS,
    TOKEN_VALIDATION_FAILED, REQUEST_LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAILED, AUTH_SUCCESS, AUTH_FAILED,
} from './auth.const';
import $ from './auth.srv';

export const requestLogin = (loginCredentials) => {
    return dispatch => {

        let username = loginCredentials.username;
        let password = loginCredentials.password;
        
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


export const validateToken = () => {
    return dispatch => {
        $.authService.validateAuthToken()
            .then(response => {
                if(response.isValid) {
                    dispatch(tokenValidationSuccess(response));
                } else {
                    dispatch(tokenValidationFailed(response));
                }
            })
            .catch(err => {
                console.log(`${__dirname}/auth.act.js :: validateToken - ${err}`);
            });
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
    return dispatch => {
        $.authService.logoutUser()
            .then(() => {
                dispatch(logoutUser());
            });
    };
};

export const logoutUser = () => {
    return { type: REQUEST_LOGOUT };
};

export const requestSignUp = userData => {
    return dispatch => {
        console.log(userData);
        $.authService.signUp(userData)
            .then(response => {
                if(response instanceof Error) {
                    // TODO: no not throw error dispatch some action to handle the error
                    throw response;
                }

                if(response.status === AUTH_FAILED) {
                    dispatch(signupFailed(response.errors));
                } else {
                    dispatch(signupSuccess(response.data));
                }

            });
    };
};

export const signupSuccess = response => {
    return {
        type: SIGNUP_SUCCESS,
        payload: response
    };
};

export const signupFailed = errors => {
    return {
        type: SIGNUP_FAILED,
        payload: errors
    };
}
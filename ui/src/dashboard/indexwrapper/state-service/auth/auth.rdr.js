import { 
    LOGIN_FAILED, LOGIN_SUCCESS,
    TOKEN_VALIDATION_FAILED, TOKEN_VALIDATION_SUCCESS, REQUEST_LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAILED,
    THROBBER_TOGGLE
} from './auth.const';
import { RequestUtils } from '../../utils/request.util';


const initialState = {
    isLoggedIn: null,
    username: null,
    loginThrobber: true,
    loginErrors: {},
    signupErrors: {}
};

export const authReducer = (state=initialState, action) => {
    if(state === null || state === undefined) {
        return {...initialState};
    }

    switch(action.type) {
        case LOGIN_SUCCESS:
            // console.log(action.payload);
            return {...state, isLoggedIn: true,
                username: action.payload.username, loginThrobber: false,
                loginErrors: {}};

        case LOGIN_FAILED:
            let errors = action.payload;
            return {...state, loginErrors: {...errors}, loginThrobber: false};

        case TOKEN_VALIDATION_SUCCESS:
            return {...state, isLoggedIn: true,
                username: action.payload.username, loginThrobber: false};

        case TOKEN_VALIDATION_FAILED:
            RequestUtils.removeAuthToken();
            return {...initialState, loginThrobber: false};

        case REQUEST_LOGOUT:
            RequestUtils.removeAuthToken();
            return {...initialState, loginThrobber: false}

        case SIGNUP_SUCCESS:
            let token = action.payload.token;
            RequestUtils.setAuthToken(token);
            return {...state, isLoggedIn: true, username: action.payload.username,
                signupErrors: {}, loginThrobber: false};

        case SIGNUP_FAILED:
            return {...state, signupErrors: {...action.payload}, loginThrobber: false};

        case THROBBER_TOGGLE:
        return {...state, loginThrobber: !state.loginThrobber};

        default:
            return state;
    }
};
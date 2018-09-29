import { 
    LOGIN_FAILED, LOGIN_SUCCESS,
    TOKEN_VALIDATION_FAILED, TOKEN_VALIDATION_SUCCESS, REQUEST_LOGOUT
} from './auth.const';
import { AuthUtils } from './auth.util';


const initialState = {
    isLoggedIn: false,
    username: null,
    loginThrobber: true
};

export const authReducer = (state=initialState, action) => {
    if(state === null || state === undefined) {
        return initialState;
    }

    switch(action.type) {
        case LOGIN_SUCCESS:
            let username = action.payload.username;
            return {...state, isLoggedIn: true, username: username, loginThrobber: false};

        case LOGIN_FAILED:
            let errors = action.payload;
            return {...state, errors: {...errors}};

        case TOKEN_VALIDATION_SUCCESS:
            return {...state, isLoggedIn: true,
                username: action.payload.username, loginThrobber: false};

        case TOKEN_VALIDATION_FAILED:
            AuthUtils.removeAuthToken();
            return {...state, isLoggedIn: false, username: null, loginThrobber: false};

        case REQUEST_LOGOUT:
            AuthUtils.removeAuthToken();
            return {...state, isLoggedIn: false, username: null}

        default:
            return state;
    }
};
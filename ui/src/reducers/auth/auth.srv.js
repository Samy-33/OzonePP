import { AuthUtils } from './auth.util';
import { 
    postLoginRequest, validateTokenRequest,
    postLogoutRequest, postSignupRequest
} from '../../api/index';
import { CONTENT_TYPE_JSON } from './auth.const';
import { AUTH_SUCCESS, AUTH_FAILED } from './auth.const';


class Auth {

    static async validateAuthToken () {
        let token = AuthUtils.getAuthToken();

        if(token === null || token === undefined) {
            return false;
        }

        let headers = AuthUtils.getJsonHeaderWithAuthToken();

        return await validateTokenRequest(headers)
                        .catch(err => {
                            console.log(`${__dirname}/auth.srv.js :: validateAuthToken : ${err}`);
                            throw Error(err.message);
                        });
    };
    
    
    /**
     * 
     * @param {*} username 
     * @param {*} password 
     */
    static async logInUser (username, password) {
        
        let headers = {
            'content-type': 'application/json'
        };

        let data = {
            'username': username,
            'password': password
        };

        let tokenData = await postLoginRequest(headers, data)
            .then(response => {
                if(!response.token || !response.username) {
                    return {
                        'status': AUTH_FAILED,
                        'errors': {...response},
                    };
                }
                AuthUtils.setAuthToken(response.token);
                return {
                    'status': AUTH_SUCCESS,
                    'data': {...response}
                };
            })
            .catch(err => {
                return {
                    'status': AUTH_FAILED,
                    'errors': {'unknown': `unknown error occured ${err}`}
                };
            });
        
        return tokenData;
    };

    /**
     * 
     */
    static async logoutUser () {
        let headers = AuthUtils.getJsonHeaderWithAuthToken();

        return postLogoutRequest(headers)
                .catch(err => {
                    console.log(`${__dirname}/auth.srv.js :: logoutUser : ${err}`);
                    return err;
                });
    };

    static async signUp (userData) {
        let headers = { ...CONTENT_TYPE_JSON };

        return postSignupRequest(headers, userData)
                .then(response => {
                    if(!response.token) {
                        return {
                            status: AUTH_FAILED,
                            errors: {...response}
                        };
                    } else {
                        return {
                            status: AUTH_SUCCESS,
                            data: {...response}
                        }
                    }
                    
                })
                .catch(err => {
                    console.log(`${__dirname}/auth.srv.js :: signUp : ${err}`);
                    return err;
                })

    }
};

export default {
    authService: Auth
};
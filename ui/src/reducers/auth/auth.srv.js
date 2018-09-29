import { AuthUtils } from './auth.util';
import { postLoginRequest, validateTokenRequest } from '../../api/index';

const AUTH_SUCCESS = 'Success';
const AUTH_FAILED = 'Failed';

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
                        'message': 'Invalid Credentials'
                    };
                }
                console.log(response);
                AuthUtils.setAuthToken(response.token);
                return {
                    'status': AUTH_SUCCESS,
                    ...response
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
};

export default {
    authService: Auth
};
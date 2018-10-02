import $ from './state-service/auth/auth.srv';
import { TOKEN_VALIDATION_SUCCESS, TOKEN_VALIDATION_FAILED } from './state-service/auth/auth.const';

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
import { AUTH_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED } from "../../state-service/auth/auth.const";
import $ from '../../state-service/auth/auth.srv';

export const requestSignUp = userData => {
    return dispatch => {
        console.log(userData);
        $.authService.signUp(userData)
            .then(response => {
                if(response instanceof Error) {
                    // TODO: do not throw error dispatch some action to handle the error
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
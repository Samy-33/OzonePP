import { REQUEST_LOGOUT } from "../../state-service/auth/auth.const";
import $ from '../../state-service/auth/auth.srv';


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

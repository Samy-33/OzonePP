import { USER_DETAIL_FETCHED, USER_DETAIL_FAILED } from "../../state-service/user/user.const";
import $ from "../../state-service/user/user.srv";


export const requestUserDetails = username => {
    return dispatch => {
        $.userService.getUserDetails(username)
            .then(response => {
                if(response.status === USER_DETAIL_FAILED || !response.username) {
                    dispatch(userDetailsLoadFailed({...response}));
                } else {
                    dispatch(userDetailsReceived({...response}));
                }
            });
    };
};


export const userDetailsReceived = data => {
    return {
        type: USER_DETAIL_FETCHED,
        payload: data
    };
};


export const userDetailsLoadFailed = errors => {
    return {
        type: USER_DETAIL_FAILED,
        payload: { userDetail: `Couldn't fetch user details`, ...errors }
    };
};
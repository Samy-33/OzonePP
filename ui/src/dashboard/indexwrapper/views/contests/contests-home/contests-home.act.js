import {
    ONGOING_CONTESTS_SUCCESS, ONGOING_CONTESTS_FAILED, RECENT_SUBMISSIONS_SUCCESS,
    RECENT_SUBMISSIONS_FAILED, RECENT_SUBMISSION_THROBBER_TOGGLE, ONGOING_CONTESTS_THROBBER_TOGGLE
} from '../../../state-service/contests/contests.const';
import $ from '../../../state-service/contests/contests.srv';


export const requestRecentSubmissions = () => {
   
    return dispatch => {
        dispatch({type: RECENT_SUBMISSION_THROBBER_TOGGLE});
        const callback = (success=false, data=[]) => {
            if (success) {
                dispatch(recentSubmissionsFetchSuccess(data));
            } else {
                dispatch(recentSubmissionsFetchFailed(data));
            }
        };
    
        $.getRecentSubmissions(callback);
    }
};


const recentSubmissionsFetchSuccess = data => {
    return {
        type: RECENT_SUBMISSIONS_SUCCESS,
        payload: data
    };
};

const recentSubmissionsFetchFailed = error => {
    return {
        type: RECENT_SUBMISSIONS_FAILED,
        payload: error
    };
};


export const requestOngoingContests = () => {

    return dispatch => {
        dispatch({type: ONGOING_CONTESTS_THROBBER_TOGGLE});
        const callback = (success=false, data=[]) => {
            if(success) {
                dispatch(ongoingContestsFetchSuccess(data));
            } else {
                dispatch(ongoingContestsFetchFailed(data));
            }
        };

        $.getOngoingContests(callback);
    };
};


const ongoingContestsFetchSuccess = data => {
    return {
        type: ONGOING_CONTESTS_SUCCESS,
        payload: data
    };
};

const ongoingContestsFetchFailed = error => {
    return {
        type: ONGOING_CONTESTS_FAILED,
        payload: error
    };
};

import {
    ONGOING_CONTESTS_SUCCESS, ONGOING_CONTESTS_FAILED, RECENT_SUBMISSIONS_SUCCESS,
    RECENT_SUBMISSIONS_FAILED, RECENT_SUBMISSION_THROBBER_TOGGLE, ONGOING_CONTESTS_THROBBER_TOGGLE
} from './contests.const';


const initialState = {
    ongoingContests: [],
    ongoingContestsError: '',
    ongoingContestsThrobber: true,
    recentSubmissions: [{id: 1, username: 'saket', contest_code: 'CODE1', problem_code: 'PROB1', status: 'AC'}],
    recentSubmissionsError: '',
    recentSubmissionsThrobber: true
};

export const contestReducer = (state=initialState, action) => {
    if(state === null || state === undefined) return {...initialState};

    switch(action.type) {
        case ONGOING_CONTESTS_SUCCESS:
            return {...state, ongoingContests: action.payload, ongoingContestsThrobber: false};
        case ONGOING_CONTESTS_FAILED:
            return {...state, ongoingContestsError: action.payload, ongoingContestsThrobber: false};
        case RECENT_SUBMISSIONS_SUCCESS:
            return {...state, recentSubmissions: action.payload, recentSubmissionsThrobber: false};
        case RECENT_SUBMISSIONS_FAILED:
            return {...state, recentSubmissionsError: action.payload, recentSubmissionsThrobber: false};
        case RECENT_SUBMISSION_THROBBER_TOGGLE:
            return {...state, recentSubmissionsThrobber: !state.recentSubmissionsThrobber};
        case ONGOING_CONTESTS_THROBBER_TOGGLE:
            return {...state, ongoingContestsThrobber: !state.ongoingContestsThrobber};
        default:
            return {...initialState};
    }
}
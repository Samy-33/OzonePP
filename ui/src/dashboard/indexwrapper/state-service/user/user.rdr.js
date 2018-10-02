import { USER_DETAIL_FAILED, USER_DETAIL_FETCHED } from "./user.const";

const initialState = {
    userData: {},
    submissionsData: {},
    contestsData: {},
    detailsThrobber: true,
    submissionsThrobber: true,
};

export const userReducer = (state=initialState, action) => {
    if(state === null || state === undefined) {
        return {...initialState};
    }

    switch(action.type) {
        case USER_DETAIL_FETCHED:
            return {...state, detailsThrobber: false, userData: {...action.payload}};

        case USER_DETAIL_FAILED:
            return {
                ...state, detailsThrobber: false,
                userData: {errors: {...action.payload.errors}}
            };

        default: return {...state};
    }
}
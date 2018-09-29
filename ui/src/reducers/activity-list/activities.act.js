import { FETCHING_ACTIVITIES, FETCHING_ACTIVITIES_SUCCESS,
  FETCHING_ACTIVITIES_FAILED } from './activities.const';

export const fetchActivities = (offset, numberOfActivities) => {
  return {
    type: FETCHING_ACTIVITIES,
    payload: {
      offset: offset,
      numberOfActivities: numberOfActivities
    }
  };
};

export const onFetchActivitiesSuccess = activityList => {
  return {
    type: FETCHING_ACTIVITIES_SUCCESS,
    payload: { activiyList: activityList }
  };
};

export const onFetchActivitiesFail = error => {
  return {
    type: FETCHING_ACTIVITIES_FAILED,
    payload: { error: error }
  };
};

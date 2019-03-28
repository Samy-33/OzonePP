import _ from 'lodash'
import { 
  LOAD_ALL_CONTESTS_FAILURE, LOAD_ALL_CONTESTS_PENDING, LOAD_ALL_CONTESTS_SUCCESS,
  LOAD_CONTEST_FAILURE, LOAD_CONTEST_PENDING, LOAD_CONTEST_SUCCESS,
  LOAD_CONTEST_ANNOUNCEMENTS_FAILURE, LOAD_CONTEST_ANNOUNCEMENTS_PENDING, LOAD_CONTEST_ANNOUNCEMENTS_SUCCESS
} from '../config/constants'
import Alert from 'react-s-alert'

const intialState = {
  contestLoading: true,
  contestAnnouncementsLoading: true,

  ongoingContests: null,
  upcomingContests: null,
  pastContests: null,

  currentContest: null,
  contestAnnouncements: null
}

export const contestsReducer = (state=intialState, action) => {
  if(_.isEmpty(state)) {
    return intialState
  }

  switch(action.type) {
    case LOAD_ALL_CONTESTS_PENDING: {
      return {
        ...state,
        contestLoading: true
      }
    }

    case LOAD_CONTEST_PENDING: {
      return {
        ...state,
        contestLoading: true
      }
    }

    case LOAD_CONTEST_ANNOUNCEMENTS_PENDING: {
      return {
        ...state,
        contestAnnouncementsLoading: true
      }
    }

    case LOAD_ALL_CONTESTS_SUCCESS: {
      const contests = action.payload

      return {
        ...state,
        contestLoading: false,
        ongoingContests: contests.ongoing.content,
        upcomingContests: contests.upcoming.content,
        pastContests: contests.past.content
      }
    }

    case LOAD_CONTEST_SUCCESS: {
      return {
        ...state,
        contestLoading: false,
        currentContest: action.payload
      }
    }

    case LOAD_CONTEST_ANNOUNCEMENTS_SUCCESS: {
      return {
        ...state,
        contestAnnouncementsLoading: false,
        contestAnnouncements: action.payload
      }
    }

    case LOAD_ALL_CONTESTS_FAILURE: {
      Alert.error('Couldn\'t load contests...')
      return {...state,
        ongoingContests: null,
        upcomingContests: null,
        pastContests: null
      }
    }

    case LOAD_CONTEST_FAILURE: {
      Alert.error('Couldn\'t load contest...')
      return {...state,
        currentContest: null
      }
    }

    case LOAD_CONTEST_ANNOUNCEMENTS_FAILURE: {
      Alert.error('Couldn\'t load announcements. Something went wrong.')
      return {
        ...state,
        contestAnnouncementsLoading: false,
        contestAnnouncements: null
      }
    }

    default: return {...state}
  }
}
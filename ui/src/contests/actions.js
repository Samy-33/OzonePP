import { getAllContests, getContest, getContestAnnouncements} from '../api/contests'
import { LOAD_ALL_CONTESTS, LOAD_CONTEST, LOAD_CONTEST_ANNOUNCEMENTS } from '../config/constants'

export const loadAllContests = () => {
  return dispatch => {
    return dispatch({
      type: LOAD_ALL_CONTESTS,
      payload: getAllContests()
    })
  }
}

export const loadContest = (contestCode) => {
  return dispatch => {
    return dispatch({
      type: LOAD_CONTEST,
      payload: getContest(contestCode)
    })
  }
}

export const loadContestAnnouncements = (contestCode) => {
  return dispatch => {
    return dispatch({
      type: LOAD_CONTEST_ANNOUNCEMENTS,
      payload: getContestAnnouncements(contestCode)
    })
  }
}
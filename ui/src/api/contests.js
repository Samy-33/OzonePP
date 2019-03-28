import { axiosInstance as axios } from './axios'

export const getAllContests = () => {
  const url = '/api/contest/'
  return axios.get(url)
    .then(response => response.data)
}

export const getContest = (contestCode) => {
  const url = `/api/contest/${contestCode}/`
  return axios.get(url)
    .then(response => response.data)
}

export const getContestAnnouncements = (contestCode) => {
  const url = `/api/contest/${contestCode}/announcements`
  return axios.get(url)
    .then(response => response.data)
}
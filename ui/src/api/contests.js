import { axiosInstance as axios } from './axios'

export const getAllContests = () => {
  const url = '/api/contest/'
  return axios.get(url)
    .then(response => response.data)
}
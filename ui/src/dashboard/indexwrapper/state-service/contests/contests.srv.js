// import { RequestUtils } from "../../utils/request.util";

export default class ContestService {
    static async getRecentSubmissions(callback) {
        fetch('/api/contest/submission/recent/', {
            method: 'GET'
        })
          .then(response => response.json())
          .then(response => {
            if (response.status === 200) {
                callback(true, response.data);
            } else {
                callback(false, response.message);
            }
          })
          .catch(err => {
            callback(false, err.message);
          });
    }

    static async getOngoingContests(callback) {
        fetch('/api/contest/ongoing/', {
            method: 'GET'
        })
          .then(response => response.json())
          .then(response => {
            callback(true, response);
          })
          .catch(err => {
              callback(false, err.message);
          })
    }
}
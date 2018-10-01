import {
  postLoginRequest, validateTokenRequest,
  postLogoutRequest, postSignupRequest
} from './services/auth';

export { postLoginRequest, validateTokenRequest,
  postLogoutRequest, postSignupRequest};

export default class ApiService {
  static getPaginatedActivityList (offset = 0, number = 3) {
    return [];
  }
};
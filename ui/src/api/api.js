import {
  postLoginRequest, validateTokenRequest,
  postLogoutRequest, postSignupRequest
} from './services/auth/auth';

import { getUserDetailRequest } from './services/user/user-api';

export { postLoginRequest, validateTokenRequest,
  postLogoutRequest, postSignupRequest};

export { getUserDetailRequest };

export default class ApiService {
  static getPaginatedActivityList (offset = 0, number = 3) {
    return [];
  }
};
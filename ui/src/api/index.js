import { postLoginRequest, validateTokenRequest } from './services/auth';

export { postLoginRequest, validateTokenRequest};

export default class ApiService {
  static getPaginatedActivityList (offset = 0, number = 3) {
    return [];
  }
}
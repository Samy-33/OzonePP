import { authReducer } from './auth/auth-reducer'
import { contestsReducer } from './contests/contests-reducer'
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  contests: contestsReducer
})
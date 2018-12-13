import { navReducer } from './navbar/navbar.rdr';
import { authReducer } from './auth/auth.rdr';
import { userReducer } from './user/user.rdr';
import { contestReducer } from './contests/contests.rdr';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  navbar: navReducer,
  auth: authReducer,
  user: userReducer,
  contests: contestReducer
});

export default rootReducer;
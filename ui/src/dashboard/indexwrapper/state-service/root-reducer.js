import { navReducer } from './navbar/navbar.rdr';
import { authReducer } from './auth/auth.rdr';
import { userReducer } from './user/user.rdr';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  navbar: navReducer,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;
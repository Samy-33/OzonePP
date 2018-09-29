import { navReducer } from './navbar';
import { authReducer } from './auth';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  navbar: navReducer,
  auth: authReducer
});

export default rootReducer;
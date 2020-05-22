
import { combineReducers } from 'redux';

import LoginReducer from './LoginReducer';

const rootReducer = combineReducers({
  LoginData: LoginReducer,
});

export default rootReducer;
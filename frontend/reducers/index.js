// src/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import jobReducer from './jobReducer';

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer
});

export default rootReducer;

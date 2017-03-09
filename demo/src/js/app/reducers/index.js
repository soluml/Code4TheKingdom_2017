import { combineReducers } from 'redux';
import router from './RouterReducer';
import app from './AppReducer';

export default combineReducers({
  app,
  router,
});

import { fromJS, Record, Map } from 'immutable';
import * as Constants from '../constants';

export const AppStateRecord = Record({
  error: new Map(),
});

const defaultState = new AppStateRecord();

export default function (state = defaultState, action) {
  switch (action.type) {
    case Constants.APP_ON_LOGIN:
      console.log('Signing In!', action);
      return state;
    case Constants.APP_ON_LOGOUT:
      console.log('Signing Out!');
      return state;
    default:
      return state;
  }
}

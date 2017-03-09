import Ajax from 'axios';
import * as Constants from './constants';

export function signOut(dispatch) {
  Ajax.get(`${API_HOST}/logout`)
    .then(() => dispatch({ type: Constants.APP_ON_LOGOUT }))
    .catch(() => alert('Sorry, you could not be logged out at this time! Please try again!'));
}

export function signIn(dispatch, payload) {
  Ajax.post(`${API_HOST}/api/login`, payload)
    .then(data => dispatch({ type: Constants.APP_ON_LOGIN, data: data.data }))
    .catch((err) => console.error(err));
}

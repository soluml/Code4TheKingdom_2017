//export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'
import { LOCATION_CHANGE } from '../constants';

const initialState = {
  location: null
};

export default function routerReducer(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return { ...state, ...payload };
  }

  return state;
}

/* eslint global-require: "off" */
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { Iterable } from 'immutable';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers/index';

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};

    for (let i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) newState[i] = state[i].toJS();
      else newState[i] = state[i];
    }

    return newState;
  }
});

const createStoreWithMiddleware = compose(
  applyMiddleware(logger),
  DevTools.instrument()
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

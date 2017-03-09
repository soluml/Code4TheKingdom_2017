import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import DevTools from './containers/DevTools';
import Wrapper from './containers/wrapper';
import '../../css/app.scss';

const initialState = {}; //do localStorage stuff here

const store = configureStore(initialState);

// Dev Tools
const devTools = __DEV__ ? <DevTools store={store} /> : undefined;

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Wrapper />
    </Provider>
    {devTools}
  </div>,
  document.getElementById('wrapper')
);

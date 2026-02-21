// Application entry point — mounts the React app into the DOM
// and wraps it with the Redux store provider.

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import appStore from './redux/store';

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
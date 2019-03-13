import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';

import routes from './app/routes';
import store from './app/store';

import './stylesheets/main.css';

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={hashHistory}
      routes={routes}
    />
  </Provider>
  , document.getElementById('root'));

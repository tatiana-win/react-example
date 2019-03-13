import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import Main from './Main';
import LoginContainer from '../modules/auth/LoginContainer';
import OrdersContainer from '../modules/orders/OrdersContainer';
import TabsContainer from '../modules/orders/tabs/TabsContainer';
import SearchContainer from '../modules/search/SearchContainer';
import {loggedIn} from '../utils/auth';

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    })
  }
}

function redirectFromLogin(nextState, replace) {
  if (loggedIn()) {
    replace({
      pathname: '/orders',
      state: {nextPathname: nextState.location.pathname}
    })
  }
}

export default (
  <Route
    path="/"
    component={Main}
  >
    <IndexRedirect
      to="/orders"/>
    <Route
      path='/login'
      component={LoginContainer}
      onEnter={redirectFromLogin}
    />
    <Route
      path='/orders'
      component={OrdersContainer}
      onEnter={requireAuth}
    />
    <Route
      path='/orders/new'
      component={TabsContainer}
      onEnter={requireAuth}
    />
    <Route
      path='/orders/:id'
      component={TabsContainer}
      onEnter={requireAuth}
    />
    <Route
      path='/search'
      component={SearchContainer}
      onEnter={requireAuth}
    />

  </Route>
);

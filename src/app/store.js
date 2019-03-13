import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {auth} from '../modules/auth/AuthReducer';
import {layout} from '../modules/layout/LayoutReducer';
import {orders} from '../modules/orders/OrdersReducer';
import {search} from '../modules/search/SearchReducer';
import {shared} from '../modules/shared/SharedReducer';
import {phone} from '../modules/phone/PhoneReducer';
import {tariff} from '../modules/tariff/TariffReducer';
import HttpMiddleware from '../middlewares/HttpMiddleware';
import WebSocketMiddleware from '../middlewares/WebSocketMiddleware';
import WebRtcMiddleware from '../middlewares/WebRtcMiddleware';
import IndexDbLogger from '../middlewares/IndexDbLogger';

const middlewares = [thunk, IndexDbLogger, HttpMiddleware, WebSocketMiddleware, WebRtcMiddleware];

if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);

  const logger = createLogger({
    collapsed: true,
    diff: true
  });

  middlewares.push(logger);
}

const reducer = combineReducers({auth, layout, orders, search, shared, phone, tariff});

function configureStore() {
  const finalCreateStore = compose(
    applyMiddleware(...middlewares)
  )(createStore);

  const store = finalCreateStore(reducer);

  return store;
}

let store = configureStore();

export default store;

import {expect} from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as SearchActions from '../../../src/modules/search/SearchActions';
import {
  FILTER_FIELD_SET,
  RESULT_SET
} from '../../../src/modules/search/ActionTypes';
import HttpMiddleware from '../../../src/middlewares/HttpMiddleware';
import WebSocketMiddleware from '../../../src/middlewares/WebSocketMiddleware';

const middlewares = [thunk, HttpMiddleware, WebSocketMiddleware];
const mockStore = configureMockStore(middlewares);

import {
  OPERATOR_ERROR
} from '../../../src/middlewares/SocketConstants';

describe('search_actions', () => {

  describe('FILTER_FIELD_SET', () => {
    it('should create action to set in filter field color value red in section vehicle', () => {
      let section = 'vehicle';
      let field = 'color';
      let value = 'red';
      const expectedAction = {
        type: FILTER_FIELD_SET,
        payload: {
          section, field, value
        }
      };

      expect(SearchActions.setFilterField(field, value, section)).to.deep.equal(expectedAction);
    });

    it('should create action to set in filter field customerPhone value +7(938)873-8967', () => {
      let field = 'customerPhone';
      let value = '+7(938)873-8967';
      const expectedAction = {
        type: FILTER_FIELD_SET,
        payload: {
          section: '',
          field,
          value
        }
      };

      expect(SearchActions.setFilterField(field, value)).to.deep.equal(expectedAction);
    });
  });

  describe('OPERATOR_ORDER_SEARCH_REQ', () => {
    let filter;
    let store;

    beforeEach(() => {
      store = mockStore({
        auth: {
          apiToken: 'api token'
        }
      });
      filter = {
        customerPhone: '',
        vehicle: {
          brand: '',
          color: '',
          number: '',
          driverPhone: ''
        },
        departure: {
          isPublicPlace: false,
          publicPlace: '',
          house: '',
          street: ''
        },
        destination: {
          isPublicPlace: false,
          publicPlace: '',
          house: '',
          street: ''
        },
        startTime: '',
        endTime: ''
      };
    });

    afterEach(() => {
      window.WebSocket.prototype.send = function (data) {
        setTimeout(() => {
          this.onmessage({data});
        }, WAIT_CONNECTION_TIMEOUT);
      };
    });

    it('should create action to make request via socket with type OPERATOR_ORDER_SEARCH_REQ', (done) => {
      store.dispatch(SearchActions.search(filter)).then(() => {
        done();
      });
    });

    it('should fail if request failed', (done) => {
      window.WebSocket.prototype.send = function (data) {
        let parsedData = JSON.parse(data);

        let response = {
          type: OPERATOR_ERROR,
          sequence_id: parsedData.sequence_id
        };

        this.onmessage({data: JSON.stringify(response)});
      };

      store.dispatch(SearchActions.search(filter)).catch(() => {
        done();
      });
    });
  });

  describe('RESULT_SET', () => {
    let results;
    let store;

    beforeEach(() => {
      store = mockStore({
        auth: {
          apiToken: ''
        }
      });

      results = {
        orders: [
          {
            id: 'ride1',
            start_order_time: 1488733200001,
            pre_order_time: null,
            destination_address: 'Krasnodar, Lenina, 1',
            departure_address: 'Krasnodar, Mira, 2',
            order_type: 'normal',
            vehicle_info: {}
          },
          {
            id: 'ride2',
            start_order_time: null,
            pre_order_time: 1488733200002,
            destination_address: 'Krasnodar, Gallery',
            departure_address: null,
            vehicle_info: {}
          },
          {
            id: 'ride3',
            start_order_time: 1488733200003,
            pre_order_time: null,
            destination_address: 'Krasnodar, Lenina, 1',
            departure_address:  'Krasnodar, Mira, 2',
            vehicle_info: {}
          },
          {
            id: 'ride4',
            start_order_time: null,
            pre_order_time: 1488733200004,
            destination_address: 'Krasnodar, Gallery',
            departure_address: null,
            vehicle_info: {}
          }
        ]
      }
    });

    it('should map rides and create action to set results', () => {
      const expectedAction = {
        type: RESULT_SET,
        payload: [
          {
            id: 'ride1',
            startOrderTime: new Date(1488733200001),
            destinationAddress:  'Krasnodar, Lenina, 1',
            departureAddress: 'Krasnodar, Mira, 2',
            vehicle: {}
          }, {
            id: 'ride2',
            startOrderTime: '',
            destinationAddress: 'Krasnodar, Gallery',
            departureAddress: "",
            vehicle: {}
          }, {
            id: 'ride3',
            startOrderTime: new Date(1488733200003),
            destinationAddress: 'Krasnodar, Lenina, 1',
            departureAddress: 'Krasnodar, Mira, 2',
            vehicle: {}
          }, {
            id: 'ride4',
            startOrderTime: '',
            destinationAddress:  'Krasnodar, Gallery',
            departureAddress: "",
            vehicle: {}
          }]
      };

      store.dispatch(SearchActions.setResults(results));
      let actions = store.getActions();
      expect(actions[0]).to.deep.equal(expectedAction);
    });
  });

});

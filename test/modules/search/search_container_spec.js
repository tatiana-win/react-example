import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import sinon from 'sinon';
import {hashHistory} from 'react-router';

import SearchContainer from '../../../src/modules/search/SearchContainer';
import store from '../../../src/app/store';

describe('Test suite for SearchContainer', () => {
  let wrapper;

  beforeEach(() => {
    hashHistory.push = sinon.spy();
    store.dispatch = sinon.spy();
    store.getState = () => {
      return {
        auth: {
          apiToken: 'some token',
          sip: 'some sip',
          reloadOptions: false
        },
        shared: {
          dictionaries: {
            brands: [{id: 1, name: '4ppl'}],
            colors: [],
            areas: [],
            comments: [],
            publicPlaceComments: [],
            cities: [],
            streets: [],
            publicPlaces: []
          }
        },
        search: {
          filter: {
            departure: {},
            destination: {},
            vehicle: {}
          },
          results: []
        },
        phone: {
          webRtcToken: 'some webrtc token',
        },
        tariff: {
          products: [{
            id: 1,
            name: 'Standard',
            regionId: 1,
            capacities: [{
              id: 4,
              name: '4ppl'
            }]
          }, {
            id: 2,
            name: 'Test 1',
            regionId: 2,
            capacities: [{
              id: 6,
              name: '6ppl'
            }, {
              id: 4,
              name: '4ppl'
            }]
          }]
        }
      }
    };

    wrapper = mount(
      <Provider store={store}>
        <SearchContainer/></Provider>);
  });

  afterEach(() => {
    wrapper.unmount()
  });

  it('SearchContainer should exists', () => {
    expect(wrapper).to.exist;
  });

  it('SearchContainer should render SearchComponent', () => {
    expect(wrapper.find('SearchComponent')).to.have.length(1);
  });

  it('SearchContainer should not render SearchComponent if apiToken is missed', () => {
    store.getState = () => {
      return {
        auth: {
          apiToken: '',
          sip: 'some sip',
          webRtcToken: 'some webrtc token',
          reloadOptions: false
        },
        shared: {
          dictionaries: {}
        },
        search: {
          filter: {}
        },
        tariff: {
          products: [{
            id: 1,
            name: 'Standard',
            regionId: 1,
            capacities: [{
              id: 4,
              name: '4ppl'
            }]
          }, {
            id: 2,
            name: 'Test 1',
            regionId: 2,
            capacities: [{
              id: 6,
              name: '6ppl'
            }, {
              id: 4,
              name: '4ppl'
            }]
          }]
        }
      }
    };

    wrapper = mount(
      <Provider store={store}>
        <SearchContainer/></Provider>);

    expect(wrapper.find('SearchComponent')).to.have.length(0);
  });
});

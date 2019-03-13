import React from 'react';
import SearchFilterContainer from '../../../../src/modules/search/filter/SearchFilterContainer';
import {expect} from 'chai';
import sinon from 'sinon';
import {mount} from 'enzyme';
import store from '../../../../src/app/store';
import {Provider} from 'react-redux';
import {
  FILTER_FIELD_SET
} from '../../../../src/modules/search/ActionTypes';

describe('Test suite for SearchFilterContainer', () => {
  let wrapper;
  let filter;

  beforeEach(() => {
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

    store.dispatch = sinon.spy();
    store.getState = () => {
      return {
        shared: {
          dictionaries: {
            publicPlaces: [],
            streets: [],
            colors: [],
            brands: []
          }
        },
        search: {
          filter
        }
      }
    };

    wrapper = mount(
      <Provider store={store}>
        <SearchFilterContainer /></Provider>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('SearchFilterContainer should exists', () => {
    expect(wrapper).to.exist;
  });

  it('should call dispatch with FILTER_FIELD_SET with field "number", section "vehicle" and value that user enter in car number field', () => {
    let carNumber = wrapper.find('.search__number');
    carNumber.simulate('change', {target: {value: 'e112ka'}});

    expect(store.dispatch.calledWith(sinon.match({
      type: FILTER_FIELD_SET, payload: {
        field: 'number',
        value: 'e112ka',
        section: 'vehicle'
      }
    }))).to.equal(true);
  });

  it('should call dispatch with FILTER_FIELD_SET with field "house", section "departure" and value that user enter in departure house field', () => {
    let houseField = wrapper.find('input.search__house').first();
    houseField.simulate('change', {target: {value: '12'}});

    expect(store.dispatch.calledWith(sinon.match({
      type: FILTER_FIELD_SET, payload: {
        field: 'house',
        value: '12',
        section: 'departure'
      }
    }))).to.equal(true);
  });

  it('should call dispatch with FILTER_FIELD_SET with field "house", section "destination" and value that user enter in destination house field', () => {
    let houseField = wrapper.find('input.search__house').at(1);
    houseField.simulate('change', {target: {value: '21'}});

    expect(store.dispatch.calledWith(sinon.match({
      type: FILTER_FIELD_SET, payload: {
        field: 'house',
        value: '21',
        section: 'destination'
      }
    }))).to.equal(true);
  });

  it('should call dispatch with FILTER_FIELD_SET with field "isPublicPlace", section "departure" and value true if isPublicPlace is false', () => {
    let toggle = wrapper.find('button.search__toggle').first();
    toggle.simulate('click');

    expect(store.dispatch.calledWith(sinon.match({
      type: FILTER_FIELD_SET, payload: {
        field: 'isPublicPlace',
        value: true,
        section: 'departure'
      }
    }))).to.equal(true);
  });
});

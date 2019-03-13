import React from 'react';
import SearchTableRowComponent from '../../../../src/modules/search/table/SearchTableRowComponent';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('Test suite for SearchTableRowComponent', () => {
  let wrapper;
  let order;

  beforeEach(() => {
    order = {
      vehicle: {
        brand: 'Bmw',
        number: 'e345po',
        driverPhone: '+79282593012'
      },
      departureAddress: '',
      destinationAddress: ''
    };

    wrapper = shallow(
      <SearchTableRowComponent
        order={order}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('SearchTableRowComponent should exists', () => {
    expect(wrapper).to.exist;
  });

  it('should set Bmw №e345po in auto column', () => {
    let auto = wrapper.find('.search__item-auto');

    expect(auto.text()).to.equal('Bmw №e345po');
  });

  it('should set driver phone in phone column', () => {
    let phone = wrapper.find('.search__item-phone');

    expect(phone.text()).to.equal('+79282593012');
  });

  it('should set empty string in phone column if driver phone not set ', () => {
    order.vehicle.driverPhone = '';
    wrapper = shallow(
      <SearchTableRowComponent
        order={order}
      />
    );
    let phone = wrapper.find('.search__item-phone');

    expect(phone.text()).to.equal('');
  });

  it('should set departure address', () => {
    order.departureAddress = 'Avenue, 5';
    wrapper = shallow(
      <SearchTableRowComponent
        order={order}
      />
    );
    let departure = wrapper.find('.search__item-from');

    expect(departure.text()).to.equal('Avenue, 5');
  });

  it('should set destination address', () => {
    order.destinationAddress = 'Rail station';
    wrapper = shallow(
      <SearchTableRowComponent
        order={order}
      />
    );
    let destination = wrapper.find('.search__item-to');

    expect(destination.text()).to.equal('Rail station');
  });

});

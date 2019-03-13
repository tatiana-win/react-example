import React from 'react';
import SearchTableComponent from '../../../../src/modules/search/table/SearchTableComponent';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('Test suite for SearchTableComponent', () => {
  let wrapper;
  let searchResults;

  beforeEach(() => {
    searchResults = [{
      id: 1,
      vehicle: {},
      departureAddress: {},
      destinationAddress: {}
    }, {
      id: 2,
      vehicle: {},
      departureAddress: {},
      destinationAddress: {}
    }, {
      id: 3,
      vehicle: {},
      departureAddress: {},
      destinationAddress: {}
    }];

    wrapper = shallow(
      <SearchTableComponent
        searchResults={searchResults}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('SearchTableComponent should exists', () => {
    expect(wrapper).to.exist;
  });

  it('should render 3 SearchTableRowComponent', () => {
    expect(wrapper.find('SearchTableRowComponent')).to.have.length(3);
  })
});

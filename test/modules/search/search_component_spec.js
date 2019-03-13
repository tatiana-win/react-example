import React from 'react';
import SearchComponent from '../../../src/modules/search/SearchComponent';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('Test suite for SearchComponent', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = shallow(
      <SearchComponent />
    );
  });

  it('SearchComponent should exists', () => {
    expect(wrapper).to.exist;
  });
});

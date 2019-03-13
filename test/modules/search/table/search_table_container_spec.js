import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import sinon from 'sinon';

import SearchTableContainer from '../../../../src/modules/search/table/SearchTableContainer';
import store from '../../../../src/app/store';

describe('Test suite for SearchTableContainer', () => {
  let wrapper;
  let search;

  beforeEach(() => {
    store.dispatch = sinon.spy();
    search = {
      results: []
    };
    store.dispatch = sinon.spy();
    store.getState = () => {
      return {
        search: {
          ...search
        }
      }
    };

    wrapper = mount(
      <Provider store={store}>
        <SearchTableContainer /></Provider>);
  });

  afterEach(() => {
    wrapper.unmount()
  });

  it('SearchTableContainer should exists', () => {
    expect(wrapper).to.exist;
  });

  it('SearchTableContainer should render SearchTableComponent', () => {
    expect(wrapper.find('SearchTableComponent')).to.have.length(1);
  });

});

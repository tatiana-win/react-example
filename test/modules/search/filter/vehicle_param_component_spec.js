import React from 'react';
import VehicleParamComponent from '../../../../src/modules/search/filter/VehicleParamComponent';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

describe('Test suite for VehicleParamComponent', () => {
  let wrapper;
  let values;
  let setParam;

  beforeEach(() => {
    values = [{
      id: '1',
      name: 'Bmw'
    }, {
      id: '2',
      name: 'Opel'
    }, {
      id: '3',
      name: 'Honda'
    }];

    setParam = sinon.spy();

    wrapper = shallow(
      <VehicleParamComponent
        values={values}
        setParam={setParam}
      />
    );
  });

  it('VehicleParamComponent should exists', () => {
    expect(wrapper).to.exist;
  });

  it('should render SelectAutoSuggestComponent', () => {
    expect(wrapper.find('SelectAutoSuggestComponent')).to.have.length(1);
  });

  it('should set suggestions = passed values', () => {
    expect(wrapper.find('SelectAutoSuggestComponent').prop('suggestions')).to.deep.equal(values);
  });

  it('should filter suggestions that contain "hon"', () => {
    wrapper = mount(
      <VehicleParamComponent
        values={values}
        setParam={setParam}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: 'hon'}});

    expect(wrapper.state('suggestions')).to.deep.equal([{
      id: '3',
      name: 'Honda'
    }]);
  });

  it('should filter suggestions that contain "el"', () => {
    wrapper = mount(
      <VehicleParamComponent
        values={values}
        setParam={setParam}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: 'el'}});

    expect(wrapper.state('suggestions')).to.deep.equal([{
      id: '2',
      name: 'Opel'
    }]);
  });

  it('should show all suggestions if input value is empty string', () => {
    wrapper = mount(
      <VehicleParamComponent
        values={values}
        setParam={setParam}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: ''}});

    expect(wrapper.state('suggestions')).to.deep.equal([{
      id: '1',
      name: 'Bmw'
    }, {
      id: '2',
      name: 'Opel'
    }, {
      id: '3',
      name: 'Honda'
    }]);
  });
});

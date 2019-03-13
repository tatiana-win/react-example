import React from 'react';
import FilterAddressComponent from '../../../../src/modules/search/filter/FilterAddressComponent';
import {expect} from 'chai';
import {mount} from 'enzyme';
import sinon from 'sinon';

import SETTINGS from '../../../../src/settings';

describe('Test suite for FilterAddressComponent', () => {
  let wrapper;
  let streets;
  let publicPlaces;
  let setStreet;
  let setPublicPlace;
  let setHouse;
  let togglePublicPlace;
  let isPublicPlace;
  let section;
  let streetPlaceHolder;
  let onSubmit;

  beforeEach(() => {
    streets = [{
      id: '1',
      name: 'Kommunarov'
    }, {
      id: '2',
      name: 'Krasnaya'
    }, {
      id: '3',
      name: 'Severnaya'
    }];

    publicPlaces = [{
      id: '1',
      name: 'Rail station'
    }, {
      id: '2',
      name: 'Airport'
    }, {
      id: '3',
      name: 'School'
    }];

    isPublicPlace = false;
    section = 'departure';
    streetPlaceHolder = 'From';

    setStreet = sinon.spy();
    setPublicPlace = sinon.spy();
    setHouse = sinon.spy();
    togglePublicPlace = sinon.spy();
    onSubmit = sinon.spy();

    wrapper = mount(
      <FilterAddressComponent
        streets={streets}
        publicPlaces={publicPlaces}
        setStreet={setStreet}
        setPublicPlace={setPublicPlace}
        setHouse={setHouse}
        togglePublicPlace={togglePublicPlace}
        isPublicPlace={isPublicPlace}
        section={section}
        streetPlaceHolder={streetPlaceHolder}
        onSubmit={onSubmit}
      />
    );
  });

  it('FilterAddressComponent should exists', () => {
    expect(wrapper).to.exist;
  });

  it('should call togglePublicPlace with value true if button.search__toggle is clicked and isPublicPlace is false', () => {
    let toggle = wrapper.find('button.search__toggle');
    toggle.simulate('click');

    expect(togglePublicPlace.calledWith(true, section));
  });

  it('should set class search__place-icon for span in toggle button if isPublicPlace is false', () => {
    let toggle = wrapper.find('button.search__toggle');

    expect(toggle.find('span').is('.search__place-icon')).to.equal(true);
  });

  it('should render two inputs: for street and for house', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should set passed placeholder for street', () => {
    expect(wrapper.find('input.react-autosuggest__input').prop('placeholder')).to.deep.equal(streetPlaceHolder);
  });

  it('should call setHouse if house changed', () => {
    let houseField = wrapper.find('input.search__house');
    houseField.simulate('change', {target: {value: '12'}});

    expect(setHouse.calledWith('12', section));
  });

  it('should set house in state if house changed', () => {
    let houseField = wrapper.find('input.search__house');
    houseField.simulate('change', {target: {value: '12'}});

    expect(wrapper.state('house')).to.equal('12');
  });

  it('should set in streetSuggestions values that contain "k"', (done) => {
    let streetField = wrapper.find('input.react-autosuggest__input');
    streetField.simulate('change', {target: {value: 'k'}});

    setTimeout(() => {
      expect(wrapper.state('streetSuggestions')).to.deep.equal([{
        id: '1',
        name: 'Kommunarov'
      }, {
        id: '2',
        name: 'Krasnaya'
      }]);

      done();
    }, SETTINGS.search.inputDebounce + 10);
  });

  it('should set empty streets array in suggestions if street field is empty', () => {
    let streetField = wrapper.find('input.react-autosuggest__input');
    streetField.simulate('change', {target: {value: ''}});

    expect(wrapper.state('streetSuggestions')).to.deep.equal([]);
  });

  it('should set street in state if street changed', () => {
    let streetField = wrapper.find('input.react-autosuggest__input');
    streetField.simulate('change', {target: {value: 'kras'}});

    expect(wrapper.state('street')).to.equal('kras');
  });

  it('should call onSubmit if enter pressed in house field', () => {
    let houseField = wrapper.find('input.search__house');
    houseField.simulate('keyDown', {keyCode: 13});

    expect(onSubmit.calledOnce).to.equal(true);
  });

  it('should not call onSubmit if pressed any key except enter in house field', () => {
    let houseField = wrapper.find('input.search__house');
    houseField.simulate('keyDown', {keyCode: 2});

    expect(onSubmit.calledOnce).to.equal(false);
  });

  describe('isPublicPlace is true', () => {

    beforeEach(() => {
      isPublicPlace = true;
      wrapper = mount(
        <FilterAddressComponent
          streets={streets}
          publicPlaces={publicPlaces}
          setStreet={setStreet}
          setPublicPlace={setPublicPlace}
          setHouse={setHouse}
          togglePublicPlace={togglePublicPlace}
          isPublicPlace={isPublicPlace}
          section={section}
          streetPlaceHolder={streetPlaceHolder}
        />
      );
    });

    it('should not render input for house', () => {
      expect(wrapper.find('input.search__house')).to.have.length(0);
    });

    it('should render input for public place', () => {
      expect(wrapper.find('input.react-autosuggest__input')).to.have.length(1);
    });

    it('should set in publicPlaceSuggestions values that contain "rail"', (done) => {
      let streetField = wrapper.find('input.react-autosuggest__input');
      streetField.simulate('change', {target: {value: 'rail'}});

      setTimeout(() => {
        expect(wrapper.state('publicPlaceSuggestions')).to.deep.equal([{
          id: '1',
          name: 'Rail station'
        }]);

        done();
      }, SETTINGS.search.inputDebounce + 10);
    });

    it('should set empty public places array in suggestions if public place field is empty', () => {
      let streetField = wrapper.find('input.react-autosuggest__input');
      streetField.simulate('change', {target: {value: ''}});

      expect(wrapper.state('publicPlaceSuggestions')).to.deep.equal([]);
    });

    it('should set publicPlace in state if publicPlace changed', () => {
      let streetField = wrapper.find('input.react-autosuggest__input');
      streetField.simulate('change', {target: {value: 'port'}});

      expect(wrapper.state('publicPlace')).to.equal('port');
    });

    it('should call togglePublicPlace with value false if button.search__toggle is clicked and isPublicPlace is true', () => {
      let toggle = wrapper.find('button.search__toggle');
      toggle.simulate('click');

      expect(togglePublicPlace.calledWith(false, section));
    });

    it('should set class search__place-icon--active for span in toggle button if isPublicPlace is true', () => {
      let toggle = wrapper.find('button.search__toggle');

      expect(toggle.find('span').is('.search__place-icon--active')).to.equal(true);
    });
  });


});

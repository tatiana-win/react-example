import React from 'react';
import SearchFilterComponent from '../../../../src/modules/search/filter/SearchFilterComponent';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

describe('Test suite for SearchFilterComponent', () => {
  let wrapper;
  let setClientPhone;
  let setDriverPhone;
  let setCarNumber;
  let setColor;
  let setBrand;
  let setStreet;
  let setPublicPlace;
  let setHouse;
  let togglePublicPlace;
  let colors;
  let brands;
  let streets;
  let publicPlaces;
  let filter;
  let setTimeStart;
  let setTimeEnd;
  let search;

  beforeEach(() => {
    colors = [{
      id: '1',
      name: 'black'
    }, {
      id: '2',
      name: 'red'
    }, {
      id: '3',
      name: 'yellow'
    }];

    brands = [{
      id: '1',
      name: 'Bmw'
    }, {
      id: '2',
      name: 'Opel'
    }, {
      id: '3',
      name: 'Honda'
    }];

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

    setClientPhone = sinon.spy();
    setDriverPhone = sinon.spy();
    setCarNumber = sinon.spy();
    setColor= sinon.spy();
    setBrand= sinon.spy();
    setStreet= sinon.spy();
    setPublicPlace= sinon.spy();
    setHouse= sinon.spy();
    togglePublicPlace= sinon.spy();
    setTimeStart= sinon.spy();
    setTimeEnd= sinon.spy();
    search= sinon.spy();

    wrapper = shallow(
      <SearchFilterComponent
        setClientPhone={setClientPhone}
        setDriverPhone={setDriverPhone}
        setCarNumber={setCarNumber}
        setColor={setColor}
        setBrand={setBrand}
        setStreet={setStreet}
        setPublicPlace={setPublicPlace}
        setHouse={setHouse}
        togglePublicPlace={togglePublicPlace}
        colors={colors}
        brands={brands}
        streets={streets}
        publicPlaces={publicPlaces}
        filter={filter}
        setTimeStart={setTimeStart}
        setTimeEnd={setTimeEnd}
        search={search}
      />
    );
  });

  it('SearchFilterComponent should exists', () => {
    expect(wrapper).to.exist;
  });

  it('should call setCarNumber if car number is changed', () => {
    let carNumber = wrapper.find('.search__number');
    carNumber.simulate('change', {target: {value: 'e112ka'}});

    expect(setCarNumber.calledWith('e112ka'));
  });

  it('should call setHouse if house is changed', () => {
    let houseField = wrapper.find('input.search__house').first();
    houseField.simulate('change', {target: {value: '12'}});

    expect(setHouse.calledWith('12', 'departure'));
  });

  it('should call togglePublicPlace with value true if button.search__toggle is clicked and isPublicPlace is false', () => {
    let toggle = wrapper.find('button.search__toggle').first();
    toggle.simulate('click');

    expect(togglePublicPlace.calledWith(true, 'departure'));
  });

  it('should call search if enter pressed in car number field', () => {
    let numberField = wrapper.find('input.search__number');
    numberField.simulate('keyDown', {keyCode: 13});

    expect(search.calledOnce).to.equal(true);
  });

  it('should not call search if pressed any key except enter in car number field', () => {
    let numberField = wrapper.find('input.search__number');
    numberField.simulate('keyDown', {keyCode: 2});

    expect(search.calledOnce).to.equal(false);
  });

  describe('time filters', () => {

    beforeEach(() => {
      wrapper = mount(
        <SearchFilterComponent
          setClientPhone={setClientPhone}
          setDriverPhone={setDriverPhone}
          setCarNumber={setCarNumber}
          setColor={setColor}
          setBrand={setBrand}
          setStreet={setStreet}
          setPublicPlace={setPublicPlace}
          setHouse={setHouse}
          togglePublicPlace={togglePublicPlace}
          colors={colors}
          brands={brands}
          streets={streets}
          publicPlaces={publicPlaces}
          filter={filter}
          setTimeStart={setTimeStart}
          setTimeEnd={setTimeEnd}
          search={search}
        />
      );
    });

    it('should call setTimeStart if start time changed and new value is contained in possible values', () => {
      let datesFrom = wrapper.state('datesFrom');
      let startTimeField = wrapper.find('.search__time input').first();

      startTimeField.simulate('change', {target: {value: datesFrom[1].text}});

      expect(setTimeStart.calledWith(datesFrom[1].value)).to.equal(true);
    });

    it('should reset end time if it is before start after changing start time', () => {
      let datesTo = wrapper.state('datesTo');
      let datesFrom = wrapper.state('datesFrom');
      let startTimeField = wrapper.find('.search__time input').first();

      wrapper.setState({endTime: datesTo[1].text});
      startTimeField.simulate('change', {target: {value: datesFrom[10].text}});

      expect(setTimeEnd.calledWith('')).to.equal(true);
    });

    it('should filter datesTo array to store only dates after start time', () => {
      let datesTo = wrapper.state('datesTo');
      let datesFrom = wrapper.state('datesFrom');
      let startTimeField = wrapper.find('.search__time input').first();

      wrapper.setState({endTime: datesTo[1].text});
      startTimeField.simulate('change', {target: {value: datesFrom[10].text}});


      wrapper.state('datesTo').map(date => expect(moment(date.value).isAfter(datesFrom[10].value)).to.equal(true));
    });

    it('should call setTimeEnd if end time changed and new value is contained in possible values', () => {
      let datesTo = wrapper.state('datesTo');
      let endTimeField = wrapper.find('.search__time input').at(1);

      endTimeField.simulate('change', {target: {value: datesTo[1].text}});

      expect(setTimeEnd.calledWith(datesTo[1].value)).to.equal(true);
    });
  });

});

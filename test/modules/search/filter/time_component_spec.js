import React from 'react';
import TimeComponent from '../../../../src/modules/search/filter/TimeComponent';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

describe('Test suite for TimeComponent', () => {
  let wrapper;
  let setTime;
  let dates;
  let currentTime;
  let onTimeChange;
  let onTimeBlur;

  beforeEach(() => {
    dates = [{
      value: new Date(2017, 1, 15, 0, 0, 0),
      text: '15.02 00:00'
    }, {
      value: new Date(2017, 1, 15, 1, 0, 0),
      text: '15.02 01:00'
    }, {
      value: new Date(2017, 1, 15, 2, 0, 0),
      text: '15.02 02:00'
    }];

    currentTime = '';

    setTime = sinon.spy();
    onTimeChange = sinon.spy();
    onTimeBlur = sinon.spy();

    wrapper = shallow(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );
  });

  it('TimeComponent should exists', () => {
    expect(wrapper).to.exist;
  });

  it('should render SelectAutoSuggestComponent', () => {
    expect(wrapper.find('SelectAutoSuggestComponent')).to.have.length(1);
  });

  it('should set suggestions = passed dates', () => {
    expect(wrapper.find('SelectAutoSuggestComponent').prop('suggestions')).to.deep.equal(dates);
  });

  it('should filter suggestions that contain "01"', () => {
    wrapper = mount(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: '01'}});

    expect(wrapper.state('timeSuggestions')).to.deep.equal([{
      value: new Date(2017, 1, 15, 1, 0, 0),
      text: '15.02 01:00'
    }]);
  });

  it('should filter suggestions that contain "15"', () => {
    wrapper = mount(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: '15'}});

    expect(wrapper.state('timeSuggestions')).to.deep.equal([{
      value: new Date(2017, 1, 15, 0, 0, 0),
      text: '15.02 00:00'
    }, {
      value: new Date(2017, 1, 15, 1, 0, 0),
      text: '15.02 01:00'
    }, {
      value: new Date(2017, 1, 15, 2, 0, 0),
      text: '15.02 02:00'
    }]);
  });

  it('should show all suggestions if input value is empty string', () => {
    wrapper = mount(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: ''}});

    expect(wrapper.state('timeSuggestions')).to.deep.equal(dates);
  });

  it('should call onTimeChange if time in input changed', () => {
    wrapper = mount(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );

    wrapper.find('input').simulate('change', {target: {value: '15'}});

    expect(onTimeChange.calledWith('15')).to.equal(true);
  });

  it('should call onTimeChange with empty string if backspace is pressed and selected some time value', () => {
    currentTime = '15.02 01:00';
    wrapper = mount(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );

    wrapper.find('input').simulate('keyDown', {keyCode: 8});

    expect(onTimeChange.calledWith('')).to.equal(true);
  });

  it('should not call onTimeChange if any key except backspace is pressed', () => {
    currentTime = '15.02 01:00';
    wrapper = mount(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );

    wrapper.find('input').simulate('keyDown', {keyCode: 13});

    expect(onTimeChange.called).to.equal(false)
  });

  it('should not call onTimeChange if not selected time from list', () => {
    currentTime = '';
    wrapper = mount(
      <TimeComponent
        dates={dates}
        currentTime={currentTime}
        setTime={setTime}
        onTimeChange={onTimeChange}
        onTimeBlur={onTimeBlur}
      />
    );

    wrapper.find('input').simulate('keyDown', {keyCode: 8});

    expect(onTimeChange.called).to.equal(false)
  });


});

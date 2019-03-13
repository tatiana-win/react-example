import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import PhoneNumberComponent from '../../../components/PhoneNumberComponent';
import VehicleParamComponent from './VehicleParamComponent';
import FilterAddressComponent from './FilterAddressComponent';
import TimeComponent from './TimeComponent';
import {fillTimeSuggestions} from '../../../utils/datetimeHelper';

/**
 * Construct search filter component
 */
export default class SearchFilterComponent extends PureComponent {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);

    const now = new Date();
    const afterHour = new Date();
    afterHour.setHours(afterHour.getHours() + 1);

    let datesFrom = fillTimeSuggestions(now);
    let datesTo = fillTimeSuggestions(afterHour, true);

    /**
     * @type {object} state
     * @property {{id:string, name: string}[]} initialDatesTo
     * @property {{id:string, name: string}[]} datesTo
     * @property {{id:string, name: string}[]} datesFrom
     * @property {string} startTime
     * @property {string} endTime
     */
    this.state = {
      startTime: datesFrom[0].text || '',
      endTime: '',
      initialDatesTo: datesTo,
      datesFrom,
      datesTo
    };
  }

  componentDidMount() {
    this.props.setTimeStart(this.state.datesFrom[0].value);
  }

  /**
   * Set new value of time start
   * @param {string} newValue
   */
  handleStartTimeChange = (newValue) => {
    this.setState({startTime: newValue});

    let startTime = this.state.datesFrom.find(value => value.text === newValue);
    if (startTime) {
      this.props.setTimeStart(startTime.value);
      let startTimeMoment = moment(startTime.value);
      let endTime = this.state.datesTo.find(value => value.text === this.state.endTime);

      let datesTo = this.state.initialDatesTo.filter(date => moment(date.value).isAfter(startTimeMoment));

      this.setState({datesTo});

      if (endTime && moment(endTime.value).isBefore(startTimeMoment)) {
        this.props.setTimeEnd('');
        this.setState({endTime: ''});
      }
    }
  };

  /**
   * Set new value of time end
   * @param {string} newValue
   */
  handleEndTimeChange = (newValue) => {
    this.setState({endTime: newValue});

    let endTime = this.state.datesTo.find(value => value.text === newValue);
    if (endTime) {
      this.props.setTimeEnd(endTime.value);
    }
  };

  /**
   * Handle time start blur
   */
  handleStartTimeBlur = /* istanbul ignore next */ () => {
    let startTime = this.state.datesFrom.find(value => value.text === this.state.startTime);
    if (!startTime) {
      this.props.setTimeStart('');
      this.setState({startTime: ''});
    }
  };

  /**
   * Handle time end blur
   */
  handleEndTimeBlur = /* istanbul ignore next */ () => {
    let endTime = this.state.datesTo.find(value => value.text === this.state.endTime);
    if (!endTime) {
      this.props.setTimeEnd('');
      this.setState({endTime: ''});
    }
  };

  /**
   * Handle key down in car number field
   * @param {Event} e
   */
  handleNumberKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.search()
    }
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {

    const {
      setCustomerPhone, setDriverPhone, setCarNumber, setColor, setBrand, colors, brands, streets, publicPlaces,
      setStreet, setPublicPlace, setHouse, togglePublicPlace, filter, setTimeStart, setTimeEnd, search
    } = this.props;
    
    return (
      <div className="search__filter">

        <div className="search__left-column">

          <div className="search__client">
            <PhoneNumberComponent
              value={filter.customerPhone}
              valueChanged={setCustomerPhone}
              onSubmit={search}
            />
          </div>

          <div className="search__departure">

            <FilterAddressComponent
              section="departure"
              streetPlaceHolder="Откуда"
              streets={streets}
              publicPlaces={publicPlaces}
              setHouse={setHouse}
              setStreet={setStreet}
              setPublicPlace={setPublicPlace}
              togglePublicPlace={togglePublicPlace}
              isPublicPlace={filter.departure.isPublicPlace}
              onSubmit={search}
            />
          </div>

          <FilterAddressComponent
            section="destination"
            streetPlaceHolder="Куда"
            streets={streets}
            publicPlaces={publicPlaces}
            setHouse={setHouse}
            setStreet={setStreet}
            setPublicPlace={setPublicPlace}
            togglePublicPlace={togglePublicPlace}
            isPublicPlace={filter.destination.isPublicPlace}
            onSubmit={search}
          />
        </div>

        <div className="search__right-column">
          <div className="search__driver">

            <div className="search__row">

              <div className="search__form-field">
                <VehicleParamComponent
                  setParam={setColor}
                  values={colors}
                  onSubmit={search}
                  placeholder="Цвет"
                />
              </div>

              <div className="search__form-field">
                <input
                  type="text"
                  onChange={(e) => setCarNumber(e.target.value)}
                  placeholder="Номер"
                  className="search__number"
                  onKeyDown={this.handleNumberKeyDown}
                />
              </div>

              <div className="search__form-field">
                <VehicleParamComponent
                  values={brands}
                  setParam={setBrand}
                  onSubmit={search}
                  placeholder="Марка"
                />
              </div>

            </div>

            <div className="search__row">
              <div className="search__form-field">
                <PhoneNumberComponent
                  value={filter.vehicle.driverPhone}
                  valueChanged={setDriverPhone}
                  onSubmit={search}
                />
              </div>
            </div>

          </div>

          <div className="search__form-field">
            <span className="search__label">с</span>
            <TimeComponent
              dates={this.state.datesFrom}
              setTime={setTimeStart}
              currentTime={this.state.startTime}
              onTimeChange={this.handleStartTimeChange}
              onTimeBlur={this.handleStartTimeBlur}
              onSubmit={search}
            />
          </div>

          <div className="search__form-field">
            <span className="search__label">по</span>
            <TimeComponent
              dates={this.state.datesTo}
              setTime={setTimeEnd}
              currentTime={this.state.endTime}
              onTimeChange={this.handleEndTimeChange}
              onTimeBlur={this.handleEndTimeBlur}
              onSubmit={search}
            />
          </div>

          <button
            className="search__button"
            onClick={search}
          >
            Найти
          </button>

        </div>
      </div>
    )
  }
}

/**
 * @type {Object} propTypes
 * @property {function} setCustomerPhone
 * @property {function} setDriverPhone
 * @property {function} setCarNumber
 * @property {function} setColor
 * @property {function} setBrand
 * @property {function} setStreet
 * @property {function} setPublicPlace
 * @property {function} setHouse
 * @property {function} togglePublicPlace
 * @property {{id:string, name:string}[]} colors
 * @property {{id:string, name:string}[]} brands
 * @property {{id:string, name:string}[]} streets
 * @property {{id:string, name:string}[]} publicPlaces
 * @property {function} setTimeStart
 * @property {function} setTimeEnd
 * @property {function} search
 * @property {Filter} filter
 */
SearchFilterComponent.propTypes = {
  setCustomerPhone: PropTypes.func,
  setDriverPhone: PropTypes.func,
  setCarNumber: PropTypes.func,
  setColor: PropTypes.func,
  setBrand: PropTypes.func,
  setStreet: PropTypes.func,
  setPublicPlace: PropTypes.func,
  setHouse: PropTypes.func,
  togglePublicPlace: PropTypes.func,
  colors: PropTypes.array,
  brands: PropTypes.array,
  streets: PropTypes.array,
  publicPlaces: PropTypes.array,
  filter: PropTypes.object,
  setTimeStart: PropTypes.func,
  setTimeEnd: PropTypes.func,
  search: PropTypes.func
};

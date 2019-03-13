import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import AutoSuggestComponent from 'react-autosuggest';

import {getAutocompleteRegexp} from '../../../utils/autocomplete';
import SETTINGS from '../../../settings';

/**
 * Construct address component
 */
export default class FilterAddressComponent extends PureComponent {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);

    /**
     * @type {object} state
     * @property {{id:string, name: string}[]} streetSuggestions
     * @property {string} street
     * @property {{id:string, name: string}[]} publicPlaceSuggestions
     * @property {string} publicPlace
     * @property {string} house
     * @property {boolean} isStreetChosen
     * @property {boolean} isPublicPlaceChosen
     */
    this.state = {
      streetSuggestions: [],
      street: '',
      publicPlace: '',
      publicPlaceSuggestions: [],
      house: '',
      isStreetChosen: false,
      isPublicPlaceChosen: false
    };

  }

  /**
   * save newPublicPlace value
   * @param {Event} e
   * @param {string} newValue
   */
  _publicPlaceChanged = (e, {newValue}) => {
    this.setState({isPublicPlaceChosen: false});
    this.setState({publicPlace: newValue});
  };

  /**
   * set publicPlaces suggestions
   * @param {string} value
   */
  handlePublicPlacesFetchRequested = ({value}) => {
    setTimeout(() => {
      if (value === this.state.publicPlace) {
        const inputValue = value.trim().toLowerCase();
        let matcher = getAutocompleteRegexp(inputValue);
        let publicPlaceSuggestions = this.props.publicPlaces.filter(possibleValue => matcher.test(possibleValue.name));

        this.setState({publicPlaceSuggestions});
      }
    }, SETTINGS.search.inputDebounce);
  };

  /**
   * clear suggestions
   */
  handlePublicPlacesClearRequested = () => {
    this.setState({isPublicPlaceChosen: true});
    this.setState({publicPlaceSuggestions: []});
    this.props.setPublicPlace(this.state.publicPlace, this.props.section);
  };

  /**
   * handle public place field blur
   * @private
   */
  _onPublicPlaceBlur = /* istanbul ignore next */ () => {
    this.props.setPublicPlace(this.state.publicPlace, this.props.section);
  };

  /**
   * set streets suggestions
   * @param {string} value
   */
  handleStreetsFetchRequested = ({value}) => {
    setTimeout(() => {
      if (value === this.state.street) {
        const inputValue = value.trim().toLowerCase();
        let matcher = getAutocompleteRegexp(inputValue);
        let streetSuggestions = this.props.streets.filter(possibleValue => matcher.test(possibleValue.name));

        this.setState({streetSuggestions});
      }
    }, SETTINGS.search.inputDebounce);
  };

  /**
   * clear suggestions
   */
  handleStreetsClearRequested = () => {
    this.setState({isStreetChosen: true});
    this.setState({streetSuggestions: []});
    this.props.setStreet(this.state.street, this.props.section);
  };

  /**
   * save newStreet value
   * @param {Event} e
   * @param {string} newValue
   * @private
   */
  _streetChanged = (e, {newValue}) => {
    this.setState({isStreetChosen: false});
    this.setState({street: newValue});
  };

  /**
   * handle street field blur
   * @private
   */
  _onStreetBlur = /* istanbul ignore next */ () => {
    this.props.setStreet(this.state.street, this.props.section);
  };

  /**
   * @param {{id:string, name:string}} suggestion
   * @return {string}
   * @private
   */
  _getValue(suggestion) {
    /* istanbul ignore next */
    return suggestion.name;
  }

  /**
   * @param {{id:string, name:string}} suggestion
   * @return {XML}
   * @private
   */
  _renderValue(suggestion) {
    /* istanbul ignore next */
    return (
      <span>{suggestion.name}</span>
    );
  }

  /**
   * save new value of house
   * @param {Event} e
   */
  handleHouseChanged = (e) => {
    this.setState({house: e.target.value});
    this.props.setHouse(e.target.value, this.props.section)
  };

  /**
   * Handle key down
   * @param {Event} e
   */
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.onSubmit();
    }
  };

  /**
   * Handle key down in street input
   * @param {Event} e
   */
  handleStreetKeyDown = /* istanbul ignore next */ (e) => {
    if (e.keyCode === 13 && this.state.isStreetChosen) {
      this.props.onSubmit();
    }
  };

  /**
   * Handle key down in public place input
   * @param {Event} e
   */
  handlePublicPlaceKeyDown = /* istanbul ignore next */ (e) => {
    if (e.keyCode === 13 && this.state.isPublicPlaceChosen) {
      this.props.onSubmit();
    }
  };

  render() {

    const {togglePublicPlace, isPublicPlace, section, streetPlaceHolder} = this.props;

    const streetInputProps = {};
    const publicPlaceInputProps = {};
    streetInputProps.onChange = this._streetChanged;
    streetInputProps.value = this.state.street;
    streetInputProps.onBlur = this._onStreetBlur;
    streetInputProps.placeholder = streetPlaceHolder;
    streetInputProps.onKeyDown = this.handleStreetKeyDown;

    publicPlaceInputProps.onChange = this._publicPlaceChanged;
    publicPlaceInputProps.value = this.state.publicPlace;
    publicPlaceInputProps.onBlur = this._onPublicPlaceBlur;
    publicPlaceInputProps.placeholder = 'Общественное место';
    publicPlaceInputProps.onKeyDown = this.handlePublicPlaceKeyDown;

    return (
      <div className="search__address">

        <button
          className="search__toggle"
          onClick={() => togglePublicPlace(!isPublicPlace, section)}
        >
          <span className={isPublicPlace ? "search__place-icon--active" : "search__place-icon"} />
        </button>

        {isPublicPlace &&
        <div className="search__public-place">
          <AutoSuggestComponent
            inputProps={publicPlaceInputProps}
            suggestions={this.state.publicPlaceSuggestions}
            onSuggestionsFetchRequested={this.handlePublicPlacesFetchRequested}
            onSuggestionsClearRequested={this.handlePublicPlacesClearRequested}
            getSuggestionValue={this._getValue}
            renderSuggestion={this._renderValue}
          />
        </div>
        }

        {!isPublicPlace &&
        <div>
          <div className="search__street">
            <AutoSuggestComponent
              inputProps={streetInputProps}
              suggestions={this.state.streetSuggestions}
              onSuggestionsFetchRequested={this.handleStreetsFetchRequested}
              onSuggestionsClearRequested={this.handleStreetsClearRequested}
              getSuggestionValue={this._getValue}
              renderSuggestion={this._renderValue}
            />
          </div>
          <input
            type="text"
            className="search__house"
            placeholder="Дом"
            onChange={this.handleHouseChanged}
            value={this.state.house}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        }

      </div>
    )
  }
}

/**
 * @type {Object} propTypes
 * @property {function} setStreet
 * @property {function} setPublicPlace
 * @property {function} setHouse
 * @property {function} togglePublicPlace
 * @property {{id:string, name:string}[]} streets
 * @property {{id:string, name:string}[]} publicPlaces
 * @property {boolean} isPublicPlace
 * @property {string} section - 'departure' or 'destination'
 * @property {string} streetPlaceHolder
 * @property {function} onSubmit - function called when enter is pressed
 */
FilterAddressComponent.propTypes = {
  setStreet: PropTypes.func,
  setPublicPlace: PropTypes.func,
  setHouse: PropTypes.func,
  togglePublicPlace: PropTypes.func,
  streets: PropTypes.array,
  publicPlaces: PropTypes.array,
  isPublicPlace: PropTypes.bool,
  section: PropTypes.string,
  streetPlaceHolder: PropTypes.string,
  onSubmit: PropTypes.func
};
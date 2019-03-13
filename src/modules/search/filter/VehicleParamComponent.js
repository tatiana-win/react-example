import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import SelectAutoSuggestComponent from '../../../components/SelectAutoSuggestComponent';
import {getAutocompleteRegexp} from '../../../utils/autocomplete';

/**
 * Construct autosuggest with brands
 */
export default class VehicleParamComponent extends PureComponent {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);

    /**
     * @type {object} state
     * @property {{id:string, name: string}[]} suggestions
     * @property {string} value
     * @property {boolean} isChosen
     */
    this.state = {
      suggestions: props.values,
      value: '',
      isChosen: false
    };
  }

  /**
   * set suggestions
   * @param {string} value
   */
  handleFetchRequested = ({value}) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let matcher = getAutocompleteRegexp(inputValue);

    let existingValue = this.props.values.find(val => val.name === this.state.value);
    let suggestions = (existingValue || inputLength === 0) ? this.props.values : this.props.values.filter(possibleValue => matcher.test(possibleValue.name));

    this.setState({suggestions});
  };

  /**
   * clear suggestions
   */
  handleClearRequested = /* istanbul ignore next */  () =>  {
    this.setState({isChosen: true});
    this.setState({suggestions: []});

    let value = this.props.values.find(val => val.name === this.state.value);
    if (value) {
      this.props.setParam(value.name);
    }
  };

  /**
   * save new value
   * @param {Event} e
   * @param {string} newValue
   * @private
   */
  _valueChanged = (e, {newValue}) => {
    this.setState({isChosen: false});
    this.setState({value: newValue});
  };

  /**
   *
   * @param {{id:string, name:string}} suggestion
   * @return {string}
   * @private
   */
  _getValue(suggestion) {
    /* istanbul ignore next */
    return suggestion.name;
  }

  /**
   *
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
   * handle field blur
   * @private
   */
  _onBlur = /* istanbul ignore next */ ()  => {
    let value = this.props.values.find(val => val.name === this.state.value);
    if (value) {
      this.props.setParam(value.name);
    } else {
      this.props.setParam('');
      this.setState({value: ''});
    }
  };

  /**
   * Handle key down in input
   * @param {Event} e
   */
  handleKeyDown = /* istanbul ignore next */ (e) => {
    let existingValue = this.props.values.find(val => val.name === this.state.value);
    if (e.keyCode === 13 && existingValue && this.state.isChosen) {
      this.props.onSubmit();
    } else if (e.keyCode === 13 && !existingValue) {
      this._setFirstSuggestion();
    } else if (e.keyCode === 8 && existingValue) {
      this.setState({value: '', suggestions: this.props.values});
    }
  };

  /**
   * Set first suggestion for value
   * @private
   */
  _setFirstSuggestion = /* istanbul ignore next */ () => {
    let firstSuggestion = this.state.suggestions.length ? this.state.suggestions[0] : '';

    if (firstSuggestion) {
      this.setState({value: firstSuggestion.name});
      this.setState({isChosen: true});
      this.props.setParam(firstSuggestion.name);
    }
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {

    const {placeholder} = this.props;

    const inputProps = {};
    inputProps.onChange = this._valueChanged;
    inputProps.value = this.state.value;
    inputProps.onBlur = this._onBlur;
    inputProps.placeholder = placeholder;
    inputProps.onKeyDown = this.handleKeyDown;

    return (
      <div className="search__brand">
        <SelectAutoSuggestComponent
          inputProps={inputProps}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleFetchRequested}
          onSuggestionsClearRequested={this.handleClearRequested}
          getSuggestionValue={this._getValue}
          renderSuggestion={this._renderValue}
        />
      </div>
    )
  }
}

/**
 * @type {Object} propTypes
 * @property {function} setParam - function to save vehicle param filter
 * @property {function} onSubmit - function called when enter is pressed
 * @property {{id:string, name: string}[]} values - values dictionary
 * @property {string} placeholder - placeholder for input field
 */
VehicleParamComponent.propTypes = {
  setParam: PropTypes.func,
  values: PropTypes.array,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string
};

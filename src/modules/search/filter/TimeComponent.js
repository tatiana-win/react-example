import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import SelectAutoSuggestComponent from '../../../components/SelectAutoSuggestComponent';
import {getAutocompleteRegexp} from '../../../utils/autocomplete';

/**
 * Construct autosuggest with dates
 */
export default class TimeComponent extends PureComponent {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props);

    /**
     * @type {object} state
     * @property {{value:Date, text: string}[]} timeSuggestions
     * @property {string} time
     * @property {boolean} isChosen
     */
    
    this.state = {
      timeSuggestions: props.dates,
      isChosen: false
    };
  }

  /**
   * set dates suggestions
   * @param {string} value
   */
  handleTimesFetchRequested = ({value}) => {
    let existingTime = this.props.dates.find(value => value.text === this.props.currentTime);
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let matcher = getAutocompleteRegexp(inputValue);
    let timeSuggestions = inputLength === 0 || existingTime ? this.props.dates : this.props.dates.filter(possibleValue => matcher.test(possibleValue.text));

    this.setState({timeSuggestions});
  };

  /**
   * clear suggestions
   */
  handleTimesClearRequested = /* istanbul ignore next */ () => {
    this.setState({timeSuggestions: []});
    this.setState({isChosen: true});
  };

  /**
   * save newTime value
   * @param {Event} e
   * @param {string} newValue
   * @private
   */
  _timeChanged = (e, {newValue}) => {
    this.setState({isChosen: false});
    this.props.onTimeChange(newValue);
  };

  /**
   * Handle key down in input
   * @param {Event} e
   */
  handleKeyDown = /* istanbul ignore next */ (e) => {
    let existingTime = this.props.dates.find(value => value.text === this.props.currentTime);
    if (e.keyCode === 8 && existingTime) {
      this.props.setTime('');
      this.props.onTimeChange('');
    } else if (e.keyCode === 13 && existingTime && this.state.isChosen) {
      this.props.onSubmit();
    } else if (e.keyCode === 13 && !existingTime) {
      this._setFirstSuggestion();
    }
  };

  /**
   * Set first suggestion for time
   * @private
   */
  _setFirstSuggestion = /* istanbul ignore next */ () => {
    let firstSuggestion = this.state.timeSuggestions.length ? this.state.timeSuggestions[0] : '';

    if (firstSuggestion) {
      this.props.setTime(firstSuggestion.text);
      this.props.onTimeChange(firstSuggestion.text);
      this.setState({isChosen: true});
    }
  };

  /**
   *
   * @param {{id:string, text:string}} suggestion
   * @return {string}
   * @private
   */
  _getTimeValue(suggestion) {
    /* istanbul ignore next */
    return suggestion.text;
  }

  /**
   *
   * @param {{id:string, text:string}} suggestion
   * @return {XML}
   * @private
   */
  _renderTime(suggestion) {
    /* istanbul ignore next */
    return (
      <span>{suggestion.text}</span>
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {

    const {currentTime, onTimeBlur} = this.props;

    const timeInputProps = {};
    timeInputProps.onChange = this._timeChanged;
    timeInputProps.value = currentTime;
    timeInputProps.onBlur = onTimeBlur;
    timeInputProps.placeholder = 'Время';
    timeInputProps.onKeyDown = this.handleKeyDown;

    return (
      <div className="search__time">
        <SelectAutoSuggestComponent
          inputProps={timeInputProps}
          suggestions={this.state.timeSuggestions}
          onSuggestionsFetchRequested={this.handleTimesFetchRequested}
          onSuggestionsClearRequested={this.handleTimesClearRequested}
          getSuggestionValue={this._getTimeValue}
          renderSuggestion={this._renderTime}
        />
      </div>
    )
  }
}

/**
 * @type {Object} propTypes
 * @property {function} setTime - function to save vehicle time filter
 * @property {function} onTimeBlur
 * @property {function} onTimeChange
 * @property {function} onSubmit
 * @property {{id:string, name: string}[]} dates - dates array
 * @property {string} currentTime
 */
TimeComponent.propTypes = {
  setTime: PropTypes.func,
  dates: PropTypes.array,
  currentTime: PropTypes.string,
  onTimeChange: PropTypes.func,
  onTimeBlur: PropTypes.func,
  onSubmit: PropTypes.func
};

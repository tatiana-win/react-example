import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import SearchFilterComponent from './SearchFilterComponent';
import * as SearchActions from '../SearchActions';
import * as LayoutActions from '../../layout/LayoutActions';
import {MESSAGES} from '../../../constants';

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    colors: state.shared.dictionaries.colors,
    brands: state.shared.dictionaries.brands,
    streets: state.shared.dictionaries.streets,
    publicPlaces: state.shared.dictionaries.publicPlaces,
    filter: state.search.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCustomerPhone: /* istanbul ignore next */ (phone) => {
      dispatch(SearchActions.setFilterField('customerPhone', phone));
    },
    setDriverPhone: /* istanbul ignore next */ (phone) => {
      dispatch(SearchActions.setFilterField('driverPhone', phone, 'vehicle'));
    },
    setCarNumber: (number) => {
      dispatch(SearchActions.setFilterField('number', number, 'vehicle'));
    },
    setColor: /* istanbul ignore next */ (color) => {
      dispatch(SearchActions.setFilterField('color', color, 'vehicle'));
    },
    setBrand: /* istanbul ignore next */ (brand) => {
      dispatch(SearchActions.setFilterField('brand', brand, 'vehicle'));
    },
    setHouse: (house, section) => {
      dispatch(SearchActions.setFilterField('house', house, section));
    },
    setStreet: /* istanbul ignore next */ (street, section) => {
      dispatch(SearchActions.setFilterField('street', street, section));
    },
    setPublicPlace: /* istanbul ignore next */ (publicPlace, section) => {
      dispatch(SearchActions.setFilterField('publicPlace', publicPlace, section));
    },
    togglePublicPlace: (newValue, section) => {
      dispatch(SearchActions.setFilterField('isPublicPlace', newValue, section));
    },
    setTimeStart: (newValue) => {
      dispatch(SearchActions.setFilterField('startTime', newValue));
    },
    setTimeEnd: /* istanbul ignore next */ (newValue) => {
      dispatch(SearchActions.setFilterField('endTime', newValue));
    },
    dispatch
  }
}

function mergeProps(stateProps, dispatchProps) {
  const {filter} = stateProps;
  const {dispatch} = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    search: /* istanbul ignore next */ () => {
        dispatch(LayoutActions.startLoading());

        dispatch(SearchActions.search(filter))
            .then((response) => {
                dispatch(SearchActions.setResults(response));
            })
            .catch(() => {
                dispatch(LayoutActions.openInfoModal({
                    messages: [MESSAGES.searchError],
                    title: MESSAGES.error
                }));
            })
            .always(() => {
                dispatch(LayoutActions.stopLoading());
            })
    }
  }
}

class SearchFilterContainer extends PureComponent {

  render() {

    return (
      <SearchFilterComponent {...this.props} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchFilterContainer);

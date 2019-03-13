import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import SearchTableContainer from './table/SearchTableContainer';
import SearchFilterContainer from './filter/SearchFilterContainer';

export default class SearchComponent extends PureComponent {

  componentDidMount() {
    this.props.isNotEditOrder();
  }

  render() {

    return (
      <div className="search">
        <SearchFilterContainer />
        <SearchTableContainer />
      </div>
    )
  }
}

/**
 * @type {Object} propTypes
 * @property {function} isNotEditOrder - function to set flat that operator is not editing order
 */
SearchComponent.propTypes = {
  isNotEditOrder: PropTypes.func
};

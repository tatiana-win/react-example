import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import SearchTableRowComponent from './SearchTableRowComponent';

export default class SearchTableComponent extends PureComponent {

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {

    const {searchResults} = this.props;

    return (
      <div>
        <div className="search__table-header">

          <div className="search__column-date">
              <span>Дата</span>
          </div>

          <div className="search__column-auto">
            <span>Авто</span>
          </div>

          <div className="search__column-phone">
            <span>Номер водителя</span>
          </div>

          <div className="search__column-from">
            <span>Откуда</span>
          </div>

          <div className="search__column-to">
            <span>Куда</span>
          </div>

        </div>

        <div className="search__list">
          <div className="search__list-scrolled">
              {searchResults.map((order, index) => {
                return (
                  <SearchTableRowComponent
                    key={index}
                    order={order}
                  />)
              })}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * @type {Object} propTypes
 * @property {object[]} searchResults
 */
SearchTableComponent.propTypes = {
  searchResults: PropTypes.array
};
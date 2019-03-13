import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default class SearchTableRowComponent extends PureComponent {

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {

    const {order} = this.props;

    return (
    <Link
      to={`/orders/${order.id}`}
      className="search__table-row"
    >

        <div className="search__item">

          <div className="search__item-date">
            order.startOrderTime
          </div>

          <div className="search__item-auto">
            {order.vehicle.number &&
            <span>{order.vehicle.brand} №{order.vehicle.number}</span>
            }
          </div>

          <div className="search__item-phone">
            <span>{order.vehicle.driverPhone}</span>
          </div>

          <div className="search__item-from">
            <span>{order.departureAddress}</span>
          </div>

          <div className="search__item-to">
            <span>{order.destinationAddress}</span>
          </div>
        </div>

    </Link>

    )
  }
}

/**
 * @type {Object} propTypes
 * @property {object} order
 */
SearchTableRowComponent.propTypes = {
  order: PropTypes.object
};

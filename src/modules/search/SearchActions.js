import {
  FILTER_FIELD_SET,
  RESULT_SET,
  SEARCH_CLEAR
} from './ActionTypes';

import {
  SOCKET_API,
  SEARCH_REQ
} from '../../middlewares/SocketConstants';

import {formatSearchFilter} from '../../utils/formatters';
import {rideMapper} from '../../utils/mappers';

/**
 * Set field of filter
 * @param {string} field - field name
 * @param {*} value
 * @param {string} section - can be 'vehicle', 'departure', 'destination'
 * @return {{type:string, payload: {section: string, field: string, value: *}}}
 */
export function setFilterField(field, value, section = '') {
  return {
    type: FILTER_FIELD_SET,
    payload: {
      section, field, value
    }
  }
}

/**
 *
 * @param {Filter} filter
 */
export function search(filter) {
  let data = formatSearchFilter(filter);

  return dispatch => {
    return dispatch({
      [SOCKET_API]: {
        type: SEARCH_REQ
      },
      payload: data,
      meta: {
        socket: window.config.wsEndpoint
      }
    });
  }
}

/**
 * set search results
 * @param {Object} results
 * @return {*}
 */
export function setResults(results) {
  let rides = results.orders || [];

  let parsedResults = rides.map(rideMapper);

  return dispatch => {
    dispatch({
      type: RESULT_SET,
      payload: parsedResults
    })
  }
}

/**
 * @return {{type: string}}
 */
export function clearSearch() {
  return {
    type: SEARCH_CLEAR
  }
}
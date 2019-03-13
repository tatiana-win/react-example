/**
 * @typedef {Object} VehicleFilter
 * @property {string} brand
 * @property {string} color
 * @property {string} number
 * @property {string} driverPhone
 */

/**
 * @typedef {Object} AddressFilter
 * @property {boolean} isPublicPlace
 * @property {string} publicPlace
 * @property {string} house
 * @property {string} street
 */

/**
 * @typedef {Object} Filter
 * @property {string} customerPhone
 * @property {VehicleFilter} vehicle
 * @property {AddressFilter} departure
 * @property {AddressFilter} destination
 * @property {Date} startTime
 * @property {Date} endTime
 */

/**
 * @typedef {Object} SearchResult
 * @property {string} destinationAddress
 * @property {string} departureAddress
 * @property {Date} startOrderTime
 * @property {{brandId: string, number: string}} vehicle
 * @property {string} id
 */

/**
 * @typedef {Object} SearchState
 * @property {Filter} filter
 * @property {SearchResult[]} results
 */

import {EMPTY_PHONE} from '../../constants';
import {
  RESULT_SET,
  FILTER_FIELD_SET,
  SEARCH_CLEAR
} from './ActionTypes';

const initialState = {
  filter: {
    customerPhone: EMPTY_PHONE,
    vehicle: {
      brand: '',
      color: '',
      number: '',
      driverPhone: EMPTY_PHONE
    },
    departure: {
      isPublicPlace: false,
      publicPlace: '',
      house: '',
      street: ''
    },
    destination: {
      isPublicPlace: false,
      publicPlace: '',
      house: '',
      street: ''
    },
    startTime: '',
    endTime: ''
  },
  results: []
};

/**
 * @param {SearchState} state
 * @param {{type: string, payload: Object}} [action]
 * @return {SearchState}
 */
export function search(state = {...initialState}, action) {
  switch (action.type) {
    case RESULT_SET:
      return {
        ...state,
        results: action.payload
      };

    case FILTER_FIELD_SET:
      if (action.payload.section) {
        return {
          ...state,
          filter: {
            ...state.filter,
            [action.payload.section]: {
              ...state.filter[action.payload.section],
              [action.payload.field]: action.payload.value
            }
          }
        }
      } else {
        return {
          ...state,
          filter: {
            ...state.filter,
            [action.payload.field]: action.payload.value
          }
        }
      }

    case SEARCH_CLEAR:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
import {expect} from 'chai';

import {
  FILTER_FIELD_SET,
  RESULT_SET
} from '../../../src/modules/search/ActionTypes';
import {search} from '../../../src/modules/search/SearchReducer';
import {EMPTY_PHONE} from '../../../src/constants';

describe('search_reducer', () => {

  describe('FILTER_FIELD_SET', () => {

    it('should set value 112 in house field in destination section', () => {
      const section = 'destination';
      const field = 'house';
      const value = '112';
      const action = {
        type: FILTER_FIELD_SET,
        payload: {
          section,
          field,
          value
        }
      };

      const nextState = search(undefined, action);
      expect(nextState).to.deep.equal({
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
            house: '112',
            street: ''
          },
          startTime: '',
          endTime: ''
        },
        results: []
      });
    });

    it('should set value red in color field in vehicle section', () => {
      const section = 'vehicle';
      const field = 'color';
      const value = 'red';
      const action = {
        type: FILTER_FIELD_SET,
        payload: {
          section,
          field,
          value
        }
      };

      const nextState = search(undefined, action);
      expect(nextState).to.deep.equal({
        filter: {
          customerPhone: EMPTY_PHONE,
          vehicle: {
            brand: '',
            color: 'red',
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
      });
    });

    it('should set value 5th avenue in street field in departure section', () => {
      const section = 'departure';
      const field = 'street';
      const value = '5th avenue';
      const action = {
        type: FILTER_FIELD_SET,
        payload: {
          section,
          field,
          value
        }
      };

      const nextState = search(undefined, action);
      expect(nextState).to.deep.equal({
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
            street: '5th avenue'
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
        
      });
    });

    it('should set +7(938)342-3453 in client phone field', () => {
      const field = 'customerPhone';
      const value = '+7(938)342-3453';
      const action = {
        type: FILTER_FIELD_SET,
        payload: {
          field,
          value
        }
      };

      const nextState = search(undefined, action);
      expect(nextState).to.deep.equal({
        filter: {
          customerPhone: '+7(938)342-3453',
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
        
      });
    });

    it('should set Date(2017, 2, 13, 2, 0, 0) in start time', () => {
      const field = 'startTime';
      const value = new Date(2017, 2, 13, 2, 0, 0);
      const action = {
        type: FILTER_FIELD_SET,
        payload: {
          field,
          value
        }
      };

      const nextState = search(undefined, action);
      expect(nextState).to.deep.equal({
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
          startTime: new Date(2017, 2, 13, 2, 0, 0),
          endTime: ''
        },
        results: []
        
      });
    });

    it('should set Date(2017, 5, 22, 3, 0, 0) in end time', () => {
      const field = 'endTime';
      const value = new Date(2017, 5, 22, 3, 0, 0);
      const action = {
        type: FILTER_FIELD_SET,
        payload: {
          field,
          value
        }
      };

      const nextState = search(undefined, action);
      expect(nextState).to.deep.equal({
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
          endTime: new Date(2017, 5, 22, 3, 0, 0)
        },
        results: []
        
      });
    });
  });

  describe('RESULT_SET', () => {
    it('should set array results', () => {
      const results = [{
        id: 'order1',
        destination: {},
        departure: {},
        client: 'Client1'
      }, {
        id: 'order2',
        destination: {},
        departure: {},
        client: 'Client2'
      }];

      const action = {
        type: RESULT_SET,
        payload: results
      };

      const nextState = search(undefined, action);
      expect(nextState).to.deep.equal({
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
        results: [{
          id: 'order1',
          destination: {},
          departure: {},
          client: 'Client1'
        }, {
          id: 'order2',
          destination: {},
          departure: {},
          client: 'Client2'
        }],
        
      });
    });
  });

});

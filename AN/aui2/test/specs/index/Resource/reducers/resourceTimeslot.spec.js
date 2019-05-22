import {
  FETCH_RENTAL_BLOCK_SUCCESS,
  FETCH_DEFINED_DATE_RANGE_SUCCESS
} from 'index/Resource/actions/resourceTimeslot';
import reducer from 'index/Resource/reducers/resourceTimeslot';

const defaultStates = {
  rentalBlockMap: {},
  definedDateRangeMap: {}
}

describe('index/Resource/reducers/resourceTimeslot.js', () => {
  test('has expect default state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(defaultStates);
  });

  test('FETCH_RENTAL_BLOCK_SUCCESS save rental blocks correctly', () => {
    const rentalBlocks = [{
      "id" : 2,
      "name" : "9:00 AM to 12:00 PM",
      "selected" : false,
      "parent_id" : 6
    }, {
      "id" : 3,
      "name" : "8:00 PM to 9:00 PM",
      "selected" : false,
      "parent_id" : 6
    }, {
      "id" : 5,
      "name" : "1:20 PM to 2:50 PM",
      "selected" : false,
      "parent_id" : 6
    }, {
      "id" : 7,
      "name" : "4:06 PM to 6:00 PM",
      "selected" : false,
      "parent_id" : 6
    }];

    const state = reducer(undefined, {
      type: FETCH_RENTAL_BLOCK_SUCCESS,
      payload: {
        body: {
          items: rentalBlocks.concat([rentalBlocks[0]])
        }
      }
    });

    expect(state.rentalBlockMap[6]).toEqual(rentalBlocks);
  });

  test('FETCH_DEFINED_DATE_RANGE_SUCCESS save defined date ranges correctly', () => {
    const dateRanges4 = [{
      "id" : 3,
      "name" : "2016 Jun 01 to 2016 Jun 03",
      "selected" : false,
      "parent_id" : 4
    }, {
      "id" : 8,
      "name" : "2016 Jun 10 to 2016 Jun 13",
      "selected" : false,
      "parent_id" : 4
    }, {
      "id" : 1,
      "name" : "2016 Jun 23 to 2016 Jun 24",
      "selected" : false,
      "parent_id" : 4
    }];

    const dateRanges1 = [{
      "id" : 9,
      "name" : "2016 Jun 05 to 2016 Jun 07",
      "selected" : false,
      "parent_id" : 1
    }, {
      "id" : 4,
      "name" : "2016 Jun 16 to 2016 Jun 20",
      "selected" : false,
      "parent_id" : 1
    }];

    const items = dateRanges1.concat(dateRanges4).concat([dateRanges1[0]]);

    const state = reducer(undefined, {
      type: FETCH_DEFINED_DATE_RANGE_SUCCESS,
      payload: { body: { items } }
    });

    expect(state.definedDateRangeMap[1]).toEqual(dateRanges1);
    expect(state.definedDateRangeMap[4]).toEqual(dateRanges4);
  });
});

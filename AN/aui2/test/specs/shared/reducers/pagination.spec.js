/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { is, fromJS } from 'immutable';
import pagination from 'shared/reducers/pagination';
import {
  INIT_PAGINATIONS,
  SHOW_MORE_RECURRING_FEES
} from 'shared/actions/pagination';

const expectedInitialState = fromJS({
  paginations:fromJS([])
});

describe('shared -> reducers -> pagination', () => {
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, pagination(undefined, {}))).toBe(true);
  });

  it('Should init paginations successfully', () => {
    const payload = {
      paginations: [
        {
          "current": 1,
          "pageCount": 100,
          "isLastPage": true,
          "remaining": -90,
          "paginationId": 23522,
          "total": 10
        }
      ]
    };

    const state = pagination(undefined, {
      type: INIT_PAGINATIONS,
      payload
    });

    expect(state.get('paginations')).toEqual(fromJS(payload.paginations));
  });

  it('Should set paginations successfully', () => {
    const initState = fromJS({
      paginations:fromJS( [
        {
          "current": 1,
          "pageCount": 3,
          "isLastPage": true,
          "remaining": -90,
          "paginationId": 23522,
          "total": 10
        },
        {
          "current": 1,
          "pageCount": 2,
          "isLastPage": true,
          "remaining": -90,
          "paginationId": 23523,
          "total": 12
        }
      ])
    });

    const payload = {
      currentPage: 2,
      paginationId:23523,
      isLastPage:false,
      remaining:10
    }

    const state = pagination(initState, {
      type: SHOW_MORE_RECURRING_FEES,
      payload
    });
   const paginations = state.get('paginations').toJS();
   const p = paginations.find(p=>p.paginationId==payload.paginationId);

    expect(p.current).toEqual(payload.currentPage);
    expect(p.isLastPage).toEqual(payload.isLastPage);
    expect(p.remaining).toEqual(payload.remaining);
  });
});

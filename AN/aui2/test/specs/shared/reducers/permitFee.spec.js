/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

import { is, fromJS } from 'immutable';
import permitFeeReducer from 'shared/reducers/permitFee';
import {
  FETCH_PERMIT_FEE_SUCCESS,
  DECORATE_FACILITY
} from 'shared/actions/permitFee';

const expectedInitialState = fromJS({
  eventFee: fromJS({}),
  facilityFees: fromJS([]),
  subTotal: 0,
  taxes: [],
  total: 0,
  description: '',
  amountPaid: 0,
  dueNow: 0,
  refundAmount: 0,
  allFacilities: fromJS({})
});

describe('shared -> reducers -> permitFee', () => {
  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, permitFeeReducer(undefined, {}))).toBe(true);
  });

  it('Should update date success after fetch permit fee', () => {
    const allowAddFee = false;
    const allowEditFee = false;
    const allowDeleteFee = true;
    const reservationFee = {
      allowAddFee,
      allowEditFee,
      allowDeleteFee,
      feeSummary: {
        subTotal: 127.5,
        taxes: [{
          name: 'Tax8',
          amount: 12.75
        }],
        total: 170.53,
        amountPaid: 10,
        dueNow: 20,
        refundAmount: 30
      },
      eventFee: {
        eventId: 0,
        facilityFees: [{
          facilityId: 36,
          transactionId: 0,
          facilityName: 'Gym 1',
          scheduleFees: [],
          additionalFees: {}
        }]
      }
    };
    const state = permitFeeReducer(undefined, {
      type: FETCH_PERMIT_FEE_SUCCESS,
      payload: {
        body: {
          reservation_fee: reservationFee
        }
      }
    });

    expect(state.get('eventFee').toJS()).toEqual({
      eventId: 0
    });
    expect(state.get('facilityFees').toJS()).toEqual(reservationFee.eventFee.facilityFees);
    expect(state.get('subTotal')).toEqual(reservationFee.feeSummary.subTotal);
    expect(state.get('taxes').toJS()).toEqual(reservationFee.feeSummary.taxes);
    expect(state.get('total')).toEqual(reservationFee.feeSummary.total);
    expect(state.get('amountPaid')).toEqual(reservationFee.feeSummary.amountPaid);
    expect(state.get('dueNow')).toEqual(reservationFee.feeSummary.dueNow);
    expect(state.get('refundAmount')).toEqual(reservationFee.feeSummary.refundAmount);
    expect(state.get('feeActionStatus')).toEqual({
      allowAddFee, allowEditFee, allowDeleteFee
    });
  });

  it('Should format event detail data successfully', () => {
    const payload = {
      eventFee: {
        eventId: 0,
        eventName: 'adsaa',
        permitId: 0
      },
      feeSummary: {
        subTotal: 123,
        tax: []
      },
      eventIndex: 0
    };

    const state = permitFeeReducer(undefined, {
      type: DECORATE_FACILITY,
      payload
    });

    expect(Object.keys(state.get('allFacilities').toJS())).toEqual(['event_0']);
  });
});

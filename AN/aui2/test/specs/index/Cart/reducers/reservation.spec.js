import { fromJS } from 'immutable';
import reducer from 'index/Cart/reducers/reservation';
import {
  FETCH_RESERVATION_SUCCESS,
  RESERVATION_CHECK_OUT_SUCCESS,
  RESERVATION_CHECK_OUT_FAILURE
} from 'index/Cart/actions/reservation';

describe('index/cart/reducers/reservation', () => {
  const initialState = fromJS({
    reservationFees: [],
    subTotal: null,
    transactionFee: null,
    total: null,
    checkout: false
  });

  it('FETCH_RESERVATION_SUCCESS should works fine', function () {
    const body = {
      cart: {
        total_amount: 374.96,
        reservation_fees: [{
          facility_fees: [{
            facility_id: 36,
            facility_name: 'Gym 1',
            facility_schedules: [],
            facility_amount: 107.00,
            facility_detail_fees: [{
              facility_charge_id: 13,
              charge_name: 'Administrative Fee',
              quantity: 1,
              unit_fee: 107.00,
              abbrev_unit_of_measure: 'ea',
              amount: 107.00,
              is_percentage_discount: false
            }]
          }, {
            facility_id: 48,
            facility_name: 'Gym 2',
            facility_schedules: [],
            facility_amount: 107.00,
            facility_detail_fees: [{
              facility_charge_id: 16,
              charge_name: 'Gym Booking Deposit',
              quantity: 1,
              unit_fee: 11.00,
              abbrev_unit_of_measure: 'ea',
              amount: 11.00,
              is_percentage_discount: false
            }, {
              facility_charge_id: 14,
              charge_name: 'Faciltiy_per hour',
              quantity: 1,
              unit_fee: 16.00,
              abbrev_unit_of_measure: '/ hr',
              amount: 16.00,
              is_percentage_discount: false
            }, {
              facility_charge_id: 17,
              charge_name: 'Gym Fee',
              quantity: 1,
              unit_fee: 21.00,
              abbrev_unit_of_measure: 'ea',
              amount: 21.00,
              is_percentage_discount: false
            }]
          }],
          sub_total: 155.00,
          taxes: [{
            name: 'Tax1',
            amount: 2.10
          }, {
            name: 'Tax2',
            amount: 0
          }, {
            name: 'Tax3',
            amount: 0
          }, {
            name: 'Tax4',
            amount: 0
          }, {
            name: 'Tax5',
            amount: 0
          }, {
            name: 'Tax6',
            amount: 0
          }, {
            name: 'Tax7',
            amount: 0
          }, {
            name: 'Tax8',
            amount: 0
          }],
          total: 164.96,
          description: 'Flynn Party Reservation 1'
        }],
        transaction_fee: 17.86
      }
    };
    const state = reducer(initialState, {
      type: FETCH_RESERVATION_SUCCESS,
      payload: {body}
    }).toJS();

    expect(state.reservationFees).toHaveLength(1);
    expect(state.subTotal).toEqual(164.96);
    expect(state.transactionFee).toEqual(17.86);
    expect(state.total).toEqual(374.96);
  });

  it('RESERVATION_CHECK_OUT_SUCCESS should works fine', function () {
    let state = reducer(initialState, {
      type: RESERVATION_CHECK_OUT_SUCCESS
    }).toJS();
    expect(state.checkout).toBe(true);
  });

  it('RESERVATION_CHECK_OUT_FAILURE should works fine', function () {
    let state = reducer(initialState, {
      type: RESERVATION_CHECK_OUT_FAILURE
    }).toJS();
    expect(state.checkout).toBe(false);
  });
});

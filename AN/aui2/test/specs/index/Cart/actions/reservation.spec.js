import _ from 'lodash';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/Cart/actions/reservation';
import breadcrumbJSON from 'json/BreadCrumb/breadCrumb.json';

describe('index/cart/actions/reservation', () => {
  let store = null;
  const cartJSON = {
    total_amount: 374.96,
    reservation_fees: [{
      facility_fees: [
        {
          facility_id: 36,
          facility_name: 'Gym 1',
          center_name:'AC_Center3',
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
        },
        {
          facility_id: 48,
          facility_name: 'Gym 2',
          center_name:'',
          facility_schedules: [],
          facility_amount: 107.00,
          facility_detail_fees: [
            {
              facility_charge_id: 16,
              charge_name: 'Gym Booking Deposit',
              quantity: 1,
              unit_fee: 11.00,
              abbrev_unit_of_measure: 'ea',
              amount: 11.00,
              is_percentage_discount: false
            },
            {
              facility_charge_id: 14,
              charge_name: 'Faciltiy_per hour',
              quantity: 1,
              unit_fee: 16.00,
              abbrev_unit_of_measure: '/ hr',
              amount: 16.00,
              is_percentage_discount: false
            },
            {
              facility_charge_id: 17,
              charge_name: 'Gym Fee',
              quantity: 1,
              unit_fee: 21.00,
              abbrev_unit_of_measure: 'ea',
              amount: 21.00,
              is_percentage_discount: false
            }
          ]
        }
      ],
      sub_total: 155.00,
      taxes: [
        {
          name: 'Tax1',
          amount: 2.10
        },
        {
          name: 'Tax2',
          amount: 0
        },
        {
          name: 'Tax3',
          amount: 0
        },
        {
          name: 'Tax4',
          amount: 0
        },
        {
          name: 'Tax5',
          amount: 0
        },
        {
          name: 'Tax6',
          amount: 0
        },
        {
          name: 'Tax7',
          amount: 0
        },
        {
          name: 'Tax8',
          amount: 0
        }
      ],
      total: 164.96,
      description: 'Flynn Party Reservation 1'
    }],
    transaction_fee: 17.86
  };

  beforeEach(function () {
    const mockStore = configureStore(middlewares);
    store = mockStore({
      initialData: {
        batchID: 0,
        receiptID: 1
      }
    });
  });

  afterEach(function () {
    store.clearActions();
  });

  it('fetchReservationCart should works fine', (done)=> {
    const { FETCH_RESERVATION_SUCCESS, fetchReservationCart } = actions;

    return store.dispatch(fetchReservationCart())
      .then(({payload:{headers, body:{cart}}})=> {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(_.some(storeActions, ['type', FETCH_RESERVATION_SUCCESS])).toBe(true);

        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');


        expect(cart).toEqual(cartJSON);

        done();
      });
  });

  it('deleteReservationCart should works fine', (done)=> {
    const { FETCH_RESERVATION_SUCCESS, deleteReservationCart } = actions;

    return store.dispatch(deleteReservationCart())
      .then(({ payload: { headers, body } })=> {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(_.some(storeActions, ['type', FETCH_RESERVATION_SUCCESS])).toBe(true);

        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(breadcrumbJSON.body);

        done();
      });
  });

  it('reservationCheckOut should works fine', (done)=> {
    const { RESERVATION_CHECK_OUT_SUCCESS, RESERVATION_CHECK_OUT_FAILURE, reservationCheckOut } = actions;
    const result = {
      result: 'success'
    };

    return store.dispatch(reservationCheckOut())
      .then(({payload:{headers, body}})=> {
        const storeActions = store.getActions();

        expect(Array.isArray(storeActions)).toBeTruthy();
        expect(storeActions.length).toBeGreaterThanOrEqual(2);
        expect(_.some(storeActions, ['type', RESERVATION_CHECK_OUT_SUCCESS])).toBe(true);

        expect(headers.response_code).toBe('0000');
        expect(headers.response_message).toBe('Successful');
        expect(body).toEqual(result);

        done();
      });
  });
});

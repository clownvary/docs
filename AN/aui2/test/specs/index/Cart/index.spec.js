import React from 'react';
import { fromJS } from 'immutable';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Error from 'shared/components/Error';
import BreadCrumb from 'shared/components/BreadCrumb';
import Reservation from 'index/Cart/components/Reservation';
import Cart from 'index/Cart';

jest.mock('shared/components/Error', () => 'Error');
jest.mock('shared/components/BreadCrumb', () => 'BreadCrumb');
jest.mock('index/Cart/components/Reservation', () => 'Reservation');

const reservation = fromJS({
  "reservationFees": [{
    "facility_fees": [{
      "facility_id": 36,
      "facility_name": "Gym 1",
      "facility_schedules": [],
      "facility_amount": 107,
      "facility_detail_fees": [{
        "facility_charge_id": 13,
        "charge_name": "Administrative Fee",
        "quantity": 1,
        "unit_fee": 107,
        "abbrev_unit_of_measure": "ea",
        "amount": 107,
        "is_percentage_discount": false
      }]
    }, {
      "facility_id": 48,
      "facility_name": "Gym 2",
      "facility_schedules": [],
      "facility_amount": 107,
      "facility_detail_fees": [{
        "facility_charge_id": 16,
        "charge_name": "Gym Booking Deposit",
        "quantity": 1,
        "unit_fee": 11,
        "abbrev_unit_of_measure": "ea",
        "amount": 11,
        "is_percentage_discount": false
      }]
    }],
    "sub_total": 155,
    "taxes": [{
      "name": "Tax1",
      "amount": 2.1
    }, {
      "name": "Tax2",
      "amount": 0
    }],
    "total": 164.96,
    "description": "Flynn Party Reservation 1"
  }],
  "isLoadedData": true,
  "subTotal": 164.96,
  "transactionFee": 17.86,
  "total": 374.96,
  "checkout": false
});
const breadCrumb = fromJS({
  "batchID": "1111111",
  "receiptID": "2222222",
  "data": []
});
const error = fromJS({
  list: [],
  systemErrors: [],
  businessErrors: []
});
const initialData = {
  isOutOfWorkflow: false
};
const props = {
  reservation,
  breadCrumb,
  error
};

describe('index/Cart', () => {
  test('component and initialization works fine', () => {
    const mockStore = configureStore(middlewares);
    const store = mockStore({ helpLink: fromJS({ data: {} }), initialData });
    const component = mount(<Cart {...props} />,
      { context: { store } });

    expect(component).toHaveLength(1);
    expect(component.find(Error)).toHaveLength(1);
    expect(component.find(BreadCrumb)).toHaveLength(0);
    expect(component.find(Reservation)).toHaveLength(1);
  });


  test('component and initialization works fine in none-static mode', () => {
    const mockStore = configureStore(middlewares);
    const store = mockStore({ helpLink: fromJS({ data: {} }), initialData });
    __STATIC__ = false;
    const component = mount(<Cart {...props} />,
      { context: { store } });

    expect(component).toHaveLength(1);
    expect(component.find(Error)).toHaveLength(1);
    expect(component.find(BreadCrumb)).toHaveLength(1);
    expect(component.find(Reservation)).toHaveLength(1);
  });
});

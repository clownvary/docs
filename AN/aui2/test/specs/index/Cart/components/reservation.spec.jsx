import React from 'react';
import { fromJS } from 'immutable';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Alert from 'shared/components/Alert';
import Reservation from 'index/Cart/components/Reservation';
import { ReservationList } from 'index/Cart/components/Reservation/reservationList';
import ReservationDetail from 'index/Cart/components/Reservation/reservationDetail';

jest.mock('shared/actions/cashSummarySheet', () => ({
  fetchCashSummarySheetAction: jest.fn(),
  addCashSummarySheetCallBackAction: jest.fn((callback) => {
    callback();
  })
}));

jest.mock('index/Cart//actions/reservation', () => ({
  reservationCheckOut: jest.fn(),
  fetchReservationCart: jest.fn(),
  deleteReservationCart: jest.fn(() => new Promise((resolve) => {
    resolve();
  }))
}));

jest.mock('react-base-ui/lib/services/dialog',()=>({
  confirm:jest.fn().mockReturnValue(Promise.resolve(true))
}));

const mockStore = configureStore();
const initialData = {
  batchID: 0,
  receiptEntryID: 0
}
const initStore = mockStore({
  cashSummarySheet: fromJS({
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'h:mm a',
    data: {
      display: false,
      site_name: '',
      callback: null,
      workstation_name: '',
      canSubmit: true,
      selectedCSS: null,
      enable_css_confirmation: 'false',
      shouldDisplay: false,
      finished: false,
      floatAmount: null,
      earliest_opened_date: '',
      css_prompt_type: 0,
      css_list: [],
      float_amount: 0,
      enable_float_amount_confirmation: 'false',
      disabled_float_amount: 'false',
      selectedMode: 0
    }
  }),
  initialData
});

const setup = (props, store) => mount(<Reservation {...props} />, { context: { store } });

describe('index/Cart/components/Reservation', () => {
  it('ReservationList should be rendered correctly', () => {
    const state = {
      description: 'Reservation 1',
      total: 164.96,
      facility_fees: [],
      taxes: [{
        amount: 2.1
      }]
    };
    const redirectHandle = jest.fn();
    const showWaringAlertHandle = jest.fn();

    const wrapper = shallow(<ReservationList
      facility={state} redirect={redirectHandle} showWaringAlert={showWaringAlertHandle} initialData={initialData}
    />);
    const dom = wrapper.find('.reservation-item');

    expect(dom).toHaveLength(1);
    expect(dom.find('.summary .name').html()).toBe('<div class="afx-col afx-xl-9-12 name">Reservation 1</div>');
    expect(dom.find('.summary .align-right').html()).toBe('<div class="afx-col afx-xl-3-12 align-right">$164.96</div>');

    const actions = dom.find('.action-group .action');
    expect(actions).toHaveLength(2);

    const action1 = actions.at(0);
    expect(action1.html()).toBe(
      '<span class="action" title="Add another booking to this reservation"><i class="icon icon-calendar-add-m"></i>Modify booking</span>'
    );
    action1.simulate('click');
    expect(redirectHandle.mock.calls.length).toBe(1);

    const action2 = actions.at(1);
    expect(action2.html()).toBe(
      '<span class="action" title="Delete this reservation"><i class="icon icon-trash"></i>Delete</span>'
    );
    action2.simulate('click');
    expect(showWaringAlertHandle).toHaveBeenCalledTimes(1);
  });

  it('ReservationList taxTotal equal to 0 should be rendered correctly', () => {
    const state = {
      description: 'Reservation 1',
      total: 164.96,
      facility_fees: [],
      taxes: []
    };
    const redirectHandle = jest.fn();
    const showWaringAlertHandle = jest.fn();

    const component = shallow(<ReservationList
      facility={state} redirect={redirectHandle} showWaringAlert={showWaringAlertHandle}
    />);

    expect(component.find('.detail-item').hasClass('u-hidden')).toBe(true);
  });

  it('ReservationDetail should be rendered correctly', () => {
    const state = {
      facility_name: 'facility name',
      facility_amount: 107
    };
    const wrapper = shallow(<ReservationDetail facilityFee={state} />);
    const dom = wrapper.find('.detail-item');

    expect(dom).toHaveLength(1);
    expect(dom.find('.name').first().html()).toBe('<div class="afx-col name detail-item__name">facility name</div>');
    expect(dom.find('.align-right').html()).toBe('<div class="afx-col detail-item__amount align-right">$107.00</div>');
  });


  it('Reservation should be rendered correctly', () => {
    const reservationFees = [{
      facility_fees: [
        {
          facility_id: 36,
          facility_name: 'Gym 1',
          facility_schedules: [],
          facility_amount: 107,
          facility_detail_fees: [
            {
              facility_charge_id: 13,
              charge_name: 'Administrative Fee',
              quantity: 1,
              unit_fee: 107,
              abbrev_unit_of_measure: 'ea',
              amount: 107,
              is_percentage_discount: false
            }
          ]
        },
        {
          facility_id: 48,
          facility_name: 'Gym 2',
          facility_schedules: [],
          facility_amount: 107,
          facility_detail_fees: [
            {
              facility_charge_id: 16,
              charge_name: 'Gym Booking Deposit',
              quantity: 1,
              unit_fee: 11,
              abbrev_unit_of_measure: 'ea',
              amount: 11,
              is_percentage_discount: false
            }
          ]
        }
      ],
      sub_total: 155,
      taxes: [
        {
          name: 'Tax1',
          amount: 2.1
        },
        {
          name: 'Tax2',
          amount: 0
        }
      ],
      total: 164.96,
      description: 'Flynn Party Reservation 1'
    }
    ];

    const initialState = {
      reservationFees,
      subTotal: null,
      transactionFee: null,
      total: null,
      checkout: false,
      isLoadedData: true
    };

    const props = {
      reservation: fromJS(initialState),
      initialData
    };

    const component = setup(props, initStore);

    component.find('.an-page__footer__content button.btn-secondary').simulate('click');
    component.find('.an-page__footer__content button.btn-strong').simulate('click');
    component.find('.link').simulate('click');
    component.find(ReservationList).node.props.showWaringAlert();
    const dom = component.find('.reservation');

    expect(dom).toHaveLength(1);
    expect(dom.find('.reservation-title').text()).toBe('Reservation');
    expect(dom.find('.reservation-header').text()).toBe('TRANSACTION DESCRIPTIONAMOUNT');
    expect(dom.find('.reservation-list')).toHaveLength(1);
    const footer = dom.find('.reservation-footer');
    expect(footer.find('.sub-fee .fee-name')).toHaveLength(1);
    expect(footer.find('.sub-fee .fee-amount')).toHaveLength(1);
    expect(footer.find('.total').text()).toBe('TOTAL');
    expect(footer.find('.total .text-color-strong')).toHaveLength(1);

    const nextState = { ...initialState, checkout: true, reservationFees: [] };

    const nextProps = {
      reservation: fromJS(nextState)
    };

    component.setProps(nextProps);
    expect(component.find('.reservation').hasClass('u-hidden')).toBe(true);

    const nextStateTwo = { ...initialState, checkout: false, transactionFee: 1 };

    const nextPropsTwo = {
      reservation: fromJS(nextStateTwo)
    };
    component.setProps(nextPropsTwo);
    expect(footer.find('.fee-name div').at(1).hasClass('u-hidden')).toBe(false);
  });

  it('Reservation isLoadedData equal to false should be rendered correctly', () => {
    const initialState = {
      reservationFees: [],
      subTotal: null,
      transactionFee: null,
      total: null,
      checkout: false,
      isLoadedData: false
    };

    const props = {
      reservation: fromJS(initialState),
      initialData
    };

    const component = setup(props, initStore);
    expect(component.find('.reservation')).toHaveLength(0);
  });
});

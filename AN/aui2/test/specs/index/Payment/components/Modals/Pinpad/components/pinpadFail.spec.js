import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Button from 'react-base-ui/lib/components/Button';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import PinpadTransactionFail from 'index/Payment/components/Modals/PinPad/components/PinpadTransactionFail';

jest.mock('index/Payment/components/Modals/PinPad/actions/pinpad', () => ({
  updateErrorMessage: jest.fn(),
  gotoNextPage: jest.fn(),
  clearPinpadPays: jest.fn()
}));

jest.mock('index/Payment/components/Modals/PinPad/actions/pinpadFail', () => ({
  showFailActionBtns: jest.fn(),
  cancelCardPayment: jest.fn((params, cancelSuccess, cancelFail) => {
    cancelSuccess();
    cancelFail();
  }),
  cardLeaveBlance: jest.fn((params, nextFunc, callback) => callback('error'))
}));

jest.mock('index/Payment/components/Modals/PinPad/actions/pinpadModal', () => ({
  updateModalTitle: jest.fn(),
  showModal: jest.fn()
}));

describe('index/Payment/components/Modals/PinPad/components/PinpadTransactionFail', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });
  const setup = (store, props) => mount(<PinpadTransactionFail store={store} {...props}/>);

  const props = {
    pinpad: {
      payment: fromJS({
        receiptHeaderId: 1234,
        agentId: 0,
        isRefund: false,
        currentPayIndex: 0,
        promptMessage: "",
        isNewCard: false,
        cardHolderInfo: {
          cardholderZip: null,
          cardholderAddr: null
        },
        pays: [
          {
            ams_account_id: "APD AccountID",
            payment_type_id: 4,
            index: 0,
            payName: "Debit Card",
            amount: "370.00",
            apd_input_type: 1,
            paymentTypeId: 4
          }
        ],
        communicating: false,
        debitCardId: 4,
        companyId: 0,
        customerId: 1,
        apdAppletInfo: {},
        errorMessage: "",
        apdPaymentInfo: {
          isPayerCashCustomer: false,
          hasImmediatePaymentDue: false,
          canCancelApdPayment: true,
          canLeaveBalance: false,
          key: 1,
          committedReceiptId: 22916,
          receiptPaymentId: 20423,
          rno: 1,
          receiptNumber: 1000778.005,
          orderId: "Receipt ID 22916",
          orderDescriptor: "YMCA OF METROPOLITAN LOS ANGELES"
        }
      }),
      pinpadModal: fromJS({
        title: "Processing Transaction",
        shown: true,
        apdInterfaceApplet: {}
      }),
      pinpadFail: fromJS({
        shown: true
      })
    }
  };

  it('component should render correctly', () => {
    const component = setup(store, props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    const payment = props.pinpad.payment.set('isNewCard', true).set('apdPaymentInfo', fromJS({
      canLeaveBalance: true,
      canCancelApdPayment: true
    }));
    const newProps = {
      pinpad: {
        ...props.pinpad,
        payment
      }
    };
    const component = setup(store, newProps);
    expect(component).toBeTruthy();
    const cancelPaymentBtn = component.find(Button).at(0);
    cancelPaymentBtn.simulate('click');

    const payment2 = props.pinpad.payment.set('apdPaymentInfo', fromJS({
      canLeaveBalance: true,
      canCancelApdPayment: false,
      isPayerCashCustomer: false,
      hasImmediatePaymentDue: true
    })).set('isNewCard', false);
    const newProps2 = {
      pinpad: {
        ...props.pinpad,
        payment: payment2
      }
    };
    component.setProps(newProps2);
    const LeaveBalancePaymentBtn = component.find(Button).at(0);
    LeaveBalancePaymentBtn.simulate('click');

    const pinpadFail = props.pinpad.pinpadFail.set('shown', false);
    const newProps3 = {
      pinpad: {
        ...props.pinpad,
        payment: payment2,
        pinpadFail
      }
    }
    component.setProps(newProps3);

    const payment4 = props.pinpad.payment.set('apdPaymentInfo', fromJS({
      canLeaveBalance: true,
      canCancelApdPayment: false,
      isPayerCashCustomer: false,
      hasImmediatePaymentDue: false
    })).set('isNewCard', false);
    const newProps4 = {
      pinpad: {
        ...props.pinpad,
        payment: payment4
      }
    };
    component.setProps(newProps4);
    component.find(Button).at(0).simulate('click');

    const payment5 = props.pinpad.payment.set('apdPaymentInfo', fromJS({
      canLeaveBalance: true,
      canCancelApdPayment: false,
      isPayerCashCustomer: true,
      hasImmediatePaymentDue: false
    })).update('pays', pays => pays.push([{
      ams_account_id: "APD AccountID",
      payment_type_id: 3,
      index: 0,
      payName: "Credit Card",
      amount: "123.00",
      apd_input_type: 1,
      paymentTypeId: 3
    }]));
    const newProps5 = {
      pinpad: {
        ...props.pinpad,
        payment: payment5
      }
    };
    component.setProps(newProps5);
    component.find(Button).at(0).simulate('click');

    const payment6 = props.pinpad.payment.set('apdPaymentInfo', fromJS({
      canLeaveBalance: true,
      canCancelApdPayment: true,
      isPayerCashCustomer: false,
      hasImmediatePaymentDue: false
    })).update('pays', pays => pays.push([{
      ams_account_id: "APD AccountID",
      payment_type_id: 3,
      index: 0,
      payName: "Credit Card",
      amount: "123.00",
      apd_input_type: 1,
      paymentTypeId: 3
    }]));
    const newProps6 = {
      pinpad: {
        ...props.pinpad,
        payment: payment6
      }
    };

    component.setProps(newProps6);
    component.find(Button).at(0).simulate('click');
    component.find(Button).at(1).simulate('click');
  });
});

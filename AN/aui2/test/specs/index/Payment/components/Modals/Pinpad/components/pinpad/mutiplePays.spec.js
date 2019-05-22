import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { MutiplePays } from 'index/Payment/components/Modals/PinPad/components/Pinpad/mutiplePays';
import Pinpad from 'index/Payment/components/Modals/PinPad/components/Pinpad/pinpad';
import PinpadTransactionFail from 'index/Payment/components/Modals/PinPad/components/PinpadTransactionFail';

jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/pinpad', () => 'Pinpad');
jest.mock('index/Payment/components/Modals/PinPad/components/PinpadTransactionFail', () => 'PinpadTransactionFail');

describe('index/Payment/components/Modals/PinPad/components/Pinpad/mutiplePays', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });
  const actions = {
    communicatingWithDevice: jest.fn(),
    updateErrorMessage: jest.fn(),
    updateCurrentPayIndex: jest.fn(),
    showFailActionBtns: jest.fn()
  }
  const setup = (store, props) => mount(<MutiplePays store={store} {...props} {...actions}/>);

  const props = {
    pinpad: {
      pinpadModal: fromJS({
        title: "Processing Transaction",
        shown: true,
        apdInterfaceApplet: {
          APDInputStart: jest.fn()
        }
      }),
      pinpadFail: fromJS({
        shown: false
      }),
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
            payment_type_id: 3,
            index: 0,
            payName: "Credit Card",
            amount: "123.00",
            apd_input_type: 1,
            paymentTypeId: 3,
            errorMessage: 'error occur when swip card by pinpad with Debit Card',
            hasError: true
          },
          {
            ams_account_id: "APD AccountID",
            payment_type_id: 4,
            index: 1,
            payName: "Debit Card",
            amount: "247.00",
            apd_input_type: 1,
            paymentTypeId: 4,
            swipeSuccess: true,
            successInfo: 'Debit Card in xxx 1234',
            hasError: false
          }
        ],
        communicating: false,
        debitCardId: 4,
        companyId: 0,
        customerId: 1,
        apdAppletInfo: {
          device_type_id: 1,
          terminal_location_address: "937 Enterprise Dr",
          device_id: 999888,
          terminal_location_city: "Sacramento",
          terminal_location_state: "CA",
          terminal_location_zip: "95825",
          card_acceptor_name: "YMCA OF METROPOLITAN LOS ANGELES",
          merchant_descriptor: "ActiveNetTrainer",
          merchant_user: "AMS34VbVMSCRealDivId",
          merchant_password: "AMS34VbVMSCRealDivId",
          ams_url: "mstest.active.com",
          ams_port: 443,
          ams_timeout: 100,
          terminal_number: "007",
          usb_port_name: "COM5",
          pinpad_data_entry_timeout: 20,
          pinpad_swipe_card_timeout: 50,
          pinpad_pin_entry_timeout: 40,
          pinpad_device_timeout: 300,
          avs_full_addr: true,
          avs_zip: false,
          write_to_log: "Yes",
          applet_name: "APDInterfaceApplet",
          applets: "codebase=/device-libs/"
        },
        errorMessage: "error occur when swipe card by pinpad",
        apdPaymentInfo: {
          isPayerCashCustomer: false,
          hasImmediatePaymentDue: false,
          canCancelApdPayment: true,
          key: 1,
          committedReceiptId: 22916,
          receiptPaymentId: 20423,
          rno: 1,
          receiptNumber: 1000778.005,
          orderId: "Receipt ID 22916",
          orderDescriptor: "YMCA OF METROPOLITAN LOS ANGELES"
        }
      })
    }
  };

  it('component should render correctly', () => {
    const component = setup(store, props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    jest.useFakeTimers();
    const component = setup(store, props);

    expect(component).toBeTruthy();
    component.find(Pinpad).at(0).simulate('click');
    jest.runAllTimers(100);
    jest.clearAllTimers();
    expect(component.find('.pinpad-mutiple-pays').length).toBe(1);
    expect(component.find('Pinpad').length).toBe(2);

    const payment = props.pinpad.payment.setIn(['pays', 1, 'swipeSuccess'], false);
    const newProps = {
      pinpad: {
        ...props.pinpad,
        payment
      }
    }
    component.setProps(newProps);
    component.find(Pinpad).at(1).simulate('click');

    const payment2 = props.pinpad.payment.set('communicating', true)
      .set('errorMessage', '')
      .setIn(['pays', 1, 'swipeSuccess'], false)
      .setIn(['pays', 1, 'errorMessage'], 'error of payments 2')
      .setIn(['pays', 1, 'hasError'], true);

    const newProps2 = {
      pinpad: {
        ...props.pinpad,
        payment: payment2
      }
    }
    component.setProps(newProps2);
    component.find(Pinpad).at(1).simulate('click');

    const payment3 = props.pinpad.payment.set('errorMessage', '');
    const newProps3 = {
      pinpad: {
        ...props.pinpad,
        payment: payment3
      }
    }
    component.setProps(newProps3);
    component.find(Pinpad).at(1).simulate('click');
    component.find(Pinpad).at(0).simulate('click');
    expect(component.find('.payment-credit-debit-error').length).toBe(0);

    const payment4 = props.pinpad.payment.setIn(['pays', 1, 'swipeSuccess'], true);
    const newProps4 = {
      pinpad: {
        ...props.pinpad,
        payment: payment4
      }
    }
    component.setProps(newProps4);
    component.find(Pinpad).at(1).simulate('click');
    expect(component.find('.payment-credit-debit-error').length).toBe(1);
  });
});

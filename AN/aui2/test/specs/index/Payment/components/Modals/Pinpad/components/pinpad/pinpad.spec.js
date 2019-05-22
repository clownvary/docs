import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { Pinpad } from 'index/Payment/components/Modals/PinPad/components/Pinpad/pinpad';

describe('index/Payment/components/Modals/PinPad/components/Pinpad/pinpad', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });
  const actions = {
    updateErrorMessage: jest.fn(),
    showFailActionBtns: jest.fn(),
    updateModalTitle: jest.fn()
  }
  const setup = (store, props) => mount(<Pinpad store={store} {...props} {...actions}></Pinpad>);

  const payment = {
    webStartServicehelpURL: '',
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
    errorMessage: "pinpad error occur",
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
  };
  const props = {
    pay: {
      ams_account_id: "APD AccountID",
      payment_type_id: 4,
      index: 0,
      payName: "Debit Card",
      amount: "370.00",
      apd_input_type: 1,
      paymentTypeId: 4
    },
    pinpad: {
      payment: fromJS(payment),
      pinpadModal: fromJS({
        title: "Processing Transaction",
        shown: true,
        apdInterfaceApplet: {
          APDInputStart: jest.fn()
        }
      }),
      pinpadFail: fromJS({
        shown: false
      })
    }
  };

  it('component should render correctly', () => {
    const component = setup(store, props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    jest.useFakeTimers();
    const pay = Object.assign({}, props.pay, {
      errorMessage: 'error by pinpad',
      hasError: true,
      actionType: 3,
      className: 'pinpad-class',
      headerHtml: 'xxxx in 2345'
    });
    const newProps = {
      ...props,
      pay,
      children: 'test pinpad'
    };
    const component = setup(store, newProps);
    const serviceHelp = component.find('.service-help');

    expect(component).toBeTruthy();
    expect(serviceHelp.length).toBe(1);
    serviceHelp.at(0).simulate('click');

    const pay2 = Object.assign({}, props.pay, {
      errorMessage: 'error by pinpad',
      hasError: true,
      paymentTypeId: 3
    });
    const newProps2 = {
      ...props,
      pay: pay2,
      children: ''
    };

    component.setProps(newProps2);
    component.find('.payment-pinpad-retry').at(0).simulate('click');
    jest.runAllTimers(100);
    jest.clearAllTimers();
    component.find('.payment-pinpad-retry').at(1).simulate('click');

    const pay3 = Object.assign({}, props.pay, {
      errorMessage: 'error by pinpad',
      hasError: true,
      paymentTypeId: 3
    })
    const newProps3 = {
      ...props,
      pay: pay3,
      pinpad: {
        ...props.pinpad,
        payment: fromJS({
          ...payment,
          isNewCard: true
        })
      },
      children: ''
    }
    component.setProps(newProps3);
    component.find('.payment-pinpad-retry').at(0).simulate('click');
    component.find('.payment-pinpad-retry').at(1).simulate('click');
    expect(component.find('.payment-pinpad-error-wrapper').length).toBe(1);
  });
});

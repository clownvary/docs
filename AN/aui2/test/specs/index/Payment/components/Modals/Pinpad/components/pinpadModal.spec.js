import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { PinpadModal } from 'index/Payment/components/Modals/PinPad/components/PinpadModal';

jest.mock('react-base-ui/lib/components/Modal', () => 'Modal');
jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/mutiplePays', () => 'MutiplePays');
jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/singlePay', () => 'SinglePay');
jest.mock('index/Payment/components/Modals/PinPad/components/Pinpad/applet', () => 'Applet');

describe('index/Payment/components/Modals/PinPad/components/PinpadModal', () => {

  let store;

  beforeEach(() => {
    store = configureStore(middlewares)({});
  });
  const actions = {
    communicatingWithDevice: jest.fn(),
    updateErrorMessage: jest.fn(),
    updateCurrentPayIndex: jest.fn(),
    updatePromptMessage: jest.fn(),
    getAPDServerStatus: jest.fn(),
    processAPDResponse: jest.fn(),
    updateSuccessMessage: jest.fn(),
    processResolveAction: jest.fn(),
    processRejectAction: jest.fn(),
    clearError: jest.fn(),
    addError: jest.fn(),
    showFailActionBtns: jest.fn(),
    updateModalTitle: jest.fn(),
    showModal: jest.fn(),
    setApdInterfaceApplet: jest.fn()
  };
  const resetActions = () => Object.keys(actions).forEach(fn => actions[fn].mockClear());

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
            paymentTypeId: 4,
            errorMessage: 'unknown error',
            hasError: true
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
        errorMessage: "",
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
      }),
      pinpadModal: fromJS({
        title: "Processing Transaction",
        shown: false,
        apdInterfaceApplet: {}
      }),
      pinpadFail: fromJS({
        shown: false
      })
    }
  };
  const setup = (store, props) => mount(<PinpadModal store={store} {...props} {...actions} />);

  beforeEach(() => {
    resetActions();
  });

  it('component should render correctly when hasn`t shown modal', () => {
    const component = setup(store, props);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should render correctly when has show modal and has two payments by pinpad', () => {
    const payment = props.pinpad.payment.update('pays', pays => pays.push([{
      ams_account_id: "APD AccountID",
      payment_type_id: 3,
      index: 0,
      payName: "Credit Card",
      amount: "123.00",
      apd_input_type: 1,
      paymentTypeId: 3
    }]));
    const pinpadModal = props.pinpad.pinpadModal.set('shown', true);
    const newProps = {
      pinpad: {
        ...props.pinpad,
        payment,
        pinpadModal
      }
    };
    const component = setup(store, newProps);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should render correctly when has shown modal and only has one payment', () => {
    const pinpadModal = props.pinpad.pinpadModal.set('shown', true);
    const newProps = {
      pinpad: {
        ...props.pinpad,
        pinpadModal
      }
    };
    const component = setup(store, newProps);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should render correctly when has shown modal and has no payments', () => {
    const payment = props.pinpad.payment.update('pays', pays => pays.splice(0));
    const pinpadModal = props.pinpad.pinpadModal.set('shown', true);
    const newProps = {
      pinpad: {
        ...props.pinpad,
        payment,
        pinpadModal
      }
    };
    const component = setup(store, newProps);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('component should work fine', () => {
    const component = setup(store, props);

    expect(component).toBeTruthy();
    let apdInfo = component.instance().initAndStartAPD();
    apdInfo.methods.updateMessage('message');
    expect(actions.updatePromptMessage).toHaveBeenCalled();
    apdInfo.methods.updateErrMsgAndEnableFailBtns('error message');
    expect(actions.updateErrorMessage).toHaveBeenCalled();
    expect(actions.communicatingWithDevice).toHaveBeenCalledTimes(1);
    expect(actions.showFailActionBtns).toHaveBeenCalled();
    apdInfo.methods.newCardFromAPD({});
    expect(actions.communicatingWithDevice).toHaveBeenCalledTimes(2);
    expect(actions.updateSuccessMessage).toHaveBeenCalled();
    apdInfo.methods.clearPinpad();
    expect(actions.clearError).toHaveBeenCalled();
    expect(actions.addError).toHaveBeenCalled();
    expect(actions.showModal).toHaveBeenCalled();
    expect(actions.updateModalTitle).toHaveBeenCalled();
    expect(actions.showFailActionBtns).toHaveBeenCalled();
    expect(actions.processRejectAction).toHaveBeenCalled();

    __STATIC__ = false;
    const payment = props.pinpad.payment.set('currentPayIndex', 1)
      .set('isNewCard', true)
      .update('pays', pays => pays.push([{
        ams_account_id: "APD AccountID",
        payment_type_id: 3,
        index: 0,
        payName: "Credit Card",
        amount: "123.00",
        apd_input_type: 1,
        paymentTypeId: 3
      }]));
    component.setProps({
      pinpad: {
        ...props.pinpad,
        payment,
        pinpadModal: fromJS({
          shown: true
        })
      }
    });
    resetActions();
    apdInfo = component.instance().initAndStartAPD();
    apdInfo.methods.newCardFromAPD({});
    expect(actions.communicatingWithDevice).toHaveBeenCalled();
    expect(actions.processResolveAction).toHaveBeenCalled();

    __STATIC__ = true;
    const payment2 = payment.set('currentPayIndex', 0);
    const newProps = {
      pinpad: {
        ...props.pinpad,
        payment: payment2,
        pinpadModal: fromJS({
          shown: true
        })
      }
    };
    component.setProps(newProps);
    resetActions();
    apdInfo = component.instance().initAndStartAPD();
    apdInfo.methods.checkAPDServerStatus();
    expect(actions.getAPDServerStatus).toHaveBeenCalled();
    apdInfo.methods.processAPDResponse({});
    expect(actions.processAPDResponse).toHaveBeenCalled();
  });

  it('component should work fine when __STATIC__ is false', () => {
    __STATIC__ = false;
    const component = setup(store, props);
    expect(component).toBeTruthy();
    __STATIC__ = true;
    component.unmount();
  });
});

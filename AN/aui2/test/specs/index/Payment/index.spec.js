import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import { Payment } from 'index/Payment/index';
import PaymentOptions from 'index/Payment/components/PaymentOptions';
import PaymentSummary from 'index/Payment/components/PaymentSummary';
import PaymentFooter from 'index/Payment/components/PaymentFooter';
import Payer from 'index/Payment/components/Payer';
import RefundPayer from 'index/Payment/components/RefundPayer';
import Magtek from 'index/Payment/components/Modals/MagTek';
import PinpadModal from 'index/Payment/components/Modals/PinPad/components/PinpadModal';
import ECheckModal from 'index/Payment/components/Modals/ElectronicCheck';
import Error from 'shared/components/Error';
import HelpLink from 'shared/components/HelpLink';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));
jest.mock('index/Payment/components/PaymentOptions', () => 'PaymentOptions');
jest.mock('index/Payment/components/PaymentSummary', () => 'PaymentSummary');
jest.mock('index/Payment/components/PaymentFooter', () => 'PaymentFooter');
jest.mock('index/Payment/components/Payer', () => 'Payer');
jest.mock('index/Payment/components/RefundPayer', () => 'RefundPayer');
jest.mock('index/Payment/components/Modals/MagTek', () => 'Magtek');
jest.mock('index/Payment/components/Modals/PinPad/components/PinpadModal', () => 'PinpadModal');
jest.mock('index/Payment/components/Modals/ElectronicCheck', () => 'ECheckModal');
jest.mock('shared/components/Error', () => 'Error');
jest.mock('shared/components/HelpLink', () => 'HelpLink');

describe('index/Payment/index', () => {
  const actions = {
    makePayment: jest.fn(),
    showECPAuthDetails: jest.fn(),
    resetUseNewECheckSelectedValue: jest.fn(),
    saveNewECheck: jest.fn(),
    setECheckError: jest.fn(),
    changeECheckAccountType: jest.fn(),
    changeECheckSaveInformation: jest.fn(),
    cancelAction: jest.fn()
  };
  const defaultInitialData = {
    permitID: -1,
    limitPayer: false,
    ccScanWithApdDevice: false,
    ccScanWithMagesafeDevice: false
  };
  const defaultPayment = {
    isRefund: false,
    ecpAuthDetails: {
      shown: false
    },
    paymentPageIndex: 3,
    errors: [],
    permitId: 651
  };
  const breadCrumb = fromJS({
    "batchID": "1111111",
    "receiptID": "2222222",
    "data": []
  });
  const payer = fromJS({
    isPayerBeDropIn: false
  })

  const initProps = (payment = defaultPayment, initialData=defaultInitialData) => ({
    payment: fromJS(payment),
    paymentOptions: {
      eCheck: fromJS({
        eCheckConfig: {},
        eCheckLabel: 'echeckX'
      }),
      options: fromJS({
        data: []
      })
    },
    pinpad: {
      pinpadModal: fromJS({
        shown: false
      })
    },
    paymentSummary: fromJS({
      hasBalance: 200
    }),
    newECheck: fromJS({}),
    error: fromJS({
      businessErrors: []
    }),
    initialData,
    breadCrumb,
    payer
  });

  const setup = (props) => mount(<Payment {...props} {...actions} />);

  it('component should render correctly', () => {
    const component = setup(initProps());
    expect(component.find(PaymentOptions)).toHaveLength(1);
    expect(component.find(PaymentSummary)).toHaveLength(1);
    expect(component.find(PaymentFooter)).toHaveLength(1);
    expect(component.find(Payer)).toHaveLength(1);
    expect(component.find(RefundPayer)).toHaveLength(0);
    expect(component.find(Magtek)).toHaveLength(1);
    expect(component.find(PinpadModal)).toHaveLength(1);
    expect(component.find(ECheckModal)).toHaveLength(1);
    expect(component.find(Error)).toHaveLength(1);
    expect(component.find(HelpLink)).toHaveLength(1);

    component.instance().cancelShowAuthorizationDetails();
    expect(actions.showECPAuthDetails).toHaveBeenCalledTimes(1);
    expect(actions.makePayment).not.toHaveBeenCalled();
    component.instance().cancelShowAuthorizationDetails(true);
    expect(actions.showECPAuthDetails).toHaveBeenCalledTimes(2);
    expect(actions.makePayment).toHaveBeenCalled();
  });

  it('component should render correctly if it\' refund', () => {
    const component = setup(initProps(
      {
        ...defaultPayment,
        isRefund: true
      },
      {
        ...defaultInitialData,
        permitID: 1
      }
    ));

    component.setProps({
      initialData: {
        permitID: 1,
        limitPayer: false
      }
    });

    expect(component.find(Payer)).toHaveLength(0);
    expect(component.find(RefundPayer)).toHaveLength(1);
    expect(component.find('HelpLink').at(0).props().pageName).toEqual('Refund_Payment.jsp');
    const payProps = initProps({ ...defaultPayment, isPaymentActionValid: true }, { ...defaultInitialData, permitID: 1 });
    component.setProps(payProps);
    __STATIC__ = false;
    window.setTabLabel = () => { };
    window.setTabAttr = () => { };
  });

  it('component should render correctly if error happens', () => {
    const props = initProps();
    props.payment = props.payment.update('errors', errors => errors.push({ message: 'payment error' }));
    const component = setup(props);
    expect(component.find('div.error-content')).toHaveLength(1);
    expect(component.find('div.error-content').text()).toEqual('payment error');

    component.setProps({
      payment: props.payment.set('errors', fromJS([{
        message: 'payment warning',
        type: 'warning'
      }])).set('isPaymentActionValid', true).set('isPaymentActionValid', true),
      initialData: {
        permitID: 1,
        limitPayer: false,
        ccScanWithApdDevice: false,
        ccScanWithMagesafeDevice: false
      }
    });
    expect(component.find('div.error-content')).toHaveLength(1);
    expect(component.find('div.error-content').text()).toEqual('payment warning');
  });
});

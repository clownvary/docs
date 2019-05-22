import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { PaymentPlan } from 'index/Payment/components/PaymentOptions/PaymentPlan';
import { paymentPlanPaymentTypes } from 'index/Payment/consts';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import InputDate from 'react-base-ui/lib/components/InputDate';
import PCIIframe from 'react-base-ui/lib/components/PCI';
import resetActions from 'utils/resetActions';
import { exec } from 'child_process';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));
jest.mock('index/Payment/components/PaymentOptions/PaymentPlan/PaymentSchedulesEdit', () => 'PaymentSchedulesEdit');

describe('index/Payment/components/PaymentOptions/PaymentPlan', () => {
  const actions = {
    changePaymentPlanSection: jest.fn(),
    changeAutoPaymentStatus: jest.fn(),
    updateAutoPaymentTypeAndCCExpStatus: jest.fn(),
    changePaymentCard: jest.fn(),
    getBackupPayment: jest.fn(),
    changeECheckAccount: jest.fn(),
    changeECheckRouting: jest.fn(),
    changeECheckAccountType: jest.fn(),
    changeECheckSaveInformation: jest.fn(),
    setECheckError: jest.fn(),
    saveNewECheck: jest.fn(),
    showModalAction: jest.fn(),
    onChange: jest.fn(),
    clearOptionAndPaymentErrs: jest.fn(),
    getIframeUrlAsyncAction: jest.fn(),
    getInstanceAction: jest.fn()
  };

  afterEach(() => {
    resetActions(actions);
  });

  const setup = (props) => mount(<PaymentPlan {...props} />);

  const getProps = (selectedPaymentPlan = 0, selectedAutoPayType = 0, backupPayment, errors, props) => ({
    children: (<span>Payment Plan</span>),
    item: {
      list: [
        { value: '173', name: 'Cash' },
        { value: '172', name: 'Credit' }
      ],
      errors,
      activeVal: '173',
      amount: 500,
      totalBlanceAmount: 0,
      paymentPlanWording: 'PaymentPlanX',
      autoScheduleReadOnly: true,
      showAutoPaymentMethod: true,
      reservationPPs: {
        data: [
          { value: 263, name: 'PaymentPlan #1', description: '#1' },
          { value: 264, name: 'PaymentPlan #2', description: '#2' }
        ],
        selected: selectedPaymentPlan
      },
      frequecys: {
        data: [
          { value: 412, text: 'Weekly' },
          { value: 413, text: 'Every other week' }
        ],
        selected: 413
      },
      numOfPayments: {
        data: [
          { value: 711, text: '1' },
          { value: 712, text: '2' },
          { value: 713, text: '3' }
        ]
      },
      autoPaymentTypes: {
        [paymentPlanPaymentTypes.CREDITCARD]: { id: 193, valid: true, },
        [paymentPlanPaymentTypes.ELECTRONICCHECK]: { id: 194, valid: true },
        selected: selectedAutoPayType
      },
      backupPaymentInfo: backupPayment ? {
        backupPaymentType: 'Backup-Payment-Type',
        backupPaymentCardName: 'Backup-Payment-Card-Name'
      } : {},
      paymentSchedules: [
        { dueDate: '2017-02-01', amount: 150, paid: true },
        { dueDate: '2017-03-01', amount: 150, paid: false }
      ],
      schedulesEdit: {}
    },
    index: 0,
    payer: fromJS({
      params: {
        customerId: 886
      }
    }),
    data: {
      ppAutoCCList: {
        data: [
          { text: 'MasterCard ends in 5454', value: 5454, card_expiration: '12/2017' },
          { text: 'MasterCard ends in 5411', value: 5411, card_expiration: '11/2017' }
        ],
        selected: 5454
      },
      ppAutoEcpList: {
        data: [
          { text: 'Ecp #221', value: 221 },
          { text: 'Ecp #222', value: 222 }
        ],
        selected: 221
      }
    },
    newECheckData: { eCheckLabel: 'ECheckX' },
    creditCardData: { creditCardLabel: 'CreditCardX' },
    ccScanWithApdDevice: true,
    ccScanWithMagesafeDevice: false,
    ...actions,
    ...props
  });

  it('PaymentPlan component should render without error if no selected payment plan', () => {
    const component = setup(getProps(0, 194, true));
    expect(toJson(component)).toMatchSnapshot();
  });

  it('PaymentPlan component should render without error if selected payment plan', () => {
    const component = setup(getProps(264));
    expect(component.find('.pp-schedule-edit-btn-disabled').length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('PaymentPlan component should render when not use device for payment.', () => {
    const props = getProps(264, 193, true, [], {
      ccScanWithApdDevice: false,
      ccScanWithMagesafeDevice: false
    })
    const component = setup(props);
    expect(component.find(PCIIframe).length).toBe(1);
    component.setProps({
      item: Object.assign({}, props.item, {
        amount: 0
      })
    });
    expect(component.find('.paymentplan-details').length).toBe(0);
    expect(component.find('.pp-schedule-edit-btn-disabled').length).toBe(0);

    component.setProps({
      item: Object.assign({}, props.item, {
        amount: 20,
        autoScheduleReadOnly: false
      })
    });
    expect(component.find('.paymentplan-details').length).toBe(1);
    expect(component.find('.pp-schedule-edit-btn-disabled').length).toBe(0);
  });
  it('PaymentPlan component should work fine if no selected payment plan', () => {
    const component = setup(getProps(0, 193, true));

    expect(component).toHaveLength(1);
    expect(component.find('.payment-paymentplan')).toHaveLength(1);
    expect(component.find('.paymentplan-schedule')).toHaveLength(1);
    expect(component.find('.paymentplan-preauthorized-method')).toHaveLength(1);

    const dropdowns = component.find(Dropdown);
    expect(dropdowns).toHaveLength(6);

    dropdowns.at(1).node.props.onChange({ value: 263 });
    expect(actions.changePaymentPlanSection).toHaveBeenCalledTimes(1);

    dropdowns.at(2).node.props.onChange({ value: 413 });
    expect(actions.changePaymentPlanSection).toHaveBeenCalledTimes(1);
    dropdowns.at(2).node.props.onChange({ value: 412 });
    expect(actions.changePaymentPlanSection).toHaveBeenCalledTimes(2);

    dropdowns.at(3).node.props.onChange({ value: 711 });
    expect(actions.changePaymentPlanSection).toHaveBeenCalledTimes(3);

    dropdowns.at(4).node.props.onChange({ value: 5411 });
    expect(actions.changePaymentPlanSection).toHaveBeenCalledTimes(3);

    dropdowns.at(5).node.props.onChange({ value: 222 });
    expect(actions.changePaymentPlanSection).toHaveBeenCalledTimes(3);

    const dateInput = component.find(InputDate);
    dateInput.node.input.value = '2017-03-01';
    dateInput.node.props.onValueChange({ value: '2017-03-01' });
    expect(actions.changePaymentPlanSection).toHaveBeenCalledTimes(4);

    component.find('span.paymenmtplan-schedule-edit-btn').simulate('click');
    expect(actions.showModalAction).toHaveBeenCalled();

    component.find('.paymentplan-method-configuration').find('input[type="checkbox"]').simulate('change');
    expect(actions.changeAutoPaymentStatus).toHaveBeenCalled();

    component.find('.paymentplan-method-cc').find('input[type="radio"]').simulate('change');
    expect(actions.updateAutoPaymentTypeAndCCExpStatus).toHaveBeenCalledTimes(0);

    component.find('.paymentplan-method-ecp').find('input[type="radio"]').simulate('change');
    expect(actions.updateAutoPaymentTypeAndCCExpStatus).toHaveBeenCalledTimes(1);

    component.find('span.payment-backup-action').simulate('click');
    expect(actions.clearOptionAndPaymentErrs).not.toHaveBeenCalled();

    global.__paymentBackupCallback();
    expect(actions.getBackupPayment).toHaveBeenCalled();
  });

  it('PaymentPlan component should work fine if selected payment plan', () => {
    const props = getProps(264, 193);
    const component = setup(props);

    expect(component.find('div.paymentplan-method-cc')).toHaveLength(1);
    expect(component.find('div.paymentplan-method-ecp')).toHaveLength(1);

    component.find('span.paymenmtplan-schedule-edit-btn').simulate('click');
    expect(actions.showModalAction).not.toHaveBeenCalled();

    component.find('span.payment-backup-action').simulate('click');

    component.setProps({
      item: Object.assign({}, props.item, {
        autoPaymentTypes: {
          [paymentPlanPaymentTypes.CREDITCARD]: { id: 193, valid: false, },
          [paymentPlanPaymentTypes.ELECTRONICCHECK]: { id: 194, valid: false },
          selected: 193
        }
      })
    });
    expect(component.find('div.paymentplan-method-cc')).toHaveLength(0);
    expect(component.find('div.paymentplan-method-ecp')).toHaveLength(0);
  });

  it('PaymentPlan component should work fine if auto payment method error occurs and has no payer.', () => {
    const props = getProps(undefined, 193, undefined, [{
      key: 0,
      name: 'paymentMethod',
      message: 'Please select a payment method for the payment plan'
    }]);
    const component = setup(props);
    const dropdowns = component.find(Dropdown);

    expect(component.find('.paymentplan-backup')).toHaveLength(1);
    expect(dropdowns.at(4).node.props.errored).toBeTruthy();
    dropdowns.at(4).node.props.onChange({ value: 222 });
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalled();
    expect(actions.changePaymentCard).toHaveBeenCalled();
    component.setProps({
      payer: fromJS({
        params: {
          customerId: -1
        }
      })
    });
    expect(component.find('.paymentplan-backup')).toHaveLength(0);
    expect(component.find('.paymentplan-method')).toHaveLength(1);
    component.setProps({
      item: Object.assign({}, props.item, {
        showAutoPaymentMethod: false
      })
    });
    expect(component.find('.paymentplan-method')).toHaveLength(0);
  });

  it('PaymentPlan component should work fine if meets error', () => {
    const props = getProps(0, 193, true, [
      { message: 'mock payment plan error', name: '' }
    ]);
    const component = setup(props);

    component.find('.paymentplan-method-configuration').find('input[type="checkbox"]').simulate('change');
    expect(actions.changeAutoPaymentStatus).toHaveBeenCalled();
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(1);

    component.find('.paymentplan-method-ecp').find('input[type="radio"]').simulate('change');
    expect(actions.updateAutoPaymentTypeAndCCExpStatus).toHaveBeenCalledTimes(1);
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(2);

    component.find('span.payment-backup-action').simulate('click');
    global.__paymentBackupCallback();
    expect(actions.getBackupPayment).toHaveBeenCalled();
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(3);

    const dropdowns = component.find(Dropdown);
    expect(dropdowns).toHaveLength(6);

    dropdowns.at(1).node.props.onChange({ value: 263 });
    expect(actions.changePaymentPlanSection).toHaveBeenCalled();
    expect(actions.clearOptionAndPaymentErrs).toHaveBeenCalledTimes(4);
  });
});

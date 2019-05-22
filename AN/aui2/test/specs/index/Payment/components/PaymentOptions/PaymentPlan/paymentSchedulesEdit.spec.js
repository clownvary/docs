import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { PaymentSchedulesEdit } from 'index/Payment/components/PaymentOptions/PaymentPlan/PaymentSchedulesEdit/index';
import frequencyTypes from 'index/Payment/consts/frequencyTypes';
import genSchedules from 'index/Payment/utils/paymentScheduleGeneration';
import Modal from 'react-base-ui/lib/components/Modal';
import InputDate from 'react-base-ui/lib/components/InputDate';
import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

const state = {
  schedulesEdit: {
    showModel: true,
    error: ''
  },
  index: 1,
  paymentPlanAmount: 53.67,
  paymentSchedules: fromJS(genSchedules(
    {
      paymentPlanAmount: 53.67,
      firstPaymentDate: '1900-01-28',
      frequencys: frequencyTypes.EVERY_FOUR_WEEKS,
      numOfPayments: 47,
      paid: 0
    }
  ))
};
const actions = {
  showModalAction: jest.fn(),
  showError: jest.fn(),
  setPaymentSchedule: jest.fn(),
  savePaymentSchedules: jest.fn()
};

const setup = (props = { ...state, ...actions }) => {
  const component = mount(<PaymentSchedulesEdit {...props} />);
  return {
    component,
    instance: component.instance(),
    save: component.find('button').at(1),
    cancel: component.find('button').at(0)
  };
};

describe('index/Payment/components/PaymentOptions/PaymentPlan/paymentSchedulesEdit', () => {
  it('render schedule items with values', () => {
    const props = {
      ...state,
      ...actions
    };

    const { component, save, cancel } = setup(props);
    const container = component.find('.payment-schedule-edit-item');
    expect(container).toHaveLength(47);
    expect(container.get(46).querySelectorAll('input')[0].value).toContain('1903 Aug 09');
    expect(container.get(46).querySelectorAll('input')[1].value).toEqual('1.23');
    save.simulate('click');
    expect(actions.savePaymentSchedules).toHaveBeenCalled();
    cancel.simulate('click');
    expect(actions.showModalAction).toHaveBeenCalled();

    component.find(Modal).prop('onClose')();
    expect(actions.showModalAction.mock.calls).toHaveLength(2);
  });

  it('should show error when amount doesn\'t match', () => {
    const { component, save } = setup({
      ...state,
      ...actions,
      paymentPlanAmount: 50,

    });
    const container = component.find('.payment-schedule-edit-item');
    save.simulate('click');
    expect(actions.showError).toHaveBeenCalled();
  });

  it('should rendered correctly when props changing', () => {
    const { component, instance, save } = setup({
      ...state,
      ...actions,
      paymentPlanAmount: 20,
      paymentSchedules: fromJS([
        { amount: 10, dueDate: 0 },
        { amount: 10, dueDate: 0 }
      ])
    });

    component.setProps({
      schedulesEdit: {
        showModel: false,
        error: 'test-error'
      }
    });
    expect(component.find('ul.only-one-error li').text()).toEqual('test-error');

    component.setProps({
      schedulesEdit: {
        showModel: true,
        error: ''
      }
    });
    expect(instance.state.canSubmit).toBeTruthy();
    save.simulate('click');
    expect(actions.savePaymentSchedules).toHaveBeenCalled();
  });

  it('should work correctly when change amount', () => {
    const { component } = setup({
      ...state,
      ...actions,
      schedulesEdit: {
        showModel: false,
        error: ''
      }
    });
    component.setProps({
      schedulesEdit: {
        showModel: true,
        error: ''
      }
    });

    const amount = component.find(InputNumeric).first();
    amount.prop('onBlur')();
    amount.node.value = 2;
    amount.prop('onBlur')();

    const container = component.find('.payment-schedule-edit-item');
    expect(container.get(0).querySelectorAll('input')[1].value).toEqual('2.00');
    expect(container.get(1).querySelectorAll('input')[1].value).toEqual('1.14');
  });

  it('should show correctly error message if the amount added up is larger than payment plan total.', () => {
    const { component, save } = setup({
      ...state,
      ...actions,
      paymentPlanAmount: 20.02,
      paymentSchedules: fromJS([
        { amount: 80, dueDate: 0 },
        { amount: 0.01, dueDate: 0 }
      ]),
      schedulesEdit: {
        showModel: false,
        error: ''
      }
    });
    component.setProps({
      schedulesEdit: {
        showModel: true,
        error: ''
      }
    });

    save.simulate('click');
    expect(actions.showError).toHaveBeenCalled();

    const errorMsg = actions.showError.mock.calls[2][0];
    expect(
      !!(
        errorMsg &&
        errorMsg.indexOf('$80.01') > 0 &&
        errorMsg.indexOf('$59.99') > 0 &&
        errorMsg.indexOf('Surplus Balance') > 0
      )
    ).toEqual(true);
  });

  it('should show correctly error message if the amount added up is smaller than payment plan total.', () => {
    const { component, save } = setup({
      ...state,
      ...actions,
      paymentPlanAmount: 10.02,
      paymentSchedules: fromJS([
        { amount: 10, dueDate: 0 },
        { amount: 0.01, dueDate: 0 }
      ]),
      schedulesEdit: {
        showModel: false,
        error: ''
      }
    });
    component.setProps({
      schedulesEdit: {
        showModel: true,
        error: ''
      }
    });

    save.simulate('click');
    expect(actions.showError).toHaveBeenCalled();

    const errorMsg = actions.showError.mock.calls[3][0];
    console.log(actions.showError.mock.calls);
    expect(
      !!(
        errorMsg &&
        errorMsg.indexOf('$10.01') > 0 &&
        errorMsg.indexOf('$0.01') > 0 &&
        errorMsg.indexOf('Outstanding Balance') > 0
      )
    ).toEqual(true);
  });

  it('should prevent invalid amount change', () => {
    const { component } = setup();
    const amount = component.find(InputNumeric).first();
    amount.node.value = 0;
    amount.prop('onBlur')();

    const container = component.find('.payment-schedule-edit-item');
    expect(container.get(0).querySelectorAll('input')[1].value).toEqual('1.14');
  });

  it('should work correctly when change date', () => {
    const { component } = setup();
    const date = component.find(InputDate).first();
    date.prop('onValueChange')({ nativeDate: '1903 Aug 01' });

    const container = component.find('.payment-schedule-edit-item');
    expect(container.get(0).querySelectorAll('input')[0].value).toEqual('1903 Aug 01');
  });

  it('should work correctly when set overflow', () => {
    const { component, instance } = setup();
    instance.setOverFlow();
    expect(instance.state.overflow).toBeFalsy();
    expect(instance.state.scrollBarWidth).toEqual(0);

    component.setState({
      overflow: true,
      scrollBarWidth: 10
    });
    expect(component.find('div.afx-right').node.style.paddingRight).toEqual('25px');
    expect(component.find('div.split-line')).toHaveLength(2);
  });
});

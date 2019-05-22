import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import Button from 'react-base-ui/lib/components/Button';
import Input from 'react-base-ui/lib/components/Input';
import Radio from 'react-base-ui/lib/components/Radio';
import Alert from 'shared/components/Alert';
import { Footer } from 'index/ReservationDetail/components/Footer';

const initialData = {
  batchID: '1111111',
  receiptID: '2222222',
  isReservationDetailUpdated: false,
  hasRefundAmount: true
};

const initialState = {
  main: fromJS({
    isPermitDetailsChanged: true
  }),
  footer: fromJS({
    isShouldPay: false
  }),
  initialData,
  breadCrumb: fromJS([{
    url: 'shirly/test'
  }]),
  paymentPlanInformation: {
    nextDueAmount: 11,
    overDueAmount: 3,
    customerId: 3
  }
};

function setup(defaultState) {
  const state = Object.assign({}, initialState, defaultState);

  const actions = {
    redirect: jest.fn(),
    cancelReceiptAndReloadPage: jest.fn(),
    isChangeNeedPay: jest.fn(),
    onClickConfirmChange: jest.fn(),
    handleSubmit: jest.fn(),
    leaveToPaymentPlanAndNext: jest.fn(),
    gotoPaymentOrRefundPage: jest.fn()
  };

  const component = mount(
    <Footer
      {...state}
      {...actions}
    />);
  const instance = component.instance();
  return {
    component,
    ReservationChangeActions: component.find('.reservation-change-actions'),
    Buttons: component.find(Button),
    Radios: component.find(Radio),
    Alerts: component.find(Alert),
    actions,
    instance,
    ...instance
  };
}

describe('index -> ReservationDetail -> components -> Footer', () => {
  it('should render correctly with using correct permit detail changed', () => {
    const {
      component,
      ReservationChangeActions,
      Buttons,
      Radios,
      Alerts,
      actions,
      state,
      instance
    } = setup({
      isPermitHolderBeDropIn: true
    });

    const AlertComponent = Alerts.last();

    expect(ReservationChangeActions.length).toEqual(1);
    expect(Buttons.length).toEqual(4);
    expect(Radios.length).toEqual(0);
    expect(Alerts.length).toEqual(1);
    expect(state.selectedPaymentType).toEqual(1);

    Buttons.at(0).simulate('click');
    expect(instance.state.confirmActionType).toEqual('cancel');
    expect(AlertComponent.prop('title')).toEqual('Cancel Changes');
    expect(AlertComponent.html().indexOf('Changes will not be saved. Are you sure you want to cancel?') > -1).toEqual(true);

    Buttons.at(3).simulate('click');
    expect(actions.cancelReceiptAndReloadPage).toHaveBeenCalled();
    Buttons.at(1).simulate('click');
    expect(actions.handleSubmit).toHaveBeenCalled();

    component.setState({ confirmActionType: 'confirm' });
    expect(AlertComponent.prop('title')).toEqual('Confirm Changes');
    expect(instance.state.confirmActionType).toEqual('confirm');
    expect(component.find(Radio).length).toEqual(2);

    component.find(Radio).at(1).node.props.onChange({ target: { value: '21' } });
    expect(AlertComponent.html().indexOf('Add to payment plan') > -1).toEqual(true);

    AlertComponent.node.props.onClose();
    Buttons.at(2).simulate('click');
    expect(actions.isChangeNeedPay).toHaveBeenCalled();

    component.find(Radio).last().simulate('change');
    Buttons.at(3).simulate('click');
    expect(component.find(Input).length).toEqual(0);

    component.setProps({ isShouldPay: true, main: fromJS({ isPermitDetailsChanged: false }) });
    expect(component.find(Button).length).toEqual(4);

    window.cleanOnLeaving = () => true;
    component.find(Button).at(0).node.props.onClick();
    const nextProps = {
      breadCrumb: fromJS([
        {
          name: 'previous bread',
          url: 'previous'
        },
        {
          name: 'current bread crumb',
          url: 'current'
        }
      ])
    };
    component.setProps(nextProps);
    component.find(Button).at(0).node.props.onClick();
  });

  it('when selectedPaymentType = 1 should work fine', () => {
    const { component, Alerts } = setup();

    const AlertComponent = Alerts.last();
    component.setState({ confirmActionType: 'confirm', selectedPaymentType: 1 });
    component.find(Radio).at(0).node.props.onChange({ target: { value: 1 } });
    AlertComponent.node.props.onConfirm();
  });

  it('when isPermitDetailsChanged = true should work fine', () => {
    const nextState = {
      main: fromJS({
        isPermitDetailsChanged: false
      }),
      footer: fromJS({
        isShouldPay: false
      }),
      initialData: {
        batchID: '1111111',
        receiptID: '2222222',
        isReservationDetailUpdated: false,
        hasRefundAmount: false
      }
    };
    const { component } = setup(nextState);
    expect(component.find('.u-justify-content-end')).toHaveLength(1);
    expect(component.find('.u-justify-content-end').text()).toEqual('Done');
    const nextProps = {
      main: fromJS({
        isPermitDetailsChanged: true
      }),
      footer: fromJS({
        isShouldPay: true
      })
    };
    component.setProps(nextProps);
  });

  it('when isPermitDetailsChanged is false should work fine', () => {
    const nextState = {
      main: fromJS({
        isPermitDetailsChanged: false
      }),
      footer: fromJS({
        isShouldPay: false
      })
    };
    const { component } = setup(nextState);
    component.find('.aaui-flexbox span').at(0).simulate('click');
    const nextProps = {
      main: fromJS({
        isPermitDetailsChanged: true
      }),
      footer: fromJS({
        isShouldPay: true
      })
    };
    component.setProps(nextProps);
  });
});

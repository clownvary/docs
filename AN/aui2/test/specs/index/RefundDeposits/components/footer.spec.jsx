import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Button from 'react-base-ui/lib/components/Button';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import ConnectedFooter, { Footer } from 'index/RefundDeposits/components/Footer';
import { Authority } from 'shared/authorities';

import InputNumeric from 'react-base-ui/lib/components/InputNumeric';

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: jest.fn().mockReturnValue(Promise.resolve())
}));
jest.mock('shared/actions/cancelPermit', () => ({
  confirmCancelWithRefundOrPay: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject())
    .mockReturnValue(Promise.resolve()),
  confirmOnlyCancelPermit: jest.fn()
    .mockReturnValueOnce(Promise.resolve())
    .mockReturnValueOnce(Promise.reject())
    .mockReturnValue(Promise.resolve())
}));

const initialState = {
  totalRefund: 25.01,
  labelTotalRefund: '$25.01',
  fromCancelPermit: false,
  deposits: [
    {
      amount_paid: 5,
      id: 1,
      selected: true
    },
    {
      amount_paid: 10,
      id: 2,
      selected: false
    }
  ],
  rentalFees: [
    {
      amount_paid: 5,
      id: 1,
      selected: false
    },
    {
      amount_paid: 10,
      id: 2,
      selected: true
    }
  ],
  permitWording: 'permit',
  subTotalRefund: 10,
  labelSubTotalRefund: '$10.00',
  refundChargeAmount: '35.01',
  refundChargeDesc: 'Cacellation Fee',
  cancelPermit: false
};

const mockStore = (props) => configureStore(middlewares)(props);

function setup(defaultState = initialState) {
  const state = Object.assign({}, initialState, defaultState);

  const actions = {
    cancelAction: jest.fn(),
    validateAction: jest.fn()
      .mockReturnValueOnce(Promise.resolve())
      .mockReturnValueOnce(Promise.reject())
      .mockReturnValue(Promise.resolve()),
    submitAction: jest.fn(),
    changeCancelPermitAction: jest.fn(),
    updateRefundChargeAmount: jest.fn(),
    updateFeeTaxAndDiscount: jest.fn()
  };

  const component = shallow(
    <Footer
      {...actions}
      {...state}
    />);
  
    const connectedComponent = mount(
      <ConnectedFooter
      {...actions}
      {...state}
      store={mockStore(state)}
    />);

  return {
    component,
    connectedComponent,
    CancelCheckbox: component.find(Checkbox).at(0),
    RefundChargeInput: component.find(InputNumeric).at(0),
    ProceedBtn: component.find('.refund-deposit-footer__proceed').at(0),
    CancelRefundBtn: component.find(Button).at(0),
    actions,
    state
  };
}

describe('index -> Refund -> components -> Footer', () => {
  it('should render correctly when has refund charge.', () => {
    const {
      component,
      connectedComponent,
      CancelCheckbox,
      RefundChargeInput,
      ProceedBtn,
      CancelRefundBtn,
      actions
    } = setup();

    expect(CancelCheckbox.props().checked).toBeFalsy();
    expect(CancelCheckbox.props().disabled).toBeFalsy();
    expect(connectedComponent.text()).toContain('Subtotal to refund');
    expect(RefundChargeInput.props().disabled).toBeFalsy();
    expect(ProceedBtn.props().disabled).toBeFalsy();
    expect(component.find('.total-label').at(0).text()).toContain('REFUND AMOUNT');
    expect(connectedComponent.find(Checkbox).at(0).text()).toEqual('Cancel Permit');
    
    RefundChargeInput.simulate('valueChange', { target: { value: '10.00' } });
    RefundChargeInput.simulate('blur', { target: { value: '35.01' } });
    RefundChargeInput.simulate('blur', { target: { value: '10.00' } });

    expect(actions.updateRefundChargeAmount).toBeCalled();
    expect(component.state('lastValidRefundAmount')).toEqual('10.00');
    expect(actions.updateFeeTaxAndDiscount).toHaveBeenCalled();
    RefundChargeInput.simulate('blur', { target: { value: '12.00' } });
    expect(actions.updateRefundChargeAmount).toHaveBeenCalled();
    CancelCheckbox.simulate('change');
    expect(actions.changeCancelPermitAction).toHaveBeenCalled();

    Authority.init([
      {
        id: "cancelPermit",
        authorityType: "hide",
        name: "Cancel Permit"
      }
    ]);
    component.setProps({
      totalRefund: -10,
      fromCancelPermit: true,
      cancelPermit: true
    })
    expect(component.find(Checkbox).at(0).hasClass('u-hidden')).toBeTruthy();
    expect(component.find('.total-label').at(0).text()).toContain('CHARGE AMOUNT');

    component.find('.refund-deposit-footer__proceed').at(0).simulate('click');

    component.setProps({
      totalRefund: 0,
      fromCancelPermit: false,
      cancelPermit: true,
      deposits: [],
      rentalFees: []
    })
    component.find('.refund-deposit-footer__proceed').at(0).simulate('click');
    component.find('.refund-deposit-footer__proceed').at(0).simulate('click');

    component.setProps({
      totalRefund: 10
    })

    component.find('.refund-deposit-footer__proceed').at(0).simulate('click');
    component.find('.refund-deposit-footer__proceed').at(0).simulate('click');
    component.setProps({
      totalRefund: 0,
      cancelPermit: false
    })
    component.find('.refund-deposit-footer__proceed').at(0).simulate('click');
    component.setProps({
      deposits: [
        {
          amount_paid: 5,
          id: 1,
          selected: true
        }
      ]
    })
    component.find('.refund-deposit-footer__proceed').at(0).simulate('click');
  });
});

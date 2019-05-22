import React from 'react';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import Button from 'react-base-ui/lib/components/Button';
import { PaymentFooter } from 'index/Payment/components/PaymentFooter';
import { submitBtnMap } from 'index/Payment/actions/paymentFooter';
jest.mock('shared/actions/cancelPermit', () => ({
  confirmCancelWithRefundOrPay: jest.fn().mockReturnValueOnce(Promise.resolve()).mockReturnValueOnce(Promise.reject())
}));
jest.mock('index/Payment/store', () => ({
  getState: jest.fn(),
  dispatch: jest.fn()
}));

const payment = {
  "isRefund": false,
  "total": "370.00",
  "successPay": false,
  "paymentPlanAmount": 0,
  "claimDiscountTotal": "10.00",
  "depositFee": "15.00",
  "ecpAuthDetails": {},
  "sourcePageIndex": -1,
  "transactionFee": "5.17",
  "paymentPlanWording": "Payment Plan",
  "isPaymentActionValid": false,
  "errors": [],
  "allowModifyPaymentPlan": false,
  "makeAPaymentReceipts": {
    "permitID": "12"
  },
  "payNow": "370.00",
  "isAllowChangePayerForModifyPaymentPlan": true,
  "resize": 560,
  "minimumPayNowAmount": 95.12,
  "claimTaxTotal": "12.00",
  "remaining": 0,
  "permitId": "12",
  "paymentPageIndex": -1
};
const paymentAction = {
  "paymentActionType": 2,
  "isSelectModifyPaymentPlan": false,
  "isSelectMakeAPayment": false
};
const paymentSummary = {
  hasBalance: true
}
const actions = {
  pay: jest.fn(),
  payActionCache: jest.fn(),
  submitBtnMap: jest.fn(),
  saveModifiedPaymentPlan: jest.fn(),
  redirect: jest.fn(),
  cancelReceiptAsyncAction: jest.fn().mockReturnValue(Promise.resolve())
};

describe('index/Payment/components/PaymentFooter', () => {
  const initialData = {
    receiptEntryID: -1,
    draftReceiptID: -1,
    draftReceiptEntryID: -1,
    permitID: 12,
    batchID: 0,
    receiptID: 1222,
    permitWording: 'Shirly'
  };
  const defaultProps = {
    payment: fromJS(payment),
    paymentAction: fromJS(paymentAction),
    paymentSummary: fromJS(paymentSummary),
    initialData
  };

  let store;

  beforeEach(() => {
    const mockStore = configureStore();
    store = mockStore({
      initialData
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  const setup = (props = defaultProps) => mount(
    <PaymentFooter
      store={store}
      {...props}
      {...actions}
    />
  );

  test('render refund footer correctly, no valid value', () => {
    const component = setup();

    expect(component.find('.payment-footer').length).toEqual(1);
    expect(component.find('Button').length).toEqual(0);
  });

  test('render refund footer correctly, if sourcePageIndex is cartPage index', () => {
    const cartPagePaymentData = Object.assign({}, payment, {
      sourcePageIndex: 4
    });
    const props = {
      payment: fromJS(cartPagePaymentData),
      paymentAction: fromJS(paymentAction),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);
    expect(component.find('Button').length).toEqual(2);

    const backBtn = component.find('Button').at(0);
    const submittBtn = component.find('Button').at(1);
    backBtn.simulate('click');
    submittBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Back');
    expect(submittBtn.node.props.children).toEqual(submitBtnMap.newWorkFlow);

    component.setProps({
      ...props,
      initialData: {
        ...initialData,
        cancelPermit: true
      }
    })

    const payMsg = component.find('Button').at(1).text();
    expect(payMsg).toEqual('Cancel Shirly and Pay');

    const remainingData = Object.assign({}, cartPagePaymentData, {
      remaining: 1
    });
    const props1 = {
      payment: fromJS(remainingData)
    };
    component.setProps(props1);

    component.instance().paynow(1);
    expect(component.instance().back(true)).toBe(false);
  });

  test('render refund footer correctly, if sourcePageIndex is permitDetailPage index and isRefund is false', () => {
    const permitDetailData = Object.assign({}, payment, {
      sourcePageIndex: 2,
      isRefund: false
    });
    const props = {
      payment: fromJS(permitDetailData),
      paymentAction: fromJS(paymentAction),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const backBtn = component.find('Button').at(0);
    const submittBtn = component.find('Button').at(1);
    backBtn.simulate('click');
    submittBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Back');
    expect(submittBtn.node.props.children).toEqual(submitBtnMap.newWorkFlow);

    const remainingData = Object.assign({}, permitDetailData, {
      remaining: 1
    });
    const props1 = {
      payment: fromJS(remainingData)
    };
    component.setProps(props1);
  });

  test('render refund footer correctly, if sourcePageIndex is not set.', () => {
    const permitDetailData = Object.assign({}, payment, {
      isRefund: false
    });
    const props = {
      payment: fromJS(permitDetailData),
      paymentAction: fromJS(paymentAction),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const buttons = component.find('Button');
    expect(buttons.length).toBe(0);
    const backResult = component.instance().back();
    expect(backResult).toEqual(false);
  });

  test('render refund footer correctly, if sourcePageIndex is permitDetailPage index and isRefund is true', () => {
    const permitDetailData = Object.assign({}, payment, {
      sourcePageIndex: 2,
      isRefund: true
    });
    const props = {
      payment: fromJS(permitDetailData),
      paymentAction: fromJS(paymentAction),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const backBtn = component.find('Button').at(0);
    const submittBtn = component.find('Button').at(1);
    backBtn.simulate('click');
    submittBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Back');
    expect(submittBtn.node.props.children).toEqual(submitBtnMap.refund);

    component.setProps({
      ...props,
      initialData: {
        ...initialData,
        cancelPermit: true
      }
    })

    const payMsg = component.find('Button').at(1).text();
    expect(payMsg).toEqual('Cancel Shirly and Refund');

    const remainingData = Object.assign({}, permitDetailData, {
      remaining: 1
    });
    const props1 = {
      payment: fromJS(remainingData)
    };
    component.setProps(props1);
  });

  test('render refund footer correctly, if sourcePageIndex is refundDeposits index, isRefund is true and isSelectModifyPaymentPlan is false', () => {
    const refundDepositsData = Object.assign({}, payment, {
      sourcePageIndex: 6,
      isRefund: true
    });
    const paymentActionData = Object.assign({}, paymentAction, {
      isSelectModifyPaymentPlan: false
    });
    const props = {
      payment: fromJS(refundDepositsData),
      paymentAction: fromJS(paymentActionData),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const backBtn = component.find('Button').at(0);
    const submittBtn = component.find('Button').at(1);
    backBtn.simulate('click');
    submittBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Back');
    expect(submittBtn.node.props.children).toEqual(submitBtnMap.refund);

    const remainingData = Object.assign({}, refundDepositsData, {
      remaining: 1
    });
    const props1 = {
      payment: fromJS(remainingData)
    };
    component.setProps(props1);
  });

  test('render refund footer correctly, if sourcePageIndex is refundDeposits index, isRefund is false and isSelectModifyPaymentPlan is true', () => {
    const refundDepositsData = Object.assign({}, payment, {
      sourcePageIndex: 6,
      isRefund: false
    });
    const paymentActionData = Object.assign({}, paymentAction, {
      isSelectModifyPaymentPlan: true
    });
    const props = {
      payment: fromJS(refundDepositsData),
      paymentAction: fromJS(paymentActionData),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const backBtn = component.find('Button').at(0);
    const submittBtn = component.find('Button').at(1);
    backBtn.simulate('click');
    submittBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Cancel');
    expect(submittBtn.node.props.children).toEqual(submitBtnMap.modifyPaymentPlan);

    const remainingData = Object.assign({}, refundDepositsData, {
      remaining: 1
    });
    const props1 = {
      payment: fromJS(remainingData)
    };
    component.setProps(props1);
  });

  test('render refund footer correctly, if sourcePageIndex is refundDeposits index, isRefund is false and isSelectModifyPaymentPlan is false', () => {
    const refundDepositsData = Object.assign({}, payment, {
      remaining: 1,
      successPay: true,
      sourcePageIndex: 6,
      isRefund: false
    });
    const paymentActionData = Object.assign({}, paymentAction, {
      isSelectModifyPaymentPlan: false,
    });
    const props = {
      payment: fromJS(refundDepositsData),
      paymentAction: fromJS(paymentActionData),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const backBtn = component.find('Button').at(0);
    const submittBtn = component.find('Button').at(1);
    backBtn.simulate('click');
    submittBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Back');
    expect(submittBtn.node.props.children).toEqual(submitBtnMap.modifyPaymentPlan);
  });

  test('render refund footer correctly, if sourcePageIndex is refundDeposits index, isSelectMakeAPayment is true', () => {
    const refundDepositsData = Object.assign({}, payment, {
      sourcePageIndex: 6,
      isRefund: false
    });
    const paymentActionData = Object.assign({}, paymentAction, {
      isSelectModifyPaymentPlan: false,
      isSelectMakeAPayment: true
    });
    const props = {
      payment: fromJS(refundDepositsData),
      paymentAction: fromJS(paymentActionData),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const backBtn = component.find('Button').at(0);
    const submittBtn = component.find('Button').at(1);
    backBtn.simulate('click');
    submittBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Cancel');
    expect(submittBtn.node.props.children).toEqual(submitBtnMap.makeAPayment);

    const remainingData = Object.assign({}, refundDepositsData, {
      successPay: true,
      remaining: 1
    });
    const paymentSummaryData = Object.assign({}, paymentSummary, {
      hasBalance: false
    });

    const props1 = {
      payment: fromJS(remainingData),
      paymentSummary: fromJS(paymentSummaryData)
    };
    component.setProps(props1);
    backBtn.simulate('click');
  });

  test('render refund footer correctly, if sourcePageIndex is reservation index, isSelectMakeAPayment is true', () => {
    const reservationData = Object.assign({}, payment, {
      sourcePageIndex: 3,
      isRefund: false
    });
    const paymentActionData = Object.assign({}, paymentAction, {
      isSelectModifyPaymentPlan: true
    });
    const paymentSummaryData = Object.assign({}, paymentSummary, {
      hasBalance: false
    });
    const props = {
      payment: fromJS(reservationData),
      paymentAction: fromJS(paymentActionData),
      paymentSummary: fromJS(paymentSummaryData),
      initialData
    };
    const component = setup(props);

    expect(component.find('Button').length).toEqual(1);
    const backBtn = component.find('Button').at(0);
    backBtn.simulate('click');
    expect(backBtn.node.props.children).toEqual('Back');

    const remainingData = Object.assign({}, reservationData, {
      remaining: 1,
      isPaymentActionValid: true
    });
    const props1 = {
      payment: fromJS(remainingData)
    };
    component.setProps(props1);
    backBtn.simulate('click');

    component.instance().paynow(1);
    expect(component.instance().back(true)).toBe(false);
    expect(component.instance().makePaymentOnModification(1)).toBe(false);
    expect(component.instance().backOrCancelMakeAPayment(true, true)).toBe(false);
  });

  test('Prompt user when come to the refund or payment page by click cancel permit.', () => {
    const refundDepositsData = Object.assign({}, payment, {
      successPay: true,
      sourcePageIndex: 3,
      isRefund: false,
      fromCancelPermit: true
    });
    const paymentActionData = Object.assign({}, paymentAction, {
      isSelectModifyPaymentPlan: false,
    });
    const props = {
      payment: fromJS(refundDepositsData),
      paymentAction: fromJS(paymentActionData),
      paymentSummary: fromJS(paymentSummary),
      initialData
    };
    const component = setup(props);

    const submittBtn = component.find('Button').at(1);
    submittBtn.simulate('click');
    submittBtn.simulate('click');
    expect(actions.pay).toHaveBeenCalled();
  });
});

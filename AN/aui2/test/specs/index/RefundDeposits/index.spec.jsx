import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import Button from 'react-base-ui/lib/components/Button';
import ExtraFees from 'index/RefundDeposits/components/ExtraFees';
import Deposits from 'index/RefundDeposits/components/Deposits';
import Notes from 'index/RefundDeposits/components/Notes';
import DefaultRefundDeposit, { RefundDeposits } from 'index/RefundDeposits';
import BreadCrumb from 'shared/components/BreadCrumb';

jest.mock('index/RefundDeposits/components/Deposits', () => "Deposits");
jest.mock('index/RefundDeposits/components/RentalFees', () => "RentalFees");
jest.mock('index/RefundDeposits/components/ExtraFees', () => "ExtraFees");
jest.mock('index/RefundDeposits/components/Notes', () => "Notes");
jest.mock('index/RefundDeposits/components/Footer', () => "Footer");
jest.mock('index/RefundDeposits/components/RefundPrerequisite', () => "RefundPrerequisite");
jest.mock('shared/components/HelpLink', () => "HelpLink");
jest.mock('shared/components/Error', () => "Error");

const data = {
  staffNotes: '',
  claimCharges: [
    {
      claim_charge_id: 1,
      claim_charge_name: 'Facility damage&gt;&lt;&amp;&#096;',
      claim_charge_amount: 10,
      id: 1,
      name: 'Facility damage><&`',
      text: 'Facility damage><&`',
      value: 1
    }
  ],
  customerNotes: '',
  refundDate: 'Mar 22, 2017',
  userPassword: 'xxxxxx',
  labelTotalRefund: '-$8.00',
  errors: [{
    message: 'error 1'
  }],
  labelTotalDeposit: '$10.00',
  deposits: [
    {
      labelChargeAmount: '$10.00',
      enabled: true,
      needOverride: true,
      receipt_detail_id: 1,
      charge_amount: 10,
      refundDate: 'Mar 22, 2017',
      name: 'deposit1><&',
      charge_description: 'deposit1&gt;&lt;&amp;',
      amount_paid: 10,
      refund_date: 'Mar 22, 2017',
      need_override: true,
      labelPaidAmount: '$10.00',
      id: 1,
      selected: true
    }
  ],
  rentalFees: [
    {
      labelChargeAmount: '$10.00',
      enabled: true,
      needOverride: true,
      receipt_detail_id: 1,
      charge_amount: 10,
      refundDate: 'Mar 22, 2017',
      name: 'deposit1><&',
      charge_description: 'deposit1&gt;&lt;&amp;',
      amount_paid: 10,
      refund_date: 'Mar 22, 2017',
      need_override: true,
      labelPaidAmount: '$10.00',
      id: 1,
      selected: true
    }
  ],
  canAddFee: true,
  labelTotalCharge: '$2.00',
  totalDeposit: 10,
  totalRefund: 8,
  extraFees: [
    {
      claim_charge_id: 73,
      claim_charge_amount: 2,
      id: 1,
      claimChargeId: 73,
      amount: 2,
      canEnterAmount: true
    }
  ],
  displayNotes: false
};
const initialData = {
  permitID: "1",
  batchID: "1",
  receiptID: "1",
  initData: {
    override_info: {
      refund_date: "",
      need_override: false,
      has_override_authority: false
    }
  },
  savedData: {
    user_name: "",
    user_password: "",
    override_checked: false,
  }
};

const error = {
  list: [],
  systemErrors: [],
  businessErrors: [{ message: 'some error happened.' }]
};

const breadCrumb = {
  batchID: '1',
  receiptID: '1',
  data: []
};

const props = {
  data: fromJS(data),
  error: fromJS(error),
  breadCrumb: fromJS(breadCrumb),
  prerequisite: fromJS({
    needOverride: false,
    overrideMessage: '',
    haveOverrideAuthority: false,
    isOverride: false,
    errors: []
  }),
  helpLink: fromJS({ data:{} }),
  initialData
};

const actions = {
  updateNeedOverrideAction: jest.fn(),
  updateOverrideMsgAction: jest.fn(),
  updateOverridePrerequisiteAction: jest.fn(),
  updateExtraFeeAmountAction: jest.fn(),    
  validateAction: jest.fn(),
  submitAction: jest.fn(),
  cancelAction: jest.fn(),
  getFeeTaxAndDiscountAction: jest.fn()
}

describe('index/RefundDeposits/index.jsx', () => {
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    ...props,
    refundDeposits: fromJS(data),
    helpLink: fromJS({ data:{} }),
    initialData
  });
  const setup = (initProps) => mount(<RefundDeposits {...initProps} {...actions} />, { context: { store } });
  
  it('RefundDeposits should render correctly when need Refund', () => {
    const component = setup(props);
    const connectComponent = mount(<DefaultRefundDeposit {...props} {...actions} />, { context: { store } });
    expect(component.find('h1')).toHaveLength(1);
    expect(component.find(Deposits)).toHaveLength(1);
    expect(component.find(ExtraFees)).toHaveLength(1);
    expect(component.find(Notes)).toHaveLength(1);
    expect(component.find('.alert-error')).toHaveLength(1);
  });

  it('RefundDeposits should render correctly when has no prerequisite errors', () => {
    const component = setup({
      ...props,
      error: fromJS({
        ...error,
        businessErrors: []
      })
    });
    expect(component.find('.alert-error')).toHaveLength(0);
  });

  it('businessErrors length > 0 and __STATIC__ equal to false should render correctly', () => {
    __STATIC__ = false;
    window.setTabLabel = () => { };
    window.setTabAttr = () => { };
    const nextData = { ...data, totalRefund: 0 };
    const nextError = { ...error, businessErrors: ['error'] };
    const nextProps = { ...props, data: fromJS(nextData), error: fromJS(nextError) };
    const component = setup({...nextProps});
    expect(component.find(BreadCrumb)).toHaveLength(1);
    expect(component.find('.alert-error')).toHaveLength(1);
    component.instance().updateFeeTaxAndDiscount();
    component.instance().updateFeeTaxAndDiscount({ extraFeeId: 1 });
    expect(actions.getFeeTaxAndDiscountAction).toHaveBeenCalledTimes(2);
    window.setTabLabel = undefined;
  });
});

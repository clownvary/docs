import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';
import toJson from 'enzyme-to-json';
import isFunction from 'lodash/isFunction';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import GeneralInformation from 'index/ReservationDetail/components/GeneralInformation/index';
import jsonfBalanceDueDetail from 'json/ReservationDetail/fetchBalanceDueDetail.json';
import { SpecialHandlingIcon } from 'shared/components/SpecialHandling';

jest.mock('shared/components/SpecialHandling/SpecialHandlingIcon', () => 'SpecialHandlingIcon');

const mockData = {
  general_information: {
    company_name: '',
    customer_id: '1123',
    customer_name: 'Mr. Raymond Commercial',
    customer_type: 'Commercial',
    permit_date: '2016 Nov 18',
    system_user: 'ActiveNet Admin',
    balance_due_detail: {
      rental_charges: 8.34,
      taxes: 2.49,
      deposit_claims: 0.00,
      charge_discounts: -1.00,
      rental_charge_payments_credits: -9.83,
      rental_charges_balance_due: 0.00,
      deposits: 8.34,
      deposit_taxes: 2.49,
      deposit_discounts: -1.00,
      deposit_payments_credits: -9.83,
      rental_charge_refunds: 0.83,
      deposit_refunds: 0.00,
      deposit_balance_due: 0.00,
      total_balance_due: 1.00
    },
    available_company_agents: [{
      id: 313,
      name: 'Alisa2 Agent-2',
      selected: false
    }, {
      id: 335,
      name: 'Alisa Alisa',
      selected: false
    }, {
      id: 34859,
      name: 'Edmund Chen',
      selected: false
    }]
  },
  payment_plan_information: {
    payer_name: 'Mr. Raymond Commercial',
    number_of_payment: 6,
    next_due_date: 'Dec 12, 2016 ',
    next_due_amount: 20.00,
    payment_method: 'Master Card ends in 1232',
    over_due_amount: 19.66
  },
  action_bar_information: {
    change_permit_status: {
      current_status: { value: 0 }
    }
  }
};
const initData = convertCasingPropObj(mockData);
const balanceDueDetail = convertCasingPropObj(jsonfBalanceDueDetail.body.balance_due_detail);

const showTotalBalanceDueDetail = jest.fn();
const changeAgent = () => Promise.resolve();
const permitDetailsChanged = jest.fn();
const initialData = {
  companyWording: ''
};

const specialHandlingData = fromJS({
  customerId: '1123',
  specialHandling: true,
  shown: false
});

const permitHolderForCompany = fromJS({
  companyId: 123,
  companyName: 'Abc',
  customerId: 34859,
  customerName: 'Edmund Chen',
  customerType: 'individual',
  customerPhone: '',
  customerEmail: '',
  availableCompanyAgents: [{
    id: 313,
    name: 'Alisa2 Agent-2',
    selected: false
  }, {
    id: 335,
    name: 'Alisa Alisa',
    selected: false
  }, {
    id: 34859,
    name: 'Edmund Chen',
    selected: true
  }]
})

const permitHolderForCustomer = fromJS({
  companyId: 0,
  companyName: '',
  customerId: 34859,
  customerName: 'Edmund Chen',
  customerType: 'individual',
  customerPhone: '',
  customerEmail: '',
  availableCompanyAgents: []
})

const defaultActions = {
  setResetFeesConfirmation: jest.fn()
}

const setup = (data,
  permitHolder = permitHolderForCompany,
  actions = defaultActions
) => {
  const output = shallow(<GeneralInformation
    initialData={initialData}
    reservationDetail={data}
    balanceDueDetail={balanceDueDetail}
    specialHandlingData={specialHandlingData}
    isShowTotalBalanceDueDetail
    fetchBalanceDueDetailAsyncAction={() => Promise.resolve()}
    showTotalBalanceDueDetail={showTotalBalanceDueDetail}
    permitHolder={permitHolder}
    pos={fromJS({ x: 300, y: 300 })}
    {...actions}
  />);

  const GeneralInformationDOM = mount(<GeneralInformation
    initialData={initialData}
    reservationDetail={data}
    balanceDueDetail={balanceDueDetail}
    specialHandlingData={specialHandlingData}
    isShowTotalBalanceDueDetail={false}
    fetchBalanceDueDetailAsyncAction={() => Promise.resolve()}
    changeAgent={changeAgent}
    permitDetailsChanged={permitDetailsChanged}
    showTotalBalanceDueDetail={showTotalBalanceDueDetail}
    permitHolder={permitHolder}
    changeCustomerOrCompany={jest.fn(() => Promise.resolve())}
    pos={fromJS({ x: 300, y: 300 })}
    {...actions}
  />);

  const instance = GeneralInformationDOM.instance();

  return {
    actns: { showTotalBalanceDueDetail() { } },
    output,
    GeneralInformationDOM,
    instance
  };
};

describe('index -> ReservationDetail -> components -> GeneralInformation', () => {
  it('should include 6 divs with having a class named item after rendered', (done) => {
    const { GeneralInformationDOM } = setup(initData);

    expect(GeneralInformationDOM.find(SpecialHandlingIcon)).toHaveLength(1);

    GeneralInformationDOM.setProps({ specialHandlingData: specialHandlingData.set('specialHandling', false) });
    expect(GeneralInformationDOM.find(SpecialHandlingIcon)).toHaveLength(0);

    expect(GeneralInformationDOM.find('.customerInfo .customer-info-row').length).toBe(3);
    setTimeout(() => {
      expect(GeneralInformationDOM.find('.balance-due__item').length).toBe(11);

      GeneralInformationDOM.find('.pop-base').simulate('mouseout');
      expect(showTotalBalanceDueDetail).toHaveBeenCalledTimes(1);
      GeneralInformationDOM.find('.pop-base').simulate('mouseover');
      expect(showTotalBalanceDueDetail).toHaveBeenCalledTimes(2);

      done();
    }, 0);

  });

  it('The detail of total balance due should be hidden', (done) => {
    initData.generalInformation.companyName = 'test';
    const { GeneralInformationDOM } = setup(initData);
    jest.runAllTimers();
    setTimeout(() => {
      const balanceDueDetail = GeneralInformationDOM.find('.balance-due-detail').at(0);
      expect(balanceDueDetail.hasClass('u-hidden')).toBe(true);
      done();
    });
    initData.generalInformation.companyName = '';
  });

  it('when nextDueDate and paymentMethod equal to "" should work fine', () => {
    const nextData = {
      ...initData,
      paymentPlanInformation: {
        payerMame: 'Mr. Raymond Commercial',
        numberOfPayment: 6,
        nextDueDate: '',
        nextDueAmount: 0,
        paymentMethod: '',
        overDueAmount: 19.66
      }
    };

    const { GeneralInformationDOM } = setup(nextData);
    expect(GeneralInformationDOM.find('.paymentPlan')).toHaveLength(1);
  });

  it('change company agent dropdown should work fine', () => {
    initData.generalInformation.companyName = 'test';
    const { GeneralInformationDOM } = setup(initData);

    expect(GeneralInformationDOM.find(SpecialHandlingIcon)).toHaveLength(1);

    GeneralInformationDOM.find('.icon-sign-m').at(1).simulate('click');
    const DropdownComponent = GeneralInformationDOM.find(Dropdown);
    expect(DropdownComponent).toHaveLength(1);
    DropdownComponent.node.props.onMenuHide();
    DropdownComponent.node.props.onChange({ value: 313 });
    DropdownComponent.node.props.onMenuHide();

    GeneralInformationDOM.setProps({ specialHandlingData: specialHandlingData.set('specialHandling', false) });
    expect(GeneralInformationDOM.find(SpecialHandlingIcon)).toHaveLength(0);
  });

  it('when available_company_agents has selected is true  should work fine', () => {
    const newData = { ...initData };
    newData.generalInformation.availableCompanyAgents = [{
      id: 313,
      name: 'Alisa2 Agent-2',
      selected: true
    }]

    const { GeneralInformationDOM } = setup(initData);
    GeneralInformationDOM.find('.icon-sign-m').at(1).simulate('click');
    GeneralInformationDOM.unmount();
  });

  it('when available_company_agents is []  should work fine', () => {
    initData.generalInformation.availableCompanyAgents = [];
    const { GeneralInformationDOM } = setup(initData);
    GeneralInformationDOM.find('.icon-sign-m').at(1).simulate('click');
    GeneralInformationDOM.unmount();
  });

  it('render customer as expect', () => {
    const actions = {
      ...defaultActions,
      getNewPermitHolder: jest.fn(),
      updatePermitHolder: jest.fn()
    }
    const { GeneralInformationDOM, instance } = setup(initData, permitHolderForCustomer, actions);
    expect(toJson(GeneralInformationDOM)).toMatchSnapshot();
    expect(isFunction(window.__changePermitHolderCallback)).toBe(true);

    GeneralInformationDOM.setProps({
      specialHandlingData: fromJS({
        specialHandling: false,
      })
    });

    expect(toJson(GeneralInformationDOM)).toMatchSnapshot();

    const editIcon = GeneralInformationDOM.find('i.icon-sign-m');
    expect(editIcon.length).toBe(1);
    const searchPermitHolderSpy = jest.spyOn(instance, 'searchPermitHolder');
    editIcon.simulate('click')
    expect(searchPermitHolderSpy).toHaveBeenCalledTimes(1);
  })

  it('render company as expect', () => {
    const { GeneralInformationDOM, instance } = setup(initData);
    expect(toJson(GeneralInformationDOM)).toMatchSnapshot();

    GeneralInformationDOM.setProps({
      specialHandlingData: fromJS({ specialHandling: false })
    });
    GeneralInformationDOM.setState({ showAgentsDropdown: true });
    expect(toJson(GeneralInformationDOM)).toMatchSnapshot();

    const editIcon = GeneralInformationDOM.find('i.icon-sign-m')
    expect(editIcon.length).toBe(1);
    const searchPermitHolderSpy = jest.spyOn(instance, 'searchPermitHolder');
    editIcon.simulate('click');
    expect(searchPermitHolderSpy).toHaveBeenCalledTimes(1);
  })

  it('functions work fine', (done) => {
    const { GeneralInformationDOM, instance } = setup(initData);
    showTotalBalanceDueDetail.mockClear();
    instance.showTotalBalanceDueDetail(true);
    expect(showTotalBalanceDueDetail).toBeCalledWith(true);

    const selectAgentSpy = jest.spyOn(instance, 'selectAgent');
    instance.openAgentsDropdown(true);
    expect(selectAgentSpy).not.toBeCalled();

    GeneralInformationDOM.setProps({ permitHolder: fromJS({
      ...permitHolderForCompany,
      availableCompanyAgents: []
    })});

    instance.openAgentsDropdown(false);
    expect(selectAgentSpy).toBeCalled();

    instance.searchPermitHolder(true);
    const getNewPermitHolderMock = jest.fn(() => Promise.resolve({}));
    const updatePermitHolderMock = jest.fn(() => done());
    GeneralInformationDOM.setProps({
      getNewPermitHolder: getNewPermitHolderMock,
      updatePermitHolder: updatePermitHolderMock
    });

    window.__changePermitHolderCallback()
   })
});

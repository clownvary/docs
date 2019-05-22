import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';

import { FutureCharges } from 'index/modules/Cart/Checkout/components/FutureCharges';
import FutureCharge from 'index/modules/Cart/Checkout/components/FutureCharges/FutureCharge';

const defaultConfig = {
  hideFutureCharges: false
};

const initialState = [];

const data = [
  {
    id: 1,
    desc: 'Recurring Donation for Fiona Campaign111 - All Sites test test test test test test testtesteststsetsetsetsetsetsetsetsetssafasdfasd ',
    nextDue: '28 May 2017',
    lastDue: '6 May 2018',
    checked: true,
    disabled: true
  },
  {
    id: 2,
    desc: 'Recurring Donation for Fiona Campaign111 - All Sites 2',
    nextDue: 'On expiration',
    lastDue: 'Until user cancels',
    checked: true,
    disabled: false
  },
  {
    id: 3,
    desc: 'Recurring Donation for Fiona Campaign111 - All Sites 3',
    nextDue: '28 May 2017',
    lastDue: '6 May 2018',
    checked: false,
    disabled: true
  },
  {
    id: 4,
    desc: 'Recurring Donation for Fiona Campaign111 - All Sites 4',
    nextDue: '28 May 2017',
    lastDue: '6 May 2018',
    checked: false,
    disabled: false
  }
];

const primaryPayment = {
  types: {
    'Credit Card': {
      component: 'CreditCard',
      selected: {
        card_type_flag: 5,
        bank_routing_number: '',
        ams_account_id: '14848185292048547353CXOSJFHJFZDKFZXQNJCZEXCLNTSALHNA',
        is_secondary_payment: false,
        ams_retention_date: 1575187200000,
        card_type: 'Discover',
        retired: false,
        save_name: 'sjdj',
        bank_account_type: '',
        card_type_id: 4,
        card_number: '1111',
        exclude: false,
        id: '4_1111',
        customer_id: 336,
        company_id: 0,
        bank_account_number: '',
        card_expiration: '11/2019'
      },
      list: [
        {
          card_type_flag: 5,
          bank_routing_number: '',
          ams_account_id: '14848185292048547353CXOSJFHJFZDKFZXQNJCZEXCLNTSALHNA',
          is_secondary_payment: false,
          ams_retention_date: 1575187200000,
          card_type: 'Discover',
          retired: false,
          save_name: 'sjdj',
          bank_account_type: '',
          card_type_id: 4,
          card_number: '1111',
          exclude: false,
          id: '4_1111',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '11/2019'
        },
        {
          card_type_flag: 6,
          bank_routing_number: '',
          ams_account_id: '14491213215001488749RDIHRDCXTFDXCQKOFNXWGAPTCUTNZSPJ',
          is_secondary_payment: false,
          ams_retention_date: 1491030000000,
          card_type: 'JCB',
          retired: false,
          save_name: 'xxx5454',
          bank_account_type: '',
          card_type_id: 2,
          card_number: '5454',
          exclude: false,
          id: '2_5454',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '03/2017'
        },
        {
          card_type_flag: 1,
          bank_routing_number: '',
          ams_account_id: '14848182363048503119BGJIDKQFVIKYEHNRJXWNZZVMJBSPEBZX',
          is_secondary_payment: false,
          ams_retention_date: 1575187200000,
          card_type: 'Visa',
          retired: false,
          save_name: 'mas',
          bank_account_type: '',
          card_type_id: 11,
          card_number: '8291',
          exclude: false,
          id: '11_8291',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '11/2019'
        },
        {
          card_type_flag: 3,
          bank_routing_number: '',
          ams_account_id: '14848182363048503119BGJIDKQFVIKYEHNRJXWNZZVMJBSPEBZX',
          is_secondary_payment: false,
          ams_retention_date: 1575187200000,
          card_type: 'Other',
          retired: false,
          save_name: 'mas',
          bank_account_type: '',
          card_type_id: 14,
          card_number: '2423',
          exclude: false,
          id: '14_2423',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '11/2019'
        }
      ],
      tempList: [],
      totalList: [
        {
          card_type_flag: 5,
          bank_routing_number: '',
          ams_account_id: '14848185292048547353CXOSJFHJFZDKFZXQNJCZEXCLNTSALHNA',
          is_secondary_payment: false,
          ams_retention_date: 1575187200000,
          card_type: 'Discover',
          retired: false,
          save_name: 'sjdj',
          bank_account_type: '',
          card_type_id: 4,
          card_number: '1111',
          exclude: false,
          id: '4_1111',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '11/2019'
        },
        {
          card_type_flag: 6,
          bank_routing_number: '',
          ams_account_id: '14491213215001488749RDIHRDCXTFDXCQKOFNXWGAPTCUTNZSPJ',
          is_secondary_payment: false,
          ams_retention_date: 1491030000000,
          card_type: 'JCB',
          retired: false,
          save_name: 'xxx5454',
          bank_account_type: '',
          card_type_id: 2,
          card_number: '5454',
          exclude: false,
          id: '2_5454',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '03/2017'
        },
        {
          card_type_flag: 1,
          bank_routing_number: '',
          ams_account_id: '14848182363048503119BGJIDKQFVIKYEHNRJXWNZZVMJBSPEBZX',
          is_secondary_payment: false,
          ams_retention_date: 1575187200000,
          card_type: 'Visa',
          retired: false,
          save_name: 'mas',
          bank_account_type: '',
          card_type_id: 11,
          card_number: '8291',
          exclude: false,
          id: '11_8291',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '11/2019'
        },
        {
          card_type_flag: 3,
          bank_routing_number: '',
          ams_account_id: '14848182363048503119BGJIDKQFVIKYEHNRJXWNZZVMJBSPEBZX',
          is_secondary_payment: false,
          ams_retention_date: 1575187200000,
          card_type: 'Other',
          retired: false,
          save_name: 'mas',
          bank_account_type: '',
          card_type_id: 14,
          card_number: '2423',
          exclude: false,
          id: '14_2423',
          customer_id: 336,
          company_id: 0,
          bank_account_number: '',
          card_expiration: '11/2019'
        }
      ],
      cardTypes: [
        {
          id: 11,
          card_type: 'Visa',
          selected: false,
          retired: true,
          card_type_id: 1
        },
        {
          id: 21,
          card_type: 'Visa2',
          selected: false,
          retired: true,
          card_type_id: 1
        },
        {
          id: 9,
          card_type: 'Diners - lin',
          selected: false,
          retired: false,
          card_type_id: 4
        },
        {
          id: 4,
          card_type: 'Discover',
          selected: false,
          retired: false,
          card_type_id: 5
        },
        {
          id: 14,
          card_type: 'Other',
          selected: false,
          retired: false,
          card_type_id: 3
        },
        {
          id: 2,
          card_type: 'JCB',
          selected: false,
          retired: false,
          card_type_id: 6
        },
        {
          id: 13,
          card_type: 'Other CC',
          selected: false,
          retired: false,
          card_type_id: 0
        }
      ],
      merchantName: 'Bill.Xiong'
    },
    'Electronic Check': {
      component: 'ECheck',
      selected: '',
      list: [
        {
          routing_number: 'xxx8888',
          ams_account_id: 'Demo AccountID',
          is_secondary_payment: false,
          ams_retention_date: null,
          retired: false,
          account_type: 'C',
          save_name: 'woshiyun',
          exclude: false,
          id: 'xxx3230_xxx8888',
          account_number: 'xxx3230'
        },
        {
          routing_number: 'xxx3333',
          ams_account_id: 'Demo AccountID',
          is_secondary_payment: false,
          ams_retention_date: null,
          retired: false,
          account_type: 'S',
          save_name: 'woshiyun',
          exclude: false,
          id: 'xxx4525_xxx3333',
          account_number: 'xxx4525'
        }
      ],
      tempList: [],
      totalList: [
        {
          routing_number: 'xxx8888',
          ams_account_id: 'Demo AccountID',
          is_secondary_payment: false,
          ams_retention_date: null,
          retired: false,
          account_type: 'C',
          save_name: 'woshiyun',
          exclude: false,
          id: 'xxx3230_xxx8888',
          account_number: 'xxx3230'
        },
        {
          routing_number: 'xxx3333',
          ams_account_id: 'Demo AccountID',
          is_secondary_payment: false,
          ams_retention_date: null,
          retired: false,
          account_type: 'S',
          save_name: 'woshiyun',
          exclude: false,
          id: 'xxx4525_xxx3333',
          account_number: 'xxx4525'
        }
      ]
    }
  },
  selectedType: 'Credit Card',
  isShow: true
};


function setup(_state, _context = context, _config) {
  const actions = {
    clickChargeAction: expect.createSpy(),
    getFutureChargesAction: expect.createSpy().andCall(() => Promise.resolve())
  };

  const state = Object.assign(initialState, _state);
  const config = Object.assign(defaultConfig, _config);

  const component = shallow(
    <FutureCharges
      data={fromJS(state)}
      primaryPayment={fromJS(primaryPayment)}
      config={config}
      {...actions}
    />);

  return {
    component,
    container: component.find('.futurecharges'),
    charges: component.find(FutureCharge),
    title: component.find('h4'),
    actions
  };
}

describe('index/modules/Cart/Checkout/components/FutureCharges', () => {
  it('should render FutureCharge when hideFutureCharges is false and data`length > 0', () => {
    const { container, charges, title, actions } =
      setup(data, null, { hideFutureCharges: false });
    expect(title.length).toEqual(1);
    expect(container.length).toEqual(1);
    expect(charges.length).toEqual(data.length);

    expect(actions.getFutureChargesAction).toHaveBeenCalled();
  });

  it('should not render FutureCharge when hideFutureCharges is true and data`length > 0', () => {
    const { container, charges, title, actions } =
      setup(data, null, { hideFutureCharges: true });
    expect(container.length).toEqual(0);
    expect(charges.length).toEqual(0);
    expect(title.length).toEqual(0);
    expect(actions.getFutureChargesAction).toNotHaveBeenCalled();
  });

  it('should not render FutureCharge when hideFutureCharges is true and data`length === 0', () => {
    const { container, charges, title, actions } =
      setup(null, null, { hideFutureCharges: true });
    expect(container.length).toEqual(0);
    expect(charges.length).toEqual(0);
    expect(title.length).toEqual(0);
    expect(actions.getFutureChargesAction).toNotHaveBeenCalled();
  });
});

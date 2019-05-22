import { fromJS } from 'immutable';
import React from 'react';
import Checkbox from 'react-base-ui/lib/components/Checkbox';

import FutureCharge from 'index/modules/Cart/Checkout/components/FutureCharges/FutureCharge';
import selfMessages from 'index/modules/Cart/Checkout/components/FutureCharges/translations';
import paymentMessages from 'index/modules/Cart/Checkout/components/PaymentComponent/ECheck/translations';
//eslint-disable-next-line
import { mountWithIntl } from 'utils/enzymeWithIntl';

const initialState = {};

const data = [
  {
    id: 1,
    desc: 'Recurring Donation for Fiona Campaign111 - All Sites test test test test test test testtesteststsetsetsetsetsetsetsetsetssafasdfasd ',
    nextDue: '28 May 2017',
    lastDue: '6 May 2018',
    checked: true,
    disabled: false
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


function setup(_state, _primaryPayment) {
  const actions = {
    clickChargeAction: jest.fn()
  };

  const futurePayment = Object.assign(initialState, _state);
  const temp = Object.assign({},primaryPayment, _primaryPayment);

  const component = mountWithIntl(
    <FutureCharge
      futurePayment={fromJS(futurePayment)}
      primaryPayment={fromJS(temp)}
      {...actions}
    />);

  return {
    component,
    container: component.find('.futurecharge'),
    description: component.find('.futurecharge-desc'),
    nextDue: component.find('.futurecharge-duedate__content').first(),
    lastDue: component.find('.futurecharge-duedate__content').last(),
    checkbox: component.find(Checkbox),
    dateList: component.find('.futurecharge-list'),
    dueDateLabel: component.find('.futurecharge-duedate__label'),
    actions
  };
}

describe('index/modules/Cart/Checkout/components/FutureCharges/FutureCharge', () => {
  it('should render FutureCharge successfully when primary payment is selected with credit card', () => {
    const charge = data[0];
    const { container, description, nextDue, lastDue, checkbox, dateList, dueDateLabel, actions } =
      setup(charge);
    expect(container.length).toEqual(1);
    expect(description.length).toEqual(1);
    expect(description.find('span').last().text()).toEqual(charge.desc);
    expect(nextDue.length).toEqual(1);
    expect(nextDue.find('span').last().text()).toEqual(charge.nextDue);
    expect(lastDue.length).toEqual(1);
    expect(lastDue.find('span').last().text()).toEqual(charge.lastDue);
    expect(dateList.length).toEqual(2);
    expect(dueDateLabel.length).toEqual(2);

    expect(checkbox.length).toEqual(1);
    checkbox.find('input').simulate('change');
    expect(actions.clickChargeAction).toBeCalled();
    expect(checkbox.html()).toContain(`aria-disabled="${charge.disabled ? 'true' : 'false'}"`);
    expect(checkbox.html()).toContain(`aria-checked="${charge.checked ? 'true' : 'false'}"`);

    const paymentInfo = checkbox.find('span').last().text();
    expect(paymentInfo).toContain(selfMessages.fixedCCLable.defaultMessage);
    expect(paymentInfo).toContain(selfMessages.fixedCCLable.defaultMessage);
  });

  it('should render FutureCharge successfully when primary payment is selected with eCheck', () => {
    const charge = data[1];
    const { container, description, nextDue, lastDue, checkbox, dateList, dueDateLabel, actions } =
      setup(charge, { selectedType: 'Electronic Check', types: { 'Electronic Check': { selected: primaryPayment.types['Electronic Check'].list[1] } } });
    expect(container.length).toEqual(1);
    expect(description.length).toEqual(1);
    expect(description.find('span').last().text()).toEqual(charge.desc);
    expect(nextDue.length).toEqual(1);
    expect(nextDue.find('span').last().text()).toEqual(charge.nextDue);
    expect(lastDue.length).toEqual(1);
    expect(lastDue.find('span').last().text()).toEqual(charge.lastDue);
    expect(dateList.length).toEqual(2);
    expect(dueDateLabel.length).toEqual(2);

    expect(checkbox.length).toEqual(1);
    checkbox.find('input').simulate('change');
    expect(actions.clickChargeAction).toBeCalled();
    expect(checkbox.html()).toContain(`aria-disabled="${charge.disabled ? 'true' : 'false'}"`);
    expect(checkbox.html()).toContain(`aria-checked="${charge.checked ? 'true' : 'false'}"`);

    const paymentInfo = checkbox.find('span').last().text();
    expect(paymentInfo).toContain(selfMessages.preAuthorize.defaultMessage);
    expect(paymentInfo).toContain(paymentMessages.savings.defaultMessage);
  });
  it('should render FutureCharge successfully when primary payment is selected with eCheck(2)', () => {
    const charge = data[1];
    console.log('primaryPayment ut', primaryPayment);
    const { container, description, nextDue, lastDue, checkbox, dateList, dueDateLabel, actions } =
      setup(charge, { selectedType: 'Electronic Check', types: { 'Electronic Check': { selected:  primaryPayment.types['Electronic Check'].list[0]} } });
    const paymentInfo = checkbox.find('span').last().text();
    expect(paymentInfo).toContain(selfMessages.preAuthorize.defaultMessage);
  });
  it('should render FutureCharge successfully when primary payment is not selected', () => {
    const charge = data[2];
    const { container, description, nextDue, lastDue, checkbox, actions } =
      setup(charge, { selectedType: 'Electronic Check', types: { 'Electronic Check': { selected: '' } } });
    expect(container.length).toEqual(1);
    expect(description.length).toEqual(1);
    expect(description.find('span').last().text()).toEqual(charge.desc);
    expect(nextDue.length).toEqual(1);
    expect(nextDue.find('span').last().text()).toEqual(charge.nextDue);
    expect(lastDue.length).toEqual(1);
    expect(lastDue.find('span').last().text()).toEqual(charge.lastDue);

    expect(checkbox.length).toEqual(1);
    checkbox.find('input').simulate('change');
    expect(actions.clickChargeAction).not.toHaveBeenCalled();
    expect(checkbox.html()).toContain('aria-disabled="true"');
    expect(checkbox.html()).toContain(`aria-checked="${charge.checked ? 'true' : 'false'}"`);

    const paymentInfo = checkbox.find('span').last().text();
    expect(paymentInfo).toContain(selfMessages.selectCard.defaultMessage);
    expect(paymentInfo).toContain(selfMessages.preAuthorize.defaultMessage);
  });
});

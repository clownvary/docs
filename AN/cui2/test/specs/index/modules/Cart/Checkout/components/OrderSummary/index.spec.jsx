import { fromJS } from 'immutable';
import expect from 'expect';
import React from 'react';
import { shallowWithIntl } from 'utils/enzymeWithIntl';
import context, { childContextTypes } from 'utils/context';
import { Icon } from 'react-base-ui/lib/components/SVG';

import { OrderSummary } from 'index/modules/Cart/Checkout/components/OrderSummary';
/*eslint-disable*/
import agreement from 'Cart/Checkout/get_agreement.json';
import orderSummary from 'Cart/Checkout/get_ordersummary.json';
import messages from 'source/en-US';
/*eslint-enable*/
const intl = {
  messages
};
const { body: { order_summary: defaultOrderSummary } } = orderSummary;
const initialState = {
  data: {}
};

const agreementState = {
  isDisplayAgreement: false,
  agreement: {},
  isSignedAgreement: false
};

const applyGiftCardState = {
  applyBtnEnable: false,
  errorMessage: false,
  cardNumber: '',
  giftCardList: [],
  appledCardLlist: []
};

const paymentManager = fromJS({
  modules: {
    primary: {
      selectedType: 'Electronic Check',
      selected: {
        ams_account_id: 'Demo AccountID',
        save_name: 'woshiyun',
        routing_number: 'xxx8888',
        account_number: 'xxx3230',
        account_type: 'C',
        exclude: false,
        retired: false,
        ams_retention_date: null,
        is_secondary_payment: false
      },
      types: {
        'Electronic Check': {
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
            }
          ],
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
          }
        }
      }
    }
  }
});


function setup(props, _context = context) {
  const actions = {
    fetchOrderSummary: expect.createSpy(),
    displayAgreementAction: expect.createSpy(),
    getAgreementAsyncAction: expect.createSpy(),
    signAgreementAction: expect.createSpy(),
    commitOrderAsyncAction: expect.createSpy(),
    payAsyncAction: expect.createSpy()
  };


  const component = shallowWithIntl(
    <OrderSummary
      applyGiftCard={fromJS(applyGiftCardState)}
      orderSummary={fromJS(initialState)}
      paymentManager={paymentManager}
      agreement={fromJS(agreementState)}
      intl={intl}
      {...props}
      {...actions}
    />, { context: _context, childContextTypes });
  return {
    component,
    container: component.find('.ordersummary-panel'),
    modal: component.find('Modal'),
    continueButton: component.find('.btn-continue'),
    payButton: component.find('.pay__button'),
    checkbox: component.find('.agreement-checkbox'),
    arrowUp: component.find(Icon).findWhere(i => i.prop('name') === 'chevron-up'),
    arrowDown: component.find(Icon).findWhere(i => i.prop('name') === 'chevron-down'),
    collapseTrigger: component.find('.ordersummary-title__collapse-trigger'),
    actions
  };
}


describe('index/modules/Cart/Checkout/components/OrderSummary', () => {
  it('should render components successfull  ', () => {
    const {
      container,
      modal,
      payButton,
      continueButton,
      checkbox
    } = setup();
    expect(container.length).toEqual(1);
    expect(modal.length).toEqual(1);
    expect(continueButton.length).toEqual(1);
    expect(payButton.length).toEqual(1);
    expect(checkbox.length).toEqual(1);
  });

  it('should call payAsyncAction when clicking pay button.', () => {
    const { payButton, actions } = setup();
    payButton.simulate('click');
    expect(actions.payAsyncAction).toHaveBeenCalled();
  });

  it('should call commitOrderAsyncAction when clicking containue button.', () => {
    const { continueButton, actions } = setup();
    continueButton.simulate('click');
    expect(actions.commitOrderAsyncAction).toHaveBeenCalled();
  });

  it('should show arrow up-down correctly', () => {
    const { arrowUp, arrowDown } = setup();
    expect(arrowUp.length).toEqual(1);
    expect(arrowDown.length).toEqual(0);
  });

  it('show collapse arrow correctly when click collapse trigger', () => {
    const configuration = {
      organization_name: 'whyy',
      show_pad_agreement_for_ecp: true,
      pad_agreement_text: '',
      ach_agreement_text: ''
    };
    const content1 = { configurations: fromJS(configuration) };
    const { component, collapseTrigger } = setup({ isMobileOrTablet: true }, content1);
    collapseTrigger.simulate('click');
    component.setState({ expanded: false });
    expect(component.find(Icon).findWhere(i => i.prop('name') === 'chevron-down').length > 0).toEqual(true);
  });

  it('will NOT show collapse arrow correctly when click collapse trigger', () => {
    const { component, collapseTrigger } = setup({ isMobileOrTablet: false });
    expect(component.find(Icon).findWhere(i => i.prop('name') === 'chevron-up').length > 0).toEqual(true);
    collapseTrigger.simulate('click');
    component.setState({ expanded: true });
    expect(component.find(Icon).findWhere(i => i.prop('name') === 'chevron-down').length > 0).toEqual(false);
  });
  it('should trigger displayAgreementAction on modal', () => {
    const { modal, actions } = setup();
    modal.prop('onClose')();
    expect(actions.displayAgreementAction).toHaveBeenCalled();
  });
  it('should trigger signAgreementAction on checkbox', () => {
    const { checkbox, actions } = setup();
    checkbox.prop('onChange')();
    expect(actions.signAgreementAction).toHaveBeenCalled();
  });

});

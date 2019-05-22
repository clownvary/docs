import { expect } from 'chai';
import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Cart/ShoppingCart/consts/actionTypes';
import transactionsReducer from 'index/modules/Cart/ShoppingCart/reducers/transactions';

const participants = [
      {
          "transactions": [
              {
                  "amount_include_tax": 1770,
                  "giftCardRefill": false,
                  "reno": 1,
                  "receipt_entry_identity": "1010486610",
                  "transaction_id": 0,
                  "transaction_type": 5,
                  "reg_type": 0,
                  "item_id": 656,
                  "item_name": "Wade1-package",
                  "item_descriptions": [
                      {
                          "key": "Pass does not expire",
                          "value": ""
                      }
                  ],
                  "description": "Wade1-package",
                  "amount": 1770,
                  "taxes": 0,
                  "primary_enrollee_sub_total": null,
                  "primary_sub_total": null,
                  "current_payer_refund_amount": null,
                  "transaction_url": "https://apm.activecommunities.com/cuiuat03/ActiveNet_Home?FileName=resumeOnlineTransaction.sdi&reno=1&edit=true&goto=participant",
                  "detail_url": "https://apm.activecommunities.com/cuiuat03/Membership?package_id=656",
                  "transaction_memo": "",
                  "transacstion_memo_backup": "",
                  "online_entry_completed": true,
                  "transaction_qty": 0,
                  "usage_fee_price": {
                      "id": 0,
                      "qty": 0,
                      "description": null,
                      "unit_price": null,
                      "price": null,
                      "charge_type": 0,
                      "fee_order": 0,
                      "discount_order": 0,
                      "is_percentage_discount": false,
                      "discount_percent": 0
                  },
                  "refund_charge": null,
                  "primary_price_grid": [
                      {
                          "id": 827,
                          "qty": 1,
                          "description": "ANE54310BBB",
                          "unit_price": 20,
                          "price": 20,
                          "charge_type": 0,
                          "fee_order": 1,
                          "discount_order": 0,
                          "is_percentage_discount": false,
                          "discount_percent": 0
                      },
                      {
                          "id": 828,
                          "qty": 1,
                          "description": "ANE54312 Charge",
                          "unit_price": 1000,
                          "price": 1000,
                          "charge_type": 0,
                          "fee_order": 2,
                          "discount_order": 0,
                          "is_percentage_discount": false,
                          "discount_percent": 0
                      },
                      {
                          "id": 829,
                          "qty": 1,
                          "description": "ANE54311AAA",
                          "unit_price": 750,
                          "price": 750,
                          "charge_type": 0,
                          "fee_order": 3,
                          "discount_order": 0,
                          "is_percentage_discount": false,
                          "discount_percent": 0
                      }
                  ],
                  "refund_fee_summary_grid": [],
                  "membership_price_grid": [],
                  "company_name": null,
                  "merchandise_price_grid": [],
                  "rescinded_discounts_grid": [],
                  "donation_price_grid": [],
                  "company_id": 0,
                  "deferred_amount": 0,
                  "due_now": 1770,
                  "receipt_numbers": [],
                  "has_payment_plan": false,
                  "you_refund": 0,
                  "final_refund": 0,
                  "refund_fee": 0,
                  "registration_type": 0,
                  "activity_enrollment_package": [],
                  "refund_prior_enrollment": 0,
                  "is_quick_donation": false,
                  "activity_transfer_out": null,
                  "is_require": false,
                  "is_not_from_pay_on_account": false,
                  "is_recurring": false
              }
          ],
          "sub_total": 1770,
          "item_number": 1,
          "shorthand_name": "AA"
      },
     {
          "transactions": [
              {
                  "amount_include_tax": 1770,
                  "giftCardRefill": false,
                  "reno": 2,
                  "receipt_entry_identity": "1070713424",
                  "transaction_id": 0,
                  "transaction_type": 5,
                  "reg_type": 0,
                  "item_id": 656,
                  "item_name": "Wade1-package",
                  "item_descriptions": [
                      {
                          "key": "Pass does not expire",
                          "value": ""
                      }
                  ],
                  "description": "Wade1-package",
                  "amount": 1770,
                  "taxes": 0,
                  "primary_enrollee_sub_total": null,
                  "primary_sub_total": null,
                  "current_payer_refund_amount": null,
                  "transaction_url": "https://apm.activecommunities.com/cuiuat03/ActiveNet_Home?FileName=resumeOnlineTransaction.sdi&reno=2&edit=true&goto=participant",
                  "detail_url": "https://apm.activecommunities.com/cuiuat03/Membership?package_id=656",
                  "transaction_memo": "",
                  "transacstion_memo_backup": "",
                  "online_entry_completed": false,
                  "transaction_qty": 0,
                  "usage_fee_price": {
                      "id": 0,
                      "qty": 0,
                      "description": null,
                      "unit_price": null,
                      "price": null,
                      "charge_type": 0,
                      "fee_order": 0,
                      "discount_order": 0,
                      "is_percentage_discount": false,
                      "discount_percent": 0
                  },
                  "refund_charge": null,
                  "primary_price_grid": [
                      {
                          "id": 827,
                          "qty": 1,
                          "description": "ANE54310BBB",
                          "unit_price": 20,
                          "price": 20,
                          "charge_type": 0,
                          "fee_order": 1,
                          "discount_order": 0,
                          "is_percentage_discount": false,
                          "discount_percent": 0
                      },
                      {
                          "id": 828,
                          "qty": 1,
                          "description": "ANE54312 Charge",
                          "unit_price": 1000,
                          "price": 1000,
                          "charge_type": 0,
                          "fee_order": 2,
                          "discount_order": 0,
                          "is_percentage_discount": false,
                          "discount_percent": 0
                      },
                      {
                          "id": 829,
                          "qty": 1,
                          "description": "ANE54311AAA",
                          "unit_price": 750,
                          "price": 750,
                          "charge_type": 0,
                          "fee_order": 3,
                          "discount_order": 0,
                          "is_percentage_discount": false,
                          "discount_percent": 0
                      }
                  ],
                  "refund_fee_summary_grid": [],
                  "membership_price_grid": [],
                  "company_name": null,
                  "merchandise_price_grid": [],
                  "rescinded_discounts_grid": [],
                  "donation_price_grid": [],
                  "company_id": 0,
                  "deferred_amount": 0,
                  "due_now": 1770,
                  "receipt_numbers": [],
                  "has_payment_plan": false,
                  "you_refund": 0,
                  "final_refund": 0,
                  "refund_fee": 0,
                  "registration_type": 0,
                  "activity_enrollment_package": [],
                  "refund_prior_enrollment": 0,
                  "is_quick_donation": false,
                  "activity_transfer_out": null,
                  "is_require": false,
                  "is_not_from_pay_on_account": false,
                  "is_recurring": false
              }
          ],
          "sub_total": 1770,
          "item_number": 1,
          "shorthand_name": "AA"
      }
  ];

describe('index/modules/Cart/ShoppingCart/reducers/transactions', () => {
  const expectedInitialState = fromJS({
    participants: fromJS([]),
    payOnAccount: fromJS([]),
    isRequired: null,
    payOnAccountWarning: null,
    orderSummary: null,
    expandedStatus: fromJS({}),
    hasExpandedStatus: fromJS({}),
    paymentPlans: fromJS([])
  });

  it('Should return the expected initial state', () => {
    expect(is(expectedInitialState, transactionsReducer(undefined, {}))).to.be.true;
  });

  it('Should fetch transactions data successfully', () => {
    const { TRANSACTIONS_UI_LIST } = actionTypes;
      const state = fromJS({
        expandedStatus: fromJS({}),
        hasExpandedStatus: fromJS({})
      });
    const returnState = transactionsReducer(state, {
      type: TRANSACTIONS_UI_LIST,
      payload: {
        participants: participants,
        orderSummary: 2
      }
    });
    expect(returnState.get('participants').size).to.equal(2);
    expect(returnState.get('orderSummary')).to.equal(2);
  });

  it('Should fetch transactions data successfully', () => {
    const { TRANSACTIONS_UI_LIST } = actionTypes;
      const state = fromJS({
        expandedStatus: fromJS({1: true}),
        hasExpandedStatus: fromJS({})
      });

    const returnState = transactionsReducer(state, {
      type: TRANSACTIONS_UI_LIST,
      payload: {
        participants: participants,
        orderSummary: 2
      }
    });
    expect(returnState.get('participants').size).to.equal(2);
    expect(returnState.get('orderSummary')).to.equal(2);
  });

  it('TRANSACTIONS_UI_EXPAND_STATUS', () => {
    const receiptEntryIdentity = "1";
    const state = {
      expandedStatus: fromJS({[receiptEntryIdentity]: false}),
      hasExpandedStatus: fromJS({[receiptEntryIdentity]: false})
    };
    const { TRANSACTIONS_UI_EXPAND_STATUS } = actionTypes;
    const returnState = transactionsReducer(fromJS(state), {
      type: TRANSACTIONS_UI_EXPAND_STATUS,
      payload: receiptEntryIdentity
    });

    expect(returnState.getIn(['expandedStatus', receiptEntryIdentity])).to.equal(true);
    expect(returnState.getIn(['hasExpandedStatus', receiptEntryIdentity])).to.equal(true);
  });

  it('TRANSACTIONS_UI_REMOVE_EXPAND_STATUS', () => {
    const receiptEntryIdentity = "1";
    const state = {
      expandedStatus: fromJS({[receiptEntryIdentity]: false}),
      hasExpandedStatus: fromJS({[receiptEntryIdentity]: false})
    };
    const { TRANSACTIONS_UI_REMOVE_EXPAND_STATUS } = actionTypes;
    const returnState = transactionsReducer(fromJS(state), {
      type: TRANSACTIONS_UI_REMOVE_EXPAND_STATUS,
      payload: receiptEntryIdentity
    });

    expect(!returnState.getIn(['expandedStatus', receiptEntryIdentity])).to.equal(true);
    expect(!returnState.getIn(['hasExpandedStatus', receiptEntryIdentity])).to.equal(true);
  });


  it('TRANSACTIONS_UI_CLEAR_EXPAND_STATUS', () => {
    const receiptEntryIdentity = "1";
    const state = {
      expandedStatus: fromJS({[receiptEntryIdentity]: false, 2: true}),
      hasExpandedStatus: fromJS({[receiptEntryIdentity]: false, 2: true})
    };
    const { TRANSACTIONS_UI_CLEAR_EXPAND_STATUS } = actionTypes;
    const returnState = transactionsReducer(fromJS(state), {
      type: TRANSACTIONS_UI_CLEAR_EXPAND_STATUS,
      payload: receiptEntryIdentity
    });

    expect(!returnState.getIn(['expandedStatus', receiptEntryIdentity])).to.equal(true);
    expect(!returnState.getIn(['hasExpandedStatus', receiptEntryIdentity])).to.equal(true);
  });

  it('TRANSACTIONS_UI_GET_PAYMENT_PLAN', () => {
    const { TRANSACTIONS_UI_GET_PAYMENT_PLAN } = actionTypes;
    const returnState = transactionsReducer(fromJS({}), {
      type: TRANSACTIONS_UI_GET_PAYMENT_PLAN,
      payload: {
        paymentPlans: 'test data'
      }
    });

    expect(returnState.get('paymentPlans')).to.equal('test data');
  });


});

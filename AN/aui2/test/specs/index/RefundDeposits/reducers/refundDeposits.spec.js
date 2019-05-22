import { is, fromJS } from 'immutable';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import * as actions from 'index/RefundDeposits/actions/refundDeposits';
import getRefundDepositsReducer from 'index/RefundDeposits/reducers/refundDeposits';

import jsonRefundDeposits from 'json/RefundDeposits/refund_deposits.json';

let reducer = getRefundDepositsReducer(__refund__.__initialState__);

describe('index -> Refund Deposits -> reducers -> refundDeposits', () => {
  const initialState = {
    deposits: [],
    claimCharges: [],
    extraFees: [],
    rentalFees: [],
    displayNotes: false,
    staffNotes: '',
    customerNotes: '',
  
    totalDeposit: 0,
    totalCharge: 0,
    totalRentalFee: 0,
    totalRefund: 0,
    subTotalRefund: 0,
  
    labelTotalDeposit: '0.00',
    labelTotalCharge: '0.00',
    labelTotalRentalFee: '0.00',
    labelTotalRefund: '0.00',
    labelSubTotalRefund: '0.00',
    refundChargeAmount: '0.00',
  
    refundChargeDesc: '',
    canAddFee: true,
    cancelPermit: false,
    fromCancelPermit: false
  };

  const defaultState = {
    staffNotes: "Stuff Notes Test",
    customerNotes: "Customer Notes Test",
    claimCharges: [
      {
        claim_charge_id: 1,
        claim_charge_name: "Facility damage&gt;&lt;&amp;&#096;",
        claim_charge_amount: 10,
        id: 1,
        name: "Facility damage><&`",
        text: "Facility damage><&`",
        value: 1
      },
      {
        claim_charge_id: 2,
        claim_charge_name: "Facility damage2&quot;test&quot;&#126;",
        claim_charge_amount: 11,
        id: 2,
        name: "Facility damage2\"test\"~",
        text: "Facility damage2\"test\"~",
        value: 2
      }
    ],
    labelTotalCharge: "$88.00",
    refundChargeAmount: "1.00",
    defaultRefundChargeAmount: "222.00",
    labelTotalRefund: "$8.00",
    labelTotalDeposit: "$25.01",
    labelSubTotalRefund: "$12.00",
    rentalFees: [
      {
        labelChargeAmount: "$10.00",
        needOverride: false,
        receipt_detail_id: 1,
        charge_amount: 10,
        refundDate: "",
        name: "deposit1><&",
        charge_description: "deposit1&gt;&lt;&amp;",
        linkedCredit: "$0.00",
        amount_paid: 10,
        refund_date: "",
        need_override: false,
        labelPaidAmount: "$10.00",
        id: 1,
        selected: true,
        linked_credit: 0
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: true,
        receipt_detail_id: 2,
        charge_amount: 10,
        refundDate: "Mar 22, 2018",
        name: "deposit2\"`",
        charge_description: "deposit2&quot;&#096;",
        linkedCredit: "$10.00",
        amount_paid: 10,
        refund_date: "Mar 22, 2018",
        need_override: true,
        labelPaidAmount: "$10.00",
        id: 2,
        selected: true,
        linked_credit: 10
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: true,
        receipt_detail_id: 3,
        charge_amount: 10,
        refundDate: "Mar 20, 2018",
        name: "deposit3\"~",
        charge_description: "deposit3&quot;&#126;",
        linkedCredit: "$1.00",
        amount_paid: 0,
        refund_date: "Mar 20, 2018",
        need_override: true,
        labelPaidAmount: "$0.00",
        id: 3,
        selected: true,
        linked_credit: 1
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: false,
        receipt_detail_id: 4,
        charge_amount: 10,
        refundDate: "",
        name: "deposit4\"test\"~",
        charge_description: "deposit4&quot;test&quot;&#126;",
        linkedCredit: "$0.00",
        amount_paid: 5.01,
        refund_date: "",
        need_override: false,
        labelPaidAmount: "$5.01",
        id: 4,
        selected: true,
        linked_credit: 0
      }
    ],
    labelTotalRentalFee: "$25.01",
    deposits: [
      {
        labelChargeAmount: "$10.00",
        needOverride: true,
        receipt_detail_id: 1,
        charge_amount: 10,
        refundDate: "Mar 22, 2017",
        name: "deposit1><&",
        charge_description: "deposit1&gt;&lt;&amp;",
        linkedCredit: "$0.00",
        amount_paid: 10,
        refund_date: "Mar 22, 2017",
        need_override: true,
        labelPaidAmount: "$10.00",
        id: 1,
        selected: true,
        linked_credit: 0
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: false,
        receipt_detail_id: 2,
        charge_amount: 10,
        refundDate: "",
        name: "deposit2\"`",
        charge_description: "deposit2&quot;&#096;",
        linkedCredit: "$10.00",
        amount_paid: 10,
        refund_date: "",
        need_override: false,
        labelPaidAmount: "$10.00",
        id: 2,
        selected: true,
        linked_credit: 10
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: false,
        receipt_detail_id: 3,
        charge_amount: 10,
        refundDate: "",
        name: "deposit3\"~",
        charge_description: "deposit3&quot;&#126;",
        linkedCredit: "$1.00",
        amount_paid: 0,
        refund_date: "",
        need_override: false,
        labelPaidAmount: "$0.00",
        id: 3,
        selected: true,
        linked_credit: 1
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: true,
        receipt_detail_id: 4,
        charge_amount: 10,
        refundDate: "Mar 20, 2017",
        name: "deposit4\"test\"~",
        charge_description: "deposit4&quot;test&quot;&#126;",
        linkedCredit: "$0.00",
        amount_paid: 5.01,
        refund_date: "Mar 20, 2017",
        need_override: true,
        labelPaidAmount: "$5.01",
        id: 4,
        selected: true,
        linked_credit: 0
      }
    ],
    canAddFee: false,
    cancelPermit: false,
    totalCharge: 88,
    totalDeposit: 25.01,
    subTotalRefund: 12,
    totalRefund: 8,
    refundChargeDesc: "Cancellation Fee",
    extraFees: [
      {
        claim_charge_amount: 2,
        canEnterAmount: true,
        discount: 111,
        claim_charge_id: 1,
        name: "Facility damage><&`",
        claimChargeId: 1,
        tax: 1,
        text: "Facility damage><&`",
        claim_tax_amount: 1,
        value: 1,
        claim_charge_name: "Facility damage&gt;&lt;&amp;&#096;",
        claim_discount_amount: 111,
        amount: 2,
        id: 1
      }
    ],
    totalRentalFee: 25.01,
    displayNotes: false,
    fromCancelPermit: false
  };

  let store = null;

  beforeEach(() => {
    store = configureStore(middlewares)(fromJS(defaultState));
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Refund Deposits should get the right initial state', () => {
    reducer = getRefundDepositsReducer({
      initData: {
        ...__refund__.__initialState__.initData,
        deposit_fees: [],
        rental_fees: []
      },
      savedData: {
        staff_notes: "Stuff Notes Test",
        customer_notes: "Customer Notes Test",
      }
    });

    const state = reducer(undefined, {});
    expect(state.toJS()).toEqual({
      canAddFee: false,
      cancelPermit: false,
      claimCharges: [
        {
          claim_charge_amount: 10,
          claim_charge_id: 1,
          claim_charge_name: "Facility damage&gt;&lt;&amp;&#096;",
          id: 1,
          name: "Facility damage><&`",
          text: "Facility damage><&`",
          value: 1,
        },
        {
          claim_charge_amount: 11,
          claim_charge_id: 2,
          claim_charge_name: "Facility damage2&quot;test&quot;&#126;",
          id: 2,
          name: "Facility damage2\"test\"~",
          text: "Facility damage2\"test\"~",
          value: 2,
        }
      ],
      customerNotes: "Customer Notes Test",
      defaultRefundChargeAmount: "222.00",
      deposits: [],
      displayNotes: false,
      extraFees: [],
      fromCancelPermit: false,
      labelSubTotalRefund: "$12.00",
      labelTotalCharge: "$0.00",
      labelTotalDeposit: "$0.00",
      labelTotalRefund: "$0.00",
      labelTotalRentalFee: "$0.00",
      refundChargeAmount: "0.00",
      refundChargeDesc: "Cancellation Fee",
      rentalFees: [],
      staffNotes: "Stuff Notes Test",
      subTotalRefund: 12,
      totalCharge: 0,
      totalDeposit: 0,
      totalRefund: 0,
      totalRentalFee: 0
    });
  })

  it('REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT should works fine', () => {
    const initState = fromJS(defaultState);
    const deposits = initState.get('deposits');
    const payload = {
      deposits
    };

    const state = reducer(initState, {
      type: actions.REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT,
      payload
    });

    const depositsState = state.get('deposits');
    expect(deposits).toEqual(depositsState);
  });

  it('REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE should works fine', () => {
    const initState = fromJS({
      ...defaultState,
      totalCharge: 10
    });
    const rentalFees = initState.get('rentalFees');
    const payload = {
      rentalFees
    };

    const state = reducer(initState, {
      type: actions.REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE,
      payload
    });

    const rentalFeesState = state.get('rentalFees');
    expect(rentalFees).toEqual(rentalFeesState);
    expect(state.get('canAddFee')).toBeTruthy();
  });

  it('REFUNDDEPOSITS_CREATE_EXTRA_FEE should works fine', () => {
    let state = fromJS(defaultState);
    const count = state.get('extraFees').size;
    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE
    });

    expect(state.get('extraFees').size).toEqual(count + 1);

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE
    });

    expect(state.get('extraFees').size).toEqual(count + 2);

    state = reducer(
      fromJS({
        ...defaultState,
        extraFees: []
      }),
      {
        type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE
      } 
    )
    expect(state.get('extraFees').size).toBe(1);
    expect(state.get('extraFees').toJS()).toEqual([{
      id: 1,
      claimChargeId: '',
      amount: '',
      canEnterAmount: false,
      validAmount: ''
    }])
  });

  it('REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE should works fine', () => {
    const payload = {
      extraFeeId: 1,
      claimChargeId: 2
    };
    let state = fromJS(defaultState);

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE,
      payload
    });

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE,
      payload
    });

    const extraFee = state.get('extraFees').find(fee => fee.get('id') === payload.extraFeeId);
    expect(extraFee).toBeInstanceOf(Object);
    expect(extraFee.get('claimChargeId')).toEqual(payload.claimChargeId);
  });

  it('REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE should works fine when update unexisting extra fee.', () => {
    const payload = {
      extraFeeId: 1333,
      claimChargeId: 2
    };
    let state = fromJS(defaultState);

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE,
      payload
    });

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE,
      payload
    });

    const extraFee = state.get('extraFees').find(fee => fee.get('id') === payload.extraFeeId);
    expect(extraFee).toBeUndefined();
  });

  it('REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT should works fine', () => {
    const payload = {
      extraFeeId: 1,
      amount: 20
    };
    let state = fromJS(defaultState);

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE,
      payload
    });

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT,
      payload
    });

    const extraFee = state.get('extraFees').find(fee => fee.get('id') === payload.extraFeeId);
    expect(extraFee).toBeInstanceOf(Object);
    expect(extraFee.get('amount')).toEqual(payload.amount);
  });

  it('REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT should works fine when update unexisting fee.', () => {
    const payload = {
      extraFeeId: 111,
      amount: 20
    };
    let state = fromJS(defaultState);

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE,
      payload
    });

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT,
      payload
    });

    const extraFee = state.get('extraFees').find(fee => fee.get('id') === payload.extraFeeId);
    expect(extraFee).toBeUndefined();
  });

  it('REFUNDDEPOSITS_DELETE_EXTRA_FEE should works fine', () => {
    const payload = {
      extraFeeId: 1
    };
    let state = fromJS(defaultState);
    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_CREATE_EXTRA_FEE
    });

    expect(state.get('extraFees').some(fee => fee.get('id') === payload.extraFeeId)).toEqual(true);

    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_DELETE_EXTRA_FEE,
      payload
    });

    expect(state.get('extraFees').some(fee => fee.get('id') === payload.extraFeeId)).toEqual(false);
  });

  it('REFUNDDEPOSITS_UPDATE_NOTES should works fine', () => {
    let payload = {
      notes: 'customer notes',
      notesType: actions.NotesType.Cutomer
    };
    let state = reducer(fromJS(initialState), {
      type: actions.REFUNDDEPOSITS_UPDATE_NOTES,
      payload
    });

    expect(state.get('customerNotes')).toEqual(payload.notes);

    payload = {
      notes: 'staff notes',
      notesType: actions.NotesType.Staff
    };
    state = reducer(state, {
      type: actions.REFUNDDEPOSITS_UPDATE_NOTES,
      payload
    });
    expect(state.get('staffNotes')).toEqual(payload.notes);
  });

  it('REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY should works fine', () => {
    const payload = {
      display: true
    };
    let state = reducer(fromJS(initialState), {
      type: actions.REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY,
      payload
    });

    expect(state.get('displayNotes')).toEqual(payload.display);

    payload.display = false;

    state = reducer(fromJS(initialState), {
      type: actions.REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY,
      payload
    });

    expect(state.get('displayNotes')).toEqual(payload.display);
  });

  it('REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED should works fine when call the API "rest/permit/previewclaimdeposit".', () => {
    const initState = fromJS(Object.assign(
      {},
      initialState,
      {
        extraFees: [{
          id: 1,
          claimChargeId: '',
          amount: '22',
          canEnterAmount: false,
          tax: 12,
          discount: 1
        },
        {
          id: 2,
          claimChargeId: '',
          amount: '',
          canEnterAmount: false
        },
        {
          id: 3,
          claimChargeId: '',
          amount: '22',
          canEnterAmount: false
        }],
        totalCharge: 10
      }
    ));
    const claimDepositList = [{
      index: '1',
      claim_charge_amount: 10,
      claim_tax_amount: 12,
      claim_discount_amount: 22
    }, {
      index: '100',
      claim_tax_amount: 12,
      claim_discount_amount: 22
    }];
    const totalCharge = 30;
    const totalRefund = 120;
    const subTotalRefund = 120;
    const savedDepositList = [1];
    const savedRetalFeeList = [1];
    const claimRefundPreviewError = '';
    const state = reducer(initState, {
      type: actions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED,
      payload: {
        claimDepositList,
        savedDepositList,
        savedRetalFeeList,
        totalCharge,
        totalRefund,
        subTotalRefund,
        claimRefundPreviewError
      }
    });
    
    expect(state.get('extraFees').toJS()).toEqual([{
      id: 1,
      claimChargeId: "",
      canEnterAmount: false,
      tax: 12,
      discount: 22,
      amount: 10,
      validAmount: 10
    },
    {
      id: 2,
      claimChargeId: "",
      amount: "",
      validAmount: '',
      canEnterAmount: false,
      tax: 0,
      discount: 0
    },
    {
      amount: "22",
      canEnterAmount: false,
      claimChargeId: "",
      id: 3
    }]);

    expect(state.get('totalCharge')).toEqual(totalCharge);
    expect(state.get('totalRefund')).toEqual(totalRefund);
    expect(state.get('subTotalRefund')).toEqual(subTotalRefund);
    expect(state.get('labelTotalCharge')).toEqual('$30.00');
    expect(state.get('labelTotalRefund')).toEqual('$120.00');
    expect(state.get('labelSubTotalRefund')).toEqual('$120.00');
  });

  it('REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED should works fine when call the API "rest/permit/previewclaimdeposit" success but has no sufficient deposits to claim.', () => {
    const initState = fromJS(Object.assign(
      {},
      initialState,
      {
        extraFees: [{
          id: 1,
          claimChargeId: '',
          amount: '22',
          canEnterAmount: false,
          tax: 12,
          discount: 1
        },
        {
          id: 2,
          claimChargeId: '',
          amount: '',
          canEnterAmount: false
        }]
      }
    ));
    const claimDepositList = [{
      index: '1',
      claim_tax_amount: 12,
      claim_discount_amount: 22
    }, {
      index: '100',
      claim_tax_amount: 12,
      claim_discount_amount: 22
    }];
    const totalCharge = 30;
    const totalRefund = 120;
    const subTotalRefund = 120;
    const savedDepositList = undefined;
    const savedRetalFeeList = undefined;
    const claimRefundPreviewError = "There's no sufficient deposit to claim.";
    const state = reducer(initState, {
      type: actions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED,
      payload: {
        totalCharge,
        totalRefund,
        subTotalRefund,
        savedDepositList,
        claimDepositList,
        savedRetalFeeList,
        claimRefundPreviewError
      }
    });
    
    expect(state.get('extraFees').toJS()).toEqual([{
      canEnterAmount: true,
      discount: 22,
      tax: 12,
      claim_tax_amount: 12,
      index: "1",
      claim_discount_amount: 22,
      id: 1
    },
    {
      canEnterAmount: true,
      discount: 22,
      tax: 12,
      claim_tax_amount: 12,
      index: "100",
      claim_discount_amount: 22,
      id: 2
    }]);

    expect(state.get('totalCharge')).toEqual(totalCharge);
    expect(state.get('totalRefund')).toEqual(totalRefund);
    expect(state.get('subTotalRefund')).toEqual(subTotalRefund);
    expect(state.get('labelTotalCharge')).toEqual('$30.00');
    expect(state.get('labelTotalRefund')).toEqual('$120.00');
    expect(state.get('labelSubTotalRefund')).toEqual('$120.00');
  });

  it('REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT should works fine', () => {
    const initState = fromJS(defaultState);
    const state = reducer(initState, {
      type: actions.REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT
    });

    expect(state.get('cancelPermit')).toEqual(true);
  });

  it('REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT should works fine', () => {
    const initState = fromJS(defaultState);
    const payload = {
      refundChargeAmount: 100
    }
    const state = reducer(initState, {
      type: actions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT,
      payload
    });

    expect(state.get('refundChargeAmount')).toEqual(100);
  });
});

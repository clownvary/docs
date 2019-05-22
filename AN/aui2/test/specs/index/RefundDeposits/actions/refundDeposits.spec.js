import {
  fromJS
} from 'immutable';
import configureStore from 'redux-mock-store';
import _ from 'lodash';

import middlewares from 'shared/api/middlewares';
import { mockAPI, cleanMock } from '../../../../utils/mockAPI';
import * as testActions from 'index/RefundDeposits/actions/refundDeposits';
import * as prerequisiteActions from 'shared/actions/prerequisite';
import * as locationActions from 'shared/actions/route';
import jsonFeeTaxDiscount from 'json/RefundDeposits/fee_tax_discount.json';

jest.mock('react-base-ui/lib/services/dialog', () => ({
  confirm: jest.fn().mockReturnValue(Promise.resolve())
}));

describe('index -> Refund Deposits -> actions -> refundDeposits', () => {
  let store = null;
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
        selected: false,
        linked_credit: 0,
        refundMessage: "",
        holidayRatePairReceiptDetailID:4
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
        linked_credit: 0,
        refundMessage: "",
        holidayRatePairReceiptDetailID: 1
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
        selected: false,
        linked_credit: 0,
        refundMessage: "",
        holidayRatePairReceiptDetailID:100
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
        id: 100,
        selected: true,
        linked_credit: 10,
        refundMessage: "",
        holidayRatePairReceiptDetailID:1
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
  const initialData = {
    permitID: "1",
    batchID: "1",
    receiptID: "1"
  };
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      refundDeposits: fromJS(defaultState),
      prerequisite: fromJS({
        needOverride: true,
        haveOverrideAuthority: true,
        isOverride: false
      }),
      initialData
    });
  });

  afterEach(() => {
    cleanMock();
    store.clearActions();
  });

  it('getPrerequisiteInfo should works fine when has multiple override dates.', () => {
    const rentalFees = [
      {
        needOverride: true,
        refundDate: "Mar 22, 2017",
        id: 1,
        selected: true
      },
      {
        needOverride: true,
        refundDate: "Mar 21, 2017",
        need_override: true,
        id: 100,
        selected: true
      }
    ];
    const deposits = defaultState.deposits;
    const prerequisiteInfo = testActions.getPrerequisiteInfo(deposits, rentalFees);
    expect(prerequisiteInfo).toEqual({
      needOverride: true,
      refundDate: 'Mar 22, 2017'
    })
  })

  it('getPrerequisiteInfo should works fine when has no need to override.', () => {
    const deposits = [];
    const rentalFees = [];
    const prerequisiteInfo = testActions.getPrerequisiteInfo(deposits, rentalFees);
    expect(prerequisiteInfo).toEqual({
      needOverride: false,
      refundDate: ''
    })
  })

  it('calcuateTotalDeposit should works fine when has no deposites.', () => {
    const deposits = [];
    const totalDeposites = testActions.calcuateTotalDeposit(deposits);
    expect(totalDeposites).toEqual(0);
  })

  it('calcuateTotalDeposit should works fine when has deposites.', () => {
    const totalDeposites = testActions.calcuateTotalDeposit(defaultState.deposits);
    expect(totalDeposites.toFixed(2)).toEqual('5.01');
  })

  it('isDepositAndRentalTotalZero should works fine when has deposites.', () => {
    const isRefundTotalZero = testActions.isDepositAndRentalTotalZero(defaultState.deposits, defaultState.rentalFees);
    expect(isRefundTotalZero).toEqual(false);
  })

  it('isDepositAndRentalTotalZero should works fine when has deposites.', () => {
    const deposits = [
      {
        selected: false,
        amount_paid: 10
      }
    ]
    const rentalFees = [
      {
        selected: false,
        amount_paid: 10
      }
    ]
    const isRefundTotalZero = testActions.isDepositAndRentalTotalZero(deposits, rentalFees);
    expect(isRefundTotalZero).toEqual(true);
  })

  it('updateRefundChargeAmount should works fine when has deposites.', () => {
    const refundChargeAmount = 20;
    const result = testActions.updateRefundChargeAmount(refundChargeAmount);
    expect(result.type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT);
    expect(result.payload).toEqual({
      refundChargeAmount
    })
  })

  it('selectDepositAction should works fine when selected meaningless deposit.', () => {
    const depositId = -100;
    const selected = false;
    store.dispatch(testActions.selectDepositAction(depositId, selected));

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    expect(_.some(actions,
      action => action.type === testActions.REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT)).toBe(true);
  });

  it('selectDepositAction should works fine when no deposit is selected.', () => {
    const depositId = 100;
    const selected = false;
    const deposits = Object.assign({}, defaultState, {
      rentalFees: []
    });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      initialData
    });
    store.dispatch(testActions.selectDepositAction(depositId, selected));

    const actions = store.getActions();
    expect(actions.length).toBe(2);
    expect(actions[0].type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT);
    expect(actions[0].payload).toEqual({
      refundChargeAmount: '0.00'
    });
    expect(actions[1].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT)
    expect(actions[1].payload.deposits.toJS()).toEqual([
      {
        labelChargeAmount: "$10.00",
        needOverride: true,
        receipt_detail_id: 1,
        charge_amount: 10,
        refundDate: "Mar 22, 2017",
        name: "deposit1><&",
        charge_description: "deposit1&gt;&lt;&amp;",
        holidayRatePairReceiptDetailID: 100,
        linkedCredit: "$0.00",
        amount_paid: 10,
        refund_date: "Mar 22, 2017",
        need_override: true,
        labelPaidAmount: "$10.00",
        id: 1,
        selected: false,
        linked_credit: 0,
        refundMessage: ""
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: true,
        receipt_detail_id: 4,
        charge_amount: 10,
        refundDate: "Mar 20, 2017",
        name: "deposit4\"test\"~",
        charge_description: "deposit4&quot;test&quot;&#126;",
        holidayRatePairReceiptDetailID: 1,
        linkedCredit: "$0.00",
        amount_paid: 5.01,
        refund_date: "Mar 20, 2017",
        need_override: true,
        labelPaidAmount: "$5.01",
        id: 100,
        selected: false,
        linked_credit: 10,
        refundMessage: ""
      }
    ]);
  });

  it('selectDepositAction should works fine when no deposit is selected and then select one deposit.', () => {
    const depositId = 1;
    const selected = true;
    const deposits = Object.assign({}, defaultState, {
      rentalFees: [],
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
          selected: false,
          linked_credit: 0
        }
      ]
    });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      initialData
    });
    store.dispatch(testActions.selectDepositAction(depositId, selected));

    const actions = store.getActions();
    expect(actions.length).toBe(2);
    expect(actions[0].type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT);
    expect(actions[0].payload).toEqual({
      refundChargeAmount: defaultState.defaultRefundChargeAmount
    });
    expect(actions[1].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT)
    expect(actions[1].payload.deposits.toJS()).toEqual([
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
      }
    ]);
  });

  it('selectRentalFeeAction should works fine when selected meaningless deposit.', () => {
    const rentalFeeId = -100;
    const selected = false;
    store.dispatch(testActions.selectRentalFeeAction(rentalFeeId, selected));

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
    expect(_.some(actions,
      action => action.type === testActions.REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE)).toBe(true);
  });

  it('selectRentalFeeAction should works fine when no deposit is selected.', () => {
    const rentalFeeId = 4;
    const selected = false;
    const deposits = Object.assign({}, defaultState, {
      deposits: []
    });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      initialData
    });
    store.dispatch(testActions.selectRentalFeeAction(rentalFeeId, selected));

    const actions = store.getActions();
    expect(actions.length).toBe(2);
    expect(actions[0].type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT);
    expect(actions[0].payload).toEqual({
      refundChargeAmount: '0.00'
    });
    expect(actions[1].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE)
    expect(actions[1].payload.rentalFees.toJS()).toEqual([
      {
        labelChargeAmount: "$10.00",
        needOverride: false,
        receipt_detail_id: 1,
        charge_amount: 10,
        refundDate: "",
        name: "deposit1><&",
        charge_description: "deposit1&gt;&lt;&amp;",
        holidayRatePairReceiptDetailID: 4,
        linkedCredit: "$0.00",
        amount_paid: 10,
        refund_date: "",
        need_override: false,
        labelPaidAmount: "$10.00",
        id: 1,
        selected: false,
        linked_credit: 0,
        refundMessage: ""
      },
      {
        labelChargeAmount: "$10.00",
        needOverride: false,
        receipt_detail_id: 4,
        charge_amount: 10,
        refundDate: "",
        name: "deposit4\"test\"~",
        charge_description: "deposit4&quot;test&quot;&#126;",
        holidayRatePairReceiptDetailID: 1,
        linkedCredit: "$0.00",
        amount_paid: 5.01,
        refund_date: "",
        need_override: false,
        labelPaidAmount: "$5.01",
        id: 4,
        selected: false,
        linked_credit: 0,
        refundMessage: ""
      }
    ]);
  });

  it('selectRentalFeeAction should works fine when no deposit is selected and then select one deposit.', () => {
    const rentalFeeId = 1;
    const selected = true;
    const rentalFees = Object.assign({}, defaultState, {
      deposits: [],
      rentalFees: [
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
          selected: false,
          linked_credit: 0
        }
      ]
    });
    const store = mockStore({
      refundDeposits: fromJS(rentalFees),
      initialData
    });
    store.dispatch(testActions.selectRentalFeeAction(rentalFeeId, selected));

    const actions = store.getActions();
    expect(actions.length).toBe(2);
    expect(actions[0].type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT);
    expect(actions[0].payload).toEqual({
      refundChargeAmount: defaultState.defaultRefundChargeAmount
    });
    expect(actions[1].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE)
    expect(actions[1].payload.rentalFees.toJS()).toEqual([
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
      }
    ]);
  });

  it('updateOverridePrerequisiteAction should works fine when no need to override', (done) => {
    const deposits = Object.assign({}, defaultState, {
      deposits: [],
      rentalFees: []
    });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      initialData
    });
    store.dispatch(testActions.updateOverridePrerequisiteAction());

    const actions = store.getActions();
    expect(actions.length).toBe(6);
    expect(actions[0].type).toEqual(prerequisiteActions.PREREQUISITE_CLEAR_ERRORS);
    expect(actions[0].payload).toEqual({
      errorIndex: -1
    })

    expect(actions[1].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_NEED_OVERRIDE);
    expect(actions[1].payload).toEqual({
      needOverride: false
    })

    expect(actions[2].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE);
    expect(actions[2].payload).toEqual({
      isOverride: false
    })

    expect(actions[3].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE_MESSAGE);
    expect(actions[3].payload).toEqual({
      overrideMessage: ''
    })

    expect(actions[4].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_USER_NAME);
    expect(actions[4].payload).toEqual({
      value: ''
    })

    expect(actions[5].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_USER_PASSWORD);
    expect(actions[5].payload).toEqual({
      value: ''
    })
    done();
  });
  
  it('updateOverridePrerequisiteAction should works fine when need override', () => {
    store.dispatch(testActions.updateOverridePrerequisiteAction());
    const actions = store.getActions();
    expect(actions.length).toBe(3);
    expect(actions[0].type).toEqual(prerequisiteActions.PREREQUISITE_CLEAR_ERRORS);
    expect(actions[0].payload).toEqual({
      errorIndex: -1
    })

    expect(actions[1].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_NEED_OVERRIDE);
    expect(actions[1].payload).toEqual({
      needOverride: true
    })

    expect(actions[2].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE_MESSAGE);
    expect(actions[2].payload).toEqual({
      overrideMessage: 'A refund for this transaction may not be processed until Mar 20, 2017'
    })
  });

  it('createExtraFeeAction should works fine', (done) => {
    store.dispatch(testActions.createExtraFeeAction());

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action => action.type === testActions.REFUNDDEPOSITS_CREATE_EXTRA_FEE)).toBe(true);
    done();
  });

  it('updateExtraFeeClaimChargeAction should works fine', (done) => {
    const extraFeeId = 1;
    const claimChargeId = 2;
    store.dispatch(testActions.updateExtraFeeClaimChargeAction(extraFeeId, claimChargeId));

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action =>
      action.type === testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE)).toBe(true);
    const act = _.find(actions,
      action => action.type === testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE);
    expect(act.payload.extraFeeId).toBe(extraFeeId);
    expect(act.payload.claimChargeId).toBe(claimChargeId);
    done();
  });

  it('updateExtraFeeAmountAction should works fine', (done) => {
    const extraFeeId = 1;
    const amount = 5.01;
    store.dispatch(testActions.updateExtraFeeAmountAction(extraFeeId, amount));

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action =>
      action.type === testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT)).toBe(true);
    const act = _.find(actions,
      action => action.type === testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT);
    expect(act.payload.extraFeeId).toBe(extraFeeId);
    expect(act.payload.amount).toBe(amount);
    done();
  });

  it('deleteExtraFeeAction should works fine', (done) => {
    const extraFeeId = 1;
    store.dispatch(testActions.deleteExtraFeeAction(extraFeeId));

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action =>
      action.type === testActions.REFUNDDEPOSITS_DELETE_EXTRA_FEE)).toBe(true);
    const act = _.find(actions,
      action => action.type === testActions.REFUNDDEPOSITS_DELETE_EXTRA_FEE);
    expect(act.payload.extraFeeId).toBe(extraFeeId);
    done();
  });

  it('showNotesAction should works fine', (done) => {
    store.dispatch(testActions.showNotesAction());

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action =>
      action.type === testActions.REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY)).toBe(true);
    const act = _.find(actions,
      action => action.type === testActions.REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY);
    expect(act.payload.display).toBe(true);
    done();
  });

  it('hideNotesAction should works fine', (done) => {
    store.dispatch(testActions.hideNotesAction());

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action =>
      action.type === testActions.REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY)).toBe(true);
    const act = _.find(actions,
      action => action.type === testActions.REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY);
    expect(act.payload.display).toBe(false);
    done();
  });

  it('changeStaffNotesAction should works fine', (done) => {
    const notes = 'changeStaffNotesAction';
    store.dispatch(testActions.changeStaffNotesAction(notes));

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action =>
      action.type === testActions.REFUNDDEPOSITS_UPDATE_NOTES)).toBe(true);
    const act = _.find(actions,
      action => action.type === testActions.REFUNDDEPOSITS_UPDATE_NOTES);
    expect(act.payload.notes).toBe(notes);
    expect(act.payload.notesType).toBe(testActions.NotesType.Staff);
    done();
  });

  it('changeCustomerNotesAction should works fine', (done) => {
    const notes = 'changeCustomerNotesAction';
    store.dispatch(testActions.changeCustomerNotesAction(notes));

    const actions = store.getActions();
    expect(actions.length).toBeGreaterThanOrEqual(1);
    expect(_.some(actions,
      action =>
      action.type === testActions.REFUNDDEPOSITS_UPDATE_NOTES)).toBe(true);
    const act = _.find(actions,
      action => action.type === testActions.REFUNDDEPOSITS_UPDATE_NOTES);
    expect(act.payload.notes).toBe(notes);
    expect(act.payload.notesType).toBe(testActions.NotesType.Cutomer);
    done();
  });

  it('cancelAction should works fine', () => {
    store.dispatch(testActions.cancelAction());
    const actions = store.getActions();
    expect(_.some(actions, action =>
        action.type === locationActions.REDIRECT)).toBe(true);
  });

  it('getTotalLinkedCredit should works fine', () => {
    const totalLinkedCredit = testActions.getTotalLinkedCredit(fromJS(defaultState));
    expect(totalLinkedCredit).toBe(10);
  });

  it('validateAction should works fine when need oveerride and isOverride is false', (done) => {
    store.dispatch(testActions.validateAction()).catch(() => {
      const actions = store.getActions();
      
      expect(actions.length).toBeGreaterThanOrEqual(1);
      expect(actions[0].type).toBe(prerequisiteActions.PREREQUISITE_ADD_ERRORS);
      expect(actions[0].payload).toEqual({
        errors: [{
          message: "You must check override to complete the transaction.",
          type: "override"
        }]
      });
      done();
    });
  });

  it('validateAction should works fine when need oveerride and haveOverrideAuthority is false and no user name provided', (done) => {
    const deposits = Object.assign({}, defaultState);
    const prerequisite = Object.assign({}, { haveOverrideAuthority: false, isOverride: true, needOverride: true });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    store.dispatch(testActions.validateAction()).catch(() => {
      const actions = store.getActions();
      
      expect(actions.length).toBeGreaterThanOrEqual(1);
      expect(actions[0].type).toBe(prerequisiteActions.PREREQUISITE_ADD_ERRORS);
      expect(actions[0].payload).toEqual({
        errors: [{
          message: "You must supply a user authorized to perform override.",
          type: "user"
        }]
      });
      done();
    });
  });

  it('validateAction should works fine when need oveerride and haveOverrideAuthority is false and no user password provided', (done) => {
    const deposits = Object.assign({}, defaultState);
    const prerequisite = Object.assign({}, { haveOverrideAuthority: false, needOverride: true, isOverride: true, userName: 'test name' });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    store.dispatch(testActions.validateAction()).catch(() => {
      const actions = store.getActions();
      
      expect(actions.length).toBeGreaterThanOrEqual(1);
      expect(actions[0].type).toBe(prerequisiteActions.PREREQUISITE_ADD_ERRORS);
      expect(actions[0].payload).toEqual({
        errors: [{
          message: "You must supply a user authorized to perform override.",
          type: "user"
        }]
      });
      done();
    });
  });

  it('validateAction should works fine when totalLinkedCredit more than zero and confirm unlink credit.', (done) => {
    const prerequisite = Object.assign({}, { needOverride: false });
    const deposits = Object.assign({}, defaultState, { needOverride: false });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    store.dispatch(testActions.validateAction()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(0);
      done();
    });
  });
 
  it('validateAction should works fine when totalLinkedCredit is zero.', (done) => {
    const prerequisite = Object.assign({}, { needOverride: false });
    const deposits = Object.assign({}, defaultState, {
      deposits: [],
      rentalFees: [],
      needOverride: false
    });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    store.dispatch(testActions.validateAction()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(0);
      done();
    });
  });

  it('submitAction should works fine when needOverride === false', (done) => {
    const prerequisite = Object.assign({}, { needOverride: false });
    const deposits = Object.assign({}, defaultState, { needOverride: false });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    store.dispatch(testActions.submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBeGreaterThanOrEqual(3);
      expect(actions.some(act => act.type === locationActions.REDIRECT)).toEqual(true);
      done();
    });
  });

  it('submitAction should works fine when needOverride === false and is_refund === true', (done) => {
    const deposits = Object.assign({}, defaultState);
    const prerequisite = Object.assign({}, { needOverride: false });
    mockAPI({
      path: '/json/RefundDeposits/refund_deposits.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful",
          "page_info": {
            "pageCount": 1,
            "recordCount": 0,
            "multiplePage": false,
            "order_by": "",
            "order_option": "ASC",
            "total_records_per_page": 30,
            "total_page": 1,
            "total_records": 0,
            "page_number": 1
          }
        },
        "body": {
          "payment_or_refund": {
            "batch_id": 0,
            "receipt_id": 0,
            "amount_due": -3,
            "non_monetary_receipt": false,
            "receipt_header_id": 0,
            "is_refund": true,
            "override_info": {
              "success": false
            }
          }
        }
      }
    });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    __STATIC__ = false;

    store.dispatch(testActions.submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBeGreaterThanOrEqual(3);
      expect(actions.some(act => act.type === locationActions.REDIRECT)).toEqual(true);
      expect(actions[actions.length - 1].payload).toEqual({
        url: '/ui.do?method=showPayment&permit_id=1&batch_id=0&receipt_id=0&draft_receipt_id=1&source_page_index=6&cancel_permit=false&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined',
        useReplace: undefined,
        win: undefined
      })
      __STATIC__ = true;
      done();
    });
  });

  it('submitAction should works fine when needOverride === false and non_monetary_receipt === true', (done) => {
    const deposits = Object.assign({}, defaultState);
    const prerequisite = Object.assign({}, { needOverride: false });
    mockAPI({
      path: '/json/RefundDeposits/refund_deposits.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": "Successful",
          "page_info": {
            "pageCount": 1,
            "recordCount": 0,
            "multiplePage": false,
            "order_by": "",
            "order_option": "ASC",
            "total_records_per_page": 30,
            "total_page": 1,
            "total_records": 0,
            "page_number": 1
          }
        },
        "body": {
          "payment_or_refund": {
            "batch_id": 0,
            "receipt_id": 0,
            "amount_due": -3,
            "non_monetary_receipt": true,
            "receipt_header_id": 0,
            "is_refund": false,
            "override_info": {
              "success": false
            }
          }
        }
      }
    });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    __STATIC__ = false;
    store.dispatch(testActions.submitAction()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBeGreaterThanOrEqual(3);
      expect(actions.some(act => act.type === locationActions.REDIRECT)).toEqual(true);
      expect(actions[actions.length - 1].payload).toEqual({
        url: '/ui.do?method=reservationDetail&permit_id=1&entry_page_index=undefined&calendar_month_date=undefined&calendar_day_date=undefined&calendar_view_type=undefined&calendar_date_format=undefined',
        useReplace: undefined,
        win: undefined
      })
      __STATIC__ = true;
      done();
    });
  });

  it('submitAction should works fine when extraFees !== []', (done) => {
    const extraFees = [{
      claim_charge_id:73,
      claim_charge_amount:2,
      id:1,
      claimChargeId:73,
      amount:2,
      canEnterAmount:true,
    }]
    const deposits = Object.assign({}, defaultState, { extraFees });
    const prerequisite = Object.assign({}, { needOverride: false });
    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });
    store.dispatch(testActions.submitAction()).then(() => {
      const actions = store.getActions();
      expect(_.some(actions, action => action.type === locationActions.REDIRECT)).toBe(true);
    })
    done();
  });

  it('submitAction should works fine when call API refundDeposits.json fail', (done) => {
    const deposits = Object.assign({}, defaultState);
    const prerequisite = Object.assign({}, { needOverride: false });
    const mockResponse = {
      "headers": {
        "response_code": "2221",
        "response_message": "error refund desposit",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {}
    };
    mockAPI({
      path: '/json/RefundDeposits/refund_deposits.json',
      result: mockResponse
    });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    store.dispatch(testActions.submitAction()).catch(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(3);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('ADD_ERROR');
      expect(actions[1].payload).toEqual({
        code: "2221",
        message: "error refund desposit",
        isSystemError: false
      });
      expect(actions[2].type).toBe('');
      expect(actions[2].error.payload).toEqual(mockResponse);
      done();
    });
  });

  it('updateExtraFeeRelatedAction should works fine when needOverride === false', (done) => {
    const feeAndRefundData = {};
    store.dispatch(testActions.updateExtraFeeRelatedAction(feeAndRefundData))
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED);
    expect(actions[0].payload).toEqual(feeAndRefundData);
    done();
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" success.', (done) => {
    const extraFees = [{
      claim_charge_id:73,
      claim_charge_amount:2,
      id:1,
      claimChargeId:73,
      amount:2,
      canEnterAmount:true,
    }];
    const deposits = Object.assign({}, defaultState, { extraFees });
    const prerequisite = Object.assign({}, { needOverride: false });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction({ extraFeeId: -1 })).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(6);

      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('');
      expect(actions[1].payload).toEqual(jsonFeeTaxDiscount);
      

      expect(actions[2].type).toBe(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED);
      expect(actions[2].payload).toEqual({
        claimDepositList: [
          {
            claim_charge_id: 1,
            claim_charge_amount: 2,
            claim_tax_amount: 99,
            claim_discount_amount: 111,
            index: 1
          }
        ],
        savedDepositList: [1],
        savedRetalFeeList: [2],
        totalRefund: 20,
        totalCharge: 12,
        subTotalRefund: 20,
        claimRefundPreviewError: ""
      });
      expect(actions[3].type).toEqual(prerequisiteActions.PREREQUISITE_CLEAR_ERRORS);
      expect(actions[3].payload).toEqual({
        errorIndex: -1
      });
      expect(actions[4].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_NEED_OVERRIDE);
      expect(actions[4].payload).toEqual({
        needOverride: true
      });
      expect(actions[5].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE_MESSAGE);
      expect(actions[5].payload).toEqual({
        overrideMessage: 'A refund for this transaction may not be processed until Mar 20, 2017'
      });
      done();
    });
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" success at first but has no sufficient deposits to claim.', (done) => {
    const extraFees = [{
      claim_charge_id:73,
      claim_charge_amount:2,
      id:1,
      claimChargeId:73,
      amount:2,
      canEnterAmount:true,
    }];
    const deposits = Object.assign({}, defaultState, { extraFees });
    const prerequisite = Object.assign({}, { needOverride: false });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    const mockResponse = {
      "headers": {
        "response_code": "0000",
        "response_message": "successfully",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {
        "refund_preview_error": "There's no sufficient deposit to claim."
      }
    };
    mockAPI({
      path: '/json/RefundDeposits/fee_tax_discount.json',
      result: mockResponse
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction({ extraFeeId: -1 })).then(() => {
      const actions = store.getActions();

      expect(actions.length).toBe(6);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('');
      expect(actions[1].payload).toEqual(mockResponse);
      expect(actions[2].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED);
      expect(actions[2].payload).toEqual({
        claimRefundPreviewError: "There's no sufficient deposit to claim."
      });
      expect(actions[3].type).toEqual(prerequisiteActions.PREREQUISITE_CLEAR_ERRORS);
      expect(actions[3].payload).toEqual({
        errorIndex: -1
      });
      expect(actions[4].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_NEED_OVERRIDE);
      expect(actions[4].payload).toEqual({
        needOverride: true
      });
      expect(actions[5].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE_MESSAGE);
      expect(actions[5].payload).toEqual({
        overrideMessage: 'A refund for this transaction may not be processed until Mar 20, 2017'
      });
      done();
    });
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" and has sufficient deposits to claim.', (done) => {
    const extraFees = [{
      claim_charge_id:73,
      claim_charge_amount:2,
      id:1,
      claimChargeId:73,
      amount:2,
      canEnterAmount:true,
    }];
    const deposits = Object.assign({}, defaultState, { extraFees });
    const prerequisite = Object.assign({}, { needOverride: false });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    const mockResponse = {
      "headers": {
        "response_code": "0000",
        "response_message": "successfully",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {
        "refund_preview": {
          "selected_claim_charges":[
            {
              "claim_charge_id": 1,
              "claim_charge_amount": 5,
              "index": 1
            }
          ]
        }
      }
    };
    mockAPI({
      path: '/json/RefundDeposits/fee_tax_discount.json',
      result: mockResponse
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction({ extraFeeId: 1 })).then((data) => {
      const actions = store.getActions();
      
      expect(actions.length).toBe(6);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('');
      expect(actions[1].payload).toEqual(mockResponse);
      expect(actions[2].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED);
      expect(actions[2].payload).toEqual({
        claimDepositList: [
          {
            claim_charge_id: 1,
            claim_charge_amount: 5,
            index: 1
          }
        ]
      })
      done();
    });
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" success at first but has no sufficient deposits to claim and extraFeeId is valid.', (done) => {
    const extraFees = [{
      claim_charge_id:73,
      claim_charge_amount:2,
      id:1,
      claimChargeId:73,
      amount:2,
      canEnterAmount:true,
    }];
    const deposits = Object.assign({}, defaultState, { extraFees });
    const prerequisite = Object.assign({}, { needOverride: false });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    const mockResponse = {
      "headers": {
        "response_code": "0000",
        "response_message": "successfully",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {
        "refund_preview_error": "There's no sufficient deposit to claim.",
        "refund_preview": {
          "selected_claim_charges":[
            {
              "claim_charge_id": 1,
              "claim_charge_amount": 5,
              "index": 1
            }
          ]
        }
      }
    };
    mockAPI({
      path: '/json/RefundDeposits/fee_tax_discount.json',
      result: mockResponse
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction({ extraFeeId: 1 })).then(() => {
      const actions = store.getActions();

      expect(actions.length).toBe(3);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('');
      expect(actions[1].payload).toEqual(mockResponse);
      expect(actions[2].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT);
      expect(actions[2].payload).toEqual({
        extraFeeId: 1,
        amount: 5
      });
      done();
    });
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" success at first but has no sufficient deposits to claim and extraFeeId is valid but no cached valid fee amound.', (done) => {
    const extraFees = [{
      claim_charge_id:73,
      claim_charge_amount:2,
      id:1,
      claimChargeId:73,
      amount:2,
      canEnterAmount:true,
    }];
    const deposits = Object.assign({}, defaultState, { extraFees });
    const prerequisite = Object.assign({}, { needOverride: false });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    const mockResponse = {
      "headers": {
        "response_code": "0000",
        "response_message": "successfully",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {
        "refund_preview_error": "There's no sufficient deposit to claim."
      }
    };
    mockAPI({
      path: '/json/RefundDeposits/fee_tax_discount.json',
      result: mockResponse
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction({ extraFeeId: 1 })).then(() => {
      const actions = store.getActions();

      expect(actions.length).toBe(3);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('');
      expect(actions[1].payload).toEqual(mockResponse);
      expect(actions[2].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT)
      expect(actions[2].payload).toEqual({
        extraFeeId: 1,
        amount: 0
      })
      done();
    });
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" fail for has no sufficent deposit to refund.', (done) => {
    const deposits = Object.assign({}, defaultState, {
      deposits: [{
        selected: false
      }]
    });
    const prerequisite = Object.assign({}, { needOverride: false });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    const mockResponse = {
      "headers": {
        "response_code": "0000",
        "response_message": "successfully",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {
        "refund_preview_error": "There's no sufficient deposit to claim.",
        "refund_preview": {
          "selected_deposit_fees": [ 1 ],
          "refund_charge_amount": '12.00'
        }
      }
    };
    mockAPI({
      path: '/json/RefundDeposits/fee_tax_discount.json',
      result: mockResponse
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(10);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('');
      expect(actions[1].payload).toEqual(mockResponse);
      expect(actions[2].type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT);
      expect(actions[2].payload).toEqual({
        refundChargeAmount: '12.00'
      });
      expect(actions[3].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED);

      expect(actions[3].payload).toEqual({
        savedDepositList: [1],
        claimRefundPreviewError: "There's no sufficient deposit to claim."
      })
      expect(actions[4].type).toEqual(prerequisiteActions.PREREQUISITE_CLEAR_ERRORS);
      
      expect(actions[4].payload).toEqual({
        errorIndex: -1
      })

      expect(actions[5].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_NEED_OVERRIDE);
      expect(actions[5].payload).toEqual({
        needOverride: false
      });
      expect(actions[6].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE);
      expect(actions[6].payload).toEqual({
        isOverride: false
      });
      expect(actions[7].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE_MESSAGE);
      expect(actions[7].payload).toEqual({
        overrideMessage: ''
      });

      expect(actions[8].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_USER_NAME);
      expect(actions[8].payload).toEqual({
        value: ''
      });
      expect(actions[9].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_USER_PASSWORD);
      expect(actions[9].payload).toEqual({
        value: ''
      });

      done();
    });
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" fail for has no sufficent rental fees to refund.', (done) => {
    const deposits = Object.assign({}, defaultState, {
      rentalFees: [{
        selected: false
      }]
    });
    const prerequisite = Object.assign({}, { needOverride: false });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    const mockResponse = {
      "headers": {
        "response_code": "0000",
        "response_message": "successfully",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {
        "refund_preview_error": "There's no sufficient deposit to claim.",
        "refund_preview": {
          "selected_rental_fees": [ 1 ],
          "refund_charge_amount": '12.00'
        }
      }
    };
    mockAPI({
      path: '/json/RefundDeposits/fee_tax_discount.json',
      result: mockResponse
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction()).then(() => {
      const actions = store.getActions();

      expect(actions.length).toBe(7);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('');
      expect(actions[1].payload).toEqual(mockResponse);
      expect(actions[2].type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT);
      expect(actions[2].payload).toEqual({
        refundChargeAmount: '12.00'
      });
      expect(actions[3].type).toEqual(testActions.REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED);

      expect(actions[3].payload).toEqual({
        savedRetalFeeList: [1],
        claimRefundPreviewError: "There's no sufficient deposit to claim."
      })
      expect(actions[4].type).toEqual(prerequisiteActions.PREREQUISITE_CLEAR_ERRORS);
      
      expect(actions[4].payload).toEqual({
        errorIndex: -1
      })

      expect(actions[5].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_NEED_OVERRIDE);
      expect(actions[5].payload).toEqual({
        needOverride: true
      });

      expect(actions[6].type).toEqual(prerequisiteActions.PREREQUISITE_UPDATE_OVERRIDE_MESSAGE);
      expect(actions[6].payload).toEqual({
        overrideMessage: 'A refund for this transaction may not be processed until Mar 20, 2017'
      });

      done();
    });
  });

  it('getFeeTaxAndDiscountAction should works fine when call API "URL.getFeeTaxAndDiscount" failed.', (done) => {
    const deposits = Object.assign({}, defaultState);
    const prerequisite = Object.assign({}, { needOverride: false });
    const mockResponse = {
      "headers": {
        "response_code": "1220",
        "response_message": "error happend to calculate the tax and discount",
        "page_info": {
          "pageCount": 1,
          "recordCount": 0,
          "multiplePage": false,
          "order_by": "",
          "order_option": "ASC",
          "total_records_per_page": 30,
          "total_page": 1,
          "total_records": 0,
          "page_number": 1
        }
      },
      "body": {
      }
    };
    mockAPI({
      path: '/json/RefundDeposits/fee_tax_discount.json',
      result: mockResponse
    });

    const store = mockStore({
      refundDeposits: fromJS(deposits),
      prerequisite: fromJS(prerequisite),
      initialData
    });

    store.dispatch(testActions.getFeeTaxAndDiscountAction({extraFeeId: -1})).catch(() => {
      const actions = store.getActions();

      expect(actions.length).toBe(3);
      expect(actions[0].type).toBe('');
      expect(actions[1].type).toBe('ADD_ERROR');
      expect(actions[1].payload).toEqual({
        code: "1220",
        message: "error happend to calculate the tax and discount",
        isSystemError: false
      });
      expect(actions[2].type).toBe('');
      expect(actions[2].error.payload).toEqual(mockResponse);
      done();
    });
  });

  it('changeCancelPermitAction should works fine', () => {
    store.dispatch(testActions.changeCancelPermitAction());
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toEqual(testActions.REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT);
  });
});
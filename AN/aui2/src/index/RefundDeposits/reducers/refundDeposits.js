import { fromJS } from 'immutable';
import queryString from 'query-string';
import isArray from 'lodash/isArray';
import maxBy from 'lodash/maxBy';
import map from 'lodash/map';
import find from 'lodash/find';
import { pages } from 'shared/consts';
import reducerHandler from 'shared/utils/reducerHandler';
import currencyHelper from 'shared/utils/currencyHelper';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import {
  REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT,
  REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE,
  REFUNDDEPOSITS_CREATE_EXTRA_FEE,
  REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE,
  REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT,
  REFUNDDEPOSITS_DELETE_EXTRA_FEE,
  REFUNDDEPOSITS_UPDATE_NOTES,
  REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY,
  REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED,
  REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT,
  REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT,
  NotesType,
  calcuateTotalDeposit,
  isDepositAndRentalTotalZero
} from '../actions/refundDeposits';

const qs = queryString.parse(location.search);
const fromCancelPermit = qs[pages.cancelPermit] === 'true';
const defaultState = fromJS({
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
  fromCancelPermit
});

const generateId = (arr) => {
  /* istanbul ignore else */
  if (isArray(arr) && arr.length > 0) {
    return maxBy(arr, 'id').id + 1;
  }

  return 1;
};

const getNewExtraFee = arr => ({
  id: generateId(arr),
  claimChargeId: '',
  amount: '',
  validAmount: '',
  canEnterAmount: false
});

const calcuateTotal = state => state.withMutations((s) => {
  const claimCharges = s.get('claimCharges');
  const deposits = s.get('deposits');
  const rentalFees = s.get('rentalFees');
  const totalDeposit = currencyHelper.fixedMoney(calcuateTotalDeposit(deposits.toJS()));
  const totalRentalFee = currencyHelper.fixedMoney(calcuateTotalDeposit(rentalFees.toJS()));
  const totalRefund = s.get('totalRefund');
  const totalCharge = s.get('totalCharge');
  const subTotalRefund = s.get('subTotalRefund');

  s.set('totalDeposit', totalDeposit);
  s.set('totalRentalFee', totalRentalFee);

  s.set('labelTotalDeposit', currencyHelper.formatCurrency(totalDeposit));
  s.set('labelTotalCharge', currencyHelper.formatCurrency(totalCharge));
  s.set('labelTotalRentalFee', currencyHelper.formatCurrency(totalRentalFee));

  s.set('labelSubTotalRefund', currencyHelper.formatCurrency(subTotalRefund));
  s.set('labelTotalRefund', currencyHelper.formatCurrency(Math.abs(totalRefund)));
  s.set('canAddFee', (totalDeposit - totalCharge) > 0 && claimCharges.size > 0);
});

const getExtraFees = (claimCharges, claimDepositList) => map(claimDepositList, (fee, index) => {
  const cc = find(claimCharges, claimCharge => claimCharge.id === fee.claim_charge_id);
  return {
    ...cc,
    ...fee,
    id: index + 1,
    claimChargeId: fee.claim_charge_id,
    amount: fee.claim_charge_amount,
    validAmount: fee.claim_charge_amount,
    canEnterAmount: true,
    tax: fee.claim_tax_amount,
    discount: fee.claim_discount_amount
  };
});

const getSavedDeposits = (savedDeposits, deposits) => {
  /* istanbul ignore else */
  if (isArray(savedDeposits)) {
    return map(deposits, deposit => ({
      ...deposit,
      selected: !!find(savedDeposits,
        savedDepositId => savedDepositId === deposit.receipt_detail_id)
    }));
  }

  return deposits;
};

const getSavedRentalFees = (savedRentalFees, rentalFees) => {
  /* istanbul ignore else */
  if (isArray(savedRentalFees)) {
    return map(rentalFees, rentalFee => ({
      ...rentalFee,
      selected: !!find(savedRentalFees,
        savedDepositId => savedDepositId === rentalFee.receipt_detail_id)
    }));
  }

  return rentalFees;
};

const getInitState = (state, initData) => calcuateTotal(state.withMutations((s) => {
  const {
    initData: {
      deposit_fees: initDepositFees,
      claim_charges: initClaimCharges,
      rental_fees: initRentalFees,
      sub_refund_total: initSubTotalRefund,
      refund_total: initTotalRefund,
      refund_charge: initRefundCharge
    },
    // ONLY if user click [Back] button in Payment Page and back to refundDeposit page,
    // then savedData will be filled with saved data.
    savedData: {
      selected_deposit_fees: savedDepositList,
      selected_rental_fees: savedRentalChargeList,
      selected_claim_charges: savedClaimDepositList,
      customer_notes: customerNotes,
      staff_notes: staffNotes,
      claim_total: savedTotalCharge,
      refund_total: savedTotalRefund,
      sub_refund_total: savedSubTotalRefund,
      refund_charge_amount: savedRefundChargeAmount,
      cancel_permit: savedCancelPermit
    }
  } = initData;
  let deposits = map(initDepositFees, deposit => ({
    ...deposit,
    selected: true,
    id: deposit.receipt_detail_id,
    name: decodeHtmlStr(deposit.charge_description),
    labelChargeAmount: currencyHelper.formatCurrency(deposit.charge_amount),
    labelPaidAmount: currencyHelper.formatCurrency(deposit.amount_paid),
    needOverride: deposit.need_override,
    refundDate: deposit.refund_date,
    linkedCredit: currencyHelper.formatCurrency(deposit.linked_credit),
    refundMessage: decodeHtmlStr(deposit.refund_message),
    holidayRatePairReceiptDetailID: deposit.holiday_rate_pair_receipt_detail_id
  }));

  let rentalFees = map(initRentalFees, rentalFee => ({
    ...rentalFee,
    selected: true,
    id: rentalFee.receipt_detail_id,
    name: decodeHtmlStr(rentalFee.charge_description),
    labelChargeAmount: currencyHelper.formatCurrency(rentalFee.charge_amount),
    labelPaidAmount: currencyHelper.formatCurrency(rentalFee.amount_paid),
    needOverride: rentalFee.need_override,
    refundDate: rentalFee.refund_date,
    linkedCredit: currencyHelper.formatCurrency(rentalFee.linked_credit),
    refundMessage: decodeHtmlStr(rentalFee.refund_message),
    holidayRatePairReceiptDetailID: rentalFee.holiday_rate_pair_receipt_detail_id
  }));

  const claimCharges = map(initClaimCharges, claimCharge => ({
    ...claimCharge,
    id: claimCharge.claim_charge_id,
    name: decodeHtmlStr(claimCharge.claim_charge_name),
    text: decodeHtmlStr(claimCharge.claim_charge_name),
    value: claimCharge.claim_charge_id
  }));
  const refundCharge = initRefundCharge;

  deposits = getSavedDeposits(savedDepositList, deposits);
  rentalFees = getSavedRentalFees(savedRentalChargeList, rentalFees);
  s.set('deposits', fromJS(deposits));
  s.set('rentalFees', fromJS(rentalFees));
  s.set('claimCharges', fromJS(claimCharges));

  /* istanbul ignore else */
  if (isArray(savedClaimDepositList)) {
    const extraFees = getExtraFees(claimCharges, savedClaimDepositList);
    s.set('extraFees', fromJS(extraFees));
  }

  /* istanbul ignore else */
  if (customerNotes) {
    s.set('customerNotes', decodeHtmlStr(customerNotes));
  }

  /* istanbul ignore else */
  if (staffNotes) {
    s.set('staffNotes', decodeHtmlStr(staffNotes));
  }

  const isDepAndRenTotalZero = isDepositAndRentalTotalZero(deposits, rentalFees);
  let totalRefund = savedTotalRefund || initTotalRefund;

  if (isDepAndRenTotalZero) {
    totalRefund = 0;
  }

  s.set('totalCharge', savedTotalCharge || currencyHelper.fixedMoney(0));
  s.set('totalRefund', totalRefund);
  s.set('subTotalRefund', savedSubTotalRefund !== undefined ? savedSubTotalRefund : initSubTotalRefund);

  /* istanbul ignore else */
  if (refundCharge) {
    const defaultRefundChargeAmount = refundCharge.refund_charge_amount;
    let refundChargeAmount = savedRefundChargeAmount !== undefined ?
      savedRefundChargeAmount : defaultRefundChargeAmount;
    if (isDepAndRenTotalZero) {
      refundChargeAmount = '0.00';
    }
    s.set('refundChargeAmount', currencyHelper.fixedMoneyString(refundChargeAmount)); // cancellation fee
    s.set('defaultRefundChargeAmount', currencyHelper.fixedMoneyString(defaultRefundChargeAmount));
    s.set('refundChargeDesc', refundCharge.charge_description);
  }

  s.set('cancelPermit', savedCancelPermit || fromCancelPermit);
}));

const handlers = {
  [REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT](state, {
    payload: {
      deposits
    }
  }) {
    return calcuateTotal(state.withMutations((s) => {
      s.set('deposits', deposits);
    }));
  },

  [REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE](state, {
    payload: {
      rentalFees
    }
  }) {
    return calcuateTotal(state.withMutations((s) => {
      s.set('rentalFees', rentalFees);
    }));
  },

  [REFUNDDEPOSITS_CREATE_EXTRA_FEE](state) {
    const extraFees = state.get('extraFees').toJS();
    extraFees.push(getNewExtraFee(extraFees));

    return calcuateTotal(state.set('extraFees', fromJS(extraFees)));
  },

  [REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE](state, {
    payload: {
      extraFeeId,
      claimChargeId
    }
  }) {
    return calcuateTotal(state.withMutations((s) => {
      /* istanbul ignore else */
      if (extraFeeId > 0) {
        const extraFees = s.get('extraFees').map((fee) => {
          /* istanbul ignore else */
          if (fee.get('id') === extraFeeId) {
            return fee.withMutations((s2) => {
              s2.set('claimChargeId', claimChargeId);
              const claimCharge = s.get('claimCharges').find(cc => cc.get('id') === claimChargeId);
              s2.set('amount', claimCharge.get('claim_charge_amount'));
              s2.set('canEnterAmount', claimChargeId > 0);
            });
          }
          return fee;
        });

        s.set('extraFees', extraFees);
      }
    }));
  },

  [REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT](state, {
    payload: {
      extraFeeId,
      amount
    }
  }) {
    return calcuateTotal(state.withMutations((s) => {
      /* istanbul ignore else */
      if (extraFeeId > 0) {
        const extraFees = s.get('extraFees').map((fee) => {
          /* istanbul ignore else */
          if (fee.get('id') === extraFeeId) {
            return fee.set('amount', amount);
          }
          return fee;
        });
        s.set('extraFees', extraFees);
      }
    }));
  },

  [REFUNDDEPOSITS_DELETE_EXTRA_FEE](state, {
    payload: {
      extraFeeId
    }
  }) {
    return calcuateTotal(state.withMutations((s) => {
      const extraFees = s.get('extraFees').filter(fee => fee.get('id') !== extraFeeId);
      s.set('extraFees', extraFees);
    }));
  },

  [REFUNDDEPOSITS_UPDATE_NOTES](state, {
    payload: {
      notes,
      notesType
    }
  }) {
    return state.withMutations((s) => {
      if (notesType === NotesType.Cutomer) {
        s.set('customerNotes', notes);
      } /* istanbul ignore next */ else if (notesType === NotesType.Staff) {
        s.set('staffNotes', notes);
      }
    });
  },

  [REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY](state, {
    payload: {
      display
    }
  }) {
    return state.set('displayNotes', display);
  },

  [REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED](
    state,
    {
      payload: {
        claimDepositList,
        savedDepositList,
        savedRetalFeeList,
        totalCharge,
        totalRefund,
        subTotalRefund,
        claimRefundPreviewError
      }
    }
  ) {
    const deposits = getSavedDeposits(savedDepositList, state.get('deposits').toJS());
    const rentalFees = getSavedRentalFees(savedRetalFeeList, state.get('rentalFees').toJS());
    const claimCharges = state.get('claimCharges').toJS();

    return calcuateTotal(state.withMutations((s) => {
      let extraFees = [];
      /* istanbul ignore else */
      if (isArray(claimDepositList)) {
        if (claimRefundPreviewError) {
          extraFees = getExtraFees(claimCharges, claimDepositList);
        } else {
          extraFees = state.get('extraFees').map((extraFee) => {
            const feeForClaimDeposit = find(
              claimDepositList,
              claimDeposit => +claimDeposit.index === extraFee.get('id')
            );

            if (!feeForClaimDeposit) {
              if (+extraFee.get('amount') === 0) {
                return extraFee.withMutations((fee) => {
                  fee.set('tax', 0);
                  fee.set('discount', 0);
                  fee.set('validAmount', '');
                });
              }
              return extraFee;
            }

            return extraFee.withMutations((fee) => {
              fee.set('tax', feeForClaimDeposit.claim_tax_amount);
              fee.set('discount', feeForClaimDeposit.claim_discount_amount);
              fee.set('amount', feeForClaimDeposit.claim_charge_amount);
              fee.set('validAmount', feeForClaimDeposit.claim_charge_amount);
            });
          });
        }
      }

      s.set('extraFees', fromJS(extraFees));
      s.set('deposits', fromJS(deposits));
      s.set('rentalFees', fromJS(rentalFees));
      s.set('totalCharge', totalCharge);
      s.set('totalRefund', totalRefund);
      s.set('subTotalRefund', subTotalRefund);
    }));
  },

  [REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT](state) {
    return state.set('cancelPermit', !state.get('cancelPermit'));
  },

  [REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT](state, { payload: { refundChargeAmount } }) {
    return state.set('refundChargeAmount', refundChargeAmount);
  }
};

export default function getRefundDepositsReducer(initData) {
  return reducerHandler(getInitState(defaultState, initData), handlers);
}


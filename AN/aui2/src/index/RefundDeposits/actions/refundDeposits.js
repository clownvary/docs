import sumBy from 'lodash/sumBy';
import filter from 'lodash/filter';
import isArray from 'lodash/isArray';
import find from 'lodash/find';
import { confirm } from 'react-base-ui/lib/services/dialog';
import {
  redirect
} from 'shared/actions/route';
import { pages } from 'shared/consts';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import {
  validatePrerequisiteFunc,
  authorizedUserErrMsg,
  addPrerequisiteErrsAction,
  updateNeedOverrideAction,
  updateIsOverrideAction,
  updateUserNameAction,
  updateUserPasswordAction,
  clearPrerequisiteErrsAction,
  updateOverrideMsgAction
} from 'shared/actions/prerequisite';
import currencyHelper from 'shared/utils/currencyHelper';
import { warningMsg } from '../consts';
import URL from '../urls';

export const REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT = 'REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT';
export const REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE = 'REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE';
export const REFUNDDEPOSITS_CREATE_EXTRA_FEE = 'REFUNDDEPOSITS_CREATE_EXTRA_FEE';
export const REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE = 'REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE';
export const REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT = 'REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT';
export const REFUNDDEPOSITS_DELETE_EXTRA_FEE = 'REFUNDDEPOSITS_DELETE_EXTRA_FEE';

export const REFUNDDEPOSITS_UPDATE_NOTES = 'REFUNDDEPOSITS_UPDATE_NOTES';
export const REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY = 'REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY';

export const REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED = 'REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED';
export const REFUNDDEPOSITS_UPDATE_SELECTEDRENTALCHARGE = 'REFUNDDEPOSITS_UPDATE_SELECTEDRENTALCHARGE';
export const REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT = 'REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT';
export const REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT = 'REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT';

export const NotesType = {
  Staff: 0,
  Cutomer: 1
};

/* Two prerequisites for override date
  1. not login user and no authority in System User Profiles/OverrideDaysBeforeRefund
  2. Fanicial -> confirgration ->  Days before refunding Checks
*/
export const getPrerequisiteInfo = (deposits, rentalFees) => {
  const fees = deposits.concat(rentalFees);
  const needOverride = fees.some(fee => fee.selected && fee.needOverride);
  const refundOverrideDates = needOverride ?
    fees.filter(fee => fee.selected && fee.needOverride)
    : [];
  const refundDate = refundOverrideDates.length ?
    refundOverrideDates.map(fee => fee.refundDate).reduce((date1, date2) => {
      const date1Obj = DateTimeFormat.parseDate(date1);
      const date2Obj = DateTimeFormat.parseDate(date2);
      return date1Obj.isAfter(date2Obj) ? date1 : date2;
    })
    : '';
  return {
    needOverride,
    refundDate
  };
};

const refundDepositsActionRaw = payload => ({
  types: ['', '', ''],
  promise: API => API.post(URL.refundDeposits, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
});

const updateSelectedDepositsActionRaw = deposits => ({
  type: REFUNDDEPOSITS_UPDATE_SELECTEDDEPOSIT,
  payload: {
    deposits
  }
});

const updateNotesActionRaw = (notes, notesType) => ({
  type: REFUNDDEPOSITS_UPDATE_NOTES,
  payload: {
    notes,
    notesType
  }
});

const changeNotesDisplayActionRaw = display => ({
  type: REFUNDDEPOSITS_CHANGE_NOTES_DISPLAY,
  payload: {
    display
  }
});

const createExtraFeeActionRaw = () => ({
  type: REFUNDDEPOSITS_CREATE_EXTRA_FEE
});

const updateExtraFeeClaimChargeActionRaw = (extraFeeId, claimChargeId) => ({
  type: REFUNDDEPOSITS_UPDATE_EXTRA_FEE_CLAIMCHARGE,
  payload: {
    extraFeeId,
    claimChargeId
  }
});

const updateExtraFeeAmountActionRaw = (extraFeeId, amount) => ({
  type: REFUNDDEPOSITS_UPDATE_EXTRA_FEE_AMOUNT,
  payload: {
    extraFeeId,
    amount
  }
});

const deleteExtraFeeActionRaw = extraFeeId => ({
  type: REFUNDDEPOSITS_DELETE_EXTRA_FEE,
  payload: {
    extraFeeId
  }
});

export const calcuateTotalDeposit = (deposits) => {
  if (isArray(deposits) && deposits.length > 0) {
    return sumBy(filter(deposits, deposit => deposit.selected),
      deposit => currencyHelper.fixedMoney(deposit.amount_paid));
  }
  return 0;
};

export const isDepositAndRentalTotalZero = (deposits, rentalFees) => {
  const fees = deposits.concat(rentalFees)
    .filter(fee => fee.selected);

  if (fees.some(fee => fee.selected && fee.amount_paid > 0)) {
    return false;
  }

  return true;
};

export const updateRefundChargeAmount = refundChargeAmount => ({
  type: REFUNDDEPOSITS_CHANGE_REFUND_CHARGE_AMOUNT,
  payload: {
    refundChargeAmount
  }
});

export const selectDepositAction = (depositId, selected) =>
  (dispatch, getState) => {
    const { refundDeposits } = getState();
    const prevDeposits = refundDeposits.get('deposits');
    const deposits = prevDeposits.map((deposit) => {
      const holidayRatePairReceiptDetailID = deposit.get('holidayRatePairReceiptDetailID');
      if (deposit.get('id') === depositId || depositId === holidayRatePairReceiptDetailID) {
        return deposit.set('selected', selected);
      }
      return deposit;
    });

    const rentalFees = refundDeposits.get('rentalFees');
    const isCurDepAndRenTotalZero = isDepositAndRentalTotalZero(deposits.toJS(), rentalFees.toJS());
    const isPrevDepAndRenTotalZero = isDepositAndRentalTotalZero(
      prevDeposits.toJS(), rentalFees.toJS());

    if (isCurDepAndRenTotalZero) {
      dispatch(updateRefundChargeAmount('0.00'));
    }

    if (isPrevDepAndRenTotalZero && !isCurDepAndRenTotalZero) {
      dispatch(updateRefundChargeAmount(refundDeposits.get('defaultRefundChargeAmount')));
    }

    dispatch(updateSelectedDepositsActionRaw(deposits));
  };

export const selectRentalFeeAction = (rentalFeeId, selected) =>
  (dispatch, getState) => {
    const { refundDeposits } = getState();
    const prevRentalFees = refundDeposits.get('rentalFees');
    const rentalFees = prevRentalFees.map((rentalFee) => {
      const holidayRatePairReceiptDetailID = rentalFee.get('holidayRatePairReceiptDetailID');
      if (rentalFee.get('id') === rentalFeeId || rentalFeeId === holidayRatePairReceiptDetailID) {
        return rentalFee.set('selected', selected);
      }
      return rentalFee;
    });

    const deposits = refundDeposits.get('deposits');

    const isCurDepAndRenTotalZero = isDepositAndRentalTotalZero(deposits.toJS(), rentalFees.toJS());
    const isPrevDepAndRenTotalZero = isDepositAndRentalTotalZero(
      deposits.toJS(), prevRentalFees.toJS());

    if (isCurDepAndRenTotalZero) {
      dispatch(updateRefundChargeAmount('0.00'));
    }

    if (isPrevDepAndRenTotalZero && !isCurDepAndRenTotalZero) {
      dispatch(updateRefundChargeAmount(refundDeposits.get('defaultRefundChargeAmount')));
    }

    dispatch({
      type: REFUNDDEPOSITS_UPDATE_SELECTEDRENTALFEE,
      payload: {
        rentalFees
      }
    });
  };

export const updateOverridePrerequisiteAction = () =>
  (dispatch, getState) => {
    const { refundDeposits } = getState();
    const { deposits, rentalFees } = refundDeposits.toJS();
    const prerequisiteInfo = getPrerequisiteInfo(deposits, rentalFees);
    dispatch(clearPrerequisiteErrsAction());
    if (prerequisiteInfo.needOverride) {
      dispatch(updateNeedOverrideAction(true));
      dispatch(updateOverrideMsgAction(`${warningMsg.PREREQUISITE_OVERRIDE_WARNING_MSG}${prerequisiteInfo.refundDate}`));
    } else {
      dispatch(updateNeedOverrideAction(false));
      dispatch(updateIsOverrideAction(false));
      dispatch(updateOverrideMsgAction(''));
      dispatch(updateUserNameAction(''));
      dispatch(updateUserPasswordAction(''));
    }
  };

export const createExtraFeeAction = () =>
  dispatch => dispatch(createExtraFeeActionRaw());

export const updateExtraFeeClaimChargeAction = (extraFeeId, claimChargeId) =>
  dispatch => dispatch(updateExtraFeeClaimChargeActionRaw(extraFeeId, claimChargeId));

export const updateExtraFeeAmountAction = (extraFeeId, amount) =>
  dispatch => dispatch(updateExtraFeeAmountActionRaw(extraFeeId, amount));

export const deleteExtraFeeAction = extraFeeId =>
  dispatch => dispatch(deleteExtraFeeActionRaw(extraFeeId));

export const showNotesAction = () =>
  dispatch => dispatch(changeNotesDisplayActionRaw(true));

export const hideNotesAction = () =>
  dispatch => dispatch(changeNotesDisplayActionRaw(false));

export const changeStaffNotesAction = notes =>
  dispatch => dispatch(updateNotesActionRaw(notes, NotesType.Staff));

export const changeCustomerNotesAction = notes =>
  dispatch => dispatch(updateNotesActionRaw(notes, NotesType.Cutomer));

export const cancelAction = () =>
  (dispatch, getState) => {
    const { permitID, batchID, receiptID } = getState().initialData;

    return dispatch(redirect(pages.buildUrl(pages.reloadReservationDetailPage, {
      permit_id: permitID,
      batch_id: batchID,
      receipt_id: receiptID
    })));
  };

export const getTotalLinkedCredit = refundDeposits =>
  refundDeposits.get('deposits')
    .reduce((total, deposit) => {
      if (deposit.get('selected')) {
        return total + currencyHelper.fixedMoney(deposit.get('linked_credit'));
      }
      return total;
    }, 0) +
  refundDeposits.get('rentalFees')
    .reduce((total, rentalFee) => {
      if (rentalFee.get('selected')) {
        return total + currencyHelper.fixedMoney(rentalFee.get('linked_credit'));
      }
      return total;
    }, 0);

export const validateAction = () =>
  (dispatch, getState) => {
    const { refundDeposits, prerequisite } = getState();
    const totalLinkedCredit = getTotalLinkedCredit(refundDeposits);
    const hasPrerequisiteErrs = validatePrerequisiteFunc(prerequisite);
    if (hasPrerequisiteErrs) {
      window.scrollTo(0, 0);
      dispatch(addPrerequisiteErrsAction(hasPrerequisiteErrs));
      return Promise.reject('error check the prerequisite.');
    }

    if (totalLinkedCredit > 0) {
      return confirm(
        `The refund will unlink credit amount of ${currencyHelper.formatCurrency(totalLinkedCredit)}
          and return it back to customer account.`,
        {
          title: 'Refund',
          confirmText: 'OK'
        }
      );
    }

    return Promise.resolve();
  };

const getProceedPayload = (refundDeposits, prerequisite, permitID, batchID, receiptID) => ({
  permit_id: permitID,
  batch_id: batchID,
  receipt_id: receiptID,
  selected_deposit_fees: refundDeposits.get('deposits')
    .filter(deposit => deposit.get('selected'))
    .map(deposit => deposit.get('id')).toJS(),
  selected_claim_charges: refundDeposits.get('extraFees')
    .filter(fee => fee.get('claimChargeId') > 0 && fee.get('amount') > 0)
    .map(fee => ({
      claim_charge_id: fee.get('claimChargeId'),
      claim_charge_amount: fee.get('amount'),
      claim_tax_amount: fee.get('tax'),
      claim_discount_amount: fee.get('discount'),
      index: fee.get('id')
    })).toJS(),
  selected_rental_fees: refundDeposits.get('rentalFees')
    .filter(deposit => deposit.get('selected'))
    .map(deposit => deposit.get('id')).toJS(),
  refund_total: refundDeposits.get('totalRefund').toFixed(2),
  claim_total: refundDeposits.get('totalCharge').toFixed(2),
  sub_refund_total: refundDeposits.get('subTotalRefund').toFixed(2),
  refund_charge_amount: refundDeposits.get('refundChargeAmount'),
  cancel_permit: refundDeposits.get('cancelPermit'),
  customer_notes: refundDeposits.get('customerNotes'),
  staff_notes: refundDeposits.get('staffNotes'),
  user_name: prerequisite.get('userName') || '',
  user_password: prerequisite.get('userPassword') || '',
  override_checked: prerequisite.get('isOverride')
});

export const submitAction = (reservationDetailPageParams = {}) =>
  (dispatch, getState) => {
    const { refundDeposits, prerequisite, initialData } = getState();
    const { permitID, batchID, receiptID } = initialData;
    // collect the information
    const payload = getProceedPayload(refundDeposits, prerequisite, permitID, batchID, receiptID);

    return dispatch(refundDepositsActionRaw(payload)).then(
      ({
        payload: {
          body: {
            payment_or_refund: paymentOrRefund
          }
        }
      }) => {
        const overrideInfo = paymentOrRefund.override_info;
         /* istanbul ignore next */
        if (prerequisite.get('needOverride') && overrideInfo && !overrideInfo.success) {
          window.scrollTo(0, 0);
          return dispatch(addPrerequisiteErrsAction(authorizedUserErrMsg));
        }

        let url = '';
        if (paymentOrRefund.non_monetary_receipt) {
          url = pages.buildUrl(pages.reservationDetailPage, {
            permit_id: permitID,
            ...reservationDetailPageParams
          });
        } else if (paymentOrRefund.is_refund) {
          url = pages.buildUrl(pages.paymentPage, {
            permit_id: permitID,
            batch_id: paymentOrRefund.batch_id,
            receipt_id: paymentOrRefund.receipt_id,
            draft_receipt_id: receiptID,
            [pages.sourcePageKey]: pages.refundDepositsPage,
            [pages.cancelPermit]: refundDeposits.get('fromCancelPermit')
          });
        } else {
          url = pages.buildUrl(pages.paymentPage, {
            permit_id: permitID,
            batch_id: paymentOrRefund.batch_id,
            receipt_id: paymentOrRefund.receipt_id,
            draft_receipt_id: receiptID,
            [pages.sourcePageKey]: pages.refundDepositsPage,
            [pages.paymentPageIndex]: pages.PAY_NOW,
            [pages.cancelPermit]: refundDeposits.get('fromCancelPermit')
          });
        }

        return dispatch(redirect(url));
      },
      error => Promise.reject(error)
    );
  };

const getFeeTaxAndDiscountActionRaw = payload => ({
  types: ['', '', ''],
  promise: API => API.post(URL.getFeeTaxAndDiscount, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
});

export const updateExtraFeeRelatedAction = feeAndRefundData => ({
  type: REFUNDDEPOSITS_UPDATE_EXTRA_FEE_RELATED,
  payload: {
    ...feeAndRefundData
  }
});

const reRenderDepositFees = (claimRefundPreview, claimRefundPreviewError) =>
  (dispatch) => {
    const {
      selected_claim_charges: claimDepositList,
      selected_deposit_fees: savedDepositList,
      selected_rental_fees: savedRetalFeeList,
      refund_total: totalRefund,
      claim_total: totalCharge,
      sub_refund_total: subTotalRefund
    } = (claimRefundPreview || {});

    dispatch(updateExtraFeeRelatedAction({
      claimDepositList,
      savedDepositList,
      savedRetalFeeList,
      totalRefund,
      totalCharge,
      subTotalRefund,
      claimRefundPreviewError
    }));

    return dispatch(updateOverridePrerequisiteAction());
  };

export const getFeeTaxAndDiscountAction = ({
  extraFeeId
} = {}) =>
  (dispatch, getState) => {
    const { refundDeposits, prerequisite, initialData } = getState();
    const { permitID, batchID, receiptID } = initialData;
    // collect the information
    const payload = getProceedPayload(refundDeposits, prerequisite, permitID, batchID, receiptID);

    return dispatch(getFeeTaxAndDiscountActionRaw(payload)).then(
      ({
        payload: {
          body: {
            refund_preview: claimRefundPreview,
            refund_preview_error: claimRefundPreviewError
          }
        }
      }) => {
        const {
          selected_claim_charges: claimDepositList
        } = (claimRefundPreview || {});
        let lastValidClaimDepositAmount = 0;

        if (claimRefundPreviewError) {
          return confirm(
            claimRefundPreviewError,
            {
              title: 'Refund',
              confirmText: 'OK'
            }
          ).then(() => {
            if (extraFeeId > 0) {
              const lastValidClaimDeposit = find(
                claimDepositList || [], claimDeposit => +claimDeposit.index === extraFeeId);
              lastValidClaimDepositAmount = (
                lastValidClaimDeposit && lastValidClaimDeposit.claim_charge_amount
              ) || 0;

              dispatch(updateExtraFeeAmountAction(
                extraFeeId,
                lastValidClaimDepositAmount
              ));
            } else {
              // ANE-79239
              const selectedDeposits = refundDeposits.get('deposits').filter(deposit => deposit.get('selected'));
              const selectedRentalFees = refundDeposits.get('rentalFees').filter(rentalFee => rentalFee.get('selected'));
              const isResetDeposits = !selectedDeposits.size &&
                claimRefundPreview.selected_deposit_fees.length;
              const isResetRentalFees = !selectedRentalFees.size &&
                claimRefundPreview.selected_rental_fees.length;

              if (isResetDeposits || isResetRentalFees) {
                dispatch(updateRefundChargeAmount(claimRefundPreview.refund_charge_amount));
              }

              dispatch(
                reRenderDepositFees(claimRefundPreview, claimRefundPreviewError)
              );
            }
          });
        }

        return dispatch(
          reRenderDepositFees(claimRefundPreview, claimRefundPreviewError)
        );
      },
      error => Promise.reject(error)
    );
  };

export const changeCancelPermitAction = () => ({
  type: REFUNDDEPOSITS_CHANGE_CANCEL_PERMIT
});

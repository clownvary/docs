import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import { fromJS } from 'immutable';
import decamelize from 'shared/utils/decamelize';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import { clearError } from 'shared/actions/Error';
import {
  PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN,
  PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_SUCCESS,
  PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_FAILURE
} from '../consts/actionTypes';
import { makePayment, showErrors, showECPAuthDetails, gotoNextPage, getServerErrors } from './index';
import URL from '../urls';
import {
  overrideCcExpiration,
  isCCExpireForPaymentSchedule,
  submitPPPaymentIframeAsyncAction
} from './paymentOptions/paymentPlan';
import { showOptionErrorsAction, clearOptionErrorAction } from './paymentOptions/options';

import { newOptions, paymentTypes, paymentPlanPaymentTypes as ppPaymentTypes, CCPaymentMethods } from '../consts';
import { filterOptions } from '../utils/splitOptions';
import { maskCard, validExpiryValue } from '../utils/creditCardHelper';
import getSessionIDs from '../utils/getSessionIDs';

export const submitBtnMap = {
  newWorkFlow: 'Pay',
  refund: 'Refund',
  makeAPayment: 'Pay',
  modifyPaymentPlan: 'Save'
};

export const payActionCache = {
  submitBtn: submitBtnMap.newWorkFlow
};

const APD_AMS_ACCOUNT_ID = 'APD AccountID';

const defaultOptionParams = {
  check_number: '',
  cash_amount_paid: 0,
  cash_change_amount: 0,
  cash_amount_owed: 0,
  card_number: null,
  auth_number: null,
  ams_account_id: null,
  add_to_customer_cc: false,
  cc_number: null,
  credit_card_type: 0,
  cc_expiry: null,
  cc_info_ignore_exp_error: false,
  saved_credit_card_name: null,
  eft_account_number: null,
  eft_routing_number: null,
  eft_account_type: null,
  eft_ams_account_id: null,
  is_add_to_customer_ecp: false,
  gc_number: '',
  gc_type_id: null,
  is_refund_to_new_gc: false
};

/* eslint-disable */
function getOptionParams(opt, paymentOptions, { ccScanWithApdDevice, apdInputType, ccScanWithMagesafeDevice }) {
  const paymentTypeId = opt.activeVal;
  const amount = parseFloat(opt.amount);
  const disabled = opt.disabled;

  let params = merge({}, defaultOptionParams, {
    index: opt.indexInOrgArr,
    payment_type_id: paymentTypeId,
    amount
  });

  switch (paymentTypeId) {
    case paymentTypes.CASH:
      params.cash_amount_paid = opt.cashAmountPaid || '0.00';
      params.cash_change_amount = opt.cashChange || '0.00';
      params.cash_amount_owed = opt.formatCashAmount || '0.00';
      params.amount = params.cash_amount_owed;
      break;
    case paymentTypes.CHECK:
      params.check_number = opt.checkNumber || '';
      break;
    case paymentTypes.REFUND_CREDITCARD:
    case paymentTypes.CREDITCARD:
      const {
        defaultOtherNumber
      } = paymentOptions.creditCard;

      if (opt.CCPaymentMethod === CCPaymentMethods.NEW_CARD_WITH_DEVICE) {
        params.other_number = defaultOtherNumber;
        if (ccScanWithApdDevice) {
          params.apd_input_type = apdInputType;
          params.ams_account_id = APD_AMS_ACCOUNT_ID;
          params.disabled = disabled;
        }
      }
      break;
    case paymentTypes.ELECTRONICCHECK:
      const {
        eCheckConfig,
        eCheckListDropDown
      } = paymentOptions.eCheck;

      const { eCheckListDropDownValue } = opt;
      /* istanbul ignore else */
      if (eCheckListDropDownValue && eCheckListDropDown.data) {
        const selectedItemList = eCheckListDropDown.data
          .filter(item => item.echeck_id === eCheckListDropDownValue);
        const selectedItem = selectedItemList[0] ? selectedItemList[0] : {};
        const addToCustomerEcp = eCheckConfig.show_ach_agreement_for_ecp ?
          selectedItem.is_add_to_customer_ecp : false;
        /* istanbul ignore else */
        if (selectedItem) {
          params = Object.assign(params, {
            eft_account_number: selectedItem.eft_account_number,
            eft_bank_number: selectedItem.eft_routing_number,
            eft_account_type: selectedItem.eft_account_type,
            ams_account_id: selectedItem.eft_ams_account_id,
            add_to_customer_ecp: addToCustomerEcp
          });
        }
      }
      break;
    case paymentTypes.REFUND_GIFTCARD:
    case paymentTypes.GIFTCARD:
      const {
        giftCardDropDown,
        newGiftCardDropDown
      } = paymentOptions.giftCard;
      /* istanbul ignore else */
      if (giftCardDropDown.data.length) {
        let isRefundToNewGc = false;

        let selectedGiftCardList = giftCardDropDown.data
          .filter(item => item.value === opt.giftCardId);
        /* istanbul ignore else */
        if (newGiftCardDropDown.data.length) {
          const newGiftCard = newGiftCardDropDown.data
            .filter(item => item.value === opt.giftCardId);

          if (newGiftCard.length > 0) {
            isRefundToNewGc = true;
            selectedGiftCardList = newGiftCard;
          }
        }
        const selectedGiftCard = selectedGiftCardList[0] ? selectedGiftCardList[0] : {};
        /* istanbul ignore else */
        if (selectedGiftCard) {
          params = Object.assign(params, {
            gc_number: selectedGiftCard.gc_number,
            gc_id: selectedGiftCard.gc_id,
            gc_type_name: selectedGiftCard.gc_type_name,
            gc_liability_gl_account_id: selectedGiftCard.gc_liability_gl_account_id,
            gc_type_id: selectedGiftCard.gc_type_id,
            is_refund_to_new_gc: isRefundToNewGc
          });
        }
      }
      break;
    case paymentTypes.REFUND_DEBITCARD:
    case paymentTypes.DEBITCARD:
      params.apd_input_type = apdInputType;
      params.ams_account_id = APD_AMS_ACCOUNT_ID;
      params.disabled = disabled;
      break;
    case paymentTypes.REFUND_ACCOUNT:
      const { requestRefund, reasons: { otherReason } } = paymentOptions.account;

      params.request_refund = requestRefund;
      params.refund_reasons = '';

      if (requestRefund) {
        params.refund_reasons = otherReason;
      }
      break;
    case paymentTypes.PAYMENTPLAN:
      const paymentPlanDetails = {
        reservation_paymen_plan_id: opt.reservationPPs.selected,
        payment_schedules: decamelize(opt.paymentSchedules),
        auto_charge_payments: opt.showAutoPaymentMethod,
        auto_charge_payment_type: opt.showAutoPaymentMethod ? opt.autoPaymentTypes.selected : null,
      }

      const isReservationPPByCustom = !(opt.reservationPPs.selected > 0);
      let customParam = null;

      if (isReservationPPByCustom) {
        customParam = {
          billing_type_id: opt.frequecys.selected,
          number_of_payment: opt.numOfPayments.selected,
          first_payment_date: opt.firstPaymentDate
        }
      }

      const isSelectCCForAutoPay = ppPaymentTypes.CREDITCARD === opt.autoPaymentTypes.selected;
      let autoPayDetailsParam = {};
      let autoPayDetails = null;

      if (opt.showAutoPaymentMethod) {
        if (isSelectCCForAutoPay) {
          autoPayDetailsParam = {
            override_cc_exp_before_pp_last: paymentOptions.paymentPlan.overrideCcExpBeforePpLast
          }

          if (ccScanWithApdDevice || ccScanWithMagesafeDevice) {
            autoPayDetails = paymentOptions.paymentPlan.ppAutoCCList.data.filter((ccItem) => {
              return ccItem.value === paymentOptions.paymentPlan.ppAutoCCList.selected
            })[0];

            autoPayDetailsParam = {
              ...autoPayDetailsParam,
              auto_charge_ams_account_id: autoPayDetails.ams_account_id,
              auto_charge_cc_number: maskCard(autoPayDetails.card_number),
              auto_charge_cc_exp: autoPayDetails.card_expiration,
              auto_charge_cc_type: autoPayDetails.cardtype_id,
            }
          }
        } else {
          autoPayDetails = paymentOptions.paymentPlan.ppAutoEcpList.data.filter((ecpItem) => {
            return ecpItem.value === paymentOptions.paymentPlan.ppAutoEcpList.selected
          })[0];

          autoPayDetailsParam = {
            auto_charge_ams_account_id: autoPayDetails.eft_ams_account_id,
            auto_charge_ec_type: autoPayDetails.eft_account_type,
            auto_charge_ec_routing_number: autoPayDetails.eft_routing_number,
            auto_charge_ec_account_number: autoPayDetails.eft_account_number
          }
        }
      }

      Object.assign(
        paymentPlanDetails,
        autoPayDetailsParam,
        isReservationPPByCustom ? customParam : {});

      params.payment_plan_details = paymentPlanDetails;
      break;
    default:
      break;
  }

  params.amount = parseFloat(params.amount).toFixed(2);

  return params;
}
// param of 'today' is just for test
function getClientErrors(validOptions, paymentOptions, ccScanWithApdDevice, ccScanWithMagesafeDevice, today) {
  const paymentErrors = [];
  const optionErrorMap = {};
  let error = null;

  validOptions.forEach((opt) => {
    const index = opt.indexInOrgArr;
    optionErrorMap[index] = optionErrorMap[index] || [];
    const optionErrors = optionErrorMap[index];
    const paymentTypeId = opt.activeVal;
    switch (paymentTypeId) {
      case paymentTypes.CHECK:
        const checkNumber = opt.checkNumber || '';
        const optionInfo = opt.list.filter(listItem => listItem.value === paymentTypeId)[0];
        const checkLabel = optionInfo && optionInfo.text || 'Check';

        if (!checkNumber) {
          error = {
            key: index,
            name: 'checkNumber',
            message: `Please enter a ${checkLabel} Number.`
          };
          paymentErrors.push(error);
          optionErrors.push(error);
        }
        break;
      case paymentTypes.ELECTRONICCHECK:
        if (!opt.eCheckListDropDownValue ||
          opt.eCheckListDropDownValue === newOptions.NEW_OPTION_VALUE
        ) {
          const {
            eCheck: {
              eCheckLabel
            }
          } = paymentOptions;
          error = {
            key: index,
            name: 'echeck',
            message: `Please choose a ${eCheckLabel}`
          };
          paymentErrors.push(error);
          optionErrors.push(error);
        }
        break;
      case paymentTypes.REFUND_GIFTCARD:
      case paymentTypes.GIFTCARD:
        const {
          giftCard: {
            giftCardLabel,
            giftCardDropDown,
            newGiftCardDropDown
          }
        } = paymentOptions;
        /* istanbul ignore else */
        if (giftCardDropDown.data.length) {
          let selectedGiftCardList = giftCardDropDown.data
            .filter(item => item.value === opt.giftCardId);
          /* istanbul ignore else */
          if (newGiftCardDropDown.data.length) {
            const newGiftCard = newGiftCardDropDown.data
              .filter(item => item.value === opt.giftCardId);

            if (newGiftCard.length > 0) {
              selectedGiftCardList = newGiftCard;
            }
          }
          /* istanbul ignore else */
          if (!selectedGiftCardList.length) {
            error = {
              key: index,
              name: 'giftCard',
              message: `Please choose a ${giftCardLabel}`
            };

            paymentErrors.push(error);
            optionErrors.push(error);
          }
        }
        break;
      case paymentTypes.REFUND_ACCOUNT:
        const { requestRefund, reasons: { otherReason } } = paymentOptions.account;
        let refundReason = '';

        if (requestRefund) {
          refundReason = otherReason || '';
        }

        if (refundReason.length > 300) {
          error = {
            key: index,
            name: 'refundAcountReason',
            message: `Maximum 300 characters can be entered for Refund Reason.`
          };

          paymentErrors.push(error);
          optionErrors.push(error);
        }
        break;
      case paymentTypes.PAYMENTPLAN:
        const selectedAutoPayType = opt.autoPaymentTypes.selected;
        const isSelectCCForAutoPay = ppPaymentTypes.CREDITCARD === selectedAutoPayType;
        const isSelectECPForAutoPay = ppPaymentTypes.ELECTRONICCHECK === selectedAutoPayType;
        const isUseDevice = ccScanWithApdDevice || ccScanWithMagesafeDevice;
        const isAutoPayCardSelected = (
          isSelectCCForAutoPay &&
          (paymentOptions.paymentPlan.ppAutoCCList.selected &&
          paymentOptions.paymentPlan.ppAutoCCList.selected !== -1)
        ) || (
          isSelectECPForAutoPay &&
          paymentOptions.paymentPlan.ppAutoEcpList.selected &&
          paymentOptions.paymentPlan.ppAutoEcpList.selected !== -1
        );
        /* istanbul ignore else */
        if (opt.showAutoPaymentMethod && opt.autoPaymentTypes.selected) {
          let ppErrorMsg = '';
          let isErrTypeWarning = false;

          if (isUseDevice || (!isUseDevice && isSelectECPForAutoPay)) {
            if (!isAutoPayCardSelected) {
              ppErrorMsg = 'Please select a payment method for the payment plan';
            } else if (isSelectCCForAutoPay) {
              const ccInfo = find(paymentOptions.paymentPlan.ppAutoCCList.data,
                ccItem => ccItem.value === paymentOptions.paymentPlan.ppAutoCCList.selected
              );
              const { isCCExpired, expireMsg } = validExpiryValue(ccInfo.card_expiration, 'Card Expiration', today);
              if (isCCExpired) {
                ppErrorMsg = expireMsg;
              } else {
                const ccExpireInfo = isCCExpireForPaymentSchedule(paymentOptions, opt.paymentSchedules, payActionCache);
                if (ccExpireInfo.isCCExpireBeforeLastPaySchedule && !paymentOptions.paymentPlan.overrideCcExpBeforePpLast) {
                  ppErrorMsg = ccExpireInfo.ppErrorMsg;
                  isErrTypeWarning = ccExpireInfo.isErrTypeWarning;
                }
              }
            }
          }

          if (ppErrorMsg) {
            error = {
              key: index,
              name: 'paymentMethod',
              message: ppErrorMsg,
              type: isErrTypeWarning && 'warning'
            };

            paymentErrors.push(error);
            optionErrors.push(error);
          }
        }
        break;
      default:
        break;
    }
  });

  return {
    paymentErrors,
    optionErrorMap
  };
}
/* eslint-enable */

function getFinalPayParams(validOptions, paymentOptions, initialData) {
  return validOptions.map(opt => getOptionParams(opt, paymentOptions, initialData));
}


const paymentPlanCCExpireErrForPCI = 'if you want to proceed using the specified date';

export function pay(today) {
  return (dispatch, getState) => {
    const {
      paymentOptions: options,
      payment,
      initialData
    } = getState();
    const paymentOptions = fromJS(options).toJS();
    const paymentErrs = payment.toJS().errors;
    const hadError = !isEmpty(paymentErrs);
    const {
      ccScanWithApdDevice,
      ccScanWithMagesafeDevice
    } = initialData;
    const { options: { data }, eCheck: { eCheckConfig } } = paymentOptions;
    const validOptions = filterOptions(data);

    const {
      paymentErrors,
      optionErrorMap
    } = getClientErrors(validOptions, paymentOptions,
      ccScanWithApdDevice, ccScanWithMagesafeDevice, today);

    if (paymentErrors.length) {
      const paymentWarning = [];

      dispatch(showErrors(paymentErrors));

      paymentErrors.forEach((err) => {
        if (err.type) {
          paymentWarning.push(err);
        }
      });

      if (paymentErrors.length === paymentWarning.length) {
        dispatch(overrideCcExpiration(true));
      }

      Object.keys(optionErrorMap).forEach((key) => {
        const optionErrors = optionErrorMap[key];
        dispatch(showOptionErrorsAction(key, optionErrors));
      });
      return false;
    }

    /* istanbul ignore else */
    if (hadError) {
      // No errors now, so clear the old errors
      dispatch(showErrors([]));
      // clear the errors of the payment option
      paymentErrs.map(({ key }) => dispatch(clearOptionErrorAction(key)));

      const isUseDevice = ccScanWithApdDevice || ccScanWithMagesafeDevice;
      if (!isUseDevice) {
        const paymentPlanErr = find(
          paymentErrs, err => err.paymentTypeId === paymentTypes.PAYMENTPLAN);
        const hasPaymentPlanExpireCCERR = paymentPlanErr &&
          (paymentPlanErr.message.indexOf(paymentPlanCCExpireErrForPCI) > -1);

        if (hasPaymentPlanExpireCCERR) {
          paymentOptions.paymentPlan.overrideCcExpBeforePpLast = true;
        }
      }
    }

    const paymentInfos = getFinalPayParams(validOptions, paymentOptions, initialData);
    let useECheckPay = false;
    paymentInfos.forEach((v) => {
      if (v.eft_account_number) {
        useECheckPay = true;
      }
    });

    if (useECheckPay && eCheckConfig.show_ach_agreement_for_ecp) {
      return dispatch(showECPAuthDetails({
        shown: true,
        paymentInfos
      }));
    }

    return dispatch(makePayment(paymentInfos));
  };
}

export const requestSaveModifiedPaymentPlan = (params, { permitID, receiptID, batchID }) => {
  const url = getDynamicUrl(URL.saveModifiedPaymentPlan, {
    permitID,
    receiptID,
    batchID
  });

  return {
    types: [
      PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN,
      PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_SUCCESS,
      PAYMENTFOOTER_SAVE_MODIFIED_PAYMENTPLAN_FAILURE
    ],
    promise: API => API.post(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...params })
    })
  };
};

const saveModifyPaymentPlanAndRedirectAsyncAction = (paymentPlanDetails, baseParams) => dispatch =>
  dispatch(requestSaveModifiedPaymentPlan(paymentPlanDetails, baseParams))
    .then(
      ({ payload: { body: { result } } }) => {
        const {
          payment_errors: errors
        } = result || {};
        if (!isEmpty(errors)) {
          const {
            paymentErrors,
            optionErrors
          } = getServerErrors(errors, [{ activeVal: paymentTypes.PAYMENTPLAN }]);

          dispatch(showErrors(paymentErrors));

          forEach(optionErrors, (e) => {
            dispatch(showOptionErrorsAction(e.key, [e]));
          });

          return false;
        }
        return dispatch(gotoNextPage());
      },
      ({ payload: { headers: { response_message: responseMessage } } }) => {
        const hasPaymentPlanExpireCCERR =
          responseMessage.indexOf(paymentPlanCCExpireErrForPCI) > -1;
        if (hasPaymentPlanExpireCCERR) {
          dispatch(overrideCcExpiration(true));
        }
      }
    );

export const saveModifiedPaymentPlan = today => (dispatch, getState) => {
  const state = getState();
  const baseParams = getSessionIDs(state);
  const { paymentOptions, payment, initialData } = state;
  const plainPaymentOptions = fromJS(paymentOptions).toJS();
  const { options: { data } } = plainPaymentOptions;
  const validOptions = filterOptions(data);
  const prevPaymentErrs = payment.get('errors').toJS();
  const {
    ccScanWithApdDevice,
    ccScanWithMagesafeDevice
  } = initialData;
  const isUseDevice = ccScanWithApdDevice || ccScanWithMagesafeDevice;
  const {
    paymentErrors,
    optionErrorMap
  } = getClientErrors(
    validOptions, plainPaymentOptions, ccScanWithApdDevice, ccScanWithMagesafeDevice, today);

  dispatch(clearError());

  if (paymentErrors.length) {
    const paymentWarning = [];

    dispatch(showErrors(paymentErrors));

    paymentErrors.forEach((err) => {
      if (err.type) {
        paymentWarning.push(err);
      }
    });

    if (paymentErrors.length === paymentWarning.length) {
      dispatch(overrideCcExpiration(true));
    }

    Object.keys(optionErrorMap).forEach((key) => {
      const optionErrors = optionErrorMap[key];
      dispatch(showOptionErrorsAction(key, optionErrors));
    });
    return false;
  }

  if (prevPaymentErrs.length) {
    dispatch(showErrors([]));

    if (!isUseDevice) {
      const paymentPlanErr = find(
        prevPaymentErrs, err => err.paymentTypeId === paymentTypes.PAYMENTPLAN);
      const hasPaymentPlanExpireCCERR = paymentPlanErr &&
        (paymentPlanErr.message.indexOf(paymentPlanCCExpireErrForPCI) > -1);
      if (hasPaymentPlanExpireCCERR) {
        plainPaymentOptions.paymentPlan.overrideCcExpBeforePpLast = true;
      }
    }
  }

  const paymentPlanDetails = getFinalPayParams(
    validOptions,
    plainPaymentOptions,
    initialData
  )[0].payment_plan_details;
  const paymentPlanSchedules = paymentPlanDetails.payment_schedules.map((schedule) => {
    const { amount, paid, due_date: dueDate } = schedule;
    return {
      amount,
      due_date: dueDate,
      paid: paid || 0
    };
  });
  paymentPlanDetails.payment_schedules = paymentPlanSchedules;

  const isUsePaymentPlanCC =
    ppPaymentTypes.CREDITCARD === paymentPlanDetails.auto_charge_payment_type;

  if (isUsePaymentPlanCC && !isUseDevice) {
    return dispatch(submitPPPaymentIframeAsyncAction())
      .then(
        (result) => {
          const {
            sessionId,
            saveForFutureUse
          } = result;

          return {
            ...paymentPlanDetails,
            pci_checkout_auto_payment_sessionid: sessionId,
            add_to_customer_cc: saveForFutureUse
          };
        },
        error => Promise.reject(error)
      )
      .then(
        pciPaymentPlanDetails => dispatch(
          saveModifyPaymentPlanAndRedirectAsyncAction(pciPaymentPlanDetails, baseParams)
        )
      );
  }

  return dispatch(saveModifyPaymentPlanAndRedirectAsyncAction(paymentPlanDetails, baseParams));
};

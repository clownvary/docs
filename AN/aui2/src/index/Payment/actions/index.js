import { clearError } from 'shared/actions/Error';
import { redirect } from 'shared/actions/route';
import { deepMerge } from 'shared/utils/func';
import { pages, messages } from 'shared/consts';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import URL from '../urls';
import formatCurrency from '../utils/formatCurrency';
import getSessionIDs from '../utils/getSessionIDs';
import { filterOptions } from '../utils/splitOptions';
import { maskCard } from '../utils/creditCardHelper';
import { deletePendingGiftCard } from './paymentOptions/giftCard';
import { showOptionErrorsAction } from './paymentOptions/options';
import { submitCCPaymentIframeAsyncAction } from './paymentOptions/creditCard';
import { submitPPPaymentIframeAsyncAction } from './paymentOptions/paymentPlan';
import {
  proceedMagtekModalPromiseAction,
  hideMagtekModalAction
} from './modals/Magtek';

import {
  fetchAccountHolderAction,
  hideNewCreditCardModalAction
} from './modals/NewCreditCard';

import {
  swipeCardInPinpadModal
} from '../components/Modals/PinPad/actions/pinpad';

import { creditCardTypes as CCTYPES, paymentTypes, paymentPlanPaymentTypes as ppPaymentTypes, CCPaymentMethods } from '../consts';

const payMap = {
  [paymentTypes.CREDITCARD]: 'Credit Card',
  [paymentTypes.REFUND_CREDITCARD]: 'Credit Card',
  [paymentTypes.DEBITCARD]: 'Debit Card',
  [paymentTypes.REFUND_DEBITCARD]: 'Debit Card'
};

export const CHANGE_REMAINING = 'CHANGE_REMAINING';
export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';
export const MAKE_PAYMENT_FAILURE = 'MAKE_PAYMENT_FAILURE';
export const SHOW_PAYMENT_ERRORS = 'SHOW_PAYMENT_ERRORS';
export const CLEAR_PAYMENT_ERRORS = 'CLEAR_PAYMENT_ERRORS';
export const SHOW_ECP_AUTH_DETAILS = 'SHOW_ECP_AUTH_DETAILS';
export const UPDATE_PAY_NOW_AMOUNT = 'UPDATE_PAY_NOW_AMOUNT';
export const RESIZE = 'RESIZE';

export function gotoNextPage(receiptHeaderId) {
  return (dispatch, getState) => {
    const state = getState();
    const { payment, paymentAction } = state;
    const { permitID, receiptID, batchID } = getSessionIDs(state);
    const { cancelPermit } = state.initialData;
    const sourcePageIndex = payment.get('sourcePageIndex');
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');
    const isSelectMakeAPayment = paymentAction.get('isSelectMakeAPayment');

    const rdmsgs = messages.reservationDetails;
    let reservationDetailMsgCode = rdmsgs.refundOrPayWithoutCancel_Success.code;
    let url = '';

    if (sourcePageIndex === pages.reservationDetailPage) {
      reservationDetailMsgCode = rdmsgs.confirmReservationDetailChange_Success.code;
    }

    if (isSelectMakeAPayment) {
      reservationDetailMsgCode = rdmsgs.paymentByReservationDetailActionBar_Success.code;
    }

    if (isSelectModifyPaymentPlan) {
      reservationDetailMsgCode = rdmsgs.modifyPaymentPlanByReservationDetailActionBar_Success.code;
    }

    if (cancelPermit) {
      reservationDetailMsgCode = rdmsgs.cancelPermitWithRefundOrPay_Success.code;
    }

    switch (sourcePageIndex) {
      case pages.reservationDetailPage:
      case pages.refundDepositsPage:
        url = pages.buildUrl(pages.reservationDetailPage, {
          permit_id: permitID,
          [messages.messageKey]: reservationDetailMsgCode
        });
        break;
      default:
        url = pages.buildUrl(pages.confirmationPage, {
          batch_id: batchID,
          receipt_id: receiptID,
          receipt_header_id: receiptHeaderId
        });
        break;
    }

    return dispatch(redirect(url));
  };
}


function getFee(paymentParams) {
  let fee = 0;
  paymentParams.map((item) => {
    if (item.payment_type_id === paymentTypes.CREDITCARD ||
      item.payment_type_id === paymentTypes.REFUND_CREDITCARD
    ) {
      fee = item.amount;
    }
    return item;
  });
  return formatCurrency(fee);
}

export function changeRemaining({ remaining }) {
  return {
    type: CHANGE_REMAINING,
    payload: {
      remaining
    }
  };
}

export function showErrors(errors) {
  return {
    type: SHOW_PAYMENT_ERRORS,
    payload: {
      errors
    }
  };
}

export function clearErrors(optionIndex) {
  return {
    type: CLEAR_PAYMENT_ERRORS,
    payload: {
      optionIndex
    }
  };
}

function _makePayment({
  batchID,
  receiptID,
  requestUrl,
  paymentInfos
}) {
  paymentInfos = paymentInfos.map((paymentInfo) => {
    const item = Object.assign({}, paymentInfo);
    // istanbul ignore else
    if (item.cc_number) {
      const ccNumber = item.cc_number;
      // istanbul ignore else
      if (ccNumber && ccNumber.indexOf('xxx') === -1) {
        item.cc_number = `xxx${ccNumber}`;
      }
    }

    return item;
  });
  const requstBody = {
    batch_id: batchID,
    receipt_id: receiptID,
    payment_infos: paymentInfos
  };

  return {
    types: ['', '', ''],
    promise: API => API.post(requestUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requstBody)
    })
  };
}

export function getServerErrors(errors, paymentOptions) {
  const paymentErrors = [];
  const optionErrors = [];

  forEach(errors, (error) => {
    const {
      payment_type_id: paymentType,
      error_message: message,
      extra_index: extraIndex
    } = error;

    const index = findIndex(paymentOptions, (o) => {
      if (o.activeVal === paymentType) {
        if (paymentType === paymentTypes.GIFTCARD ||
            paymentType === paymentTypes.REFUND_GIFTCARD) {
          return o.giftCardId === extraIndex;
        }
        return true;
      }

      return false;
    });

    if (index >= 0) {
      const e = {
        key: index,
        name: '',
        paymentTypeId: paymentType,
        message
      };

      paymentErrors.push(e);
      optionErrors.push(e);
    }
  });

  return {
    paymentErrors,
    optionErrors
  };
}

export function makePayment(paymentInfos) {
  return (dispatch, getState) => {
    const state = getState();
    const { receiptID, batchID } = getSessionIDs(state);
    const paymentInfosClone = deepMerge([], paymentInfos);
    /* eslint-disable */
    paymentInfos.forEach((item) => {
      delete item.index;
      if (item.disabled) {
        delete item.disabled;
      }
    });
    /* eslint-enable */

    dispatch(clearError());

    const { payer, paymentOptions, payment, paymentModals, paymentAction, initialData } = state;
    const {
      ccScanWithApdDevice,
      ccScanWithMagesafeDevice
    } = initialData;
    const {
      isCheckedForPay
    } = paymentModals.newCreditCard.toJS();

    const options = paymentOptions.options.toJS().data;
    const isUseCreditCard = filterOptions(options).some(opt =>
      opt.activeVal === paymentTypes.CREDITCARD ||
        opt.activeVal === paymentTypes.REFUND_CREDITCARD);
    const isUseSavedCardForCC = isUseCreditCard && filterOptions(options).some(opt =>
      opt.CCPaymentMethod === CCPaymentMethods.SAVED_CARD_WITH_PCI);
    const isUseNewCardForCC = isUseCreditCard && filterOptions(options).some(opt =>
      opt.CCPaymentMethod === CCPaymentMethods.NEW_CARD_WITH_DEVICE);
    const isSelectMakeAPayment = paymentAction.get('isSelectMakeAPayment');
    const isUseDevice = ccScanWithApdDevice || ccScanWithMagesafeDevice;
    const isUsePCIForCCPayment = !isUseDevice || isUseSavedCardForCC;

    return new Promise((resolve, reject) => {
      if (!isCheckedForPay && isUseCreditCard) {
        let processNewCardPromise = null;

        if (isUsePCIForCCPayment) {
          processNewCardPromise = dispatch(submitCCPaymentIframeAsyncAction());
        } else if (ccScanWithMagesafeDevice && isUseNewCardForCC) {
          let isShowSaveCardInformation = true;

          if (
            payment.get('isRefund') ||
            payer.get('isPayerBeDropIn') ||
            !initialData.showPriorCC
          ) {
            isShowSaveCardInformation = false;
          }

          processNewCardPromise = dispatch(proceedMagtekModalPromiseAction(
            getFee(paymentInfosClone),
            isShowSaveCardInformation
          ));
        }
        /* istanbul ignore next */
        if (processNewCardPromise != null) {
          return processNewCardPromise
            .then(
              (result) => {
                let creditCardItemIndex = null;
                filterOptions(options).forEach((opt, i) => {
                  if (opt.ComponentName === 'CreditCard') {
                    creditCardItemIndex = i;
                  }
                });

                const paymentParams = paymentInfos.map((item, i) => {
                  if (i === creditCardItemIndex) {
                    if (isUsePCIForCCPayment) {
                      const {
                        sessionId,
                        saveForFutureUse
                      } = result;

                      return {
                        ...item,
                        pci_checkout_sessionid: sessionId,
                        add_to_customer_cc: saveForFutureUse
                      };
                    }

                    const {
                      walletId,
                      ccNumberValue,
                      cardTypeId,
                      cardTypeSystemId,
                      expirationDate,
                      saveCardInformation
                    } = result;

                    return {
                      ...item,
                      credit_card_type: cardTypeSystemId,
                      cc_expiry: expirationDate,
                      ams_account_id: walletId,
                      add_to_customer_cc: saveCardInformation,
                      cc_number: maskCard(ccNumberValue),
                      saved_credit_card_name: `${CCTYPES[`${cardTypeId}`]} ends in ${ccNumberValue.toString().slice(-4)}`
                    };
                  }

                  return item;
                });

                return resolve(paymentParams);
              })
            .catch(err => reject(err));
        }
      }
      return resolve(paymentInfos);
    })
    // try submit payment plan payment iframe
    /* istanbul ignore next */
    .then((paymentInfo2) => {
      const isUsePaymentPlanCC = filterOptions(options).some(opt =>
        (opt.activeVal === paymentTypes.PAYMENTPLAN) &&
        (opt.autoPaymentTypes.selected === ppPaymentTypes.CREDITCARD) &&
        opt.showAutoPaymentMethod);

        /* istanbul ignore next */
      if (isUsePaymentPlanCC && !isUseDevice) {
        return dispatch(submitPPPaymentIframeAsyncAction())
        .then((result) => {
          let ppIndex = null;
          filterOptions(options).forEach((opt, i) => {
            if (opt.activeVal === paymentTypes.PAYMENTPLAN) {
              ppIndex = i;
            }
          });
          return paymentInfo2.map((item, i) => {
            if (i === ppIndex) {
              const {
                sessionId,
                saveForFutureUse
              } = result;

              item.payment_plan_details = {
                ...item.payment_plan_details,
                pci_checkout_auto_payment_sessionid: sessionId,
                add_to_customer_cc: saveForFutureUse
              };
            }

            return item;
          });
        });
      }
      return Promise.resolve(paymentInfo2);
    })
    .then((paymentInfos3) => {
      const { companyId, agentId, customerId } = payer.toJS().params;
      dispatch(hideNewCreditCardModalAction());
      dispatch(hideMagtekModalAction());
      const requestUrl = isSelectMakeAPayment ? URL.makeAPayment : URL.makePayment;

      return dispatch(
        _makePayment({
          batchID,
          receiptID,
          requestUrl,
          paymentInfos: paymentInfos3
        })).then(
        ({ payload: { body: { result: {
          receipt_header_id: id,
          payment_errors: errors
         } } } }) => {
          const receiptHeaderId = id;
          const isRefund = payment.get('isRefund');

          if (!isEmpty(errors)) {
            const {
              paymentErrors,
              optionErrors
            } = getServerErrors(errors, options);

            dispatch(showErrors(paymentErrors));
            forEach(optionErrors, (e) => {
              dispatch(showOptionErrorsAction(e.key, [e]));
            });

            return false;
          }

          const paymentFinally = () => {
            if (ccScanWithApdDevice) {
              const pays = [];
              paymentInfosClone.forEach((pi) => {
                if (pi.disabled) {
                  return false;
                }

                const paymentTypeId = pi.payment_type_id;
                const opt = options[pi.index];
                const isCCForPinpad = (paymentTypeId === paymentTypes.CREDITCARD ||
                    paymentTypeId === paymentTypes.REFUND_CREDITCARD) &&
                  (opt.CCPaymentMethod === CCPaymentMethods.NEW_CARD_WITH_DEVICE);
                const isDebitCardForPinpad = paymentTypeId === paymentTypes.DEBITCARD ||
                  paymentTypeId === paymentTypes.REFUND_DEBITCARD;
                /* istanbul ignore else */
                if (isCCForPinpad || isDebitCardForPinpad) {
                  pays.push({
                    ...pi,
                    amount: formatCurrency(pi.amount),
                    paymentTypeId,
                    payName: payMap[paymentTypeId]
                  });
                }

                return false;
              });

              if (pays.length) {
                /* istanbul ignore next */
                const pinpadPayData = {
                  receiptHeaderId,
                  isRefund,
                  debitCardId: isRefund ? paymentTypes.REFUND_DEBITCARD : paymentTypes.DEBITCARD,
                  batchID,
                  receiptID,
                  companyId,
                  agentId,
                  customerId,
                  pays
                };

                return dispatch(swipeCardInPinpadModal(pinpadPayData, {
                  fetchAccountHolderAction,
                  gotoNextPage
                }));
              }
            }

            return dispatch(gotoNextPage(receiptHeaderId));
          };

          if (isRefund) {
            return dispatch(deletePendingGiftCard()).then(
              () => paymentFinally(), () => paymentFinally());
          }

          return paymentFinally();
        });
    });
  };
}

export function showECPAuthDetails(ecpAuthDetails) {
  return {
    type: SHOW_ECP_AUTH_DETAILS,
    payload: {
      ecpAuthDetails
    }
  };
}

export function updatePayNowAmount(payNowAmount) {
  return {
    type: UPDATE_PAY_NOW_AMOUNT,
    payload: {
      payNow: payNowAmount
    }
  };
}

export const windowResize = height => ({
  type: RESIZE,
  payload: {
    height
  }
});

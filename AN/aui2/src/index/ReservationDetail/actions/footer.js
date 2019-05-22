import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import { redirect } from 'shared/actions/route';
import { pages, messages } from 'shared/consts';
import sharedURL from 'shared/urls';
import { saveWaiverErrorMessage } from 'shared/actions/waiver';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import { checkAllWaiverRequried, showAllInvalidEventDetail } from './eventList';
import { saveConfirmChangeErrors, setWaiverErrors } from './index';
import { updateQuestionErrorsByCustomQuestionIndexAction } from './survey';
import { setAmendmentReasonShown } from './modals/amendmentReason';
import URL from '../urls';

export const CANCEL_RESERVATION_DETAIL_RECEIPT_SUCCESS = 'CANCEL_RESERVATION_DETAIL_RECEIPT_SUCCESS';
export const CONFIRM_RESERVATION_CHANGE_SUCCESS = 'CONFIRM_RESERVATION_CHANGE_SUCCESS';
export const NEED_PAY_FOR_RESERVATION_CHANGES = 'NEED_PAY_FOR_RESERVATION_CHANGES';
export const IS_CLICKED_CONFIRM_CHANGES = 'IS_CLICKED_CONFIRM_CHANGES';

export function cancelReceipt() {
  return (dispatch, getState) => {
    const { batchID, receiptID } = getState().initialData;
    const url = getDynamicUrl(sharedURL.cancelReceipt, {
      batchID,
      receiptID,
      voidDraft: true
    });

    return dispatch({
      types: [
        '', CANCEL_RESERVATION_DETAIL_RECEIPT_SUCCESS, ''
      ],
      promise: API => API.post(url)
    });
  };
}

export function reEnterReservationDetail(params) {
  return (dispatch, getState) => {
    const { permitID } = getState().initialData;

    return dispatch(redirect(pages.buildUrl(pages.reservationDetailPage, {
      ...params,
      permit_id: permitID
    })));
  };
}

export function gotoPaymentOrRefundPage(params) {
  return (dispatch, getState) => {
    const { initialData, footer } = getState();
    const confirmReceiptId = footer.get('confirmChangeReceiptId');
    const { batchID, receiptID, permitID, receiptEntryID } = initialData;

    return dispatch(redirect(pages.buildUrl(pages.paymentPage, {
      batch_id: batchID,
      receipt_id: confirmReceiptId,
      receipt_entry_id: 0,
      permit_id: permitID,
      draft_receipt_id: receiptID,
      draft_receipt_entry_id: receiptEntryID,
      [pages.sourcePageKey]: pages.reservationDetailPage,
      ...params
    })));
  };
}

export function isChangeNeedPay(isShouldPay, confirmChangeReceiptId, confirmChangeDraftReceiptId) {
  return {
    type: NEED_PAY_FOR_RESERVATION_CHANGES,
    payload: {
      isShouldPay,
      confirmChangeReceiptId,
      confirmChangeDraftReceiptId
    }
  };
}

export function cancelReceiptAndReloadPage() {
  return dispatch => dispatch(cancelReceipt()).then(() => {
    dispatch(reEnterReservationDetail());
  });
}

export const getConfirmChangeResult = () => (dispatch, getState) => {
  const { batchID, receiptID, permitID } = getState().initialData;
  const url = getDynamicUrl(URL.confirmChange, {
    permitID
  });
  const amendmentReason = getState().amendmentReason.get('value');

  return dispatch({
    types: [
      '', CONFIRM_RESERVATION_CHANGE_SUCCESS, ''
    ],
    promise: API => API.post(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        permit_id: permitID,
        amendment_notes: amendmentReason
      }
    })
  });
};

const leaveToPaymentPlanAsyncAction = () => (dispatch, getState) => {
  const { initialData, footer } = getState();
  const receiptId = footer.get('confirmChangeReceiptId');
  const draftReceiptId = footer.get('confirmChangeDraftReceiptId');
  const { batchID, permitID } = initialData;
  const url = getDynamicUrl(URL.leaveToPaymentPlan, {
    batchID,
    permitID,
    receiptId,
    draftReceiptId
  });

  return dispatch({
    types: ['', '', ''],
    promise: API => API.post(url)
  });
};

export function confirmReservationDetailChange(onError) {
  return dispatch => dispatch(getConfirmChangeResult()).then(({
    payload: {
      body: {
        payment_or_refund: paymentOrRefund,
        error_events: errorEvents
      }
    }
  }) => {
    if (errorEvents && errorEvents.length > 0) {
      let questionErrors = [];
      const waiverErrors = {};
      convertCasingPropObj(errorEvents).forEach((event) => {
        /* istanbul ignore else */
        if (event.errorQuestions && event.errorQuestions.length > 0) {
          questionErrors = event.errorQuestions.map(questionError => ({
            error: questionError.error,
            customquestionIndex: questionError.customquestionIndex,
            eventIndex: event.eventIndex
          }));
        }
        /* istanbul ignore else */
        if (event.errorWaivers && event.errorWaivers.length > 0) {
          event.errorWaivers.forEach((waiver) => {
            waiverErrors[waiver.waiverIndex] = {
              error: 'Required',
              eventIndex: event.eventIndex
            };
          });
        }
      });

      if (questionErrors.length > 0) {
        dispatch(updateQuestionErrorsByCustomQuestionIndexAction(questionErrors));
      }
      if (!isEmpty(waiverErrors)) {
        dispatch(setWaiverErrors());
        isFunction(onError) ? onError() : '';
      }
      dispatch(saveWaiverErrorMessage(mapValues(waiverErrors, item => item.error)));
      return dispatch(saveConfirmChangeErrors(waiverErrors));
    }

    const {
      non_monetary_receipt: nonMonetaryReceipt,
      amount_due: amountDue,
      draft_receipt_id: draftReceiptId,
      receipt_id: receiptId
    } = paymentOrRefund;

    if (nonMonetaryReceipt) { // no fee change or has just payment plan when need refund
      const rdconfirmMsgObj = messages.reservationDetails.confirmReservationDetailChange_Success;
      return dispatch(reEnterReservationDetail({
        [messages.messageKey]: rdconfirmMsgObj.code
      }));
    }
    // payment workflow
    if (amountDue > 0) {
      return dispatch(isChangeNeedPay(true, receiptId, draftReceiptId));
    }

    // refund workflow need pass param to identify the reservation detail message
    return dispatch(gotoPaymentOrRefundPage({
      receipt_id: receiptId,
      draft_receipt_id: draftReceiptId
    }));
  });
}

function isExistQuestionErrors(survey) {
  const existingQuestion = [];
  survey.map(eventQuestion => isArray(eventQuestion.errors) &&
    existingQuestion.push(eventQuestion.errors));

  return existingQuestion.length > 0;
}

export function clickConfirmChange() {
  return (dispatch, getState) => {
    const { waiver, eventDetail, survey } = getState();

    const result = checkAllWaiverRequried(waiver.get('allWaivers'),
      eventDetail.get('eventValidStatus'));

    if (isExistQuestionErrors(survey)) {
      return false;
    }
    if (result.allRequired) {
      return dispatch(setAmendmentReasonShown(true));
    }
    return dispatch(showAllInvalidEventDetail(result.invalidWaiverEvents));
  };
}

export const isClickedConfirmChanges = isClickedConfirmChangeBtn => ({
  type: IS_CLICKED_CONFIRM_CHANGES,
  payload: {
    isClickedConfirmChanges: isClickedConfirmChangeBtn
  }
});

export const leaveToPaymentPlanAndNext = (params = {}) => dispatch =>
  dispatch(leaveToPaymentPlanAsyncAction())
  .then(({
    payload: {
      body: {
        payment_or_refund: {
          non_monetary_receipt: nonMonetaryReceipt,
          draft_receipt_id: draftReceiptId,
          receipt_id: receiptId
        }
      }
    }
  }) => {
    if (nonMonetaryReceipt) { // no fee change or has just payment plan when need refund
      const rdconfirmMsgObj = messages.reservationDetails.confirmReservationDetailChange_Success;
      return dispatch(reEnterReservationDetail({
        [messages.messageKey]: rdconfirmMsgObj.code
      }));
    }

    return dispatch(gotoPaymentOrRefundPage({
      receipt_id: receiptId,
      draft_receipt_id: draftReceiptId,
      ...params
    }));
  });

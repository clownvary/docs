import URL from '../../urls';
import { updatePaymentOptionByKeyAction } from './options';
import getSessionIDs from '../../utils/getSessionIDs';
import { CCPaymentMethods } from '../../consts';

export const CREDITCARD_FETCH_LIST_SUCCESS = 'Payment/PaymentOptions/CREDITCARD_FETCH_LIST_SUCCESS';

let _instancePaymentIframe;

const getPriorCreditCardList = ({
  isRefund,
  isSelectModifyPaymentPlan,
  batchID,
  receiptID,
  permitID
}) => {
  let url = URL.creditCardList;
  /* istanbul ignore else */
  if (isRefund) {
    url = URL.refundCreditCardList;
  }
  /* istanbul ignore else */
  if (isSelectModifyPaymentPlan) {
    url = URL.paymentPlanCreditCardList;
  }

  return {
    types: ['', CREDITCARD_FETCH_LIST_SUCCESS],
    promise: API => API.get(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        permit_id: permitID
      }
    })
  };
};

const getIframeUrl = (
  batchID,
  receiptID,
  permitID,
  customerId,
  companyId,
  showPriorCC,
  isRefund,
  isSelectModifyPaymentPlan,
  CCForPaymentPlan,
  isUseDevice,
  allowNewCard
) => {
  // const url = isRefund ? URL.getRefundPCIIframeUrl : URL.getPCIIframeUrl;
  let url = URL.getPCIIframeUrl;
  let enableNewCCOption = true;

  if (isRefund && !isUseDevice) {
    enableNewCCOption = allowNewCard;
  }

  if (isUseDevice) {
    enableNewCCOption = false;
  }

  /* istanbul ignore else */
  if (isRefund) {
    // allow refund to a new card is controlled by BE in the API of URL.getRefundPCIIframeUrl
    url = URL.getRefundPCIIframeUrl;
  }
  /* istanbul ignore else */
  if (CCForPaymentPlan) {
    url = URL.getPaymentPlanPCIIframeUrl;
  }

  const params = {
    batch_id: batchID,
    receipt_id: receiptID,
    permit_id: permitID,
    customer_id: customerId,
    company_id: companyId,
    /*
      Refund will always show the saved cc,
      others will be controlled by the show_prior_cc(paymentPlan or CC option)
    */
    enable_saved_cc: showPriorCC,
    // show or hide the "Save card information" checkbox. Refund will hide, others will show
    enable_save_in_wallet_option: !isRefund,
    // Fix the ANE-81134, only used for payment plan cc of new workflow
    is_modify_paymentplan: isSelectModifyPaymentPlan,
    enable_new_cc_option: enableNewCCOption
  };

  return {
    types: ['', 'NOACTION'],
    promise: API => API.get(url, {
      body: params
    })
  };
};

export const changeCreditCardAmount = ({ amount, key, formatCreditCardAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(key, 'amount', amount));
    return dispatch(updatePaymentOptionByKeyAction(key, 'formatCreditCardAmount', formatCreditCardAmount));
  };

export const changeCreditCardAction = (optIndex, value) =>
  dispatch => dispatch(updatePaymentOptionByKeyAction(optIndex, 'CCPaymentMethod', value));

export const getPriorCreditCardListAction = (isRefund, isSelectModifyPaymentPlan) =>
  (dispatch, getState) => {
    const { batchID, receiptID, permitID } = getSessionIDs(getState());
    return dispatch(getPriorCreditCardList({
      isRefund,
      isSelectModifyPaymentPlan,
      batchID,
      receiptID,
      permitID
    }));
  };

export const fetchCreditCardListAction = optIndex =>
  (dispatch, getState) => {
    const { payment, initialData, payer } = getState();
    const isRefund = payment.get('isRefund');
    const showPriorCC = initialData.showPriorCC;
    const isPayerBeDropIn = payer.get('isPayerBeDropIn');
    let hasSavedCC = false;

    if (isRefund || showPriorCC) {
      return dispatch(getPriorCreditCardListAction(isRefund))
        .then(({ payload: { body } }) => {
          let creditCradList = null;
          let data = null;
          let allowNewCard = true;
          let CCPaymentMethod = -1;

          if (isRefund) {
            data = body.credit_card_refund;
            creditCradList = data.credit_card_list;
            allowNewCard = data.allow_new_card;
          } else {
            data = body.items;
            creditCradList = data.saved_credit_card_list;
          }

          if ((!isPayerBeDropIn || isRefund) && creditCradList.length > 0) {
            CCPaymentMethod = CCPaymentMethods.SAVED_CARD_WITH_PCI;
            hasSavedCC = true;
          } else if (allowNewCard) {
            CCPaymentMethod = CCPaymentMethods.NEW_CARD_WITH_DEVICE;
          }

          dispatch(updatePaymentOptionByKeyAction(optIndex, 'hasSavedCC', hasSavedCC));
          dispatch(changeCreditCardAction(optIndex, CCPaymentMethod));
          dispatch(updatePaymentOptionByKeyAction(optIndex, 'allowNewCard', allowNewCard));
        });
    }

    dispatch(updatePaymentOptionByKeyAction(optIndex, 'allowNewCard', true));
    dispatch(updatePaymentOptionByKeyAction(optIndex, 'hasSavedCC', hasSavedCC));
    dispatch(changeCreditCardAction(optIndex, CCPaymentMethods.NEW_CARD_WITH_DEVICE));
    return Promise.resolve();
  };

export const getInstanceAction = instance => () => { _instancePaymentIframe = instance; };

export const submitCCPaymentIframeAsyncAction = () => () => {
  if (_instancePaymentIframe) {
    return _instancePaymentIframe.submitIframePromise();
  }
  return Promise.reject('the payment instance has not been init yet.');
};

export const getIframeUrlAsyncAction = (
  showPriorCC, CCForPaymentPlan = false, allowNewCard = true
) =>
  (dispatch, getState) => {
    const state = getState();
    const {
      payer,
      payment,
      paymentAction,
      initialData: {
        ccScanWithApdDevice,
        ccScanWithMagesafeDevice
      }
    } = state;
    const { customerId, companyId } = payer.toJS().params;
    const isRefund = payment.get('isRefund');
    const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');
    const { batchID, receiptID, permitID } = getSessionIDs(state);
    const isUseDevice = ccScanWithApdDevice || ccScanWithMagesafeDevice;

    return dispatch(getIframeUrl(
        batchID,
        receiptID,
        permitID,
        customerId,
        companyId,
        showPriorCC,
        isRefund,
        isSelectModifyPaymentPlan,
        CCForPaymentPlan,
        isUseDevice,
        allowNewCard
      ))
        .then(({ payload: { body: { iframe_url: iframeUrl } } }) => Promise.resolve(iframeUrl));
  };

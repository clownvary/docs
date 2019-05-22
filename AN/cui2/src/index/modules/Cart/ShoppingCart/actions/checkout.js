import createFSA from 'react-base-ui/lib/utils/createFSA';
import { showError, clearError } from 'shared/utils/messages';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import { push } from 'index/actions/router';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { addGaTransactionsAction } from '../../Confirmation/actions/transactionGa';

import { fetchCartPageDataAsyncAction } from './common';
import { uiValidateAgreementAction } from './waiver';

import API from '../api';
import {
  CHECKOUT_UI_VALIDATION
} from '../consts/actionTypes';

import { FINAL_INITIALS_WAIVER } from '../consts/waiverTypes';

const uiValidationAction = createFSA(CHECKOUT_UI_VALIDATION);

function checkFinalWaiver(finalWaiver) {
  let isPass = true;
  if (!finalWaiver) return false;

  if (finalWaiver.required && !(finalWaiver.value)) {
    isPass = false;
  }
  return isPass;
}

const redirectShoppingCartScreen = dispatch =>
dispatch(push('newcart'));

const handlerRedirectError = (error, dispatch) => {
  const { data: { code, response: { body } } } = error;

  if (code === '9019') {
    redirectShoppingCartScreen(dispatch);
    return Promise.reject(new Error(body.message));
  }

  return Promise.reject(error);
};

export const checkoutShoppingCartAction = () => (dispatch, getState) => {
  const { waivers, waiversAgreements } = getState().modules.Cart.ShoppingCart.waiver.toJS();
  let submitDatas = {};
  let initials = [];

  if (waivers && waivers.attachments) {
    initials = waivers.attachments.map(item => ({
      attached_checklist_item_Id: item.attached_checklist_item_Id,
      activity_id: item.activity_id,
      stage_id: item.stage ? item.stage.id : 0,
      stage_version: item.stage ? item.stage.stage_version : 0,
      initial: waiversAgreements[item.id] ? waiversAgreements[item.id].value : '',
      reno: item.reno,
      internal_reno: 0
    }));
  }

  submitDatas = {
    waiver_initials_online_text: true,
    online_waiver_initials: waiversAgreements[FINAL_INITIALS_WAIVER].value,
    initials
  };

  return API.checkout({ body: submitDatas })
            .catch((error) => {
              dispatch(fetchCartPageDataAsyncAction());
              if (isValidationErrorFromApi(error)) {
                showError(error.message.details);
                return Promise.reject(new Error(error.message.details));
              }

              return handlerRedirectError(error, dispatch);
            })
            .then((response) => {
              const { body: { need_pay: needPay } } = response;
              const { checkout } = getState().modules.Cart.ShoppingCart;
              const validatePass = checkout.get('validatePass');
              if (validatePass) {
                const nextPageUrl = needPay ? 'newcart/checkout' : 'newcart/checkout/confirmation';
                if (!needPay) {
                  addGaTransactionsAction();
                }
                dispatch(push(nextPageUrl));
              }
            });
};

export const uiShowWaiverErrors = () => {
  const errorMsg = orderSummaryMessages.waiverError.defaultMessage;
  showError(errorMsg, { appendMode: true });
  return errorMsg;
};

export const uiClearWaiverErrors = () => {
  const errorMsg = orderSummaryMessages.waiverError.defaultMessage;
  clearError([errorMsg]);
  return errorMsg;
};

export const validateWaiversAction = () => (dispatch, getState) => {
  const { waivers, waiversAgreements } = getState().modules.Cart.ShoppingCart.waiver.toJS();
  let canCheckout = !waivers;
  if (!canCheckout && waiversAgreements) {
    const { final_initials_waiver, final_system_waiver } = waiversAgreements;
    // check waiver items
    let itemWaiverFlag = true;
    if (waivers && waivers.attachments) {
      waivers.attachments.forEach((item) => {
        const agreement = waiversAgreements[item.id];

        if (agreement.required && !(agreement.value)) {
          itemWaiverFlag = false;
        }
      });
    }
    // check final waiver
    const finalWaiverFlag = checkFinalWaiver(final_initials_waiver)
      && checkFinalWaiver(final_system_waiver);

    canCheckout = itemWaiverFlag && finalWaiverFlag;
  }

  dispatch(uiValidationAction({ isPass: canCheckout }));

  return canCheckout ? Promise.resolve() : Promise.reject({ isValidationError: true });
};

export const validateAndCheckoutShoppingCartAction = () => dispatch =>
  dispatch(validateWaiversAction())
    .catch((error) => {
      if (error.isValidationError) {
        dispatch(uiValidateAgreementAction());
        return Promise.reject(new Error(uiShowWaiverErrors()));
      }
      return Promise.reject(error);
    })
    .then(
      () => {
        uiClearWaiverErrors();
        return dispatch(checkoutShoppingCartAction());
      }
    );

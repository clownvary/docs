import createFSA from 'react-base-ui/lib/utils/createFSA';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import API from '../api';
import { fetchOrderSummary } from './orderSummary';
import {
  GIFTCARD_UI_DISABLE_APPLY,
  GIFTCARD_UI_GIFTCARD_LIST,
  GIFTCARD_UI_SHOW_ERROR,
  GIFTCARD_ON_UPDATE,
  GIFTCARD_RESET
} from '../consts/actionTypes';

const uiGiftCardRaw = createFSA(GIFTCARD_UI_GIFTCARD_LIST);

const onUpdateCardNumberRaw = createFSA(GIFTCARD_ON_UPDATE);
const uiShowError = createFSA(GIFTCARD_UI_SHOW_ERROR, (show, errMsg) => ({ show, errMsg }));
const uiDisableApply = createFSA(GIFTCARD_UI_DISABLE_APPLY, disable => ({ disable }));
const resetStateRaw = createFSA(GIFTCARD_RESET);

export const showErrorMessageAction = errMsg =>
  dispatch => dispatch(uiShowError(true, errMsg));

export const hideErrorMessageAction = () =>
  dispatch => dispatch(uiShowError(false, null));

export const disableApplyAction = () =>
  dispatch => dispatch(uiDisableApply(false));

export const enableApplyAction = () =>
  dispatch => dispatch(uiDisableApply(true));

export const resetGiftCardStateAction = () =>
  dispatch => dispatch(resetStateRaw());

export const fetchGiftCardAction = () => dispatch =>
  API.getGiftCard().then((response) => {
    const { body:
      { gift_certificates: { gift_certificate_list, apply_certificate_list } } } = response;
    return dispatch(uiGiftCardRaw({ gift_certificate_list, apply_certificate_list }));
  });

export const updateCardNumberAction = cardNumber => (dispatch) => {
  if (cardNumber) {
    dispatch(enableApplyAction());
  } else {
    dispatch(disableApplyAction());
  }
  dispatch(hideErrorMessageAction());
  return dispatch(onUpdateCardNumberRaw(cardNumber));
};

export const applyGiftCardAction = cardNumber => dispatch =>
  API.applyGiftCard({ giftcard_number: cardNumber }).then(() => {
    const promiseQueue = [];
    promiseQueue.push(dispatch(fetchOrderSummary()));
    promiseQueue.push(dispatch(updateCardNumberAction('')));
    promiseQueue.push(dispatch(fetchGiftCardAction()));
    return Promise.all(promiseQueue);
  })
  .catch((error) => {
    if (isValidationErrorFromApi(error)) {
      const { data: { response: { body } } } = error;
      dispatch(fetchGiftCardAction());
      dispatch(showErrorMessageAction(body.errors));
      return Promise.reject(new Error(body.errors));
    }
    return Promise.reject(error);
  });

export const removeGiftCardAction = cardId => dispatch =>
  API.removeGiftCard({ id: cardId })
  .then(() => {
    const promiseQueue = [];
    promiseQueue.push(dispatch(fetchGiftCardAction()));
    promiseQueue.push(dispatch(fetchOrderSummary()));
    return Promise.all(promiseQueue);
  });

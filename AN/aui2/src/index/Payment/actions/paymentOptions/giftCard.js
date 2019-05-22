import { addError } from 'shared/actions/Error';

import URL from '../../urls';
import { updatePaymentOptionByKeyAction, resetAvailableSplitIdsAction } from './options';
import {
  getAvailableOptionIds,
  deleteGiftCardId,
  pushGiftCardId
} from '../../utils/splitOptions';
import getSessionIDs from '../../utils/getSessionIDs';
import { paymentTypes } from '../../consts';

export const GIFTCARD_FETCH_SUCCESS = 'GIFTCARD_FETCH_SUCCESS';

export const GIFTCARD_CHANGE_TYPE = 'GIFTCARD_CHANGE_TYPE';
export const GIFTCARD_CHANGE_OPTION = 'GIFTCARD_CHANGE_OPTION';
export const GIFTCARD_RESET_LIST = 'GIFTCARD_RESET_LIST';
export const GIFTCARD_SET_LABLE = 'GIFTCARD_SET_LABLE';
export const GIFTCARD_SET_MAX_OVERRIDE = 'GIFTCARD_SET_MAX_OVERRIDE';
export const GIFTCARD_SET_AVALIABLE_AMOUNT = 'GIFTCARD_SET_AVALIABLE_AMOUNT';
export const GIFTCARD_DELETE_PAYER_GIFTCARDS_SUCCESS = 'GIFTCARD_DELETE_PAYER_GIFTCARDS_SUCCESS';

export const GIFTCARD_NEW_SET_ERROR = 'GIFTCARD_NEW_SET_ERROR';
export const GIFTCARD_NEW_CLOSE = 'GIFTCARD_NEW_CLOSE';
export const GIFTCARD_NEW_IS_OVERRIDE_MIN = 'GIFTCARD_NEW_IS_OVERRIDE_MIN';
export const GIFTCARD_NEW_IS_OVERRIDE_MAX = 'GIFTCARD_NEW_IS_OVERRIDE_MAX';
export const GIFTCARD_NEW_FETCH_INFO_SUCCESS = 'GIFTCARD_NEW_FETCH_INFO_SUCCESS';
export const GIFTCARD_NEW_DELETE_PENDING_SUCCESS = 'GIFTCARD_NEW_DELETE_PENDING_SUCCESS';
export const GIFTCARD_REMOVE_NEW = 'GIFTCARD_REMOVE_NEW';

const _deletePendingGiftCard = gcPendingList => ({
  types: ['', GIFTCARD_NEW_DELETE_PENDING_SUCCESS, ''],
  promise: API => API.post(URL.deletePendingGiftCard, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ gc_numbers: gcPendingList })
  }),
  meta: {
    ignoreLoadingbar: false,
    ignoreBusinessErrors: true
  }
});

const _fetchNewGiftCardInfo = (params, { batchID, receiptID }) => ({
  types: ['', GIFTCARD_NEW_FETCH_INFO_SUCCESS, ''],
  promise: API => API.post(URL.issueGiftCard, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      batch_id: batchID,
      receipt_id: receiptID,
      ...params
    })
  }),
  meta: {
    ignoreLoadingbar: true,
    ignoreBusinessErrors: true
  }
});

const _deletePayerGiftCard = ({ batchID, receiptID }) => ({
  types: ['', GIFTCARD_DELETE_PAYER_GIFTCARDS_SUCCESS, ''],
  promise: API => API.post(URL.deletePayerGiftCards, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  }),
  meta: {
    ignoreLoadingbar: true,
    ignoreBusinessErrors: true
  }
});

const _loadGiftCardList = (isRefund, batchID, receiptID) => ({
  types: ['', GIFTCARD_FETCH_SUCCESS, ''],
  promise: API => API.get(isRefund ? URL.refundGiftCardlist : URL.loadGiftCardList, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID
    }
  })
});

const _readyLoadGiftCardList = isRefund =>
  (dispatch, getState) => {
    const state = getState();
    const { batchID, receiptID } = getSessionIDs(state);
    return dispatch(_loadGiftCardList(isRefund, batchID, receiptID))
      .then(({ payload: { body } }) => {
        const giftCard = getState().paymentOptions.giftCard;
        const giftCardId = giftCard.get('giftCardId');
        const canUseNewGiftCard = giftCard.get('canUseNewGiftCard');
        // istanbul ignore else
        if (!canUseNewGiftCard) {
          const gcList = isRefund ? body.gc_refund_info.gc_list : body.gc_list;
          if (gcList.length < 1) {
            deleteGiftCardId(giftCardId);
          } else {
            pushGiftCardId(giftCardId);
          }
        }
      });
  };

function _setGiftCardOpiton({ value }) {
  return {
    type: GIFTCARD_CHANGE_OPTION,
    payload: { value }
  };
}

const _changeGiftCardOption = ({ value, key }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(key, 'giftCardId', value));
    return dispatch(_setGiftCardOpiton({ value }));
  };

function _resetGiftCardList(value) {
  return {
    type: GIFTCARD_RESET_LIST,
    payload: { value }
  };
}

function _noGiftCardError(value) {
  return (dispatch) => {
    dispatch(addError({
      payload: {
        code: '0003',
        message: value
      }
    }));
  };
}

export function newGiftCardClose() {
  return {
    type: GIFTCARD_NEW_CLOSE
  };
}

export function setNewGiftCardError(value) {
  return {
    type: GIFTCARD_NEW_SET_ERROR,
    payload: { value }
  };
}

export function changeGiftCardType(value) {
  return {
    type: GIFTCARD_CHANGE_TYPE,
    payload: { value }
  };
}

export function setAvaliableAmount({ giftCardId, amount }) {
  return {
    type: GIFTCARD_SET_AVALIABLE_AMOUNT,
    payload: { giftCardId, amount }
  };
}

export function setGiftCardMaxOverride({ value, isMax }) {
  return {
    type: GIFTCARD_SET_MAX_OVERRIDE,
    payload: { value, isMax }
  };
}

export function newGiftCardIsOverrideMin(value) {
  return {
    type: GIFTCARD_NEW_IS_OVERRIDE_MIN,
    payload: { value }
  };
}

export function newGiftCardIsOverrideMax(value) {
  return {
    type: GIFTCARD_NEW_IS_OVERRIDE_MAX,
    payload: { value }
  };
}

export function setGiftCardLable(value) {
  return {
    type: GIFTCARD_SET_LABLE,
    payload: { value }
  };
}

export function deletePendingGiftCard() {
  return (dispatch, getState) => {
    const state = getState();
    const isRefund = state.payment.toJS().isRefund;
    const paymentOptions = state.paymentOptions;
    const giftCard = paymentOptions.giftCard.toJS();
    const newGiftCardList = giftCard.newGiftCardDropDown.data;

    if (isRefund && newGiftCardList.length) {
      const processedGCOptionsIds = paymentOptions.options.toJS().data
        .filter(option => option.activeVal === paymentTypes.REFUND_GIFTCARD)
        .map(item => item.giftCardId);

      const gcPendingList = newGiftCardList
        .filter(gc => !processedGCOptionsIds.some(id => id === gc.value))
        .map(item => item.gc_number);

      // istanbul ignore else
      if (gcPendingList.length) {
        return dispatch(_deletePendingGiftCard(gcPendingList));
      }
    }
    return Promise.resolve('success');
  };
}

export function getNewGiftCardInfo({ params, amount, key }) {
  return (dispatch, getState) => {
    const { batchID, receiptID } = getSessionIDs(getState());

    return dispatch(_fetchNewGiftCardInfo(params, { batchID, receiptID }))
      .then(({ payload: { body } }) => {
        dispatch(setAvaliableAmount({ giftCardId: body.gc.gc_id, amount }));
        dispatch(_changeGiftCardOption({ value: body.gc.gc_id, key }));
      }).catch((error) => {
        dispatch(setNewGiftCardError(error.payload.headers.response_message));
        Promise.reject(error);
      });
  };
}

export const changeGiftCardAmount = ({ amount, key, formatGiftCardAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(key, 'amount', amount));
    return dispatch(updatePaymentOptionByKeyAction(key, 'formatGiftCardAmount', formatGiftCardAmount));
  };

export function changeGiftCardOpiton({ value, key }) {
  return (dispatch) => {
    dispatch(_changeGiftCardOption({ value, key }));
  };
}

export function changeGiftCardOption(callback) {
  return (dispatch, getState) => {
    const paymentOptions = getState().paymentOptions;
    const giftCard = paymentOptions.giftCard.toJS();
    const giftCardLabel = giftCard.giftCardLabel;
    const giftCardId = giftCard.giftCardId;
    const giftCardListData = giftCard.giftCardDropDown.data;

    const optionsLen = paymentOptions.options.toJS().data
      .filter(option => option.activeVal === giftCardId).length;

    const canUseNewGiftCard = giftCard.canUseNewGiftCard;

    if (!canUseNewGiftCard) {
      if (giftCardListData.length === 0 ||
        (giftCardListData.length && giftCardListData.length === optionsLen + 1)) {
        deleteGiftCardId(giftCardId);
      } else {
        pushGiftCardId(giftCardId);
      }
    }

    if (giftCardListData.length && giftCardListData.length === optionsLen && !canUseNewGiftCard) {
      dispatch(_noGiftCardError(`No available ${giftCardLabel}.`));
    } else {
      (typeof callback === 'function') && callback();
    }
  };
}

export const fetchGiftCardList = () =>
  (dispatch, getState) => {
    const state = getState();
    const { batchID, receiptID } = getSessionIDs(state);
    const isRefund = state.payment.toJS().isRefund;
    const payer = state.payer.toJS();

    if ((payer.payerType === 1 && payer.customers.data.length) ||
      (payer.payerType === 2 && payer.company.data.length)) {
      if (isRefund) {
        return dispatch(_deletePayerGiftCard({ batchID, receiptID }))
          .then(() => dispatch(_readyLoadGiftCardList(isRefund)),
            () => dispatch(_readyLoadGiftCardList(isRefund)));
      }

      return dispatch(_readyLoadGiftCardList(isRefund));
    }

    return Promise.resolve();
  };

export const resetGiftCardList = callback =>
  (dispatch, getState) => {
    const paymentOptions = getState().paymentOptions;

    if (paymentOptions.giftCard) {
      const options = paymentOptions.options.toJS().data || [];
      const giftCardOption = paymentOptions.giftCard.toJS();

      const {
        giftCardId,
        canUseNewGiftCard,
        giftCardDropDown,
        giftCardDropDownValue
      } = giftCardOption;

      if (giftCardDropDown) {
        const giftCardDropDownData = giftCardDropDown.data;
        let needToDeleteGiftCard = false;

        if (
          (
            (
              options.length === 2 &&
              options[0].activeVal === giftCardId &&
              options[1].activeVal === paymentTypes.PAYMENTPLAN
            ) ||
            (
              options.length &&
              (options[options.length - 1].activeVal === giftCardId)
            )
          ) &&
          !giftCardDropDownValue &&
          giftCardDropDownData.length
        ) {
          dispatch(_noGiftCardError(`Please choose a ${giftCardOption.giftCardLabel}.`));
          return false;
        }

        // istanbul ignore else
        if (options.length && !canUseNewGiftCard) {
          const remainingList = getAvailableOptionIds();
          const usedGiftCardList = options.filter(item => item.activeVal === giftCardId);

          /* eslint-disable max-len */
          // 3 cases need to delete giftCardId from optionIds
          if (giftCardDropDownData.length === 0 ||
            (giftCardDropDownData.length > 1 &&
              giftCardDropDownData.length - usedGiftCardList.length <= 1 &&
              remainingList[0] === giftCardId
            ) ||
            (giftCardDropDownData.length === 1 && remainingList.length && remainingList[0] === giftCardId)) {
            needToDeleteGiftCard = true;
          }
          /* eslint-enable max-len */
        }

        // istanbul ignore else
        if (giftCardDropDownValue) {
          dispatch(_resetGiftCardList(null));
        }

        (typeof callback === 'function') && callback();

        if (needToDeleteGiftCard) {
          deleteGiftCardId(giftCardId);
          dispatch(resetAvailableSplitIdsAction()); // update getAvailableOptionIds()
        }
      }
    }
    return false;
  };

export function cancelSelectGiftCard({ key }) {
  return (dispatch, getState) => {
    const paymentOptions = getState().paymentOptions;
    const options = paymentOptions.options.toJS().data;
    const giftCardOption = paymentOptions.giftCard.toJS();
    const giftCardId = giftCardOption.giftCardId;
    const lastSecondOption = options[options.length - 2];

    if (key === options.length - 1 &&
      lastSecondOption && lastSecondOption.activeVal === giftCardId) {
      dispatch(_resetGiftCardList(options[options.length - 2].giftCardId));
    }

    if (options.length) {
      const giftCardDropDown = giftCardOption.giftCardDropDown.data;
      const usedGiftCardList = options.filter(item => item.activeVal === giftCardId);

      // 2 cases need to push giftCardId to optionIds
      if (options[key].activeVal === giftCardId ||
        (giftCardDropDown.length && usedGiftCardList.length < giftCardDropDown.length)) {
        pushGiftCardId(giftCardId);
      }
    }
  };
}

function _removeNewGiftCard(delGiftCardId) {
  return {
    type: GIFTCARD_REMOVE_NEW,
    payload: { delGiftCardId }
  };
}

export function removeNewGiftCardAsyncAction(key) {
  return (dispatch, getState) => {
    const paymentOptions = getState().paymentOptions;
    const options = paymentOptions.options.toJS().data;
    const giftCardOption = paymentOptions.giftCard.toJS();
    const giftCardId = giftCardOption.giftCardId;
    const isRefund = getState().payment.get('isRefund');

    if (!isRefund || options[key].activeVal !== giftCardId) {
      return Promise.resolve();
    }

    const currentGiftCardId = options[key].giftCardId;
    const delPendingGiftCardOpts = options.filter(paymentOpt =>
      paymentOpt.activeVal === giftCardId && paymentOpt.giftCardId === currentGiftCardId);

    if (delPendingGiftCardOpts.length !== 1) {
      return Promise.resolve();
    }

    const delNewGiftCards = giftCardOption.newGiftCardDropDown.data
      .filter(giftCard => giftCard.gc_id === currentGiftCardId);

    if (delNewGiftCards.length !== 1) {
      return Promise.resolve();
    }

    return dispatch(_deletePendingGiftCard([delNewGiftCards[0].gc_number]))
      .then(() => dispatch(_removeNewGiftCard(delNewGiftCards[0].gc_id)));
  };
}


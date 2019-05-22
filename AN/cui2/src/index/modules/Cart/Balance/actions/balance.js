import values from 'lodash/values';
import createFSA from 'react-base-ui/lib/utils/createFSA';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import { showError, clearError, showInfo, showWarning } from 'shared/utils/messages';
import { formatI18n } from 'shared/translation/formatI18n';
import { push } from 'index/actions/router';
import API from '../api';
import {
  BALANCE_UI_LIST,
  BALANCE_UI_MESSAGE,
  BALANCE_ON_VALIDATION,
  BALANCE_ON_CLEAR_INFO,
  BALANCE_ON_UPDATE_LIST
} from '../consts/actionTypes';
import selfMessages from '../components/translations';

const uiBalanceAction = createFSA(BALANCE_UI_LIST);
const uiMessageAction = createFSA(BALANCE_UI_MESSAGE);
const onValidateBalance = createFSA(BALANCE_ON_VALIDATION);
const onClearBalanceInfo = createFSA(BALANCE_ON_CLEAR_INFO);
const onUpdateBalance = createFSA(BALANCE_ON_UPDATE_LIST);

export const fetchBalanceAction = () => dispatch => API.getBalance().then((response) => {
  const { body: { outstanding_balance_smmary: outstandingBalanceSmmary } } = response;
  dispatch(uiBalanceAction({ outstandingBalanceSmmary }));
  return Promise.resolve(response);
});

export const uiShowMessageAction = () => (dispatch, getState) => {
  const balance = getState().modules.Cart.Balance.balance;
  const warning = balance.get('outstandingAccountBalanceWarning');
  const require = balance.get('require');
  const showFun = require ? showWarning : showInfo;
  if (warning) {
    showFun(warning);
  }
  return dispatch(uiMessageAction());
};

const isMatchRequireMinPayment = (balanceState) => {
  const require = balanceState.get('require');
  const subTotal = balanceState.get('subTotal');
  const requireMinPaymentAmount = balanceState.get('requireMinPaymentAmount');

  return !require || subTotal >= requireMinPaymentAmount || false;
};

const redirectCratcreen = dispatch => dispatch(push('newcart/'));

const handlerError = (error) => {
  const { data: { response: { body } } } = error;
  const errorMessages = values(body.errors);

  errorMessages.length && showError(errorMessages, { appendMode: true });

  return errorMessages;
};

export const commitBalanceAsyncAction = () => (dispatch, getState) => {
  const outstandingBalances = getState().modules.Cart.Balance.balance.get('outstandingBalances');
  const contents = outstandingBalances.map(
    item => ({
      id: item.get('id'),
      amount: item.get('pending_payment')
    })
  ).toJS();

  return API.commitBalance({ contents })
      .catch((error) => {
        if (isValidationErrorFromApi(error)) {
          dispatch(onClearBalanceInfo());
          dispatch(fetchBalanceAction());
          return Promise.reject(new Error(handlerError(error)));
        }
        return Promise.reject(error);
      })
      .then(() => {
        dispatch(onValidateBalance({ errors: {} }));
        return redirectCratcreen(dispatch);
      });
};

export const onValidateBalanceAction = () => (dispatch, getState) => {
  const intl = getState().intl;
  const messages = intl.get('messages');
  const currentIntl = messages.get(intl.get('currentLocale'));
  const balanceState = getState().modules.Cart.Balance.balance;
  const balance = balanceState.get('outstandingBalances');
  const errors = {};
  let isExistError = false;

  balance.forEach((item) => {
    const { pending_payment: value, max, min, id } = item.toJS();

    let message = '';
    message = [
      value > max ? currentIntl.get(selfMessages.maxError.id) : '',
      value < min ? currentIntl.get(selfMessages.minError.id) : '',
      value > max ? ` ${max}.` : '',
      value < min ? ` ${min}.` : ''
    ].join('');

    if (message.length > 0) isExistError = true;

    errors[id] = message;
  });

  if (!isExistError) {
    clearError(currentIntl.get(selfMessages.nextError.id));

    const isMatch = isMatchRequireMinPayment(balanceState);
    const requireMinPaymentAmount = balanceState.get('requireMinPaymentAmount');
    const requireMinPaymentAmountMsg = formatI18n(
      currentIntl.get(selfMessages.requireMinPaymentAmount.id),
      {
        requireMinPayment: requireMinPaymentAmount
      }
    );

    if (isMatch) {
      clearError(requireMinPaymentAmountMsg);
      return dispatch(commitBalanceAsyncAction());
    }
    clearError();
    showError(requireMinPaymentAmountMsg, { appendMode: true });
  } else {
    clearError();
    showError(currentIntl.get(selfMessages.nextError.id), { appendMode: true });
  }

  dispatch(onClearBalanceInfo());
  return dispatch(onValidateBalance({ errors }));
};

export const onUpdateBalanceAction = (index, value) => dispatch =>
  dispatch(onUpdateBalance({ index, value }));

export const clearErrorStateAction = () => dispatch =>
  dispatch(onValidateBalance({ errors: {} }));

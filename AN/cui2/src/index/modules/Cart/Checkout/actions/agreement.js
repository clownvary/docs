import hasIn from 'lodash/hasIn';
import createFSA from 'react-base-ui/lib/utils/createFSA';
import { push } from 'index/actions/router';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import { showError, clearAll } from 'shared/utils/messages';
import PaymentModules from '../consts/paymentModules';
import billingAddress from '../consts/billingAddress';
import API from '../api';
import { addGaTransactionsAction } from '../../Confirmation/actions/transactionGa';
import { fetchOrderSummary } from './orderSummary';
import { submitCreditCardAsyncAction } from './paymentManager';

import {
  AGREEMENT_UI,
  AGREEMENT_ON_SIGN,
  AGREEMENT_UI_DISPLAY,
  AGREEMENT_UI_DISPLAY_ERROR,
  AGREEMENT_UI_RESET_STATE
} from '../consts/actionTypes';
import { paymentTypes, paymentTypesID } from '../consts';

const uiAgreement = createFSA(AGREEMENT_UI);
const onSignAgreement = createFSA(AGREEMENT_ON_SIGN);
const uiDisplayAgreement = createFSA(AGREEMENT_UI_DISPLAY);
const uiDisplayErrorAgreement = createFSA(AGREEMENT_UI_DISPLAY_ERROR);
export const resetAgreementStateAction = createFSA(AGREEMENT_UI_RESET_STATE);

const initStagedPCIData = {
  [PaymentModules.PRIMARY]: {},
  [PaymentModules.SECONDARY]: {}
};
let stagedPCIData = initStagedPCIData;

export const signAgreementAction = () => dispatch =>
  dispatch(onSignAgreement());

const redirectToNextScreen = (response, dispatch) => {
  dispatch(resetAgreementStateAction());
  addGaTransactionsAction();

  const { body: { showaaoffer } } = response;
  const url = !showaaoffer ? 'newcart/checkout/confirmation' : 'aaoffer';

  return dispatch(push(url));
};


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

export const displayAgreementErrorAction = ({ moduleName, errorMessage }) => dispatch =>
  dispatch(uiDisplayErrorAgreement({ moduleName, errorMessage }));

const handlerError = (dispatch, error) => {
  const { data: { response: { body } } } = error;
  let errors = {};

  if (hasIn(body, ['errors', 'primary_card'])) {
    errors = {
      moduleName: PaymentModules.PRIMARY,
      errorMessage: body.errors.primary_card
    };
  } else if (hasIn(body, ['errors', 'secondary_card'])) {
    errors = {
      moduleName: PaymentModules.SECONDARY,
      errorMessage: body.errors.secondary_card
    };
  } else {
    errors = {
      moduleName: billingAddress.BILLING_ADDRESS,
      errorMessage: body.errors.billing_address
    };
  }

  dispatch(displayAgreementErrorAction(errors));
  errors.errorMessage.length && showError(errors.errorMessage, { appendMode: true });

  return errors.errorMessage;
};
const handleRefetchOrdersummaryError = (dispatch, error) => {
  const { data: { response: { code } } } = error;
  if (code === '9018') {
    dispatch(fetchOrderSummary());
  }
};

const getSecondaryCreditCardParameters = (parametrs) => {
  const { selections, newSelections } = parametrs;

  return {
    payment_type: paymentTypesID.FUTURE_CHARGE_CREDIT_CARD,
    selections,
    new_selections: newSelections,
    saved_electronic_payment: {
      pci_checkout_sessionid: stagedPCIData[PaymentModules.SECONDARY].sessionId
    },
    save_for_future_use: stagedPCIData[PaymentModules.SECONDARY].saveForFutureUse
  };
};

const getSecondaryEcheckParameters = (parametrs) => {
  const { secondary, selections, newSelections } = parametrs;
  const selected = secondary.get('selected');

  const {
      ams_account_id,
      routing_number,
      account_number,
      account_type,
      save_name: saveName = ''
  } = selected.toJS();


  return {
    payment_type: paymentTypesID.FUTURE_CHARGE_ECHECK,
    selections,
    new_selections: newSelections,
    saved_electronic_payment: {
      save_name: saveName,
      bank_routing_number: routing_number,
      bank_account_number: account_number,
      bank_account_type: account_type,
      ams_account_id
    }
  };
};

const getSecondaryCardParameters = (secondary, futureChargesData) => {
  const data = futureChargesData.toJS();
  const selections = data.map(item => item.checked);
  const newSelections = data.map(
    item => ({
      future_payment_id: item.futurePaymentID,
      selection: item.checked
    })
  );
  const isShow = secondary.get('isShow');

  if (!isShow) {
    return {
      selections,
      new_selections: newSelections
    };
  }

  const selectedType = secondary.get('selectedType');
  const parameters = { secondary, selections, newSelections };

  if (selectedType === paymentTypes.ECHECK) {
    return getSecondaryEcheckParameters(parameters);
  }

  return getSecondaryCreditCardParameters(parameters);
};

export const commitOrderAsyncAction = parameters => (dispatch, getState) => {
  clearAll();
  const checkout = getState().modules.Cart.Checkout;
  const modules = checkout.paymentManager.get('modules');
  const selected = modules.get(PaymentModules.PRIMARY).get('selected');
  const {
      ams_account_id,
      routing_number,
      account_number,
      account_type,
      save_name: saveName = ''
  } = selected.toJS();

  parameters.electronic_payment = {
    save_name: saveName,
    bank_routing_number: routing_number,
    bank_account_number: account_number,
    bank_account_type: account_type,
    ams_account_id
  };

  const secondary = modules.get(PaymentModules.SECONDARY);
  const configurations = getState().configurations;
  const isHideFutureCharge = configurations.get('hide_payplan_details_for_online_checkout');

  if (!isHideFutureCharge) {
    const futureChargesData = checkout.futureCharges.get('data');
    const futurePayment = getSecondaryCardParameters(secondary, futureChargesData);

    if (futurePayment.selections.length) {
      parameters.future_payment = futurePayment;
    }
  }

  return API.commitOrder(parameters)
            .catch((error) => {
              handleRefetchOrdersummaryError(dispatch, error);
              dispatch(signAgreementAction());
              if (isValidationErrorFromApi(error)) {
                return Promise.reject(new Error(handlerError(dispatch, error)));
              }

              return handlerRedirectError(error, dispatch);
            })
            .then(response =>
              redirectToNextScreen(response, dispatch)
            );
};

export const displayAgreementAction = () => dispatch =>
  dispatch(uiDisplayAgreement());

export const getAgreementAsyncAction = () => (dispatch, getState) => {
  const futureChargesData = getState().modules.Cart.Checkout.futureCharges.get('data').toJS();
  const charges = futureChargesData.map(item => item.checked);
  const ids = futureChargesData.map(item => item.futurePaymentID);

  return API.getAgreement({ autoCharges: charges.join(','), futruePaymentIds: ids.join(',') }).then((response) => {
    const { body: { ecp_agreement: ecpAgreement = {} } } = response;
    const payerName = ecpAgreement.payer_name;

    if (payerName && payerName.length) {
      dispatch(uiAgreement(ecpAgreement));
    } else {
      const parameters = {
        payment_type: paymentTypesID.ECHECK,
        ecp_agreement: true
      };

      dispatch(commitOrderAsyncAction(parameters));
    }
  });
};

export const commitCCOrderAsyncAction = () => (dispatch, getState) => {
  clearAll();
  const checkout = getState().modules.Cart.Checkout;
  const modules = checkout.paymentManager.get('modules');

  const parameters = {
    payment_type: paymentTypesID.CREDIT_CARD,
    ecp_agreement: false,
    electronic_payment: {
      pci_checkout_sessionid: stagedPCIData[PaymentModules.PRIMARY].sessionId
    },
    save_for_future_use: stagedPCIData[PaymentModules.PRIMARY].saveForFutureUse
  };

  const secondary = modules.get(PaymentModules.SECONDARY);
  const configurations = getState().configurations;
  const isHideFutureCharge = configurations.get('hide_payplan_details_for_online_checkout');

  if (!isHideFutureCharge) {
    const futureChargesData = checkout.futureCharges.get('data');
    const futurePayment = getSecondaryCardParameters(secondary, futureChargesData);
    if (futurePayment.selections.length) {
      parameters.future_payment = futurePayment;
    }
  }

  return API.commitOrder(parameters)
            .catch((error) => {
              handleRefetchOrdersummaryError(dispatch, error);
              if (isValidationErrorFromApi(error)) {
                return Promise.reject(new Error(handlerError(dispatch, error)));
              }

              return handlerRedirectError(error, dispatch);
            })
            .then(response =>
              redirectToNextScreen(response, dispatch)
            );
};

export const commitOrderAction = selectedType => (dispatch, getState) => {
  if (paymentTypes.ECHECK === selectedType) {
    const configurations = getState().configurations;
    const isShowPADAgreement = configurations.get('show_pad_agreement_for_ecp');
    const isShowACHAgreement = configurations.get('show_ach_agreement_for_ecp');

    if (isShowPADAgreement || isShowACHAgreement) {
      return dispatch(getAgreementAsyncAction());
    }
    const parameters = {
      payment_type: paymentTypesID.ECHECK,
      ecp_agreement: false
    };
    return dispatch(commitOrderAsyncAction(parameters));
  }
  return dispatch(commitCCOrderAsyncAction());
};

const isMatchPayAction = (checkout, configurations) => {
  const modules = checkout.paymentManager.get('modules');
  const primary = modules.get(PaymentModules.PRIMARY);
  const types = primary.get('types');
  const selectedType = primary.get('selectedType');
  const selectedCrad = types.get(selectedType);
  const cardList = selectedCrad.get('list');
  const selected = selectedCrad.get('selected');

  const isPrimaryMacth =
    selectedType === paymentTypes.CREDIT_CARD || (selected && cardList.size > 0);
  const isHideFutureCharge = configurations.get('hide_payplan_details_for_online_checkout');

  let isSecondarymatch = true;
  if (!isHideFutureCharge) {
    const secondary = modules.get(PaymentModules.SECONDARY);
    const isShow = secondary.get('isShow');

    if (isShow) {
      const secondaryTypes = secondary.get('types');
      const secondarySelectedType = secondary.get('selectedType');
      const secondarySelectedCrad = secondaryTypes.get(secondarySelectedType);
      const secondaryCardList = secondarySelectedCrad.get('list');
      const secondarySelected = secondarySelectedCrad.get('selected');

      isSecondarymatch =
        secondarySelectedType === paymentTypes.CREDIT_CARD ||
        (secondarySelected && secondaryCardList.size > 0);
    }
  }

  return { isPrimaryMacth, isSecondarymatch, selectedType };
};

export const payAsyncAction = (unselectedCardMessage,
unselectedSecondaryCardMessage) =>
  (dispatch, getState) => {
    const checkout = getState().modules.Cart.Checkout;
    const futureChargesData = checkout.futureCharges.get('data');
    const selections = futureChargesData.toJS().map(item => item.checked);
    const autoCharges = selections.toString();

    return API.needPay({ autoCharges })
    .then((response) => {
      const { body: { need_pay: needPay } } = response;
      const configurations = getState().configurations;

      if (needPay) {
        clearAll();
        const matchPay = isMatchPayAction(checkout, configurations);
        if (!matchPay.isPrimaryMacth) {
          showError(unselectedCardMessage, { appendMode: true });
          return Promise.reject(new Error(unselectedCardMessage));
        } else if (!matchPay.isSecondarymatch) {
          showError(unselectedSecondaryCardMessage, { appendMode: true });
          const errors = {
            moduleName: PaymentModules.SECONDARY,
            errorMessage: unselectedSecondaryCardMessage
          };
          dispatch(displayAgreementErrorAction(errors));
          return Promise.reject(new Error(unselectedSecondaryCardMessage));
        }

        const promiseQueueOfPCI = [];
        const modules = checkout.paymentManager.get('modules');
        const isCCInPrimary =
          modules.getIn([PaymentModules.PRIMARY, 'selectedType']) === paymentTypes.CREDIT_CARD;
        const isCCInSecondary =
          modules.getIn([PaymentModules.SECONDARY, 'isShow']) &&
          modules.getIn([PaymentModules.SECONDARY, 'selectedType']) === paymentTypes.CREDIT_CARD;

        if (isCCInPrimary) {
          promiseQueueOfPCI.push(dispatch(submitCreditCardAsyncAction(PaymentModules.PRIMARY)));
        }

        if (isCCInSecondary) {
          promiseQueueOfPCI.push(dispatch(submitCreditCardAsyncAction(PaymentModules.SECONDARY)));
        }

        if (promiseQueueOfPCI.length) {
          return Promise.all(promiseQueueOfPCI).then((payInfos) => {
            stagedPCIData = payInfos.reduce(
              (prevValue, { moduleName, sessionId, saveForFutureUse }) => {
                prevValue[moduleName] = { sessionId, saveForFutureUse };
                return prevValue;
              }, {}
            );
            return dispatch(commitOrderAction(matchPay.selectedType));
          }).catch((error) => {
            stagedPCIData = initStagedPCIData;
            return Promise.reject(error);
          });
        }

        return dispatch(commitOrderAction(matchPay.selectedType));
      }

      const newSelections = futureChargesData.toJS().map(
        item => ({
          future_payment_id: item.futurePaymentID,
          selection: item.checked
        })
      );

      const parameters = {
        future_payment: { selections, new_selections: newSelections }
      };

      return API.commitOrder(parameters)
                .catch((error) => {
                  handleRefetchOrdersummaryError(dispatch, error);
                  if (isValidationErrorFromApi(error)) {
                    return Promise.reject(new Error(handlerError(dispatch, error)));
                  }

                  return handlerRedirectError(error, dispatch);
                })
                .then(_response =>
                  redirectToNextScreen(_response, dispatch)
                );
    });
  };

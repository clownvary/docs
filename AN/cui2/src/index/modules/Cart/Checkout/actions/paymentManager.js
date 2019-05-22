import createFSA from 'react-base-ui/lib/utils/createFSA';
import { payment as paymentHelper } from 'react-base-ui/lib/helper';
import { clearError } from 'shared/utils/messages';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import selfMessages from '../components/OrderSummary/translations';

import API from '../api';
import * as PaymentTypes from '../consts/paymentTypes';
import AMSCONST from '../consts/ams';
import {
  getLastFourNumber,
  generateTepmECheckId
} from '../utils/payment';

import PaymentModules from '../consts/paymentModules';
import PaymentManagerHelper from '../utils/PaymentManagerHelper';

import {
  PAYMENT_UI_UPDATE_MODULES
} from '../consts/actionTypes';

const PMInstance = new PaymentManagerHelper();

export const updateModules = createFSA(PAYMENT_UI_UPDATE_MODULES);

const getModulesState = state => state.modules.Cart.Checkout.paymentManager.get('modules');

const clearErrorMessage = (moduleName, getState) => {
  const intl = getState().intl;
  const messages = intl.get('messages');
  const currentIntl = messages.get(intl.get('currentLocale'));

  if (moduleName === PaymentModules.PRIMARY) {
    const unselectedCardMessage = currentIntl.get(selfMessages.unselectedCard.id);
    clearError(unselectedCardMessage);
  } else {
    const unselectedSecondaryCardMessage = currentIntl.get(selfMessages.unselectedSecondaryCard.id);
    clearError(unselectedSecondaryCardMessage);
  }

  const errors = getState().modules.Cart.Checkout.agreement.get('errors');

  if (errors.get('errorMessage') && errors.get('moduleName') === moduleName) {
    clearError(errors.get('errorMessage'));
  }
};

export const selectItemAction = (moduleName, typeName, payItemId, toTop = false) =>
  (dispatch, getState) => {
    clearErrorMessage(moduleName, getState);

    PMInstance.syncModules(getModulesState(getState()));
    const selectItem = PMInstance.getSelect(moduleName);
    /* istanbul ignore next */
    if (moduleName === PaymentModules.PRIMARY && selectItem && selectItem.get('id') !== payItemId) {
      PMInstance.clearSelectUnderModule(PaymentModules.SECONDARY);
    }

    const modules = PMInstance
      .setSelectAndUpdateModules(moduleName, typeName, payItemId, toTop)
      .getModules();

    return dispatch(updateModules(modules));
  };

export const changePaymentTypeAction = (moduleName, typeName) => (dispatch, getState) => {
  const modules = PMInstance.syncModules(getModulesState(getState()))
    .setSelectedTypeAndUpdateModules(moduleName, typeName)
    .getModules();

  return dispatch(updateModules(modules));
};

export const fetchSavedEChecksAsyncAction = () => (dispatch, getState) =>
  API.getSavedEChecks().then((response) => {
    const { body: { saved_echeck: savedCards } } = response;
    const modules = PMInstance.syncModules(getModulesState(getState()))
      .setTotalListAndUpdateModules(PaymentTypes.ECHECK, savedCards)
      .getModules();

    dispatch(updateModules(modules));
    return Promise.resolve(response);
  });

export const fetchPaymentDataAction = () => (dispatch, getState) => {
  const configurations = getState().configurations;
  const showPriorECP = configurations.get('show_prior_ecp');
  const hasEftLicense = configurations.get('has_eft_license');
  const allowPublicEft = configurations.get('allow_public_eft');
  if (hasEftLicense && allowPublicEft && showPriorECP) {
    return dispatch(fetchSavedEChecksAsyncAction());
  }
  return Promise.resolve();
};

export const registerModuleAction = (moduleName, types, defaultType, settings) =>
  (dispatch, getState) => {
    const configurations = getState().configurations;
    const hasEftLicense = configurations.get('has_eft_license');
    const allowPublicEft = configurations.get('allow_public_eft');
    const merchantName = getState().configurations.get('ams_merchant_name');

    if (!hasEftLicense || !allowPublicEft) {
      types = types.filter(type => type !== PaymentTypes.ECHECK);
    }

    const modules = PMInstance.syncModules(getModulesState(getState()))
      .registerModule(moduleName, types, defaultType, settings)
      .setMerchantNameAndUpdateModules(
        PaymentTypes.CREDIT_CARD,
        merchantName
      )
      .getModules();

    return dispatch(updateModules(modules));
  };

export const addTempECPAction = ({ moduleName, tempPayItem }) => (dispatch, getState) => {
  const modules = PMInstance.syncModules(getModulesState(getState()))
    .addTemporaryPayItemAndUpdateModules(
      moduleName,
      PaymentTypes.ECHECK,
      tempPayItem
    )
    .getModules();

  return dispatch(updateModules(modules));
};

export const checkSecondaryPaymentAction = (moduleName, futureCharges) => (dispatch, getState) => {
  const configurations = getState().configurations;
  const autoBillingSetting = configurations.get('require2nd_form_of_payment');
  const hasCheckedFutureCharge = futureCharges.some(fc => fc.get('checked'));
  const modules = PMInstance.syncModules(getModulesState(getState()))
        .setIsShowAndUpdateModules(
          moduleName,
          autoBillingSetting && hasCheckedFutureCharge
        )
        .getModules();

  return dispatch(updateModules(modules));
};

export const addECPAsyncAction = (moduleName, {
  ecpAccountType,
  ecpAccountNumber,
  ecpRoutingNumber,
  ecpSavedForFurtureUse
}) => (dispatch, getState) => {
  const { validation: { maskCard } } = paymentHelper;

  const maskedAccountNumber = maskCard(ecpAccountNumber);
  const accountNumber = getLastFourNumber(ecpAccountNumber);
  const maskedRoutingNumber = maskCard(ecpRoutingNumber);
  const routingNumber = getLastFourNumber(ecpRoutingNumber);

  const customerId = getState().systemSettings.getIn(['user', 'customerid']);
  const payerId = getState().modules.Cart.Checkout.billingAddress.getIn(['selectedBillingAddress', 'customer_id']);
  const payItemId = generateTepmECheckId(
    maskedAccountNumber, maskedRoutingNumber, ecpSavedForFurtureUse, customerId, payerId
  );
  const payItemMap = {
    ams_account_id: null,
    save_name: maskedAccountNumber,
    account_number: maskedAccountNumber,
    routing_number: maskedRoutingNumber,
    account_type: ecpAccountType
  };
  /**
   * Step 1:
   *  fetch AMS token and then goto setp 2.
   */
  return API.getAMSToken()
    /**
     * Step 2: fetch AMS account id or not.
     *  1. If returned modulus is 'localdemo', directly goto step 3.
     *  2. If returned modulus is not 'localdemo', fetch AMS account id and then
     *     goto setp 3.
     */
    .then(({ body: { ams_token: { account_holder_name: accountHolderName = '', modulus = '', exponent = '' } } }) => {
      if (modulus !== AMSCONST.LOCALDEMO_MODULUS) {
        const request = new window.AMS.AccountInfo();
        request.setAccountType(ecpAccountType);
        request.setAccountNumber(ecpAccountNumber);
        request.setBankID(ecpRoutingNumber);
        request.setAccountOwner(accountHolderName);
        request.setModulus(modulus);
        request.setExponent(exponent);

        const cipherText = window.AMS.getCipher(request);

        return API.getAMSAccountId({
          cipher_text: cipherText,
          ams_retention_date: '',
          time: new Date().getTime(),
          cc_ams_account_id_modulus: modulus,
          key_number: accountNumber,
          is_ecp: true
        });
      }
      return Promise.resolve({
        body: {
          ams_account: {
            wallet_id: AMSCONST.LOCALDEMO_WALLET_ID
          }
        }
      });
    })
    /**
     * Step 3: Save ECP to server or not.
     *  1. If 'ecpSavedForFurtureUse' is false, directly goto setp 4.
     *  2. If 'ecpSavedForFurtureUse' is true, save ECP record to server and
     *     then goto setp 4.
     */
    .then(({ body: { ams_account: { wallet_id: walletId } } }) => {
      payItemMap.ams_account_id = walletId;
      if (ecpSavedForFurtureUse) {
        return API.saveECheck({ body: [{ ...payItemMap }] });
      }
      return Promise.resolve();
    })
    /**
     * Step 4: Add new added ECP info to ui layer.
     *  1. If 'ecpSavedForFurtureUse' is false, directly add the ECP info to ui layer.
     *  2. If 'ecpSavedForFurtureUse' is true, fetch saved ECP list again, then
     *     add the new ECP info to ui layer.
     */
    .then(() => {
      if (ecpSavedForFurtureUse && payerId === customerId) {
        return dispatch(fetchSavedEChecksAsyncAction());
      }
      payItemMap.id = payItemId;
      dispatch(
        addTempECPAction({
          moduleName,
          tempPayItem: {
            ...payItemMap,
            ...{ account_number: accountNumber, routing_number: routingNumber }
          }
        })
      );
      return Promise.resolve();
    })
    /**
     * Step 5: Select the new added ECP item.
     */
    .then(() => dispatch(selectItemAction(moduleName, PaymentTypes.ECHECK, payItemId, true)));
};

export const addPayItemAsyncAction = (moduleName, typeName, payItemInfo) =>
  (dispatch, getState) => {
    switch (typeName) {
      case PaymentTypes.ECHECK:
        return addECPAsyncAction(moduleName, payItemInfo)(dispatch, getState)
          .catch((error) => {
            if (isValidationErrorFromApi(error)) {
              const { data: { response: { body } } } = error;
              return Promise.resolve({ errors: body.errors });
            }
            return Promise.reject(error);
          });
      default:
        return '';
    }
  };

export const reloadPCIAction = () => (dispatch, getState) => {
  const modules = getModulesState(getState());
  const isCCInPrimary =
    modules.getIn([PaymentModules.PRIMARY, 'selectedType']) === PaymentTypes.CREDIT_CARD;
  const isCCInSecondary =
    modules.getIn([PaymentModules.SECONDARY, 'isShow']) &&
    modules.getIn([PaymentModules.SECONDARY, 'selectedType']) === PaymentTypes.CREDIT_CARD;

  if (isCCInPrimary) {
    const instanceInPrimary = modules.getIn([
      PaymentModules.PRIMARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'
    ]);
    instanceInPrimary && instanceInPrimary.showIframePromise();
  }

  if (isCCInSecondary) {
    const instanceInSecondary = modules.getIn([
      PaymentModules.SECONDARY, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI'
    ]);
    instanceInSecondary && instanceInSecondary.showIframePromise();
  }

  return Promise.resolve();
};

export const setInstanceOfPCIAction = (moduleName, typeName, instance) => (dispatch, getState) => {
  const modules = PMInstance.syncModules(getModulesState(getState()))
    .setInstanceOfPCI(moduleName, typeName, instance)
    .getModules();

  return dispatch(updateModules(modules));
};

export const getPCILocationOfCCAsyncAction = moduleName => (dispatch, getState) => {
  const isPrimeryPayment = moduleName === PaymentModules.PRIMARY;
  const configurations = getState().configurations;
  const showPriorCC = configurations.get('show_prior_cc');
  const customerId = getState().systemSettings.getIn(['user', 'customerid']);

  return API.getPCILocationOfCC({
    customer_id: customerId,
    white_css_url: '',
    enable_saved_cc: showPriorCC,
    enable_cvv_for_new_cc: isPrimeryPayment,
    enable_cvv_for_saved_cc: isPrimeryPayment,
    enable_save_in_wallet_option: showPriorCC && isPrimeryPayment
  }).then(({ body: { iframe_url: iframeUrl } }) => Promise.resolve(iframeUrl));
};

export const submitCreditCardAsyncAction = moduleName => (dispatch, getState) => {
  const modules = getModulesState(getState());
  const instanceOfPCI = modules.getIn([moduleName, 'types', PaymentTypes.CREDIT_CARD, 'instanceOfPCI']);

  return instanceOfPCI.submitIframePromise().then(({
    sessionId,
    saveForFutureUse
  }) => Promise.resolve({
    moduleName,
    sessionId,
    saveForFutureUse
  }));
};

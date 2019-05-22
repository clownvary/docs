import isNumber from 'lodash/isNumber';
import URL from '../../urls';
import { changeECheckSaveInformation, showECheckModalPromiseAction } from '../modals/NewECheck';
import getSessionIDs from '../../utils/getSessionIDs';
import { updatePaymentOptionByKeyAction } from './options';
import { formatECheckOption } from '../../utils/eCheckHelper';
import { newOptions } from '../../consts';

export const ECHECK_FETCH_CHECKS_SUCCESS = 'ECHECK_FETCH_CHECKS_SUCCESS';
export const ECHECK_FETCH_CONFIG_SUCCESS = 'ECHECK_FETCH_CONFIG_SUCCESS';
export const ECHECK_FETCH_ACH_SUCCESS = 'ECHECK_FETCH_ACH_SUCCESS';
export const ECHECK_ADD_NEW_TO_LIST = 'ECHECK_ADD_NEW_TO_LIST';

const _loadECheckConfig = params => ({
  types: ['', ECHECK_FETCH_CONFIG_SUCCESS, ''],
  promise: API => API.get(URL.eCheckConfig, {
    body: { ...params }
  })
});

const _loadAchContent = () => ({
  types: ['', ECHECK_FETCH_ACH_SUCCESS, ''],
  promise: API => API.get(URL.ach, {
    body: {}
  })
});

const _addNewToCheckList = newOption => ({
  type: ECHECK_ADD_NEW_TO_LIST,
  payload: { newOption }
});

const updateElectronicCheckOption = (index, value) =>
  dispatch => dispatch(updatePaymentOptionByKeyAction(index, 'eCheckListDropDownValue', value));

export const changeECheckAmount = ({ amount, key, formatECheckAmount }) =>
  (dispatch) => {
    dispatch(updatePaymentOptionByKeyAction(key, 'amount', amount));
    return dispatch(updatePaymentOptionByKeyAction(key, 'formatECheckAmount', formatECheckAmount));
  };

const _loadElectronicCheckList = params => ({
  types: ['', ECHECK_FETCH_CHECKS_SUCCESS, ''],
  promise: API => API.get(URL.loadECheckList, {
    body: { ...params }
  })
});

export const loadElectronicCheckList = () =>
  (dispatch, getState) => {
    const { batchID, receiptID, permitID } = getSessionIDs(getState());
    return dispatch(_loadElectronicCheckList({
      batch_id: batchID,
      receipt_id: receiptID,
      permit_id: permitID
    }));
  };

export const fetchECheckConfig = () =>
  (dispatch, getState) => {
    const { batchID, receiptID, permitID } = getSessionIDs(getState());

    return dispatch(_loadECheckConfig({
      batch_id: batchID,
      receipt_id: receiptID,
      permit_id: permitID
    }))
      .then(({ payload: { body: { echeck_config_info: eCheckConfig } } }) => {
        if (eCheckConfig.show_prior_ecp) {
          dispatch(loadElectronicCheckList());
        } else {
          dispatch(changeECheckSaveInformation(false));
        }

        if (!eCheckConfig.achContent) {
          dispatch(_loadAchContent());
        }
      });
  };

export const resetUseNewECheckSelectedValue = index =>
  (dispatch) => {
    window.isInPendingPayment = false;
    dispatch(updateElectronicCheckOption(index, null));
  };

export const addNewToCheckList = (index, value) =>
  (dispatch, getState) => {
    window.isInPendingPayment = false;
    let echeckList = getState().paymentOptions.eCheck.getIn(['eCheckListDropDown', 'data']).toJS();
    const newOptionIndex = echeckList.length;
    const newOption = formatECheckOption(value, newOptionIndex);

    // Filter out the same last four account number ecp which is unsaved
    if (!newOption.is_add_to_customer_ecp) {
      echeckList = echeckList.filter(echeckInfo => (
        (echeckInfo.is_add_to_customer_ecp || isNumber(echeckInfo.echeck_id)) ||
        (echeckInfo.name !== newOption.name)
      ));
      const newOptionId = `newECheck_${echeckList.length - 1}`;
      newOption.echeck_id = newOptionId;
      newOption.value = newOptionId;
    }

    dispatch(_addNewToCheckList(newOption));
    return dispatch(updateElectronicCheckOption(index, newOption.value));
  };

export const changeElectronicCheckOpiton = (index, value) =>
  (dispatch) => {
    dispatch(updateElectronicCheckOption(index, value));
    window.isInPendingPayment = value === newOptions.NEW_OPTION_VALUE;
    /* istanbul ignore else */
    if (value === newOptions.NEW_OPTION_VALUE) {
      dispatch(showECheckModalPromiseAction())
        .then(
          /* eft_account_number,
          eft_account_type,
          eft_account_type_name,
          eft_ams_account_id,
          eft_routing_number,
          is_add_to_customer_ecp,
          echeck_id
          */
          eCheckInfo => dispatch(
            addNewToCheckList(
              index,
              eCheckInfo
            )
          ),
          () => {
            dispatch(resetUseNewECheckSelectedValue(index));
          }
        );
    }
  };

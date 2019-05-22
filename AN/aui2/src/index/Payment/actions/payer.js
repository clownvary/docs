import { clearError } from 'shared/actions/Error';
import normalizeData from 'shared/utils/normalizeData';
import URL from '../urls';
import getSessionIDs from '../utils/getSessionIDs';
import { getRemaining } from '../components/PaymentOptions/utils/payment';
import {
  fetchAndResetRefundOptionAction,
  splitPaymentAction,
  changePaymentOptionsAction,
  resetPaymentOptionAction,
  changePayNowAmountAction,
  catchResetAction,
  cleanResetAction
} from './paymentOptions/options';
import { getBackupPayment, fetchAutoPaymentMethodList, changePaymentPlanAmount } from './paymentOptions/paymentPlan';
import { changeRemaining, updatePayNowAmount } from './index';
import { resetPaymentOptions } from '../utils/splitOptions';
import {
  CUSTOMER_TYPE_VALUE,
  COMPANY_TYPE_VALUE
} from '../consts/payerConfig';

import { resetTypes } from '../consts';

export const CHANGE_PAYER_TYPE = 'CHANGE_PAYER_TYPE';
export const CHANGE_PAYER = 'CHANGE_PAYER';
export const CHANGE_AGENT = 'CHANGE_AGENT';
export const SAVE_PAYER = 'SAVE_PAYER';
export const SAVE_PAYER_SUCCESS = 'SAVE_PAYER_SUCCESS';
export const SAVE_PAYER_FAILURE = 'SAVE_PAYER_FAILURE';
export const UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const RESET_AGENTS_OF_COMPANY = 'RESET_AGENTS_OF_COMPANY';
export const FETCH_AGENTS = 'FETCH_AGENTS';
export const FETCH_AGENTS_SUCCESS = 'FETCH_AGENTS_SUCCESS';
export const FETCH_AGENTS_FAILURE = 'FETCH_AGENTS_FAILURE';
export const SET_PAYER_PARAMS = 'SET_PAYER_PARAMS';
export const RESET_PAYER = 'RESET_PAYER';

export function getFinalData(initData) {
  let data = [];
  let selected = 0;
  let formatedObj = null;

  // istanbul ignore else
  if (initData && initData.length) {
    formatedObj = normalizeData(initData);
    data = formatedObj.data;
    selected = formatedObj.selected;
    selected = selected.length ? selected[0] : data[0].id;
  }

  return {
    data,
    selected
  };
}

export function changePayerType(value) {
  return {
    type: CHANGE_PAYER_TYPE,
    payload: {
      value
    }
  };
}

export function changePayer(value, payerType) {
  return {
    type: CHANGE_PAYER,
    payload: {
      value,
      payerType
    }
  };
}

export function changeAgent(selectedCompany, selectedAgent) {
  return {
    type: CHANGE_AGENT,
    payload: {
      selectedCompany,
      selectedAgent
    }
  };
}

export function setPayerParams(params) {
  return {
    type: SET_PAYER_PARAMS,
    payload: {
      params
    }
  };
}

function _savePayer(params) {
  return (dispatch, getState) => {
    const state = getState();
    const { batchID, receiptID } = getSessionIDs(state);
    const paymentPageIndex = state.payment.get('paymentPageIndex');
    dispatch(setPayerParams(params));

    return dispatch({
      types: [SAVE_PAYER, SAVE_PAYER_SUCCESS, SAVE_PAYER_FAILURE],
      promise: API => API.post(URL.savePayer, {
        body: {
          payment_page_index: paymentPageIndex,
          batch_id: batchID,
          receipt_id: receiptID,
          ...params
        }
      })
    });
  };
}

export const createChangePaymentOptionsActionCallback =
  (dispatch, payment, payer, initialData) => (paymentOptions) => {
    resetPaymentOptions(paymentOptions);
    if (paymentOptions.length) {
      const total = payment.get('total');

      if (payment.get('isRefund')) {
        dispatch(splitPaymentAction(total));
        dispatch(changeRemaining(getRemaining(-1)));
        dispatch(cleanResetAction());
      } else {
        dispatch(catchResetAction(resetTypes.CHANGE_PAYER, { total }));
        dispatch(changeRemaining(0));
      }

      dispatch(updatePayNowAmount(total));
      const modifyMode = parseInt(initialData.permitID, 10) > 0;
      if (!modifyMode && !payer.get('isPayerBeDropIn') && !payer.get('isPermitHolderBeDropIn')) {
        dispatch(changePaymentPlanAmount(0));
      }
    } else {
      dispatch(changeRemaining(getRemaining(-1)));
    }
  };

export function savePayer(params, selectedVal) {
  return (dispatch, getState) => {
    dispatch(clearError());
    return dispatch(_savePayer(params)).then(() => {
      const { payment, paymentAction, payer, initialData } = getState();
      const isPaymentActionValid = payment.get('isPaymentActionValid');
      const isSelectModifyPaymentPlan = paymentAction.get('isSelectModifyPaymentPlan');

      if (!isSelectModifyPaymentPlan) {
        if (selectedVal <= 0) {
          resetPaymentOptions([]);
          dispatch(resetPaymentOptionAction());
          dispatch(changeRemaining(getRemaining(-1)));
        } else {
          dispatch(
            changePaymentOptionsAction(
              createChangePaymentOptionsActionCallback(dispatch, payment, payer, initialData)
            )
          );
        }
      } else {
        dispatch(cleanResetAction());
        dispatch(changePayNowAmountAction(0));
      }

      if (!isPaymentActionValid || isSelectModifyPaymentPlan) {
        if (params.customer_id > 0) {
          dispatch(getBackupPayment());
        }
        dispatch(fetchAutoPaymentMethodList());
      }
    });
  };
}

export function updateCustomers(value) {
  return {
    type: UPDATE_CUSTOMERS,
    payload: {
      value
    }
  };
}

export function fetchAgents(companyId) {
  return {
    types: [FETCH_AGENTS, FETCH_AGENTS_SUCCESS, FETCH_AGENTS_FAILURE],
    promise: API => API.get(URL.companyagents, {
      body: {
        company_id: companyId
      }
    })
  };
}

function updateCompany(value) {
  return {
    type: UPDATE_COMPANY,
    payload: {
      value
    }
  };
}

export function resetAgentsOfCompany(companyId, agents) {
  return {
    type: RESET_AGENTS_OF_COMPANY,
    payload: {
      companyId,
      agents
    }
  };
}

export function fetchAgentsThenUpdateCompany({ name, id }) {
  return dispatch => dispatch(fetchAgents(id))
    .then(({ payload: { body: { agents } } }) => {
      dispatch(updateCompany({ name, id }));
      dispatch(resetAgentsOfCompany(id, agents));
    });
}

export function changeRefundPayer(value, payerType) {
  return (dispatch, getState) => {
    let savePayerPromise = null;
    /* istanbul ignore else */
    if (payerType === CUSTOMER_TYPE_VALUE) {
      savePayerPromise = dispatch(_savePayer({
        customer_id: value,
        company_id: -1,
        agent_id: -1
      }));
    } else if (payerType === COMPANY_TYPE_VALUE) {
      const payer = getState().payer;
      const [selectedCompany] = payer.getIn(['company', 'data'])
        .filter(item => item.get('id') === value);
      const selectedAgent = selectedCompany.getIn(['agents', 'selected']);
      savePayerPromise = dispatch(_savePayer({
        customer_id: -1,
        company_id: value,
        agent_id: selectedAgent
      }));
    }

    return savePayerPromise.then(() => {
      dispatch(changePayerType(payerType));
      return dispatch(changePayer(value, payerType));
    }).then(() => dispatch(fetchAndResetRefundOptionAction()));
  };
}

export function changeRefundAgent(selectedCompany, selectedAgent) {
  return dispatch => dispatch(_savePayer({
    customer_id: -1,
    company_id: selectedCompany,
    agent_id: selectedAgent
  }))
    .then(() => dispatch(changeAgent(selectedCompany, selectedAgent)))
    .then(() => dispatch(fetchAndResetRefundOptionAction()));
}

export const resetPayer = payer => ({
  type: RESET_PAYER,
  payload: {
    payer
  }
});

export const resetPayerThenOtherSections = () => (dispatch, getState) => {
  const initPayer = getState().payer.get('initPayer').toJS();
  const {
    params: {
      customerId,
      companyId,
      agentId
    }
  } = initPayer;
  const payerSelected = customerId > 0 ? customerId : companyId;
  dispatch(resetPayer(initPayer));
  dispatch(changePayer());
  return dispatch(savePayer(
    {
      customer_id: customerId,
      company_id: companyId,
      agent_id: agentId
    },
    payerSelected
  ));
};

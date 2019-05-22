import first from 'lodash/first';
import { fetchSpecialHandlingStatus } from 'shared/actions/specialHandling';
import URL from '../urls';
import { permitDetailsChanged } from './index';
import { confirmAndResetFees, setNeedsConfirmReset } from './eventList';
import { extractHolderInfo } from '../utils/permitHolder';


export const UPDATE_HOLDER_INFO = 'UPDATE_HOLDER_INFO';
export const SET_ALLOW_RESET_FEE = 'SET_ALLOW_RESET_FEE';

export const updateHolderInfo = holderInfo =>
  (dispatch, getState) => {
    const { initialData: { cashCustomerId }, permitHolder } = getState();
    let newPermitHolder = permitHolder.merge(holderInfo);
    newPermitHolder = newPermitHolder.set('isPermitHolderBeDropIn', cashCustomerId === +newPermitHolder.get('customerId'));

    return dispatch({
      type: UPDATE_HOLDER_INFO,
      payload: {
        holderInfo: newPermitHolder
      }
    });
  };


export function setAllowResetFee(eventIndex, value) {
  return {
    type: SET_ALLOW_RESET_FEE,
    payload: {
      eventIndex,
      value
    }
  };
}

export function fetchAgents(companyId, selectedAgentId = -1) {
  return {
    types: ['', '', ''],
    promise: API => API.get(URL.fetchAgents, {
      body: {
        company_id: companyId,
        selected_agent_id: selectedAgentId
      }
    })
  };
}

export const getNewPermitHolder = (type, id) => (dispatch) => {
  let customerId = 0;
  let companyId = 0;
  let newPermitHolder;
  if (type === 'customer') {
    customerId = parseInt(id, 10);
    newPermitHolder = Promise.resolve({ customerId, companyId });
  } else {
    companyId = parseInt(id, 10);
    newPermitHolder = dispatch(fetchAgents(companyId))
      .then(({ payload: { body: { agents } } }) => {
        if (agents.length > 0) {
          dispatch(updateHolderInfo({
            availableCompanyAgents: agents.map((agent, index) => ({
              ...agent,
              selected: index === 0
            }))
          }));

          customerId = parseInt(first(agents).id, 10);
        }
        return { customerId, companyId };
      });
  }
  return newPermitHolder;
};

export function _changeCustomerOrCompany({ customerId = 0, companyId = 0 }) {
  return (dispatch, getState) => {
    const { batchID, receiptID } = getState().initialData;
    return dispatch({
      types: ['', '', ''],
      promise: API => API.post(URL.changeCustomerOrCompany, {
        body: {
          customer_id: customerId,
          company_id: companyId,
          batch_id: batchID,
          receipt_id: receiptID
        }
      })
    });
  };
}

export const changeCustomerOrCompany = (customerId, companyId) => dispatch =>
  dispatch(_changeCustomerOrCompany({ customerId, companyId }))
    .then(({ payload: { body: permitHolderData } }) => {
      const invalidAgent = (companyId !== 0 && customerId === 0);
      if (!invalidAgent) {
        dispatch(updateHolderInfo(extractHolderInfo(permitHolderData)));
        dispatch(permitDetailsChanged());
        return dispatch(fetchSpecialHandlingStatus(customerId, true));
      }
      return null;
    });


export const setResetFeesConfirmation = (needsConfirmReset, specialHandling) => (dispatch) => {
  if (needsConfirmReset) {
    if (!specialHandling) {
      dispatch(confirmAndResetFees());
    } else {
      dispatch(setNeedsConfirmReset(true));
    }
  }
};

export const updatePermitHolder = ({ customerId, companyId }) => (dispatch, getState) => {
  const {
    customerId: currentCustomerId,
    companyId: currentCompanyId
  } = getState().permitHolder.toJS();

  const needsUpdate = (customerId !== currentCustomerId || companyId !== currentCompanyId);

  if (needsUpdate) {
    return dispatch(changeCustomerOrCompany(customerId, companyId))
      .then((specialHandling) => {
        dispatch(setResetFeesConfirmation(needsUpdate, specialHandling));
      });
  }
  return null;
};

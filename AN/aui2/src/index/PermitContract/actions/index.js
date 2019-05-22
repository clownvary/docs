import getDynamicUrl from 'shared/utils/getDynamicUrl';
import URL from '../urls';
import * as ActionTypes from '../consts/actionTypes';
import { optionIdsEnum } from '../consts/optionsEnum';
import { getHtmlContent } from '../utils/htmlContent';

const generatePermitContractPdf = (domString, optionId, permitNumber) => ({
  types: ['', ActionTypes.GENERATE_PERMIT_CONTRACT_PDF_SUCCESS, ''],
  promise: API => API.post(URL.generatePermitContractPdf, {
    body: {
      html_source: domString,
      option_id: optionId,
      permit_num: permitNumber
    }
  })
});

export function fetchPermitContract() {
  return (dispatch, getState) => {
    const permitId = getState().initialData.permitId;
    const url = getDynamicUrl(URL.PermitContractInfo, {
      permit_id: permitId
    });
    return dispatch({
      types: ['', ActionTypes.FETCH_PERMIT_CONTRACT_SUCCESS, ''],
      promise: API => API.get(url)
    });
  };
}


export function fetchPermitSchedule() {
  return (dispatch, getState) => {
    const permitId = getState().initialData.permitId;
    const url = getDynamicUrl(URL.PermitSchedule, {
      permit_id: permitId
    });
    return dispatch({
      types: ['', ActionTypes.FETCH_PERMIT_SCHEDULE_SUCCESS, ''],
      promise: API => API.get(url)
    });
  };
}

export const fetchAmendment = () => (dispatch, getState) => {
  const permitId = getState().initialData.permitId;
  const url = getDynamicUrl(URL.amendment, {
    permit_id: permitId
  });
  return dispatch({
    types: ['', ActionTypes.FETCH_AMENDMENT_SUCCESS, ''],
    promise: API => API.get(url)
  });
};

export const savePdfAction =
(option, permitNumber, containsRecurring, showBreakdownFee) => (dispatch) => {
  const content = getHtmlContent(option, containsRecurring, showBreakdownFee);
  return dispatch(generatePermitContractPdf(content, optionIdsEnum[option], permitNumber));
};

export const emailContract = ({ to, subject, content }) => (dispatch, getState) => {
  const permitId = getState().initialData.permitId;
  return dispatch({
    types: ['', ActionTypes.EMAIL_PERMIT_CONTRACT_SUCCESS, ''],
    promise: API => API.post(URL.emailContract, {
      body: {
        permit_id: permitId,
        to,
        subject,
        content
      }
    })
  });
};

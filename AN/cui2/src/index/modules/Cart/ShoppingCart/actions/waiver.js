import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';
import { validateWaiversAction, uiClearWaiverErrors } from './checkout';
import {
  WAIVERS_UI_LIST,
  WAIVERS_UI_HIDE_WARNING,
  WAIVERS_UI_AGREEMENT,
  WAIVERS_UI_VALIDATE_AGREEMENT
} from '../consts/actionTypes';


const uiWaiversListAction = createFSA(WAIVERS_UI_LIST);

export const hideWarningAlertAction = createFSA(WAIVERS_UI_HIDE_WARNING);
export const uiChangeAgreementEntryAction = createFSA(WAIVERS_UI_AGREEMENT);
export const uiValidateAgreementAction = createFSA(WAIVERS_UI_VALIDATE_AGREEMENT);

export const changeAgreementEntryAction = params => (dispatch, getState) => {
  dispatch(uiChangeAgreementEntryAction(params));
  return validateWaiversAction()(dispatch, getState).then(
    () => {
      dispatch(uiValidateAgreementAction(params));
      uiClearWaiverErrors();
    },
    () => {
      dispatch(uiValidateAgreementAction(params));
    }
  );
};

export const fetchWaiversAction = () => dispatch =>
  API.getWaivers().then((response) => {
    const { body: { waivers } } = response;
    dispatch(uiWaiversListAction(waivers));
  });

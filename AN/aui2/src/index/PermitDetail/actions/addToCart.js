import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import { saveWaiverErrorMessage } from 'shared/actions/waiver';
import {
  validatePrerequisiteFunc,
  authorizedUserErrMsg,
  addPrerequisiteErrsAction,
  updateNeedOverrideAction,
  updateOverrideMsgAction,
  updateIsOverrideAction,
  updateUserNameAction,
  updateUserPasswordAction,
  clearPrerequisiteErrsAction,
  updateOverrideAuthorityAction
} from 'shared/actions/prerequisite';
import { pages } from 'shared/consts';
import { redirect } from 'shared/actions/route';
import moveToTopOfPage from 'shared/utils/moveToTopOfPage';
import { setWaiverErrors } from './index';
import { getRequiredWaivers } from '../utils/getRequiredWaivers';
import URL from '../urls';

export const PERMIT_ADD_TO_CART = 'PERMIT_ADD_TO_CART';
export const PERMIT_ADD_TO_CART_SUCCESS = 'PERMIT_ADD_TO_CART_SUCCESS';
export const PERMIT_ADD_TO_CART_FAILURE = 'PERMIT_ADD_TO_CART_FAILURE';

const { batchID, receiptID, receiptEntryID } = window.__permitDetail__.__initialState__;
function getLocalParams(obj) {
  return Object.assign(obj, {
    batch_id: batchID,
    receipt_id: receiptID,
    receipt_entry_id: receiptEntryID
  });
}

export function addToCart(data) {
  const params = getLocalParams(data);

  return {
    types: [PERMIT_ADD_TO_CART, PERMIT_ADD_TO_CART_SUCCESS, PERMIT_ADD_TO_CART_FAILURE],
    promise: API => API.post(URL.addToCart, {
      body: {
        ...params
      }
    })
  };
}

export function addToCartCheck(params, onError) {
  return (dispatch, getState) => {
    const { waiver, prerequisite } = getState();
    const requriedWaivers = getRequiredWaivers(waiver.get('data'));
    if (!isEmpty(requriedWaivers)) {
      dispatch(saveWaiverErrorMessage(requriedWaivers));
      dispatch(setWaiverErrors());
      /* istanbul ignore next */
      isFunction(onError) ? onError() : '';
      return false;
    }

    const hasPrerequisiteErrs = validatePrerequisiteFunc(prerequisite);
    if (hasPrerequisiteErrs) {
      moveToTopOfPage(document.getElementById('permit-detail-page'));
      return dispatch(addPrerequisiteErrsAction(hasPrerequisiteErrs));
    }
    dispatch(clearPrerequisiteErrsAction());
    params.is_override_checked = prerequisite.get('isOverride');
    params.user_name = prerequisite.get('userName');
    params.user_password = prerequisite.get('userPassword');

    return dispatch(addToCart(params)).then((response) => {
      const {
        payload: {
          body: {
            override_info: overrideInfo,
            override_result: overrideResult,
            auto_compelete_receipt: autoCompeleteReceipt,
            receipt_header_id: receiptHeaderId,
            no_charge: nocharge
          }
        }
      } = response;

      if (overrideInfo && overrideInfo.need_override) {
        const needOverride = overrideInfo.need_override;
        const hasOverrideAuthority = overrideInfo.has_override_authority;
        const overrideMsg = overrideInfo.override_message;

        dispatch(updateNeedOverrideAction(needOverride));
        dispatch(updateOverrideAuthorityAction(hasOverrideAuthority));
        dispatch(updateOverrideMsgAction(overrideMsg));
        dispatch(updateIsOverrideAction(false));
        dispatch(updateUserNameAction(''));
        dispatch(updateUserPasswordAction(''));
        moveToTopOfPage(document.getElementById('permit-detail-page'));
      } else if (overrideResult && !overrideResult.success && prerequisite.get('needOverride')) {
        moveToTopOfPage(document.getElementById('permit-detail-page'));
        dispatch(addPrerequisiteErrsAction(authorizedUserErrMsg));
      } else if (nocharge !== '' && autoCompeleteReceipt !== '') {
        /* istanbul ignore if */
        if (nocharge === 'true' && autoCompeleteReceipt === 'true') {
          dispatch(redirect(pages.buildUrl(pages.confirmationPage, {
            batch_id: batchID,
            receipt_id: receiptID,
            receipt_header_id: receiptHeaderId
          })));
        } else {
          dispatch(redirect(pages.buildUrl(pages.cartPage, {
            batch_id: batchID,
            receipt_id: receiptID,
            receipt_entry_id: receiptEntryID
          })));
        }
      }

      return Promise.resolve(response);
    });
  };
}

import API from 'shared/api/API';
import { getCurrentInitState } from 'shared/utils/initStateHelper';
import getDynamicUrl from 'shared/utils/getDynamicUrl';
import UPDATE_SKYLOGIX_SUCCESS from 'shared/consts/skylogixTypes';
import URL from '../urls';

const _API = new API();

const _updateSkylogix = (params) => {
  const { permitID, batchID, receiptID } = getCurrentInitState();
  const url = getDynamicUrl(URL.updateSkylogix, { permitID });
  return _API.post(url, {
    body: {
      ...params,
      permit_id: permitID,
      receipt_id: receiptID,
      batch_id: batchID
    }
  });
};

const updateSkylogixAction = params => ({
  type: UPDATE_SKYLOGIX_SUCCESS,
  payload: {
    ...params
  }
});

export const skylogixValueChange = params => (dispatch) => {
  dispatch(updateSkylogixAction(params));
};

export const updateSkylogix = (params, permitDetailsChanged) => (dispatch) => {
  dispatch(updateSkylogixAction(params));
  return _updateSkylogix(params)
    .then(() => {
      dispatch(permitDetailsChanged());
    });
};

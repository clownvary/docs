import getDynamicUrl from 'shared/utils/getDynamicUrl';
import URL from '../urls';
import * as ActionTypes from '../consts/actionTypes';

export function fetchAttachments() {
  return (dispatch, getState) => {
    const { permitID } = getState().initialData;
    const url = getDynamicUrl(URL.fetchAttachments, {
      permitID
    });
    return dispatch({
      types: ['', ActionTypes.FETCH_ATTACHMENTS, ''],
      promise: API => API.get(url)
    });
  };
}

export function deleteAttachment(uploadedfileId) {
  return (dispatch, getState) => {
    const { permitID } = getState().initialData;
    const url = getDynamicUrl(URL.deleteAttachment, { permitID, uploadedfileId });

    return dispatch({
      types: ['', '', ''],
      promise: API => API.delete(url)
    });
  };
}

export function removeAttachedFile(id) {
  return {
    type: ActionTypes.DELETE_ATTACHMENT,
    payload: id
  };
}

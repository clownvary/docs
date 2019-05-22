import API from 'shared/api/API';
import { hideLoadingbar, showLoadingbar } from 'shared/actions/loadingBar';
import { changePermitStatusAsycAction } from 'shared/actions/cancelPermit';
import URL from '../urls';

const _API = new API();


/* istanbul ignore next */
export function completePermit({ permit_id } = {}) {
  const status = { status_type: 0,
    status_id: 7,
    status_text: 'Completed',
    permit_status_action: -1,
    stage_id: -1,
    transaction_stage_id: -1 };
  return dispatch => dispatch(changePermitStatusAsycAction(permit_id, status, true));
}

function _fetchPermitExtraInfo(id) {
  return _API.get(URL.permitExtraInfo, {
    body: {
      permit_id: id
    }
  });
}

function _fetchPermitStatusList(id) {
  return _API.get(URL.permitStatusList, {
    body: {
      permit_id: id
    }
  });
}

export function fetchPermitStatusInfo(id) {
  return (dispatch) => {
    dispatch(showLoadingbar());
    return _fetchPermitExtraInfo(id)
      .then(({ payload: { body } }) => {
        dispatch(hideLoadingbar());
        return body.extrainfo;
      });
  };
}

export function fetchPermitStatusList(id) {
  return (dispatch) => {
    dispatch(showLoadingbar());
    return _fetchPermitStatusList(id)
      .then(({ payload: { body } }) => {
        dispatch(hideLoadingbar());
        return body;
      });
  };
}

export function saveCreatedByMe(createdByMe) {
  return _API.post(URL.saveCreatedByMe, {
    body: {
      created_by_me: createdByMe
    }
  });
}

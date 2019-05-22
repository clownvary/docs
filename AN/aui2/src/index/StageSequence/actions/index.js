import getDynamicUrl from 'shared/utils/getDynamicUrl';
import URL from '../urls';
import {
  FETCH_PERMIT_STAGESEQUENCE_SUCCESS,
  GET_ONE_STAGESEQUENCE_SUCCESS,
  FETCH_COUNT_STAGESEQUENCE_SUCCESS,
  UPDATE_STAGESEQUENCE_SUCCESS,
  DELETE_STAGESEQUENCE_SUCCESS,
  LOAD_ADD_STAGESEQUENCES_SUCCESS,
  RESET_LOAD_ADD_STAGESEQUENCES,
  STAGE_SEQUENCES_CHANGE,
  UPDATE_COLLAPSE_EXTEND_ENUM,
  UPDATE_ONE_COLLAPSE_STATUS,
  CHANGE_STAGE_USER,
  FORMAT_STAGE_LIST,
  IS_CHANGE_USER
} from '../consts/actionTypes';

export const stageSequencesChangeAction = isChange => ({
  type: STAGE_SEQUENCES_CHANGE,
  payload: isChange
});

export function fetchCountStageSequenceAsyncAction() {
  return (dispatch, getState) => {
    const { permitID } = getState().initialData;
    const url = getDynamicUrl(URL.fetchCountStageSequences, { permitID });

    return dispatch({
      types: ['', FETCH_COUNT_STAGESEQUENCE_SUCCESS, ''],
      promise: API => API.get(url)
    });
  };
}

export const formatStageListAction = systemUserID => ({
  type: FORMAT_STAGE_LIST,
  payload: systemUserID
});

const fetchStageSequenceAsyncAction = (initialData) => {
  const { permitID, batchID, receiptID } = initialData;
  const url = getDynamicUrl(URL.permitStageSequence, { permitID });

  return {
    types: ['', FETCH_PERMIT_STAGESEQUENCE_SUCCESS, ''],
    promise: API => API.get(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID
      }
    })
  };
};

export function fetchStageSequence() {
  return (dispatch, getState) => {
    const { initialData } = getState();

    return dispatch(fetchStageSequenceAsyncAction(initialData)).then(() => {
      dispatch(formatStageListAction(initialData.systemUserID));
    });
  };
}

export function getOneStageSequenceAsyncAction(params) {
  const { stageSequenceID, permitID } = params;
  const url = getDynamicUrl(URL.getOneStageSequence, { permitID, stageSequenceID });

  return {
    types: ['', GET_ONE_STAGESEQUENCE_SUCCESS, ''],
    promise: API => API.get(url)
  };
}

const transactionStagesAsyncAction = (params) => {
  const { permitID, transactionStageID, stageSequenceID, statusText, stageAction } = params;
  const url = getDynamicUrl(URL.transactionStages, {
    permitID,
    stageSequenceID,
    transactionStageID
  });
  return {
    types: ['', '', ''],
    promise: API => API.put(url, {
      body: {
        stage_action: stageAction,
        status_text: statusText
      }
    })
  };
};

export const transactionStageseAsyncAction = params => (dispatch, getState) => {
  params.permitID = getState().initialData.permitID;
  const { systemUserID } = getState().initialData;

  return dispatch(transactionStagesAsyncAction(params))
    .then(() => {
      dispatch(fetchCountStageSequenceAsyncAction());

      dispatch(getOneStageSequenceAsyncAction(params)).then(() =>
        dispatch(formatStageListAction(systemUserID)));
    });
};

export function loadAddAbleStageSequences() {
  return (dispatch, getState) => {
    const { batchID, receiptID } = getState().initialData;
    return dispatch({
      types: ['', LOAD_ADD_STAGESEQUENCES_SUCCESS, ''],
      promise: API => API.get(URL.loadAddAbleStageSequences, {
        body: {
          batch_id: batchID,
          receipt_id: receiptID
        }
      })
    });
  };
}

export const resetLoadAddStageSequencesAction = () => ({
  type: RESET_LOAD_ADD_STAGESEQUENCES
});

export const updateCollapseExtendEnum = systemUserID => ({
  type: UPDATE_COLLAPSE_EXTEND_ENUM,
  payload: systemUserID
});

export const updateOneCollapseStatus = stageSequenceID => ({
  type: UPDATE_ONE_COLLAPSE_STATUS,
  payload: stageSequenceID
});

const updateAddStageSequence = ({ batchID, receiptID, stageSequenceID, checked }) => {
  const url = getDynamicUrl(URL.updateAddStageSequence, { stageSequenceID });
  return {
    types: ['', '', ''],
    promise: API => API.put(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        checked
      }
    })
  };
};

const updateStageSequenceAction = stageSequenceID => ({
  type: UPDATE_STAGESEQUENCE_SUCCESS,
  payload: stageSequenceID
});

export const updateStageSequenceAsyncAction = params => (dispatch, getState) => {
  params.receiptID = getState().initialData.receiptID;
  params.batchID = getState().initialData.batchID;

  return dispatch(updateAddStageSequence(params))
    .then(() => {
      dispatch(stageSequencesChangeAction(true));
      return dispatch(updateStageSequenceAction(params.stageSequenceID));
    });
};

const deleteStageSequence = ({ stageSequenceID, batchID, receiptID }) => {
  const url = getDynamicUrl(URL.deletePermitStageSequence, { stageSequenceID });
  return {
    types: ['', '', ''],
    promise: API => API.delete(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID
      }
    })
  };
};

const deleteStageSequenceAction = stageSequenceID => ({
  type: DELETE_STAGESEQUENCE_SUCCESS,
  payload: stageSequenceID
});

export const deleteStageSequenceAsyncAction = stageSequenceID => (dispatch, getState) => {
  const { batchID, receiptID } = getState().initialData;

  return dispatch(deleteStageSequence({ stageSequenceID, batchID, receiptID }))
    .then(() => {
      dispatch(stageSequencesChangeAction(true));
      dispatch(deleteStageSequenceAction(stageSequenceID));
    });
};

export function saveStageSequenceChangeAsyncAction() {
  return (dispatch, getState) => {
    const { batchID, receiptID } = getState().initialData;

    return dispatch({
      types: ['', '', ''],
      promise: API => API.post(URL.processModifyStageSequence, {
        body: {
          batch_id: batchID,
          receipt_id: receiptID
        }
      })
    });
  };
}

const changeStageUserAsyncAction = params => (dispatch, getState) => {
  const url = getDynamicUrl(URL.changeStageUser, params);
  const { batchID, receiptID } = getState().initialData;

  return dispatch({
    types: ['', '', ''],
    promise: API => API.put(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID
      }
    })
  });
};

export const isChangeUserAction = isChange => ({
  type: IS_CHANGE_USER,
  payload: isChange
});


export const changeStageUserAction = params => ({
  type: CHANGE_STAGE_USER,
  payload: params
});

export const changeStageUser = params => dispatch =>
  dispatch(changeStageUserAsyncAction(params))
    .then(() => {
      dispatch(stageSequencesChangeAction(true));
      dispatch(isChangeUserAction(true));
      dispatch(changeStageUserAction(params));
    });


import getDynamicUrl from 'shared/utils/getDynamicUrl';
import URL from '../urls';
import {
  FETCH_STAGESEQUENCE_SUCCESS,
  UPDATE_STAGESEQUENCE_SUCCESS
} from '../consts/actionTypes';

export function fetchStageSequences(batchID, receiptID, receiptEntryID) {
  return {
    types: ['', FETCH_STAGESEQUENCE_SUCCESS, ''],
    promise: API => API.get(URL.fetchStageSequences, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        receipt_entry_id: receiptEntryID
      }
    })
  };
}

const updateStageSequence = (params) => {
  const { receiptEntryID, batchID, receiptID, checked, stageSequenceID } = params;

  const url = getDynamicUrl(URL.updateStageSequence, { stageSequenceID });
  return {
    types: ['', '', ''],
    promise: API => API.put(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        receipt_entry_id: receiptEntryID,
        checked
      }
    })
  };
};

const updateStageSequenceAction = stageSequenceID => ({
  type: UPDATE_STAGESEQUENCE_SUCCESS,
  payload: stageSequenceID
});


export const updateStageSequenceAsyncAction = params => dispatch =>
  dispatch(updateStageSequence(params))
  .then(() => dispatch(updateStageSequenceAction(params.stageSequenceID)));

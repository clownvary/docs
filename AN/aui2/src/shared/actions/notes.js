import API from 'shared/api/API';
import { getCurrentInitState } from 'shared/utils/initStateHelper';
import URL from '../urls';

const _API = new API();

export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const DECORATE_NOTES = 'DECORATE_NOTES';

function getParams(obj = {}) {
  const {
    permitID,
    batchID,
    receiptID,
    receiptEntryID
  } = getCurrentInitState();

  return Object.assign(obj, {
    permit_id: permitID || 0,
    batch_id: batchID,
    receipt_id: receiptID,
    receipt_entry_id: receiptEntryID || 0
  });
}

export function fetchNotes() {
  const params = getParams();
  return {
    types: ['', FETCH_NOTES_SUCCESS, ''],
    promise: api => api.get(URL.notes, {
      body: {
        ...params
      }
    })
  };
}

function _saveNotes(obj) {
  const { permitID } = getCurrentInitState();
  const params = getParams(obj);
  const url = params.new_entry_id > 0 || params.event_id > 0 ? URL.modifyNotes : URL.saveNotes;

  if (permitID > 0 && params.new_entry_id) {
    params.receipt_entry_id = params.new_entry_id;
  }

  return _API.post(url, {
    body: {
      ...params
    }
  });
}

const updateNote = params => ({
  type: UPDATE_NOTE_SUCCESS,
  payload: {
    value: {
      eventIndex: params.event_index,
      noteText: params.note_text,
      noteType: params.note_type
    }
  }
});

export function saveNotes(obj, {
  setActionBarDisabled,
  permitDetailsChanged,
  showUpdated
  } = {}) {
  const { permitID } = getCurrentInitState();

  return dispatch => _saveNotes(obj)
    .then(() => {
      showUpdated && dispatch(showUpdated(obj.event_index));
      setActionBarDisabled && dispatch(setActionBarDisabled());
      permitDetailsChanged && dispatch(permitDetailsChanged());
      if (permitID > 0) {
        return dispatch(updateNote(obj));
      }
      return dispatch(fetchNotes());
    });
}

export function decorateNotes({ staffNote, customerNote, eventIndex, isExpand, showSection }) {
  return {
    type: DECORATE_NOTES,
    payload: {
      staffNote,
      customerNote,
      eventIndex,
      isExpand,
      showSection
    }
  };
}

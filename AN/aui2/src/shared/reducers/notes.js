import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import { STAFF_NOTE, CUSTOMER_NOTE } from 'shared/consts/noteTypes';
import { FETCH_NOTES_SUCCESS, UPDATE_NOTE_SUCCESS, DECORATE_NOTES } from '../actions/notes';

const initialState = fromJS({
  showSection: true,
  [STAFF_NOTE]: '',
  [CUSTOMER_NOTE]: '',
  allNotes: {}
});

const handlers = {
  [FETCH_NOTES_SUCCESS](state, { payload: { body: { note } } }) {
    return state.withMutations((s) => {
      s.set(STAFF_NOTE, note.staff_note);
      s.set(CUSTOMER_NOTE, note.customer_note);
    });
  },

  [DECORATE_NOTES](state, { payload: { staffNote, customerNote, eventIndex,
    isExpand, showSection } }) {
    const newNote = {
      [STAFF_NOTE]: staffNote,
      [CUSTOMER_NOTE]: customerNote,
      isExpand,
      showSection
    };
    return state.setIn(['allNotes', `event_${eventIndex}`], fromJS(newNote));
  },

  [UPDATE_NOTE_SUCCESS](state, { payload: { value } }) {
    const { eventIndex, noteText, noteType } = value;
    return state.updateIn(['allNotes', `event_${eventIndex}`], note =>
      note.set(noteType, noteText));
  }
};

export default reducerHandler(initialState, handlers);

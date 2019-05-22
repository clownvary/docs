import { fromJS, is } from 'immutable';
import { STAFF_NOTE, CUSTOMER_NOTE } from 'shared/consts/noteTypes';
import { FETCH_NOTES_SUCCESS, UPDATE_NOTE_SUCCESS, DECORATE_NOTES } from 'shared/actions/notes';
import reducers from 'shared/reducers/notes';

describe('shared/reducers/notes', () => {
  const getInitialState = () => fromJS({
    showSection: true,
    [STAFF_NOTE]: '',
    [CUSTOMER_NOTE]: '',
    allNotes: {}
  });

  const staffNote = 'staff note';
  const customerNote = 'customer note';

  const eventIndex = 1;

  it('Return the expected initial state', () => {
    const state = reducers(undefined, {});
    expect(is(getInitialState(), state)).toBe(true);
  });

  it('Should fetch notes success', () => {
    const action = {
      type: FETCH_NOTES_SUCCESS,
      payload: {
        body: {
          note: {
            staff_note: staffNote,
            customer_note: customerNote
          }
        }
      }
    };
    const state = reducers(getInitialState(), action);
    expect(state.get(STAFF_NOTE)).toBe(staffNote);
    expect(state.get(CUSTOMER_NOTE)).toBe(customerNote);
  });

  it('Should decorate notes success', () => {
    const action = {
      type: DECORATE_NOTES,
      payload: {
        staffNote,
        customerNote,
        eventIndex,
        isExpand: true,
        showSection: true
      }
    };
    const state = reducers(getInitialState(), action);
    const allNotes = state.get('allNotes').toJS();
    expect(typeof allNotes).toBe('object');
    const decoratedNote = allNotes[`event_${eventIndex}`];
    expect(decoratedNote[STAFF_NOTE]).toBe(staffNote);
    expect(decoratedNote[CUSTOMER_NOTE]).toBe(customerNote);
    expect(decoratedNote.isExpand).toBe(true);
    expect(decoratedNote.showSection).toBe(true);
  });

  it('Should update note success', () => {
    const newStaffNote = 'new staff note';
    const action = {
      type: UPDATE_NOTE_SUCCESS,
      payload: {
        value: {
          eventIndex,
          noteText: newStaffNote,
          noteType: STAFF_NOTE
        }
      }
    };
    const stateWithDecoratedNote = reducers(getInitialState(), {
      type: DECORATE_NOTES,
      payload: {
        staffNote,
        customerNote,
        eventIndex,
        isExpand: true,
        showSection: true
      }
    });
    const state = reducers(stateWithDecoratedNote, action);
    const allNotes = state.get('allNotes').toJS();
    expect(typeof allNotes).toBe('object');
    const decoratedNote = allNotes[`event_${eventIndex}`];
    expect(decoratedNote[STAFF_NOTE]).toBe(newStaffNote);
  });
});

import configureStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import middlewares from 'shared/api/middlewares';
import * as actions from 'shared/actions/notes';

const initialState = fromJS({
  showSection: true,
  [actions.STAFF_NOTE]: '',
  [actions.CUSTOMER_NOTE]: '',
  allNotes: {}
});
describe('shared/actions/notes', () => {
  let store;

  beforeEach(() => {
    const mockStore = configureStore(middlewares);
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchNotes method works fine', () => {
    const {
      fetchNotes,
      FETCH_NOTES_SUCCESS
    } = actions;

    return store.dispatch(fetchNotes()).then(({ payload: { body: { note } } }) => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions).toHaveLength(3);
      expect(storeActions.some(action => action.type === FETCH_NOTES_SUCCESS)).toBe(true);

      expect(note).toHaveProperty('staff_note');
      expect(note).toHaveProperty('customer_note');
    });
  });

  it('saveNotes method works fine with event id and new entry id', () => {
    const {
      saveNotes,
      FETCH_NOTES_SUCCESS
    } = actions;

    const note = {
      note_text: 'staff note...',
      note_type: actions.STAFF_NOTE,
      event_index: 1,
      new_entry_id: 2,
      event_id: 3
    };
    const setActionBarDisabled = jest.fn();
    const permitDetailsChanged = jest.fn();
    const showUpdated = jest.fn();

    return store.dispatch(saveNotes(note, {
      setActionBarDisabled, permitDetailsChanged, showUpdated
    })).then(() => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === FETCH_NOTES_SUCCESS)).toBe(true);

      expect(setActionBarDisabled).toHaveBeenCalledTimes(1);
      expect(permitDetailsChanged).toHaveBeenCalledTimes(1);
      expect(showUpdated).toHaveBeenCalledTimes(1);
    });
  });

  it('saveNotes method works fine with event id', () => {
    const {
      saveNotes,
      FETCH_NOTES_SUCCESS
    } = actions;

    const note = {
      note_text: 'staff note...',
      note_type: actions.STAFF_NOTE,
      event_index: 1,
      event_id: 3
    };

    const setActionBarDisabled = jest.fn();
    const permitDetailsChanged = jest.fn();
    const showUpdated = jest.fn();

    return store.dispatch(saveNotes(note, {
      setActionBarDisabled, permitDetailsChanged, showUpdated
    })).then(() => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === FETCH_NOTES_SUCCESS)).toBe(true);

      expect(setActionBarDisabled).toHaveBeenCalledTimes(1);
      expect(permitDetailsChanged).toHaveBeenCalledTimes(1);
      expect(showUpdated).toHaveBeenCalledTimes(1);
    });
  });

  it('saveNotes method works fine without event id and new entry id', () => {
    const {
      saveNotes,
      FETCH_NOTES_SUCCESS
    } = actions;

    const note = {
      note_text: 'staff note...',
      note_type: actions.STAFF_NOTE,
      event_index: 1
    };

    return store.dispatch(saveNotes(note)).then(() => {
      const storeActions = store.getActions();

      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.length).toBeGreaterThanOrEqual(2);
      expect(storeActions.some(action => action.type === FETCH_NOTES_SUCCESS)).toBe(true);
    });
  });

  it('saveNotes method works fine, permitID is 1', () => {
    const {
      saveNotes,
      UPDATE_NOTE_SUCCESS
    } = actions;

    const note = {
      note_text: 'staff note...',
      note_type: actions.STAFF_NOTE,
      event_index: 1
    };
    window.__permitDetail__.__initialState__.permitID = 1;

    return store.dispatch(saveNotes(note)).then(() => {
      const storeActions = store.getActions();

      expect(storeActions.some(action => action.type === UPDATE_NOTE_SUCCESS)).toBe(true);
    });
  });

  it('saveNotes method works fine, permitID and receiptEntryID are null', () => {
    const {
      saveNotes,
      FETCH_NOTES_SUCCESS
    } = actions;

    const note = {
      note_text: 'staff note...',
      note_type: actions.STAFF_NOTE,
      event_index: 1
    };
    window.__permitDetail__.__initialState__.permitID = null;
    window.__permitDetail__.__initialState__.receiptEntryID = null;

    return store.dispatch(saveNotes(note)).then(() => {
      const storeActions = store.getActions();

      expect(storeActions.some(action => action.type === FETCH_NOTES_SUCCESS)).toBe(true);
    });
  });


  it('decorateNotes method works fine', (done) => {
    const {
      decorateNotes,
      DECORATE_NOTES
    } = actions;
    const note = {
      staffNote: 'staff note...',
      customerNote: 'customer note...',
      eventIndex: 1,
      isExpand: true,
      showSection: true
    };
    store.dispatch(decorateNotes(note));
    const storeActions = store.getActions();
    expect(Array.isArray(storeActions)).toBeTruthy();
    const storeAction = storeActions[0];
    expect(storeAction.type).toBe(DECORATE_NOTES);
    expect(storeAction.payload).toEqual(note);
    done();
  });
});

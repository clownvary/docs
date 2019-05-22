import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import enrollFormReducer from 'index/modules/Daycare/EnrollForm/reducers/enrollForm';

describe('index/modules/Daycare/EnrollForm/reducers/enrollForm', () => {
  const initialState = fromJS({
    programName: '',
    error: {
      participant: { required: false, messages: [] },
      session: { required: false, messages: [] },
      pickup: { required: false, messages: [] },
      question: { required: false, messages: [] }
    },
    scheduleConflict: false
  });

  it('Should return the expected initial state', () => {
    expect(is(initialState, enrollFormReducer(undefined, {}))).toBeTruthy();
  });

  it('Should save enroll form error correctly', () => {
    const { FORM_ERROR_UI } = actionTypes;

    const returnState = enrollFormReducer(initialState, {
      type: FORM_ERROR_UI,
      payload: { section: 'participant', key: 'required', value: true }
    });
    expect(returnState.getIn(['error', 'participant', 'required'])).toBeTruthy();
  });

  it('Should clean related error correctly', () => {
    const { FORM_ERROR_UI, FORM_ERROR_CLEAN_UI } = actionTypes;
    const errorState = enrollFormReducer(initialState, {
      type: FORM_ERROR_UI,
      payload: { section: 'session', key: 'required', value: true }
    });

    const returnState = enrollFormReducer(errorState, {
      type: FORM_ERROR_CLEAN_UI,
      payload: { section: 'session' }
    });
    expect(returnState.getIn(['error', 'session', 'required'])).toBeFalsy();
  });

  it('Should save enroll form entry correctly', () => {
    const { FORM_ENTRY_UI } = actionTypes;
    const name = 'Enrollment #2019 Mar';

    const returnState = enrollFormReducer(initialState, {
      type: FORM_ENTRY_UI,
      payload: { name }
    });
    expect(returnState.get('programName')).toEqual(name);
  });

  it('update login edcustomer_id should correctly', () => {
    const { UPDATE_LOGINED_CUSTOMER_ID } = actionTypes;
    const loginedCustomerId = 'EAD2332';

    const returnState = enrollFormReducer(initialState, {
      type: UPDATE_LOGINED_CUSTOMER_ID,
      payload: { loginedCustomerId }
    });
    expect(returnState.get('loginedCustomerId')).toEqual(loginedCustomerId);
  });

  it('should set scheduleConflict correctly', () => {
    const { FORM_SCHEDULE_CONFLICT } = actionTypes;

    const returnState = enrollFormReducer(initialState, {
      type: FORM_SCHEDULE_CONFLICT,
      payload: true
    });
    expect(returnState.get('scheduleConflict')).toEqual(true);
  });
});

import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import { mockAPI } from 'react-base-ui/lib/common/restClient/mockAPI';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import {
  validateEnrollForm,
  cleanFormError,
  resetEnrollFormEntry,
  fetchEnrollFormEntryAsyncAction
} from 'index/modules/Daycare/EnrollForm/actions/enrollForm';
import weeklyEnrollmentEntry from 'Daycare/EnrollForm/enroll_form_weekly_entry.json';

describe('index/modules/Daycare/EnrollForm/actions/enrollForm', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

  const errorParticipants = fromJS({
    id: ''
  });

  const errorEnrollSession = fromJS({
    reservationUnit: 0,
    individualSelection: true,
    sessions: [{ session_id: 11 }, { session_id: 13 }],
    selectedSessionIds: [],
    sessionDates: [
      {
        dc_session_date_id: 3878,
        dc_session_id: 38,
        session_date: '2019 Feb 15'
      }
    ],
    sessionDatesSummary: [],
    selectedSessionDateIds: []
  });

  const errorEnrollDetail = fromJS({
    authorizedRequired: true,
    pickupList: [{ customer_id: 12861 }],
    selectedPickupIds: []
  });

  const errorSurvey = fromJS({
    questions: [{
      title: 'Customer Phone',
      question: 'Customer Phone',
      path: [0],
      customquestionIndex: '12',
      customquestionID: 423,
      useAnswerCode: false,
      answerType: 'userEntry',
      answerRequired: true,
      answerFormat: 'phoneNumber',
      answer: '',
      readOnly: false
    }]
  });

  const enrollForm = fromJS({
    error: {
      participant: { required: false, messages: [] },
      session: { required: false, messages: [] },
      pickup: { required: false, messages: [] },
      question: { required: false, messages: [] }
    }
  });

  const getMockStore = (participants, enrollSession, enrollDetail, survey) => mockStore({
    modules: {
      Daycare: {
        EnrollForm: {
          participants,
          enrollSession,
          enrollDetail,
          survey,
          receipt: fromJS({
            receiptNumber: 1
          }),
          enrollForm
        }
      }
    }
  });

  afterEach(() => {
    store.clearActions();
  });

  it('validateEnrollForm with each error sections works fine', () => {
    jest.useFakeTimers();
    const mockParticipantSection = document.createElement('div');
    mockParticipantSection.classList.add('participant-section');
    document.body.appendChild(mockParticipantSection);

    const { MULTIPLE_SECTIONS_EXPAND_UI, FORM_ERROR_UI } = actionTypes;
    store = getMockStore(errorParticipants, errorEnrollSession, errorEnrollDetail, errorSurvey);
    return store.dispatch(validateEnrollForm()).catch((result) => {
      expect(helper.isIncluding([{ type: MULTIPLE_SECTIONS_EXPAND_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: FORM_ERROR_UI }],
        store.getActions())).toBeTruthy();
      expect(result.isValidationError).toBeTruthy();

      jest.runTimersToTime(100);
    });
  });

  it('validateEnrollForm works fine if hasn\'t fetch session and detail data', (done) => {
    const { MULTIPLE_SECTIONS_EXPAND_UI, FORM_ERROR_UI } = actionTypes;
    const participants = fromJS({
      id: 18821
    });
    const enrollSession = fromJS({
      reservationUnit: 0,
      individualSelection: true,
      sessions: [],
      selectedSessionIds: [],
      sessionDates: [],
      sessionDatesSummary: [],
      selectedSessionDateIds: []
    });
    const enrollDetail = fromJS({
      authorizedRequired: true,
      pickupList: [],
      selectedPickupIds: []
    });
    const survey = fromJS({
      questions: []
    });
    store = getMockStore(participants, enrollSession, enrollDetail, survey);
    store.dispatch(validateEnrollForm());

    return store.dispatch(validateEnrollForm()).then(() => {
      expect(helper.isIncluding([{ type: MULTIPLE_SECTIONS_EXPAND_UI }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: FORM_ERROR_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('validateEnrollForm works fine if authorized pickup is not required', (done) => {
    const { MULTIPLE_SECTIONS_EXPAND_UI, FORM_ERROR_UI } = actionTypes;
    const participants = fromJS({
      id: 18821
    });
    const enrollSession = fromJS({
      reservationUnit: 0,
      individualSelection: true,
      sessions: [],
      selectedSessionIds: [],
      sessionDates: [],
      sessionDatesSummary: [],
      selectedSessionDateIds: []
    });
    const enrollDetail = fromJS({
      authorizedRequired: false,
      pickupList: [{ customer_id: 12861 }],
      selectedPickupIds: []
    });
    const survey = fromJS({
      questions: []
    });
    store = getMockStore(participants, enrollSession, enrollDetail, survey);
    store.dispatch(validateEnrollForm());

    return store.dispatch(validateEnrollForm()).then(() => {
      expect(helper.isIncluding([{ type: MULTIPLE_SECTIONS_EXPAND_UI }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: FORM_ERROR_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('validateEnrollForm without error sections works fine', (done) => {
    const { MULTIPLE_SECTIONS_EXPAND_UI, FORM_ERROR_UI } = actionTypes;
    const participants = fromJS({
      id: 18821
    });
    const enrollSession = fromJS({
      reservationUnit: 0,
      individualSelection: true,
      sessions: [{ session_id: 11 }, { session_id: 13 }],
      selectedSessionIds: [11],
      sessionDates: [{
        dc_session_date_id: 3878,
        dc_session_id: 38,
        session_date: '2019 Feb 15'
      }],
      sessionDatesSummary: [],
      selectedSessionDateIds: [3878]
    });
    const enrollDetail = fromJS({
      authorizedRequired: true,
      pickupList: [{ customer_id: 12861 }],
      selectedPickupIds: [12861]
    });
    const survey = fromJS({
      questions: [{
        title: 'Customer Phone',
        question: 'Customer Phone',
        path: [0],
        customquestionIndex: '12',
        customquestionID: 423,
        useAnswerCode: false,
        answerType: 'userEntry',
        answerRequired: true,
        answerFormat: 'phoneNumber',
        answer: '112-11392881',
        readOnly: false
      }]
    });
    store = getMockStore(participants, enrollSession, enrollDetail, survey);
    return store.dispatch(validateEnrollForm()).then(() => {
      expect(helper.isIncluding([{ type: MULTIPLE_SECTIONS_EXPAND_UI }],
        store.getActions())).toBeFalsy();
      expect(helper.isIncluding([{ type: FORM_ERROR_UI }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('cleanFormError works fine', (done) => {
    const { FORM_ERROR_CLEAN_UI } = actionTypes;
    store = getMockStore();
    store.dispatch(cleanFormError());
    expect(helper.isIncluding([{ type: FORM_ERROR_CLEAN_UI }],
      store.getActions())).toBeTruthy();
    done();
  });

  it('resetEnrollFormEntry work fine', (done) => {
    const { FEE_SUMMARY_UI_RESET, SECTION_COLLAPSE_UI_RESET } = actionTypes;

    store = getMockStore();
    store.dispatch(resetEnrollFormEntry());
    expect(helper.isIncluding([{ type: FEE_SUMMARY_UI_RESET }],
      store.getActions())).toBeTruthy();
    expect(helper.isIncluding([{ type: SECTION_COLLAPSE_UI_RESET }],
      store.getActions())).toBeTruthy();
    done();
  });

  it('fetchEnrollFormEntryAsyncAction work fine if reno is 0', (done) => {
    const {
      FORM_ENTRY_UI, FEE_SUMMARY_UI_RESET, SECTION_COLLAPSE_UI_RESET, UPDATE_LOGINED_CUSTOMER_ID
    } = actionTypes;

    store = getMockStore();
    store.dispatch(fetchEnrollFormEntryAsyncAction(54, 0)).then(() => {
      expect(helper.isIncluding([{ type: FORM_ENTRY_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: UPDATE_LOGINED_CUSTOMER_ID }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: FEE_SUMMARY_UI_RESET }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: SECTION_COLLAPSE_UI_RESET }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('fetchEnrollFormEntryAsyncAction work fine if it\'s no choice enrollment and reno is not 0', (done) => {
    const {
      FORM_ENTRY_UI, RECEIPT_NUMBER, PARTICIPANTS_UI, PARTICIPANT_UI,
      FEE_SUMMARY_UI, EXCEPTION_DATES_UI, UPDATE_SESSIONS_MESSAGE_CODE, UPDATE_SESSIONS_STATUS,
      PICKUP_UI_LIST
    } = actionTypes;

    store = getMockStore();
    store.dispatch(fetchEnrollFormEntryAsyncAction(54, 1)).then(() => {
      expect(helper.isIncluding([{ type: FORM_ENTRY_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: PARTICIPANTS_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: PARTICIPANT_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: EXCEPTION_DATES_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: UPDATE_SESSIONS_MESSAGE_CODE }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: UPDATE_SESSIONS_STATUS }],
        store.getActions())).toBeTruthy();
      expect(store.getActions()
        .filter(action => action.type === UPDATE_SESSIONS_STATUS)[0].payload.selectedSessionIds)
        .toEqual([46]);
      expect(helper.isIncluding([{ type: FEE_SUMMARY_UI }],
        store.getActions())).toBeTruthy();
      expect(helper.isIncluding([{ type: PICKUP_UI_LIST }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('fetchEnrollFormEntryAsyncAction work fine if it\'s weekly enrollment and reno is not 0', (done) => {
    const {
      FORM_ENTRY_UI, RECEIPT_NUMBER, PARTICIPANTS_UI, PARTICIPANT_UI,
      FEE_SUMMARY_UI, SESSIONS_DATE_UI_SELECTED, SESSIONS_DATE_UI_SUMMARY, PICKUP_UI_LIST
    } = actionTypes;

    return new Promise(() => {
      mockAPI([
        {
          path: '/test/json/Daycare/EnrollForm/enroll_form_entry.json',
          result: weeklyEnrollmentEntry
        }
      ], () => {
        store = getMockStore();
        store.dispatch(fetchEnrollFormEntryAsyncAction(54, 1)).then(() => {
          expect(helper.isIncluding([{ type: FORM_ENTRY_UI }],
            store.getActions())).toBeTruthy();
          expect(helper.isIncluding([{ type: PARTICIPANTS_UI }],
            store.getActions())).toBeTruthy();
          expect(helper.isIncluding([{ type: PARTICIPANT_UI }],
            store.getActions())).toBeTruthy();
          expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SELECTED }],
            store.getActions())).toBeTruthy();
          expect(helper.isIncluding([{ type: SESSIONS_DATE_UI_SUMMARY }],
            store.getActions())).toBeTruthy();
          expect(helper.isIncluding([{ type: FEE_SUMMARY_UI }],
            store.getActions())).toBeTruthy();
          expect(helper.isIncluding([{ type: RECEIPT_NUMBER }],
            store.getActions())).toBeTruthy();
          expect(helper.isIncluding([{ type: PICKUP_UI_LIST }],
            store.getActions())).toBeTruthy();
          done();
        });
      });
    });
  });

  it('fetchEnrollFormEntryAsyncAction work fine if it respones_code is 4091', done => new Promise(() => {
    mockAPI([
      {
        path: '/test/json/Daycare/EnrollForm/enroll_form_entry.json',
        result: {
          headers: {
            response_code: '4091',
            response_message: 'Invalid ReceiptEntry',
            page_info: {
              order_by: '',
              total_records_per_page: 30,
              total_records: 0,
              page_number: 1,
              total_page: 1,
              order_option: 'ASC'
            }
          },
          body: {}
        }
      }
    ], () => {
      store = getMockStore();
      store.dispatch(fetchEnrollFormEntryAsyncAction()).then((reslut) => {
        const { data: { response: { code } } } = reslut;
        expect(code).toEqual('4091');
        expect(store.getActions()[0]).toEqual({ payload: { args: ['/newcart'], method: 'push' }, type: '@@router/CALL_HISTORY_METHOD' });
        done();
      });
    });
  }));

  it('fetchEnrollFormEntryAsyncAction work fine if it has error and respones_code not 4091', done => new Promise(() => {
    mockAPI([
      {
        path: '/test/json/Daycare/EnrollForm/enroll_form_entry.json',
        result: {
          headers: {
            response_code: '4092',
            response_message: 'Invalid ReceiptEntry',
            page_info: {
              order_by: '',
              total_records_per_page: 30,
              total_records: 0,
              page_number: 1,
              total_page: 1,
              order_option: 'ASC'
            }
          },
          body: {}
        }
      }
    ], () => {
      store = getMockStore();
      store.dispatch(fetchEnrollFormEntryAsyncAction()).catch((reslut) => {
        const { data: { response: { code } } } = reslut;
        expect(code).toEqual('4092');
        done();
      });
    });
  }));
});

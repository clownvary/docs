import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import { fromJS } from 'immutable';

import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { helper } from 'shared/components/Survey';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import surveyAction from 'index/ReservationDetail/actions/survey';
import * as eventListAction from 'index/ReservationDetail/actions/eventList';

import jsonQuestion2 from 'json/ReservationDetail/questions2.json';
import jsonQuestion3 from 'json/ReservationDetail/questions3.json';
import jsonDeleteQuestion from 'json/ReservationDetail/deleteQuestion.json';
import jsonIsImpactOthersEventsFeeOrQuestion from 'json/ReservationDetail/isImpactOthersEventsFeeOrQuestion.json'

import mockAPI, { cleanMock } from 'utils/mockAPI';

const question2 = helper.generateQuestionPathAndParent(convertCasingPropObj(jsonQuestion2.body.questions));
const question3 = helper.generateQuestionPathAndParent(convertCasingPropObj(jsonQuestion3.body.questions));

const initialData = {
  permitLabel: '',
  permitNumber: '',
  viewPermitId: -1,
  permitID: '1111111',
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333'
};

describe('index -> ReservationDetail -> actions -> survey', () => {
  let store = null;

  const getStore = (overrideSurveyState) => {
    const mockStore = configureStore(middlewares);
    return mockStore({
      main: fromJS({
        isShowTotalBalanceDueDetail: false,
        isPermitDetailsChanged: true,
        errors: {
          waiverErrors: {}
        },
        confirmChangeError: {
          waiverErrors: {}
        }
      }),
      actionBar: fromJS({
        status: 0,
        disableActions: true
      }),
      eventDetail: fromJS({
        error: {},
        isShow: {
          event_1_1: false,
          event_2_0: true
        },
        isUpdated: {
          event_1_1: true,
          event_2_0: false
        },
        hasFetchedDetail: {
          event_1_1: true,
          event_2_0: true
        },
        allEventConfig: {
          event_1_1: {
            hideReservationCharges: false,
            hideNotesSection: false,
            hideChecklistItemsSection: false,
            hideCustomQuestionsSection: false
          },
          event_2_0: {
            hideReservationCharges: false,
            hideNotesSection: false,
            hideChecklistItemsSection: false,
            hideCustomQuestionsSection: false
          }
        },
        eventValidStatus: {
          event_1_1: false,
          event_2_0: false
        },
        eventList: [
          {
            resourceCount: 1,
            eventName: '2016 Annual\' Party',
            attendance: 200,
            hideChecklistItemsSection: true,
            hideCustomQuestionsSection: true,
            isEventUpdated: false,
            isBookingUpdated: true,
            newEntryID: 0,
            validated: true,
            eventID: 1,
            bookingCount: 3,
            permitID: 1,
            eventIndex: '1_1',
            totalAmount: 300
          },
          {
            resourceCount: 3,
            eventName: '2016 Technic Conference',
            attendance: 100,
            hideChecklistItemsSection: true,
            hideCustomQuestionsSection: true,
            isEventUpdated: true,
            isBookingUpdated: false,
            newEntryID: 0,
            validated: true,
            eventID: 2,
            bookingCount: 14,
            permitID: 1,
            eventIndex: '2_0',
            totalAmount: 230
          }
        ]
      }),
      survey: fromJS({
        '1_1': {
          ...{
            questions: question2,
            errors: [],
            showQuestion: true,
            hasRequiredQuestion: false
          },
          ...overrideSurveyState
        },
        '2_0': {
          ...{
            questions: question3,
            errors: [],
            showQuestion: true,
            hasRequiredQuestion: false
          },
          ...overrideSurveyState
        }
      }),
      initialData
    });
  };

  beforeEach(() => {
    store = getStore();
  });

  afterEach(() => {
    store.clearActions();
    cleanMock();
  });

  it('decorateQuestionAction should works fine', (done) => {
    const {
      decorateQuestionAction,
      SURVEY_UPDATE_ERRORS,
      SURVEY_UPDATE_QUESTIONS
    } = surveyAction;

    store.dispatch(decorateQuestionAction(question2, true, '1_1', {list: []}));

    const actions = store.getActions();
    expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
    done();
  });

  it('updateQuestionErrorsByCustomQuestionIndexAction should works fine', (done) => {
    const {
      updateQuestionErrorsByCustomQuestionIndexAction,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const questionErrors = [{
        error: 'this is a mock error',
        customquestionIndex: '88',
        eventIndex: '1_2'
      },
      {
        error: 'this is a mock error 2',
        customquestionIndex: '55',
        eventIndex: '1_2'
      },
      {
        error: 'this is a mock error 1',
        customquestionIndex: '19',
        eventIndex: '1_1'
      }
    ];

    store.dispatch(updateQuestionErrorsByCustomQuestionIndexAction(questionErrors));
    const actions = store.getActions();
    expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
    done();
  });

  it('updateQuestionErrorsByCustomQuestionIndexAction should works fine with empty question errors', (done) => {
    const {
      updateQuestionErrorsByCustomQuestionIndexAction,
      SURVEY_UPDATE_ERRORS,
      SURVEY_UPDATE_QUESTIONS
    } = surveyAction;

    const questionErrors = [];

    store.dispatch(updateQuestionErrorsByCustomQuestionIndexAction(questionErrors));
    const actions = store.getActions();
    expect(actions.length).toBe(0);
    done();
  });

  it('deleteQuestionAsyncAction should works fine when question path is invalid', (done) => {
    const {
      deleteQuestionAsyncAction
    } = surveyAction;

    const eventIndex = '1_1';
    const questionPath = [];
    const eventID = '1';
    const newEntryID = 1;
    const funcConfirm = () => Promise.resolve();

    store.dispatch(deleteQuestionAsyncAction({
        eventIndex,
        questionPath,
        eventID,
        newEntryID
      }, funcConfirm))
      .catch(error => {
        expect(error).toBe('cannot find specified question');
        done();
      });
  });

  it('deleteQuestionAsyncAction should works fine when confirmdialog is no', (done) => {
    const {
      deleteQuestionAsyncAction
    } = surveyAction;

    const eventIndex = '1_1';
    const questionPath = [0];
    const eventID = '1';
    const newEntryID = 1;
    const funcConfirm = () => Promise.reject();

    store.dispatch(deleteQuestionAsyncAction({
      eventIndex,
      questionPath,
      eventID,
      newEntryID
    }, funcConfirm)).catch(() => {

      done();
    });
  });

  it('deleteQuestionAsyncAction should works fine when confirmdialog is yes with feeupdate is true', (done) => {
    const {
      deleteQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const { FETCH_EVENT_DETAIL_SUCCESS } = eventListAction;

    const eventIndex = '1_1';
    const questionPath = [0];
    const eventID = '1';
    const newEntryID = 1;
    const funcConfirm = () => Promise.resolve();

    store.dispatch(deleteQuestionAsyncAction({
      eventIndex,
      questionPath,
      eventID,
      newEntryID
    }, funcConfirm)).then(() => {
      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_DELETE_QUESTION)).toBeTruthy();
      expect(actions.some(action => action.type === FETCH_EVENT_DETAIL_SUCCESS)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      done();
    });
  });

  it('deleteQuestionAsyncAction should works fine when success to delete with feeupdate is false in server side',
    (done) => {
      const {
        deleteQuestionAsyncAction,

        SURVEY_DELETE_QUESTION,
        SURVEY_UPDATE_QUESTIONS,
        SURVEY_UPDATE_ERRORS
      } = surveyAction;

      const { FETCH_EVENT_DETAIL_SUCCESS } = eventListAction;

      const eventIndex = '1_1';
      const questionPath = [0];
      const eventID = '1';
      const newEntryID = 1;
      const funcConfirm = () => Promise.resolve();

      const mockAPIData = cloneDeep(jsonDeleteQuestion);
      mockAPIData.body.fee_updated = false;

      mockAPI({
        path: '/json/ReservationDetail/deleteQuestion.json',
        result: mockAPIData
      });

      store.dispatch(deleteQuestionAsyncAction({
        eventIndex,
        questionPath,
        eventID,
        newEntryID
      }, funcConfirm)).then(() => {
        const actions = store.getActions();

        expect(actions.some(action => action.type === SURVEY_DELETE_QUESTION)).toBeTruthy();
        expect(actions.some(action => action.type === FETCH_EVENT_DETAIL_SUCCESS)).toBeFalsy();
        expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
        expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();

        done();
      });
    });

  it('deleteQuestionAsyncAction should works fine when fail to delete in server side', (done) => {
    const {
      deleteQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const { FETCH_EVENT_DETAIL_SUCCESS } = eventListAction;

    const eventIndex = '1_1';
    const questionPath = [0];
    const eventID = '1';
    const newEntryID = 1;
    const funcConfirm = () => Promise.resolve();

    mockAPI({
      path: '/json/ReservationDetail/deleteQuestion.json',
      result: {
        "headers": {
          "response_code": "9000",
          "response_message": '{"message": "this is a mock bussniss error", "customquestion_index": "99"}'
        },
        "body": {

        }
      }

    });

    store.dispatch(deleteQuestionAsyncAction({
      eventIndex,
      questionPath,
      eventID,
      newEntryID
    }, funcConfirm)).catch((error) => {

      const actions = store.getActions();
      expect(actions.some(action => action.type === SURVEY_DELETE_QUESTION)).toBeFalsy();
      expect(actions.some(action => action.type === FETCH_EVENT_DETAIL_SUCCESS)).toBeFalsy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeFalsy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();

      done();
    });
  });

  it('changeQuestionAsyncAction should works fine when question path is valid', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const params = {
      questionPath : [0],
      answer: '1859',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.resolve())).then(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(3);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(4);
      done();
    }).catch(ex => console.log(ex));
  });

  it('changeQuestionAsyncAction should works fine when confirm dialog return no', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const params = {
      questionPath : [0],
      answer: '1859',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.reject())).then(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(2);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(1);
      done();
    });
  });

  it('changeQuestionAsyncAction should works fine when question path is invalid', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const params = {
      questionPath : [],
      answer: '1859',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.resolve())).then(() => {

      const actions = store.getActions();
      expect(actions.length).toBe(0);

      done();
    });
  });

  it('changeQuestionAsyncAction should works fine when answer is null and question is required', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const params = {
      questionPath : [2],
      answer: '',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.resolve())).catch(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(1);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(1);
      done();
    });
  });

  it('changeQuestionAsyncAction should works fine when updatedFee = false and questionExist = true', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    const params = {
      questionPath : [2],
      answer: '1876',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    const mockAPIData = cloneDeep(jsonIsImpactOthersEventsFeeOrQuestion);
    mockAPIData.body.update_fee = false;
    mockAPIData.body.question_exist = true;

    mockAPI({
      path: '/json/ReservationDetail/isImpactOthersEventsFeeOrQuestion.json',
      result: mockAPIData

    });

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.resolve())).then(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(3);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(4);
      done();
    }).catch(error => console.log(error));
  });

  it('changeQuestionAsyncAction should works fine when updatedFee = true and questionExist = false', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION_CREATE,
      SURVEY_SAVE_QUESTION_UPDATE
    } = surveyAction;

    const params = {
      questionPath : [2],
      answer: '1876',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    const mockAPIData = cloneDeep(jsonIsImpactOthersEventsFeeOrQuestion);
    mockAPIData.body.update_fee = true;
    mockAPIData.body.question_exist = false;

    mockAPI({
      path: '/json/ReservationDetail/isImpactOthersEventsFeeOrQuestion.json',
      result: mockAPIData

    });

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.resolve())).then(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(3);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(4);
      expect(actions.some(action => action.type === SURVEY_SAVE_QUESTION_UPDATE)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_SAVE_QUESTION_UPDATE).length).toBe(1);
      done();
    }).catch(error => console.log(error));
  });

  it('changeQuestionAsyncAction should works fine when updatedFee = true and questionExist = true', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION_CREATE,
      SURVEY_SAVE_QUESTION_UPDATE
    } = surveyAction;

    const params = {
      questionPath : [2],
      answer: '1876',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    const mockAPIData = cloneDeep(jsonIsImpactOthersEventsFeeOrQuestion);
    mockAPIData.body.update_fee = true;
    mockAPIData.body.question_exist = true;

    mockAPI({
      path: '/json/ReservationDetail/isImpactOthersEventsFeeOrQuestion.json',
      result: mockAPIData

    });

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.resolve())).then(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(3);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(4);
      expect(actions.some(action => action.type === SURVEY_SAVE_QUESTION_UPDATE)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_SAVE_QUESTION_UPDATE).length).toBe(1);
      done();
    }).catch(error => console.log(error));
  });

  it('changeQuestionAsyncAction should works fine when updatedFee = false and questionExist = false', (done) => {
    const {
      changeQuestionAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION_CREATE,
      SURVEY_SAVE_QUESTION_UPDATE
    } = surveyAction;

    const params = {
      questionPath : [2],
      answer: '1876',
      eventID: '1',
      eventIndex: '1_1',
      newEntryID: '1'
    }

    const mockAPIData = cloneDeep(jsonIsImpactOthersEventsFeeOrQuestion);
    mockAPIData.body.update_fee = false;
    mockAPIData.body.question_exist = false;

    mockAPI({
      path: '/json/ReservationDetail/isImpactOthersEventsFeeOrQuestion.json',
      result: mockAPIData
    });

    store.dispatch(changeQuestionAsyncAction(params, () => Promise.resolve())).then(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(3);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(4);
      expect(actions.some(action => action.type === SURVEY_SAVE_QUESTION_UPDATE)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_SAVE_QUESTION_UPDATE).length).toBe(1);
      done();
    }).catch(error => console.log(error));
  });

  it('validateQuestionsAsyncAction should works fine when validation failed', (done) => {
    const {
      validateQuestionsAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION_CREATE,
      SURVEY_SAVE_QUESTION_UPDATE
    } = surveyAction;


    store.dispatch(validateQuestionsAsyncAction()).catch((error) => {
      expect(error).toEqual(new Error('validation failed.'));


      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(2);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(2);
      done();
    });
  });

  it('validateQuestionsAsyncAction should works fine when validation success', (done) => {
    const {
      validateQuestionsAsyncAction,

      SURVEY_DELETE_QUESTION,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION_CREATE,
      SURVEY_SAVE_QUESTION_UPDATE
    } = surveyAction;

    store = getStore({
      questions: [question2[0]]
    })

    store.dispatch(validateQuestionsAsyncAction()).then(() => {

      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_QUESTIONS).length).toBe(2);
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      expect(actions.filter(action => action.type === SURVEY_UPDATE_ERRORS).length).toBe(2);
      done();
    });
  });

  it('addQuestionAsyncAction action works fine', () => {
    const {
      addQuestionAsyncAction,
      SURVEY_ADD_QUESTION,
    } = surveyAction;

    const eventIndex = '1_1';

    const params = {
      batchID: '233',
      receiptID: '2432',
      permitEventId: '2353',
      permitId: '232'
    };
    store.dispatch(addQuestionAsyncAction(eventIndex, params)).then(() => {
      const storeActions = store.getActions();
      expect(Array.isArray(storeActions)).toBeTruthy();
      expect(storeActions.some(action => action.type === SURVEY_ADD_QUESTION)).toBe(true);
      expect(storeActions.some(action => action.payload.eventIndex === '1_1')).toBe(true);
    });
  });
});

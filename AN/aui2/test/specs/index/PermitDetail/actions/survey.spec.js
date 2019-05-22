import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import { fromJS } from 'immutable';

import configureStore from 'redux-mock-store';
import middlewares from 'shared/api/middlewares';
import { helper } from 'shared/components/Survey';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import surveyAction from 'index/PermitDetail/actions/survey';
import * as permitFeeAction from 'shared/actions/permitFee';

import jsonQuestion from 'json/PermitDetail/questions.json';
import jsonNewReseravtionFee from 'json/PermitDetail/newReservationFee.json';

import mockAPI from 'utils/mockAPI';

describe('index -> PermitDetail -> actions -> survey', () => {
  let store = null;

  const getStore = (overrideSurveyState, hideCustomQuestionsSection = false) => {
    const mockStore = configureStore(middlewares);
    return mockStore({
      survey: fromJS({
        ...{
          questions: helper.generateQuestionPathAndParent(convertCasingPropObj(jsonQuestion.body.questions)),
          errors: [],
          showQuestion: true,
          hasRequiredQuestion: false
        },
        ...overrideSurveyState
      }),
      initialData:{
        permitLabel: '',
        permitNumber: '',
        viewPermitId: -1,
        permitID: '1111111',
        batchID: '1111111',
        receiptID: '2222222',
        receiptEntryID: '3333333',
        hideCustomQuestionsSection
      }
    });
  };

  beforeEach(() => {
    store = getStore();
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchQuestionsAsyncAction should works fine without feeUpdated', (done) => {
    const {
      fetchQuestionsAsyncAction,
      SURVEY_FETCH_QUESTIONS,
      SURVEY_UPDATE_SHOWN
    } = surveyAction;

    store.dispatch(fetchQuestionsAsyncAction()).then(() => {
      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_SHOWN)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_FETCH_QUESTIONS)).toBeTruthy();
      setTimeout(() => {
        expect(actions.some(action => action.type === 'FETCH_STAGESEQUENCE_SUCCESS')).toBeTruthy()
        done();
      }, 2000)
    });

  });

  it('fetchQuestionsAsyncAction should works fine with feeUpdated', (done) => {
    const {
      fetchQuestionsAsyncAction,
      SURVEY_FETCH_QUESTIONS,
      SURVEY_UPDATE_SHOWN
    } = surveyAction;

    const { FETCH_PERMIT_FEE_SUCCESS } = permitFeeAction;

    const mockAPIData = cloneDeep(jsonNewReseravtionFee);
    mockAPIData.body.fee_updated = true;

    mockAPI({
      path: '/json/PermitDetail/questions.json',
      result: mockAPIData
    });

    store.dispatch(fetchQuestionsAsyncAction()).then(() => {
      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_SHOWN)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_FETCH_QUESTIONS)).toBeTruthy();
      setTimeout(() => {
        expect(actions.some(action => action.type === FETCH_PERMIT_FEE_SUCCESS)).toBeTruthy()
        done();
      }, 2000)
    });
  });

  it('changeQuestionAsyncAction should works fine in normal case', (done) => {
    const {
      changeQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION
    } = surveyAction;

    let params = {
      questionPath: [0],
      answer: '1598'
    }

    // when question path is valid
    store.dispatch(changeQuestionAsyncAction(params)).then(() => {
      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_SAVE_QUESTION)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      done();
    });
  });

  it('changeQuestionAsyncAction should works fine for input', (done) => {
    const {
      changeQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION
    } = surveyAction;

    let params = {
      questionPath: [14, 'questions', 4],
      answer: 'adfasdf'
    }

    // when question path is valid
    store.dispatch(changeQuestionAsyncAction(params)).then(() => {
      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_SAVE_QUESTION)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
      setTimeout(() => {
        expect(actions.some(action => action.type === 'FETCH_STAGESEQUENCE_SUCCESS')).toBeTruthy()
        done();
      }, 2000)
    });
  });

  it('changeQuestionAsyncAction should not change question if question path is invalid', (done) => {
    const {
      changeQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION
    } = surveyAction;

    // when question path is invalid
    const params = {
      questionPath: [],
      answer: '1'
    }
    store.dispatch(changeQuestionAsyncAction(params)).then(() => {
      const actions = store.getActions();

      expect(actions.length).toEqual(0);
      done();
    });
  });

  it('changeQuestionAsyncAction should not change question if answer is unchanged', (done) => {
    const {
      changeQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: '1599'
    }
    store.dispatch(changeQuestionAsyncAction(params)).then(() => {
      const actions = store.getActions();

      expect(actions.length).toEqual(0);
      done();
    });
  });

  it('changeQuestionAsyncAction should reject if answer is empty for required question', (done) => {
    const {
      changeQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: ''
    }
    store.dispatch(changeQuestionAsyncAction(params))
      .catch((error) => {
        expect(error).toContain('required');
        done()
      })
  });

  it('changeQuestionAsyncAction should reject if fail to save answer', (done) => {
    const {
      changeQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: '1598'
    }

    mockAPI({
      path: '/json/PermitDetail/saveQuestion.json',
      result: {
        "headers": {
          "response_code": "9000",
          "response_message": {
            "message": "this is a mock bussniss error",
            "customquestion_index": 1
          }
        },
        "body": {

        }
      }
    });

    store.dispatch(changeQuestionAsyncAction(params)) //.then(() => done())
      .catch((error) => {
        expect(error).toBeInstanceOf(Error);
        done()
      })
  });

  it('changeQuestionAsyncAction should work well when feeUpdate is true', (done) => {
    const {
      changeQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
      SURVEY_SAVE_QUESTION
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: '1598'
    }

    mockAPI({
      path: '/json/PermitDetail/saveQuestion.json',
      result: {
        "headers": {
          "response_code": "0000",
          "response_message": 'Successful'
        },
        "body": {
          "results": {
            "current_event_fee_updated": true
          }
        }
      }
    });

    store = getStore({
      questions: helper.generateQuestionPathAndParent(convertCasingPropObj([jsonQuestion.body.questions[0]]))
    })

    store.dispatch(changeQuestionAsyncAction(params))
      .then(() => {
        const actions = store.getActions();
        expect(actions.some(action => action.type === SURVEY_SAVE_QUESTION)).toBeTruthy();
        expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
        expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
        done();
      })
      .catch(error => console.log(error));
  });

  it('validateQuestionAsyncAction should work well', (done) => {
    const {
      validateQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: ''
    }
    store.dispatch(validateQuestionAsyncAction())
      .catch((error) => {
        expect(error).toEqual(new Error('validation failed.'));

        const actions = store.getActions();

        expect(actions.some(action => action.type === SURVEY_UPDATE_QUESTIONS)).toBeTruthy();
        expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();

        done()
      })
  });

  it('validateQuestionAsyncAction should work well with empty question', (done) => {
    const {
      validateQuestionAsyncAction,
      SURVEY_UPDATE_QUESTIONS,
      SURVEY_UPDATE_ERRORS,
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: ''
    }

    store = getStore({
      questions: []
    })

    store.dispatch(validateQuestionAsyncAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(0);
        done()
      })
  });

  it('showQuestionAction should work well', (done) => {
    const {
      showQuestionAction,
      SURVEY_UPDATE_SHOWN
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: ''
    }
    store.dispatch(showQuestionAction());
    const actions = store.getActions();
    expect(actions.some(action => action.type === SURVEY_UPDATE_SHOWN)).toBeTruthy();
    const action = find(actions, action => action.type === SURVEY_UPDATE_SHOWN);
    expect(action.payload.shown).toBeTruthy();
    done();

  });

  it('hideQuestionAction should work well', (done) => {
    const {
      hideQuestionAction,
      SURVEY_UPDATE_SHOWN
    } = surveyAction;

    // when question answer is not change
    const params = {
      questionPath: [0],
      answer: ''
    }
    store.dispatch(hideQuestionAction());
    const actions = store.getActions();
    expect(actions.some(action => action.type === SURVEY_UPDATE_SHOWN)).toBeTruthy();
    const action = find(actions, action => action.type === SURVEY_UPDATE_SHOWN);
    expect(action.payload.shown).toBeFalsy();
    done();
  });

  it('resetQuestionHeaderErrorsAction should work well', (done) => {
    const {
      resetQuestionHeaderErrorsAction,
      SURVEY_UPDATE_ERRORS
    } = surveyAction;

    // when question answer is not change
    store.dispatch(resetQuestionHeaderErrorsAction());
    const actions = store.getActions();
    expect(actions.some(action => action.type === SURVEY_UPDATE_ERRORS)).toBeTruthy();
    const action = find(actions, action => action.type === SURVEY_UPDATE_ERRORS);
    expect(action.payload.errors).toEqual([]);
    done();
  });


  it('fetchStageSequences should not be called when hideCustomQuestionsSection == true and no required question', (done) => {
    const {
      fetchQuestionsAsyncAction,
      SURVEY_FETCH_QUESTIONS,
      SURVEY_UPDATE_SHOWN
    } = surveyAction;

    const { FETCH_PERMIT_FEE_SUCCESS } = permitFeeAction;

    const mockAPIData = cloneDeep(jsonNewReseravtionFee);
    mockAPIData.body.fee_updated = true;
    mockAPIData.body.has_required_question = false;

    mockAPI({
      path: '/json/PermitDetail/questions.json',
      result: mockAPIData
    });

    store = getStore({
      questions: helper.generateQuestionPathAndParent(convertCasingPropObj([jsonQuestion.body.questions[0]]))
    }, true)

    store.dispatch(fetchQuestionsAsyncAction()).then(() => {
      const actions = store.getActions();

      expect(actions.some(action => action.type === SURVEY_UPDATE_SHOWN)).toBeTruthy();
      expect(actions.some(action => action.type === SURVEY_FETCH_QUESTIONS)).toBeTruthy();
      setTimeout(() => {
        expect(actions.some(action => action.type === FETCH_PERMIT_FEE_SUCCESS)).toBeTruthy();
        expect(actions.some(action => action.type === 'FETCH_STAGESEQUENCE_SUCCESS')).toBeFalsy();
        done();
      }, 2000)
    });
  });

});

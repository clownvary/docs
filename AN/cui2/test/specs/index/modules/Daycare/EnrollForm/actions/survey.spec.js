import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import helper from 'utils/testHelper';
import middlewares from 'utils/middlewares';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import {
  fetchQuestions,
  resetQuestion,
  updateQuestions,
  updateQuestionsErrors,
  getBusinessError,
  validateQuestionForm,
  changeQuestionAnswer
} from 'index/modules/Daycare/EnrollForm/actions/survey';
import { mockAPI } from 'react-base-ui/lib/common/restClient/mockAPI';

describe('index/modules/Daycare/EnrollForm/actions/survey', () => {
  let store = null;
  const mockStore = configureStore(middlewares);

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
    }, {
      title: 'Customer Gender',
      question: 'Customer Gender',
      path: [1],
      customquestionIndex: '13',
      customquestionID: 424,
      useAnswerCode: false,
      answerType: 'singleSelectionRadio',
      answerRequired: true,
      answerFormat: 'freeForm',
      answer: null,
      readOnly: false,
      answers: [{
        answer: 'Male',
        code: 0,
        selected: false,
        disabled: false,
        answer_id: 3882,
        sub_question: null
      }, {
        answer: 'Female',
        code: 1,
        selected: false,
        disabled: false,
        answer_id: 3883,
        sub_question: null
      }]
    }],
    errors: fromJS([
      { customquestionIndex: '12', message: 'Required' },
      { customquestionIndex: '13', message: 'Required' }
    ])
  });

  const niceSurvey = errorSurvey
    .setIn(['questions', 0, 'answer'], '233-7612337')
    .setIn(['questions', 1, 'answers', 0, 'selected'], true)
    .set('errors', fromJS([]));

  const getMockStore = survey => mockStore({
    modules: {
      Daycare: {
        EnrollForm: {
          survey,
          receipt: fromJS({
            receiptNumber: 1
          })
        }
      }
    }
  });

  afterEach(() => {
    store.clearActions();
  });

  it('fetchQuestions works fine', (done) => {
    const { QUESTION_LIST } = actionTypes;
    store = getMockStore();
    return store.dispatch(fetchQuestions()).then(() => {
      expect(helper.isIncluding([{ type: QUESTION_LIST }],
        store.getActions())).toBeTruthy();
      done();
    });
  });

  it('resetQuestion works fine', (done) => {
    const { QUESTION_RESET } = actionTypes;
    store = getMockStore();
    store.dispatch(resetQuestion());
    expect(helper.isIncluding([{ type: QUESTION_RESET }],
      store.getActions())).toBeTruthy();
    done();
  });

  it('updateQuestions works fine', (done) => {
    const { QUESTION_UI_UPDATE } = actionTypes;
    store = getMockStore();
    store.dispatch(updateQuestions([]));
    expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
      store.getActions())).toBeTruthy();
    done();
  });

  it('updateQuestionsErrors works fine', (done) => {
    const { QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore();
    store.dispatch(updateQuestionsErrors([]));
    expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
      store.getActions())).toBeTruthy();
    done();
  });

  it('getBusinessError works fine', () => {
    const emptyResult = getBusinessError({});
    expect(emptyResult).toEqual({});

    const result = getBusinessError({
      response_code: 9008,
      response_message: JSON.stringify({
        message: 'mock error response message',
        customquestion_index: 2
      })
    });
    expect(result.code).toEqual(9008);
    expect(result.message).toEqual('mock error response message');
    expect(result.id).toEqual(2);
  });

  it('validateQuestionForm works fine if meet error', () => {
    store = getMockStore(errorSurvey);
    const result = store.dispatch(validateQuestionForm());
    expect(result).toHaveLength(2);
  });

  it('validateQuestionForm works fine if no error', () => {
    store = getMockStore(niceSurvey);
    const result = store.dispatch(validateQuestionForm());
    expect(result).toEqual([]);
  });

  it('changeQuestionAnswer works fine if it\'s an input question', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(errorSurvey);
    return store.dispatch(changeQuestionAnswer({ questionPath: [0], answer: '791-8819332-191' }))
      .then(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        done();
      });
  });

  it('changeQuestionAnswer works fine if it is not an input question', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(errorSurvey);
    return store.dispatch(changeQuestionAnswer({ questionPath: [1], answer: [3882] }))
      .then(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        done();
      });
  });

  it('changeQuestionAnswer works fine if it is not an input question', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(errorSurvey);
    return store.dispatch(changeQuestionAnswer({ questionPath: [1], answer: 3882 }))
      .then(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        done();
      });
  });

  it('changeQuestionAnswer works fine if it is not an input question and answer is empty', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(niceSurvey);
    return store.dispatch(changeQuestionAnswer({ questionPath: [1], answer: '' }))
      .then(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        done();
      });
  });

  it('changeQuestionAnswer works fine if the new answer is not correct', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(niceSurvey);
    return store.dispatch(changeQuestionAnswer({ questionPath: [0], answer: '' }))
      .then(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        done();
      });
  });

  it('changeQuestionAnswer works fine if the new answer is the same as the old', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(errorSurvey);
    return store.dispatch(changeQuestionAnswer({ questionPath: [0], answer: '' }))
      .then(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeFalsy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeFalsy();
        done();
      });
  });

  it('changeQuestionAnswer works fine if response return validation error', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(niceSurvey);

    return new Promise((resolve) => {
      mockAPI([
        {
          path: '/test/json/Daycare/EnrollForm/set_question_answer.json',
          result: {
            headers: {
              response_code: '9008',
              response_message: '{"message":"response validation failed.","customquestion_index":"12"}'
            },
            body: {}
          }
        }
      ], () => store.dispatch(changeQuestionAnswer({ questionPath: [0], answer: '791-8819332-191' })).catch(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeFalsy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeTruthy();
        resolve();
        done();
      }));
    });
  });

  it('changeQuestionAnswer works fine if response return business error without code', (done) => {
    const { QUESTION_UI_UPDATE, QUESTION_ERROR_UI_UPDATE } = actionTypes;
    store = getMockStore(niceSurvey);

    return new Promise((resolve) => {
      mockAPI([
        {
          path: '/test/json/Daycare/EnrollForm/set_question_answer.json',
          result: {
            headers: {
              response_code: '',
              response_message: '{"message":"save failed."}'
            },
            body: {}
          }
        }
      ], () => store.dispatch(changeQuestionAnswer({ questionPath: [0], answer: '791-8819332-191' })).catch(() => {
        expect(helper.isIncluding([{ type: QUESTION_UI_UPDATE }],
          store.getActions())).toBeFalsy();
        expect(helper.isIncluding([{ type: QUESTION_ERROR_UI_UPDATE }],
          store.getActions())).toBeFalsy();
        resolve();
        done();
      }));
    });
  });


  it('fetchQuestions work fine if it respones_code is 4091', done => new Promise(() => {
    mockAPI([
      {
        path: '/test/json/Daycare/EnrollForm/get_questions.json',
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
      store.dispatch(fetchQuestions()).then((reslut) => {
        const { data: { response: { code } } } = reslut;
        expect(code).toEqual('4091');
        expect(store.getActions()[0]).toEqual({ payload: { args: ['/newcart'], method: 'push' }, type: '@@router/CALL_HISTORY_METHOD' });
        done();
      });
    });
  }));

  it('fetchQuestions work fine if it has error and respones_code not 4091', done => new Promise(() => {
    mockAPI([
      {
        path: '/test/json/Daycare/EnrollForm/get_questions.json',
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
      store.dispatch(fetchQuestions()).catch((reslut) => {
        const { data: { response: { code } } } = reslut;
        expect(code).toEqual('4092');
        done();
      });
    });
  }));

  it('changeQuestionAnswer fetchQuestions work fine if it respones_code is 4091', (done) => {
    store = getMockStore(niceSurvey);

    return new Promise((resolve) => {
      mockAPI([
        {
          path: '/test/json/Daycare/EnrollForm/set_question_answer.json',
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
      ], () => store.dispatch(changeQuestionAnswer({ questionPath: [0], answer: '791-8819332-191' })).then((reslut) => {
        const { data: { response: { code } } } = reslut;
        expect(code).toEqual('4091');
        expect(store.getActions()[0]).toEqual({ payload: { args: ['/newcart'], method: 'push' }, type: '@@router/CALL_HISTORY_METHOD' });
        done();
      }));
    });
  });
});

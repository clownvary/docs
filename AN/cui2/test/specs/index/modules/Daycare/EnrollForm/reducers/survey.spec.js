import { is, fromJS } from 'immutable';
import * as actionTypes from 'index/modules/Daycare/EnrollForm/consts/actionTypes';
import surveyReducer from 'index/modules/Daycare/EnrollForm/reducers/survey';

describe('index/modules/Daycare/EnrollForm/reducers/survey', () => {
  const initialState = fromJS({
    questions: [],
    hasRequiredQuestion: false,
    showQuestion: false,
    errors: []
  });

  it('Should return the expected initial state', () => {
    const { QUESTION_RESET, QUESTION_LIST } = actionTypes;
    expect(is(initialState, surveyReducer(undefined, {}))).toBeTruthy();
    expect(is(initialState, surveyReducer(initialState, {
      type: QUESTION_RESET
    }))).toBeTruthy();
    expect(is(initialState, surveyReducer(initialState, {
      type: QUESTION_LIST, payload: {}
    }))).toBeTruthy();
  });

  it('Should save questions correctly', () => {
    const { QUESTION_LIST } = actionTypes;
    const questionsInResponse = [{
      answer: 'alpha answer',
      answer_format: 'alphaOnly',
      answer_max_length: 100,
      answer_required: false,
      answer_type: 'userEntry',
      customquestion_id: 444,
      customquestion_index: '6',
      default_answer: 'alpha answer',
      hint: '',
      question: 'AlphaOnlyNotRequiredQ',
      read_only: false,
      title: 'AlphaOnlyNotRequiredQ',
      use_answer_code: false
    }];

    const returnState = surveyReducer(initialState, {
      type: QUESTION_LIST,
      payload: { questions: questionsInResponse }
    });
    const transformedQuestion = returnState.getIn(['questions', 0]);
    expect(transformedQuestion.get('title')).toEqual('AlphaOnlyNotRequiredQ');
    expect(transformedQuestion.get('answerType')).toEqual('userEntry');
    expect(transformedQuestion.get('answerFormat')).toEqual('alphaOnly');
  });

  it('Should update questions correctly', () => {
    const { QUESTION_UI_UPDATE } = actionTypes;

    const newQuestions = [{
      answer: 'alpha answer',
      answerFormat: 'alphaOnly',
      answerRequired: false,
      answerType: 'userEntry',
      customquestionID: 444,
      customquestionIndex: '6',
      defaultAnswer: 'alpha answer',
      hint: '',
      question: 'AlphaOnlyNotRequiredQ',
      readOnly: false,
      title: 'AlphaOnlyNotRequiredQ',
      useAnswerCode: false
    }];
    const returnState = surveyReducer(initialState, {
      type: QUESTION_UI_UPDATE,
      payload: { questions: newQuestions }
    });
    expect(is(returnState.get('questions'), fromJS(newQuestions))).toBeTruthy();
  });


  it('Should update question errors correctly', () => {
    const { QUESTION_ERROR_UI_UPDATE } = actionTypes;

    const errors = [
      { customquestionIndex: '13', message: 'Required' }
    ];
    const returnState = surveyReducer(initialState, {
      type: QUESTION_ERROR_UI_UPDATE,
      payload: { errors }
    });
    expect(is(returnState.get('errors'), fromJS(errors))).toBeTruthy();
  });
});

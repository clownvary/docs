import { fromJS } from 'immutable';

import {
  SURVEY_FETCH_QUESTIONS,
  SURVEY_UPDATE_QUESTIONS,
  SURVEY_SAVE_QUESTION,
  SURVEY_UPDATE_SHOWN,
  SURVEY_UPDATE_ERRORS,
} from 'index/PermitDetail/actions/survey';
import { helper } from 'shared/components/Survey';

import reducer from 'index/PermitDetail/reducers/survey';
import jsonQuestion from 'json/PermitDetail/questions.json'
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

const questions = jsonQuestion.body.questions;

const defaultState = fromJS({
  questions: helper.generateQuestionPathAndParent(convertCasingPropObj(
    questions)),
  hasRequiredQuestion: false,
  showQuestion: false,
  errors: []
});

describe('index/PermitDetail/reducers/survey.js', () => {
  it('SURVEY_FETCH_QUESTIONS should work well', () => {
    const payload = jsonQuestion;

    const state = reducer(undefined, {
      type: SURVEY_FETCH_QUESTIONS,
      payload
    });

    expect(state.get('questions').toJS().length).toEqual(jsonQuestion.body.questions.length);
    expect(state.get('questions').toJS()).toEqual(helper.generateQuestionPathAndParent(convertCasingPropObj(
      questions)));

    expect(state.get('hasRequiredQuestion')).toEqual(jsonQuestion.body.has_required_question);

  });

  it('SURVEY_UPDATE_QUESTIONS should work well', () => {
    const newQuestions = [defaultState.toJS().questions[0]];
    const state = reducer(defaultState, {
      type: SURVEY_UPDATE_QUESTIONS,
      payload: { questions : newQuestions}
    });

    expect(state.get('questions').toJS().length).toEqual(1);
    expect(state.get('questions').toJS()).toEqual(newQuestions);
  });

  it('SURVEY_UPDATE_SHOWN should work well', () => {
    let state = reducer(defaultState, {
      type: SURVEY_UPDATE_SHOWN,
      payload: { shown : true}
    });

    expect(state.get('showQuestion')).toBeTruthy();

    state = reducer(defaultState, {
      type: SURVEY_UPDATE_SHOWN,
      payload: { shown : false}
    });

    expect(state.get('showQuestion')).toBeFalsy();
  });

  it('SURVEY_UPDATE_ERRORS should work well', () => {
    let errors = [];
    let state = reducer(defaultState, {
      type: SURVEY_UPDATE_ERRORS,
      payload: { errors }
    });

    expect(state.toJS().errors).toEqual(errors);

    errors = [ { customquestionIndex: 1, message: 'this is a mock test' } ]
    state = reducer(defaultState, {
      type: SURVEY_UPDATE_ERRORS,
      payload: { errors }
    });

    expect(state.toJS().errors).toEqual(errors);
  });

});

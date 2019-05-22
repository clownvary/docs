import { fromJS } from 'immutable';

import {
  SURVEY_UPDATE_QUESTIONS,
  SURVEY_UPDATE_ERRORS,
  SURVEY_ADD_QUESTION
} from 'index/ReservationDetail/actions/survey';
import { helper } from 'shared/components/Survey';

import reducer from 'index/ReservationDetail/reducers/survey';
import jsonQuestion from 'json/ReservationDetail/questions2.json'
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

const questions = jsonQuestion.body.questions;
const eventIndex = '1_1';

const defaultState = fromJS({
  [eventIndex]: {
    questions: helper.generateQuestionPathAndParent(convertCasingPropObj(
      questions)),
    hasRequiredQuestion: false,
    addQuestionData: {
      list:[]
    },
    showQuestion: false,
    errors: []
  }
});

describe('index/ReservationDetail/reducers/survey.js', () => {
  it('SURVEY_UPDATE_QUESTIONS should work well', () => {
    const newQuestions = [defaultState.toJS()[eventIndex].questions[0]];
    const addQuestionData = {
      addableQuestionsLoaded: true,
      list: []
    }
    const state = reducer(defaultState, {
      type: SURVEY_UPDATE_QUESTIONS,
      payload: { questions: newQuestions, eventIndex, addQuestionData }
    });

    expect(state.getIn([eventIndex, 'questions']).toJS().length).toEqual(1);
    expect(state.getIn([eventIndex, 'questions']).toJS()).toEqual(newQuestions);
    expect(state.getIn([eventIndex, 'addQuestionData']).toJS()).toEqual(addQuestionData);

    reducer(defaultState, {
      type: SURVEY_UPDATE_QUESTIONS,
      payload: { questions: newQuestions, eventIndex, addQuestionData: { list: [], addableQuestionsLoaded: false } }
    });

    const secondState = reducer(defaultState, {
      type: SURVEY_UPDATE_QUESTIONS,
      payload: { questions: newQuestions, eventIndex }
    });
    expect(secondState.getIn([eventIndex, 'questions']).toJS().length).toEqual(1);
    expect(secondState.getIn([eventIndex, 'questions']).toJS()).toEqual(newQuestions);
  });

  it('SURVEY_ADD_QUESTION should work well', () => {
    const addQuestionList = [];
    let state = reducer(defaultState, {
      type: SURVEY_ADD_QUESTION,
      payload: { eventIndex, addQuestionList }
    });

    const questions = state.toJS()[eventIndex].questions;
    expect(questions).toEqual(questions);
  });



  it('SURVEY_UPDATE_ERRORS should work well', () => {
    let errors = [];
    let state = reducer(defaultState, {
      type: SURVEY_UPDATE_ERRORS,
      payload: { errors }
    });

    expect(state.toJS()[eventIndex].errors).toEqual(errors);

    errors = [{ customquestionIndex: 1, message: 'this is a mock test' }]
    state = reducer(defaultState, {
      type: SURVEY_UPDATE_ERRORS,
      payload: { errors, eventIndex }
    });

    expect(state.toJS()[eventIndex].errors).toEqual(errors);
  });

});

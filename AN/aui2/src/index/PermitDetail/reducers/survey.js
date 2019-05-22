import { fromJS } from 'immutable';
import reducerHandler from 'shared/utils/reducerHandler';
import helper from 'shared/components/Survey/helper';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

import {
  SURVEY_FETCH_QUESTIONS,
  SURVEY_UPDATE_QUESTIONS,
  SURVEY_UPDATE_SHOWN,
  SURVEY_UPDATE_ERRORS
} from '../actions/survey';

const initialState = fromJS({
  questions: [],
  hasRequiredQuestion: false,
  showQuestion: false,
  errors: []
});

const handlers = {
  [SURVEY_FETCH_QUESTIONS](state, { payload: { body } }) {
    const { questions, hasRequiredQuestion } = convertCasingPropObj(body);
    return state.withMutations((s) => {
      s.set('questions', fromJS(helper.generateQuestionPathAndParent(questions)));
      s.set('hasRequiredQuestion', hasRequiredQuestion);
    });
  },

  [SURVEY_UPDATE_QUESTIONS](state, { payload: { questions } }) {
    return state.set('questions', fromJS(questions));
  },

  [SURVEY_UPDATE_SHOWN](state, { payload: { shown } }) {
    return state.set('showQuestion', shown);
  },

  [SURVEY_UPDATE_ERRORS](state, { payload: { errors } }) {
    return state.set('errors', errors);
  }
};

export default reducerHandler(initialState, handlers);

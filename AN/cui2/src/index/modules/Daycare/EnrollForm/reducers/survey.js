import { fromJS } from 'immutable';
import reducerHandler from 'react-base-ui/lib/utils/reducerHandler';
import convertJson2CasingObject from 'shared/utils/convertJson2CasingObject';
import * as helper from '../components/EnrollDetailSection/Question/utils/helper';

import {
  QUESTION_LIST,
  QUESTION_RESET,
  QUESTION_UI_UPDATE,
  QUESTION_ERROR_UI_UPDATE
} from '../consts/actionTypes';

const initialState = fromJS({
  questions: [],
  hasRequiredQuestion: false,
  showQuestion: false,
  errors: []
});


const handlers = {
  [QUESTION_LIST](state, { payload: { questions } }) {
    if (questions) {
      const convertedQuestions = convertJson2CasingObject(questions);
      return state.set('questions', fromJS(helper.generateQuestionPathAndParent(convertedQuestions)));
    }
    return state;
  },

  [QUESTION_UI_UPDATE](state, { payload: { questions } }) {
    return state.set('questions', fromJS(questions));
  },

  [QUESTION_ERROR_UI_UPDATE](state, { payload: { errors } }) {
    return state.set('errors', fromJS(errors));
  },

  [QUESTION_RESET]() {
    return initialState;
  }
};

export default reducerHandler(initialState, handlers);

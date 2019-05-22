import { fromJS } from 'immutable';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import { helper } from 'shared/components/Survey';
import reducerHandler from 'shared/utils/reducerHandler';

import {
  SURVEY_UPDATE_QUESTIONS,
  SURVEY_UPDATE_ERRORS,
  SURVEY_ADD_QUESTION
} from '../actions/survey';

/*
 {
   [eventID]: {
     questions: [],
     hasRequiredQuestion: false,
     errors: []
   }
 }
 */
const initialState = fromJS({});
const handlers = {
  [SURVEY_UPDATE_QUESTIONS](state, {
    payload: { eventIndex, questions, hasRequiredQuestion, addQuestionData } }) {
    return state.withMutations((s) => {
      let eventQuestion = {};
      /* istanbul ignore else */
      if (s.has(eventIndex)) {
        eventQuestion = s.get(eventIndex).toJS();
        const { addQuestionData: addQuestions } = eventQuestion;
        /* istanbul ignore else */
        if (addQuestions) {
          const addQuestionLength = count(addQuestions.list);
          eventQuestion.addQuestionData.list = questions.slice(0, addQuestionLength);
        }
      } else {
        /* istanbul ignore next */
        eventQuestion = {
          hasRequiredQuestion: false,
          errors: [],
          questions: []
        };
      }
      eventQuestion.questions = questions;
      /* istanbul ignore next */
      if (hasRequiredQuestion !== undefined) {
        eventQuestion.hasRequiredQuestion = hasRequiredQuestion;
      }

      s.set(eventIndex, fromJS(eventQuestion));
      if (addQuestionData) {
        addQuestionData.list = helper.generateQuestionPathAndParent(addQuestionData.list);
        s.setIn([eventIndex, 'addQuestionData'], fromJS(addQuestionData));
        if (addQuestionData.addableQuestionsLoaded) {
          const newQuestions = helper.generateQuestionPathAndParent(
            addQuestionData.list.concat(questions)
          );
          s.setIn([eventIndex, 'questions'], fromJS(newQuestions));
        }
      }
    });
  },

  [SURVEY_ADD_QUESTION](state, { payload: { eventIndex, addQuestionList } }) {
    const oldQuestions = state.getIn([eventIndex, 'questions']).toJS();
    const newQuestions = helper.generateQuestionPathAndParent(
      addQuestionList.concat(oldQuestions)
    );

    return state.withMutations((s) => {
      s.setIn([eventIndex, 'questions'], fromJS(newQuestions));
      s.setIn([eventIndex, 'addQuestionData', 'addableQuestionsLoaded'], true);
      s.setIn([eventIndex, 'addQuestionData', 'list'], addQuestionList);
    });
  },

  [SURVEY_UPDATE_ERRORS](state, { payload: { eventIndex, errors } }) {
    return state.withMutations((s) => {
      /* istanbul ignore next */
      if (eventIndex === -1) {
        s.mapKeys((key) => {
          s.update(key, eventQuestion => eventQuestion.set('errors', errors));
        });
      } else if (s.has(eventIndex)) {
        s.update(eventIndex, eventQuestion => eventQuestion.set('errors', errors));
      } else {
        s.setIn([eventIndex, 'errors'], errors);
      }
    });
  }
};

export default reducerHandler(initialState, handlers);

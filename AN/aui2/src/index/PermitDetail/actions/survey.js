import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import { helper, APIQuestionType } from 'shared/components/Survey';
import { fetchPermitFee } from 'shared/actions/permitFee';
import { isSystemError } from 'shared/api/parseResponse';
import { deserializeJson } from 'shared/utils/func';
import { fetchStageSequences } from './stageSequences';

import URL from '../urls';

const SURVEY_FETCH_QUESTIONS = 'SURVEY_FETCH_QUESTIONS';
const SURVEY_UPDATE_QUESTIONS = 'SURVEY_UPDATE_QUESTIONS';
const SURVEY_SAVE_QUESTION = 'SURVEY_SAVE_QUESTION';
const SURVEY_UPDATE_SHOWN = 'SURVEY_UPDATE_SHOWN';
const SURVEY_UPDATE_ERRORS = 'SURVEY_UPDATE_ERRORS';

const getDefaultParams = (params, { receiptID, receiptEntryID }) =>
  ({
    receipt_id: receiptID,
    receipt_entry_id: receiptEntryID,
    ...params
  });

const getBusinessError = (header) => {
  const result = {};

  /* istanbul ignore next */
  if (header.response_code && !isSystemError(header.response_code)) {
    result.code = header.response_code;
    const messageObj = deserializeJson(header.response_message);

    result.message = messageObj.message;
    result.id = messageObj.customquestion_index;
  }
  return result;
};

const fetchQuestion = params => ({
  types: ['', SURVEY_FETCH_QUESTIONS, ''],
  promise: API => API.get(URL.fetchQuestionWhenCreating, {
    body: {
      ...params
    }
  })
});

const updateQuestions = newQuestions => ({
  type: SURVEY_UPDATE_QUESTIONS,
  payload: {
    questions: newQuestions
  }
});

const updateQuestionsShown = shown => ({
  type: SURVEY_UPDATE_SHOWN,
  payload: {
    shown
  }
});

const udpateQuestionsErrors = errors => ({
  type: SURVEY_UPDATE_ERRORS,
  payload: {
    errors
  }
});

const saveQuestion = params => ({
  types: ['', SURVEY_SAVE_QUESTION, ''],
  promise: API => API.put(URL.saveQuestionWhenCreating, {
    body: {
      ...params
    }
  }),
  meta: {
    ignoreBusinessErrors: true
  }
});

const showQuestionAction = () => dispatch => dispatch(updateQuestionsShown(true));

const hideQuestionAction = () => dispatch => dispatch(updateQuestionsShown(false));

const fetchQuestionsAsyncAction = () => (dispatch, getState) => {
  dispatch(hideQuestionAction());
  const initData = getState().initialData;
  return dispatch(fetchQuestion(getDefaultParams(null, initData)))
    .then(({ payload: { body: { fee_updated: feeUpdated,
             has_required_question: hasRequiredQuestion }
         } }) => {
      if (feeUpdated) {
        dispatch(fetchPermitFee());
      }

      dispatch(showQuestionAction());

      if (hasRequiredQuestion || !initData.hideCustomQuestionsSection) {
        const { batchID, receiptID, receiptEntryID } = initData;
        dispatch(fetchStageSequences(batchID, receiptID, receiptEntryID));
      }
    });
};

const resetQuestionHeaderErrorsAction = () => dispatch => dispatch(udpateQuestionsErrors([]));

const changeQuestionAsyncAction = ({
  questionPath,
  answer
}) => (dispatch, getState) => {
  const state = getState();
  const survey = state.survey.toJS();
  const initData = state.initialData;
  const question = helper.findQuestionByPath(survey.questions, questionPath);
  const oldAnswer = helper.getQuestionAnswer(question);

  /* istanbul ignore else */
  if (question && !isEqual(oldAnswer, answer)) {
    // validate question
    // clean the error firstly
    question.errorMsg = '';
    /* istanbul ignore next */
    survey.errors = survey.errors
      .filter(error => error.customquestionIndex !== question.customquestionIndex);

    const objErrorMsg = helper.validateQuestion(question, answer);
    if (objErrorMsg) {
      question.errorMsg = objErrorMsg.shortMessage;

      helper.setQuestionAnswer(question, answer);

      dispatch(updateQuestions(survey.questions));
      dispatch(udpateQuestionsErrors(survey.errors));

      return Promise.reject(objErrorMsg.message);
    }

    const params = getDefaultParams(null, initData);

    params.question_id = question.customquestionID;
    params.customquestion_index = question.customquestionIndex;
    params.parent_question_id = question.parentQuestionID;
    if (question.answerType === APIQuestionType.INPUT) {
      params.user_entry_answer = answer;
      params.answer_id = 0;
    } else {
      params.user_entry_answer = '';
      /* istanbul ignore next */
      params.answer_id = isArray(answer) ? answer.join(',') : `${answer}`;
    }

    return dispatch(saveQuestion(params)).then(
      ({
        payload: {
          body: {
            results: {
              current_event_fee_updated: feeUpdated
            }
          }
        }
      }) => {
        /* istanbul ignore else */
        if (feeUpdated) {
          dispatch(fetchPermitFee());
        }

        const newQuestions = helper.updateQuestionAnswerByPath(
          survey.questions, question.path, { answer, error: question.errorMsg });
        const affectedQuestions = helper.cleanSubQuestionAnswer(question, answer);
        survey.errors = survey.errors.filter(error => !affectedQuestions.some(affectedQuestion =>
          error.customquestionIndex === affectedQuestion.customquestionIndex));

        dispatch(updateQuestions(newQuestions));
        dispatch(udpateQuestionsErrors(survey.errors));
        const { batchID, receiptID, receiptEntryID } = initData;
        dispatch(fetchStageSequences(batchID, receiptID, receiptEntryID));
      },
      (rqError) => {
        const headers = rqError.payload.headers;
        const businessErrors = getBusinessError(headers);
        /* istanbul ignore else */
        if (businessErrors.code) {
          survey.errors.push({
            customquestionIndex: question.customquestionIndex,
            message: businessErrors.message
          });
          dispatch(udpateQuestionsErrors(survey.errors));
        }
        throw new Error(rqError);
      }
    );
  }

  return Promise.resolve();
};

/**
 * will validate all questions and return a promise
 */
const validateQuestionAsyncAction = () => (dispatch, getState) =>
  Promise.resolve().then(() => {
    const survey = getState().survey.toJS();

    const result = helper.validateQuestions(survey.questions);

    if (isArray(result) && result.length > 0) {
      // clean the error firstly
      survey.errors = [];
      result.forEach((err) => {
        // add the error summary
        survey.errors.push({
          customquestionIndex: err.question.customquestionIndex,
          message: err.objErrorMsg.message
        });

        // add the question error
        const question = helper.findQuestionByPath(survey.questions, err.question.path);
        question.errorMsg = err.objErrorMsg.shortMessage;
      });

      dispatch(updateQuestions(survey.questions));
      dispatch(udpateQuestionsErrors(survey.errors));

      throw new Error('validation failed.');
    }

    return Promise.resolve();
  });

export default {
  SURVEY_FETCH_QUESTIONS,
  SURVEY_UPDATE_QUESTIONS,
  SURVEY_SAVE_QUESTION,
  SURVEY_UPDATE_SHOWN,
  SURVEY_UPDATE_ERRORS,

  fetchQuestionsAsyncAction,
  changeQuestionAsyncAction,
  validateQuestionAsyncAction,
  showQuestionAction,
  hideQuestionAction,
  resetQuestionHeaderErrorsAction
};

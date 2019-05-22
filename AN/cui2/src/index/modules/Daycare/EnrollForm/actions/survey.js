import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import createFSA from 'react-base-ui/lib/utils/createFSA';
import { isValidationErrorFromApi } from 'shared/utils/apiError';
import locationHelp from 'shared/utils/locationHelp';
import API from '../api';
import {
  QUESTION_LIST,
  QUESTION_RESET,
  QUESTION_UI_UPDATE,
  QUESTION_ERROR_UI_UPDATE
} from '../consts/actionTypes';
import * as helper from '../components/EnrollDetailSection/Question/utils/helper';
import { APIQuestionType } from '../components/EnrollDetailSection/Question/consts';
import { isRedirectToNewCart, redirectToNewCart } from '../util/redirectToNewCartHelp';

export const uiQuestionListAction = createFSA(QUESTION_LIST);
const uiQuestionResetAction = createFSA(QUESTION_RESET);
const uiQuestionUpdateAction = createFSA(QUESTION_UI_UPDATE);
const uiQuestionErrorUpdateAction = createFSA(QUESTION_ERROR_UI_UPDATE);

export const fetchQuestions = reno => dispatch =>
  API.getQuestions({ reno })
    .then((response) => {
      const { body: { questions } } = response;
      dispatch(uiQuestionListAction({ questions }));
      return Promise.resolve(response);
    }).catch((errorResponse) => {
      if (isRedirectToNewCart(errorResponse)) {
        locationHelp.destroy();
        redirectToNewCart(dispatch);
        return Promise.resolve(errorResponse);
      }
      return Promise.reject(errorResponse);
    });

export const resetQuestion = () => dispatch => dispatch(uiQuestionResetAction());

export const updateQuestions = questions => dispatch =>
  dispatch(uiQuestionUpdateAction({ questions }));

export const updateQuestionsErrors = errors => dispatch =>
  dispatch(uiQuestionErrorUpdateAction({ errors }));

export const getBusinessError = (header) => {
  const result = {};
  if (header.response_code) {
    result.code = header.response_code;
    const messageObj = JSON.parse(header.response_message);

    result.message = messageObj.message;
    result.id = messageObj.customquestion_index;
  }
  return result;
};

export const changeQuestionAnswer = ({ questionPath, answer }) => (dispatch, getState) => {
  const survey = getState().modules.Daycare.EnrollForm.survey.toJS();
  const question = helper.findQuestionByPath(survey.questions, questionPath);
  const oldAnswer = helper.getQuestionAnswer(question);

  if (question && !isEqual(oldAnswer, answer)) {
    question.errorMsg = '';
    survey.errors = survey.errors
      .filter(error => error.customquestionIndex !== question.customquestionIndex);

    const objErrorMsg = helper.validateQuestion(question, answer);
    if (objErrorMsg) {
      question.errorMsg = objErrorMsg.shortMessage;

      helper.setQuestionAnswer(question, answer);

      dispatch(updateQuestions(survey.questions));
      dispatch(updateQuestionsErrors(survey.errors));
    }

    const reno = getState().modules.Daycare.EnrollForm.receipt.get('receiptNumber');
    const params = { reno };
    params.question_id = question.customquestionID;
    params.customquestion_index = question.customquestionIndex;
    params.parent_question_id = question.parentQuestionID;
    if (question.answerType === APIQuestionType.INPUT) {
      params.user_entry_answer = answer;
      params.answer_id = [];
    } else {
      params.user_entry_answer = '';
      if (isArray(answer)) {
        params.answer_id = answer.map(a => parseInt(a, 10));
      } else {
        params.answer_id = answer ? [parseInt(answer, 10)] : [];
      }
    }

    return API.setQuestionAnswer(params)
      .catch((error) => {
        if (isRedirectToNewCart(error)) {
          locationHelp.destroy();
          redirectToNewCart(dispatch);
          return Promise.resolve(error);
        }
        if (isValidationErrorFromApi(error)) {
          const { data: { response: { headers } } } = error;
          const businessErrors = getBusinessError(headers);
          if (businessErrors.code) {
            survey.errors.push({
              customquestionIndex: question.customquestionIndex,
              message: businessErrors.message
            });
            dispatch(updateQuestionsErrors(survey.errors));
          }
          return Promise.reject(new Error(businessErrors.message));
        }
        return Promise.reject(error);
      })
      .then((response) => {
        const newQuestions = helper.updateQuestionAnswerByPath(
          survey.questions, question.path, { answer, error: question.errorMsg });
        const affectedQuestions = helper.cleanSubQuestionAnswer(question, answer);
        survey.errors = survey.errors.filter(error => !affectedQuestions.some(affectedQuestion =>
          error.customquestionIndex === affectedQuestion.customquestionIndex));

        dispatch(updateQuestions(newQuestions));
        dispatch(updateQuestionsErrors(survey.errors));
        return Promise.resolve(response);
      });
  }
  return Promise.resolve();
};

export const validateQuestionForm = () => (dispatch, getState) => {
  const survey = getState().modules.Daycare.EnrollForm.survey.toJS();
  const result = helper.validateQuestions(survey.questions);
  if (result.length > 0) {
    survey.errors = [];
    result.forEach((err) => {
      survey.errors.push({
        customquestionIndex: err.question.customquestionIndex,
        message: err.objErrorMsg.message
      });

      const question = helper.findQuestionByPath(survey.questions, err.question.path);
      question.errorMsg = err.objErrorMsg.shortMessage;
    });

    dispatch(updateQuestions(survey.questions));
    dispatch(updateQuestionsErrors(survey.errors));
  }
  return result;
};

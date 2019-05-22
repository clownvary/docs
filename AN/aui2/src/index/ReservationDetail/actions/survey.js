import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import some from 'lodash/some';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import groupBy from 'lodash/groupBy';

import { isSystemError } from 'shared/api/parseResponse';
import { helper, APIQuestionType } from 'shared/components/Survey';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import URL from '../urls';
import { permitDetailsChanged } from './index';
import {
  updateEventSummary,
  restoreHasFetchedDetail,
  showUpdated,
  getEventDetail,
  updateFee
} from './eventList';
import { updateFeeSummary } from './feeSummary';

const SURVEY_UPDATE_ERRORS = 'SURVEY_UPDATE_ERRORS';
const SURVEY_UPDATE_QUESTIONS = 'SURVEY_UPDATE_QUESTIONS';
const SURVEY_DELETE_QUESTION = 'SURVEY_DELETE_QUESTION';
const SURVEY_ADD_QUESTION = 'SURVEY_ADD_QUESTION';
const HIDE_ADD_QUESTION_BUTTON = 'HIDE_ADD_QUESTION_BUTTON';

const SURVEY_SAVE_QUESTION_CREATE = 'SURVEY_SAVE_QUESTION_CREATE';
const SURVEY_SAVE_QUESTION_UPDATE = 'SURVEY_SAVE_QUESTION_UPDATE';

/* istanbul ignore next */
const getDefaultCreatingParmas = (params = {}, { receiptID, permitID }) => ({
  ...params,
  receipt_id: receiptID,
  permit_id: permitID
});

const getDefaultUpdatingParams = (params = {}, { receiptID, batchID, permitID }) => ({
  ...params,
  receipt_id: receiptID,
  batch_id: batchID,
  permit_id: permitID
});

const isUpdatingMode = eventID => eventID !== -1;

const getBusinessError = (header) => {
  const result = {};
  let messageObj;
  /* istanbul ignore else */
  if (header.response_code && !isSystemError(header.response_code)) {
    result.code = header.response_code;
    messageObj = JSON.parse(header.response_message);
    result.message = messageObj.message;
    result.id = messageObj.customquestion_index;
  }
  return result;
};

/* istanbul ignore next */
const saveQuestionWhenCreating = params => ({
  types: ['', SURVEY_SAVE_QUESTION_CREATE, ''],
  promise: API => API.put(URL.saveQuestionWhenCreating, {
    body: params
  }),
  meta: {
    ignoreBusinessErrors: true
  }
});

const saveQuestionWhenUpdating = params => ({
  types: ['', SURVEY_SAVE_QUESTION_UPDATE, ''],
  promise: API => API.put(URL.saveQuestionWhenUpdating, {
    body: params
  }),
  meta: {
    ignoreBusinessErrors: true
  }
});

const updateQuestions = (eventIndex, newQuestions, hasRequiredQuestion, addQuestionData) => ({
  type: SURVEY_UPDATE_QUESTIONS,
  payload: {
    questions: newQuestions,
    eventIndex,
    hasRequiredQuestion,
    addQuestionData
  }
});

/**
 * update question path and parent property after any question is deleted.
 * @param {string} eventIndex
 */
const updateQuestionPath = eventIndex => (dispatch, getState) => {
  const survey = getState().survey.toJS();
  /* istanbul ignore else */
  if (survey[eventIndex] && survey[eventIndex].questions) {
    const eventQuestions = helper.generateQuestionPathAndParent(survey[eventIndex].questions);
    dispatch(updateQuestions(eventIndex, eventQuestions));
  }
};

/**
 * update single question property (answer or error)
 * @param {string} eventIndex event index
 * @param {Array} questionPath question key
 * @param {object} newQuestion new question object
 */
const updateQuestion = (eventIndex, newQuestion) => (dispatch, getState) => {
  const survey = getState().survey.toJS();
  /* istanbul ignore else */
  if (survey[eventIndex] && survey[eventIndex].questions) {
    const eventQuestions = survey[eventIndex].questions;

    // get the reference of the specified question
    /* eslint-disable */
    let question = helper.findQuestionByPath(eventQuestions, newQuestion.path);
    question = merge(question, newQuestion);
    /* eslint-enable */
    dispatch(updateQuestions(eventIndex, eventQuestions));
  }
};

const udpateQuestionsErrors = (eventIndex, errors) => ({
  type: SURVEY_UPDATE_ERRORS,
  payload: {
    errors,
    eventIndex
  }
});

const deleteQuestion = params => ({
  types: ['', SURVEY_DELETE_QUESTION, ''],
  promise: API => API.put(URL.deleteQuestion, {
    body: {
      ...params
    }
  })
});

const isAnyQuestionAffected = ({
  eventID,
  newEntryID,
  apiQuestion,
  initData: { batchID, receiptID }
}) => ({
  types: ['', '', ''],
  promise: API => API.get(URL.isImpactOthersEventsFeeOrQuestion, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: newEntryID,
      permit_event_id: eventID,
      customquestion_index: apiQuestion.customquestionIndex,
      parent_question_id: apiQuestion.parentQuestionID,
      question_id: apiQuestion.customquestionID
    }
  })
});

const saveQuestion = (params, eventID) =>
  /* istanbul ignore next */
  dispatch => dispatch(isUpdatingMode(eventID) ?
    saveQuestionWhenUpdating(params) :
    saveQuestionWhenCreating(params));

const saveQuestionAsyncAction = ({
  questionPath,
  answer,
  eventID,
  eventIndex,
  newEntryID
}) => (dispatch, getState) => {
  const state = getState();
  const survey = state.survey.toJS();
  const initData = state.initialData;

  const eventQuestion = survey[eventIndex];

  const question = helper.findQuestionByPath(eventQuestion.questions, questionPath);

  /* istanbul ignore next */
  if (!question) {
    return Promise.reject();
  }

  const isUpdating = isUpdatingMode(eventID);

  /* istanbul ignore next */
  const params = isUpdating ?
    getDefaultUpdatingParams(null, initData) :
    getDefaultCreatingParmas(null, initData);

  params.question_id = question.customquestionID;
  params.customquestion_index = question.customquestionIndex;
  params.parent_question_id = question.parentQuestionID;

  /* istanbul ignore next */
  if (!isUpdating) {
    params.receipt_entry_id = newEntryID;
  } else {
    params.permit_event_id = eventID;
  }

  /* istanbul ignore next */
  if (question.answerType === APIQuestionType.INPUT) {
    params.user_entry_answer = answer;
    params.answer_id = 0;
  } else {
    params.user_entry_answer = '';
    params.answer_id = isArray(answer) ? answer.join(',') : `${answer}`;
  }

  return dispatch(saveQuestion(params, eventID)).then(
    ({ payload: { body: { results } } }) => {
      const {
        feeSummary,
        eventList,
        currentEventFeeUpdated
      } = convertCasingPropObj(results);

      const events = getState().eventDetail.get('eventList').toJS();
      dispatch(updateFeeSummary(feeSummary));

      /* istanbul ignore else */
      if (some(eventList, event => event.eventIndex !== eventIndex) &&
        some(events, event => event.eventIndex !== eventIndex)) {
        forEach(events, (event) => {
          if (eventIndex !== event.eventIndex) {
            dispatch(restoreHasFetchedDetail(event.eventIndex));
            // clear the error
            dispatch(udpateQuestionsErrors(event.eventIndex, []));
          }
        });
      }

      /* istanbul ignore else */
      if (currentEventFeeUpdated) {
        dispatch(getEventDetail({
          batchID: initData.batchID,
          receiptID: initData.receiptID,
          eventID,
          newEntryID
        })).then(({ payload: { body: eventDetailData } }) => {
          dispatch(updateFee(eventDetailData, eventIndex));
        });
      }

      forEach(eventList, (event) => {
        // update the fee summary of event title
        dispatch(updateEventSummary({ totalAmount: event.totalAmount }, event.eventIndex));
        // and sign the others event status as updated.
        /* istanbul ignore else */
        if (event.eventIndex !== -1) {
          dispatch(showUpdated(event.eventIndex));
        }
      });

      const newQuestions = helper.updateQuestionAnswerByPath(
        eventQuestion.questions, question.path, { answer, error: question.errorMsg });

      dispatch(updateQuestions(eventIndex, newQuestions));
      dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));
    },
    (rqError) => {
      /* istanbul ignore next */
      const headers = rqError.payload.headers;
      const businessErrors = getBusinessError(headers);
      if (businessErrors.code) {
        eventQuestion.errors.push({
          customquestionIndex: question.customquestionIndex,
          message: businessErrors.message
        });
        dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));
      }
      throw new Error(rqError);
    }
  );
};

/**
 * change question answer
 * @param {object} param0 the params of changed question
 * @param {function} funcConfirm call back function to open confirm dialog.
 */
const changeQuestionAsyncAction = ({
    questionPath,
    answer,
    eventID,
    eventIndex,
    newEntryID
  },
  funcConfirm
) => (dispatch, getState) => {
  const survey = getState().survey.toJS();
  const initData = getState().initialData;
  const eventQuestion = cloneDeep(survey[eventIndex]);
  const question = helper.findQuestionByPath(eventQuestion.questions, questionPath);
  const oldAnswer = helper.getQuestionAnswer(question);
  const oldQuestion = cloneDeep(question);

  if (question && !isEqual(oldAnswer, answer)) {
    dispatch(permitDetailsChanged());
    // validate question
    // clean the error firstly
    question.errorMsg = '';
    /* istanbul ignore next */
    eventQuestion.errors = eventQuestion.errors
      .filter(error => error.customquestionIndex !== question.customquestionIndex);

    const objErrorMsg = helper.validateQuestion(question, answer);
    helper.setQuestionAnswer(question, answer);
    if (objErrorMsg) {
      question.errorMsg = objErrorMsg.shortMessage;

      dispatch(updateQuestion(eventIndex, question));
      dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));

      return Promise.reject(objErrorMsg.message);
    }

    return dispatch(isAnyQuestionAffected({
      eventID,
      newEntryID,
      apiQuestion: question,
      initData
    })).then(({
      payload: {
        body: {
          question_exist: questionExist,
          update_fee: updatedFee,
          feeupdated_event_list: feeUpdatedEventList,
          questionupdated_event_list: questionUpdatedEventList
        }
      }
    }) => {
      dispatch(updateQuestion(eventIndex, question));
      dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));
      if (!questionExist && !updatedFee) {
        return dispatch(saveQuestionAsyncAction({
          questionPath,
          answer,
          eventID,
          eventIndex,
          newEntryID
        })).then(() => {
          const affectedQuestions = helper.cleanSubQuestionAnswer(question, answer);
          eventQuestion.errors = eventQuestion.errors
            .filter(error => !affectedQuestions.some(affectedQuestion =>
              error.customquestionIndex === affectedQuestion.customquestionIndex));
          dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));
          dispatch(updateQuestion(eventIndex, question));
        });
      }

      /* istanbul ignore else */
      if (isFunction(funcConfirm)) {
        return funcConfirm(
            questionExist,
            updatedFee,
            feeUpdatedEventList,
            questionUpdatedEventList
          ).then(() =>
            dispatch(saveQuestionAsyncAction({
              questionPath,
              answer,
              eventID,
              eventIndex,
              newEntryID
            })).then(() => {
              const affectedQuestions = helper.cleanSubQuestionAnswer(question, answer);
              eventQuestion.errors = eventQuestion.errors
                .filter(error => !affectedQuestions.some(affectedQuestion =>
                  error.customquestionIndex === affectedQuestion.customquestionIndex));
              dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));
              dispatch(updateQuestion(eventIndex, question));
            })
          )
          .catch(() => {
            dispatch(updateQuestion(eventIndex, oldQuestion));
          });
      }

      /* istanbul ignore next */
      return Promise.reject();
    });
  }

  return Promise.resolve();
};

const updateQuestionErrorsByCustomQuestionIndexAction = questionErrors =>
  (dispatch, getState) => {
    if (isArray(questionErrors) && questionErrors.length > 0) {
      const groups = groupBy(questionErrors, 'eventIndex');
      const survey = getState().survey.toJS();
      Object.keys(groups).forEach((eventIndex) => {
        const eventQuestion = survey[eventIndex] || { errors: [] };
        const eventQuestionErrors = groups[eventIndex];

        eventQuestion.errors = merge(eventQuestion.errors, eventQuestionErrors.map(objErr => ({
          message: objErr.error,
          customquestionIndex: objErr.customquestionIndex
        })));

        dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));

        // todo update error message to corresponding question.
      });
    }
  };

const decorateQuestionAction = (
  questions,
  hasRequiredQuestion,
  eventIndex,
  addQuestionData
) => dispatch => dispatch(updateQuestions(
      eventIndex,
      helper.generateQuestionPathAndParent(questions),
      hasRequiredQuestion,
      addQuestionData
    ));

const deleteQuestionAsyncAction = ({ questionPath, eventIndex, eventID, newEntryID },
    funcConfirm) =>
  (dispatch, getState) => {
    const survey = getState().survey.toJS();
    const initData = getState().initialData;
    const eventSurvey = survey[eventIndex];
    const question = helper.findQuestionByPath(eventSurvey.questions, questionPath);
    if (question) {
      return funcConfirm().then(() => {
        const isUpdating = isUpdatingMode(eventID);
        /* istanbul ignore next */
        const params = isUpdating ?
          getDefaultUpdatingParams(null, initData) :
          getDefaultCreatingParmas(null, initData);
        params.question_id = question.customquestionID;
        params.batch_id = initData.batchID;
        params.permit_event_id = eventID;

        return dispatch(deleteQuestion(params)).then(({
          payload: {
            body: { fee_updated: feeUpdated }
          }
        }) => {
          let promise = Promise.resolve();

          if (feeUpdated) {
            promise = dispatch(getEventDetail({
              batchID: initData.batchID,
              receiptID: initData.receiptID,
              eventID,
              newEntryID
            })).then(({ payload: { body } }) => {
              dispatch(updateFee(body, eventIndex));
            });
          }

          return promise.then(() => {
            dispatch(permitDetailsChanged());
            dispatch(showUpdated(eventIndex));

            // get all shown questions within the top question
            const deletedQuestions = helper.getShownQuestions([question]);

            /*  delete the question in local */
            const newQuestions = helper.deleteQuestionByIndex(eventSurvey.questions,
              question.customquestionIndex);

            // remove the top error associated with this question and sub questions.
            /* istanbul ignore next */
            eventSurvey.errors = eventSurvey.errors
              .filter(error =>
                !deletedQuestions.some(q => q.customquestionIndex === error.customquestionIndex));

            dispatch(updateQuestions(eventIndex, newQuestions));
            dispatch(udpateQuestionsErrors(eventIndex, eventSurvey.errors));
            dispatch(updateQuestionPath(eventIndex));

            return Promise.resolve();
          });
        }, (rqError) => {
          const headers = rqError.payload.headers;
          const businessErrors = getBusinessError(headers);
          /* istanbul ignore else */
          if (businessErrors.code) {
            eventSurvey.errors.push({
              customquestionIndex: question.customquestionIndex,
              message: businessErrors.message
            });
            dispatch(udpateQuestionsErrors(eventIndex, eventSurvey.errors));
          }
          throw new Error(rqError);
        });
      });
    }

    return Promise.reject('cannot find specified question');
  };

const validateQuestionsAsyncAction = () => (dispatch, getState) =>
  Promise.resolve().then(() => {
    const survey = getState().survey.toJS();
    let isFailed = false;

    Object.keys(survey).forEach((eventIndex) => {
      const eventQuestion = survey[eventIndex];
      const result = helper.validateQuestions(eventQuestion.questions);

      // clean the error firstly
      eventQuestion.errors = [];
      if (isArray(result) && result.length > 0) {
        result.forEach((err) => {
          // add the error summary
          eventQuestion.errors.push({
            customquestionIndex: err.question.customquestionIndex,
            message: err.objErrorMsg.message
          });

          // add the question error
          const question = helper.findQuestionByPath(eventQuestion.questions, err.question.path);
          question.errorMsg = err.objErrorMsg.shortMessage;
        });
        isFailed = true;
      }

      dispatch(updateQuestions(eventIndex, eventQuestion.questions));
      dispatch(udpateQuestionsErrors(eventIndex, eventQuestion.errors));
    });

    if (isFailed) {
      throw new Error('validation failed.');
    }

    return Promise.resolve();
  });


const _loadAddableQuestions = ({ batchID, receiptID, permitEventId, permitId }) => ({
  types: ['', '', ''],
  promise: API => API.post(URL.loadAddableQuestions, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID,
      permit_event_id: permitEventId,
      permit_id: permitId
    }
  })
});

const addQuestionAction = data => ({
  type: SURVEY_ADD_QUESTION,
  payload: data
});

const addQuestionAsyncAction = (eventIndex, params) => dispatch =>
  dispatch(_loadAddableQuestions(params)).then(({ payload: { body } }) => {
    const result = convertCasingPropObj(body);
    const addQuestionList = result.eventDetail.addableQuestions.list;
    dispatch(permitDetailsChanged());
    dispatch(showUpdated(eventIndex));
    dispatch(addQuestionAction({
      eventIndex,
      addQuestionList
    }));

    /* istanbul ignore else */
    if (result.eventDetail.currentEventFeeUpdated) {
      dispatch(updateFeeSummary(result.eventDetail.feeSummary));
      dispatch(getEventDetail({
        batchID: params.batchID,
        receiptID: params.receiptID,
        eventID: params.permitEventId,
        newEntryID: params.newEntryID
      })).then(({ payload: { body: eventDetailData } }) => {
        dispatch(updateFee(eventDetailData, eventIndex));
      });
    }
  });

export default {
  SURVEY_UPDATE_ERRORS,
  SURVEY_UPDATE_QUESTIONS,
  SURVEY_DELETE_QUESTION,
  SURVEY_ADD_QUESTION,
  HIDE_ADD_QUESTION_BUTTON,
  SURVEY_SAVE_QUESTION_CREATE,
  SURVEY_SAVE_QUESTION_UPDATE,

  decorateQuestionAction,
  updateQuestionErrorsByCustomQuestionIndexAction,
  deleteQuestionAsyncAction,
  changeQuestionAsyncAction,
  addQuestionAsyncAction,
  validateQuestionsAsyncAction
};

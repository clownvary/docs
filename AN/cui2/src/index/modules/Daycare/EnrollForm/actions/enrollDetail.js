import createFSA from 'react-base-ui/lib/utils/createFSA';
import API from '../api';

import { expandSection, collapseSection } from './collapse';
import { fetchQuestions, resetQuestion } from './survey';
import { cleanFormError } from './enrollForm';

import {
  PICKUP_UI_LIST,
  PICKUP_UI_SELECTED,
  DETAIL_UI_RESET
} from '../consts/actionTypes';
import { ENROLL_DETAIL } from '../consts/sectionName';

export const uiPickupListAction = createFSA(PICKUP_UI_LIST);
const uiPickupSelectAction = createFSA(PICKUP_UI_SELECTED);
const uiResetDetailAction = createFSA(DETAIL_UI_RESET);

export const fetchPickups = (programId, participantId) => dispatch =>
  API.getPickups({ programId, participantId })
    .then((response) => {
      const { body: { program_pickups: pickupData } } = response;
      dispatch(uiPickupListAction({ pickupData }));
      return Promise.resolve(response);
    });

export const selectPickups = pickupIds => (dispatch) => {
  dispatch(cleanFormError('pickup'));
  return dispatch(uiPickupSelectAction({ pickupIds }));
};

export const fetchDetailDataIfNeed = (programId, participantId) => (dispatch, getState) => {
  const enrollFormState = getState().modules.Daycare.EnrollForm;
  const pickups = enrollFormState.enrollDetail.get('pickupList');
  const questions = enrollFormState.survey.get('questions');
  const fetched = pickups.count() > 0 || questions.count() > 0;
  if (!fetched) {
    const reno = enrollFormState.receipt.get('receiptNumber');
    const promiseQueue = [];
    promiseQueue.push(dispatch(fetchPickups(programId, participantId)));
    promiseQueue.push(dispatch(fetchQuestions(reno)));
    return Promise.all(promiseQueue).then(() => {
      dispatch(cleanFormError('pickup'));
      dispatch(cleanFormError('question'));
      dispatch(expandSection(ENROLL_DETAIL));
    });
  }
  return Promise.resolve();
};

export const resetDetailData = () => (dispatch) => {
  dispatch(uiResetDetailAction());
  dispatch(resetQuestion());
  const disableDetailSection = true;
  return dispatch(collapseSection(ENROLL_DETAIL, disableDetailSection));
};


import createFSA from 'react-base-ui/lib/utils/createFSA';
import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import API from '../api';

import { fetchEnrollSessions, fetchExceptionDatesAsyncAction } from './enrollSession';
import { collapseSection } from './collapse';
import { resetDetailData } from './enrollDetail';
import { uiFormErrorAction, cleanFormError } from './enrollForm';
import { resetFeeSummary } from './feeSummary';

import {
  PARTICIPANT_UI,
  PARTICIPANTS_UI,
  RECEIPT_NUMBER
} from '../consts/actionTypes';
import { SESSIONS } from '../consts/sectionName';

export const uiParticipants = createFSA(PARTICIPANTS_UI);
export const uiParticipant = createFSA(PARTICIPANT_UI);
const receiptNumber = createFSA(RECEIPT_NUMBER);

export const fetchParticipants = programId => dispatch =>
  API.getParticipants({ programId })
    .then((response) => {
      const { body: { participants } } = response;
      dispatch(uiParticipants({ participants }));
      return Promise.resolve(response);
    });

export const selectParticipant = (programId, participantId, reno = 0) => dispatch =>
  API.setParticipant({
    programId,
    participantId,
    reno
  }).then((response) => {
    const { body: { reno: newReceiptNumber } } = response;
    dispatch(uiParticipant({ participantId }));
    dispatch(receiptNumber({ receiptNumber: newReceiptNumber }));
    dispatch(fetchEnrollSessions(programId, participantId))
      .then(() => dispatch(fetchExceptionDatesAsyncAction(programId, newReceiptNumber)));
    dispatch(resetFeeSummary());
    dispatch(cleanFormError('participant'));
    dispatch(cleanFormError('session'));
    dispatch(resetDetailData());
    return Promise.resolve(response);
  }).catch((errorResponse) => {
    if (ErrorObj.isErrorObj(errorResponse) && errorResponse.type === ErrorType.SERVICE) {
      const { data: { response: { body: { errors } } } } = errorResponse;
      dispatch(uiParticipant({ participantId }));
      dispatch(cleanFormError('participant'));
      dispatch(uiFormErrorAction({ section: 'participant', key: 'messages', value: errors }));
      dispatch(resetFeeSummary());
      dispatch(collapseSection(SESSIONS, true));
      dispatch(resetDetailData());
      return Promise.resolve(errorResponse);
    }
    return Promise.reject(errorResponse);
  });


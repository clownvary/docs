import find from 'lodash/find';
import createFSA from 'react-base-ui/lib/utils/createFSA';
import { count } from 'react-base-ui/lib/utils/dataAccess';
import { confirm } from 'react-base-ui/lib/services/dialog';
import { ErrorObj, ErrorType } from 'react-base-ui/lib/common/error';
import Message from 'react-base-ui/lib/common/message';
import { push } from 'index/actions/router';
import API from '../api';
import { expandSection } from './collapse';
import { fetchDetailDataIfNeed } from './enrollDetail';
import { cleanFormError } from './enrollForm';
import { fetchFeeSummary } from './feeSummary';

import {
  SESSIONS_UI_LIST,
  RECEIPT_NUMBER,
  SESSIONS_DATE_UI_SELECTED,
  SESSIONS_DATE_UI_SUMMARY,
  EXCEPTION_DATES_UI,
  UPDATE_SESSIONS_MESSAGE_CODE,
  UPDATE_SESSIONS_STATUS,
  FORM_SCHEDULE_CONFLICT
} from '../consts/actionTypes';
import { SESSIONS } from '../consts/sectionName';

import * as reservationUnit from '../consts/reservationUnit';

export const uiSessionListAction = createFSA(SESSIONS_UI_LIST);
export const uiSelectSessionDatesAction = createFSA(SESSIONS_DATE_UI_SELECTED);
export const uiSessionDatesSummaryAction = createFSA(SESSIONS_DATE_UI_SUMMARY);
export const receiptNumberAction = createFSA(RECEIPT_NUMBER);
export const uiExceptionDatesAction = createFSA(EXCEPTION_DATES_UI);
export const updateSessionsMessageCode = createFSA(UPDATE_SESSIONS_MESSAGE_CODE);
export const updateSessionsState = createFSA(UPDATE_SESSIONS_STATUS);
export const uiScheduleConflictAction = createFSA(FORM_SCHEDULE_CONFLICT);


export const fetchEnrollSessions = (programId, customerId) => dispatch =>
  API.getSessions({ programId, customerId })
    .then((response) => {
      const { body: { program_sessions_result: sessionResult } } = response;
      dispatch(uiSessionListAction({ sessionResult }));
      dispatch(expandSection(SESSIONS));
      return Promise.resolve(response);
    });

const checkAllSessionIsUnavailable = sessionList =>
  count(sessionList) === count(sessionList.filter(item => !item.is_enable));

const getSelectedSessionIds = (ids, sessionList) => ids.filter((id) => {
  const session = find(sessionList, { session_id: id });
  return session.is_enable;
});

export const selectEnrollSession = ({ ids, programId, reno, messages }) =>
  (dispatch, getState) => {
    const { confirmMsg, notesMsg } = messages;
    const enrollFormState = getState().modules.Daycare.EnrollForm;
    const enrollSessionState = enrollFormState.enrollSession;
    const ru = enrollSessionState.get('reservationUnit');
    const idsParam = {};
    switch (ru) {
      case reservationUnit.NO_CHOICE:
        idsParam.session_ids = ids;
        break;
      case reservationUnit.WEEKLY:
        idsParam.dc_session_date_ids = ids;
        break;
      default:
        break;
    }

    return API.setSessions({
      body: {
        reno,
        reservation_unit: ru,
        ...idsParam
      }
    }).then((response) => {
      const { body: { selected_session_validation: result } } = response;
      const { reno: receiptNumber, is_schedule_conflict: scheduleConflict } = result;
      dispatch(receiptNumberAction({ receiptNumber }));
      dispatch(uiScheduleConflictAction(scheduleConflict));
      const individualSelection = enrollSessionState.get('individualSelection');
      const unavailableSessionIds = result.unavailable_session_ids;
      const sessionsList = result.sessions_status || [];

      switch (ru) {
        case reservationUnit.NO_CHOICE:
          if (checkAllSessionIsUnavailable(sessionsList)) {
            return confirm(
            confirmMsg.programFullyAlertMsg, {
              title: confirmMsg.title,
              confirmText: confirmMsg.ok
            }
            ).then(() => { dispatch(push(`daycare/program/${programId}`)); });
          }

          if (individualSelection && count(unavailableSessionIds)) {
            return confirm(
              confirmMsg.programChangedAlertMsg, {
                title: confirmMsg.title,
                confirmText: confirmMsg.ok
              }
            ).then(
              () => dispatch(updateSessionsState({
                sessionsList,
                selectedSessionIds: getSelectedSessionIds(ids, sessionsList)
              }))
            );
          }

          dispatch(updateSessionsMessageCode(result.sessions_message_code));
          dispatch(updateSessionsState({
            sessionsList,
            selectedSessionIds: getSelectedSessionIds(ids, sessionsList)
          }));
          break;
        case reservationUnit.WEEKLY:
          dispatch(uiSelectSessionDatesAction({ sessionDateIds: ids }));
          dispatch(uiSessionDatesSummaryAction({
            sessionDatesSummary: result.selected_session_date_summary }
          ));
          break;
        default:
          break;
      }

      dispatch(cleanFormError('session'));
      return dispatch(fetchFeeSummary(receiptNumber)).then(() => {
        const participantId = enrollFormState.participants.get('id');
        return dispatch(fetchDetailDataIfNeed(programId, participantId, receiptNumber));
      });
    }).catch((errorResponse) => {
      if (ErrorObj.isErrorObj(errorResponse) && errorResponse.type === ErrorType.SERVICE) {
        const { data: { response: { code } } } = errorResponse;
        if (code === '4095') {
          errorResponse.message = new Message(
            errorResponse.message.type,
            [notesMsg.detail],
            notesMsg.title
          );
          return Promise.reject(errorResponse);
        }
      }
      return Promise.reject(errorResponse);
    });
  };

export const fetchExceptionDatesAsyncAction = (programId, reno) => dispatch =>
  API.getExceptionExtraDates({ programId, reno }).then((response) => {
    const { body: { program_exceptionandextradates: dates } } = response;
    dispatch(uiExceptionDatesAction({ dates }));
    return Promise.resolve(response);
  });

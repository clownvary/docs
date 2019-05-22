import createFSA from 'react-base-ui/lib/utils/createFSA';
import locationHelp from 'shared/utils/locationHelp';
import API from '../api';
import { expandMultipleSections, resetCollapseSections } from './collapse';
import { uiParticipants, uiParticipant } from './participants';
import {
  uiSessionListAction,
  uiSelectSessionDatesAction,
  uiSessionDatesSummaryAction,
  uiExceptionDatesAction,
  updateSessionsState,
  updateSessionsMessageCode,
  receiptNumberAction
} from './enrollSession';
import { uiFeeSummaryAction, resetFeeSummary } from './feeSummary';
import { uiPickupListAction } from './enrollDetail';
import { validateQuestionForm, uiQuestionListAction } from './survey';
import {
  FORM_ERROR_UI,
  FORM_ERROR_CLEAN_UI,
  FORM_ENTRY_UI,
  UPDATE_LOGINED_CUSTOMER_ID
} from '../consts/actionTypes';
import { ENROLL_DETAIL, PARTICIPANT, SESSIONS } from '../consts/sectionName';
import * as RU from '../consts/reservationUnit';
import scrollToSection from '../util/scrollTo';
import { isRedirectToNewCart, redirectToNewCart } from '../util/redirectToNewCartHelp';

const uiEnrollFormEntryAction = createFSA(FORM_ENTRY_UI);
export const uiFormErrorAction = createFSA(FORM_ERROR_UI);
const uiCleanFormErrorAction = createFSA(FORM_ERROR_CLEAN_UI);
const updateLoginedCustomerIdAction = createFSA(UPDATE_LOGINED_CUSTOMER_ID);

export const resetEnrollFormEntry = () => (dispatch) => {
  const participantId = null;
  dispatch(uiParticipant({ participantId }));
  dispatch(resetFeeSummary());
  return dispatch(resetCollapseSections());
};

export const fetchEnrollFormEntryAsyncAction = (programId, reno) => dispatch =>
  API.getEnrollFormEntry({ programId, reno }).then((response) => {
    const { body: { program_userentry: entry } } = response;
    dispatch(uiEnrollFormEntryAction({ name: entry.program_name }));
    dispatch(updateLoginedCustomerIdAction({ loginedCustomerId: entry.logined_customer_id }));

    if (reno) {
      dispatch(receiptNumberAction({ receiptNumber: reno }));
      dispatch(uiParticipants({ participants: entry.participants }));
      const participantId = entry.select_participant_id;
      dispatch(uiParticipant({ participantId }));
      dispatch(uiSessionListAction({
        sessionResult: {
          reservation_unit: entry.reservation_unit,
          allow_individual_selection: entry.allow_individual_selection,
          program_sessions: entry.program_sessions,
          dc_enroll_dates: entry.dc_enroll_dates
        }
      }));
    } else {
      dispatch(resetEnrollFormEntry());
    }
    return entry;
  }).then((entry) => {
    if (reno) {
      switch (entry.reservation_unit) {
        case RU.NO_CHOICE: {
          dispatch(uiExceptionDatesAction({ dates: entry.program_exceptionandextradates }));
          dispatch(updateSessionsMessageCode(entry.sessions_message_code));
          const sessionsList = entry.sessions_status;
          const selectedSessionIds = entry.sessions_status
            .filter(session => session.is_check && session.is_enable)
            .map(session => session.session_id);
          dispatch(updateSessionsState({ sessionsList, selectedSessionIds }));
          break;
        }
        case RU.WEEKLY: {
          const sessionDatesSummary = entry.selected_session_date_summary;
          const sessionDateIds = sessionDatesSummary.reduce((acc, cur) =>
            acc.concat(cur.dc_session_date_ids), []);
          dispatch(uiSelectSessionDatesAction({ sessionDateIds }));
          dispatch(uiSessionDatesSummaryAction({ sessionDatesSummary }));
          break;
        }
        default:
          break;
      }
      dispatch(uiPickupListAction({ pickupData: entry.program_pickups }));
      dispatch(uiQuestionListAction({ questions: entry.questions }));
      dispatch(uiFeeSummaryAction({ feeSummary: entry.fee_summary }));
      dispatch(expandMultipleSections([ENROLL_DETAIL, PARTICIPANT, SESSIONS]));
    }
    return Promise.resolve(entry);
  }).catch((errorResponse) => {
    if (isRedirectToNewCart(errorResponse)) {
      redirectToNewCart(dispatch);
      return Promise.resolve(errorResponse);
    }
    return Promise.reject(errorResponse);
  });

export const validateEnrollForm = () => (dispatch, getState) => {
  const errorSections = [];

  const enrollFormState = getState().modules.Daycare.EnrollForm;

  const participantId = enrollFormState.participants.get('id');
  const participantRequiredError = !participantId;
  const participantMessages = enrollFormState.enrollForm.getIn(['error', 'participant', 'messages']);
  const participantServerErrors = participantMessages && participantMessages.count();
  (participantRequiredError || participantServerErrors) && errorSections.push(PARTICIPANT);
  dispatch(uiFormErrorAction({
    section: 'participant',
    key: 'required',
    value: participantRequiredError
  }));

  const enrollSessionState = enrollFormState.enrollSession;
  let sessionRequiredError = false;
  if (enrollSessionState.get('sessions').count()) {
    const selectedSessionCount = enrollSessionState.get('selectedSessionIds').count();
    sessionRequiredError = selectedSessionCount === 0;
    sessionRequiredError && errorSections.push(SESSIONS);
    dispatch(uiFormErrorAction({
      section: 'session',
      key: 'required',
      value: sessionRequiredError
    }));
  }

  if (enrollSessionState.get('sessionDates').count()) {
    const selectedDatesCount = enrollSessionState.get('selectedSessionDateIds').count();
    sessionRequiredError = selectedDatesCount === 0;
    sessionRequiredError && errorSections.push(SESSIONS);
    dispatch(uiFormErrorAction({
      section: 'session',
      key: 'required',
      value: sessionRequiredError
    }));
  }

  const enrollDetailState = enrollFormState.enrollDetail;
  let pickupRequiredError = false;
  let questionValidationError = false;
  if (enrollDetailState.get('pickupList').count() > 0 ||
    enrollFormState.survey.get('questions').count() > 0) {
    if (enrollDetailState.get('authorizedRequired')) {
      const selectedPickupCount = enrollDetailState.get('selectedPickupIds').count();
      pickupRequiredError = selectedPickupCount === 0;
      pickupRequiredError && errorSections.push(ENROLL_DETAIL);
      dispatch(uiFormErrorAction({ section: 'pickup', key: 'required', value: pickupRequiredError }));
    }

    const questionValidationResult = dispatch(validateQuestionForm());
    questionValidationError = questionValidationResult.length > 0;
    questionValidationError && errorSections.push(ENROLL_DETAIL);
    dispatch(uiFormErrorAction({ section: 'question', key: 'required', value: questionValidationError }));
  }

  const pass = errorSections.length === 0;
  if (pass) {
    const reno = enrollFormState.receipt.get('receiptNumber');
    const pickupIds = enrollDetailState.get('selectedPickupIds').toJS();
    return API.addtocart({ body: { reno, pickup_customers: pickupIds } })
      .then(response => Promise.resolve(response))
      .catch((errorResponse) => {
        if (isRedirectToNewCart(errorResponse)) {
          locationHelp.destroy();
          redirectToNewCart(dispatch);
          return Promise.resolve(errorResponse);
        }
        return Promise.reject(errorResponse);
      });
  }

  dispatch(expandMultipleSections(errorSections));
  pass || setTimeout(() => scrollToSection(errorSections[0]), 10);

  return Promise.reject({ isValidationError: true });
};

export const cleanFormError = section => dispatch => dispatch(uiCleanFormErrorAction({ section }));

import mapKeys from 'lodash/mapKeys';
import { fromJS } from 'immutable';
import toLower from 'lodash/toLower';
import { confirm } from 'react-base-ui/lib/services/dialog';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';

import getDynamicUrl from 'shared/utils/getDynamicUrl';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { decorateWaiver } from 'shared/actions/waiver';
import { decorateNotes } from 'shared/actions/notes';
import { decorateFacility, fetchPermitFee, resetFeesForAllEvents } from 'shared/actions/permitFee';
import { initPaginations } from 'shared/actions/pagination';
import { redirect } from 'shared/actions/route';
import { closeSpecialHandlingAlert } from 'shared/actions/specialHandling';
import { pages } from 'shared/consts';
import URL from '../urls';
import { decorateQuestionAction } from './survey';
import { updateFeeSummary } from './feeSummary';
import { setAllowResetFee } from './permitHolder';
import { wrapEventIndex, extractEventIndexWrapper } from '../utils/eventKeymanager';

export const CONFIG_EVENT = 'CONFIG_EVENT';
export const SHOW_DETAIL = 'SHOW_DETAIL';
export const SHOW_UPDATED = 'SHOW_UPDATED';
export const FETCH_EVENT_DETAIL = 'FETCH_EVENT_DETAIL';
export const FETCH_EVENT_DETAIL_SUCCESS = 'FETCH_EVENT_DETAIL_SUCCESS';
export const FETCH_EVENT_DETAIL_FAILURE = 'FETCH_EVENT_DETAIL_FAILURE';
export const SET_EVENT_CONFIG = 'SET_EVENT_CONFIG';
export const SET_EVENT_VALID_STATUS = 'SET_EVENT_VALID_STATUS';
export const SHOW_ALL_INVALID_EVENT_DETAIL = 'SHOW_ALL_INVALID_EVENT_DETAIL';
export const UPDATE_EVENT_SUMMARY = 'UPDATE_EVENT_SUMMARY';
export const RESTORE_HAS_FETCHED_DETAIL = 'RESTORE_HAS_FETCHED_DETAIL';
export const IS_IMPACT_OTHERS_EVENTS_FEE_OR_QUESTION = 'IS_IMPACT_OTHERS_EVENTS_FEE_OR_QUESTION';
export const SET_NEEDS_CONFIRM_RESET = 'SET_NEEDS_CONFIRM_RESET';

export function configEvent(events) {
  return {
    type: CONFIG_EVENT,
    payload: {
      events
    }
  };
}

export function showDetail(eventIndex) {
  return {
    type: SHOW_DETAIL,
    payload: {
      eventIndex
    }
  };
}

export function showUpdated(eventIndex) {
  return {
    type: SHOW_UPDATED,
    payload: {
      eventIndex
    }
  };
}

export function setEventConfig({ eventDetailConfig, eventIndex }) {
  return {
    type: SET_EVENT_CONFIG,
    payload: {
      eventDetailConfig,
      eventIndex
    }
  };
}

export function getEventDetail({ batchID, receiptID, eventID, newEntryID }) {
  let url = URL.fetchEventDetail;

  /* istanbul ignore else */
  if (__STATIC__) {
    url = URL[`fetchEventDetail${eventID}`];
  }

  return {
    types: [FETCH_EVENT_DETAIL, FETCH_EVENT_DETAIL_SUCCESS, FETCH_EVENT_DETAIL_FAILURE],
    promise: API => API.get(url, {
      body: {
        batch_id: batchID,
        receipt_id: receiptID,
        event_id: eventID,
        new_entry_id: newEntryID
      }
    })
  };
}

export function fetchEventDetail({
  batchID,
  receiptID,
  eventID,
  newEntryID,
  eventIndex,
  onlySetFacilty
}) {
  return (dispatch, getState) =>
    dispatch(getEventDetail({ batchID, receiptID, eventID, newEntryID }))
    .then(({ payload: { body } }) => {
      const obj = convertCasingPropObj(body);
      const {
        questions: { list: questions, hasRequiredQuestion },
        waiverList,
        staffNotes: staffNote,
        customerNotes: customerNote,
        eventFee,
        feeSummary,
        eventDetailConfig,
        eventSummary,
        addableWaivers,
        addableWaiversLoaded,
        addableQuestions,
        addableQuestionsLoaded
      } = obj.eventDetail;

      /* istanbul ignore else */
      if (!onlySetFacilty) {
        dispatch(setEventConfig({ eventDetailConfig, eventIndex }));
        dispatch(decorateWaiver({
          data: waiverList,
          hasNew: false,
          eventIndex,
          addableWaivers,
          addableWaiversLoaded
        }));
        dispatch(decorateNotes({
          staffNote,
          customerNote,
          eventIndex,
          isExpand: true,
          showSection: true
        }));

        const addQuestionData = {
          addableQuestionsLoaded,
          ...addableQuestions
        };

        dispatch(decorateQuestionAction(
          questions,
          hasRequiredQuestion,
          eventIndex,
          addQuestionData
        ));
      }

      const allowResetFees = getState().permitHolder.getIn(['allowResetFees', wrapEventIndex(eventIndex)]);
      dispatch(setAllowResetFee(wrapEventIndex(eventIndex), null));

      return dispatch(decorateFacility({
        eventFee,
        feeSummary,
        eventIndex,
        eventSummary: {
          ...eventSummary,
          allowResetFees: allowResetFees || eventSummary.allowResetFees
        }
      }));
    }).then(() => dispatch(initPaginations()));
}

export const setEventValidStatus = eventIndex => ({
  type: SET_EVENT_VALID_STATUS,
  payload: { eventIndex }
});

export const showAllInvalidEventDetail = invalidEvents => ({
  type: SHOW_ALL_INVALID_EVENT_DETAIL,
  payload: { invalidEvents }
});

export const checkAllWaiverRequried = (allWaivers, eventValidStatus, confirmChange) => {
  const errors = {};
  let allRequired = true;
  let waiverIndex;
  let displayPermitSelected;
  let agreeToWaiverSelected;
  let isRequired;
  let waivers;
  const invalidWaiverEvents = [];
  const confirmChangeWaiverError = {};

  mapKeys(eventValidStatus.toJS(), (value, key) => {
    /* istanbul ignore else */
    if (!value) {
      waivers = allWaivers.getIn([key, 'data'], fromJS([]));
      waivers.forEach((item) => {
        waiverIndex = item.get('waiverIndex');
        displayPermitSelected = item.get('displayPermitSelected');
        agreeToWaiverSelected = item.get('agreetowaiverSelected');
        isRequired = item.get('isRequired');

        /* istanbul ignore else */
        if (displayPermitSelected && isRequired && !agreeToWaiverSelected) {
          allRequired = false;
          errors[waiverIndex] = 'Required';
          /* istanbul ignore else */
          if (invalidWaiverEvents.indexOf(key) === -1) {
            invalidWaiverEvents.push(key);
          }

          if (confirmChange) {
            confirmChangeWaiverError[waiverIndex] = {
              error: 'Required',
              eventIndex: extractEventIndexWrapper(key)
            };
          }
        }
      });
    }
  });

  return { allRequired, errors, invalidWaiverEvents, confirmChangeWaiverError };
};

export const updateEventSummary = (eventInfo, eventIndex) => ({
  type: UPDATE_EVENT_SUMMARY,
  payload: {
    eventInfo,
    eventIndex
  }
});

export const updateFee = (results, eventIndex) => (dispatch) => {
  const eventDetail = convertCasingPropObj(results).eventDetail;
  const {
    eventFee,
    feeSummary,
    isEventUpdated,
    eventSummary
  } = eventDetail;

  dispatch(decorateFacility({ eventFee, feeSummary, eventIndex, eventSummary }));
  dispatch(updateFeeSummary(feeSummary));
  dispatch(updateEventSummary({
    totalAmount: eventFee.eventFeeTotal,
    isEventUpdated
  }, eventIndex));
};

export const fetchReservationFeeThenUpdate = params => (dispatch) => {
  const { batchID, receiptID, eventID, newEntryID, eventIndex } = params;
  const fetchEventDetailParams = {
    batch_id: batchID,
    receipt_id: receiptID,
    event_id: eventID,
    new_entry_id: newEntryID
  };

  return dispatch(fetchPermitFee(URL.fetchEventDetail, fetchEventDetailParams))
    .then(({ payload: { body } }) => {
      dispatch(updateFee(body, eventIndex));
    });
};

const _restoreHasFetchedDetail = eventIndex => ({
  type: RESTORE_HAS_FETCHED_DETAIL,
  payload: {
    eventIndex
  }
});

export const restoreHasFetchedDetail = eventIndex => (dispatch) => {
  dispatch(decorateFacility({ eventFee: {}, feeSummary: {}, eventSummary: {}, eventIndex }));
  // dispatch(decorateQuestion({ questions: {}, hasRequiredQuestion: false, eventIndex }));
  return dispatch(_restoreHasFetchedDetail(eventIndex));
};

const _checkReservationBookingCount = (batchID, receiptID) => ({
  types: ['', '', ''],
  promise: API => API.get(URL.bookingCountExceed, {
    body: {
      batch_id: batchID,
      receipt_id: receiptID,
      add_booking_count: 0, // backend requires forced set as 0
      delete_booking_count: 0 // backend requires forced set as 0
    }
  })
});

export const addEvent = ({ permitID, batchID, receiptID }) => dispatch =>
  dispatch(_checkReservationBookingCount(batchID, receiptID))
  .then(() => {
    dispatch(redirect(pages.buildUrl(pages.calendarPage, {
      batch_id: batchID,
      receipt_id: receiptID,
      permit_id: permitID
    })));
  });

export const requestDeleteEvent = ({ batchID, receiptID, eventID, newEntryID }) => {
  const url = getDynamicUrl(URL.deleteEvent, {
    batchID,
    receiptID,
    eventID,
    newEntryID
  });

  return {
    types: ['', '', ''],
    promise: API => API.delete(url)
  };
};

export const deleteEvent = params => dispatch => dispatch(requestDeleteEvent(params))
  .then(() => {
    dispatch(redirect(pages.buildUrl(pages.reloadReservationDetailPage, {
      batch_id: params.batchID,
      receipt_id: params.receiptID
    })));
  });

export const setNeedsConfirmReset = value => ({
  type: SET_NEEDS_CONFIRM_RESET,
  payload: {
    value
  }
});

export const resetFeesAndReloadEvents = () => dispatch =>
  dispatch(resetFeesForAllEvents()).then(({ payload: { body } }) => {
    const { eventList, feeSummary } = convertCasingPropObj(body);
    eventList.forEach((event) => {
      const eventIndex = event.eventIndex;
      dispatch(restoreHasFetchedDetail(eventIndex));
      dispatch(updateEventSummary(event, eventIndex));
    });
    dispatch(updateFeeSummary(feeSummary));
  });


export const confirmResetFees = () => (dispatch, getState) => {
  const option = {
    title: 'Confirm',
    showCancel: true,
    cancelText: 'No',
    confirmText: 'Yes'
  };
  const companyWording = decodeHtmlStr(toLower(getState().initialData.companyWording));
  return confirm(`Change in customer/${companyWording} may result in fee change. Reset Fees?`, option);
};

export const enableResetFees = () => (dispatch, getState) => {
  const events = getState().eventDetail.get('eventList').toJS();
  events.forEach(({ eventIndex }) => {
    dispatch(restoreHasFetchedDetail(eventIndex));
    dispatch(setAllowResetFee(eventIndex, true));
  });
};

export const confirmAndResetFees = () => dispatch =>
  dispatch(confirmResetFees())
  .then(() => dispatch(resetFeesAndReloadEvents()))
  .catch(() => dispatch(enableResetFees()))
  .then(() => dispatch(setNeedsConfirmReset(false)));


export const confirmAndResetFeesAfterSpecialHandling = () => (dispatch, getState) => {
  dispatch(closeSpecialHandlingAlert());
  if (getState().eventDetail.get('needsConfirmReset')) {
    setTimeout(() => dispatch(confirmAndResetFees()), 0);
  }
};

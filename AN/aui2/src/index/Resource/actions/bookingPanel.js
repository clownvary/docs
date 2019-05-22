import { addClass, removeClass } from 'react-base-ui/lib/utils/dom';
import { fromJS, is } from 'immutable';
import isUndefined from 'lodash/isUndefined';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { hideLoadingbar, showLoadingbar } from 'shared/actions/loadingBar';
import { pages } from 'shared/consts';
import { redirect } from 'shared/actions/route';
import serializeData from 'shared/utils/serialize';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import { isSystemError } from 'shared/api/parseResponse';
import URL from '../urls';
import {
  formatBooking,
  formatEventResourceBooking
} from '../utils/bookingHelper';
import reservationPeriodUnit from '../consts/reservationPeriodUnit';
import { getBookingID, getRecurringPatternDesc } from '../utils/recurring';
import { reSortResourcesAndBookings, reSortRecurringBookings } from '../utils/sortResourceAndBooking';
import {
  addExceptionDateToBaseBooking,
  checkBaseBookingApplyAsyncAction,
  updateBookingPanelStatesAfterMutation,
  flushAllRecurringBookingsAfterBookingPanelMutationAction
} from './bookingPanelRecurring';
import {
  setServerErrorsAction,
  BOOKINGPANEL_VALIDATION_UPDATE_ERROR,
  bookingPanelCleanDatetimeError,
  getServerMessages,
  bookingPanelCleanAttendanceError
} from './bookingPanelValidation';

export const BOOKINGPANEL_UPDATE_EVENT = 'BOOKINGPANEL_UPDATE_EVENT';
export const BOOKINGPANEL_UPDATE_PEENDING_BOOKING_STATUS = 'BOOKINGPANEL_UPDATE_PEENDING_BOOKING_STATUS';
export const BOOKINGPANEL_UPDATE_BOOKING_LIMITATION_CONTENT = 'UPDATE_BOOKING_LIMITATION_CONTENT';
export const BOOKINGPANEL_SHOW = 'BOOKINGPANEL_SHOW';
export const BOOKINGPANEL_RESET_RESOURCE_MAP = 'BOOKINGPANEL_RESET_RESOURCE_MAP';
export const BOOKINGPANEL_ADD_RESOURCES_TO_RESOURCE_MAP = 'BOOKINGPANEL_ADD_RESOURCES_TO_RESOURCE_MAP';
export const BOOKINGPANEL_UPDATE_RESOURCE_AND_BOOKINGS = 'BOOKINGPANEL_UPDATE_RESOURCE_AND_BOOKINGS';
export const BOOKINGPANEL_RESET_OVERRIDE_RENTAL_BLOCK = 'BOOKINGPANEL_RESET_OVERRIDE_RENTAL_BLOCK';
export const BOOKINGPANEL_SET_OVERRIDE_RENTAL_BLOCK = 'BOOKINGPANEL_SET_OVERRIDE_RENTAL_BLOCK';
export const BOOKINGPANEL_PROCEED_FAILURE = 'BOOKINGPANEL_PROCEED_FAILURE';
export const BOOKINGPANEL_ADD_CHANGED_BASE_BOOKING = 'BOOKINGPANEL_ADD_CHANGED_BASE_BOOKING';
export const BOOKINGPANEL_DELETE_CHANGED_BASE_BOOKING = 'BOOKINGPANEL_DELETE_CHANGED_BASE_BOOKING';
export const BOOKINGPANEL_UPDATE_SELECTED_RESOURCES = 'BOOKINGPANEL_UPDATE_SELECTED_RESOURCES';

/**
 * @param {object} bookingPanelEvent booking event detail with
 *  scheduleTypeID, scheduleType, eventName
 * @param {bool} isInitBookingEvent edit the existing event and init the event detail
 */
export const bookingPanelUpdateEventAction = (bookingPanelEvent, isInitBookingEvent) => ({
  type: BOOKINGPANEL_UPDATE_EVENT,
  payload: {
    bookingPanelEvent,
    isBookingChanged: !isInitBookingEvent
  }
});

/**
 * When in the modify workflow, if user add bookings or edit bookings
 *   then go to reservation detail page and then edit the Event so that
 *   go to the resource page, no matter the user change or not the bookings,
 *   the Update Reservation should always enable.
 */
export const updatePendingBookingStatusAction = () => ({
  type: BOOKINGPANEL_UPDATE_PEENDING_BOOKING_STATUS
});

export const updateBookingToastContentAction = content => ({
  type: BOOKINGPANEL_UPDATE_BOOKING_LIMITATION_CONTENT,
  payload: {
    content
  }
});

export const showBookingPanelAction = (isShowBookingPanel = true, reSortedResourceList) =>
(dispatch, getState) => {
  const { bookingPanel, configurationData } = getState();
  const resourceOrders = [];
  let reSortedResourceMap = fromJS({});
  let reSortedResourcesAndBookings = null;
  let recurringMap = bookingPanel.get('recurringMap');

  if (isShowBookingPanel) {
    if (reSortedResourceList) {
      reSortedResourcesAndBookings = reSortedResourceList;
    } else {
      reSortedResourcesAndBookings = reSortResourcesAndBookings(
        bookingPanel.get('resourceMap'),
        configurationData.get('resourceMap')
      );
    }

    reSortedResourcesAndBookings.map((resource) => {
      const resourceID = resource.get('resourceID');
      reSortedResourceMap = reSortedResourceMap.set(resourceID, resource);

      const resourceBookings = resource.get('bookings');
      if (resourceBookings && resourceBookings.size) {
        resourceOrders.push(resourceID);
      }
      return resourceID;
    });

    recurringMap = recurringMap.map(
      baseBooking => baseBooking.set('expanded', false));
    recurringMap = reSortRecurringBookings(recurringMap);

    document.body.style.overflow = 'hidden';
    addClass(document.body, 'an-booking-information-on');
    window.setTimeout(() => { Tooltip.close(); }, 1000);
  } else {
    dispatch(flushAllRecurringBookingsAfterBookingPanelMutationAction());
    document.body.style.overflow = 'auto';
    removeClass(document.body, 'an-booking-information-on');
  }

  return dispatch({
    type: BOOKINGPANEL_SHOW,
    payload: {
      isShowBookingPanel,
      resourceMap: reSortedResourceMap,
      recurringMap,
      resourceOrders: fromJS(resourceOrders)
    }
  });
};

export const resetBookingPanelResourceMapAction = (resourceMap, recurringMap) => ({
  type: BOOKINGPANEL_RESET_RESOURCE_MAP,
  payload: {
    resourceMap,
    recurringMap
  }
});

export const addResourceBookingsAction = resourceMap => ({
  type: BOOKINGPANEL_ADD_RESOURCES_TO_RESOURCE_MAP,
  payload: {
    resourceMap
  }
});

export const bookingPanelUpdateResourceAndBookingsAction = (
  resourceID,
  resource,
  recurringMap,
  error,
  pendingMovedRecurringBookingMap,
  changedBaseBookingMap,
  deleteBookings,
  waitingAppliedBaseBookingIds
) => ({
  type: BOOKINGPANEL_UPDATE_RESOURCE_AND_BOOKINGS,
  payload: {
    resourceID,
    resource,
    recurringMap,
    error,
    pendingMovedRecurringBookingMap,
    changedBaseBookingMap,
    deleteBookings,
    waitingAppliedBaseBookingIds
  }
});

export const bookingPanelUpdateLoadedResources = resourceIDs => ({
  type: BOOKINGPANEL_UPDATE_SELECTED_RESOURCES,
  payload: {
    loadedResourceIDs: resourceIDs
  }
});

/**
 * Update the booking time detail of:
 *  'rentalBlockID', 'dateRangeID',
 *  'startEventDate', 'startEventTime',
 *  'endEventDate', 'endEventTime'
 * */
export const bookingPanelUpdateDateTimeAction = (resourceID, bookingID, dateTimeObject) =>
  (dispatch, getState) => {
    const { bookingPanel } = getState();
    const { isRecurring, baseBookingID } = dateTimeObject;
    const isDisplay = bookingPanel.get('display');
    const strResourceID = `${resourceID}`;
    let resourceMap = bookingPanel.get('resourceMap');
    let resource = resourceMap.get(strResourceID);
    let recurringMap = bookingPanel.get('recurringMap');
    let deleteBookings = bookingPanel.get('deleteBookings');
    let setupMinutes;
    let cleanupMinutes;
    const bookings = isRecurring ? recurringMap.getIn([baseBookingID, 'bookings']) : resource.get('bookings');
    const bookingIndex = bookings.findIndex(book => book.get('id') === bookingID);
    const booking = bookings.get(bookingIndex);
    const lastBooking = bookings.get(bookingIndex);
    const originalBookingPanelError = bookingPanel.get('error');
    let plainBooking = {
      ...booking.toJS(),
      ...dateTimeObject,
      overrideAdvanceMinimum: false,
      overrideAdvanceMaximum: false,
      ignoreConflict: false,
      ignoreClosetime: false,
      ignoreSkipdate: false
    };
    let bookingPanelError = originalBookingPanelError;

    bookingPanelError = bookingPanelCleanDatetimeError(bookingPanelError, bookingID);
    bookingPanelError = bookingPanelCleanAttendanceError(bookingPanelError, bookingID);

    if (dateTimeObject.startEventDate || dateTimeObject.startEventTime) {
      plainBooking.startEventDatetime = `${plainBooking.startEventDate} ${plainBooking.startEventTime}`;
      setupMinutes = resource.get('setupMinutes');
    }

    if (dateTimeObject.endEventDate || dateTimeObject.endEventTime) {
      plainBooking.endEventDatetime = `${plainBooking.endEventDate} ${plainBooking.endEventTime}`;
      cleanupMinutes = resource.get('cleanupMinutes');
    }

    plainBooking = formatBooking(
      formatEventResourceBooking(plainBooking, resourceID, setupMinutes, cleanupMinutes)
    );

    const newBooking = booking.merge(plainBooking);
    let changedBaseBookingMap = bookingPanel.get('changedBaseBookingMap');
    let waitingAppliedBaseBookingIds = bookingPanel.get('waitingAppliedBaseBookingIds');
    let pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');

    if (isRecurring) {
      recurringMap = recurringMap.setIn([baseBookingID, 'bookings', bookingIndex], newBooking);
      // Update recurringExceptions for base booking when recurring booking first changed.
      resource = resource.update('bookings', _bookings => _bookings.map((_booking) => {
        if (
            _booking.get('id') === baseBookingID &&
            !pendingMovedRecurringBookingMap.get(bookingID)
          ) {
          return addExceptionDateToBaseBooking(_booking, lastBooking);
        }
        return _booking;
      }));
      pendingMovedRecurringBookingMap = pendingMovedRecurringBookingMap.set(bookingID, newBooking);
    } else {
      resource = resource.setIn(['bookings', bookingIndex], newBooking);
    }

    /**
     * If this is a base booking and the panel is display status:
     *   - Show warning message under base booking.
     */
    if (newBooking.get('recurringPattern')) {
      const basePatternBooking = changedBaseBookingMap.getIn([bookingID, 'basePatternBooking']);
      const changedBaseBooking = {
        newBooking,
        basePatternBooking
      };
      if (!basePatternBooking) {
        changedBaseBooking.basePatternBooking = lastBooking;
      }

      changedBaseBookingMap = changedBaseBookingMap.merge(fromJS({
        [bookingID]: changedBaseBooking
      }));
    }

    if (!is(originalBookingPanelError, bookingPanelError)) {
      bookingPanelError = bookingPanelError.merge(getServerMessages(bookingPanelError));
    }

    /**
     * If this is a base booking and the panel is display status and isRentalBlockOverride is ture:
     *   - remove apply to all button.
     */
    if (isDisplay && newBooking.get('recurringPattern') && newBooking.get('isRentalBlockOverride')) {
      waitingAppliedBaseBookingIds = waitingAppliedBaseBookingIds.filter(id => id !== bookingID);
    }

    if (!isDisplay) {
      resourceMap = resourceMap.set(strResourceID, resource);
      const mutationStates = updateBookingPanelStatesAfterMutation(
        resourceMap,
        recurringMap,
        deleteBookings,
        changedBaseBookingMap,
        pendingMovedRecurringBookingMap,
        waitingAppliedBaseBookingIds
      );
      resource = mutationStates.resourceMap.get(strResourceID);
      recurringMap = mutationStates.recurringMap;
      deleteBookings = mutationStates.deleteBookings;
      changedBaseBookingMap = mutationStates.changedBaseBookingMap;
      pendingMovedRecurringBookingMap = mutationStates.pendingMovedRecurringBookingMap;
      waitingAppliedBaseBookingIds = mutationStates.waitingAppliedBaseBookingIds;
    }

    dispatch(bookingPanelUpdateResourceAndBookingsAction(
      resourceID,
      resource,
      recurringMap,
      bookingPanelError,
      pendingMovedRecurringBookingMap,
      changedBaseBookingMap,
      deleteBookings,
      waitingAppliedBaseBookingIds
    ));

    /**
     * If this is a base booking and the panel is display status and isRentalBlockOverride is false:
     *   - Check the apply to all ability to see if show apply to all button or not.
     */
    if (isDisplay && newBooking.get('recurringPattern') && !newBooking.get('isRentalBlockOverride')) {
      dispatch(checkBaseBookingApplyAsyncAction(newBooking));
    }
  };

export const bookingPanelUpdateAttendanceAction =
(resourceID, bookingID, attendance, isRecurring, baseBookingID) =>
  (dispatch, getState) => {
    const { bookingPanel } = getState();
    let recurringMap = bookingPanel.get('recurringMap');
    let resource = bookingPanel.get('resourceMap').get(resourceID);
    const bookings = isRecurring ? recurringMap.getIn([baseBookingID, 'bookings']) : resource.get('bookings');
    const bookingIndex = bookings.findIndex(book => book.get('id') === bookingID);
    const booking = bookings.get(bookingIndex);
    const originalBookingPanelError = bookingPanel.get('error');
    let bookingPanelError = originalBookingPanelError;

    bookingPanelError = bookingPanelCleanAttendanceError(bookingPanelError, bookingID);

    if (isRecurring) {
      recurringMap = recurringMap.setIn([baseBookingID, 'bookings', bookingIndex], booking.withMutations(
        (book) => {
          book.set('attendance', attendance);
          book.set('attendanceChanged', true);
          book.set('ignoreConflict', false);
        }
      ));
    } else {
      resource = resource.setIn(['bookings', bookingIndex], booking.withMutations(
        (book) => {
          book.set('attendance', attendance);
          book.set('attendanceChanged', true);
          book.set('ignoreConflict', false);
        }
      ));
    }

    if (!is(originalBookingPanelError, bookingPanelError)) {
      bookingPanelError = bookingPanelError.merge(getServerMessages(bookingPanelError));
    }

    return dispatch(bookingPanelUpdateResourceAndBookingsAction(
      resourceID, resource, recurringMap, bookingPanelError));
  };

export const bookingPanelResetOverrideRentalBlockAction =
(resourceID, bookingID, isRecurring, baseBookingID) =>
  (dispatch, getState) => {
    const { bookingPanel } = getState();
    let resource = bookingPanel.get('resourceMap').get(resourceID);
    let recurringMap = bookingPanel.get('recurringMap');
    const bookings = isRecurring ? recurringMap.getIn([baseBookingID, 'bookings']) : resource.get('bookings');
    const bookingIndex = bookings.findIndex(book => book.get('id') === bookingID);
    const booking = bookings.get(bookingIndex);

    if (isRecurring) {
      recurringMap = recurringMap.setIn([baseBookingID, 'bookings', bookingIndex], booking.withMutations(
        (book) => {
          book.remove('overrideRentalBlock');
          book.set('isRentalBlockOverride', false);
        }
      ));
    } else {
      resource = resource.setIn(['bookings', bookingIndex], booking.withMutations((book) => {
        book.remove('overrideRentalBlock');
        book.set('isRentalBlockOverride', false);
      }));
    }

    return dispatch({
      type: BOOKINGPANEL_RESET_OVERRIDE_RENTAL_BLOCK,
      payload: {
        resourceID,
        resource,
        recurringMap
      }
    });
  };

export const bookingPanelSetOverrideRentalBlockAction =
(resourceID, bookingID, overrideRentalBlock, isRecurring, baseBookingID) =>
  (dispatch, getState) => {
    const { bookingPanel } = getState();
    let resource = bookingPanel.get('resourceMap').get(resourceID);
    let recurringMap = bookingPanel.get('recurringMap');
    const bookings = isRecurring ? recurringMap.getIn([baseBookingID, 'bookings']) : resource.get('bookings');
    const bookingIndex = bookings.findIndex(book => book.get('id') === bookingID);
    const booking = bookings.get(bookingIndex);

    if (isRecurring) {
      recurringMap = recurringMap.setIn([baseBookingID, 'bookings', bookingIndex], booking.withMutations(
        (book) => {
          book.set('overrideRentalBlock', fromJS({
            value: overrideRentalBlock.id,
            text: overrideRentalBlock.name
          }));
          book.set('isRentalBlockOverride', true);
          book.set('overrideAdvanceMinimum', false);
          book.set('overrideAdvanceMaximum', false);
        }
      ));
    } else {
      resource = resource.setIn(['bookings', bookingIndex], booking.withMutations((book) => {
        book.set('overrideRentalBlock', fromJS({
          value: overrideRentalBlock.id,
          text: overrideRentalBlock.name
        }));
        book.set('isRentalBlockOverride', true);
        book.set('overrideAdvanceMinimum', false);
        book.set('overrideAdvanceMaximum', false);
      }));
    }

    return dispatch({
      type: BOOKINGPANEL_SET_OVERRIDE_RENTAL_BLOCK,
      payload: {
        resourceID,
        resource,
        recurringMap
      }
    });
  };

export const applySetupCleanupMinutesForRecurringBookings =
(recurringMap, bookingPanelError, baseBookingID, resourceID, setupMinutes, cleanupMinutes) => {
  let recurringBookings = recurringMap.getIn([baseBookingID, 'bookings']);

  if (recurringBookings && recurringBookings.size) {
    recurringBookings = recurringBookings.map((recurringBook) => {
      const recurringBookingID = recurringBook.get('id');
      const newRecurringBook =
        formatBooking(
          formatEventResourceBooking(
            recurringBook.toJS(), resourceID, setupMinutes, cleanupMinutes
          )
        );
      newRecurringBook.ignoreConflict = false;
      newRecurringBook.ignoreClosetime = false;
      newRecurringBook.ignoreSkipdate = false;
      bookingPanelError = bookingPanelCleanDatetimeError(bookingPanelError, recurringBookingID);
      return recurringBook.merge(newRecurringBook);
    });

    recurringMap = recurringMap.setIn([baseBookingID, 'bookings'], recurringBookings);
  }

  return [recurringMap, bookingPanelError];
};

/**
 * setupMinutes, cleanupMinutes
 * eventType, eventTypeID, prepCodeID
 */
export const bookingPanelUpdateResourceDetailAction = (resourceID, resourceDetailObj) =>
  (dispatch, getState) => {
    const { bookingPanel } = getState();
    let resource = bookingPanel.getIn(['resourceMap', resourceID]);
    const originalBookingPanelError = bookingPanel.get('error');
    let bookingPanelError = originalBookingPanelError;
    let recurringMap = bookingPanel.get('recurringMap');
    const setupMinutes = resourceDetailObj.setupMinutes;
    const cleanupMinutes = resourceDetailObj.cleanupMinutes;
    const resourceBookings = resource.get('bookings');

    resource = resource.merge(resourceDetailObj);

    const formateBookings = resourceBookings.map((book) => {
      const bookingID = book.get('id');
      let newBook = book.toJS();

      // Fix ANE-85283 begin
      const bookingError = bookingPanelError.getIn(['bookings', bookingID]);

      if (bookingError && bookingError.get('attendance') && bookingError.get('eventCapacityLimit')) {
        bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID, 'attendance']);
        bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID, 'eventCapacityLimit']);
      }

      const recurringBookings = recurringMap.getIn([bookingID, 'bookings']);
      recurringBookings && recurringBookings.forEach((recurBooking) => {
        const recurBookingID = recurBooking.get('id');
        const recurBookingError = bookingPanelError.getIn(['bookings', recurBookingID]);

        if (recurBookingError && recurBookingError.get('attendance') && recurBookingError.get('eventCapacityLimit')) {
          bookingPanelError = bookingPanelError.removeIn(['bookings', recurBookingID, 'attendance']);
          bookingPanelError = bookingPanelError.removeIn(['bookings', recurBookingID, 'eventCapacityLimit']);
        }
      }); // Fix ANE-85283 end

      if (!isUndefined(setupMinutes) || !isUndefined(cleanupMinutes)) {
        newBook = formatBooking(
          formatEventResourceBooking(newBook, resourceID, setupMinutes, cleanupMinutes)
        );
      }
      newBook.ignoreConflict = false;
      newBook.ignoreClosetime = false;
      newBook.ignoreSkipdate = false;
      bookingPanelError = bookingPanelCleanDatetimeError(bookingPanelError, bookingID);
      [recurringMap, bookingPanelError] = applySetupCleanupMinutesForRecurringBookings(
        recurringMap, bookingPanelError, bookingID, resourceID, setupMinutes, cleanupMinutes
      );

      return book.merge(newBook);
    });

    resource = resource.set('bookings', formateBookings);

    if (!is(originalBookingPanelError, bookingPanelError)) {
      bookingPanelError = bookingPanelError.merge(getServerMessages(bookingPanelError));
    }

    return dispatch(bookingPanelUpdateResourceAndBookingsAction(
      resourceID, resource, recurringMap, bookingPanelError));
  };

const handleProceedSuccess = operation =>
  (dispatch, getState) => {
    const { initialData } = getState();
    const {
      permitID,
      batchID,
      eventID,
      receiptID,
      receiptEntryID
    } = initialData;

    if (permitID > 0) {
      if (eventID > 0 || receiptEntryID > 0) {
        dispatch(redirect(pages.buildUrl(pages.reloadReservationDetailPage, {
          permit_id: permitID,
          batch_id: batchID,
          receipt_id: receiptID,
          receipt_entry_id: receiptEntryID,
          operation
        })));
      } else {
        dispatch(redirect(pages.buildUrl(pages.reloadReservationDetailPage, {
          batch_id: batchID,
          receipt_id: receiptID,
          operation
        })));
      }
    } else {
      dispatch(redirect(pages.buildUrl(pages.permitDetailPage, {
        permit_id: permitID,
        batch_id: batchID,
        receipt_id: receiptID,
        receipt_entry_id: receiptEntryID
      }), null, false));
    }
  };

const requestNewPermitProceed = body => ({
  types: ['', '', BOOKINGPANEL_PROCEED_FAILURE],
  promise: api => api.post(URL.pendingBookingProceed, { body }),
  meta: {
    ignoreLoadingbar: true,
    ignoreBusinessErrors: true
  }
});

const requestExistingPermitProceed = (body, batchID, receiptID) => {
  let url = `${URL.updatePermitBookingProceed}`;

  /* istanbul ignore next */
  if (!__STATIC__) {
    url += `/${body.permit_id}?batch_id=${batchID}&receipt_id=${receiptID}`;
  }

  return {
    types: ['', '', BOOKINGPANEL_PROCEED_FAILURE],
    promise: api => api.put(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }),
    meta: {
      ignoreLoadingbar: true,
      ignoreBusinessErrors: true
    }
  };
};

const handleProceedResponse = (proceedResponse, operation) =>
  (dispatch, getState) => {
    if (proceedResponse && proceedResponse.error_result) {
      const recurringMap = getState().bookingPanel.get('recurringMap');

      dispatch(setServerErrorsAction(proceedResponse.error_result, recurringMap));
      dispatch(hideLoadingbar());
    } else {
      dispatch(handleProceedSuccess(operation));
    }
  };

const handleProceedServerError = error =>
(dispatch) => {
  const { payload } = error;
  const headers = payload.headers;

  if (headers && headers.response_code && !isSystemError(headers.response_code)) {
    dispatch({
      type: BOOKINGPANEL_VALIDATION_UPDATE_ERROR,
      payload: {
        error: fromJS({
          code: headers.response_code,
          serverMessages: headers.response_message.split('\n')
        })
      }
    });
  }
};

const getBookingDetailsForModifyPermit = (booking, RU, resourceRentalBlocks, recurringBookings) => {
  const startEventDatetime = booking.get('momentEventStart');
  const endEventDatetime = booking.get('momentEventEnd');
  let reservationType = 0;

  if (RU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
    reservationType = 2;
  }

  if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
    reservationType = 1;
  }
  const isRentalBlockOverride = booking.get('isRentalBlockOverride');
  return {
    booking_identifier: getBookingID(booking),
    pending_id: booking.get('pendingID'),
    resource_booking_id: booking.get('resourceBookingID'),
    transaction_id: booking.get('transactionID') || -1,
    pending_resource_booking_id: booking.get('pendingResourceBookingID') || 0,
    reservation_type: reservationType,
    attendance: booking.get('attendance') || 1,
    rental_block_id: isRentalBlockOverride ? resourceRentalBlocks.getIn([0, 'id']) : (booking.get('rentalBlockID') || 0),
    date_range_id: booking.get('dateRangeID') || 0,
    start_event_datetime: DateTimeFormat.toString(startEventDatetime),
    end_event_datetime: DateTimeFormat.toString(endEventDatetime),
    ignore_skipdate: booking.get('ignoreSkipdate'),
    ignore_closetime: booking.get('ignoreClosetime'),
    ignore_conflict: booking.get('ignoreConflict'),
    master_booking_identifier: booking.get('isRecurring') ? booking.get('baseBookingID') : '',
    recurring_reservation_group: (recurringBookings && recurringBookings.size) ? {
      exception_date_list: booking.get('recurringExceptions'),
      group_pattern_content: booking.get('recurringPattern'),
      master_facility_schedule_id: booking.get('masterFacilityScheduleID'),
      group_pattern_description: getRecurringPatternDesc(booking, recurringBookings),
      recurring_reservation_group_id: booking.get('recurringReservationGroupID')
    } : null,
    is_rental_block_override: isRentalBlockOverride || false,
    override_advance_maximum: booking.get('overrideAdvanceMaximum'),
    override_advance_minimum: booking.get('overrideAdvanceMinimum')
  };
};

export const existingPermitProceedAsyncAction = isCheckForWaitlistConflict =>
  (dispatch, getState) => {
    dispatch(showLoadingbar());
    dispatch(flushAllRecurringBookingsAfterBookingPanelMutationAction());
    const { initialData, bookingPanel, configurationData } = getState();
    const {
      eventID,
      receiptEntryID,
      batchID,
      receiptID,
      permitID
    } = initialData;
    const requestBody = {
      permit_id: permitID || -1,
      event_id: eventID,
      new_entry_id: receiptEntryID,
      event_name: bookingPanel.get('eventName'),
      schedule_type_id: bookingPanel.get('scheduleTypeID'),
      schedule_type: bookingPanel.get('scheduleType'),
      check_for_waitlist_conflict: isCheckForWaitlistConflict,
      event_resource: []
    };
    const deleteBookingsWhenEditEvent = bookingPanel.get('deleteBookings');
    const bookingPanelResourceMap = bookingPanel.get('resourceMap');
    const recurringMap = bookingPanel.get('recurringMap');
    const resourceMap = configurationData.get('resourceMap');
    const rentalBlockMap = configurationData.get('rentalBlockMap');

    bookingPanelResourceMap.map((eventResource, resourceID) => {
      const bookings = eventResource.get('bookings');
      const hasBookingNeedsProceed = bookings.size;
      const strEventResourceID = `${resourceID}`;
      const resourceInfo = resourceMap.get(strEventResourceID);
      const RU = resourceInfo.get('reservationPeriodUnit');
      const resourceRentalBlocks = rentalBlockMap.get(strEventResourceID);

      const deletedBookings = [];
      deleteBookingsWhenEditEvent.forEach((booking) => {
        const resourceBookingID = booking.get('resourceBookingID');
        const pendingResourceBookingID = booking.get('pendingResourceBookingID') || 0;
        const resourceIDOfDeleteBooking = booking.get('resourceID');

        if (+strEventResourceID === +resourceIDOfDeleteBooking &&
          (resourceBookingID > 0 || pendingResourceBookingID > 0)) {
          deletedBookings.push({
            resource_booking_id: resourceBookingID,
            pending_resource_booking_id: pendingResourceBookingID
          });
        }
      });

      // Add the backend temp delete bookings for updating fee
      const deletedBookingBeforeThisEventEditing = eventResource.get('deletedBookingList') ?
        eventResource.get('deletedBookingList') : [];

      deletedBookingBeforeThisEventEditing.forEach((booking) => {
        deletedBookings.push({
          resource_booking_id: booking.get('resourceBookingID') || booking.resourceBookingID,
          pending_resource_booking_id: booking.get('pendingResourceBookingID') || booking.pendingResourceBookingID || 0
        });
      });

      if (hasBookingNeedsProceed || deletedBookings.length > 0) {
        const resource = {
          resource_id: resourceID,
          resource_type: resourceInfo.get('resourceType'),
          resource_name: decodeHtmlStr(resourceInfo.get('resourceName')),
          reservation_period_unit: RU,
          event_type_id: eventResource.get('eventTypeID'),
          event_type: eventResource.get('eventType'),
          prep_code_id: eventResource.get('prepCodeID'),
          setup_minutes: eventResource.get('setupMinutes'),
          cleanup_minutes: eventResource.get('cleanupMinutes'),
          booking_detail: [],
          deleted_booking_list: []
        };

        bookings.forEach((booking) => {
          const bookingID = booking.get('id');
          const recurringBookings = recurringMap.getIn([bookingID, 'bookings']);
          const bookingData = getBookingDetailsForModifyPermit(
            booking, RU, resourceRentalBlocks, recurringBookings
          );

          resource.booking_detail.push(bookingData);

          recurringBookings && recurringBookings.forEach((recurringBooking) => {
            const recurringBookingData = getBookingDetailsForModifyPermit(
              recurringBooking, RU, resourceRentalBlocks
            );
            resource.booking_detail.push(recurringBookingData);
          });
        });
        resource.deleted_booking_list = deletedBookings;
        requestBody.event_resource.push(resource);
      }

      return eventResource;
    });

    return dispatch(requestExistingPermitProceed(requestBody, batchID, receiptID))
      .then(
        ({ payload: { body } }) => {
          const operation = receiptEntryID > 0 || eventID > 0 ? 'edited' : 'added';
          return dispatch(handleProceedResponse(body, operation));
        },
        (error) => {
          dispatch(handleProceedServerError(error)); // response header error
          dispatch(hideLoadingbar());
          Promise.reject(error);
        }
      );
  };

const getBookingDetailForNewPermit = (booking, RU, resourceRentalBlocks, recurringBookings) => {
  const startEventDatetime = booking.get('momentEventStart');
  const endEventDatetime = booking.get('momentEventEnd');
  const startScheduleDatetime = booking.get('momentStartScheduleDatetime');
  const endScheduleDatetime = booking.get('momentEndScheduleDatetime');
  const pendingID = booking.get('pendingID');
  let reservationType = 0;

  if (RU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
    reservationType = 2;
  }

  if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
    reservationType = 1;
  }

  const isRentalBlockOverride = booking.get('isRentalBlockOverride');
  return {
    booking_identifier: pendingID,
    pending_id: pendingID,
    resource_booking_id: 0,
    transaction_id: -1,
    reservation_type: reservationType,
    quantity: booking.get('attendance') || 0,
    rental_block_id: isRentalBlockOverride ? resourceRentalBlocks.getIn([0, 'id']) : (booking.get('rentalBlockID') || 0),
    date_range_id: booking.get('dateRangeID') || 0,
    start_event_datetime: DateTimeFormat.toString(startEventDatetime),
    end_event_datetime: DateTimeFormat.toString(endEventDatetime),
    start_schedule_datetime: DateTimeFormat.toString(startScheduleDatetime),
    end_schedule_datetime: DateTimeFormat.toString(endScheduleDatetime),
    ignore_skipdate: booking.get('ignoreSkipdate'),
    ignore_closetime: booking.get('ignoreClosetime'),
    ignore_conflict: booking.get('ignoreConflict'),
    master_booking_identifier: booking.get('isRecurring') ? booking.get('baseBookingID') : '',
    recurring_reservation_group: (recurringBookings && recurringBookings.size) ? {
      exception_date_list: booking.get('recurringExceptions'),
      group_pattern_content: booking.get('recurringPattern'),
      master_facility_schedule_id: booking.get('masterFacilityScheduleID'),
      group_pattern_description: getRecurringPatternDesc(booking, recurringBookings),
      recurring_reservation_group_id: 0
    } : '',
    is_rental_block_override: isRentalBlockOverride || false,
    override_advance_maximum: booking.get('overrideAdvanceMaximum'),
    override_advance_minimum: booking.get('overrideAdvanceMinimum')
  };
};

export const newPermitProceedAsyncAction = isCheckForWaitlistConflict =>
  (dispatch, getState) => {
    dispatch(showLoadingbar());
    dispatch(flushAllRecurringBookingsAfterBookingPanelMutationAction());
    const { initialData, bookingPanel, configurationData } = getState();
    const {
      batchID,
      receiptID,
      receiptEntryID
    } = initialData;

    const requestBody = {
      batch_id: batchID,
      receipt_id: receiptID,
      receipt_entry_id: receiptEntryID,
      event_name: bookingPanel.get('eventName'),
      schedule_type_id: bookingPanel.get('scheduleTypeID'),
      schedule_type: bookingPanel.get('scheduleType') || '',
      check_for_waitlist_conflict: isCheckForWaitlistConflict,
      event_resource: []
    };

    const bookingPanelResourceMap = bookingPanel.get('resourceMap');
    const recurringMap = bookingPanel.get('recurringMap');
    const resourceMap = configurationData.get('resourceMap');
    const rentalBlockMap = configurationData.get('rentalBlockMap');

    bookingPanelResourceMap.map((eventResource, resourceID) => {
      const bookings = eventResource.get('bookings');
      if (bookings.size) {
        const eventResourceID = `${resourceID}`;
        const resourceInfo = resourceMap.get(eventResourceID);
        const RU = resourceInfo.get('reservationPeriodUnit');
        const resource = {
          facility_id: +resourceID,
          facility_number: resourceInfo.get('resourceNumber'),
          facility_type: resourceInfo.get('resourceType'),
          facility_name: decodeHtmlStr(resourceInfo.get('resourceName')),
          reservation_period_unit: RU,
          event_type_id: eventResource.get('eventTypeID'),
          event_type: eventResource.get('eventType'),
          prep_code_id: eventResource.get('prepCodeID'),
          setup_minutes: eventResource.get('setupMinutes'),
          cleanup_minutes: eventResource.get('cleanupMinutes'),
          booking_detail: []
        };
        const resourceRentalBlocks = rentalBlockMap.get(eventResourceID);

        bookings.forEach((booking) => {
          const bookingID = booking.get('id');
          const recurringBookings = recurringMap.getIn([bookingID, 'bookings']);
          const bookingData = getBookingDetailForNewPermit(
            booking, RU, resourceRentalBlocks, recurringBookings
          );

          resource.booking_detail.push(bookingData);
          recurringBookings && recurringBookings.forEach((recurringBooking) => {
            const recurringBookingData = getBookingDetailForNewPermit(
              recurringBooking, RU, resourceRentalBlocks
            );
            resource.booking_detail.push(recurringBookingData);
          });
        });

        requestBody.event_resource.push(resource);
      }
      return eventResource;
    });

    return dispatch(requestNewPermitProceed(serializeData(requestBody)))
      .then(
        ({ payload: { body } }) => dispatch(handleProceedResponse(body)),
        (error) => {
          dispatch(handleProceedServerError(error)); // response header error
          dispatch(hideLoadingbar());
          return Promise.reject(error);
        }
      );
  };

export const getBookingCountAction = () =>
(dispatch, getState) => {
  const bookingPanel = getState().bookingPanel;
  const editableBookingsCount = bookingPanel.get('resourceMap') &&
    bookingPanel.get('resourceMap').toList()
      .map(resource => resource.get('bookings').size)
      .reduce((count, baseBookingsSize) => count + baseBookingsSize, 0);

  const recurringBookingsCount = bookingPanel.get('recurringMap') &&
    bookingPanel.get('recurringMap').toList()
      .map(baseBooking => baseBooking.get('bookings').size)
      .reduce((count, recurringBookingsSize) => count + recurringBookingsSize, 0);
  return editableBookingsCount + recurringBookingsCount;
};

export const getEditableBookings = () =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  const resourceBookingsArr = bookingPanel.get('resourceMap') &&
    bookingPanel.get('resourceMap').toList()
      .map(resource => resource.get('bookings'));
  const recurringBookingArr = bookingPanel.get('recurringMap') &&
    bookingPanel.get('recurringMap').toList()
      .map(baseBooking => baseBooking.get('bookings'));

  const baseBookings = resourceBookingsArr &&
    resourceBookingsArr.flatten(true).filter(book => book);
  const recurringBookings = recurringBookingArr &&
    recurringBookingArr.flatten(true).filter(book => book);
  return baseBookings.concat(recurringBookings);
};

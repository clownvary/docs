import { fromJS } from 'immutable';
import isUndefined from 'lodash/isUndefined';
import reservationPeriodUnit from '../consts/reservationPeriodUnit';
import { bookingAPIErrorType } from '../consts/bookingConflict';

export const EARLIER_MSG = 'Start Time must be earlier than End Time.';
export const BOOKINGPANEL_VALIDATION_SET_CLIENT_ERRORS = 'BOOKINGPANEL_VALIDATION_SET_CLIENT_ERRORS';
export const BOOKINGPANEL_VALIDATION_UPDATE_ERROR = 'BOOKINGPANEL_VALIDATION_UPDATE_ERROR';
export const BOOKINGPANEL_VALIDATION_SET_SERVER_ERRORS = 'BOOKINGPANEL_VALIDATION_SET_SERVER_ERRORS';
export const BOOKINGPANEL_VALIDATION_UPDATE_BOOKINGS_OVERRIDE_STATUS = 'BOOKINGPANEL_VALIDATION_UPDATE_BOOKINGS_OVERRIDE_STATUS';
/**
 *  var ClientError = {
      // The error collections of all the other detail errors, used for error display
      clientMessages: [],
      eventName: true,
      scheduleTypeID: true,
      resources: {
        [resourceID]: {
          eventType: true
        }
      },
      bookings: {
        [bookingID]: {
          attendance:  true,
          dateRangeID: true,
          rentalBlockID: true,
          datetime: true,
          overrideRentalblockError: true
        }
      }
    }

    var ServerError = {
      // The error collections of all the other detail errors, used for error display
      // other exception of the server, error code 1050 is the bookings more than limit of 700 error
      code: null,
      serverMessages: [],
      conflictNumber: 0,
      belowMinimumNumber: 0,
      overMaximumNumber: 0,
      eventName: 'This event name has been used by another event.',
      resources: {
        [resourceID]: {
          eventTypeID: "Event type is invalid for Equipment2.",
        }
      },
      bookings: {
        [bookingID]: {
          attendance: "Attendees for Shirly-Hour-MaxAttendeeAtOneTime2
            is more than the required maximum (2) .\n",
          datetimeConflict: {
            type: "disable_for_facility_setting", // "closed"/"holiday"
            reason: "Conflict with bookings on temporary Permit.\n ",
            isIgnoreEnabled: false, // true for closed and holiday
            isOverrided: false
          },
          datetimeAdvance: {
            type: "below_advance_minimum", // over_advance_maximum
            reason: 'Shirly-Minute_AdvanceMin2Max3 must be booked at least 2 day(s) in advance.',
            isOverrided: false,
          },
          datetime: "Shirly-hour-PreventFurUse cannot be reserved because
            of 'Prevent Further Use'.\n"
        }
      }
    }
 */
function getClientMessages(
  eventFieldsRequired,
  eventTypeRequired,
  attendanceRequired,
  rentalBlockRequired,
  dateRangeRequired,
  startDatetimeBiggerError
) {
  const clientMessages = [];

  if (eventFieldsRequired.length > 0) {
    clientMessages.push(`Field${eventFieldsRequired.length > 1 ? 's' : ''} ${eventFieldsRequired.join(', ')} cannot be empty.`);
  }
  if (eventTypeRequired.length > 0) {
    clientMessages.push(`Event Type for ${eventTypeRequired.join(' & ')} cannot be empty.`);
  }
  if (attendanceRequired.length > 0) {
    clientMessages.push(`Attendees for ${attendanceRequired.join(' & ')} cannot be empty.`);
  }
  if (rentalBlockRequired.length > 0) {
    clientMessages.push(`Please specify Rental Block for ${rentalBlockRequired.join(', ')}.`);
  }
  if (dateRangeRequired.length > 0) {
    clientMessages.push(`Please specify Date Range for ${dateRangeRequired.join(', ')}.`);
  }
  if (startDatetimeBiggerError.length > 0) {
    clientMessages.push(EARLIER_MSG);
  }

  return clientMessages;
}

const setClientBookingError = (
  booking, bookingID, bookingRU, resourceName, error,
  attendanceRequired,
  dateRangeRequired,
  rentalBlockRequired,
  startDatetimeBiggerError
) => {
  const errorBooking = error.bookings[bookingID] ? error.bookings[bookingID] : {};
  let hasBookingErr = false;

  if (!booking.get('attendance')) {
    hasBookingErr = true;
    errorBooking.attendance = true;
    if (attendanceRequired.indexOf(resourceName) === -1) {
      attendanceRequired.push(resourceName);
    }
  }

  if (bookingRU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
    if (booking.get('dateRangeID') === -1) {
      hasBookingErr = true;
      errorBooking.dateRangeID = true;

      if (dateRangeRequired.indexOf(resourceName) === -1) {
        dateRangeRequired.push(resourceName);
      }
    }
  } else if (bookingRU === reservationPeriodUnit.RENTAL_BLOCK) {
    if (booking.get('rentalBlockID') === -1) {
      hasBookingErr = true;
      errorBooking.rentalBlockID = true;

      if (rentalBlockRequired.indexOf(resourceName) === -1) {
        rentalBlockRequired.push(resourceName);
      }
    }
  } else if (booking.get('momentEventStart').isSameOrAfter(booking.get('momentEventEnd'))) {
    errorBooking.datetime = true;
    hasBookingErr = true;
    if (startDatetimeBiggerError.indexOf(resourceName) === -1) {
      startDatetimeBiggerError.push(resourceName);
    }
  }

  if (hasBookingErr) {
    error.bookings[bookingID] = errorBooking;
  }
};

export const getClientError = (bookingPanel, resourceMap) => {
  const bookingPanelResourceMap = bookingPanel.get('resourceMap');
  const bookingPanelRecurringMap = bookingPanel.get('recurringMap');
  const error = {
    resources: {},
    bookings: {}
  };
  const eventFieldsRequired = [];
  const eventTypeRequired = [];
  const attendanceRequired = [];
  const rentalBlockRequired = [];
  const dateRangeRequired = [];
  const startDatetimeBiggerError = [];

  // client validate not empty fields
  if (!bookingPanel.get('eventName').trim()) {
    eventFieldsRequired.push('Event Name');
    error.eventName = true;
  }
  if (!bookingPanel.get('scheduleTypeID') || bookingPanel.get('scheduleTypeID') === -1) {
    eventFieldsRequired.push('Schedule Type');
    error.scheduleTypeID = true;
  }

  bookingPanelResourceMap.map((resource, resourceID) => {
    const bookings = resource.get('bookings');
    const resourceName = resourceMap.getIn([resourceID, 'resourceName']);
    const bookingRU = resourceMap.getIn([resourceID, 'reservationPeriodUnit']);
    if (bookings.size > 0) {
      if (!resource.get('eventTypeID') || resource.get('eventTypeID') === -1) {
        eventTypeRequired.push(resourceName);
        error.resources[resourceID] = { eventTypeID: true };
      }

      bookings.forEach((booking) => {
        const bookingID = booking.get('id');

        setClientBookingError(
          booking, bookingID, bookingRU, resourceName, error,
          attendanceRequired,
          dateRangeRequired,
          rentalBlockRequired,
          startDatetimeBiggerError
        );

        const recurringBookings = bookingPanelRecurringMap.getIn([bookingID, 'bookings']);
        if (recurringBookings && recurringBookings.size) {
          recurringBookings.forEach((recurringBooking) => {
            const recurringBookingID = recurringBooking.get('id');
            setClientBookingError(
              booking, recurringBookingID, bookingRU, resourceName, error,
              attendanceRequired,
              dateRangeRequired,
              rentalBlockRequired,
              startDatetimeBiggerError
            );
          });
        }
      });
    }
    return resource;
  });

  error.clientMessages = getClientMessages(
    eventFieldsRequired,
    eventTypeRequired,
    attendanceRequired,
    rentalBlockRequired,
    dateRangeRequired,
    startDatetimeBiggerError
  );
  error.serverMessages = [];
  return error;
};

export const setClientErrorsAction = error => (dispatch, getState) => {
  const { bookingPanel } = getState();
  const { bookings: errorBookings } = error;
  let recurringMap = bookingPanel.get('recurringMap');

  recurringMap = recurringMap.map((baseBookingInfo) => {
    const recurringBookings = baseBookingInfo.get('bookings');
    const hasRecurringBookingErr = recurringBookings.some(recurBooking => !!errorBookings[recurBooking.get('id')]);
    if (hasRecurringBookingErr) {
      return baseBookingInfo.set('expanded', true);
    }
    return baseBookingInfo;
  });

  dispatch({
    type: BOOKINGPANEL_VALIDATION_SET_CLIENT_ERRORS,
    payload: {
      recurringMap,
      error: fromJS(error)
    }
  });
};

const bookingPanelUpdateClientError = newError => ({
  type: BOOKINGPANEL_VALIDATION_UPDATE_ERROR,
  payload: {
    error: newError
  }
});

export const bookingPanelValidationClearClientErrAction = () => (dispatch, getState) => {
  const { bookingPanel, configurationData } = getState();
  const resourceMap = configurationData.get('resourceMap');
  const bookingPanelError = bookingPanel.get('error');

  if (!bookingPanelError.get('clientMessages').size) {
    return false;
  }

  const newError = getClientError(bookingPanel, resourceMap);

  return dispatch(bookingPanelUpdateClientError(fromJS(newError)));
};

export const bookingPanelSetOverrideRentalBlockErrorAction = (bookingID, overrideError = false) =>
  (dispatch, getState) => {
    const { bookingPanel } = getState();
    let bookingPanelError = bookingPanel.get('error');
    let clientErrors = bookingPanelError.get('clientMessages');
    const earlierMsgIndex = clientErrors.indexOf(EARLIER_MSG);

    if (overrideError && earlierMsgIndex < 0) {
      clientErrors = clientErrors.push(EARLIER_MSG);
    }

    if (!overrideError && earlierMsgIndex > -1) {
      clientErrors = clientErrors.splice(earlierMsgIndex);
    }

    bookingPanelError = bookingPanelError.set('clientMessages', clientErrors);

    if (overrideError) {
      if (!bookingPanelError.get('bookings')) {
        bookingPanelError = bookingPanelError.set('bookings', fromJS({}));
      }

      if (!bookingPanelError.getIn(['bookings', bookingID])) {
        bookingPanelError = bookingPanelError.setIn(['bookings', bookingID], fromJS({}));
      }
      bookingPanelError = bookingPanelError.setIn(['bookings', bookingID, 'overrideRentalblockError'], true);
    } else {
      bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID, 'overrideRentalblockError']);
    }

    return dispatch(bookingPanelUpdateClientError(bookingPanelError));
  };

export const getServerMessages = (error) => {
  const serverMessages = [];
  const errorBookings = error.get('bookings');
  const errorResources = error.get('resources');
  let conflictNumber = 0;
  let belowMinimumNumber = 0;
  let overMaximumNumber = 0;

  errorResources && errorResources.forEach((errorResource) => {
    if (errorResource.get('eventTypeID')) {
      serverMessages.push(errorResource.get('eventTypeID'));
    }
  });

  errorBookings && errorBookings.forEach((errorBooking) => {
    const datetimeConflict = errorBooking.get('datetimeConflict');
    const datetimeAdvance = errorBooking.get('datetimeAdvance');
    const errorAttendance = errorBooking.get('attendance');
    const otherDatetimeError = errorBooking.get('datetime');
    let attendanceErrorContent = '';
    let datetimeErrorContent = '';

    if (datetimeConflict) {
      conflictNumber += 1;
    }

    if (datetimeAdvance && datetimeAdvance.get('type') === bookingAPIErrorType.BELOW_ADVANCE_MINIMUM) {
      belowMinimumNumber += 1;
    }

    if (datetimeAdvance && datetimeAdvance.get('type') === bookingAPIErrorType.OVER_ADVANCE_MAXIMUM) {
      overMaximumNumber += 1;
    }

    if (errorAttendance) {
      attendanceErrorContent = errorAttendance;
    }

    if (otherDatetimeError) {
      datetimeErrorContent = otherDatetimeError;
    }

    if (attendanceErrorContent || datetimeErrorContent) {
      const attendanceContents = attendanceErrorContent ? attendanceErrorContent.split('\n') : [];
      const datetimeContents = datetimeErrorContent ? datetimeErrorContent.split('\n') : [];
      const contents = attendanceContents.concat(datetimeContents);

      contents.forEach((content) => {
        if (content) {
          if (serverMessages.indexOf(content) === -1) {
            serverMessages.push(content);
          }
        }
      });
    }
  });

  return {
    serverMessages,
    conflictNumber,
    belowMinimumNumber,
    overMaximumNumber
  };
};

const bookingPanelErrorUpdateAction = error => ({
  type: BOOKINGPANEL_VALIDATION_UPDATE_ERROR,
  payload: {
    error: error.merge(getServerMessages(error))
  }
});

const bookingPanelUpdateBookingsOverrideStatusAction = (resourceMap, recurringMap, error) => ({
  type: BOOKINGPANEL_VALIDATION_UPDATE_BOOKINGS_OVERRIDE_STATUS,
  payload: {
    resourceMap,
    recurringMap,
    error: error.merge(getServerMessages(error))
  }
});

export const bookingPanelClearEventNameErrAction = () => (dispatch, getState) => {
  const { bookingPanel } = getState();
  const bookingPanelError = bookingPanel.get('error');

  dispatch(bookingPanelErrorUpdateAction(bookingPanelError.remove('eventName')));
};

export const bookingPanelClearScheduleTypeErrAction = () => (dispatch, getState) => {
  const { bookingPanel } = getState();
  const bookingPanelError = bookingPanel.get('error');

  dispatch(bookingPanelErrorUpdateAction(bookingPanelError.remove('scheduleTypeID')));
};

// eventTypeID
export const bookingPanelClearResourceErrAction = resourceID =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  let bookingPanelError = bookingPanel.get('error');
  /**
   * Because for now, we only validate the eventType for the resource,
   * so can delete the resource directly
   */
  bookingPanelError = bookingPanelError.removeIn(['resources', resourceID]);

  dispatch(bookingPanelErrorUpdateAction(bookingPanelError));
};

export const bookingPanelCleanAttendanceError = (bookingPanelError, bookingID) => {
  const bookingError = bookingPanelError.getIn(['bookings', bookingID]);

  if (bookingError && bookingError.get('attendance')) {
    bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID, 'attendance']);
  }

  return bookingPanelError;
};

const getTheConflictKey = (errorBooking) => {
  const conflictError = (errorBooking && errorBooking.get('datetimeConflict'));
  const conflictErrorType = conflictError && conflictError.get('type');

  if (conflictErrorType === bookingAPIErrorType.CONFLICT) {
    return 'ignoreConflict';
  }
  if (conflictErrorType === bookingAPIErrorType.CLOSED) {
    return 'ignoreClosetime';
  }
  if (conflictErrorType === bookingAPIErrorType.SKIP_DATE) {
    return 'ignoreSkipdate';
  }
  return '';
};

export const bookingPanelOverrideBookingConflictAction =
(errorValue, resourceID, bookingID, isRecurring, baseBookingID) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  let bookingPanelError = bookingPanel.get('error');
  let errorBookings = bookingPanelError.get('bookings');
  let isOverrideAllConflict = false;
  let resourceMap = bookingPanel.get('resourceMap');
  let recurringMap = bookingPanel.get('recurringMap');

  if (isUndefined(bookingID)) {
    isOverrideAllConflict = true;
  }

  if (isOverrideAllConflict) {
    errorBookings = errorBookings.map((errorBooking) => {
      if (errorBooking && errorBooking.get('datetimeConflict')) {
        return errorBooking.setIn(['datetimeConflict', 'isOverrided'], errorValue);
      }

      return errorBooking;
    });
    bookingPanelError = bookingPanelError.set('bookings', errorBookings);
    resourceMap = resourceMap.map((resource) => {
      const resourceBookings = resource.get('bookings');
      const overridedResourceBookings = resourceBookings.map((book) => {
        const bookID = book.get('id');
        const bookingError = errorBookings.get(bookID);
        const hasConflictError = bookingError && bookingError.get('datetimeConflict');

        if (hasConflictError) {
          const conflictKey = getTheConflictKey(bookingError);
          if (conflictKey) {
            return book.set(conflictKey, errorValue);
          }
        }
        return book;
      });
      return resource.set('bookings', overridedResourceBookings);
    });
    recurringMap = recurringMap.map((baseBooking) => {
      const recurringBookings = baseBooking.get('bookings');
      const overridedRecurringBookings = recurringBookings.map((book) => {
        const bookID = book.get('id');
        const bookingError = errorBookings.get(bookID);
        const hasConflictError = bookingError && bookingError.get('datetimeConflict');

        if (hasConflictError) {
          const conflictKey = getTheConflictKey(bookingError);
          if (conflictKey) {
            return book.set(conflictKey, errorValue);
          }
        }
        return book;
      });
      return baseBooking.set('bookings', overridedRecurringBookings);
    });
  } else {
    bookingPanelError = bookingPanelError.setIn(['bookings', bookingID, 'datetimeConflict', 'isOverrided'], errorValue);
    const conflictKey = getTheConflictKey(bookingPanelError.getIn(['bookings', bookingID]));
    let bookingIndex = -1;

    if (isRecurring) {
      bookingIndex = recurringMap.getIn([baseBookingID, 'bookings']).findIndex(
        book => book.get('id') === bookingID
      );
      recurringMap = recurringMap.setIn([baseBookingID, 'bookings', bookingIndex, conflictKey], errorValue);
    } else {
      bookingIndex = resourceMap.getIn([resourceID, 'bookings']).findIndex(
        book => book.get('id') === bookingID
      );
      resourceMap = resourceMap.setIn([resourceID, 'bookings', bookingIndex, conflictKey], errorValue);
    }
  }

  dispatch(bookingPanelUpdateBookingsOverrideStatusAction(
    resourceMap, recurringMap, bookingPanelError));
};

export const bookingPanelOverrideBookingAdvanceErrorAction =
(errorKey, errorValue, resourceID, bookingID, isRecurring, baseBookingID, isMinumum = true) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  let bookingPanelError = bookingPanel.get('error');
  let errorBookings = bookingPanelError.get('bookings');
  let isOverrideAllAdvancedError = false;
  let resourceMap = bookingPanel.get('resourceMap');
  let recurringMap = bookingPanel.get('recurringMap');

  if (isUndefined(bookingID)) {
    isOverrideAllAdvancedError = true;
  }

  if (isOverrideAllAdvancedError) {
    errorBookings = errorBookings.map((errorBooking) => {
      const datetimeAdvanceError = errorBooking && errorBooking.get('datetimeAdvance');
      const hasDateTimeAdvanceError = datetimeAdvanceError &&
        (
          (isMinumum && datetimeAdvanceError.get('type') === bookingAPIErrorType.BELOW_ADVANCE_MINIMUM) ||
          (!isMinumum && datetimeAdvanceError.get('type') === bookingAPIErrorType.OVER_ADVANCE_MAXIMUM)
        );
      if (hasDateTimeAdvanceError) {
        return errorBooking.setIn(['datetimeAdvance', 'isOverrided'], errorValue);
      }

      return errorBooking;
    });
    bookingPanelError = bookingPanelError.set('bookings', errorBookings);
    resourceMap = resourceMap.map((resource) => {
      const resourceBookings = resource.get('bookings');
      const overridedResourceBookings = resourceBookings.map((book) => {
        const bookID = book.get('id');
        const datetimeAdvanceError = errorBookings.get(bookID) && errorBookings.getIn([bookID, 'datetimeAdvance']);
        const hasDateTimeAdvanceError = datetimeAdvanceError &&
          (
            (isMinumum && datetimeAdvanceError.get('type') === bookingAPIErrorType.BELOW_ADVANCE_MINIMUM) ||
            (!isMinumum && datetimeAdvanceError.get('type') === bookingAPIErrorType.OVER_ADVANCE_MAXIMUM)
          );
        if (hasDateTimeAdvanceError) {
          return book.set(errorKey, errorValue);
        }
        return book;
      });
      return resource.set('bookings', overridedResourceBookings);
    });
    recurringMap = recurringMap.map((baseBooking) => {
      const recurringBookings = baseBooking.get('bookings');
      const overridedRecurringBookings = recurringBookings.map((book) => {
        const bookID = book.get('id');
        const datetimeAdvanceError = errorBookings.get(bookID) && errorBookings.getIn([bookID, 'datetimeAdvance']);
        const hasDateTimeAdvanceError = datetimeAdvanceError &&
          (
            (isMinumum && datetimeAdvanceError.get('type') === bookingAPIErrorType.BELOW_ADVANCE_MINIMUM) ||
            (!isMinumum && datetimeAdvanceError.get('type') === bookingAPIErrorType.OVER_ADVANCE_MAXIMUM)
          );
        if (hasDateTimeAdvanceError) {
          return book.set(errorKey, errorValue);
        }
        return book;
      });
      return baseBooking.set('bookings', overridedRecurringBookings);
    });
  } else {
    bookingPanelError = bookingPanelError.setIn(['bookings', bookingID, 'datetimeAdvance', 'isOverrided'], errorValue);
    if (isRecurring) {
      const bookingIndex = recurringMap.getIn([baseBookingID, 'bookings']).findIndex(
        book => book.get('id') === bookingID
      );
      recurringMap = recurringMap.setIn([baseBookingID, 'bookings', bookingIndex, errorKey], errorValue);
    } else {
      const bookingIndex = resourceMap.getIn([resourceID, 'bookings']).findIndex(
        book => book.get('id') === bookingID
      );
      resourceMap = resourceMap.setIn([resourceID, 'bookings', bookingIndex, errorKey], errorValue);
    }
  }

  dispatch(bookingPanelUpdateBookingsOverrideStatusAction(
    resourceMap, recurringMap, bookingPanelError));
};

export const bookingPanelDeleteBookingErrAction =
bookingID => (dispatch, getState) => {
  const { bookingPanel } = getState();
  let bookingPanelError = bookingPanel.get('error');

  bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID]);
  if (bookingPanelError.get('code') === '1050') {
    bookingPanelError = bookingPanelError.set('code', null);
  }
  dispatch(bookingPanelErrorUpdateAction(bookingPanelError));
};

export const bookingPanelDeleteBaseAndRecurringBookingsErrAction =
bookingID => (dispatch, getState) => {
  const { bookingPanel } = getState();
  const recurringMap = bookingPanel.get('recurringMap');
  const recurringBookings = recurringMap.getIn([bookingID, 'bookings']);
  let bookingPanelError = bookingPanel.get('error');
  const errorBookings = bookingPanelError.get('bookings');

  if (bookingPanelError.get('code') === '1050') {
    bookingPanelError = bookingPanelError.set('code', null);
  }

  bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID]);
  recurringBookings.forEach((recurBooking) => {
    const recurBookingID = recurBooking.get('id');
    if (errorBookings && errorBookings.get(recurBookingID)) {
      bookingPanelError = bookingPanelError.removeIn(['bookings', recurBookingID]);
    }
  });

  dispatch(bookingPanelErrorUpdateAction(bookingPanelError));
};

export const bookingPanelDeleteAllBookingsErrAction = () => ({
  type: BOOKINGPANEL_VALIDATION_UPDATE_ERROR,
  payload: {
    error: fromJS({
      clientMessages: [],
      serverMessages: []
    })
  }
});

// start date/end date/start time/end time
export const bookingPanelCleanDatetimeError =
(bookingPanelError, bookingID) => {
  const errorBooking = bookingPanelError.getIn(['bookings', bookingID]);
  if (errorBooking) {
    bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID, 'datetime']);
    bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID, 'datetimeConflict']);
    bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID, 'datetimeAdvance']);
  }

  return bookingPanelError;
};

/**
 * @param {String} errorKey
 *  eventName/scheduleTypeID/eventTypeID(resource level)/
 *  overrideAdvanceMinimum(booking)/overrideAdvanceMaximum(booking)/
 *  overrideConflict/delete/deleteBaseAndRecurringBookings/deleteAllBookings/setupCleanupMinutes
 * @param {String|Number} resourceID
 * @param {String|Number} bookingID
 */
export const bookingPanelClearErrAction = (
  { errorKey, resourceID, bookingID, errorValue, isRecurring, baseBookingID }
) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  const {
    clientMessages,
    serverMessages,
    eventName,
    scheduleTypeID,
    resources,
    bookings,
    conflictNumber,
    belowMinimumNumber,
    overMaximumNumber
  } = bookingPanel.get('error').toObject();

  if (errorKey === 'deleteAllBookings') {
    return dispatch(bookingPanelDeleteAllBookingsErrAction());
  }

  if (clientMessages && clientMessages.size) {
    return dispatch(bookingPanelValidationClearClientErrAction());
  }

  const hasServerError = (serverMessages && serverMessages.size) ||
    conflictNumber > 0 || belowMinimumNumber > 0 || overMaximumNumber > 0 ||
    !!eventName;
  if (hasServerError) {
    if (errorKey === 'eventName' && eventName) {
      return dispatch(bookingPanelClearEventNameErrAction());
    }

    if (errorKey === 'scheduleTypeID' && scheduleTypeID) {
      return dispatch(bookingPanelClearScheduleTypeErrAction());
    }

    if (errorKey === 'eventTypeID' && resources.get(resourceID) && resources.getIn([resourceID, 'eventTypeID'])) {
      return dispatch(bookingPanelClearResourceErrAction(resourceID));
    }

    if (errorKey === 'overrideConflict') {
      return dispatch(bookingPanelOverrideBookingConflictAction(
        errorValue, resourceID, bookingID, isRecurring, baseBookingID
      ));
    }

    if (errorKey === 'overrideAdvanceMinimum') {
      return dispatch(bookingPanelOverrideBookingAdvanceErrorAction(
        errorKey, errorValue, resourceID, bookingID, isRecurring, baseBookingID
      ));
    }

    if (errorKey === 'overrideAdvanceMaximum') {
      return dispatch(bookingPanelOverrideBookingAdvanceErrorAction(
        errorKey, errorValue, resourceID, bookingID, isRecurring, baseBookingID, false
      ));
    }

    if (errorKey === 'deleteSingleBooking' && bookings.get(bookingID)) {
      return dispatch(bookingPanelDeleteBookingErrAction(bookingID));
    }

    if (errorKey === 'deleteBaseAndRecurringBookings') {
      return dispatch(bookingPanelDeleteBaseAndRecurringBookingsErrAction(bookingID));
    }
  }

  return false;
};

export const setServerErrorsAction = (errorResult, recurringMap) => {
  const error = {
    code: null,
    serverMessages: [],
    clientMessages: [],
    conflictNumber: 0,
    belowMinimumNumber: 0,
    overMaximumNumber: 0,
    bookings: {},
    resources: {}
  };
  const { event_resource: errorEventResource } = errorResult;
  let newRecurringMap = recurringMap;

  errorEventResource.forEach((resource) => {
    const resourceID = `${resource.resource_id}`;
    const resourceError = {};
    let hasResourceError = false;

    resource.booking_detail.forEach((detail) => {
      const baseBookingID = detail.master_booking_identifier;
      const bookingErrors = detail.error_results;
      const bookingID = detail.pending_id || detail.resource_booking_id;
      const errorBooking = {};
      let hasBookingError = false;

      if (bookingErrors && bookingErrors.length > 0) {
        bookingErrors.forEach(({ error_type: errorType, error_content: errorContent }) => {
          switch (errorType) {
            case bookingAPIErrorType.INVALID_EVENT_TYPE:
              resourceError.eventTypeID = errorContent;
              hasResourceError = true;
              break;
            case bookingAPIErrorType.CONFLICT:
            case bookingAPIErrorType.CLOSED:
            case bookingAPIErrorType.SKIP_DATE:
              errorBooking.datetimeConflict = {
                type: errorType,
                reason: errorContent,
                isIgnoreEnabled: detail.enable_ignore_conflict,
                ignoreType: detail.ignore_conflict_type,
                isOverrided: false
              };
              hasBookingError = true;
              break;
            case bookingAPIErrorType.BELOW_ADVANCE_MINIMUM:
            case bookingAPIErrorType.OVER_ADVANCE_MAXIMUM:
              errorBooking.datetimeAdvance = {
                type: errorType,
                reason: errorContent,
                ignoreType: detail.ignore_conflict_type,
                isOverrided: false
              };
              hasBookingError = true;
              break;
            case bookingAPIErrorType.MISSING_QTY:
            case bookingAPIErrorType.TOO_LESS:
            case bookingAPIErrorType.TOO_MANY:
              errorBooking.attendance = errorContent;
              hasBookingError = true;
              break;
            case bookingAPIErrorType.EVENT_CAPACITY_TOO_LESS:
            case bookingAPIErrorType.EVENT_CAPACITY_TOO_MANY:
              errorBooking.attendance = errorContent;
              errorBooking.eventCapacityLimit = true;
              hasBookingError = true;
              break;
            case bookingAPIErrorType.INVALID_RENTAL_BLOCK:
              // Has bug, not define the behavior yet
              break;
            default:
              errorBooking.datetime = errorContent;
              hasBookingError = true;
              break;
          }
        });
      }

      if (hasBookingError) {
        errorBooking.baseBookingID = baseBookingID;
        error.bookings[bookingID] = errorBooking;

        if (baseBookingID) {
          newRecurringMap = newRecurringMap.setIn([baseBookingID, 'expanded'], true);
        }
      }
    });

    if (hasResourceError) {
      error.resources[resourceID] = resourceError;
    }
  });

  if (errorResult.event_name_unique_check_error) {
    error.eventName = 'This event name has been used by another event.';
  }
  const immutableError = fromJS(error);
  return {
    type: BOOKINGPANEL_VALIDATION_SET_SERVER_ERRORS,
    payload: {
      error: immutableError.merge(getServerMessages(immutableError)),
      recurringMap: newRecurringMap
    }
  };
};

export const getConflictMessage = conflictNumber =>
  `Conflict Check: ${conflictNumber} conflict${conflictNumber > 1 ? 's' : ''} found.`;

export const getErrorsString = number => `error${number === 1 ? '' : 's'}`;

/**
 * @param {number} advancedErrorNummber belowMinimumNumber/overMaximumNumber
 */
export const getAdvanceErrorMessage = (advancedErrorNummber, isMinumum) => {
  if (isMinumum) {
    return `Advanced setting minimum check: ${advancedErrorNummber} ${getErrorsString(advancedErrorNummber)} found. `;
  }
  return `Advanced setting maximum check: ${advancedErrorNummber} ${getErrorsString(advancedErrorNummber)} found. `;
};

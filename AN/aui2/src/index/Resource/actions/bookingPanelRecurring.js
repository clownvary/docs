
import uniqueId from 'lodash/uniqueId';
import { fromJS, is } from 'immutable';
import Globalize from 'react-base-ui/lib/services/i18n';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';

import URL from '../urls';
import { getEditableBookings } from './bookingPanel';
import { getBookingID, toExceptionDates } from '../utils/recurring';
import reservationPeriodUnit from '../consts/reservationPeriodUnit';
import {
  formatBooking,
  formatEventResourceBooking,
  removeRecurringBookingProperties,
  convertBaseBookingToNormalBooking,
  removeBaseBookingProperties
} from '../utils/bookingHelper';
import { getServerMessages } from './bookingPanelValidation';

export const BOOKINGPANEL_SET_RECURRING_BOOKING_EXPANDED = 'BOOKINGPANEL_SET_RECURRING_BOOKING_EXPANDED';
export const BOOKINGPANEL_SET_RECURRING_BOOKINGS = 'BOOKINGPANEL_SET_RECURRING_BOOKINGS';
export const BOOKINGPANEL_ADD_WAITING_APPLIED_BASEBOOKINGIDS = 'BOOKINGPANEL_ADD_WAITING_APPLIED_BASEBOOKINGIDS';
export const BOOKINGPANEL_DELETE_WAITING_APPLIED_BASEBOOKINGIDS = 'BOOKINGPANEL_DELETE_WAITING_APPLIED_BASEBOOKINGIDS';
export const BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_SUCCESS = 'BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_SUCCESS';
export const BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_FAIL = 'BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_FAIL';
export const BOOKINGPANEL_CONVERT_RECURRING_BOOKING_TO_NORMAL_BOOKING = 'BOOKINGPANEL_CONVERT_RECURRING_BOOKING_TO_NORMAL_BOOKING';
export const BOOKINGPANEL_FLUSH_ALL_RECURRING_BOOKINGS_AFTER_BOOKING_PANEL_CLOSED = 'BOOKINGPANEL_FLUSH_ALL_RECURRING_BOOKINGS_AFTER_BOOKING_PANEL_CLOSED';

export const applyRecurringBookingsAsyncAction = payload => ({
  types: ['', '', ''],
  promise: API => API.post(URL.applyRecurringBookings, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }),
  meta: {
    ignoreBusinessErrors: true,
    ignoreSystemErrors: true
  }
});

export const addExceptionDateToBaseBooking = (
  baseBooking,
  recurringBooking
) => {
  const recurringExceptions = baseBooking.get('recurringExceptions') || fromJS([]);
  let exceptionDates = recurringExceptions.toSet();

  if (recurringBooking && recurringBooking.get('baseBookingID') === baseBooking.get('id')) {
    exceptionDates = exceptionDates.union([toExceptionDates(recurringBooking.toObject())]);
  }

  return baseBooking.set('recurringExceptions', exceptionDates.toList());
};

const getApplyToAllApiPayload = (baseBooking, dispatch, getState) => {
  const { initialData, configurationData, bookingPanel } = getState();
  const {
    batchID,
    eventID,
    receiptID,
    receiptEntryID
  } = initialData;
  const format = 'YYYY/MM/DD h:mm:ss a';
  const baseBookingID = baseBooking.get('id');
  const lastBaseBooking = bookingPanel.getIn(['changedBaseBookingMap', baseBookingID, 'basePatternBooking']);

  const startEventDatetime = DateTimeFormat.toString(lastBaseBooking.get('momentEventStart'));
  const endEventDatetime = DateTimeFormat.toString(lastBaseBooking.get('momentEventEnd'));
  const startScheduleDatetime = DateTimeFormat.toString(lastBaseBooking.get('momentStartScheduleDatetime'));
  const endScheduleDatetime = DateTimeFormat.toString(lastBaseBooking.get('momentEndScheduleDatetime'));

  const newStartEventDatetime = DateTimeFormat.formatDateTime(baseBooking.get('momentEventStart'), format);
  const newEndEventDatetime = DateTimeFormat.formatDateTime(baseBooking.get('momentEventEnd'), format);
  const newStartScheduleDatetime = DateTimeFormat.formatDateTime(baseBooking.get('momentStartScheduleDatetime'), format);
  const newEndScheduleDatetime = DateTimeFormat.formatDateTime(baseBooking.get('momentEndScheduleDatetime'), format);

  const editableBookings = dispatch(getEditableBookings());

  const resourceID = lastBaseBooking.get('resourceID');
  const strResourceID = `${resourceID}`;
  const resourceObject = configurationData.getIn(['resourceMap', strResourceID]);
  const {
    resourceName,
    resourceType,
    resourceNumber,
    reservationPeriodUnit: _reservationPeriodUnit
  } = resourceObject.toObject();

  const rentalBlock = baseBooking.get('rentalBlock');
  const rentalBlockID = baseBooking.get('rentalBlockID');
  const reservationType = _reservationPeriodUnit === reservationPeriodUnit.RENTAL_BLOCK ? 1 : 0;

  let rentalBlockId = -1;
  if (baseBooking.get('isRentalBlockOverride') && rentalBlock) {
    rentalBlockId = rentalBlock.getIn([0, 'id']);
  } else if (rentalBlockID) {
    rentalBlockId = rentalBlockID;
  }

  return {
    batch_id: batchID,
    receipt_id: receiptID,
    receipt_entry_id: receiptEntryID,
    event_id: eventID || -1,
    event_booking_count: editableBookings.count(),
    pattern: baseBooking.get('recurringPattern').toJS(),
    base: [{
      resource_booking_id: lastBaseBooking.get('resourceBookingID'),
      transaction_id: lastBaseBooking.get('transactionID'),
      resource_id: resourceID,
      resource_number: resourceNumber,
      resource_type: resourceType,
      resource_name: resourceName,
      reservation_period_unit: _reservationPeriodUnit,
      reservation_type: reservationType,
      quantity: baseBooking.get('attendance'),
      rental_block_id: rentalBlockId,
      date_range_id: lastBaseBooking.get('dateRangeID') || 0,
      start_event_datetime: startEventDatetime,
      end_event_datetime: endEventDatetime,
      start_schedule_datetime: startScheduleDatetime,
      end_schedule_datetime: endScheduleDatetime
    }],
    exception_date_list: baseBooking.get('recurringExceptions').toArray(),
    new_start_event_datetime: newStartEventDatetime,
    new_end_event_datetime: newEndEventDatetime,
    new_start_schedule_datetime: newStartScheduleDatetime,
    new_end_schedule_datetime: newEndScheduleDatetime
  };
};

const createRecurringBookings = (resource, baseBooking, bookings) => {
  const {
    resourceBookingID,
    transactionID,
    reservationType,
    rentalBlockID,
    dateRangeID,
    attendance,
    recurringEnabled,
    hasRecurring,
    expanded,
    recurringPattern,
    recurringExceptions,
    masterFacilityScheduleID,
    reservationPeriodUnit: baseReservationPeriodUnit,
    isRentalBlockOverride,
    overrideRentalBlock
  } = baseBooking;

  const basicBaseBooking = {
    transactionID,
    reservationType,
    rentalBlockID,
    dateRangeID,
    attendance,
    recurringEnabled,
    hasRecurring,
    expanded,
    recurringPattern,
    recurringExceptions,
    masterFacilityScheduleID,
    reservationPeriodUnit: baseReservationPeriodUnit,
    isRentalBlockOverride,
    overrideRentalBlock
  };
  const baseBookingID = `${getBookingID(baseBooking)}`;

  const recurringBookings = fromJS(bookings.map((booking) => {
    const pendingID = `pending_${resource.resourceID}_${uniqueId(Date.now())}`;

    const formatedBooking = formatBooking(formatEventResourceBooking(
      {
        ...(resourceBookingID ? basicBaseBooking : baseBooking),
        id: pendingID,
        isRecurring: true,
        ignoreSkipdate: false,
        ignoreClosetime: false,
        ignoreConflict: false,
        permitID: -1,
        currentEvent: true,
        ownerPendingReceipt: true,
        bookingAssignment: 0,
        resourceBookingID: 0,
        baseBookingID,
        startEventDatetime: DateTimeFormat.fromString(booking.start_event_datetime),
        endEventDatetime: DateTimeFormat.fromString(booking.end_event_datetime),
        pendingID
      },
      resource.resourceID,
      resource.setupMinutes,
      resource.cleanupMinutes
    ));

    delete formatedBooking.recurringPattern;
    return formatedBooking;
  }));

  return recurringBookings;
};

export const setRecurringBookingsAction = (bookings, baseBooking, resource, pattern) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  let finalResourceMap = bookingPanel.get('resourceMap');
  let finalRecurringMap = bookingPanel.get('recurringMap');

  if (bookings) {
    const recurringBookings = createRecurringBookings(resource, baseBooking, bookings);

    finalRecurringMap = finalRecurringMap.setIn([baseBooking.id, 'bookings'], recurringBookings);
    finalRecurringMap = finalRecurringMap.setIn([baseBooking.id, 'resourceID'], resource.resourceID);
    finalRecurringMap = finalRecurringMap.setIn([baseBooking.id, 'expanded'], false);

    finalResourceMap = finalResourceMap.updateIn(
      [resource.resourceID.toString(), 'bookings'],
      _bookings => _bookings && _bookings.map((_booking) => {
        if (_booking.get('id') === baseBooking.id) {
          return _booking.withMutations((b) => {
            b.set('baseBookingID', baseBooking.id);
            b.set('recurringPattern', fromJS(pattern));
            b.set('recurringExceptions', fromJS([]));
          });
        }
        return _booking;
      })
    );

    return dispatch({
      type: BOOKINGPANEL_SET_RECURRING_BOOKINGS,
      payload: {
        resourceMap: finalResourceMap,
        recurringMap: finalRecurringMap
      }
    });
  }

  return false;
};

export const setRecurringBookingExpandedAction = (bookingId, expanded) => ({
  type: BOOKINGPANEL_SET_RECURRING_BOOKING_EXPANDED,
  payload: {
    bookingId, expanded
  }
});

export const checkBaseBookingApplyAsyncAction = baseBooking => (dispatch, getState) => {
  const baseBookingID = baseBooking.get('id');
  const payload = getApplyToAllApiPayload(baseBooking, dispatch, getState);

  return dispatch(applyRecurringBookingsAsyncAction(payload)).then(
    (response) => {
      const errors = response.payload.body.errors;
      if (errors) {
        dispatch({
          type: BOOKINGPANEL_DELETE_WAITING_APPLIED_BASEBOOKINGIDS,
          payload: {
            ids: [baseBookingID]
          }
        });
      } else {
        dispatch({
          type: BOOKINGPANEL_ADD_WAITING_APPLIED_BASEBOOKINGIDS,
          payload: {
            ids: [baseBookingID]
          }
        });
      }
    }
  );
};

export const convertRecurringToNormalByBaseBookingAction =
  baseBooking => (dispatch, getState) => {
    const { bookingPanel } = getState();
    const resourceID = baseBooking.get('resourceID');
    const strResourceID = `${resourceID}`;
    const baseBookingID = baseBooking.get('id');

    let waitingMovedBookings = fromJS([]);
    let resourceMap = bookingPanel.get('resourceMap');
    let recurringMap = bookingPanel.get('recurringMap');
    let recurringBookings = recurringMap.getIn([baseBookingID, 'bookings']);
    let pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');

    recurringBookings = recurringBookings.filter((booking) => {
      const bookingID = booking.get('id');
      if (pendingMovedRecurringBookingMap.has(bookingID)) {
        pendingMovedRecurringBookingMap = pendingMovedRecurringBookingMap.delete(String(bookingID));
        waitingMovedBookings = waitingMovedBookings.push(booking.merge(fromJS({
          baseBookingID: null,
          isRecurring: false
        })));
        return false;
      }
      return true;
    });

    recurringMap = recurringMap.setIn(
      [baseBookingID, 'bookings'],
      recurringBookings
    );
    resourceMap = resourceMap.updateIn(
      [strResourceID, 'bookings'],
      bookings => bookings && bookings.concat(waitingMovedBookings)
    );

    return dispatch({
      type: BOOKINGPANEL_CONVERT_RECURRING_BOOKING_TO_NORMAL_BOOKING,
      payload: {
        resourceMap,
        recurringMap,
        pendingMovedRecurringBookingMap
      }
    });
  };

export const applyToAllAsyncAction = (resourceID, baseBookingID) => (dispatch, getState) => {
  let bookingPanel = getState().bookingPanel;
  let resourceMap = bookingPanel.get('resourceMap');
  let baseBookingIndex;
  const eventResource = resourceMap.get(resourceID);
  let baseBooking = eventResource
    .get('bookings')
    .find((booking, i) => {
      const isBaseBooking = booking.get('id') === baseBookingID;
      if (isBaseBooking) {
        baseBookingIndex = i;
      }
      return isBaseBooking;
    });

  const payload = getApplyToAllApiPayload(baseBooking, dispatch, getState);

  return dispatch(applyRecurringBookingsAsyncAction(payload)).then(
    (response) => {
      const {
        headers: { response_message: errorMessage },
        body: {
          recurring_bookings: _recurringBookings,
          new_exception_date_list: newExceptionDateList,
          new_pattern_content: newPatternContent,
          errors
        }
      } = response.payload;
      const waitingAppliedBaseBookingIds = bookingPanel.get('waitingAppliedBaseBookingIds')
        .filter(_id => _id !== baseBookingID);

      if (!errors) {
        dispatch(convertRecurringToNormalByBaseBookingAction(baseBooking));
        bookingPanel = getState().bookingPanel;
        const originalBookingPanelError = bookingPanel.get('error');
        let bookingPanelError = originalBookingPanelError;

        resourceMap = bookingPanel.get('resourceMap');

        const changedBaseBookingMap = bookingPanel.get('changedBaseBookingMap').delete(baseBookingID);

        const newRecurringBookings = convertCasingPropObj(_recurringBookings);
        let recurringMap = bookingPanel.get('recurringMap');
        let recurringBookings = recurringMap.getIn([baseBookingID, 'bookings']);

        baseBooking = baseBooking.set('recurringPattern', fromJS(newPatternContent));
        baseBooking = baseBooking.set('recurringExceptions', fromJS(newExceptionDateList));
        resourceMap = resourceMap.setIn([resourceID, 'bookings', baseBookingIndex], baseBooking);

        if (recurringBookings.size > newRecurringBookings.length) {
          recurringBookings = recurringBookings.take(newRecurringBookings.length);
        }

        recurringBookings = recurringBookings.map((booking, i) => {
          const bookingID = booking.get('id');
          const newBooking = newRecurringBookings[i];

          const startEventDatetime = Globalize.formatDateTime(
            DateTimeFormat.fromString(newBooking.startEventDatetime)
          );
          const endEventDatetime = Globalize.formatDateTime(
            DateTimeFormat.fromString(newBooking.endEventDatetime)
          );

          bookingPanelError = bookingPanelError.removeIn(['bookings', bookingID]);

          return booking.merge(
            fromJS(
              formatBooking(
                formatEventResourceBooking(
                  {
                    ...booking.toJS(),
                    rentalBlockID: newBooking.rentalBlockID,
                    attendance: newBooking.quantity,
                    startEventDatetime,
                    endEventDatetime,
                    ignoreConflict: false,
                    ignoreClosetime: false,
                    ignoreSkipdate: false,
                    overrideAdvanceMinimum: false,
                    overrideAdvanceMaximum: false
                  },
                  resourceID,
                  eventResource.get('setupMinutes'),
                  eventResource.get('cleanupMinutes')
                )
              )
            )
          );
        });

        recurringMap = recurringMap.setIn([baseBookingID, 'bookings'], recurringBookings);

        if (!is(originalBookingPanelError, bookingPanelError)) {
          bookingPanelError = bookingPanelError.merge(getServerMessages(bookingPanelError));
        }

        dispatch({
          type: BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_SUCCESS,
          payload: {
            resourceMap,
            recurringMap,
            changedBaseBookingMap,
            waitingAppliedBaseBookingIds,
            error: bookingPanelError
          }
        });
      } else {
        dispatch({
          type: BOOKINGPANEL_APPLY_RECURRING_BOOKINGS_FAIL,
          payload: {
            errorMessage,
            waitingAppliedBaseBookingIds
          }
        });
      }
    }
  );
};

export const updateBookingPanelStatesAfterMutation = (
  resourceMap,
  recurringMap,
  deleteBookings,
  changedBaseBookingMap,
  pendingMovedRecurringBookingMap,
  waitingAppliedBaseBookingIds
) => {
  changedBaseBookingMap = changedBaseBookingMap.filter((item) => {
    const newBooking = item.get('newBooking');
    const resourceID = newBooking.get('resourceID');
    const strResourceID = `${resourceID}`;
    const baseBookingID = newBooking.get('id');

    const resource = resourceMap.get(strResourceID);
    const baseBooking = resource.get('bookings').find(booking => booking.get('id') === baseBookingID);
    const changedDataMap = convertBaseBookingToNormalBooking(
      baseBooking,
      resource,
      recurringMap,
      deleteBookings,
      changedBaseBookingMap,
      pendingMovedRecurringBookingMap,
      waitingAppliedBaseBookingIds
    );

    resourceMap = resourceMap.set(strResourceID, changedDataMap.resource);
    recurringMap = changedDataMap.recurringMap;
    deleteBookings = changedDataMap.deleteBookings;
    pendingMovedRecurringBookingMap = changedDataMap.pendingMovedRecurringBookingMap;
    waitingAppliedBaseBookingIds = changedDataMap.waitingAppliedBaseBookingIds;

    return false;
  });

  pendingMovedRecurringBookingMap = pendingMovedRecurringBookingMap.filter((booking) => {
    const bookingID = booking.get('id');
    const strResourceID = `${booking.get('resourceID')}`;
    const baseBookingID = `${booking.get('baseBookingID')}`;

    resourceMap = resourceMap.updateIn(
      [strResourceID, 'bookings'],
      bookings => bookings && bookings.push(removeRecurringBookingProperties(booking))
    );

    recurringMap = recurringMap.updateIn(
      [baseBookingID, 'bookings'],
      bookings => bookings && bookings.filter(_booking => _booking.get('id') !== bookingID)
    );
    /**
     * If the recurring all become normal booking,
     * the base booking should turn to a normal booking too;
     *  */
    const recurringBookings = recurringMap.getIn([baseBookingID, 'bookings']);
    if (recurringBookings && !recurringBookings.size) {
      const baseBookingIndex = resourceMap.getIn([strResourceID, 'bookings']).findIndex(
        book => book.get('id') === baseBookingID
      );
      const baseBooking = resourceMap.getIn([strResourceID, 'bookings', baseBookingIndex]);

      if (baseBooking) {
        const normalBooking = removeBaseBookingProperties(baseBooking);
        resourceMap = resourceMap.setIn([strResourceID, 'bookings', baseBookingIndex], normalBooking);
      }
    }
    return false;
  });

  return {
    resourceMap,
    recurringMap,
    deleteBookings,
    changedBaseBookingMap,
    pendingMovedRecurringBookingMap,
    waitingAppliedBaseBookingIds
  };
};

/**
 * Below three things need to do:
 * 1. Move pedding moved recurring bookings in pendingMovedRecurringBookingMap
 *    to resourceMap.
 * 2. If base booking changed, execute convertBaseBookingToNormalBooking on it.
 * 3. Clear changedBaseBookingMap to remove apply to all button and warining
 *    message 'modified booking will be moved out of the recurring group.'
 *    on all of the base bookings.
 * 4. Clear pendingMovedRecurringBookingMap due to the corresponding recurrring
 *    booking already be converted to normal booking.
 * 5. clear waitingAppliedBaseBookingIds.
 */
// Do the same things with the clearRecurringGroups function of before
export const flushAllRecurringBookingsAfterBookingPanelMutationAction =
  () => (dispatch, getState) => {
    const bookingPanel = getState().bookingPanel;
    const changedBaseBookingMap = bookingPanel.get('changedBaseBookingMap');
    const resourceMap = bookingPanel.get('resourceMap');
    const recurringMap = bookingPanel.get('recurringMap');
    const deleteBookings = bookingPanel.get('deleteBookings');
    const pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');
    const waitingAppliedBaseBookingIds = bookingPanel.get('waitingAppliedBaseBookingIds');

    const mutationStates = updateBookingPanelStatesAfterMutation(
      resourceMap,
      recurringMap,
      deleteBookings,
      changedBaseBookingMap,
      pendingMovedRecurringBookingMap,
      waitingAppliedBaseBookingIds
    );

    dispatch({
      type: BOOKINGPANEL_FLUSH_ALL_RECURRING_BOOKINGS_AFTER_BOOKING_PANEL_CLOSED,
      payload: {
        resourceMap: mutationStates.resourceMap,
        recurringMap: mutationStates.recurringMap,
        deleteBookings: mutationStates.deleteBookings,
        changedBaseBookingMap: fromJS({}),
        pendingMovedRecurringBookingMap: fromJS({}),
        waitingAppliedBaseBookingIds: fromJS([])
      }
    });
  };

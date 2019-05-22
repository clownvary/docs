import { fromJS } from 'immutable';
import {
  bookingPanelDeleteTemplateAction,
  bookingPanelTemplateUpdateIsNeedFillScheduleAction
} from './bookingPanelTemplate';
import {
  bookingPanelClearErrAction,
  getServerMessages
} from './bookingPanelValidation';
import { addExceptionDateToBaseBooking } from './bookingPanelRecurring';
import { bookingTemplateState } from '../consts/bookingTemplate';
import { removeBaseBookingProperties, convertBaseBookingToNormalBooking } from '../utils/bookingHelper';

export const BOOKINGPANEL_DELETE_NORMAL_BOOKING = 'BOOKINGPANEL_DELETE_NORMAL_BOOKING';
export const BOOKINGPANEL_DELETE_RECURRING_BOOKING = 'BOOKINGPANEL_DELETE_RECURRING_BOOKING';
export const BOOKINGPANEL_DELETE_ALL_BOOKINGS = 'BOOKINGPANEL_DELETE_ALL_BOOKINGS';
export const BOOKINGPANEL_DELETE_SET_CLEAR_RECURRING = 'BOOKINGPANEL_DELETE_SET_CLEAR_RECURRING';
export const BOOKINGPANEL_DELETE_BASE_BOOKING = 'BOOKINGPANEL_DELETE_BASE_BOOKING';
export const BOOKINGPANEL_DELETE_BASE_AND_RECURRING_BOOKINGS = 'BOOKINGPANEL_DELETE_BASE_AND_RECURRING_BOOKINGS';
export const BOOKINGPANEL_DELETE_ALL_CONFLICTS_AND_CONFLICT_ERRORS = 'BOOKINGPANEL_DELETE_ALL_CONFLICTS_AND_CONFLICT_ERRORS';

const getAvalibleBookings = resourceMap =>
  resourceMap.toList()
    .reduce((total, resource) => {
      const resourceBookingsSize = (resource.get('bookings') && resource.get('bookings').size) || 0;
      return total + resourceBookingsSize;
    }, 0);

export const deleteNormalBookingAction = (resourceID, bookingID) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  const templateState = bookingPanel.getIn(['template', 'state']);
  const templateResourceID = bookingPanel.getIn(['template', 'resourceID']);
  const resourceMap = bookingPanel.get('resourceMap');
  const resourceBookings = resourceMap.getIn([resourceID, 'bookings']);
  const deleteBookingIndex = resourceBookings.findIndex(booking => booking.get('id') === bookingID);
  const deleteBooking = resourceBookings.get(deleteBookingIndex);
  const deletedResourceBookingID = deleteBooking.get('resourceBookingID');
  const deletedPendingResourceBookingID = deleteBooking.get('pendingResourceBookingID');
  const resourceBookingsAfterDelete = resourceBookings.splice(deleteBookingIndex, 1);
  let deleteBookings = bookingPanel.get('deleteBookings');
  let finalResourceMap = resourceMap;
  let resourceOrders = bookingPanel.get('resourceOrders');

  finalResourceMap = finalResourceMap.setIn([resourceID, 'bookings'], resourceBookingsAfterDelete);

  if (
    +templateResourceID === +resourceID &&
    templateState === bookingTemplateState.HAS_TEMPLATE &&
    !resourceBookingsAfterDelete.size
  ) {
    dispatch(bookingPanelDeleteTemplateAction());
  }

  if (!resourceBookingsAfterDelete.size) {
    resourceOrders = resourceOrders.filter(id => id !== resourceID);
  }

  const avalibleBookings = getAvalibleBookings(finalResourceMap);
  if (!avalibleBookings) {
    dispatch(bookingPanelTemplateUpdateIsNeedFillScheduleAction(true));
  }

  // Existing booking must be send to BE
  if (
    deletedResourceBookingID > 0 ||
    deletedPendingResourceBookingID > 0
  ) {
    deleteBookings = deleteBookings.push(fromJS({
      id: bookingID,
      baseBookingID: '',
      startEventDate: deleteBooking.get('startEventDate'),
      endEventDate: deleteBooking.get('endEventDate'),
      pendingResourceBookingID: deletedPendingResourceBookingID,
      resourceBookingID: deletedResourceBookingID,
      resourceID
    }));
  }

  dispatch({
    type: BOOKINGPANEL_DELETE_NORMAL_BOOKING,
    payload: {
      deleteBookings,
      resourceOrders,
      resourceMap: finalResourceMap
    }
  });

  dispatch(bookingPanelClearErrAction({
    errorKey: 'deleteSingleBooking',
    resourceID,
    bookingID
  }));
};

/**
 * Delete recurring booking will not make the resource to be empty, because event
 * the recurring bookings are all deleted, the base booking is still there.
 * */
export const deleteRecurringBookingAction = (resourceID, bookingID, baseBookingID) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  const recurringMap = bookingPanel.get('recurringMap');
  const recurringBookings = recurringMap.getIn([baseBookingID, 'bookings']);
  const deleteBookingIndex = recurringBookings.findIndex(booking => booking.get('id') === bookingID);
  const deleteBooking = recurringBookings.get(deleteBookingIndex);
  const recurringBookingsAfterDelete = recurringBookings.splice(deleteBookingIndex, 1);
  let pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');
  let deleteBookings = bookingPanel.get('deleteBookings');
  let finalRecurringMap = recurringMap;
  let finalResourceMap = bookingPanel.get('resourceMap');

  if (!recurringBookingsAfterDelete.size) {
    finalRecurringMap = finalRecurringMap.remove(baseBookingID);
    finalResourceMap = finalResourceMap.updateIn([String(resourceID), 'bookings'], bookings => bookings.map((b) => {
      if (b.get('id') === baseBookingID) {
        return removeBaseBookingProperties(b);
      }
      return b;
    }));
    deleteBookings = deleteBookings.map((booking) => {
      if (booking.get('baseBookingID') === baseBookingID) {
        return booking.set('baseBookingID', '');
      }
      return booking;
    });
  } else {
    finalRecurringMap = finalRecurringMap.setIn([baseBookingID, 'bookings'], recurringBookingsAfterDelete);
    // Update recurringExceptions for base booking when recurring booking be deleted
    // and it's not a pending moved recurring booking.
    finalResourceMap = finalResourceMap.updateIn([String(resourceID), 'bookings'], bookings => bookings.map((b) => {
      if (b.get('id') === baseBookingID && !pendingMovedRecurringBookingMap.get(bookingID)) {
        return addExceptionDateToBaseBooking(b, deleteBooking);
      }
      return b;
    }));
  }

  pendingMovedRecurringBookingMap = pendingMovedRecurringBookingMap.remove(bookingID);

  // recurring booking must send to BE, because the user may need apply to all
  deleteBookings = deleteBookings.push(fromJS({
    id: deleteBooking.get('id'),
    startEventDate: deleteBooking.get('startEventDate'),
    endEventDate: deleteBooking.get('endEventDate'),
    pendingResourceBookingID: deleteBooking.get('pendingResourceBookingID'),
    resourceBookingID: deleteBooking.get('resourceBookingID'),
    resourceID,
    baseBookingID: recurringBookingsAfterDelete.size ? baseBookingID : ''
  }));

  dispatch({
    type: BOOKINGPANEL_DELETE_RECURRING_BOOKING,
    payload: {
      deleteBookings,
      resourceMap: finalResourceMap,
      recurringMap: finalRecurringMap,
      pendingMovedRecurringBookingMap
    }
  });

  dispatch(bookingPanelClearErrAction({
    errorKey: 'deleteSingleBooking',
    resourceID,
    bookingID
  }));
};

export const onlyDeleteBaseBookingAction = (resourceID, bookingID) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  let resourceMap = bookingPanel.get('resourceMap');
  let resource = resourceMap.get(resourceID);
  const booking = resource.get('bookings').find(b => b.get('id') === bookingID);
  const deletedResourceBookingID = booking.get('resourceBookingID');
  const deletedPendingResourceBookingID = booking.get('pendingResourceBookingID');
  let recurringMap = bookingPanel.get('recurringMap');
  let deleteBookings = bookingPanel.get('deleteBookings');
  let changedBaseBookingMap = bookingPanel.get('changedBaseBookingMap');
  let waitingAppliedBaseBookingIds = bookingPanel.get('waitingAppliedBaseBookingIds');
  let pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');

  // Existing booking must be send to BE
  if (
    deletedResourceBookingID > 0 ||
    deletedPendingResourceBookingID > 0
  ) {
    deleteBookings = deleteBookings.push(fromJS({
      id: bookingID,
      baseBookingID: '',
      startEventDate: booking.get('startEventDate'),
      endEventDate: booking.get('endEventDate'),
      pendingResourceBookingID: deletedPendingResourceBookingID,
      resourceBookingID: deletedResourceBookingID,
      resourceID
    }));
  }

  const changedDataMap = convertBaseBookingToNormalBooking(
    booking,
    resource,
    recurringMap,
    deleteBookings,
    changedBaseBookingMap,
    pendingMovedRecurringBookingMap,
    waitingAppliedBaseBookingIds
  );

  resource = changedDataMap.resource;
  recurringMap = changedDataMap.recurringMap;
  deleteBookings = changedDataMap.deleteBookings;
  changedBaseBookingMap = changedDataMap.changedBaseBookingMap;
  pendingMovedRecurringBookingMap = changedDataMap.pendingMovedRecurringBookingMap;
  waitingAppliedBaseBookingIds = changedDataMap.waitingAppliedBaseBookingIds;

  resource = resource.update('bookings', bookings => bookings.filter(b => b.get('id') !== bookingID));
  resourceMap = resourceMap.set(String(resourceID), resource);

  dispatch({
    type: BOOKINGPANEL_DELETE_BASE_BOOKING,
    payload: {
      resourceMap,
      recurringMap,
      deleteBookings,
      changedBaseBookingMap,
      waitingAppliedBaseBookingIds,
      pendingMovedRecurringBookingMap
    }
  });

  dispatch(bookingPanelClearErrAction({
    errorKey: 'deleteSingleBooking',
    resourceID,
    bookingID
  }));
};

export const deleteBaseAndRecurringBookingsAction = (resourceID, bookingID) =>
(dispatch, getState) => {
  const { bookingPanel } = getState();
  const resourceMap = bookingPanel.get('resourceMap');
  const recurringMap = bookingPanel.get('recurringMap');
  const deleteBookings = bookingPanel.get('deleteBookings');
  const resourceBookings = resourceMap.getIn([resourceID, 'bookings']);
  const deleteBookingIndex = resourceBookings.findIndex(booking => booking.get('id') === bookingID);
  const deleteBooking = resourceBookings.get(deleteBookingIndex);
  const deleteRecurringBookings = recurringMap.getIn([bookingID, 'bookings']);
  const resourceBookingsAfterDelete = resourceBookings.splice(deleteBookingIndex, 1);
  let finalDeleteBookings = deleteBookings;
  let finalRecurringMap = recurringMap;
  let finalResourceMap = resourceMap;
  let finalResourceOrders = bookingPanel.get('resourceOrders');
  let changedBaseBookingMap = bookingPanel.get('changedBaseBookingMap');
  let waitingAppliedBaseBookingIds = bookingPanel.get('waitingAppliedBaseBookingIds');
  let pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');

  deleteRecurringBookings.map((recurBooking) => {
    const resourceBookingID = recurBooking.get('resourceBookingID');
    const pendingResourceBookingID = recurBooking.get('pendingResourceBookingID');

    if (resourceBookingID > 0 || pendingResourceBookingID > 0) {
      finalDeleteBookings = finalDeleteBookings.push(fromJS({
        resourceID,
        resourceBookingID,
        pendingResourceBookingID,
        baseBookingID: bookingID,
        startEventDate: recurBooking.get('startEventDate'),
        endEventDate: recurBooking.get('endEventDate')
      }));
    }
    pendingMovedRecurringBookingMap = pendingMovedRecurringBookingMap.remove(recurBooking.get('id'));
    return recurBooking;
  });

  if (changedBaseBookingMap.has(bookingID)) {
    changedBaseBookingMap = changedBaseBookingMap.remove(bookingID);
  }

  waitingAppliedBaseBookingIds = waitingAppliedBaseBookingIds.filter(id => id !== bookingID);

  finalRecurringMap = finalRecurringMap.remove(bookingID);
  const resourceBookingID = deleteBooking.get('resourceBookingID');
  const pendingResourceBookingID = deleteBooking.get('pendingResourceBookingID');

  if (resourceBookingID > 0 || pendingResourceBookingID > 0) {
    finalDeleteBookings = finalDeleteBookings.push(fromJS({
      resourceID,
      resourceBookingID,
      pendingResourceBookingID,
      baseBookingID: '',
      startEventDate: deleteBooking.get('startEventDate'),
      endEventDate: deleteBooking.get('endEventDate')
    }));
  }

  finalResourceMap = finalResourceMap.setIn([resourceID, 'bookings'], resourceBookingsAfterDelete);

  const templateState = bookingPanel.getIn(['template', 'state']);
  const templateResourceID = bookingPanel.getIn(['template', 'resourceID']);

  if (
    +templateResourceID === +resourceID &&
    templateState === bookingTemplateState.HAS_TEMPLATE &&
    !resourceBookingsAfterDelete.size
  ) {
    dispatch(bookingPanelDeleteTemplateAction());
  }

  if (!resourceBookingsAfterDelete.size) {
    finalResourceOrders = finalResourceOrders.filter(id => id !== resourceID);
  }

  const avalibleBookings = getAvalibleBookings(finalResourceMap);
  if (!avalibleBookings) {
    dispatch(bookingPanelTemplateUpdateIsNeedFillScheduleAction(true));
  }
  // should clear base and recurring errors first, then update the resource bookings(recurrings)
  dispatch(bookingPanelClearErrAction({
    errorKey: 'deleteBaseAndRecurringBookings',
    resourceID,
    bookingID
  }));

  dispatch({
    type: BOOKINGPANEL_DELETE_BASE_AND_RECURRING_BOOKINGS,
    payload: {
      deleteBookings: finalDeleteBookings,
      resourceMap: finalResourceMap,
      recurringMap: finalRecurringMap,
      resourceOrders: finalResourceOrders,
      changedBaseBookingMap,
      waitingAppliedBaseBookingIds,
      pendingMovedRecurringBookingMap
    }
  });
};

export const deleteAllBookingsAction = () => ({
  type: BOOKINGPANEL_DELETE_ALL_BOOKINGS
});

export const setClearRecurringAction = value => ({
  type: BOOKINGPANEL_DELETE_SET_CLEAR_RECURRING,
  payload: {
    value
  }
});

export const deleteAllConflictsBookingsAction = () => (dispatch, getState) => {
  const { bookingPanel } = getState();
  const templateState = bookingPanel.getIn(['template', 'state']);
  const templateResourceID = bookingPanel.getIn(['template', 'resourceID']);
  const bookingPanelError = bookingPanel.get('error');
  const errorBookings = bookingPanelError.get('bookings');
  const resourceMap = bookingPanel.get('resourceMap');
  const recurringMap = bookingPanel.get('recurringMap');
  let deleteBookings = bookingPanel.get('deleteBookings');
  let resourceOrders = bookingPanel.get('resourceOrders');
  let finalResourceMap = resourceMap;
  let finalRecurringMap = recurringMap;
  let changedBaseBookingMap = bookingPanel.get('changedBaseBookingMap');
  let waitingAppliedBaseBookingIds = bookingPanel.get('waitingAppliedBaseBookingIds');
  let pendingMovedRecurringBookingMap = bookingPanel.get('pendingMovedRecurringBookingMap');
  let finalErrorBookings = errorBookings;

  finalRecurringMap.map((baseBooking, baseBookingID) => {
    const recurringBookings = baseBooking.get('bookings');
    let finalRecurBookings = recurringBookings;

    recurringBookings && recurringBookings.forEach((recurBooking) => {
      const recurBookingID = recurBooking.get('id');
      const hasConflictError = errorBookings && errorBookings.getIn([recurBookingID, 'datetimeConflict']);

      if (hasConflictError) {
        const strResourceID = `${recurBooking.get('resourceID')}`;

        finalRecurBookings = finalRecurBookings.delete(finalRecurBookings.findIndex(b => b.get('id') === recurBookingID));
        finalErrorBookings = finalErrorBookings.remove(recurBookingID);

        if (!finalRecurBookings.size) {
          finalResourceMap = finalResourceMap.updateIn([strResourceID, 'bookings'], bookings => bookings.map((b) => {
            if (b.get('id') === baseBookingID) {
              return removeBaseBookingProperties(b);
            }
            return b;
          }));
          deleteBookings = deleteBookings.map((booking) => {
            if (booking.get('baseBookingID') === baseBookingID) {
              return booking.set('baseBookingID', '');
            }
            return booking;
          });
        } else {
          // Update recurringExceptions for base booking when recurring booking be deleted
          // and it's not a pending moved recurring booking.
          finalResourceMap = finalResourceMap.updateIn([strResourceID, 'bookings'], bookings => bookings.map((b) => {
            if (b.get('id') === baseBookingID && !pendingMovedRecurringBookingMap.get(recurBookingID)) {
              return addExceptionDateToBaseBooking(b, recurBooking);
            }
            return b;
          }));
        }

        pendingMovedRecurringBookingMap = pendingMovedRecurringBookingMap.remove(recurBookingID);

        // recurring booking must send to BE, because the user may need apply to all
        deleteBookings = deleteBookings.push(fromJS({
          id: recurBookingID,
          startEventDate: recurBooking.get('startEventDate'),
          endEventDate: recurBooking.get('endEventDate'),
          pendingResourceBookingID: recurBooking.get('pendingResourceBookingID'),
          resourceBookingID: recurBooking.get('resourceBookingID'),
          resourceID: strResourceID,
          baseBookingID
        }));
      }
    });

    if (!finalRecurBookings.size) {
      finalRecurringMap = finalRecurringMap.remove(baseBookingID);
    } else {
      finalRecurringMap = finalRecurringMap.setIn([baseBookingID, 'bookings'], finalRecurBookings);
    }

    return baseBooking;
  });

  finalResourceMap.map((resource, resourceID) => {
    const resourceBookings = resource.get('bookings');
    const strResourceID = `${resourceID}`;
    let finalResource = resource;

    resourceBookings && resourceBookings.forEach((booking) => {
      const bookingID = booking.get('id');
      const hasConflictError = errorBookings && errorBookings.getIn([bookingID, 'datetimeConflict']);

      if (hasConflictError) {
        const deletedResourceBookingID = booking.get('resourceBookingID');
        const deletedPendingResourceBookingID = booking.get('pendingResourceBookingID');
        const recurringBookings = finalRecurringMap.getIn([bookingID, 'bookings']);

        finalErrorBookings = finalErrorBookings.remove(bookingID);
        // Existing booking must be send to BE
        if (
          deletedResourceBookingID > 0 ||
          deletedPendingResourceBookingID > 0
        ) {
          deleteBookings = deleteBookings.push(fromJS({
            id: bookingID,
            baseBookingID: '',
            startEventDate: booking.get('startEventDate'),
            endEventDate: booking.get('endEventDate'),
            pendingResourceBookingID: deletedPendingResourceBookingID,
            resourceBookingID: deletedResourceBookingID,
            resourceID
          }));
        }

        if (recurringBookings && recurringBookings.size) { // delete a base booking
          const changedDataMap = convertBaseBookingToNormalBooking(
            booking,
            finalResource,
            finalRecurringMap,
            deleteBookings,
            changedBaseBookingMap,
            pendingMovedRecurringBookingMap,
            waitingAppliedBaseBookingIds
          );

          finalResource = changedDataMap.resource;
          finalRecurringMap = changedDataMap.recurringMap;
          deleteBookings = changedDataMap.deleteBookings;
          changedBaseBookingMap = changedDataMap.changedBaseBookingMap;
          pendingMovedRecurringBookingMap = changedDataMap.pendingMovedRecurringBookingMap;
          waitingAppliedBaseBookingIds = changedDataMap.waitingAppliedBaseBookingIds;
        }
        finalResource = finalResource.update('bookings', bookings => bookings.filter(b => b.get('id') !== bookingID));
      }
    });
    finalResourceMap = finalResourceMap.set(strResourceID, finalResource);
    const resourceBookingsAfterDelete = finalResource.get('bookings') || fromJS([]);

    if (
      +templateResourceID === +strResourceID &&
      templateState === bookingTemplateState.HAS_TEMPLATE &&
      !resourceBookingsAfterDelete.size
    ) {
      dispatch(bookingPanelDeleteTemplateAction());
    }

    if (!resourceBookingsAfterDelete.size) {
      resourceOrders = resourceOrders.filter(id => id !== resourceID);
    }

    return finalResource;
  });

  const avalibleBookings = getAvalibleBookings(finalResourceMap);
  if (!avalibleBookings) {
    dispatch(bookingPanelTemplateUpdateIsNeedFillScheduleAction(true));
  }
  let finalError = bookingPanelError.set('bookings', finalErrorBookings);
  finalError = finalError.merge(getServerMessages(finalError));

  return dispatch({
    type: BOOKINGPANEL_DELETE_ALL_CONFLICTS_AND_CONFLICT_ERRORS,
    payload: {
      resourceMap: finalResourceMap,
      recurringMap: finalRecurringMap,
      error: finalError,
      deleteBookings,
      resourceOrders,
      changedBaseBookingMap,
      waitingAppliedBaseBookingIds,
      pendingMovedRecurringBookingMap
    }
  });
};

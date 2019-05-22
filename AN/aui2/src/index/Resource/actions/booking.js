
import Globalize from 'react-base-ui/lib/services/i18n';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import isArray from 'lodash/isArray';
import { reSortResourcesAndBookings } from '../utils/sortResourceAndBooking';
import { bookingTemplateState } from '../consts/bookingTemplate';
import { readyOnBoardingAction } from './onboarding';
import {
  configurationResetResourceMapAction,
  fetchRentalBlockAndDateRangeByResourceIdsAsyncAction,
  fetchEventTypesAsyncAction,
  setResourceMap
} from './configurationData';
import {
  formatBooking,
  getEditableBookingsAndExtraResourceDetailsFromEventResources,
  getEditableBookingsAndExtraResourceDetailsFromResouceBookings,
  getEditableBookingsAndExtraResourceDetailsFromNewBookings
} from '../utils/bookingHelper';
import {
  showBookingPanelAction,
  bookingPanelUpdateEventAction,
  resetBookingPanelResourceMapAction,
  addResourceBookingsAction,
  updatePendingBookingStatusAction,
  bookingPanelUpdateLoadedResources
} from './bookingPanel';
import { bookingPanelSetTemplateResourceAction, bookingPanelTemplateApplyAction } from './bookingPanelTemplate';
import { setClearRecurringAction, deleteNormalBookingAction, deleteRecurringBookingAction } from './bookingPanelDelete';
import reservationPeriodUnit from '../consts/reservationPeriodUnit';
import URL from '../urls';

export const BOOKING_RESET_UNEDITABLE_BOOKINGS = 'BOOKING_RESET_UNEDITABLE_BOOKINGS';

const resetUnEditableBookingsAction = unEditableBookings => ({
  type: BOOKING_RESET_UNEDITABLE_BOOKINGS,
  payload: {
    unEditableBookings: unEditableBookings.map(booking => formatBooking(booking))
  }
});

const fetchResourceBooking = params => ({
  types: ['', '', ''],
  promise: API => API.get(URL.resourceBookingInfos, {
    body: params
  })
});

const fetchEventBookingsWhenModifyWorkflow = () =>
  (dispatch, getState) => {
    const {
      batchID,
      eventID,
      receiptID,
      receiptEntryID
    } = getState().initialData;

    return dispatch({
      types: ['', '', ''],
      promise: api => api.get(URL.eventBookingItems, {
        body: {
          batch_id: batchID,
          receipt_id: receiptID,
          event_id: eventID,
          new_entry_id: receiptEntryID
        }
      })
    });
  };

const fetchPendingBookingsWhenNewWorklow = () =>
  (dispatch, getState) => {
    const {
      batchID,
      receiptID,
      receiptEntryID
    } = getState().initialData;

    return dispatch({
      types: ['', '', ''],
      promise: api => api.get(URL.bookingItems, {
        body: {
          batch_id: batchID,
          receipt_id: receiptID,
          receipt_entry_id: receiptEntryID
        }
      })
    });
  };

const fetchEditableBookings = () =>
  (dispatch, getState) => {
    const { permitID, eventID, receiptEntryID } = getState().initialData;

    if (permitID <= 0) {
      return dispatch(fetchPendingBookingsWhenNewWorklow());
    } else if (eventID > 0 || receiptEntryID > 0) {
      /**
       * The receiptEntryID = 0 when click the Add Event to the resource page
       * The receiptEntryID > 0 when edit the Add Event(not confirm yet)
       */
      return dispatch(fetchEventBookingsWhenModifyWorkflow());
    }

    return null;
  };

// Find bookings which were not in booking information panel
const getTheUnEditableBookings = (bookings) => {
  const unEditableBookings = bookings.filter(booking =>
    // permit id will be -1 for new reservation workflow, and prop current event is undefined
    // current event will be true for modify reservation workflow
    (booking.bookingAssignment !== 0 && booking.permitID !== -1 && !booking.currentEvent) ||
    // keep booking that is not belongs to current user
    !booking.ownerPendingReceipt
  );

  return unEditableBookings.map(booking => ({
    ...booking,
    isUnEditableBooking: true,
    isPendingOfOtherPermit: (booking.permitID === -1 &&
      booking.bookingAssignment === 0 &&
      !booking.ownerPendingReceipt)
  }));
};


const getParamsOfResourceBooking = (initialData, main, resourceIDs) => {
  const { batchID, receiptID, eventID, receiptEntryID } = initialData;
  const isDayView = main.get('isDayView');
  const dateFormat = Globalize.ANDateFormat;

  const params = {
    /**
     * If we only add the resources not remove the resources then
     *   the uneditable bookings and the resourceMap will too big.
     * So reset the resources and the un-editable bookings
     *   every time the selected resources changed(add news or delete existes).
     */
    resource_ids: resourceIDs.size ? resourceIDs.join(',') : -1,
    include_linked_resources: true
  };

  if (!isDayView) {
    const startDayOfMonthMoment = main.get('startDayOfMonthMoment');
    const endDayOfMonthMoment = main.get('endDayOfMonthMoment');

    params.start_date = startDayOfMonthMoment.format(dateFormat);
    params.end_date = endDayOfMonthMoment.format(dateFormat);
  } else {
    params.start_date = main.get('startDate');
    params.end_date = params.start_date;
  }

  params.batch_id = batchID;
  params.receipt_id = receiptID;
  params.event_id = eventID;
  params.receipt_entry_id = receiptEntryID;

  return params;
};

const getResourceIdsOfDRAndRB = (resourceMap, resourceIDs) => {
  const dateRangeResourceIds = [];
  const rentalBlockResourceIds = [];

  resourceIDs.forEach((resourceID) => {
    const resourceRU = resourceMap.getIn([`${resourceID}`, 'reservationPeriodUnit']);
    if (resourceRU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
      dateRangeResourceIds.push(resourceID);
    }

    if (resourceRU === reservationPeriodUnit.RENTAL_BLOCK) {
      rentalBlockResourceIds.push(resourceID);
    }
  });

  return [dateRangeResourceIds, rentalBlockResourceIds];
};

const getBookingPanelEvent = bookingPanelEvent => ({
  eventName: decodeHtmlStr(bookingPanelEvent.event_name || bookingPanelEvent.eventName),
  scheduleTypeID: bookingPanelEvent.schedule_type_id || bookingPanelEvent.scheduleTypeID,
  scheduleType: bookingPanelEvent.schedule_type || bookingPanelEvent.scheduleType
});

/**
 * Fix ANE-90090, the overlap facility will fetch the bookings of parent resource,
 * but the parent resource detail didn't been fetched in the resourceBooking API,
 * so need get the resource detail from the booking of parent resource
 *  */
const getResourceDetailOfBookingWhichNotBeenSelected = booking => ({
  cleanupMinutes: booking.cleanupMinutes,
  reservationPeriodUnit: booking.reservationPeriodUnit,
  resourceID: booking.resourceID,
  resourceName: booking.resourceName,
  resourceNumber: booking.resourceNumber,
  resourceType: booking.resourceType,
  setupMinutes: booking.setupMinutes,
  closedTimes: booking.closedTimes || [],
  resourceSkipDate: booking.resourceSkipDate || []
});

/**
 * @param {bool} shouldFetchTheEditableBookings fetch the editable bookings only
 *   when enter into the resource page
 */
export const fetchResourcesBookingAsyncAction = (shouldFetchTheEditableBookings = false) =>
  (dispatch, getState) => {
    const { initialData, main, resourceFilter } = getState();
    const resourceIDs = resourceFilter.resources.get('selected');

    if (!resourceIDs.size && !shouldFetchTheEditableBookings) {
      dispatch(readyOnBoardingAction());
      return Promise.resolve();
    }

    const request = [];
    const resourceBookingParams = getParamsOfResourceBooking(initialData, main, resourceIDs);

    request.push(dispatch(fetchResourceBooking(resourceBookingParams)));

    if (shouldFetchTheEditableBookings) {
      request.push(dispatch(fetchEditableBookings()));
    }

    return Promise.all(request)
      .then(
        (
          [resourceBookingResponse, editableBookingResponse]
        ) => {
          const { payload: { body: { booking_list: bookingList } } } = resourceBookingResponse;
          const resourceDetailsRequest = [];
          let bookingPanelEvent = null;
          // If has editable bookings when enter into the Resource page
          let hasEditableBookings = false;

          if (editableBookingResponse && editableBookingResponse.payload) {
            const { body: { booking_items: bookingItems } } =
              editableBookingResponse.payload || { body: {} };
            const hasNoPendingBookings = isArray(bookingItems)
              ? !bookingItems.length : !bookingItems;
            if (!hasNoPendingBookings) {
              bookingPanelEvent = bookingItems;
            }
          }

          // When has no resources been selected, the bookingList will be []
          if (bookingList) {
            /**
             * bookingInfo contains the bookings of the selected dates
             *   which contains the bookings editable and the other permits which is un-editable
             * eventBookingInfo is the bookings existed
             *   when edit a event of a permit which is editable
             * The created bookings has not been saved to the DB is fetched by
             *   the URL.eventBookingItems or the URL.bookingItems, if the URL.eventBookingItems
             *   has values(which means has the existed booking and the pending bookings) then
             *   it will contains the eventBookingInfo
             */
            const { resourceInfo, bookingInfo, eventBookingInfo } = bookingList;
            const selectedResourceDetailMap = (resourceInfo && resourceInfo.length)
              && setResourceMap(resourceInfo);

            bookingInfo && bookingInfo.forEach((booking) => {
              const resourceIDOfBooking = booking.resourceID;

              if (!selectedResourceDetailMap[resourceIDOfBooking]) {
                selectedResourceDetailMap[resourceIDOfBooking] =
                  getResourceDetailOfBookingWhichNotBeenSelected(booking);
              }
            });

            resourceInfo &&
              dispatch(configurationResetResourceMapAction(selectedResourceDetailMap));
            bookingInfo &&
              dispatch(resetUnEditableBookingsAction(getTheUnEditableBookings(bookingInfo)));
            dispatch(bookingPanelUpdateLoadedResources(resourceIDs));
            let initResourceDetailMap = null;
            let initBookingPanelRecurringMap = null;
            let initBookingPanelEvent = null;

            if (bookingPanelEvent) { // Has pending bookings for both new and modify workflow
              const { resourceDetailMap, resourceDetails, recurringMap } =
                getEditableBookingsAndExtraResourceDetailsFromEventResources(
                  bookingPanelEvent, resourceIDs
                );
              initResourceDetailMap = resourceDetailMap;
              initBookingPanelRecurringMap = recurringMap;
              initBookingPanelEvent = getBookingPanelEvent(bookingPanelEvent);
              hasEditableBookings = true;
              dispatch(updatePendingBookingStatusAction());
              if (resourceDetails.length) {
                dispatch(configurationResetResourceMapAction(setResourceMap(resourceDetails)));
              }
            } else if (
              shouldFetchTheEditableBookings && eventBookingInfo && eventBookingInfo.length) {
              // Edit event and has not add new booking for the booking panel event
              const { resourceDetailMap, recurringMap }
                = getEditableBookingsAndExtraResourceDetailsFromResouceBookings(eventBookingInfo);
              initResourceDetailMap = resourceDetailMap;
              initBookingPanelRecurringMap = recurringMap;
              initBookingPanelEvent = getBookingPanelEvent(eventBookingInfo[0]);
              hasEditableBookings = true;
            }

            if (hasEditableBookings) { // Only first call will have the ability of editable bookings
              dispatch(resetBookingPanelResourceMapAction(
                initResourceDetailMap, initBookingPanelRecurringMap)
              );
              dispatch(bookingPanelUpdateEventAction(
                getBookingPanelEvent(initBookingPanelEvent), true)
              );

              const { bookingPanel, configurationData } = getState();
              const resourceMap = configurationData.get('resourceMap');
              const bookingPanelResourceMap = bookingPanel.get('resourceMap');
              const resourceIDsOfUnFetchedResourceDetails = Object.keys(
                bookingPanelResourceMap.toObject()
              );

              if (resourceIDsOfUnFetchedResourceDetails.length) {
                const [dateRangeResourceIds, rentalBlockResourceIds] = getResourceIdsOfDRAndRB(
                  resourceMap, resourceIDsOfUnFetchedResourceDetails);

                resourceDetailsRequest.push(
                  dispatch(fetchEventTypesAsyncAction(resourceIDsOfUnFetchedResourceDetails))
                );

                if (rentalBlockResourceIds.length || dateRangeResourceIds.length) {
                  resourceDetailsRequest.push(
                    dispatch(fetchRentalBlockAndDateRangeByResourceIdsAsyncAction(
                      dateRangeResourceIds, rentalBlockResourceIds)
                    )
                  );
                }
              }
            }
          } else {
            dispatch(bookingPanelUpdateLoadedResources(resourceIDs));
          }

          if (resourceDetailsRequest.length) {
            return Promise.all(resourceDetailsRequest)
              .then(() => hasEditableBookings);
          }

          return hasEditableBookings;
        },
        err => Promise.reject(err)
      )
      .then(
        (hasEditableBookings) => {
          if (hasEditableBookings) {
            const { bookingPanel, configurationData } = getState();
            const reOrderedResources = reSortResourcesAndBookings(
              bookingPanel.get('resourceMap'), configurationData.get('resourceMap'));
            const templateResourceID = reOrderedResources.getIn(['0', 'resourceID']);
            dispatch(bookingPanelSetTemplateResourceAction(templateResourceID));
            dispatch(showBookingPanelAction(true, reOrderedResources));
          }

          const hideIntro = getState().onboarding.get('hideIntro');
          if (!hideIntro) {
            dispatch(readyOnBoardingAction());
          }
        },
        err => Promise.reject(err)
      );
  };

export const addEitableBookingsAndBookingPanelResourcesAction = newBookings =>
  (dispatch, getState) => {
    const { bookingPanel, configurationData } = getState();
    const resourceMap = bookingPanel.get('resourceMap');
    const templateState = bookingPanel.getIn(['template', 'state']);
    const templateResourceID = bookingPanel.getIn(['template', 'resourceID']);
    const [resourceDetailMap, newBookingPanelResources] =
      getEditableBookingsAndExtraResourceDetailsFromNewBookings(newBookings, resourceMap);
    const shouldApplyTheTemplateResource = templateState === bookingTemplateState.HAS_TEMPLATE &&
      templateResourceID > 0;
    dispatch(addResourceBookingsAction(resourceDetailMap));

    /**
     * Maybe the resources eventTypes has been fetched before,
     * After the user delete all bookings,
     * The newBookingPanelResources will may contains the resources has fetched eventTypes
     * */
    const resourcesOfUnFetchedEventTypes = newBookingPanelResources.filter(
      id => !configurationData.getIn(['eventTypeMap', id])
    );
    if (resourcesOfUnFetchedEventTypes.length) {
      return dispatch(fetchEventTypesAsyncAction(resourcesOfUnFetchedEventTypes))
        .then(() => {
          if (shouldApplyTheTemplateResource) {
            dispatch(bookingPanelTemplateApplyAction(
              templateResourceID, bookingPanel.getIn(['resourceMap', templateResourceID]), 'newBookings'
            ));
          }
        });
    } else if (shouldApplyTheTemplateResource) {
      dispatch(bookingPanelTemplateApplyAction(
        templateResourceID, bookingPanel.getIn(['resourceMap', templateResourceID]), 'newBookings'
      ));
    }

    return Promise.resolve();
  };

export const deleteBookingBlockAction = booking => (dispatch, getState) => {
  const { bookingPanel } = getState();
  const bookingID = booking.id;
  const resourceID = `${booking.resourceID}`;
  const baseBookingID = booking.baseBookingID;

  if (!booking.isRecurring) {
    const recurringBookings = bookingPanel.getIn(['recurringMap', bookingID, 'bookings']);

    if (recurringBookings && recurringBookings.size) {
      return dispatch(setClearRecurringAction({
        resourceID, bookingID, visible: true, clearAll: false
      }));
    }

    return dispatch(deleteNormalBookingAction(resourceID, bookingID));
  }

  return dispatch(deleteRecurringBookingAction(resourceID, bookingID, baseBookingID));
};

export function getPermitAccessibleAsyncAction(permitID) {
  return {
    types: ['', '', ''],
    promise: API => API.get(URL.permitAccessible, {
      body: {
        permit_id: permitID
      }
    })
  };
}

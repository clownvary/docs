import moment from 'moment';
import find from 'lodash/find';
import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';
import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import Globalize from 'react-base-ui/lib/services/i18n';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import convertCasingPropObj from 'shared/utils/convertCasingPropObj';
import { getEventTypeStyle } from './eventTypeColorHelper';
import reservationPeriodUnit from '../consts/reservationPeriodUnit';

/**
 * A event needs three keys(id, start, end) if the event to be used for full-calendar.
 * @param  {Object} event - no immutable.
 * @return {Object} event - no immutable.
 */
export const formatBooking = (booking) => {
  const calendarBooking = Object.assign({}, booking);

  const startScheduleDate = booking.startScheduleDate;
  const startScheduleTime = booking.startScheduleTime;
  const endScheduleDate = booking.endScheduleDate;
  const endScheduleTime = booking.endScheduleTime;
  const startEventDate = booking.startEventDate;
  const endEventDate = booking.endEventDate;
  const startEventTime = booking.startEventTime;
  const endEventTime = booking.endEventTime;
  const momentEventStartDate = moment(startEventDate);
  const momentEventEndDate = moment(endEventDate);
  const momentEventStart = moment(`${startEventDate} ${startEventTime}`);
  const momentEventEnd = moment(`${endEventDate} ${endEventTime}`);

  calendarBooking.id = `${
    calendarBooking.resourceBookingID ||
    calendarBooking.pendingID ||
    calendarBooking.booking_identifier
  }`;

  calendarBooking.start = `${startScheduleDate} ${startScheduleTime}`;
  calendarBooking.end = `${endScheduleDate} ${endScheduleTime}`;

  // display as 1 minute booking block when the start equals the end
  if (calendarBooking.start === calendarBooking.end) {
    const displayEndTime = Globalize.parseTime(booking.endScheduleTime).clone().add(1, 'm');
    const displayEndEventTime = Globalize.formatTime(displayEndTime);
    calendarBooking.end = `${endScheduleDate} ${displayEndEventTime}`;
  }

  const {
    baseBookingID,
    recurringPattern,
    recurringExceptions,
    masterBookingIdentifier,
    masterResourceBookingID,
    recurringReservationGroup
  } = calendarBooking;

  if (!baseBookingID && (masterBookingIdentifier || masterResourceBookingID)) {
    calendarBooking.isRecurring = true;
    calendarBooking.baseBookingID = `${masterBookingIdentifier || masterResourceBookingID}`;
  }

  if (recurringReservationGroup && !recurringPattern && !recurringExceptions) {
    const {
      groupPatternContent,
      exceptionDateList,
      masterFacilityScheduleID,
      recurringReservationGroupID
    } = recurringReservationGroup;

    calendarBooking.recurringPattern = !isString(groupPatternContent) ?
      groupPatternContent : JSON.parse(groupPatternContent.replace(/&quot;/ig, '"'));

    calendarBooking.recurringExceptions = !isString(exceptionDateList) ?
      exceptionDateList : JSON.parse(exceptionDateList.replace(/&quot;/ig, '"'));

    calendarBooking.masterFacilityScheduleID = masterFacilityScheduleID;
    calendarBooking.recurringReservationGroupID = recurringReservationGroupID;
  }

  return {
    ...calendarBooking,
    momentEventStartDate,
    momentEventEndDate,
    momentEventStart,
    momentEventEnd
  };
};

export const formatEventResourceBooking = (
  booking,
  resourceID,
  setupMinutes,
  cleanupMinutes
) => {
  if (!isUndefined(setupMinutes)) {
    /**
     * for PhantomJS can't realized new Date(string) in unit test
     * start_event_datetime and end_event_datetime have fixed date-time format
     * */
    const startEventDateTime = booking.startEventDatetime;
    const startScheduleDatetime = Globalize.parseDateTime(startEventDateTime).subtract(setupMinutes, 'm');

    booking.startScheduleDatetime = Globalize.formatDateTime(startScheduleDatetime);
    booking.momentStartScheduleDatetime = startScheduleDatetime;
    booking.startEventDate = Globalize.formatDate(startEventDateTime);
    booking.startEventTime = Globalize.formatTime(startEventDateTime);
    booking.startScheduleDate = Globalize.formatDate(startScheduleDatetime);
    booking.startScheduleTime = Globalize.formatTime(startScheduleDatetime);
    booking.startScheduleDay = startScheduleDatetime.format('ddd');
  }

  if (!isUndefined(cleanupMinutes)) {
    const endEventDateTime = booking.endEventDatetime;
    const endScheduleDatetime = Globalize.parseDateTime(endEventDateTime).add(cleanupMinutes, 'm');

    booking.endScheduleDatetime = Globalize.formatDateTime(endScheduleDatetime);
    booking.momentEndScheduleDatetime = endScheduleDatetime;
    booking.endEventDate = Globalize.formatDate(endEventDateTime);
    booking.endEventTime = Globalize.formatTime(endEventDateTime);
    booking.endScheduleDate = Globalize.formatDate(endScheduleDatetime);
    booking.endScheduleTime = Globalize.formatTime(endScheduleDatetime);
    booking.endScheduleDay = endScheduleDatetime.format('ddd');
  }

  booking.resourceID = +resourceID;
  // Use the 'currentEvent' to set the booking to Pending(Purple) in Fullcalendar
  booking.currentEvent = true;
  return booking;
};

// Parse the bookings and resources from the API of URL.bookingItems when enter the Page
export const getEditableBookingsAndExtraResourceDetailsFromEventResources =
(bookingPanelEvent, resourceIDs) => {
  const eventResources = bookingPanelEvent.event_resource;
  /**
   * If the resources in the booking panel doesn't existed in the resources of the calendar,
   * then we need collect the resource detail from the "bookingPanelEvent.event_resource".
   **/
  const resourceDetails = [];
  let resourceDetailMap = fromJS({});
  let recurringMap = fromJS({});

  eventResources.forEach((resource) => {
    const resourceID = `${resource.resource_id}`;
    const { booking_detail: bookingDetail, ...resourceProps } = resource;
    const resourceBookings = bookingDetail;
    const setupMinutes = resource.setup_minutes;
    const cleanupMinutes = resource.cleanup_minutes;
    const RU = resource.reservation_period_unit;
    let formatedResourceBookings = fromJS([]);

    if (resourceIDs.indexOf(resource.resource_id) < 0) {
      resourceDetails.push({ ...convertCasingPropObj(resourceProps) });
    }

    resourceBookings.forEach((booking) => {
      const casBooking = convertCasingPropObj(booking);
      const resourceBookingID = casBooking.resourceBookingID;
      let pendingID = casBooking.pendingID;

      pendingID = parseInt(pendingID, 10) || pendingID;
      casBooking.pendingID = pendingID;
      casBooking.id = `${resourceBookingID || pendingID}`;
      casBooking.bookingAssignment = 0;
      // The attendance won't change along with the template resource
      casBooking.attendanceChanged = true;
      casBooking.startEventDatetime = Globalize.formatDateTime(
        DateTimeFormat.fromString(casBooking.startEventDatetime));
      casBooking.endEventDatetime = Globalize.formatDateTime(
        DateTimeFormat.fromString(casBooking.endEventDatetime)
      );

      const formatedBooking = formatBooking(formatEventResourceBooking(
        convertCasingPropObj(casBooking), resourceID, setupMinutes, cleanupMinutes
      ));

      if (RU === reservationPeriodUnit.RENTAL_BLOCK && formatedBooking.isRentalBlockOverride) {
        const overrideID = Date.now();

        formatedBooking.overrideRentalBlock = {
          value: overrideID,
          text: `${formatedBooking.startEventTime} to ${formatedBooking.endEventTime}`
        };
        formatedBooking.rentalBlockID = overrideID;
      }

      const { baseBookingID } = formatedBooking;
      if (baseBookingID) {
        const bookings = recurringMap.getIn([baseBookingID, 'bookings']) || fromJS([]);
        recurringMap = recurringMap.setIn([baseBookingID, 'bookings'], bookings.push(fromJS(formatedBooking)));
        recurringMap = recurringMap.setIn([baseBookingID, 'resourceID'], resourceID);
        recurringMap = recurringMap.setIn([baseBookingID, 'expanded'], false);
      } else {
        formatedResourceBookings = formatedResourceBookings.push(fromJS(formatedBooking));
      }
    });

    resourceDetailMap = resourceDetailMap.set(resourceID, fromJS({
      eventTypeID: resource.event_type_id,
      eventType: resource.event_type,
      prepCodeID: resource.prep_code_id,
      setupMinutes: resource.setup_minutes,
      cleanupMinutes: resource.cleanup_minutes,
      bookings: formatedResourceBookings,
      deletedBookingList: convertCasingPropObj(resource.deleted_booking_list),
      resourceID
    }));
  });

  return {
    resourceDetailMap,
    resourceDetails,
    recurringMap
  };
};

// Parse the bookings and resources from the API of URL.resourceBookingInfos when enter the Page
export const getEditableBookingsAndExtraResourceDetailsFromResouceBookings = (
  eventBookingInfo
) => {
  let resourceDetailMap = fromJS({});
  let recurringMap = fromJS({});

  eventBookingInfo.map((booking) => {
    const resourceID = `${booking.resourceID}`;
    const RU = booking.reservationPeriodUnit;
    const startScheduleDatetime = `${booking.startScheduleDate} ${booking.startScheduleTime}`;
    const endScheduleDatetime = `${booking.endScheduleDate} ${booking.endScheduleTime}`;
    const tempBooking = {
      // we need make sure all booking.id is a String, thanks.
      id: `${booking.resourceBookingID}`,
      activityIgnoreMaximum: booking.activityIgnoreMaximum,
      attendance: booking.attendance,
      bookingAssignment: booking.bookingAssignment, // daycare or activity
      bookingIdentifier: booking.booking_identifier,
      endEventDate: booking.endEventDate,
      endEventTime: booking.endEventTime,
      endScheduleDate: booking.endScheduleDate,
      endScheduleDay: booking.endScheduleDay,
      endScheduleTime: booking.endScheduleTime,
      isRentalBlockOverride: booking.isRentalBlockOverride,
      masterBookingIdentifier: booking.masterBookingIdentifier,
      masterResourceBookingID: booking.masterResourceBookingID,
      recurringReservationGroup: convertCasingPropObj(booking.recurringReservationGroup),
      resourceBookingID: booking.resourceBookingID,
      resourceID: booking.resourceID,
      startEventDate: booking.startEventDate,
      startEventTime: booking.startEventTime,
      startScheduleDate: booking.startScheduleDate,
      startScheduleDay: booking.startScheduleDay,
      startScheduleTime: booking.startScheduleTime,
      transactionID: booking.transactionID,
      startEventDatetime: `${booking.startEventDate} ${booking.startEventTime}`,
      endEventDatetime: `${booking.endEventDate} ${booking.endEventTime}`,
      momentStartScheduleDatetime: Globalize.parseDateTime(startScheduleDatetime),
      momentEndScheduleDatetime: Globalize.parseDateTime(endScheduleDatetime),
      companyName: booking.companyName,
      customerName: booking.customerName,
      permitStatusDescription: booking.permitStatusDescription,
      permitID: booking.permitID,
      permitNumber: booking.permitNumber,
      startScheduleDatetime,
      endScheduleDatetime,
      ignoreConflict: true,
      ignoreClosetime: true,
      ignoreSkipdate: true,
      currentEvent: true
    };

    const formatedBooking = formatBooking(tempBooking);
    let dateRangeID = -1;
    let rentalBlockID = -1;
    if (RU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
      const selectedDR = find(booking.date_range, range => range.selected);
      dateRangeID = (selectedDR && selectedDR.id) || -1;
    }

    if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
      if (!booking.isRentalBlockOverride) {
        const selectedRB = find(booking.rental_block, block => block.selected);
        rentalBlockID = (selectedRB && selectedRB.id) || -1;
      } else {
        const overrideID = Date.now();
        formatedBooking.overrideRentalBlock = {
          value: overrideID,
          text: `${formatedBooking.startEventTime} to ${formatedBooking.endEventTime}`
        };
        rentalBlockID = overrideID;
      }
    }

    formatedBooking.dateRangeID = dateRangeID;
    formatedBooking.rentalBlockID = rentalBlockID;

    if (!resourceDetailMap.get(resourceID)) {
      resourceDetailMap = resourceDetailMap.set(resourceID, fromJS({
        eventTypeID: booking.eventTypeId,
        eventType: booking.eventType,
        prepCodeID: booking.prepCodeId,
        setupMinutes: booking.setupMinutes,
        cleanupMinutes: booking.cleanupMinutes,
        bookings: [],
        resourceID
      }));
    }

    const { baseBookingID } = formatedBooking;
    if (baseBookingID) {
      const bookings = recurringMap.getIn([baseBookingID, 'bookings']) || fromJS([]);
      recurringMap = recurringMap.setIn([baseBookingID, 'bookings'], bookings.push(fromJS(formatedBooking)));
      recurringMap = recurringMap.setIn([baseBookingID, 'resourceID'], resourceID);
      recurringMap = recurringMap.setIn([baseBookingID, 'expanded'], false);
    } else {
      const resourceBookings = resourceDetailMap.getIn([resourceID, 'bookings']).push(fromJS(formatedBooking));
      resourceDetailMap = resourceDetailMap.setIn([resourceID, 'bookings'], resourceBookings);
    }

    return formatedBooking;
  });

  return {
    resourceDetailMap,
    recurringMap
  };
};

// Parse the bookings and resources when create new bookings
export const getEditableBookingsAndExtraResourceDetailsFromNewBookings = (
  newBookings, bookingPanelResourceMap
) => {
  let resourceDetailMap = bookingPanelResourceMap;
  const newBookingPanelResources = [];

  newBookings.map((booking) => {
    const resourceID = `${booking.resourceID}`;
    const resource = bookingPanelResourceMap.get(resourceID);
    const RU = booking.reservationPeriodUnit;
    const setupMinutes = (resource && resource.get('setupMinutes')) || 0;
    const cleanupMinutes = (resource && resource.get('cleanupMinutes')) || 0;
    const pendingID = `pending_${resourceID}_${uniqueId(Date.now())}`;
    const tempBooking = {
      pendingID,
      resourceBookingID: 0,
      transactionID: -1,
      bookingAssignment: 0,
      attendance: 1,
      id: pendingID,
      startEventDatetime: `${booking.startEventDate} ${booking.startEventTime}`,
      endEventDatetime: `${booking.endEventDate} ${booking.endEventTime}`,
      overrideAdvanceMinimum: false,
      overrideAdvanceMaximum: false,
      ignoreSkipdate: false,
      ignoreClosetime: false,
      ignoreConflict: false
    };

    if (RU === reservationPeriodUnit.DEFINED_DATE_RANGE) {
      const dateRangeName = booking.dateRangeName;
      const dateRangeDateTime = dateRangeName.split(' to ');

      tempBooking.dateRangeID = booking.dateRangeID || -1;
      tempBooking.dateRangeName = dateRangeName;
      tempBooking.startEventDatetime = `${dateRangeDateTime[0]} 12:00 AM`;
      tempBooking.endEventDatetime = Globalize.formatDateTime(moment(`${dateRangeDateTime[1]} 12:00 AM`).add(1, 'd'));
    }

    if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
      const rentalBlockName = booking.rentalBlockName;
      const rentalBlockDateTime = rentalBlockName.split(' to ');

      tempBooking.rentalBlockID = booking.rentalBlockID || -1;
      tempBooking.startEventDatetime = `${booking.startEventDate} ${rentalBlockDateTime[0]}`;
      tempBooking.endEventDatetime = `${booking.startEventDate} ${rentalBlockDateTime[1]}`;
      tempBooking.rentalBlock = booking.rentalBlock;
    }

    const formatedBooking = fromJS(formatBooking(
      formatEventResourceBooking(tempBooking, resourceID, setupMinutes, cleanupMinutes)
    ));

    if (!resourceDetailMap.get(resourceID)) {
      resourceDetailMap = resourceDetailMap.set(resourceID, fromJS({
        eventTypeID: -1,
        eventType: '',
        prepCodeID: booking.prepCodeID,
        bookings: [],
        setupMinutes,
        cleanupMinutes,
        resourceID
      }));

      newBookingPanelResources.push(resourceID);
    }

    const resourceBookings = resourceDetailMap.getIn([resourceID, 'bookings']).push(formatedBooking);
    resourceDetailMap = resourceDetailMap.setIn([resourceID, 'bookings'], resourceBookings);

    return formatedBooking;
  });

  return [resourceDetailMap, newBookingPanelResources];
};

export const removeBaseBookingProperties =
  baseBooking => baseBooking.withMutations((booking) => {
    booking.delete('isRecurring');
    booking.delete('baseBookingID');
    booking.delete('recurringPattern');
    booking.delete('recurringExceptions');
    booking.delete('recurringReservationGroup');
    booking.delete('masterFacilityScheduleID');
    booking.delete('recurringReservationGroupID');
  });

export const removeRecurringBookingProperties =
  recurringBooking => recurringBooking.withMutations((booking) => {
    booking.delete('baseBookingID');
    booking.delete('masterBookingIdentifier');
    booking.set('isRecurring', false);
    booking.set('masterResourceBookingID', 0);
  });

const changePropertiesFromRecurringToBeBaseBooking =
  (
    newBaseBooking,
    newBaseBookingId,
    recurringExceptions,
    recurringPattern,
    recurringReservationGroupID
  ) => newBaseBooking.withMutations((booking) => {
    booking.set('isRecurring', false);
    booking.set('recurringExceptions', recurringExceptions);
    booking.set('recurringPattern', recurringPattern);
    booking.set('masterFacilityScheduleID', newBaseBookingId);
    booking.set('recurringReservationGroupID', recurringReservationGroupID);
    booking.delete('masterBookingIdentifier');
    booking.delete('masterResourceBookingID');
  });

/**
 * Below steps need to do:
 *  1. Remove related base booking properties from base booking.
 *  2. Remove the first recurring booking from the list.
 *  3. Update baseBookingID for the recurring bookings.
 *  4. Convert the removed recurring booking to base booking if still has recurring bookings.
 *  5. Update key to place new recurring booking list.
 *  6. Remove the base booking from changedBaseBookingMap.
 *  7. Update baseBookingID in pendingMovedRecurringBookingMap.
 *  8. Update baseBookingID to deleteBookings.
 *  9. Remove base booking id from waitingAppliedBaseBookingIds.
 *  10. Insert the converted base booking to the list in resource.
 */
export const convertBaseBookingToNormalBooking = (
  baseBooking,
  resource,
  recurringMap,
  deleteBookings,
  changedBaseBookingMap,
  pendingMovedRecurringBookingMap,
  waitingAppliedBaseBookingIds
) => {
  const baseBookingID = baseBooking.get('id');
  const recurringExceptions = baseBooking.get('recurringExceptions');
  let recurringPattern = baseBooking.get('recurringPattern');

  const count = recurringPattern.get('count');
  if (count > 0) {
    recurringPattern = recurringPattern.set('count', count - 1);
  }

  // Step 1:
  resource = resource.update('bookings', bookings => bookings.map((booking) => {
    if (booking.get('id') === baseBookingID) {
      booking = removeBaseBookingProperties(booking);
    }
    return booking;
  }));

  let recurringBookings = recurringMap.getIn([baseBookingID, 'bookings']);
  const newBaseBookingIndex = recurringBookings
    .findIndex(b => !pendingMovedRecurringBookingMap.has(b.get('id')));
  let newBaseBooking = recurringBookings.get(newBaseBookingIndex);
  const newBaseBookingId = newBaseBooking.get('id');

  // Step 2:
  recurringBookings = recurringBookings.remove(newBaseBookingIndex);

  // Step 3:
  recurringBookings = recurringBookings.map(booking => booking.set('baseBookingID', newBaseBookingId));

  if (recurringBookings.size) { // Fix ANE-90225
    // Step 4:
    newBaseBooking = changePropertiesFromRecurringToBeBaseBooking(
      newBaseBooking,
      newBaseBookingId,
      recurringExceptions,
      recurringPattern,
      baseBooking.get('recurringReservationGroupID')
    );

    // Step 5:
    let recurring = recurringMap.get(baseBookingID);
    recurring = recurring.set('bookings', recurringBookings);
    recurring = recurring.set('expanded', false);
    recurringMap = recurringMap.delete(baseBookingID);
    recurringMap = recurringMap.set(newBaseBookingId, recurring);
  } else {
    newBaseBooking = removeRecurringBookingProperties(newBaseBooking);
    recurringMap = recurringMap.delete(baseBookingID);
  }

  // Step 6:
  changedBaseBookingMap = changedBaseBookingMap.delete(baseBookingID);

  // Step 7:
  pendingMovedRecurringBookingMap = pendingMovedRecurringBookingMap.map((booking) => {
    if (booking.get('baseBookingID') === baseBookingID) {
      return booking.set('baseBookingID', newBaseBookingId);
    }
    return booking;
  });

  // Step 8:
  deleteBookings = deleteBookings.map((booking) => {
    if (booking.get('baseBookingID') === baseBookingID) {
      if (!recurringBookings.size) {
        return booking.set('baseBookingID', '');
      }
      return booking.set('baseBookingID', newBaseBookingId);
    }
    return booking;
  });

  // Setp 9:
  waitingAppliedBaseBookingIds = waitingAppliedBaseBookingIds.filter(id => id !== baseBookingID);

  // Step 10:
  resource = resource.update('bookings', bookings => bookings.push(newBaseBooking));

  return {
    baseBooking,
    resource,
    recurringMap,
    deleteBookings,
    changedBaseBookingMap,
    pendingMovedRecurringBookingMap,
    waitingAppliedBaseBookingIds,
    newBaseBooking
  };
};

export const isCloseOrSkipBooking = type => type === 'skip' || type === 'closed';

export const getBookingStyle = (eventTypeId, bookingAssignment, type) => {
  const isCloseOrSkipEvent = isCloseOrSkipBooking(type);
  const eventTypeStyle = isCloseOrSkipEvent ? null :
    getEventTypeStyle(eventTypeId, bookingAssignment);

  return eventTypeStyle;
};

import React from 'react';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import { SafeText } from 'react-base-ui/lib/components/SafeText';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';

import {
  PERMIT_LABEL,
  ACTIVITY_LABEL,
  DAYCARE_LABEL,
  COMPANY_LABEL
} from '../FullCalendar/utils';

import {
  getCloseSkipEventHtml,
  getDateTimeFormatString,
  getNoYearFormatHtml
} from '../FullCalendar/eventInfo';

import './index.less';

export default class CalendarTooltip extends UIComponent {
  render() {
    const { event, initialData, isMonthView } = this.props;
    const { permitID: modifiedPermitID } = initialData;
    const attendanceTitle = event.resourceType === 1 ? 'Qty' : 'Number Of Attendees';
    const dateTime = getDateTimeFormatString({
      startDate: event.startScheduleDate,
      endDate: event.endScheduleDate,
      startTime: event.startScheduleTime,
      endTime: event.endScheduleTime,
      startScheduleDay: event.startScheduleDay,
      endScheduleDay: event.endScheduleDay
    }, true);
    const setupDuration = DateTimeFormat.getDateTimeDuration(
      `${event.startScheduleDate} ${event.startScheduleTime}`,
      `${event.startEventDate} ${event.startEventTime}`,
    );

    const cleanupDuration = DateTimeFormat.getDateTimeDuration(
      `${event.endEventDate} ${event.endEventTime}`,
      `${event.endScheduleDate} ${event.endScheduleTime}`
    );
    const setupTime = `${setupDuration} Mins${(setupDuration !== 0) ? ` (${event.startScheduleTime} - ${event.startEventTime})` : ''}`;
    const cleanupTime = `${cleanupDuration} Mins${(cleanupDuration !== 0) ? ` (${event.endEventTime} - ${event.endScheduleTime})` : ''}`;

    const isCloseEvent = event.type === 'closed';
    const isSkipEvent = event.type === 'skip';

    if (isSkipEvent || isCloseEvent) {
      const dateTimeHtml = isMonthView && isSkipEvent ?
        getNoYearFormatHtml(event)
        : getCloseSkipEventHtml(event);
      let eventName = event.isAllDay ? `${event.eventName} All Day` : event.eventName;
      if (event.type === 'closed') {
        eventName += '.';
      }

      return (
        <dl className="tooltip-description tooltip-gray">
          <dt>{decodeHtmlStr(eventName)}</dt>
          <dd style={{ display: event.isAllDay ? 'none' : 'block' }}>{dateTimeHtml}</dd>
        </dl>
      );
    }

    switch (event.bookingAssignment) {
      case 0: // enmSelectedDuringBooking(customer permits)
        {
          const eventName = event.eventName ? event.eventName : '';
          const customerType = event.customerType ? ` (${event.customerType})` : '';
          const customer = event.customerName ? event.customerName + customerType : '';
          let reservationStatus = '';

            // Pending Booking
          if (event.permitID === -1 || +modifiedPermitID === event.permitID) {
            reservationStatus = 'PENDING RESERVATION';
          }

          return (
            <div className="tooltip-container">
              {reservationStatus ? <div className="tooltip-title"> {reservationStatus}</div> : ''}

              <dl className={`tooltip-list ${event.permitID !== -1 && event.permitNumber ? '' : 'u-hidden'}`}>
                <dt>{decodeHtmlStr(PERMIT_LABEL)} #</dt>
                <dd>{event.permitNumber}</dd>
              </dl>

              <dl className={`tooltip-list ${event.eventName ? '' : 'u-hidden'}`}>
                <dt>Event Name</dt>
                <dd>{decodeHtmlStr(eventName)}</dd>
              </dl>

              <dl className={`tooltip-list ${event.companyName ? '' : 'u-hidden'}`}>
                <dt>{decodeHtmlStr(COMPANY_LABEL)}</dt>
                <dd>{decodeHtmlStr(event.companyName)}</dd>
              </dl>

              <dl className={`tooltip-list ${customer ? '' : 'u-hidden'}`}>
                <dt>{event.companyName ? `${decodeHtmlStr(COMPANY_LABEL)} Agent` : 'Customer'}</dt>
                <dd>{decodeHtmlStr(customer)}</dd>
              </dl>

              <dl className={`tooltip-list ${event.eventType ? '' : 'u-hidden'}`}>
                <dt>Event Type</dt>
                <dd>{decodeHtmlStr(event.eventType)}</dd>
              </dl>

              <dl className={`tooltip-list ${event.resourceType !== 2 && (event.attendance || event.attendance >= 0) ? '' : 'u-hidden'}`}>
                <dt>{attendanceTitle}</dt>
                <dd>{event.attendance}</dd>
              </dl>

              <dl className={`tooltip-list ${event.permitID !== -1 && event.permitStatusDescription ? '' : 'u-hidden'}`}>
                <dt>{decodeHtmlStr(PERMIT_LABEL)} Status</dt>
                <dd>{decodeHtmlStr(event.permitStatusDescription)}</dd>
              </dl>

              <dl className={`tooltip-list ${event.scheduleType ? '' : 'u-hidden'}`}>
                <dt>Schedule Type</dt>
                <dd>{decodeHtmlStr(event.scheduleType)}</dd>
              </dl>

              <dl className={`tooltip-list ${event.permitID !== -1 && event.reservationScope ? '' : 'u-hidden'}`}>
                <dt>Reservation Type</dt>
                <dd>{decodeHtmlStr(event.reservationScope)}</dd>
              </dl>

              <dl className={`tooltip-list ${dateTime ? '' : 'u-hidden'}`}>
                <dt>Date/Time</dt>
                <dd><SafeText text={dateTime} dangerMode /></dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Setup Time</dt>
                <dd><SafeText text={setupTime} dangerMode /></dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Cleanup Time</dt>
                <dd><SafeText text={cleanupTime} dangerMode /></dd>
              </dl>

            </div>
          );
        }
      case 2: // enmActivityMeetingDates
        {
          let attendance = event.attendance || event.attendance === 0 ? event.attendance : 'Unspecified';

          if (event.activityIgnoreMaximum) {
            attendance = 'Unspecified';
          }
          return (
            <div className="tooltip-container">
              <dl className={`tooltip-list ${event.eventName ? '' : 'u-hidden'}`}>
                <dt>Activity</dt>
                <dd>{decodeHtmlStr(event.eventName)}</dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Number Of Attendees</dt>
                <dd>{attendance}</dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Schedule Type</dt>
                <dd className="capitalize">{decodeHtmlStr(ACTIVITY_LABEL)} Meeting Dates</dd>
              </dl>

              <dl className={`tooltip-list ${dateTime ? '' : 'u-hidden'}`}>
                <dt>Date/Time</dt>
                <dd><SafeText text={dateTime} dangerMode /></dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Setup Time</dt>
                <dd><SafeText text={setupTime} dangerMode /></dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Cleanup Time</dt>
                <dd><SafeText text={cleanupTime} dangerMode /></dd>
              </dl>

            </div>
          );
        }
      case 4: // enmDaycareSessions
        {
          return (
            <div className="tooltip-container">
              <dl className={`tooltip-list ${event.eventName ? '' : 'u-hidden'}`}>
                <dt>Event</dt>
                <dd>{decodeHtmlStr(event.eventName)}</dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Schedule Type</dt>
                <dd className="capitalize">{decodeHtmlStr(DAYCARE_LABEL)} Sessions</dd>
              </dl>

              <dl className={`tooltip-list ${dateTime ? '' : 'u-hidden'}`}>
                <dt>Date/Time</dt>
                <dd><SafeText text={dateTime} dangerMode /></dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Setup Time</dt>
                <dd><SafeText text={setupTime} dangerMode /></dd>
              </dl>

              <dl className="tooltip-list">
                <dt>Cleanup Time</dt>
                <dd><SafeText text={cleanupTime} dangerMode /></dd>
              </dl>

            </div>
          );
        }
      default: // enmLeagueGames: 1, enmPrivateLessons: 3,
        return (
          <dl className="tooltip-description tooltip-gray">
            <dt>{decodeHtmlStr(event.eventName)}</dt>
            <dd>No information retrieved.</dd>
          </dl>
        );
    }
  }
}

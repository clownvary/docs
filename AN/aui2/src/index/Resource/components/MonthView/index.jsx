import moment from 'moment';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { string, func, object, number } from 'prop-types';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import ResourceCalendar from 'react-base-ui/lib/components/ResourceCalendar';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import { Dock } from 'react-base-ui/lib/consts';
import { isPointInDOM, hasClass } from 'react-base-ui/lib/utils/dom';
import { pages } from 'shared/consts';

import { cancelReceiptAsyncAction } from 'shared/actions/receipt';
import { redirect } from 'shared/actions/route';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import { darken } from 'shared/utils/color';
import CalendarTooltip from '../CalendarTooltip';

import {
  getSkipEvents,
  getCloseEvent
} from '../FullCalendar/eventInfo';

import {
  getPermitAccessibleAsyncAction
} from '../../actions/configurationData';
import { createBookingsAction } from '../../actions/calendar';
import { updateQuickViewForDeleteResourceAction } from '../../actions/quickView';
import {
  showBookingPanelAction,
  bookingPanelUpdateLoadedResources
} from '../../actions/bookingPanel';

import { setSelectedResource, saveFilters } from '../../actions/resourceFilters';

import {
  openNonPermit,
  openNonAccessablePermit,
  openPermitInNewWorkFlow,
  openPendingPermitOfOthers
} from '../../utils/confirmations';
import { getBookingID } from '../../utils/recurring';
import { isCloseOrSkipBooking, getBookingStyle } from '../../utils/bookingHelper';

import './index.less';

export class MonthView extends PureComponent {
   /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    initialData: object.isRequired,
    editableBookings: object.isRequired,
    unEditableBookings: object.isRequired,
    availableBookingCount: number.isRequired,
    switchViewAction: func.isRequired,
    selectedDate: string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      closeTimeEvents: [],
      skipTimeEvents: []
    };

    this.focusedToScroll = false;
    this.curHoverEvent = null;
  }

  componentWillMount() {
    const { resourceMap, selectedDate, startDayOfMonthMoment, endDayOfMonthMoment } = this.props;
    this.setCloseAndSkipState(
      resourceMap, selectedDate, startDayOfMonthMoment, endDayOfMonthMoment);
  }

  componentDidMount() {
    this.resourceCalendarRef.view.scroller.contentPane.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqualImmutable(this.props.resourceMap, nextProps.resourceMap) ||
      this.props.selectedDate !== nextProps.selectedDate
    ) {
      this.setCloseAndSkipState(
        nextProps.resourceMap, nextProps.selectedDate,
        nextProps.startDayOfMonthMoment, nextProps.endDayOfMonthMoment);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isBookingPanelExpanded && this.props.isBookingPanelExpanded) {
      return false;
    }

    if (nextProps.isResourcesExpanded) {
      return false;
    }

    const isResourceDetailsFetched = nextProps.loadedResourceIDs
      .every(resourceID => nextProps.resourceMap.get(`${resourceID}`));
    if (!nextProps.isResourcesExpanded && !isResourceDetailsFetched) {
      return false;
    }

    const nextEditableBookings = nextProps.editableBookings;
    const curEditableBookings = this.props.editableBookings;
    const nextUnEditableBookings = nextProps.unEditableBookings;
    const curUnEditableBookings = this.props.unEditableBookings;

    return nextProps.isBookingPanelExpanded !== this.props.isBookingPanelExpanded
      || nextProps.isShownQuickView !== this.props.isShownQuickView
      || nextProps.hasError !== this.props.hasError
      || nextProps.selectedDate !== this.props.selectedDate
      || (this.props.isResourcesExpanded && !nextProps.isResourcesExpanded)
      || nextEditableBookings.size !== curEditableBookings.size
      // Clear all or quick view reselect
      || !shallowEqualImmutable(nextProps.loadedResourceIDs, this.props.loadedResourceIDs)
      || nextUnEditableBookings.size !== curUnEditableBookings.size
      || !shallowEqualImmutable(nextUnEditableBookings, curUnEditableBookings)
      || nextEditableBookings.some(
        (nextBook) => {
          const curBooking = curEditableBookings.find(book => book.get('id') === nextBook.get('id'));
          if (
            curBooking.get('startScheduleDate') !== nextBook.get('startScheduleDate') ||
            curBooking.get('startScheduleTime') !== nextBook.get('startScheduleTime') ||
            curBooking.get('endScheduleDate') !== nextBook.get('endScheduleDate') ||
            curBooking.get('endScheduleTime') !== nextBook.get('endScheduleTime') ||
            curBooking.get('attendance') !== nextBook.get('attendance') ||
            curBooking.get('dropStamp') !== nextBook.get('dropStamp')
          ) {
            return true;
          }
          return false;
        }
      );
  }

  onScroll = throttle(() => {
    this.curHoverEvent = null;
    Tooltip.close();
  }, 40);

  onSelectionChange = () => {
    this.curHoverEvent = null;
    Tooltip.close();
  }

  onSegMouseEnter = (jsEvent, seg) => {
    jsEvent.persist();
    if (jsEvent.buttons !== 0) return;

    const {
      unEditableBookings, editableBookings, curentEventName, bookingPanelResourceMap
    } = this.props;
    const bookings = unEditableBookings.concat(editableBookings);
    const bookingID = getBookingID(seg.event);
    const event = bookings.find(book => book.get('id') === bookingID);

    if (event) {
      const pureEvent = event.toJS();
      const resourceID = `${pureEvent.resourceID}`;
      pureEvent.eventName = curentEventName;
      pureEvent.eventType = bookingPanelResourceMap.getIn([resourceID, 'eventType']);

      this.curHoverEvent = pureEvent;
    } else {
      this.curHoverEvent = seg.event;
    }
    this.showEventTooltip(jsEvent);
  }
  onSegMouseLeave = (jsEvent) => {
    // if the window is limit, then the tooltip will cover the event dom,
    // then trigger the mouseout event. In this case, the tooltip should not be closed.
    this.curHoverEvent = null;
    if (jsEvent && isPointInDOM(jsEvent.clientX, jsEvent.clientY, jsEvent.target)) {
      return;
    }
    Tooltip.close();
  }

  onResourceRemove = (resource) => {
    const { loadedResourceIDs } = this.props;
    const resourceIDs = loadedResourceIDs.filter(id => id !== resource.resourceID);

    this.props.setSelectedResource(resourceIDs); // for filter action
    this.props.saveFilters(); // for save fitler
    this.props.bookingPanelUpdateLoadedResources(resourceIDs);
    this.props.updateQuickViewForDeleteResourceAction();

    return false;
  }

  onEventOpen = (e, seg) => {
    if (!isEmpty(seg)) {
      const event = seg.event;

      const { permitID, receiptID, batchID } = this.props.initialData;
      const { availableBookingCount } = this.props;
     // if it's your permit, display bookingInformation popup
      if (event.currentEvent === true) {
        this.props.showBookingPanelAction();
        return false;
      }

      const isNewWorkflow = parseInt(permitID || 0, 10) === 0;
      if (isNewWorkflow) {
        const isExistedPermit = event.permitID > 0;
        if (isExistedPermit) {
          /* istanbul ignore next */
          return this.props.getPermitAccessibleAsyncAction(event.permitID)
            .then(({
              payload: {
                body: {
                  is_permit_accessible: isAccessible,
                  message,
                  is_created_by_new_workflow: isCreatedByNewWorkflow
                }
              }
            }) => {
              const isPermitAccessable = isAccessible === 'true';
              if (isPermitAccessable) {
                const isLegacyPermit = isCreatedByNewWorkflow !== 'true';
                if (isLegacyPermit) {
                  return openNonPermit();
                }

                // Try to open an existing permit which is created in new reservation module
                return openPermitInNewWorkFlow(availableBookingCount)
                  .then(
                    () => this.props.cancelReceiptAsyncAction(batchID, receiptID, false)
                  ).then(() => {
                    this.props.redirect(pages.buildUrl(pages.reservationDetailPage, {
                      permit_id: event.permitID,
                      [pages.entryPageKey]: pages.CALENDAR
                    }), null, false);
                  });
              }

              // No permission to open the permit
              return openNonAccessablePermit(message);
            });
        }

        // Pending permit created by others
        if (event.isPendingOfOtherPermit) {
          return openPendingPermitOfOthers(event);
        }

        const isCloseSkipEvent = isCloseOrSkipBooking(event.type);
        if (isCloseSkipEvent) {
          return false;
        }

        // Try to open any other entities -activity meeting date, daycare session, or league
        return openNonPermit();
      }
      return this._calendarError(event);
    }

    return false;
  }

  onMarqueeEnd = (e) => {
    const { resources, startDate, endDate } = e;
    const bookings = resources.map(resource => ({
      resource,
      start: startDate.clone(),
      end: endDate.clone()
    }));

    this.props.createBookingsAction(bookings);
  }

  onResourceHeaderClick = (e, resource) => {
    window.open(`${window.__environment__.ROOT_URL}/servlet/${resource.resourceType === 2 ? 'fD' : 'adminChange'}.sdi?oc=Facility&facility_id=${resource.id}&item_type=${resource.resourceType}`,
         'resourceInfo',
         'width=400,height=550,top=300,left=400,menubar=no,resizable=yes,scrollbars=yes'
     );
    return false;
  }

  getResources = () => {
    const { resourceMap, initialData, loadedResourceIDs } = this.props;
    const { facilityTypeLabel, instructorLabel } = initialData;

    const resourceTypeMap = {
      resourceType0: decodeHtmlStr(facilityTypeLabel),
      resourceType1: 'equipment',
      resourceType2: decodeHtmlStr(instructorLabel)
    };

    const resourceType = {
      resourceType0: 'facility',
      resourceType1: 'equipment',
      resourceType2: 'instructor'
    };

    const resources = loadedResourceIDs.toJS().map((id) => {
      const resourceID = `${id}`;
      const immutableResource = resourceMap.get(resourceID);
      const resource = (immutableResource && immutableResource.toJS()) || {};

      return {
        ...resource,
        id: resourceID,
        name: resource.resourceName,
        type: resourceType[`resourceType${resource.resourceType}`],
        label: resourceTypeMap[`resourceType${resource.resourceType}`]
      };
    });

    return resources;
  }

  getState = (event) => {
    const isCloseSkipEvent = event.type === 'skip' || event.type === 'closed';
    const isCurrentEventBooking = event.currentEvent;
    const isPendingOfOtherPermit = event.isPendingOfOtherPermit;
    let bookingStatus = event.permitStatusDescription;

    if (isCurrentEventBooking || isPendingOfOtherPermit) {
      bookingStatus = 'Pending';
    } else if (isCloseSkipEvent) {
      bookingStatus = 'Closed';
    }

    if (!bookingStatus) {
      bookingStatus = 'Approved';
    }

    const status = bookingStatus.replace(' ', '-').toLowerCase();

    return status;
  }

  getEvents() {
    const {
      editableBookings, unEditableBookings, curentEventName,
      resourceMap, bookingPanelResourceMap, currentScheduleType
    } = this.props;
    const bookings = editableBookings.concat(unEditableBookings).toJS();
    const events = bookings.concat(
      this.state.skipTimeEvents,
      this.state.closeTimeEvents
    );
    const result = events.map((event) => {
      const { resourceID, start, end, id, currentEvent, permitID,
        permitNumber, customerName, customerType, companyName,
        startScheduleDate, endScheduleDate, startScheduleTime, endScheduleTime,
        startScheduleDay, endScheduleDay, startEventDate, endEventDate, startEventTime,
        endEventTime, attendance, permitStatusDescription, type,
        reservationScope, activityIgnoreMaximum, bookingAssignment, resourceBookingID, pendingID
      } = event;
      const resource = resourceMap.get(`${resourceID}`);
      const bookingPanelResource = bookingPanelResourceMap.get(`${resourceID}`);

      const eventName = currentEvent ? curentEventName : event.eventName;
      const isAllDay = false;
      const permitStatus = permitID > 0 && permitStatusDescription ?
        `Status: ${permitStatusDescription}` : '';
      const numberOfPermit = (permitID > 0 && permitNumber) || '';
      const customer = customerName || companyName || '';
      const resourceType = resource.get('resourceType');
      const eventType = currentEvent ? (bookingPanelResource && bookingPanelResource.get('eventType')) || '' : event.eventType;
      const eventTypeID = currentEvent ?
        (bookingPanelResource && bookingPanelResource.get('eventTypeID')) || -1 :
        event.eventTypeId;

      const scheduleType = currentEvent ? currentScheduleType : event.scheduleType;
      const eventTypeStyle = getBookingStyle(eventTypeID, bookingAssignment, type);
      let backgroundColor = '';
      let textColor = '';

      if (eventTypeStyle) {
        backgroundColor = eventTypeStyle.backgroundColor;
        textColor = eventTypeStyle.textColor;
      }

      const data = {
        id,
        resourceId: `${resourceID}`,
        resourceID,
        resourceBookingID,
        pendingID,
        start,
        end,
        title: eventName,
        state: this.getState(event),
        type: event.type,
        detail: `${numberOfPermit} ${customer} ${permitStatus}`,
        permitID,
        permitNumber,
        isAllDay,
        customerType,
        resourceType,
        startEventDate,
        startEventTime,
        startScheduleTime,
        startScheduleDay,
        startScheduleDate,
        endEventDate,
        endEventTime,
        endScheduleTime,
        endScheduleDay,
        endScheduleDate,
        eventType,
        eventName,
        attendance,
        permitStatusDescription,
        scheduleType,
        reservationScope,
        activityIgnoreMaximum,
        bookingAssignment,
        editable: currentEvent,
        currentEvent,
        customBlockStyle: backgroundColor ? { 'background-color': backgroundColor, color: textColor, 'border-color': darken(backgroundColor, 15) } : {},
        customIconStyle: backgroundColor ? { color: backgroundColor } : {}
      };

      return data;
    });

    return result;
  }

  getMonthSkipEvents = (resource, startDayOfMonthMoment, endDayOfMonthMoment) => {
    let skipTimeEvents = [];
    const start = startDayOfMonthMoment;
    const end = endDayOfMonthMoment;
    const diff = end.diff(start, 'days');
    const resourceSkipDate = resource.get('resourceSkipDate').toJS();

    let i = 0;
    const tempDate = start.clone();

    const skipDate = this.filterSkipDate(resourceSkipDate);
    while (i < diff) {
      const skipEvents = getSkipEvents(
          skipDate,
          resource.get('resourceID'),
          tempDate,
          true
        );
      skipTimeEvents = skipTimeEvents.concat(skipEvents);
      tempDate.add(1, 'days');
      i += 1;
    }
    return skipTimeEvents;
  }

  setCloseAndSkipState = (
    resourceMap, selectedDate, startDayOfMonthMoment, endDayOfMonthMoment
  ) => {
    let skipTimeEvents = [];
    let closeTimeEvents = [];

    /* istanbul ignore else */
    resourceMap.forEach((resource) => {
      const resourceID = resource.get('resourceID');
      const resourceClosedTimes = resource.get('closedTimes').toJS();

      skipTimeEvents = skipTimeEvents.concat(
        this.getMonthSkipEvents(resource, startDayOfMonthMoment, endDayOfMonthMoment));
      const closedTimes = resourceClosedTimes ?
        resourceClosedTimes.filter(item => item.closedAllDay) : [];
      closeTimeEvents = closeTimeEvents.concat(getCloseEvent(closedTimes,
        resourceID, selectedDate, true));
    });

    this.setState({
      skipTimeEvents,
      closeTimeEvents
    });
  }

  filterSkipDate = (skipDate) => {
    const result = skipDate.filter((item) => {
      const start = `${item.startDate} ${item.startTime}`;
      const end = `${item.endDate} ${item.endTime}`;
      const isAllday = this.isAllDayHandler(start, end);
      const isCrossDay = moment(item.startDate).isBefore(moment(item.endDate));

      return isAllday || isCrossDay;
    });

    return result;
  }

  showEventTooltip = debounce((e) => {
    if (this.curHoverEvent) {
      let elmEvent = e.target || null;
      if (elmEvent && !hasClass(elmEvent, 'an-rc-event-seg')) {
        elmEvent = elmEvent.parentNode;
      }
      if (!elmEvent) {
        return;
      }

      const positionLeft = e.pageX;
      const rect = elmEvent.getBoundingClientRect();
      const dockStyle = Math.abs(rect.left - positionLeft) < Math.abs(rect.right - positionLeft) ?
        Dock.LEFT_MIDDLE : Dock.RIGHT_MIDDLE;
      const tooltipOptions = {
        dockStyle,
        stick: true,
        content: <CalendarTooltip
          event={this.curHoverEvent}
          initialData={this.props.initialData}
          isMonthView
        />
      };

      Tooltip.open(elmEvent, tooltipOptions);
    } else {
      Tooltip.close();
    }
  }, 600);

  gotoDayView = (e, date) => {
    const tempDate = e.date ? e.date.value : date;
    const formattedDate = DateTimeFormat.formatDate(tempDate);

    this.props.switchViewAction(true, formattedDate);
  }

  _calendarError = (event) => {
    if (event.isPendingOfOtherPermit) {
      openPendingPermitOfOthers(event);
    }
  }

  isAllDayHandler = (start, end) => {
    let isAllDay = false;
    if (DateTimeFormat.parseDateTime(end).diff(DateTimeFormat.parseDateTime(start), 'hour') === 24
      && DateTimeFormat.parseDateTime(start).format('H:mm') === '0:00') {
      isAllDay = true;
    }

    return isAllDay;
  }

  render() {
    const { selectedDate } = this.props;
    const events = this.getEvents();
    const resources = this.getResources();
    const { currentDate, currentTime } = this.props.initialData;
    const serverDate = DateTimeFormat.parseDateTime(`${currentDate} ${currentTime}`);
    return (
      <div style={{ width: '100%' }} className="month-view">
        <ResourceCalendar
          ref={(c) => { this.resourceCalendarRef = c; }}
          style={{ width: '100%', height: '100%' }}
          displayDate={selectedDate}
          resources={resources}
          events={events}
          showTooltip={false}
          customMore
          exclusiveMode
          onMarqueeEnd={this.onMarqueeEnd}
          onEventOpen={this.onEventOpen}
          onResourceRemove={this.onResourceRemove}
          onResourceHeaderClick={this.onResourceHeaderClick}
          onDateHeaderClick={this.gotoDayView}
          onMoreClick={this.gotoDayView}
          onSegMouseEnter={this.onSegMouseEnter}
          onSegMouseLeave={this.onSegMouseLeave}
          onSelectionChange={this.onSelectionChange}
          onScroll={this.onScroll}
          currentDate={serverDate}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    setSelectedResource,
    updateQuickViewForDeleteResourceAction,
    saveFilters,
    getPermitAccessibleAsyncAction,
    redirect,
    cancelReceiptAsyncAction,
    createBookingsAction,
    showBookingPanelAction,
    bookingPanelUpdateLoadedResources
  },
  null
)(MonthView);

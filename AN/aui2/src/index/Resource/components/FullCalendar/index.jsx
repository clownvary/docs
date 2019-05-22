import React from 'react';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import { shallowEqualImmutable } from 'react-immutable-render-mixin';
import { connect } from 'react-redux';
import escape from 'lodash/escape';
import uniqueId from 'lodash/uniqueId';
import Globalize from 'react-base-ui/lib/services/i18n';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import DateTimeFormat from 'shared/utils/DateTimeFormat';
import UIComponent from 'shared/components/UIComponent';
import { pages } from 'shared/consts';
import Fullcalendar from 'shared/components/Fullcalendar';
import { raiseUnrecognizedAuthCode } from 'shared/actions/Authority';
import { DELETE, BACKSPACE } from 'react-base-ui/lib/consts/KeyCode';
import { Dock } from 'react-base-ui/lib/consts';
import { isPointInDOM } from 'react-base-ui/lib/utils/dom';
import { isIE } from 'react-base-ui/lib/utils/browser';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import some from 'lodash/some';
import { cancelReceiptAsyncAction } from 'shared/actions/receipt';
import { redirect } from 'shared/actions/route';
import { darken, lighten } from 'shared/utils/color';
import reservationPeriodUnit from '../../consts/reservationPeriodUnit';
import { isCloseOrSkipBooking, getBookingStyle } from '../../utils/bookingHelper';

import calendarConfig, { bookingStatusColorMap } from './config';
import {
  isShowInfoHandler,
  getSkipEvents,
  getCloseEvent,
  getCloseSkipEventHtml,
  getDateTimeFormatString
} from './eventInfo';

import {
  CURRENT_SERVER_DATE_TIME,
  ACTIVITY_LABEL,
  DAYCARE_LABEL,
  bookingHelper
} from './utils';

import CalendarTooltip from '../CalendarTooltip';
import {
  deleteBookingBlockAction,
  getPermitAccessibleAsyncAction,
  addEitableBookingsAndBookingPanelResourcesAction
} from '../../actions/booking';
import { fetchRentalBlockAndDateRangeByResourceIdsAsyncAction } from '../../actions/configurationData';
import { setSelectedResource, saveFilters } from '../../actions/resourceFilters';
import { createBookingsAction } from '../../actions/calendar';
import {
  showBookingPanelAction,
  addBookingInfoDetails,
  changeResoureInfoAutoFill,
  resetOverrideRentalBlock,
  bookingPanelUpdateResourceDetailAction,
  bookingPanelUpdateDateTimeAction,
  bookingPanelResetOverrideRentalBlockAction,
  bookingPanelUpdateLoadedResources
} from '../../actions/bookingPanel';
import {
  bookingPanelSetTemplateAndApplyAction
} from '../../actions/bookingPanelTemplate';
import { bookingPanelClearErrAction } from '../../actions/bookingPanelValidation';
import { updateQuickViewForDeleteResourceAction } from '../../actions/quickView';
import validateBookingsByTimeslot from '../../utils/timeslotValidation';
import getResourceType from '../../utils/resourceType';
import ResizeHelper from '../../utils/resize';
import { enableScroll } from '../../utils/overflow';
import AMIds from '../../automationIds';
import {
  openNonPermit,
  openPermitInNewWorkFlow,
  openPendingPermitOfOthers,
  openNonAccessablePermit
} from '../../utils/confirmations';

import './index.less';
import './fullCalendar.less';

export class Resources extends UIComponent {

  constructor(props) {
    super(props);

    this.curClickEvent = null;
    this.curHoverEvent = null;
    this.curSelectedElement = null;
    this.bookingHelper = bookingHelper;
    this.resizeHelper = new ResizeHelper({
      onResizeStart: this.onResizeStart,
      onResizeEnd: this.onResizeEnd
    });
    this.dragging = {};
    this.state = {
      closeTimeEvents: [],
      skipTimeEvents: [],
      now: CURRENT_SERVER_DATE_TIME
    };

    calendarConfig.titleFormat = Globalize.ANDateFormat;
    calendarConfig.timeFormat = Globalize.ANTimeFormat;
    calendarConfig.slotLableFormat = Globalize.ANTimeFormat;
    calendarConfig.columnFormat = Globalize.ANTimeFormat;
    calendarConfig.axisFormat = Globalize.ANTimeFormat;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isBookingPanelExpanded && this.props.isBookingPanelExpanded) {
      return false;
    }

    if (nextProps.isResourcesExpanded) {
      return false;
    }

    const nextEditableBookings = nextProps.editableBookings;
    const curEditableBookings = this.props.editableBookings;
    const nextUnEditableBookings = nextProps.unEditableBookings;
    const curUnEditableBookings = this.props.unEditableBookings;

    return !shallowEqualImmutable(this.state, nextState)
      || nextProps.isBookingPanelExpanded !== this.props.isBookingPanelExpanded
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

  setCloseAndSkipState = (resourceMap, selectedDate) => {
    let skipTimeEvents = [];
    let closeTimeEvents = [];

    resourceMap.map((resource) => {
      const resourceID = resource.get('resourceID');
      const resourceSkipDate = resource.get('resourceSkipDate').toJS();
      const closedTimes = resource.get('closedTimes').toJS();

      skipTimeEvents = skipTimeEvents.concat(
        getSkipEvents(resourceSkipDate, resourceID, selectedDate)
      );

      closeTimeEvents = closeTimeEvents.concat(
        getCloseEvent(closedTimes, resourceID, selectedDate)
      );

      return false;
    });

    this.setState({
      skipTimeEvents,
      closeTimeEvents
    });
  }

  componentWillMount() {
    const { resourceMap, selectedDate } = this.props;
    this.setCloseAndSkipState(resourceMap, selectedDate);
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqualImmutable(this.props.resourceMap, nextProps.resourceMap) ||
      this.props.selectedDate !== nextProps.selectedDate) {
      this.setCloseAndSkipState(nextProps.resourceMap, nextProps.selectedDate);
    }
  }

  componentDidMount() {
    const targetCanvas = findDOMNode(this._refs.calendarRootDom);
    targetCanvas.addEventListener('keydown', this.onKeyDown);
    targetCanvas.addEventListener('click', this.removeBookingSelected, true);
    targetCanvas.addEventListener('mousemove', this.onMouseMove);
    targetCanvas.addEventListener('mousedown', this.onMouseDown);
    targetCanvas.addEventListener('mouseup', this.onMouseUp);

    document.addEventListener('scroll', this.onScroll, true);
    this.bookingHelper.setRootDom($(this._refs.calendarRootDom));
  }

  componentDidUpdate() {
    const { isShownQuickView, hasError, isBookingPanelExpanded } = this.props;
    const calendarScrollBars = document.querySelector('.fc-time-grid-container .fc-scroll .fc-scroll-bars');
    enableScroll(calendarScrollBars, !isBookingPanelExpanded && !isShownQuickView && !hasError);
  }

  componentWillUnmount() {
    const targetCanvas = findDOMNode(this._refs.calendarRootDom);
    targetCanvas.removeEventListener('keydown', this.onKeyDown);
    targetCanvas.removeEventListener('click', this.removeBookingSelected);
    targetCanvas.removeEventListener('mousemove', this.onMouseMove);
    targetCanvas.removeEventListener('mousedown', this.onMouseDown);
    targetCanvas.removeEventListener('mouseup', this.onMouseUp);

    document.removeEventListener('scroll', this.onScroll, true);
  }

  transferCalling(...params) {
    return this.fullcalendar.transferCalling(...params);
  }

  render() {
    const { selectedDate, editableBookings, unEditableBookings,
      loadedResourceIDs, resourceMap, curentEventName, bookingPanelResourceMap } = this.props;
    const { skipTimeEvents, closeTimeEvents, now } = this.state;
    const editableBookingsWithEventInfo = editableBookings.toJS().map(
      (booking) => {
        const resourceID = `${booking.resourceID}`;
        booking.eventName = curentEventName;
        booking.eventType = bookingPanelResourceMap.getIn([resourceID, 'eventType']);
        booking.eventTypeId = bookingPanelResourceMap.getIn([resourceID, 'eventTypeID']);
        return booking;
      }
    );
    const bookings = editableBookingsWithEventInfo.concat(unEditableBookings.toJS());
    const events = bookings.concat(skipTimeEvents, closeTimeEvents);
    const currentTime = now ? now.format('YYYY-MM-DDTHH:mm:ss') : '';
    const resources = loadedResourceIDs.map(id => resourceMap.get(`${id}`).toJS()).toJS();

    return (
      <section ref={el => (this._refs.calendarRootDom = el)} className="booking-resources">
        <Fullcalendar
          ref={(c) => {
            this.fullcalendar = this.fullcalendar || c;
          }}
          {...calendarConfig}
          extendedHeaderProps={{
            closeAble: true,
            emptyHintText: 'No resources Selected.',
            renderCell: (resource) => {
              const resourceTypeName = getResourceType(resource.resourceType);
              const resourceName = resource.resourceName;

              const mouseOver = 'this.nextSibling.children[0].style.display="inline-block"';
              const mouseOut = 'this.nextSibling.children[0].style.display="none"';
              /* eslint-disable quotes */
              const clickLink =
                `window.open("${window.__environment__.ROOT_URL}/servlet/${resource.resourceType === 2 ? "fD" : "adminChange"}.sdi?oc=Facility&facility_id=${resource.resourceID}&item_type=${resource.resourceType}",
                    "resourceInfo",
                    "width=400,height=550,top=300,left=400,menubar=no,resizable=yes,scrollbars=yes"
                );
                return false;`;
              /* eslint-disable quotes */

              return `
                  <div class='resource-state' onmouseover='${mouseOver}' onmouseout='${mouseOut}'>
                    <span class='rs-state-tag rs-state-tag-type${resource.resourceType}'>
                      ${decodeHtmlStr(resourceTypeName).slice(0, 1).toLocaleUpperCase()}
                    </span>
                    <a onclick='${clickLink}'>${escape(resourceName)}</a>
                    <div class='calendar-header-mask'></div>
                  </div>`;
            },
            closeIconReturn: () => '<a class="icon icon-close" title="Click x to remove"></a>',
            closeTriggerBefore: this.onDeleteResource
          }}
          defaultDate={selectedDate}
          selectable
          now={currentTime}
          getNowTime={this.props.getNowTime}
          eventMouseover={this.onEventMouseover}
          eventMouseout={this.onEventMouseout}
          eventClick={this.onEventClick}
          eventRender={this.onEventRender}
          eventAfterRender={this.onEventAfterRender}
          eventAfterAllRender={this.onEventAfterAllRender}
          eventDragStart={this.onEventDragStart}
          eventDrop={this.onEventDrop}
          events={events}
          resources={resources}
          select={timeslots => this.onSelect(timeslots)}
        />
      </section>
    );
  }

  showEventTooltip = debounce((e) => {
    if (this.curHoverEvent) {
      const $event = e ? $(e.target).parent('.fc-event') : null;
      const elmEvent = $event ? $event[0] : null;
      /* istanbul ignore else */
      if (!elmEvent) {
        return;
      }

      const position = {
        left: e.pageX,
        top: e.pageY
      };

      const rect = elmEvent.getBoundingClientRect();
      const dockStyle = Math.abs(rect.left - position.left) < Math.abs(rect.right - position.left) ?
        Dock.LEFT_MIDDLE : Dock.RIGHT_MIDDLE;
      position.left = dockStyle === Dock.LEFT_MIDDLE ? rect.left : rect.right;

      const tooltipOptions = {
        position,
        dockStyle,
        stick: true,
        content: <CalendarTooltip event={this.curHoverEvent} initialData={this.props.initialData} />
      };

      Tooltip.open(elmEvent, tooltipOptions);
    } else {
      this.closeToolTip();
    }
  }, 600);

  closeToolTip = () => {
    Tooltip.close();
  }

  onScroll = throttle(() => {
    this.curHoverEvent = null;
    this.closeToolTip();
  }, 40);

  onMouseUp = () => {
    if (this.resizeHelper.isResizing) {
      this.resizeHelper.stop();
    }
  }

  onMouseDown = (e) => {
    this.resizeHelper.start(e);
  }

  onMouseMove = (e) => {
    if (this.resizeHelper.isResizing) {
      this.resizeHelper.resize(e);
    } else {
      this.resizeHelper.observe(e);
    }

    if (e.buttons !== 0) return;
    this.showEventTooltip(e);
  }

  onEventMouseover = (event, jsEvent) => {
    if (jsEvent.buttons !== 0) return;

    this.curHoverEvent = event;
  }

  onEventMouseout = (event, jsEvent) => {
    // if the window is limit, then the tooltip will cover the event dom,
    // then trigger the mouseout event. In this case, the tooltip should not be closed.
    if (jsEvent && isPointInDOM(jsEvent.clientX, jsEvent.clientY, jsEvent.target)) {
      this.curHoverEvent = null;
      return;
    }
    this.curHoverEvent = null;
    this.closeToolTip();
  }

  _calendarError = (event) => {
    /* istanbul ignore else */
    if (event.isPendingOfOtherPermit) {
      openPendingPermitOfOthers(event);
    }
  }

  onKeyDown = (e) => {
    if (this.bookingHelper.events.length > 0 && (e.keyCode === DELETE
      || e.keyCode === BACKSPACE)) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      // delete action will run
      /* istanbul ignore else */
      if (!this.props.isBookingPanelExpanded) {
        this.bookingHelper.events.forEach((bookingSelected) => {
          this.props.deleteBookingBlockAction(bookingSelected);
        });
      }
    }
  }

  removeBookingSelected = (e) => {
    this.closeToolTip();

    const $element = e ? $(e.target).parent('.fc-event') : null;
    const ownerPendingReceipt = this.curClickEvent ?
      this.curClickEvent.currentEvent : null;
    /* istanbul ignore else */
    if (!this.resizeHelper.isResizeMouseup) {
      if (($element && !$element.hasClass('fc-event')) || !ownerPendingReceipt) {
        if (this.curClickEvent) {
          const { eventTypeId, bookingAssignment, type } = this.curClickEvent;
          const eventTypeStyle = getBookingStyle(eventTypeId, bookingAssignment, type);
          if (eventTypeStyle) {
            const backgroundColor = eventTypeStyle.backgroundColor;
            const content = this.curSelectedElement.find('fc-content');
            const borderColor = darken(backgroundColor, 15);
            this.curSelectedElement.css('border-color', borderColor);
            content.css({
              'border-top-color': borderColor,
              'border-bottom-color': borderColor
            });
          }
        }

        this.bookingHelper.clear();
      }
    } else {
      this.resizeHelper.focusKept();
    }
    this.curClickEvent = null;
    this.curSelectedElement = null;
  }

  onEventClick = (event, jsEvent) => {
    // if it' your permit, display bookingInformation popup
    this.curClickEvent = event;

    if (event.currentEvent) {
      const element = $(jsEvent.originalEvent.target).closest('.fc-event');
      this.curSelectedElement = element;
      this.bookingHelper.select(event, element);

      const { eventTypeId, bookingAssignment, type } = event;
      const eventTypeStyle = getBookingStyle(eventTypeId, bookingAssignment, type);
      if (eventTypeStyle) {
        const backgroundColor = eventTypeStyle.backgroundColor;
        const content = element.find('fc-content');
        const borderColor = darken(backgroundColor, 30);
        element.css({ 'border-color': borderColor });
        content.css({
          'border-top-color': borderColor,
          'border-bottom-color': borderColor
        });
      }
      return false;
    }
    this._calendarError(event);
    return false;
  }

  calculateContentTop = (event, selectedDate) => {
    let top = 0;
    const { bookingPanelResourceMap } = this.props;
    const resource = bookingPanelResourceMap.get(`${event.resourceID}`);
    const setupMinutes = event.isUnEditableBooking ? event.setupMinutes
      : (resource && resource.get('setupMinutes'));

    /* istanbul ignore else */
    if (setupMinutes > 0) {
      const { dayStart, dayEnd } = DateTimeFormat.getDayRange(selectedDate);

      let scheduleStart = event.start.clone();
      let eventStart = scheduleStart.clone().add(setupMinutes, 'minutes');

      scheduleStart = moment.min(dayEnd, moment.max(dayStart, scheduleStart));
      eventStart = moment.min(dayEnd, moment.max(dayStart, eventStart));

      const visibleSetupMinutes = eventStart.diff(scheduleStart, 'minutes');
      top = Math.round((visibleSetupMinutes * 2) / 3); // rawTop means
    }

    return top > 1 ? top - 1 : top;
  }

  calculateContentBottom = (event, selectedDate) => {
    let bottom = 0;
    const { bookingPanelResourceMap } = this.props;
    const resource = bookingPanelResourceMap.get(`${event.resourceID}`);
    const cleanupMinutes = event.isUnEditableBooking ? event.cleanupMinutes
      : (resource && resource.get('cleanupMinutes'));

    /* istanbul ignore else */
    if (cleanupMinutes > 0 && event.end) {
      const { dayStart, dayEnd } = DateTimeFormat.getDayRange(selectedDate);

      let scheduleEnd = event.end.clone();
      let eventEnd = scheduleEnd.clone().subtract(cleanupMinutes, 'minutes');

      scheduleEnd = moment.min(dayEnd, moment.max(dayStart, scheduleEnd));
      eventEnd = moment.min(dayEnd, moment.max(dayStart, eventEnd));

      const visibleCleanupMinutes = scheduleEnd.diff(eventEnd, 'minutes');
      bottom = Math.round((visibleCleanupMinutes * 2) / 3);
    }

    return bottom > 1 ? bottom - 1 : bottom;
  }

  onEventRender = (event, element) => {
    if (event) {
      const { selectedDate, resourceMap } = this.props;
      const resource = resourceMap.get(`${event.resourceID}`);
      const RU = resource.get('reservationPeriodUnit');
      const eventType = event.type;
      const bookingAssignment = event.bookingAssignment;
      const eventTypeId = event.eventTypeId;
      const isCloseSkipEvent = isCloseOrSkipBooking(eventType);
      const eventTypeStyle = getBookingStyle(eventTypeId, bookingAssignment, eventType);

      if (eventTypeStyle) {
        const backgroundColor = eventTypeStyle.backgroundColor;
        element.css('cssText', `background-color:${lighten(backgroundColor, 5)} !important;
        border-color: ${darken(backgroundColor, 15)};`);
      }
      element.addClass(this.getStatusClass(event));
      element.attr('data-qa-id', AMIds.calendar.booking);

      if (this.dragging[event.id]) {
        element.addClass('is-dragging');
        if (!some(this.bookingHelper.events, { id: event.id })) {
          this.bookingHelper.addItem(event, element);
        }
      } else {
        element.removeClass('is-dragging');
      }

      if (event.currentEvent && (
        RU === reservationPeriodUnit.MINUTE ||
        RU === reservationPeriodUnit.HOUR ||
        RU === reservationPeriodUnit.RENTAL_BLOCK ||
        RU === reservationPeriodUnit.OVER_NIGHT
      )) {
        event.startEditable = true;
        element.addClass(`aui-resizable`);
        element.attr('data-resize-id', event.id);
        this.resizeHelper.push(event);
      }

      const $content = element.children('.fc-content');
      const isShowInfo = isShowInfoHandler(event, selectedDate);

      if (isCloseSkipEvent) {
        if (isShowInfo) {
          this.attachCloseSkipInfo($content, event);
        }
      } else {
        const contentTop = this.calculateContentTop(event, selectedDate);
        const contentBottom = this.calculateContentBottom(event, selectedDate);

        if (eventTypeStyle) {
          const backgroundColor = eventTypeStyle.backgroundColor;
          $content.css('cssText', `background-color:${backgroundColor} !important;
          border-color: ${darken(backgroundColor, 15)};`);
        }

        $content.css({
          top: contentTop,
          bottom: contentBottom,
          'border-top-width': contentTop ? '1px' : '0',
          'border-bottom-width': contentBottom ? '1px' : '0'
        });

        /* istanbul ignore else */
        if (isShowInfo) {
          this.attachEventInfo($content, event, resource);
        }
      }

      element.css('overflow', 'visible');
      $content.children('.fc-time').css('display', 'none');
    }
  }

  getStatusClass = (event) => {
    const isCloseSkipEvent = isCloseOrSkipBooking(event.type);
    const isCurrentEventBooking = event.currentEvent;
    const isPendingOfOtherPermit = event.isPendingOfOtherPermit;
    let bookingStatus = event.permitStatusDescription;

    if (isCurrentEventBooking || isPendingOfOtherPermit) {
      bookingStatus = 'Pending';
    } else if (isCloseSkipEvent) {
      bookingStatus = 'Closed';
    }

    /* istanbul ignore else */
    if (!bookingStatus) {
      bookingStatus = 'Approved';
    }

    return `fc-event-status-${bookingStatusColorMap[bookingStatus]} ${isCurrentEventBooking ? 'pointer' : ''}`;
  }

  initializeSelectedStatus = (event, element) => {
    // add focus style and initialization selected status
    /* istanbul ignore else */
    if (event.currentEvent) {
      /* istanbul ignore else */
      if (some(this.bookingHelper.events, { id: event.id })) {
        this.bookingHelper.addItem(event, element);
      }
    }
  }

  listenDoubleClick = (event, element) => {
    const { permitID, receiptID, batchID } = this.props.initialData;
    const { availableBookingCount } = this.props;

    element.on('dblclick', () => {
      // if it's your permit, display bookingInformation popup
      /* istanbul ignore else */
      if (event.currentEvent === true) {
        this.props.showBookingPanelAction();
        return false;
      }

      const isNewWorkflow = parseInt(permitID || 0, 10) === 0;
      if (isNewWorkflow) {
        const isExistedPermit = event.permitID > 0;
        // ANE-82393
        if (isExistedPermit) {
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
    });
  }

  attachCloseSkipInfo = ($content, event) => {
    let typeName = event.eventName + (event.isAllDay ? ' All Day' : '');
    if (event.type === 'closed') {
      typeName += '.';
    }

    const dateTime = event.isAllDay ? '' : getCloseSkipEventHtml(event);
    const closeTimeHtml = `<div class='fc-rs-event-close-time'>
                            <div class='fc-rs-event-text'>${decodeHtmlStr(typeName)}</div>
                           </div>`;
    $content.prepend(closeTimeHtml);

    if (!event.isAllDay) {
      $content.append(`<div class='fc-rs-event-close-time'>${dateTime}</div>`);
    }
  }

  attachEventInfo = ($content, event, resource) => {
    const resourceType = resource.get('resourceType');
    const attendanceTitle = resourceType === 1 ? 'Qty' : 'Attendees';
    const eventName = event.eventName;
    const bookingAssignment = event.bookingAssignment;
    const eventTypeId = event.eventTypeId;
    const type = event.type;
    const eventTypeStyle = getBookingStyle(eventTypeId, bookingAssignment, type);

    let style = '';

    if (eventTypeStyle) {
      const textColor = eventTypeStyle.textColor;
      style = `color:${textColor};`;
    }

    if (event.bookingAssignment === 0) {
      if (event.permitID !== -1) {
        if (event.permitStatusDescription) {
          const statusHtml = `<div class='fc-rs-event-status' style=${style}>
                                <div class='fc-rs-event-text'>
                                  <b>Status: </b>${event.permitStatusDescription}
                                </div>
                              </div>`;
          $content.prepend(statusHtml);
        }

        if (event.attendance >= 0 && resourceType !== 2) {
          const attendanceDiv = `<div class='fc-rs-event-status' style=${style}>
                                  <div class='fc-rs-event-text'>
                                    <b style=${style}>${attendanceTitle}:</b>
                                    ${event.attendance}
                                  </div>
                                </div>`;
          $content.prepend(attendanceDiv);
        }

        if (event.customerName) {
          const customerHtml = `<div class='fc-rs-event-owner' style=${style}>
                                  <div class='fc-rs-event-text'>${escape(event.companyName || event.customerName)}</div>
                                </div>`;
          $content.prepend(customerHtml);
        }
      }

      if (eventName) {
        const eventNameHtml = `<div class='fc-rs-event-name' style=${style}>
                                <div class='fc-rs-event-text'>${event.permitID !== -1 && event.permitNumber ? `#${event.permitNumber} ` : ''}${escape(eventName)}</div>
                               </div>`;
        $content.prepend(eventNameHtml);
      }
    } else if (event.bookingAssignment === 2) {
      const eventHtml = `<div class='fc-rs-event-status' style=${style}>
                          <div class='fc-rs-event-text'>${ACTIVITY_LABEL} Meeting Dates</div>
                         </div>`;
      $content.prepend(eventHtml);

      if (eventName) {
        const eventNameHtml = `<div class='fc-rs-event-name' style=${style}>
                               <div class='fc-rs-event-text'>${event.permitID !== -1 && event.permitNumber ? `#${event.permitNumber} ` : ''}${escape(eventName)}</div>
                             </div>`;
        $content.prepend(eventNameHtml);
      }
    } else if (event.bookingAssignment === 4) {
      const eventHtml = `<div class='fc-rs-event-status' style=${style}>
                          <div class='fc-rs-event-text'>${DAYCARE_LABEL} Sessions</div>
                         </div>`;
      $content.prepend(eventHtml);

      if (eventName) {
        const eventNameHtml = `<div class='fc-rs-event-name' style=${style}>
                                <div class='fc-rs-event-text'>${event.permitID !== -1 && event.permitNumber ? `#${event.permitNumber} ` : ''}${escape(eventName)}</div>
                               </div>`;
        $content.prepend(eventNameHtml);
      }
    }

    if (!event.isAllDay) {
      const dateTimeHtml = `<div class='fc-rs-event-time' style=${style}>
                              <div class='fc-rs-event-text'>${getDateTimeFormatString({
                                startDate: event.startScheduleDate,
                                endDate: event.endScheduleDate,
                                startTime: event.startScheduleTime,
                                endTime: event.endScheduleTime,
                                startScheduleDay: event.startScheduleDay,
                                endScheduleDay: event.endScheduleDay
                              })}</div>
                            </div>`;
      $content.append(dateTimeHtml);
    }
  }

  onEventAfterRender = (event, element) => {
    /* istanbul ignore else */
    if (event) {
      this.initializeSelectedStatus(event, element);
      this.listenDoubleClick(event, element);
    }
  }

  onEventAfterAllRender = () => {
    if (isIE()) {
      // https://jirafnd.dev.activenetwork.com/browse/ANE-81951
      // When [.fc-scroll-bars] has scroll bars on X axis will make [.fc-bg td] lose it's border
      // in IE, toggle the [.fc-bg td]'s border style will force the browser render the border back
      this.refreshBackgroundBorder();
    }
  }

  onEventDragStart = (event) => {
    this.dragging[event.id] = true;
    this.bookingHelper.clear();
  }

  refreshBackgroundBorder = () => {
    if (!this._refs.calendarRootDom.classList.contains('refresh-border')) {
      this._refs.calendarRootDom.classList.add('refresh-border');
    }
    setTimeout(() => {
      this._refs.calendarRootDom.classList.remove('refresh-border');
    }, 0);
  }

  updateBookingInformation = ({ keys, booking, resourceID, bookingID }, callback) => {
    validateBookingsByTimeslot([booking], (validatedBookings) => {
      if (validatedBookings.length) {
        const editingBooking = validatedBookings.shift();
        const validBooking = isFunction(callback) ? callback(editingBooking) : editingBooking;
        const isResizeRentalBlock = keys[0] === 'rentalBlockID';
        const { isRecurring, baseBookingID } = booking;

        if (isResizeRentalBlock && booking.isRentalBlockOverride) {
          this.props.bookingPanelResetOverrideRentalBlockAction(
            resourceID, bookingID, isRecurring, baseBookingID);
        }

        const dateTimeObject = {};
        keys.forEach((key) => { dateTimeObject[key] = validBooking[key]; });

        if (isRecurring) {
          dateTimeObject.isRecurring = isRecurring;
          dateTimeObject.baseBookingID = baseBookingID;
        }

        if (keys.every(key => booking[key] === dateTimeObject[key])) {
          /**
           * Fix the case when has setup/cleanup, the hour unit validation make the
           * start time or end time to the same time before drag, but the event.start/event.end
           * has changed.
           * Example:
           *  start event time before drag is Mar 16 0:00,
           *  start schedule time is Mar 15 23:40(setup 20),
           *  the start is Mar 15 23: 40
           *  Drag the start time to 0:20, the start will to been Mar 16 0:20,
           *  after validation, the start will been Mar 16 0:00, force update the calendar will
           *  make the calendar render wrong.
           *  */
          dateTimeObject.dropStamp = uniqueId(`drop_${Date.now()}_`);
        }

        this.props.bookingPanelUpdateDateTimeAction(
          resourceID,
          bookingID,
          dateTimeObject
        );

        if (isResizeRentalBlock) {
          this.props.bookingPanelClearErrAction({
            errorKey: 'rentalBlockID',
            bookingID
          });
        }

        if (validatedBookings.length) {
          this.props.addEitableBookingsAndBookingPanelResourcesAction(validatedBookings);
        }
      }
    });
  }

  updateRentalBlockBookingInformation = (event) => {
    const { rentalBlockMap } = this.props;
    const resourceID = `${event.resourceID}`;
    const resourceRetalBlocks = rentalBlockMap.get(resourceID);

    event.resource.rentalBlock = resourceRetalBlocks.toJS();

    this.updateBookingInformation({
      keys: ['rentalBlockID', 'startEventTime', 'endEventTime'],
      booking: event,
      resourceID,
      bookingID: event.id
    }, (validBooking) => {
      const rentalBlockID = validBooking.rentalBlockID;
      const rentalBlockName = validBooking.rentalBlockName;
      const rentalBlockTimes = rentalBlockName.split(' to ');
      const startEventTime = rentalBlockTimes[0];
      const endEventTime = rentalBlockTimes[1];

      return { ...validBooking, rentalBlockID, startEventTime, endEventTime };
    });
  }

  onEventDrop = (event, delta) => {
    const { resourceMap, bookingPanelResourceMap } = this.props;
    const resourceID = `${event.resourceID}`;
    const resource = resourceMap.get(resourceID).toJS();
    const bookingPanelResource = bookingPanelResourceMap.get(resourceID);
    const setupMinutes = bookingPanelResource.get('setupMinutes');
    const cleanupMinutes = bookingPanelResource.get('cleanupMinutes');
    const RU = resource.reservationPeriodUnit;

    delete this.dragging[event.id];

    event.resource = resource;

    if (setupMinutes) {
      event.start.add(setupMinutes, 'minutes');
    }

    if (cleanupMinutes) {
      event.end.subtract(cleanupMinutes, 'minutes');
    }

    if (
      RU === reservationPeriodUnit.MINUTE ||
      RU === reservationPeriodUnit.HOUR ||
      RU === reservationPeriodUnit.OVER_NIGHT
    ) {
      if (RU === reservationPeriodUnit.HOUR) {
        /* istanbul ignore else */
        if (event.start.minutes() && event.end.minutes()) {
          if (delta < 0) {
            if (delta.asMinutes() <= -30 && event.start.minutes() <= 30) {
              event.end.subtract(1, 'hour');
            } else {
              event.start.add(1, 'hour');
            }
          } else if (delta.asMinutes() > 30 && event.end.minutes() > 30) {
            event.start.add(1, 'hour');
          } else {
            event.end.subtract(1, 'hour');
          }
        }
      }

      if (event.reservationPeriodUnit === reservationPeriodUnit.OVER_NIGHT) {
        event.end = event.start.clone().add(1, 'minute');
      }

      this.updateBookingInformation({
        keys: ['startEventDate', 'startEventTime', 'endEventDate', 'endEventTime'],
        booking: event,
        resourceID,
        bookingID: event.id
      });
    } else if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
      this.updateRentalBlockBookingInformation(event);
    }
  }

  onResizeStart = (event, border) => {
    const { startDateMoment } = this.props;
    const { momentEventStart, momentEventEnd } = event;
    if (
      (border === 'bottom' && momentEventEnd.isAfter(startDateMoment.clone().add(1, 'd'))) ||
      (border === 'top' && momentEventStart.isBefore(startDateMoment))
    ) {
      this.resizeHelper.clearResize();
    } else {
      this.bookingHelper.clear();
    }
  }

  onResizeEnd = (event, delta, resize) => {
    const { bookingPanelResourceMap, resourceMap } = this.props;
    const resourceID = `${event.resourceID}`;
    const bookingPanelResource = bookingPanelResourceMap.get(resourceID);
    const resource = resourceMap.get(resourceID).toJS();
    const setupMinutes = bookingPanelResource.get('setupMinutes');
    const cleanupMinutes = bookingPanelResource.get('cleanupMinutes');
    const RU = resource.reservationPeriodUnit;

    event.resource = resource;

    if (resize.border === 'top' && resize.setupMinutes) {
      const value = setupMinutes - delta.asMinutes();
      this.props.bookingPanelUpdateResourceDetailAction(resourceID, { setupMinutes: value });
      this.props.bookingPanelSetTemplateAndApplyAction(resourceID, 'setupMinutes');
    } else if (resize.border === 'bottom' && resize.cleanupMinutes) {
      const value = cleanupMinutes - delta.asMinutes();
      this.props.bookingPanelUpdateResourceDetailAction(resourceID, { cleanupMinutes: value });
      this.props.bookingPanelSetTemplateAndApplyAction(resourceID, 'cleanupMinutes');
    } else if (
      RU === reservationPeriodUnit.MINUTE ||
      RU === reservationPeriodUnit.HOUR ||
      RU === reservationPeriodUnit.OVER_NIGHT
    ) {
      const isSameEndDay = event.end.isSame(event.momentEventEnd, 'day');

      if (setupMinutes) {
        event.start.add(setupMinutes, 'minutes');
      }

      if (cleanupMinutes) {
        event.end.subtract(cleanupMinutes, 'minutes');
      }

      if (RU === reservationPeriodUnit.OVER_NIGHT) { // Has no validation to do
        const bookingID = event.id;
        const dateTimeObject = {};

        if (resize.border === 'top') {
          dateTimeObject.startEventTime = Globalize.formatTime(event.start);
        } else {
          dateTimeObject.endEventTime = Globalize.formatTime(event.end);
          if (!isSameEndDay) {
            dateTimeObject.endEventDate = Globalize.formatDate(event.end);
          }
        }

        const { isRecurring, baseBookingID } = event;
        if (isRecurring) {
          dateTimeObject.isRecurring = isRecurring;
          dateTimeObject.baseBookingID = baseBookingID;
        }

        this.props.bookingPanelUpdateDateTimeAction(resourceID, bookingID, dateTimeObject);
      } else { // Need validation and reset based on the min/maxmum hours or minutes
        const keys = [];

        if (resize.border === 'bottom') {
          keys.push('endEventTime');

          if (!isSameEndDay) {
            keys.push('endEventDate');
          }
        }

        if (resize.border === 'top') {
          keys.push('startEventTime');
        }
        this.updateBookingInformation({
          keys,
          booking: event,
          resourceID,
          bookingID: event.id
        });
      }
    } else if (RU === reservationPeriodUnit.RENTAL_BLOCK) {
      this.updateRentalBlockBookingInformation(event);
    }

    this.bookingHelper.addItem(event, $(resize.element));
  }

  onDeleteResource = (resource) => {
    // return false to disable Fullcalendar's delete behavior.
    // use react way to refesh view.
    const { loadedResourceIDs } = this.props;
    const resourceIDs = loadedResourceIDs.filter(id => id !== resource.resourceID);

    this.props.setSelectedResource(resourceIDs); // for filter action
    this.props.saveFilters(); // for save fitler
    this.props.bookingPanelUpdateLoadedResources(resourceIDs);
    this.props.updateQuickViewForDeleteResourceAction();

    return false;
  }

  onSelect = (bookings = []) => {
    this.props.createBookingsAction(bookings);
  }
}

export default connect(
  null,
  {
    createBookingsAction,
    bookingPanelUpdateResourceDetailAction,
    bookingPanelUpdateDateTimeAction,
    setSelectedResource,
    saveFilters,
    fetchRentalBlockAndDateRangeByResourceIdsAsyncAction,
    deleteBookingBlockAction,
    showBookingPanelAction,
    addBookingInfoDetails,
    raiseUnrecognizedAuthCode,
    changeResoureInfoAutoFill,
    getPermitAccessibleAsyncAction,
    redirect,
    cancelReceiptAsyncAction,
    resetOverrideRentalBlock,
    addEitableBookingsAndBookingPanelResourcesAction,
    updateQuickViewForDeleteResourceAction,
    bookingPanelResetOverrideRentalBlockAction,
    bookingPanelSetTemplateAndApplyAction,
    bookingPanelClearErrAction,
    bookingPanelUpdateLoadedResources
  },
  null,
  { withRef: true }
)(Resources);

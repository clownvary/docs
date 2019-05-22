import isNil from 'lodash/isNil';
import moment from 'moment';
import Globalize from '../../../services/i18n';

class EventSeg {
  constructor(resource, event, start, end, index = 0, exclusiveMode, eventOrder = 'title',
    customBlockStyle = {}, customIconStyle = {}) {
    this.resource = resource;
    this.event = event;
    this.eventStart = event.start;
    this.eventEnd = event.end;
    this.eventOrder = event[eventOrder] || '';
    this.start = start;
    this.end = end;
    this.exclusiveMode = exclusiveMode;
    this.display = false;

    this.eventKey = `${resource.id}/${event.id}`;
    this.key = `${this.eventKey}-${index}`;

    // Cache the states
    this.isCrossDays = this.isCrossDays();
    this.isStartOfDay = this.isStartOfDay();
    this.isEndOfDay = this.isEndOfDay();
    this.span = this.getSpan(moment(this.start), moment(this.end));
    this.isAllDay = this.isStartOfDay &&
      this.isEndOfDay &&
      this.getSpan(moment(this.eventStart), moment(this.eventEnd)) === 0;
    this.text = this.getText();
    this.state = this.getState();
    this.type = this.getType();
    this.icon = this.type === 'short' ? 'icon-seg-state icon-circle' : null;
    this.editable = this.isEditable();
    this.customBlockStyle = customBlockStyle;
    this.customIconStyle = customIconStyle;
  }

  isCrossDays() {
    if (isNil(this.eventEnd)) {
      return false;
    }

    const eventEnd = moment(this.eventEnd);
    this.exclusiveMode && eventEnd.subtract(1, 'ms');
    const isSameDay = eventEnd.isSame(this.eventStart, 'day');
    return eventEnd.diff(moment(this.eventStart), 'days') > 0 || !isSameDay;
  }

  isStartOfDay() {
    const eventStart = moment(this.eventStart);
    return eventStart.isSame(moment(eventStart).startOf('day'));
  }

  isEndOfDay() {
    if (isNil(this.eventEnd)) {
      return true;
    }

    const eventEnd = moment(this.eventEnd);

    this.exclusiveMode && eventEnd.subtract(1, 'ms');
    return eventEnd.isSame(moment(eventEnd).endOf('day'));
  }

  getSpan(start, end) {
    if (isNil(this.eventEnd)) {
      return 0;
    }

    this.exclusiveMode && end.subtract(1, 'ms');
    let span = end.diff(start, 'days');
    const isSameDay = end.isSame(start, 'day');
    /**
     * span > 0
     *   2018-06-01 01:00PM - 2016-06-03 11:00AM
     *
     * span === 0
     *   2018-06-01 12:00AM - 2016-06-01 4:00PM
     *   2018-06-01 12:00AM - 2016-06-02 12:00AM
     *   2018-06-01 04:00AM - 2016-06-02 12:00AM
     *   2018-06-01 01:00PM - 2016-06-02 11:00AM(!isSameDay -> should cross days)
     */
    const isCrossDays = span > 0;

    if (isCrossDays || !isSameDay) {
      span = end.clone().endOf('day').diff(moment(start).startOf('day'), 'days');
    }

    return span;
  }

  getText() {
    let text = '';
    const timeFormat = Globalize.ANTimeFormat;

    if (this.isAllDay) {
      text = this.event.title;
    } else if (this.isCrossDays) {
      if (this.isStartOfDay && this.isEndOfDay) {
        text = `${this.event.title} ${this.event.detail || ''}`;
      } else {
        text = `${this.eventStart.format(timeFormat)} ${this.event.title} ${this.event.detail || ''}`;
      }
    } else {
      text = `${this.eventStart.format(timeFormat)}`;
    }

    return text;
  }

  getState() {
    return this.event.state || 'none';
  }

  getType() {
    return !this.isAllDay && !this.isCrossDays ? 'short' : 'long';
  }
  isEditable() {
    return this.event.editable;
  }
}

export default EventSeg;

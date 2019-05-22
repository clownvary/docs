import React from 'react';
import { string, bool, shape, arrayOf, object, number } from 'prop-types';
import HorizontalView from './horizontal';

/**
 * Default PropTypes of ResourceCalendar.
 */
const ResourceCalendarPropTypes = {
  /**
   * events data list.
   */
  /* eslint-disable  react/no-unused-prop-types */
  events: arrayOf(shape({
    id: string,
    resourceId: string,
    resourceID: number,
    resourceBookingID: number,
    pendingID: string,
    start: string,
    end: string,
    title: string,
    state: object,
    type: string,
    detail: string,
    permitID: number,
    permitNumber: string,
    isAllDay: bool,
    customerType: string,
    resourceType: number,
    startEventDate: string,
    startEventTime: string,
    startScheduleTime: string,
    startScheduleDay: string,
    startScheduleDate: string,
    endEventDate: string,
    endEventTime: string,
    endScheduleTime: string,
    endScheduleDay: string,
    endScheduleDate: string,
    eventType: string,
    eventName: string,
    attendance: number,
    permitStatusDescription: string,
    scheduleType: string,
    reservationScope: string,
    activityIgnoreMaximum: bool,
    bookingAssignment: number,
    editable: bool,
    currentEvent: object,
    customBlockStyle: object, // Should be used when event duration >= 24 hours
    customIconStyle: object // Should be used when event duration < 24 hours
  }))
};

/** Default Props for ResourceCalendar */
const ResourceCalendarProps = {
  events: []
};
class ResourceCalendar extends React.PureComponent {
  static displayName = 'ResourceCalendar';
  static defaultProps = ResourceCalendarProps;
  static propTypes = ResourceCalendarPropTypes;


  render() {
    const View = HorizontalView;

    return (
      <View {...this.props} ref={(c) => { this.view = c; }} />
    );
  }
}

export default ResourceCalendar;

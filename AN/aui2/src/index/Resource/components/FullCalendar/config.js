import Globalize from 'react-base-ui/lib/services/i18n';

export default {
  header: false,
  views: {
    resourceDay: {
      buttonText: 'Day'
    }
  },
  titleFormat: Globalize.ANDateFormat,
  defaultView: 'resourceDay',
  selectWireframeShow: true,
  slotEventOverlap: false,
  scrollTime: '08:00',
  minTime: '00:00:00',
  maxTime: '24:00:00',
  slotWidth: 2,
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  snapDuration: '00:15:00',
  businessHours: {
    start: '08:00:00',
    end: '18:00:00'
  },
  allDaySlot: false,
  firstDay: 1,
  extraFixedScrollBar: 'x', // Just support x now.
  editable: false,
  selectable: true,
  eventLimit: true,
  eventOrder: ['eventName'],
  timeFormat: Globalize.ANTimeFormat,
  slotLableFormat: Globalize.ANTimeFormat,
  columnFormat: Globalize.ANTimeFormat,
  axisFormat: Globalize.ANTimeFormat,
  resourceIdField: 'id',
  extendedGridProps: {
    showNowTimeLine: true
  },
  dragOpacity: 1.0,
  timezone: 'local',
  dragScroll: true,
  contentHeight: 550,
  windowResize: (view) => {
    const pageTitle = document.getElementsByClassName('page-title')[0];
    const height = pageTitle.offsetHeight + 102 + 20;

    const screenHeight = window.innerHeight || document.documentElement.clientHeight
     || document.body.clientHeight;

    const dayViewHeight = screenHeight - height - 30;
    view.setHeight(dayViewHeight);
  }
};

export const bookingStatusColorMap = {
  Closed: 'grey',
  Completed: 'green',
  Approved: 'green',
  Issued: 'green',
  Tentative: 'yellow',
  'Waiting Decision': 'yellow',
  'On Hold': 'yellow',
  'Stage Denied': 'yellow',
  Pending: 'purple'
};

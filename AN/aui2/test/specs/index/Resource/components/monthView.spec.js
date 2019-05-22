import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import configureStore from 'redux-mock-store';
import debounce from 'lodash/debounce';
import {MonthView} from 'index/Resource/components/MonthView';
import Tooltip from 'react-base-ui/lib/components/Tooltip';
import ResourceCalendar from 'react-base-ui/lib/components/ResourceCalendar';
import * as DomUtils from 'react-base-ui/lib/utils/dom';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));
jest.mock('lodash/throttle', () => jest.fn(fn => fn));

const setup = (props, store) => mount(<MonthView {...props} />, { context: { store } });
const helpLink = document.createElement('div');
helpLink.className='help-link';
const pageTitle = document.createElement('div');
pageTitle.className='page-title';
const sticky = document.createElement('div');
sticky.className='sticky';
document.body.appendChild(helpLink);
document.body.appendChild(pageTitle);
document.body.appendChild(sticky);

const initialData = {
  permitID: -1,
  eventID: 2,
  batchID: '1111111',
  receiptID: '2222222',
  receiptEntryID: '3333333'
};

let booking = {
  resource_ids: [
    1,
    2
  ],
  selected_date: '2016 Jun 04',
  include_linked_resources: true,
  resourceInfo: [
    {
      setupMinutes: 10,
      resourceType: 0,
      resourceID: 1,
      maximumTime: 0,
      reservationPeriodUnit: 2,
      prepCodeID: 2,
      resourceNumber: '2323',
      resourceName: 'resourceType &apm;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true,
          dayOfMonth: 1
        }
      ],
      id: 1,
      cleanupMinutes: 20,
      minimumTime: 0,
      resourceSkipDate: []
    },
    {
      setupMinutes: 0,
      resourceType: 1,
      resourceID: 2,
      maximumTime: 0,
      reservationPeriodUnit: 2,
      prepCodeID: 0,
      resourceNumber: '2323',
      resourceName: 'kaely test equipment &amp;',
      closedTimes: [
        {
          startTime: '',
          endTime: '',
          closedAllDay: true,
          dayOfMonth: 1
        },
        {
          startTime: '',
          endTime: '',
          closedAllDay: true,
          dayOfMonth: 2
        }
      ],
      id: 2,
      cleanupMinutes: 0,
      minimumTime: 0,
      resourceSkipDate: [
        {startTime: "", endTime: "", closedAllDay: true, dayOfMonth: 3},
        {startTime: "8:00", endTime: "0:00", closedAllDay: false, dayOfMonth: 22}
      ]
    }
  ],
  bookingInfo: [
    {
      endScheduleDate: '2016 Jun 7',
      start: '2016 Jun 07 00:00',
      setupMinutes: 300,
      startScheduleDay: 'Tue',
      permitNumber: 349,
      eventName: '1 f+expiration kaely eventName &amp;',
      startEventTime: '1:00 AM',
      bookingAssignment: 0,
      resourceBookingID: 8620,
      startEventDate: '2016 Jun 5',
      startScheduleTime: '8:00 PM',
      eventNotes: 'aa',
      startScheduleDate: '2016 Jun 4',
      resourceType: 0,
      companyName: 'MM companyName',
      reservationScope: 'Normal',
      resourceID: 1,
      permitDate: '2016 Jun 1',
      attendance: 0,
      customerName: '',
      endScheduleDay: 'Tue',
      endEventTime: '12:30 AM',
      scheduleTypeID: 11,
      endEventDate: '2016 Jun 7',
      permitStatus: 2,
      permitStatusDescription: false,
      scheduleType: 'kaely scheduleType',
      eventType: '*kaely eventType',
      ownerPendingReceipt: false,
      isActivityIgnoreMaximum: true,
      permitID: -1,
      resourceNumber: '12(facilityNumer)',
      customerType: 'f customerType',
      transactionID: 36378,
      customerID: 32523,
      resourceName: '',
      end: '2016 Jun 08 00:00',
      id: 8620,
      cleanupMinutes: 30,
      reservationExpiration: '2016 Jun 4 expiration',
      endScheduleTime: '11:30 AM',
      pendingID: 20
    },
    {
      endScheduleDate: '2016 Jun 7',
      start: '2016 Jun 04 8:00 PM',
      setupMinutes: 300,
      startScheduleDay: 'Tue',
      permitNumber: 349,
      eventName: '1 f+expiration kaely eventName &amp;',
      startEventTime: '1:00 AM',
      bookingAssignment: 0,
      resourceBookingID: 8620,
      startEventDate: '2016 Jun 5',
      startScheduleTime: '8:00 PM',
      eventNotes: 'aa',
      startScheduleDate: '2016 Jun 4',
      resourceType: 0,
      companyName: 'MM companyName',
      reservationScope: 'Normal',
      resourceID: 1,
      permitDate: '2016 Jun 1',
      attendance: 0,
      customerName: '',
      endScheduleDay: 'Tue',
      endEventTime: '12:30 AM',
      scheduleTypeID: 11,
      endEventDate: '2016 Jun 7',
      permitStatus: 2,
      permitStatusDescription: false,
      scheduleType: 'kaely scheduleType',
      eventType: '*kaely eventType',
      ownerPendingReceipt: false,
      isActivityIgnoreMaximum: true,
      permitID: 4,
      resourceNumber: '12(facilityNumer)',
      customerType: 'f customerType',
      transactionID: 36378,
      customerID: 32523,
      resourceName: '',
      end: '2016 Jun 07 11:30 AM',
      id: 8620,
      cleanupMinutes: 30,
      reservationExpiration: '2016 Jun 4 expiration',
      endScheduleTime: '11:30 AM',
      type: ''
    },
    {
      endScheduleDate: '2016 Jun 4',
      start: '2016 Jun 04 7:00 AM',
      setupMinutes: 30,
      startScheduleDay: 'Tue',
      permitNumber: 349,
      eventName: '2 f kaely eventName',
      startEventTime: '7:30 AM',
      bookingAssignment: 0,
      resourceBookingID: 81620,
      startEventDate: '2016 Jun 4',
      startScheduleTime: '7:00 AM',
      eventNotes: 'aa',
      startScheduleDate: '2016 Jun 4',
      resourceType: 0,
      companyName: 'MM companyName',
      reservationScope: 'Normal',
      resourceID: 1,
      permitDate: '2016 Jun 1',
      attendance: 0,
      customerName: 'customerName',
      endScheduleDay: 'Tue',
      endEventTime: '12:30 AM',
      scheduleTypeID: 11,
      endEventDate: '2016 Jun 4',
      permitStatus: 0,
      permitStatusDescription: 'Approved',
      scheduleType: 'kaely schedule Type',
      eventType: '',
      ownerPendingReceipt: false,
      isActivityIgnoreMaximum: true,
      permitID: 718,
      resourceNumber: '112(facilityNumber)',
      customerType: 'customerType',
      transactionID: 36378,
      customerID: 32523,
      resourceName: '(t-need facilityNumber) resourceName',
      end: '2016 Jun 04 11:00 AM',
      id: 81620,
      cleanupMinutes: 30,
      reservationExpiration: '',
      endScheduleTime: '11:00 AM'
    }
  ],
  resize: false,
  ready4Checkout: false,
  inCart: false
};

let segs = {
  "resource": {
    "setupMinutes": 10,
    "resourceType": 0,
    "resourceID": 1,
    "maximumTime": 0,
    "reservationPeriodUnit": 2,
    "prepCodeID": 2,
    "resourceNumber": "2323",
    "resourceName": "resourceType &apm;",
    "closedTimes": [{
      "startTime": "",
      "endTime": "",
      "closedAllDay": true,
      "dayOfMonth": 1
    }],
    "id": "1",
    "cleanupMinutes": 20,
    "minimumTime": 0,
    "resourceSkipDate": [],
    "name": "resourceType &apm;",
    "type": "Whyy"
  },
  "event": {
    "id": 8620,
    "resourceId": "1",
    "start": "2016-06-04T12:00:00.000Z",
    "end": "2016-06-07T03:30:00.000Z",
    "title": "1 f+expiration kaely eventName &amp;",
    "state": "pending",
    "permitID": -1,
    "ownerPendingReceipt": false,
    "pendingID": 8620
  },
  "eventStart": "2016-06-04T12:00:00.000Z",
  "eventEnd": "2016-06-07T03:30:00.000Z",
  "start": "2016-06-04T12:00:00.000Z",
  "end": "2016-06-07T03:30:00.000Z",
  "eventKey": "1/8620",
  "key": "1/8620-0",
  "isAllDay": false,
  "isCrossDays": true,
  "span": 2,
  "text": "20:00 PM 1 f+expiration kaely eventName &amp;",
  "state": "pending",
  "type": "long",
  "icon": null,
  "level": 0
};
const actions = {
  switchView: jest.fn(),
  setResourceSelectedDate: jest.fn(),
  setResourceIds: jest.fn(),
  saveFilters: jest.fn(),
  changeResource: jest.fn(),
  deleteResourceInfo: jest.fn(),
  showBookingInfo: jest.fn(),
  getPermitAccessible: jest.fn(() => Promise.resolve('')),
  createBookingsAction: jest.fn()
}

const getProps = (showSearchbar= false, availableBookingCount = 0,
  resourceHeaderClickable = true, dateHeaderClickable = true, customMore = true) => {
  return  {
    booking: fromJS(booking),
    initialData,
    customMore,
    showSearchbar,
    availableBookingCount,
    displayDate: moment().format('YYYY-MM-DD'),
    resourceHeaderClickable,
    dateHeaderClickable,
    ...actions
  };
}

describe('index/Resource/components/MonthView', () => {
  const mockStore = configureStore();

  it('Should render well', () => {
    const props = getProps();
    const store = mockStore({});
    const component = setup(props, store);
    expect(component.find('.resource-cell').length).toEqual(2);
    expect(component.find('.an-rc-event').length).toEqual(3);

    expect(component.instance().focusedToScroll).toBeFalsy();
  });

  it('Should render well after umount', () => {
    const props = getProps();
    const store = mockStore({});
    const component = setup(props, store);
    const cells = component.find('.resource-cell');
    const resource = cells.first().find('.resource-name');
    resource.simulate('click');
    component.unmount();
    expect(component.find('.resource-cell').length).toEqual(0);
  });

  it('onResourceRemove should work well', () => {
    const props = getProps();
    const store = mockStore({});
    const component = setup(props, store);

    const instance = component.instance();
    instance.onResourceRemove({resourceID: 1});

    expect(actions.saveFilters).toHaveBeenCalledTimes(1);
    expect(actions.setResourceIds).toHaveBeenCalledTimes(1);
    expect(actions.changeResource).toHaveBeenCalledTimes(1);
    expect(actions.deleteResourceInfo).toHaveBeenCalledTimes(1);
  });

  it('onDateHeaderClick should work well', () => {
    const props = getProps();
    const store = mockStore({});
    const component = setup(props, store);
    const dateHeader = component.find('.an-rc-clickable').first();
    dateHeader.simulate('click');
    expect(actions.switchView).toHaveBeenCalledTimes(1);
  });

  describe('onEventOpen method:',()=>{
      const props = getProps();
      const store = mockStore({});
      const component = setup(props, store);
      const events = component.find('.an-rc-event');

      const initialData = {
        permitID: 0,
        eventID: 2,
        batchID: '1111111',
        receiptID: '2222222',
        receiptEntryID: '3333333'
      };
      beforeEach(()=>{
        events.first().simulate('click');
        events.at(1).simulate('click');
        events.last().simulate('click');
        expect(events.length).toEqual(3);
      });

    it('onEventOpen should work well when event.ownerPendingReceipt is false', () => {
      component.setProps({initialData, showSearchbar: true});
      const instance = component.instance();
      const result = instance.onEventOpen(null,segs);
      expect(result).toBeTruthy();

      segs.event.ownerPendingReceipt = false;
      segs.event.bookingAssignment = 2;
      segs.event.type = 'skip';
      const result1 = instance.onEventOpen(null,segs);
      expect(result1).toBeFalsy();

      segs.event.type = 'closed';
      const result2 = instance.onEventOpen(null,segs);
      expect(result2).toBeFalsy();

      segs.event.bookingAssignment = 0;
      segs.event.type = '222';
      const result3 = instance.onEventOpen(null,segs);
      expect(result3).toMatchObject({});
    });

    it('onEventOpen should work well when event.ownerPendingReceipt is true',()=>{
      const instance = component.instance();
      instance.onEventOpen(null,segs);
      segs.event.ownerPendingReceipt = true;
      instance.onEventOpen(null,segs);
      expect(actions.showBookingInfo).toHaveBeenCalledTimes(1);

      component.setProps({initialData});
      segs.event.ownerPendingReceipt = false;
      instance.onEventOpen(null,segs);
      segs.event.permitID = 2;
      instance.onEventOpen(null,segs);
      expect(actions.getPermitAccessible).toHaveBeenCalledTimes(1);
    });


    it('openPendingPermitOfOthers  should work well when permitID > 0 ',()=>{
      const instance = component.instance();
      initialData.permitID = -1;
      component.setProps({initialData});
      segs.event.ownerPendingReceipt = false;
      console.log("openPendingPermitOfOthers");
      instance.onEventOpen(null,segs);
      expect(actions.getPermitAccessible).toHaveBeenCalledTimes(1);

      component.setProps({initialData});
      segs.event.permitID = -1;
      segs.event.bookingAssignment === 0;
      console.log("openPendingPermitOfOthers2222");
      instance.onEventOpen(null,segs);
      expect(actions.getPermitAccessible).toHaveBeenCalledTimes(1);

    });

    it('onEventOpen should work well when seg is null',()=>{
      const instance = component.instance();
      const result = instance.onEventOpen(null,null);
      expect(result).toBeFalsy();
    });
  });


  describe('onMarqueeEnd method:',()=>{
    const event = {
      resources: [],
      startDate: moment(),
      endDate: moment()
    };

    const props = getProps();
    const store = mockStore({});
    window.innerHeight = 0;
    const component = setup(props, store);

    it('onMarqueeEnd should work well', () => {
      const instance = component.instance();
      const result = instance.onMarqueeEnd(event);
      expect(actions.createBookingsAction).toHaveBeenCalledTimes(1);
    });


  });

  it('componentWillReceiveProps should work well', () => {
    const props = getProps();
    const store = mockStore({});
    const component = setup(props, store);
    component.setProps({customMore: false});
    expect(component.find('.resource-cell').length).toEqual(2);
    booking.resourceInfo = [];
    component.setProps({booking: fromJS(booking)});
    expect(component.find('.resource-cell').length).toEqual(0);
  });

  describe('onSegMouseEnter method:',()=>{
    const props = getProps();
    const store = mockStore({});
    it('showEventTooltip should be triggered when onSegMouseEnter be called ', () => {
      const tempJsEvent = {persist:jest.fn(),buttons:0};
      const component = setup(props, store);
      const instance = component.instance();
      const spy = jest.spyOn(instance,'showEventTooltip');
      instance.onSegMouseEnter(tempJsEvent,segs);
      expect(instance.curHoverEvent).toEqual(booking.bookingInfo[0]);
      expect(spy).toHaveBeenCalledWith(tempJsEvent);
    });
    it('showEventTooltip should not be triggered when jsEvent.buttons !==0', () => {
      const tempJsEvent = {persist:jest.fn(),buttons:1};
      const component = setup(props, store);
      const instance = component.instance();
      const spy = jest.spyOn(instance,'showEventTooltip');
      instance.onSegMouseEnter(tempJsEvent,segs);
      expect(instance.curHoverEvent).toEqual(null);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onSegMouseLeave method:',()=>{
    const props = getProps();
    const store = mockStore({});
    const original = Tooltip.close;

    it('Tooltip should be closed when onSegMouseLeave be called ', () => {
      const tempJsEvent = {persist:jest.fn(),buttons:0};
      const component = setup(props, store);
      const instance = component.instance();
      const spy = jest.fn();
      Tooltip.close = spy;

      instance.onSegMouseLeave(tempJsEvent);
      expect(instance.curHoverEvent).toEqual(null);
      expect(spy).toHaveBeenCalled();
      Tooltip.close = original;
    });
    it('Tooltip should not be closed when onSegMouseLeave be called and isPointDom is true ', () => {
      const tempJsEvent = {persist:jest.fn(),buttons:0};
      const component = setup(props, store);
      const instance = component.instance();
      const originIsPointInDOM =  DomUtils.isPointInDOM;
      const spy = jest.fn();
      DomUtils.isPointInDOM =jest.fn().mockReturnValue(true);
      Tooltip.close = spy;

      instance.onSegMouseLeave(tempJsEvent);
      expect(instance.curHoverEvent).toEqual(null);
      expect(spy).not.toHaveBeenCalled();
      Tooltip.close = original;
      DomUtils.isPointInDOM = originIsPointInDOM;
    });
    it('Tooltip should be closed when onSelectionChange be called', () => {
      const component = setup(props, store);
      const instance = component.instance();
      const spy = jest.fn();
      Tooltip.close = spy;

      instance.onSelectionChange();
      expect(instance.curHoverEvent).toEqual(null);
      expect(spy).toHaveBeenCalled();
      Tooltip.close = original;
    });
  });

  describe('showEventTooltip method:',()=>{
    const props = getProps();
    const store = mockStore({});
    const originClose = Tooltip.close;
    const originOpen = Tooltip.open;

    beforeEach(()=>{
      debounce.mockClear();
    });
    afterEach(() => {
      Tooltip.close = originClose;
      Tooltip.open = originOpen;
    });
    it('Tooltip open should not be called when hover target is null',()=>{
       const spyOpen = jest.fn();
      const component = setup(props, store);
      const instance = component.instance();
      const jsEvent = {target: null};
      Tooltip.open = spyOpen;
      instance.curHoverEvent = segs;
      instance.showEventTooltip(jsEvent);
      expect(spyOpen).not.toHaveBeenCalled();
    });
    it('Tooltip open should be called when curHoverEvent is a event',()=>{
      const spyOpen = jest.fn();
      const component = setup(props, store);
      const instance = component.instance();
      const node = document.createElement('div');
      const jsEvent = {target: node};
      node.className = 'an-rc-event-seg';

      Tooltip.open = spyOpen;
      instance.curHoverEvent = segs;
      instance.showEventTooltip(jsEvent);
      expect(spyOpen).toHaveBeenCalled();
      expect(spyOpen.mock.calls[0][0]).toEqual(node);
    });
    it('Tooltip open should be called by it\'s parent node when hover a event',()=>{
      const spyOpen = jest.fn();
      const component = setup(props, store);
      const instance = component.instance();
      const node = document.createElement('span');
      const parentNode  = document.createElement('div');
      const jsEvent = {target: node};

      Object.defineProperty(node,'parentNode',{
        configurable:true,
        writable:true
      });
      Tooltip.open = spyOpen;

      node.className = 'an-rc-event';
      node.parentNode = parentNode;
      instance.curHoverEvent = segs;
      instance.showEventTooltip(jsEvent);
      expect(spyOpen).toHaveBeenCalled();
      expect(spyOpen.mock.calls[0][0]).toEqual(parentNode);
    });

    it('Tooltip close should be tirggered when curHoverEvent is null',()=>{
      const spyClose = jest.fn();
      const component = setup(props, store);
      const instance = component.instance();
      const node = document.createElement('div');
      const jsEvent = {target: node};

      Tooltip.close = spyClose;
      instance.curHoverEvent = null;
      instance.showEventTooltip(jsEvent);
      expect(spyClose).toHaveBeenCalled();
    });
    it('Tooltip close should be tirggered when scroll',()=>{
      const spyClose = jest.fn();
      const component = setup(props, store);
      const calendar =  component.find(ResourceCalendar);
      Tooltip.close = spyClose;
      calendar.prop('onScroll')();
      expect(spyClose).toHaveBeenCalled();
    });
  });
});


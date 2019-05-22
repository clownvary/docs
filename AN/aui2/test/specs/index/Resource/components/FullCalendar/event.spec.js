import moment from 'moment';
import {
  isShowInfoHandler,
  getPrepTimeSetPadding,
  getSkipEvents,
  getCloseEvent,
  getCloseSkipEventHtml,
  getDateTimeFormatString
} from 'index/Resource/components/FullCalendar/eventInfo';


it('method isShowInfoHandler works fine', () => {
  const date_1 = moment('2016 Jun 04 08:00');
  const date_2 = moment('2016 Jun 04 4:00 PM');

  const event_1 = {
    type: 'closed',
    start: date_1,
    end: date_2
  };

  expect(isShowInfoHandler(event_1)).toEqual(true);

  const event_2 = {
    type: 'skip',
    startDate: date_1,
    disregardYear: true
  };

  expect(isShowInfoHandler(event_2)).toEqual(true);

  const event_3 = {
    type: '',
    startScheduleDate: '2016 Jun 4',
    startDate: '2016 Jun 04 08:00',
    endScheduleDate: '2016 Jun 04',
    startEventTime: '7:30 AM',
    endEventTime: '12:30 AM'
  };

  expect(isShowInfoHandler(event_3)).toEqual(false);

  const event_4 = {
    type: '',
    startScheduleDate: '2016 Jun 4',
    startDate: '2016 Jun 04 08:00',
    endScheduleDate: '2016 Jun 04',
    startEventTime: '7:30 AM',
    endEventTime: ''
  };
  isShowInfoHandler(event_4);

  const event_5 = {
    type: '',
    startScheduleDate: '2016 Jun 4',
    startDate: '2016 Jun 04 08:00',
    endScheduleDate: '2016 Jun 05',
    startEventTime: '7:30 AM',
    endEventTime: ''
  };

  expect(isShowInfoHandler(event_5, '2016 Jun 04')).toEqual(true);

  const event_6 = {
    type: '',
    startScheduleDate: '2016 Jun 4',
    startDate: '2016 Jun 04 08:00',
    endScheduleDate: '2016 Jun 05',
    startEventTime: '7:30 AM',
    endEventTime: '12:30 AM',
  };

  expect(isShowInfoHandler(event_6, '2016 Jun 05')).toEqual(true);

  const event_7 = {
    type: 'skip',
    startScheduleDate: '2016 Jun 4',
    startDate: '2016 Jun 04 08:00',
    endScheduleDate: '2016 Jun 05',
    startEventTime: '7:30 AM',
    endEventTime: '12:30 AM',
    disregardYear: true
  };

  expect(isShowInfoHandler(event_7, '2016 Jun 05')).toEqual(true);
});

it('method getPrepTimeSetPadding works fine', () => {
  expect(getPrepTimeSetPadding()).toEqual(NaN);

  const prepTime = 40;
  const startDate = '2016 Jun 04';
  const startTime = '11:00 PM';
  const endDate = '2016 Jun 06';
  const direnction = 'top';

  expect(getPrepTimeSetPadding(prepTime, '2016 Jun 06', startTime, endDate, '', 'bottom')).toEqual(NaN);
  expect(getPrepTimeSetPadding(prepTime, startDate, startTime, endDate, '', direnction)).toEqual(0.6666666666666666);
  expect(getPrepTimeSetPadding(prepTime, startDate, startTime, endDate, '3:00 AM', 'bottom')).toEqual(0.2222222222222222);
  expect(getPrepTimeSetPadding(prepTime, startDate, startTime, endDate, '3:00 AM', 'left')).toEqual(Infinity);
});

it('method getSkipEvents works fine', () => {
  expect(getSkipEvents()).toEqual([]);

  const skipDateTimes1 = [
    {
      description: 'kaely test equipment description',
      startTime: '12:00 AM',
      endTime: '12:00 AM',
      startDate: '2016 JUN 5',
      endDate: '2016 JUN 5',
      disregardYear: false
    },
    {
      description: 'kaely test equipment description',
      startTime: '12:00 AM',
      endTime: '12:00 PM',
      startDate: '2016 JUN 4',
      endDate: '2016 JUN 4',
      disregardYear: true
    },
    {
      description: 'kaely test equipment description',
      startTime: '12:00 AM',
      endTime: '12:00 PM',
      startDate: '2016 JUN 4',
      endDate: '2016 JUN 5',
      disregardYear: false
    },
    {
      description: 'kaely test equipment description',
      startTime: '12:00 AM',
      endTime: '12:00 PM',
      startDate: '2016 JUN 3',
      endDate: '2016 JUN 5',
      disregardYear: false
    }
  ];

  getSkipEvents(skipDateTimes1, 6, '2016 Jun 04', true);

  const skipDateTimes2 = [{
    description: 'kaely test equipment description',
    startTime: '12:00 AM',
    endTime: '12:00 PM',
    startDate: '2016 JUN 3',
    endDate: '2016 JUN 4',
    disregardYear: false
  }];

  expect(getSkipEvents(skipDateTimes2, 6, '2016 Jun 04')).toEqual([
    {
      description: 'kaely test equipment description',
      disregardYear: false,
      end: '2016 Jun 04 12:00 PM',
      endDate: '2016 JUN 4',
      endTime: '12:00 PM',
      eventName: 'kaely test equipment description',
      id: '6_skipTime_0',
      isAllDay: false,
      resourceID: 6,
      start: '2016 Jun 03 12:00 AM',
      startDate: '2016 JUN 3',
      startTime: '12:00 AM',
      type: 'skip'
    }
  ]);

  const skipDateTimes22 = [{
    description: 'kaely test equipment description',
    startTime: '12:00 AM',
    endTime: '12:00 PM',
    startDate: '2016 JUN 3',
    endDate: '2016 JUN 4',
    disregardYear: false
  }];

  expect(getSkipEvents(skipDateTimes22, 6, '2016 Jun 04', true)).toEqual([]);

  const skipDateTimes3 = [{
    description: 'kaely test equipment description',
    startTime: '12:00 AM',
    endTime: '12:00 PM',
    startDate: '2016 JUN 3',
    endDate: '2016 JUN 5',
    disregardYear: false
  }];

  expect(getSkipEvents(skipDateTimes3, 6, '2016 Jun 04')).toEqual([
    {
      description: 'kaely test equipment description',
      disregardYear: false,
      end: '2016 Jun 05 12:00 AM',
      endDate: '2016 JUN 5',
      endTime: '12:00 PM',
      eventName: 'kaely test equipment description',
      id: '6_skipTime_0',
      isAllDay: true,
      resourceID: 6,
      start: '2016 Jun 04 12:00 AM',
      startDate: '2016 JUN 3',
      startTime: '12:00 AM',
      type: 'skip'
    }
  ]);

  const skipDateTimes4 = [{
    description: 'kaely test equipment description',
    startTime: '12:00 AM',
    endTime: '12:00 PM',
    startDate: '2016 JUN 3',
    endDate: '2016 JUN 4',
    disregardYear: false
  }];

  expect(getSkipEvents(skipDateTimes4, 6, '2016 Jun 02')).toEqual([]);

  const skipDateTimes5 = [{
    description: 'kaely test equipment description',
    startTime: '12:00 AM',
    endTime: '12:00 PM',
    startDate: '2016 JUN 3',
    endDate: '2017 JUN 4',
    disregardYear: true
  }]

  expect(getSkipEvents(skipDateTimes5, 6, '2016 Jun 02')).toEqual([{
    description: 'kaely test equipment description',
    disregardYear: true,
    end: '2016 Jun 03 12:00 AM',
    endDate: '2017 JUN 4',
    endTime: '12:00 PM',
    eventName: 'kaely test equipment description',
    id: '6_skipTime_0',
    isAllDay: true,
    resourceID: 6,
    start: '2016 Jun 02 12:00 AM',
    startDate: '2016 JUN 3',
    startTime: '12:00 AM',
    type: 'skip'
  }]);

  const skipDateTimes6 = [
    {
      description: 'kaely test equipment description',
      startTime: '12:00 AM',
      endTime: '12:00 PM',
      startDate: '2016 JUN 3',
      endDate: '2017 JUN 1',
      disregardYear: true
    },
    {
      description: 'kaely test equipment description 2',
      startTime: '12:00 AM',
      endTime: '12:00 PM',
      startDate: '2016 JUN 2',
      endDate: '2017 JUN 1',
      disregardYear: true
    }
  ]

  expect(getSkipEvents(skipDateTimes6, 6, '2016 Jun 02')).toEqual([{
    description: 'kaely test equipment description 2',
    disregardYear: true,
    end: '2017 Jan 02 12:00 AM',
    endDate: '2017 JUN 1',
    endTime: '12:00 PM',
    eventName: 'kaely test equipment description 2',
    id: '6_skipTime_3',
    isAllDay: true,
    resourceID: 6,
    start: '2016 Jun 02 12:00 AM',
    startDate: '2016 JUN 2',
    startTime: '12:00 AM',
    type: 'skip'
  }]);

});


it('method getCloseEvent works fine', () => {
  expect(getCloseEvent()).toEqual([]);

  const closeTimes = [
    {
      startTime: '',
      endTime: '',
      closedAllDay: false
    }, {
      startTime: '8:00 AM',
      endTime: '12:00 AM',
      closedAllDay: true
    }, {
      startTime: '8:00 AM',
      endTime: '11:00 AM',
      closedAllDay: true
    }, {
      startTime: '1:00 PM',
      endTime: '2:00 PM',
      closedAllDay: true
    }
  ];
  const data = [
    {
      end: '2017 Nov 16 12:00 AM',
      eventName: 'Closed',
      id: '1_closeTime_0',
      isAllDay: false,
      resourceID: 1,
      start: '2017 Nov 15 00:00',
      type: 'closed'
    }, {
      end: '2017 Nov 16 12:00 AM',
      eventName: 'Closed',
      id: '1_closeTime_1',
      isAllDay: true,
      resourceID: 1,
      start: '2017 Nov 15 12:00 AM',
      type: 'closed'
    }, {
      end: '2017 Nov 16 12:00 AM',
      eventName: 'Closed',
      id: '1_closeTime_2',
      isAllDay: true,
      resourceID: 1,
      start: '2017 Nov 15 12:00 AM',
      type: 'closed'
    }, {
      end: '2017 Nov 16 12:00 AM',
      eventName: 'Closed',
      id: '1_closeTime_3',
      isAllDay: true,
      resourceID: 1,
      start: '2017 Nov 15 12:00 AM',
      type: 'closed'
    }
  ];

  expect(getCloseEvent(closeTimes, 1, '2017 Nov 15')).toEqual(data);
});


it('method getCloseSkipEventHtml works fine', () => {
  const event = {
    start: '2016 Jun 04 08:00',
    end: '2016 Jun 04 10:00'
  };

  expect(getCloseSkipEventHtml(event)).toEqual('8:00 AM - 10:00 AM');
});

it('method getDateTimeFormatString works fine', () => {
  const event1 = {
    startScheduleDate: '2016 Jun 04',
    endScheduleDate: '2016 Jun 05',
    startScheduleTime: '7:30 AM',
    endScheduleTime: '12:30 AM',
    startScheduleDay: 'Tue'
  };
  expect(getDateTimeFormatString({
    startDate: event1.startScheduleDate,
    endDate: event1.endScheduleDate,
    startTime: event1.startScheduleTime,
    endTime: event1.endScheduleTime,
    startScheduleDay: event1.startScheduleDay,
    endScheduleDay: event1.endScheduleDay
  })).toEqualevent;

  expect(getDateTimeFormatString({
    startDate: event1.startScheduleDate,
    endDate: event1.endScheduleDate,
    startTime: event1.startScheduleTime,
    endTime: event1.endScheduleTime,
    startScheduleDay: event1.startScheduleDay,
    endScheduleDay: event1.endScheduleDay
  })).toEqual(' 2016 Jun 04 7:30 AM - <br>  2016 Jun 05 12:30 AM');

  const event2 = {
    startScheduleDate: '2016 Jun 04',
    endScheduleDate: '2016 Jun 04',
    startScheduleTime: '7:30 AM',
    endScheduleTime: '12:30 AM',
    startScheduleDay: 'Tue'
  };
  expect(getDateTimeFormatString({
    startDate: event2.startScheduleDate,
    endDate: event2.endScheduleDate,
    startTime: event2.startScheduleTime,
    endTime: event2.endScheduleTime,
    startScheduleDay: event2.startScheduleDay,
    endScheduleDay: event2.endScheduleDay
  }, true)).toEqual('Tue 2016 Jun 04 7:30 AM - 12:30 AM');
});


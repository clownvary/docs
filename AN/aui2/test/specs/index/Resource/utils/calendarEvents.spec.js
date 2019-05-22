import handleCalendarEvents from 'index/Resource/utils/calendarEvents';

describe('index -> Resource -> utils -> calendarEvents', () => {
  it('method handleCalendarEvents returns calendar events with correct id and date-time', () => {
    const booking = {
      resourceBookingID: 0,
      attendance: 1,
      dateRangeID: 17,
      pendingID: 'pending_766_1638',
      endEventTime: '12:00 AM',
      isDeleteSchedule: false,
      startEventDate: '2016 Dec 01',
      startEventTime: '12:00 AM',
      endEventDate: '2016 Dec 31',
      startScheduleDate: '2016 Dec 01',
      startScheduleTime: '12:00 AM',
      startScheduleDay: 'Thu',
      endScheduleDate: '2016 Dec 31',
      endScheduleTime: '12:00 AM',
      endScheduleDay: 'Sat'
    };

    const result = handleCalendarEvents(booking);

    expect(result.id).toEqual('pending_766_1638');
    expect(result.start).toEqual('2016 Dec 01 12:00 AM');
    expect(result.end).toEqual('2016 Dec 31 12:00 AM');
  });

  it('method handleCalendarEvents returns calendar events with correct id and date-time when the start equals the end', () => {
    const booking = {
      resourceBookingID: 3686,
      pendingID: 'pending_766_1638',
      startScheduleDate: '2018 Jul 18',
      startScheduleTime: '9:00 AM',
      endScheduleDate: '2018 Jul 18',
      endScheduleTime: '9:00 AM',
    };

    const result = handleCalendarEvents(booking);

    expect(result.id).toEqual(3686);
    expect(result.start).toEqual('2018 Jul 18 9:00 AM');
    expect(result.end).toEqual('2018 Jul 18 9:01 AM');
  });
});

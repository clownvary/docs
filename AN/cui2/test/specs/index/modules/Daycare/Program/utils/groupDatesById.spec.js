import { groupDatesById } from 'index/modules/Daycare/Program/utils';

describe('index/modules/Daycare/Program/utils/groupExceptionDates', () => {
  it('groupExceptionDates shall group dates correctly', () => {
    const responseDates = [
      {
        session_id: 60,
        exception_dates: []
      },
      {
        session_id: 61,
        exception_dates: ['25,26,27 Nov 2018']
      },
      {
        session_id: 62,
        exception_dates: [
          '30 Nov 2018',
          '01 Dec 2018'
        ]
      }
    ];
    const result = groupDatesById(responseDates, 'exception_dates', 'session_id');

    expect(Object.keys(result)).toHaveLength(2);
    expect(result[61]).toEqual('25,26,27 Nov 2018');
    expect(result[62]).toEqual('30 Nov 2018 / 01 Dec 2018');
  });
});

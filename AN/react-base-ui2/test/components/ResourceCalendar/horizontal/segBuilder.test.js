import moment from 'moment';
import segBuilder from 'src/components/ResourceCalendar/horizontal/segBuilder';
import resourceJson from './resourceInfo.json';

describe('src/components/ResourceCalendar/horizontal/segBuilder', () => {
  const events = [
    {
      resourceId: 'r1',
      start: moment('2018-09-23', 'YYYY-MM-DD'),
      end: moment('2018-11-25', 'YYYY-MM-DD')
    },
    {
      resourceId: 'r1',
      start: moment('2018-09-18', 'YYYY-MM-DD'),
      end: moment('2018-11-15', 'YYYY-MM-DD')
    }
  ];
  it('buildSegs should work well', () => {
    const result = segBuilder(undefined, [resourceJson], events, false, '');
    // expect(result.segResources).toEqual([{ id: 'r1', key: 'r1', dates: {}, events }]);
  });
  it('buildSegs should work well when event end is null ', () => {
    const tempEvents = events;
    tempEvents.forEach(e => e.end = null);
    const result = segBuilder(undefined, [resourceJson], tempEvents, false, 'start');
    // expect(result.segResources).toEqual([{ id: 'r1', key: 'r1', dates: {}, events }]);
  });
  it('buildSegs should throw error when event start is null', () => {
    const tempEvents = events;
    tempEvents.forEach(e => e.start = null);
    expect(() => { segBuilder(undefined, [resourceJson], tempEvents, false, 'start'); }).toThrowError();
  });
  it('buildSegs should work well when isNextMonthEvents and isPrevMonthEvents are false', () => {
    const tempEvent = [{
      resourceId: 'r1',
      start: '2018-09-23',
      end: '2018-11-25'
    }];
    const result = segBuilder(moment('2018-09-12'), [resourceJson], tempEvent, false, 'start');
    expect(result.segResources).toMatchObject([{ id: 'r1', key: 'r1', events: tempEvent }]);
  });
  it('buildSegs should work well when isCrossDays is false', () => {
    const tempEvent = [{
      resourceId: 'r1',
      start: '2018-09-23',
      end: undefined
    }];
    const result = segBuilder(moment('2018-09-12'), [resourceJson], tempEvent, false, 'start');
    expect(result.segResources).toMatchObject([{ id: 'r1', key: 'r1', events: tempEvent }]);
  });
  it('buildSegs should work well when dateInfo.levels is null', () => {
    const tempEvent = [
      {
        resourceId: 'r1',
        start: '2018-09-24',
        end: undefined,
        levels: [],
        maxLevel: 3
      },
      {
        resourceId: 'r1',
        start: '2018-09-24 12:23:12',
        end: undefined,
        levels: [],
        maxLevel: 3
      }
    ];
    const result = segBuilder(moment('2018-09-12'), [resourceJson], tempEvent, false, 'start');
    expect(result.segResources).toMatchObject([{ id: 'r1', key: 'r1', events: tempEvent }]);
  });
});

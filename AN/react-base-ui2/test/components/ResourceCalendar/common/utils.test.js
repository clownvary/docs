
import moment from 'moment';
import * as utils from 'src/components/ResourceCalendar/common/utils';

describe('src/components/ResourceCalendar/common/utils', () => {
  it('getDaysInMonth should work well', () => {
    const result = utils.getDaysInMonth('2018-09-19');
    const numbers = moment('2018-09-19').startOf('month').daysInMonth();
    expect(result.length).toEqual(numbers);
  });
  it('dateIntersect should work well when start not before end', () => {
    const start = moment('2018-09-19');
    const end = moment('2018-09-22');

    const result = utils.dateIntersect('2018-09-10', start, end);
    expect(result).toEqual(null);
  });
  it('dateIntersect should work well when start before end', () => {
    const start = moment('2018-09-19 09:12:12');
    const end = moment('2018-09-25 09:12:12');
    const date = moment('2018-09-23 09:12:12');

    const result = utils.dateIntersect(date, start, end);
    expect(result).toMatchObject({ end: date.endOf('day') });
  });
  it('getEndOfDay should work well when exclusiveMode is true', () => {
    const date = moment('2018-09-26 19:12:12');

    const result = utils.getEndOfDay(date, true);
    expect(result).toEqual(date.endOf('day').add(1, 'ms'));
  });
  it('getEndOfDay should work well when exclusiveMode is false', () => {
    const date = moment('2018-09-26 19:12:12');

    const result = utils.getEndOfDay(date, false);
    expect(result).toEqual(date.endOf('day'));
  });
  it('getDateKey should work well', () => {
    const date = moment('2018/09/26');

    const result = utils.getDateKey(date);
    expect(result).toEqual('2018-09-26');
  });
  it('toDate should work well', () => {
    const result = utils.toDate('2018/09/26');
    expect(result.format('YYYY-MM-DD')).toEqual('2018-09-26');
  });
  it('getDateText should work well', () => {
    const result = utils.getDateText(moment('2018/09/26'));
    expect(result).toEqual('26 Wed');
  });
});

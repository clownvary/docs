import moment from 'moment/moment';
import utils from 'src/components/Calendar/utils';
import { DateFormat, FirstDayOfWeek } from 'src/components/Calendar/consts';

describe('components/Calendar/utils', () => {
  const today = moment('2018-06-05');

  it('function getTenYearRange works fine', () => {
    const range = utils.getTenYearRange(today);
    expect(range).toEqual('2010-2019');
  });

  it('function getWeeks works fine', () => {
    const { veryShortWeekdays, weekDays } = utils.getWeeks(today, FirstDayOfWeek.SUNDAY);
    expect(veryShortWeekdays).toHaveLength(7);
    expect(veryShortWeekdays).toEqual(
      expect.arrayContaining(['S', 'M', 'T', 'W', 'T', 'F', 'S'])
    );
    expect(weekDays).toHaveLength(7);
    expect(weekDays).toEqual(
      expect.arrayContaining(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    );
  });

  it('function compareByFormat works fine', () => {
    const m1 = moment('2018-06-29');
    expect(utils.compareByFormat(today, m1, DateFormat.YYYY)).toBeTruthy();
    expect(utils.compareByFormat(today, m1, DateFormat.MMMYYYY)).toBeTruthy();
    expect(utils.compareByFormat(today, m1, DateFormat.MMDDYYYY)).toBeFalsy();

    const m2 = moment('2018-05-31');
    expect(utils.compareByFormat(today, m2, DateFormat.YYYY)).toBeTruthy();
    expect(utils.compareByFormat(today, m2, DateFormat.MMMYYYY)).toBeFalsy();
    expect(utils.compareByFormat(today, m2, DateFormat.MMDDYYYY)).toBeFalsy();
  });

  it('function getSafeValue works fine', () => {
    const value1 = '2018-06-05';
    const result1 = utils.getSafeValue(value1);
    expect(result1).toHaveLength(1);
    expect(result1).toEqual(
      expect.arrayContaining([today])
    );

    const value2 = ['2018-06-05', '2018-06-06', '2018-06-05', null];
    const result2 = utils.getSafeValue(value2);
    expect(result2).toHaveLength(2);
    expect(result2).toEqual(
      expect.arrayContaining([today, moment('2018-06-06')])
    );
  });

  it('function sortDates works fine', () => {
    const m1 = today;
    const m2 = moment('2018-06-05');
    const m3 = moment('2018-05-01');
    const m4 = moment('2018-06-04');
    const m5 = moment('2018-06-07');
    const m6 = moment('2018-05-02');
    const m7 = moment('2018-06-06');
    const dates = [m1, m2, m3, m4, m5, m6, m7];
    const sorted = utils.sortedDates(dates);

    expect(sorted).toEqual([m3, m6, m4, m1, m1, m7, m5]);
  });
});

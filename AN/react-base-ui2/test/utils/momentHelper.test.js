import moment from 'moment';
import * as Helper from 'src/utils/momentHelper';

describe('utils/momentHelper', () => {
  it('isSame should work fine', () => {
    const mm1 = moment('1932-09-12');
    const mm2 = moment('1932-09-12');
    expect(Helper.isSame(mm1, mm2)).toBeTruthy();
    expect(Helper.isSame(null, mm2)).toBeFalsy();
    expect(Helper.isSame(mm1, null)).toBeFalsy();
    expect(Helper.isSame(null, null)).toBeTruthy();
  });

  it('isInRange should work fine', () => {
    const min = moment('1932-09-12');
    const max = moment('1936-09-12');
    expect(Helper.isInRange('', null, undefined)).toBeFalsy();
    expect(Helper.isInRange('1935-08-12', min, max)).toBeTruthy();
    expect(Helper.isInRange('1931-09-12', min, max)).toBeFalsy();
    expect(Helper.isInRange('1939-09-12', min, max)).toBeFalsy();
    expect(Helper.isInRange('1935-08-12', null, null)).toBeTruthy();
    expect(Helper.isInRange('1935-08-12', null, null)).toBeTruthy();
  });
  it('isValid should work fine', () => {
    expect(Helper.isValid(null)).toBe(null);
    expect(Helper.isValid('1932-09-12')).toBeTruthy();
  });
  it('isSameTime should work fine', () => {
    const time1 = moment('2018-01-01 12:09:12');
    const time2 = moment('2018-01-01 12:09:12');
    expect(Helper.isSameTime(null, null)).toBeFalsy();
    expect(Helper.isSameTime(time1, time2)).toBeTruthy();
    expect(Helper.isSameTime('12:09:12', '12:09:12')).toBeTruthy();
    expect(Helper.isSameTime('12:09:12', '12:09:13')).toBeFalsy();
  });
  it('createMoment should work fine', () => {
    expect(Helper.createMoment(null)).toBe(null);
    expect(Helper.createMoment('1932-0912')).toEqual(null);
    expect(Helper.createMoment('1932-09-12')).toEqual(moment('1932-09-12'));
  });
});

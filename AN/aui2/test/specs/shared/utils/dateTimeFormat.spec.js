import moment from 'moment';
import Globalize from 'react-base-ui/lib/services/i18n';
import DateTimeFormat from 'shared/utils/DateTimeFormat';

var d1 = '2017 Nov 04';
var d2 = '2017 Nov 4';
var d3 = 'Nov 04, 2017';
var d4 = 'Nov 4, 2017';
var d5 = '04 Nov 2017';
var d6 = '4 Nov 2017';

var t1 = '2:45';
var t2 = '2:45 AM';
var t3 = '2:45 PM';
var t4 = '2:45 pm';
var t5 = '13:45';
var t6 = '13:45 AM';
var t7 = '13:45 PM';
var t8 = '13:45 pm';

const d = '2017-Nov-04 09:30';
const m = moment(d);
const varifyDateFormat = 'YYYY-MMM-DD HH:mm A';
const varifyTimeFormat = 'HH:mm A';

const config = (name = 'default') => () => {
  it(`[${name}] DateTimeFormat.parseDateTime works fine`, () => {
    expect(DateTimeFormat.parseDateTime(`${d1} ${t1}`).format(varifyDateFormat)).toEqual('2017-Nov-04 02:45 AM');
    expect(DateTimeFormat.parseDateTime(`${d2} ${t1}`).format(varifyDateFormat)).toEqual('2017-Nov-04 02:45 AM');
    expect(DateTimeFormat.parseDateTime(`${d3} ${t1}`).format(varifyDateFormat)).toEqual('2017-Nov-04 02:45 AM');
    expect(DateTimeFormat.parseDateTime(`${d4} ${t1}`).format(varifyDateFormat)).toEqual('2017-Nov-04 02:45 AM');
    expect(DateTimeFormat.parseDateTime(`${d5} ${t1}`).format(varifyDateFormat)).toEqual('2017-Nov-04 02:45 AM');
    expect(DateTimeFormat.parseDateTime(`${d6} ${t1}`).format(varifyDateFormat)).toEqual('2017-Nov-04 02:45 AM');
    expect(DateTimeFormat.parseDateTime(`${d1} ${t5}`).format(varifyDateFormat)).toEqual('2017-Nov-04 13:45 PM');
    expect(DateTimeFormat.parseDateTime(`${d1} ${t6}`).format(varifyDateFormat)).toEqual('2017-Nov-04 13:45 PM');
    expect(DateTimeFormat.parseDateTime(`${d1} ${t7}`).format(varifyDateFormat)).toEqual('2017-Nov-04 13:45 PM');
    expect(DateTimeFormat.parseDateTime(`${d1} ${t8}`).format(varifyDateFormat)).toEqual('2017-Nov-04 13:45 PM');
  });

  it(`[${name}] DateTimeFormat.formatDateTime works fine`, () => {
    expect(DateTimeFormat.formatDateTime(m)).toEqual('2017 Nov 04 9:30 AM');
    expect(DateTimeFormat.formatDateTime(m, 'YYYY/MMM/DD (HH:mm A)')).toEqual('2017/Nov/04 (09:30 AM)');
    expect(DateTimeFormat.formatDateTime(d)).toEqual('2017 Nov 04 9:30 AM');
  });

  it(`[${name}] DateTimeFormat.parseDate works fine`, () => {
    expect(DateTimeFormat.parseDate(d1).format(varifyDateFormat)).toEqual('2017-Nov-04 00:00 AM');
    expect(DateTimeFormat.parseDate(d2).format(varifyDateFormat)).toEqual('2017-Nov-04 00:00 AM');
    expect(DateTimeFormat.parseDate(d3).format(varifyDateFormat)).toEqual('2017-Nov-04 00:00 AM');
    expect(DateTimeFormat.parseDate(d4).format(varifyDateFormat)).toEqual('2017-Nov-04 00:00 AM');
    expect(DateTimeFormat.parseDate(d5).format(varifyDateFormat)).toEqual('2017-Nov-04 00:00 AM');
    expect(DateTimeFormat.parseDate(d6).format(varifyDateFormat)).toEqual('2017-Nov-04 00:00 AM');

    expect(DateTimeFormat.parseDate(d, varifyDateFormat).format(varifyDateFormat)).toEqual('2017-Nov-04 09:30 AM');
  });

  it(`[${name}] DateTimeFormat.formatDate works fine`, () => {
    expect(DateTimeFormat.formatDate(m)).toEqual('2017 Nov 04');
    expect(DateTimeFormat.formatDate(m, 'YYYY/MMM/DD')).toEqual('2017/Nov/04');
  });

  it(`[${name}] DateTimeFormat.parseTime works fine`, () => {
    expect(DateTimeFormat.parseTime(t1).format(varifyTimeFormat)).toEqual('02:45 AM');
    expect(DateTimeFormat.parseTime(t2).format(varifyTimeFormat)).toEqual('02:45 AM');
    expect(DateTimeFormat.parseTime(t3).format(varifyTimeFormat)).toEqual('14:45 PM');
    expect(DateTimeFormat.parseTime(t4).format(varifyTimeFormat)).toEqual('14:45 PM');
    expect(DateTimeFormat.parseTime(t5).format(varifyTimeFormat)).toEqual('13:45 PM');
    expect(DateTimeFormat.parseTime(t6).format(varifyTimeFormat)).toEqual('13:45 PM');
    expect(DateTimeFormat.parseTime(t7).format(varifyTimeFormat)).toEqual('13:45 PM');
    expect(DateTimeFormat.parseTime(t8).format(varifyTimeFormat)).toEqual('13:45 PM');
  });

  it(`[${name}] DateTimeFormat.formatTime works fine`, () => {
    expect(DateTimeFormat.formatTime(m)).toEqual('9:30 AM');
    expect(DateTimeFormat.formatTime(m, 'HH:mm A')).toEqual('09:30 AM');
  });

  it(`[${name}] DateTimeFormat.compose works fine`, () => {
    expect(DateTimeFormat.compose(d1, t1)).toEqual('11/04/2017 2:45 AM');
    expect(DateTimeFormat.compose(d2, t1)).toEqual('11/04/2017 2:45 AM');
    expect(DateTimeFormat.compose(d3, t1)).toEqual('11/04/2017 2:45 AM');
    expect(DateTimeFormat.compose(d4, t1)).toEqual('11/04/2017 2:45 AM');
    expect(DateTimeFormat.compose(d5, t1)).toEqual('11/04/2017 2:45 AM');
    expect(DateTimeFormat.compose(d6, t1)).toEqual('11/04/2017 2:45 AM');
    expect(DateTimeFormat.compose(d1, t2)).toEqual('11/04/2017 2:45 AM');
    expect(DateTimeFormat.compose(d1, t3)).toEqual('11/04/2017 2:45 PM');
    expect(DateTimeFormat.compose(d1, t4)).toEqual('11/04/2017 2:45 PM');
    expect(DateTimeFormat.compose(d1, t5)).toEqual('11/04/2017 1:45 PM');
    expect(DateTimeFormat.compose(d1, t6)).toEqual('11/04/2017 1:45 PM');
    expect(DateTimeFormat.compose(d1, t7)).toEqual('11/04/2017 1:45 PM');
    expect(DateTimeFormat.compose(d1, t1, dt => dt.add(1, 'd'))).toEqual('11/05/2017 2:45 AM');
  });

  it('mapToDateFormat method should work fine', () => {
    const format = 'DD MMM YYYY';
    const result = DateTimeFormat.mapToDateFormat(format);
    expect(result).toEqual(format);
  });

  it('mapToTimeFormat method should work fine', () => {
    const format = 'h:mm A';
    const result = DateTimeFormat.mapToTimeFormat(format);
    expect(result).toEqual(format);
  });

  it('formatDateTime method should work fine, if dateTime is empty', () => {
    const dateTime = '';
    const format = 'YYYY-MMM-DD HH:mm A';
    const result = DateTimeFormat.formatDateTime(dateTime, format);
    expect(result).toEqual('');
  });

  it('parseDate method should work fine', () => {
    const date = '2017-Nov-34';
    const format = 'YYYY-MMM-DD';
    const result = DateTimeFormat.parseDate(date, format);
    expect(result.format(varifyTimeFormat)).toEqual('Invalid date');
  });

  it('formatDate method should work fine', () => {
    const date = '2017-04-Nov';
    const format = 'YYYY-MMM-DD';
    const result = DateTimeFormat.formatDate(date, format);
    expect(result).toEqual('2017-Nov-04');
  });

  it('formatDate method should work fine, if date is empty', () => {
    const date = '';
    const format = 'YYYY-MMM-DD';
    const result = DateTimeFormat.formatDate(date, format);
    expect(result).toEqual('');
  });

  it('parseTime method should work fine', () => {
    const date = NaN;
    const format = 'HH:mm a';
    const result = DateTimeFormat.parseTime(date, format);
    expect(result.format(varifyTimeFormat)).toEqual('Invalid date');
  });

  it('formatTime method should work fine', () => {
    const time = '2:00 PM';
    const format = 'HH:mm a';
    const result = DateTimeFormat.formatTime(time, format);
    expect(result).toEqual('14:00 pm');
  });

  it('formatTime method should work fine, if time is empty', () => {
    const time = '';
    const format = 'HH:mm a';
    const result = DateTimeFormat.formatTime(time, format);
    expect(result).toEqual('');
  });

  it('fromString method should work fine', () => {
    const dateTime = 'Nov-04-2017 01:45 PM';
    const result = DateTimeFormat.fromString(dateTime);
    expect(result.format(varifyTimeFormat)).toEqual('13:45 PM');
  });

  it('fromString method should work fine, if time is empty', () => {
    const dateTime = '';
    const result = DateTimeFormat.fromString(dateTime);
    expect(result.format(varifyTimeFormat)).toEqual('Invalid date');
  });

  it('fromString method should work fine, if time is invalid', () => {
    const dateTime = 'Nov-04-2017 21:45 PM';
    const result = DateTimeFormat.fromString(dateTime);
    expect(result.format(varifyTimeFormat)).toEqual('21:45 PM');
  });

  it('compose method should work fine', () => {
    const date = 'Nov-04-2017';
    const time = '21:45 PM';
    const result = DateTimeFormat.compose(date, time, jest.fn());
    expect(result).toEqual('');
  });

  it('compose method should work fine, if the date is invalid', () => {
    const date = '20171104';
    const time = '21:45 PM';
    const result = DateTimeFormat.compose(date, time, jest.fn());
    expect(result).toEqual('');
  });

  it('getDayRange method should work fine', () => {
    const date = 'Nov-04-2017';
    const result = DateTimeFormat.getDayRange(date);
    expect(result.dayStart.format(varifyDateFormat)).toEqual('2017-Nov-04 00:00 AM')
    expect(result.dayEnd.format(varifyDateFormat)).toEqual('2017-Nov-05 00:00 AM')
  });

  it('getServerToday method should work fine', () => {
    const result = DateTimeFormat.getServerToday();
    expect(result).toBeTruthy();
  });

  it('getServerTodayDate method should work fine', () => {
    const result = DateTimeFormat.getServerTodayDate();
    expect(result).toBeTruthy();
  });

  it('getFullServerTodayDate method should work fine', () => {
    const result = DateTimeFormat.getFullServerTodayDate();
    expect(result).toBeTruthy();
  });

  it('isInDefaultRange method should work fine', () => {
    const result = DateTimeFormat.isInDefaultRange();
    expect(result).toEqual(false);
  });

  it('getDateTimeDuration method should work fine', () => {
    const start = 'Apr-20-2018 9:45 AM';
    const end = 'Apr-20-2018 10:45 AM';
    const result = DateTimeFormat.getDateTimeDuration(start, end);
    expect(result).toEqual(60);

    const end1 = 'invalid date';
    const result1 = DateTimeFormat.getDateTimeDuration(start, end1);
    expect(result1).toEqual(0);
  });
}

describe('DateTimeFormat with default date time formats (YYYY MMM DD & h:mm A)', config());

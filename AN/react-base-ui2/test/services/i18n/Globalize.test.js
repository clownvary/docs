import moment from 'moment';
import Globalize from 'src/services/i18n';
import { momentHelper } from 'src/utils';
import * as NumericType from 'src/consts/NumericType';

const formatCurrency = (value, cc, round) =>
  Globalize.formatNumeric(value, NumericType.CURRENCY, cc, round);

const formatDecimal = (value, cc, round) =>
  Globalize.formatNumeric(value, NumericType.DECIMAL, cc, round);

const parseCurrency = value => Globalize.parseNumeric(value, NumericType.CURRENCY);

const momentFormat = f => Globalize.toMomentFormat(f);

describe('Globalize Service', () => {
  it('Format decimal works fine', () => {
    Globalize.decimalContext = {
      pattern: ['-n', 'n'],
      groupSep: ',',
      decimalSep: '.',
      decimals: -1,
      groupSizes: [3],
      currencySymbol: '$',
      percentSymbol: '%'
    };
    expect(formatDecimal(12)).toEqual('12');
    expect(formatDecimal(12.3)).toEqual('12.3');
  });

  it('Format currency works fine', () => {
    // positive number
    expect(formatCurrency(12)).toEqual('$12.00');
    expect(formatCurrency(12.3)).toEqual('$12.30');
    expect(formatCurrency(12.34)).toEqual('$12.34');
    expect(formatCurrency(12.345)).toEqual('$12.35');
    expect(formatCurrency(12345.67)).toEqual('$12,345.67');

    // negative number
    expect(formatCurrency(-12)).toEqual('-$12.00');
    expect(formatCurrency(-12.3)).toEqual('-$12.30');
    expect(formatCurrency(-12.34)).toEqual('-$12.34');
    expect(formatCurrency(-12.345)).toEqual('-$12.35');
    expect(formatCurrency(-12345.67)).toEqual('-$12,345.67');

    // string
    expect(formatCurrency('12')).toEqual('$12.00');
    expect(formatCurrency('12.3')).toEqual('$12.30');
    expect(formatCurrency('12.34')).toEqual('$12.34');
    expect(formatCurrency('12.345')).toEqual('$12.35');
    expect(formatCurrency('12345.67')).toEqual('$12,345.67');

    // decimals
    const cc = { decimals: 4 };
    expect(formatCurrency('12.3', cc)).toEqual('$12.3000');
    expect(formatCurrency('12.34567', cc)).toEqual('$12.3457');

    cc.decimals = 0;
    expect(formatCurrency('12.3', cc)).toEqual('$12');
    expect(formatCurrency('12.5', cc)).toEqual('$13');

    cc.decimals = -1;
    expect(formatCurrency('12.34567', cc)).toEqual('$12.34567');

    // currency symbol
    expect(formatCurrency(12.34, { currencySymbol: '¥' })).toEqual('¥12.34');
  });

  it('Parse currency works fine', () => {
    // positive string
    expect(parseCurrency('$12')).toEqual(12);
    expect(parseCurrency('$12.3')).toEqual(12.3);
    expect(parseCurrency('$12.30')).toEqual(12.3);
    expect(parseCurrency('$12.34')).toEqual(12.34);
    expect(parseCurrency('$12.345')).toEqual(12.345);

    // negative string
    expect(parseCurrency('-$12')).toEqual(-12);
    expect(parseCurrency('-$12.3')).toEqual(-12.3);
    expect(parseCurrency('-$12.30')).toEqual(-12.3);
    expect(parseCurrency('-$12.34')).toEqual(-12.34);
    expect(parseCurrency('-$12.345')).toEqual(-12.345);

    expect(parseCurrency('Fee: -$1aa2.345')).toEqual(-12.345);
  });

  it('moment Format works fine', () => {
    expect(momentFormat()).toEqual(Globalize.ANDateFormat);

    expect(momentFormat('d')).toEqual(Globalize.ANDateFormat);

    expect(momentFormat('f')).toEqual(`${Globalize.ANDateFormat} ${Globalize.ANTimeFormat}`);

    expect(momentFormat('t')).toEqual(Globalize.ANTimeFormat);

    expect(momentFormat('HH:MM')).toEqual('HH:MM');
  });

  it('moment Format works fine when ANTimeFormat and ANDateFormat is null', () => {
    Globalize.ANTimeFormat = null;
    Globalize.ANDateFormat = null;

    Globalize.patterns = { t: 'HH: MM' };

    const p = Globalize.culture.calendars.standard.patterns;

    expect(momentFormat()).toEqual(p.d);

    expect(momentFormat('d')).toEqual(p.d);

    expect(momentFormat('D')).toEqual(p.D);

    expect(momentFormat('f')).toEqual(`${p.D} ${p.t}`);

    expect(momentFormat('F')).toEqual(`${p.D} ${p.T}`);

    expect(momentFormat('g')).toEqual(`${p.d} ${p.t}`);

    expect(momentFormat('G')).toEqual(`${p.d} ${p.T}`);

    expect(momentFormat('m')).toEqual(p.M);

    expect(momentFormat('M')).toEqual(p.M);

    expect(momentFormat('s')).toEqual(p.S);

    expect(momentFormat('t')).toEqual(Globalize.patterns.t);

    expect(momentFormat('T')).toEqual(p.T);

    expect(momentFormat('u')).toEqual(p.S);

    expect(momentFormat('U')).toEqual(`${p.D} ${p.T}`);

    expect(momentFormat('y')).toEqual(p.Y);

    expect(momentFormat('Y')).toEqual(p.Y);
  });

  it('parseDate works fine', () => {
    const d = new Date();
    expect(Globalize.parseDate(d)).toEqual(moment(d, Globalize.ANDateFormat));

    const f = 'd';
    expect(Globalize.parseDate(d, f)).toEqual(moment(d, f));
  });

  it('parseTime works fine', () => {
    const d = new Date();
    expect(Globalize.parseTime(d)).toEqual(moment(d, Globalize.ANTimeFormat));

    const f = 'T';
    expect(Globalize.parseTime(d, f)).toEqual(moment(d, f));
  });

  it('parseDateTime works fine', () => {
    const d = new Date();
    expect(Globalize.parseDateTime(d)).toEqual(moment(d, Globalize.ANDateTimeFormat));

    const f = 'U';
    expect(Globalize.parseDateTime(d, f)).toEqual(moment(d, f));
  });

  it('formatDate works fine', () => {
    const d = new Date();
    const m = momentHelper.createMoment(d);
    expect(Globalize.formatDate(d)).toEqual(m.format(Globalize.ANDateFormat));

    const f = 'd';
    expect(Globalize.formatDate(d, f)).toEqual(m.format(f));

    expect(Globalize.formatDate('ddasas', f)).toEqual('');
  });

  it('formatTime works fine', () => {
    const d = new Date();
    const m = momentHelper.createMoment(d);
    expect(Globalize.formatTime(d)).toEqual(m.format(Globalize.ANTimeFormat));

    const f = 'T';
    expect(Globalize.formatTime(d, f)).toEqual(m.format(f));

    expect(Globalize.formatTime('ddasas', f)).toEqual('');
  });

  it('formatDateTime works fine', () => {
    const d = new Date();
    const m = momentHelper.createMoment(d);
    expect(Globalize.formatDateTime(d)).toEqual(m.format(Globalize.ANDateTimeFormat));

    const f = 'U';
    expect(Globalize.formatDateTime(d, f)).toEqual(m.format(f));

    expect(Globalize.formatDateTime('ddasas', f)).toEqual('');
  });

  it('isSameDay works fine', () => {
    const d1 = new Date('12/02/2012');
    const d2 = new Date('12/12/2012');

    expect(Globalize.isSameDay(d1, d2)).toBeFalsy();

    const d3 = new Date('12/02/2012 4:00');

    expect(Globalize.isSameDay(d1, d3)).toBeTruthy();
  });

  it('getNumericCultureContext works fine', () => {
    expect(Globalize.getNumericCultureContext()).toEqual({ ...Globalize.decimalContext });

    expect(Globalize.getNumericCultureContext(NumericType.DECIMAL))
    .toEqual({ ...Globalize.decimalContext });

    expect(Globalize.getNumericCultureContext(NumericType.CURRENCY))
    .toEqual({ ...Globalize.currencyContext });

    expect(Globalize.getNumericCultureContext(NumericType.PERCENT))
    .toEqual({ ...Globalize.percentContext });
  });

  it('formatNumeric works fine', () => {
    expect(Globalize.formatNumeric()).toEqual('');

    expect(Globalize.formatNumeric('null')).toEqual('');
  });

  it('parseNumeric works fine', () => {
    expect(Globalize.parseNumeric('')).toEqual(0);

    expect(Globalize.parseNumeric('aaaa')).toEqual(0);

    expect(Globalize.parseNumeric(1.12)).toEqual(1.12);

    expect(Globalize.parseNumeric(-1.12)).toEqual(-1.12);
  });

  it('getCurrencySymbol should work fine', () => {
    expect(Globalize.getCurrencySymbol('wwww')).toEqual('$');
  });

  it('addCldr should work fine', () => {
    const data = {
      locale: 'www'
    };

    Globalize.addCldr(data);
    expect(Globalize.cldrs.www).toEqual(data);
  });

  it('getCulture should work fine', () => {
    expect(Globalize.getCulture('wwww')).toBeNull();
    expect(Globalize.getCulture()).toBeNull();

    Globalize.cultures = { en: 111 };
    expect(Globalize.getCulture('en')).toEqual(111);
  });

  it('getRelativeData  should work fine', () => {
    expect(Globalize.getRelativeData('wwww')).toBeNull();
    expect(Globalize.getRelativeData()).toBeNull();
  });

  it('getToday works fine', () => {
    const d = new Date();
    const today = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

    expect(Globalize.getToday().format('M-D-YYYY')).toEqual(today);

    const offset = 8;
    const format = 'YYYYMMDD HHmmss';

    const result = moment(moment().utc().utcOffset(offset, false).format(format), format);
    Globalize.currentANTimeZoneOffset = offset;

    expect(Globalize.getToday(8)).toEqual(result);
    expect(Globalize.getToday()).toEqual(result);
  });
});

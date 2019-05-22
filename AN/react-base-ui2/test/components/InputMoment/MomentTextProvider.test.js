import moment from 'moment';
import MomentTextProvider from '../../../src/components/InputMoment/MomentTextProvider';
import { createMoment, isSame } from '../../../src/utils/momentHelper';

describe('components/InputMoment/MomentTextProvider.js', () => {
  let provider;
  const m = createMoment('2018-06-06T00:00:00+00:00').utc();

  beforeEach(() => {
    provider = new MomentTextProvider({});
  });

  test('basic usage', () => {
    expect(provider.getValue()).toBe(null);
    expect(provider.getText()).toBe('');

    const d1 = '2018-06-06T00:00:00+00:00';
    const m1 = createMoment(d1);
    const d2 = '2018-06-07T00:00:00+00:00';
    const m2 = createMoment(d2);

    provider.setValue(d1);
    expect(provider.getValue()).toEqual(m1);
    expect(provider.getText()).toBe('06 Jun 2018');

    provider.increment();
    expect(isSame(provider.getValue(), m2)).toBe(true);
    expect(provider.getText()).toBe('07 Jun 2018');

    provider.activeFieldIndex = 3;
    provider.increment();
    expect(isSame(provider.getValue(), m2)).toBe(true);
    expect(provider.getText()).toBe('07 Jun 2018');

    provider.decrement();
    expect(isSame(provider.getValue(), m2)).toBe(true);
    expect(provider.getText()).toBe('07 Jun 2018');

    provider.activeFieldIndex = 0;
    provider.decrement();
    expect(isSame(provider.getValue(), m1)).toBe(true);
    expect(provider.getText()).toBe('06 Jun 2018');
    expect(provider.isValid()).toBe(true);

    provider.setText('2018-06-06T00:00:00+00:00');
    expect(isSame(provider.getValue(), m1)).toBe(true);
    expect(provider.getText()).toBe('06 Jun 2018');
  });

  test('formats', () => {
    const formats = [
      { format: 'd', result: '06 Jun 2018' },
      { format: 'D', result: 'Wednesday, June 06, 2018' },
      { format: 'f', result: '06 Jun 2018 12:00 AM' },
      { format: 'F', result: 'Wednesday, June 06, 2018 12:00:00 AM' },
      { format: 'g', result: '6/6/2018 12:00 AM' },
      { format: 'G', result: '6/6/2018 12:00:00 AM' },
      { format: 'm', result: 'June 06' },
      { format: 'M', result: 'June 06' },
      { format: 's', result: '2018\'-\'06\'-\'d\'T\'00\':\'00\':\'00' },
      { format: 't', result: '12:00 AM' },
      { format: 'T', result: '12:00:00 AM' },
      { format: 'u', result: '2018\'-\'06\'-\'d\'T\'00\':\'00\':\'00' },
      { format: 'U', result: 'Wednesday, June 06, 2018 12:00:00 AM' },
      { format: 'y', result: '2018 June' },
      { format: 'Y', result: '2018 June' },
      { format: 'YY', result: '18' },
      { format: 'ddd', result: 'We' },
      { format: 'hh', result: '12' },
      { format: 'H', result: '6/6/2018' },
      { format: '[literal-format-1:YYYY-MM-DD] YYYY-MM-DD', result: 'literal-format-1:YYYY-MM-DD 2018-06-06' },
      { format: '[literal-format-2:]\\Y Y', result: 'literal-format-2:Y 18' },
      { format: '[literal-format-3:]\\H H', result: 'literal-format-3:H 0' },
      { format: '[literal-format-4:]\\m m', result: 'literal-format-4:m 0' },
      { format: '[literal-format-5:]\\s s', result: 'literal-format-5:s 0' },
      { format: '[literal-format-6:]\\a a', result: 'literal-format-6:a am' },
      { format: '[literal-format-7:kkkk] kkkk', result: 'literal-format-7:kkkk k' }
    ];

    formats.forEach(({ format, result }) => {
      provider = new MomentTextProvider({ format });
      provider.setValue(m);
      expect(provider.getText()).toBe(result);
    });

    provider = new MomentTextProvider({});
    expect(provider.createDescriptor('test')).toBe(null);
  });

  test('get and set', () => {
    provider.setValue(m);
    provider.setYear(2019);
    expect(isSame(provider.getValue(), createMoment('2019-06-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('06 Jun 2019');
    expect(provider.getYear()).toBe('2019');

    provider.setYear(201);
    expect(provider.getYear()).toBe('0201');
    provider.value = {};
    expect(provider.getYear()).toBe('');

    provider.setValue(m);
    provider.setMonth(7);
    expect(isSame(provider.getValue(), createMoment('2018-07-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('06 Jul 2018');
    expect(provider.getMonth()).toBe(7);

    provider.setValue(m);
    provider.setMonth(7, false);
    expect(isSame(provider.getValue(), createMoment('2018-07-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('06 Jul 2018');

    provider.setValue(m);
    provider.setMonth(13, false);
    expect(isSame(provider.getValue(), createMoment('2018-01-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('06 Jan 2018');

    provider.setValue(m);
    provider.setMonth(-1, false);
    expect(isSame(provider.getValue(), createMoment('2018-01-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('06 Jan 2018');

    provider.setMonth(13);
    expect(isSame(provider.getValue(), createMoment('2019-01-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('06 Jan 2019');

    provider.setValue(m);
    provider.setDateOfMonth(7);
    expect(isSame(provider.getValue(), createMoment('2018-06-07T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('07 Jun 2018');

    provider.setDateOfMonth(-1);
    expect(isSame(provider.getValue(), createMoment('2018-06-01T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('01 Jun 2018');
    provider.setDateOfMonth(32);
    expect(isSame(provider.getValue(), createMoment('2018-06-01T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('01 Jun 2018');

    provider.setValue(m);
    provider.setHours(12);
    expect(isSame(provider.getValue(), createMoment('2018-06-06T12:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('06 Jun 2018');
    provider.setHours(-1);
    expect(isSame(provider.getValue(), createMoment('2018-06-05T23:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('05 Jun 2018');
    expect(provider.getHours()).toBe(23);

    provider.setHours(24);
    expect(isSame(provider.getValue(), createMoment('2018-06-05T00:00:00+00:00'))).toBe(true);
    expect(provider.getText()).toBe('05 Jun 2018');
    expect(provider.getHours()).toBe(0);

    provider.setValue(m);
    provider.setMinutes(15);
    expect(isSame(provider.getValue(), createMoment('2018-06-06T00:15:00+00:00'))).toBe(true);
    expect(provider.getMinutes()).toBe(15);
    provider.setMinutes(60);
    expect(isSame(provider.getValue(), createMoment('2018-06-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getMinutes()).toBe(0);

    provider.setValue(m);
    provider.setSeconds(15);
    expect(isSame(provider.getValue(), createMoment('2018-06-06T00:00:15+00:00'))).toBe(true);
    expect(provider.getSeconds()).toBe(15);
    provider.setSeconds(60);
    expect(isSame(provider.getValue(), createMoment('2018-06-06T00:00:00+00:00'))).toBe(true);
    expect(provider.getSeconds()).toBe(0);

    provider.setDayOfWeek(1);
    expect(provider.getDayOfWeek()).toBe(1);
    provider.setDayOfWeek(7);
    expect(provider.getDayOfWeek()).toBe(0);

    expect(provider.set(NaN)).toBe(false);
    provider.value = null;
    expect(provider.set('year', 2019)).toBe(false);
  });

  test('field operations', () => {
    provider.setValue(m);
    expect(provider.getFieldRange()).toEqual({ start: 0, end: 2 });
    expect(provider.getFieldRange(3)).toBe(null);
    provider.value = null;
    expect(provider.getFieldRange()).toEqual({ start: 0, end: 0 });

    provider.setValue(m);
    provider.setActiveField(1);
    expect(provider.getActiveFieldRange()).toEqual({ start: 0, end: 3 });
    expect(provider.setActiveField(1)).toBe(false);

    provider.setValue(m);
    expect(provider.clearField(0)).toBe(true);
    expect(provider.closeBlankField()).toBe(true);

    expect(provider.clearField(3)).toBe(false);
    expect(provider.closeBlankField()).toBe(false);

    const formats = [
      { format: '[TEST]YYYY' },
      { format: 'YYYY[TEST]' }
    ];

    formats.forEach(({ format }) => {
      provider = new MomentTextProvider({ format });
      provider.setValue(m);
      provider.getText();
      [-1, 0, 1, 11].forEach((i) => {
        expect(provider.getCursorFieldIndex(i)).toBe(0);
      });
    });

    provider.setValue(null);
    expect(provider.increment()).toBeTruthy();
    expect(provider.decrement()).toBeTruthy();
  });

  test('setText', () => {
    const t = '2018-06-06T00:00:00+00:00';
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1527825600000);

    const formats = [
      { text: t, format: undefined, result: '06 Jun 2018' },
      { text: t, format: '', result: '' },
      { text: t, format: 'YYYY/MM/DD', result: '2018/06/06' },
      { text: t, format: 'MMM', result: 'Jun' },
      { text: t, format: 'MMMM', result: 'June' },
      { text: null, format: 'MMMM', result: moment().format('MMMM') }
    ];

    formats.forEach(({ text, format, result }) => {
      provider = new MomentTextProvider({ format });
      provider.setText(text);
      expect(provider.getText()).toBe(result);
    });

    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  test('misc', () => {
    expect(provider.removeLiterals(' +-.:()=|')).toBe('');
    expect(provider.findAlikeArrayItemIndex(['a', 'b', 'c'], 'b')).toBe(1);

    expect(provider.getFirstDelimiterPos('aaaa123', 'aaaaaaa')).toBe(3);
    expect(provider.getFirstDelimiterPos('aaaa123', 'aaaa'));

    provider = new MomentTextProvider({ format: 'YYYY/M/D H:m' });
    provider.value = null;
    expect(provider.needToMove(0, 'a')).toBe(false);

    provider.setValue(m);
    expect(provider.needToMove(0, 'a')).toBe(false);
    expect(provider.needToMove(101, 'a')).toBe(true);
    expect(provider.needToMove(3, '8')).toBe(false);
    provider.activeFieldIndex = 1;
    expect(provider.needToMove(1, '0')).toBe(false);
    provider.activeFieldIndex = 2;
    expect(provider.needToMove(1, '0')).toBe(false);
    provider.activeFieldIndex = 3;
    expect(provider.needToMove(1, '0')).toBe(false);
    provider.activeFieldIndex = 4;
    expect(provider.needToMove(1, '0')).toBe(false);

    provider = new MomentTextProvider({ format: '[TEST]YYYY[TEST]' });
    expect(provider.isFieldGap('T')).toBe(true);
    provider.activeFieldIndex = 20;
    expect(provider.isFieldGap('T')).toBe(false);
  });
});

import uniqueId from 'lodash/uniqueId';
import { createMoment } from '../../../src/utils/momentHelper';
import descriptors from '../../../src/components/InputMoment/Descriptors';
import MomentTextProvider from '../../../src/components/InputMoment/MomentTextProvider';
import TokenType from '../../../src/components/InputMoment/consts/TokenType';
import { Globalize } from '../../../src/services/i18n';

const defaultYear = Globalize.getToday().year().toString();
const values = {
  [TokenType.LITERAL]: { set: 'a', get: '', inc: '', dec: '', adjust: true, reset: '' },
  [TokenType.MONTH]: { set: '6', get: '6', inc: '7', dec: '6', adjust: true, reset: '1' },
  [TokenType.MONTH_TWO_DIGITS]: { set: '06', get: '06', inc: '07', dec: '06', adjust: true, reset: '01' },
  [TokenType.MONTH_SHORT_NAME]: { set: 'Jun', get: 'Jun', inc: 'Jul', dec: 'Jun', adjust: true, reset: 'Jan' },
  [TokenType.MONTH_LONG_NAME]: { set: 'June', get: 'June', inc: 'July', dec: 'June', adjust: true, reset: 'January' },
  [TokenType.DATE]: { set: '6', get: '6', inc: '7', dec: '6', adjust: true, reset: '1' },
  [TokenType.DATE_TWO_DIGITS]: { set: '06', get: '06', inc: '07', dec: '06', adjust: true, reset: '01' },
  [TokenType.DAY_SHORT_NAME]: { set: 'We', get: 'We', inc: 'Th', dec: 'We', adjust: false, reset: 'Mo' },
  [TokenType.DAY_LONG_NAME]: { set: 'Wednesday', get: 'Wednesday', inc: 'Thursday', dec: 'Wednesday', adjust: false, reset: 'Monday' },
  [TokenType.YEAR]: { set: '18', get: '18', inc: '19', dec: '18', adjust: true, reset: defaultYear.slice(2) },
  [TokenType.YEAR_TWO_DIGITS]: { set: '18', get: '18', inc: '19', dec: '18', adjust: true, reset: defaultYear.slice(2) },
  [TokenType.YEAR_FOUR_DIGITS]: { set: '2018', get: '2018', inc: '2019', dec: '2018', adjust: true, reset: defaultYear },
  [TokenType.HOUTR_12]: { set: '0', get: '12', inc: '1', dec: '12', adjust: true, reset: '12' },
  [TokenType.HOUTR_12_TWO_DIGITS]: { set: '00', get: '12', inc: '01', dec: '12', adjust: true, reset: '12' },
  [TokenType.HOUTR_24]: { set: '0', get: '0', inc: '1', dec: '0', adjust: true, reset: '0' },
  [TokenType.HOUTR_24_TWO_DIGITS]: { set: '00', get: '00', inc: '01', dec: '00', adjust: true, reset: '00' },
  [TokenType.AMPM]: { set: 'am', get: 'am', inc: 'pm', dec: 'am', adjust: true, reset: 'am' },
  [TokenType.AMPM_UPPER]: { set: 'AM', get: 'AM', inc: 'PM', dec: 'AM', adjust: true, reset: 'AM' },
  [TokenType.MINUTE]: { set: '0', get: '0', inc: '12', dec: '0', adjust: true, reset: '0' },
  [TokenType.MINUTE_TWO_DIGITS]: { set: '00', get: '00', inc: '01', dec: '00', adjust: true, reset: '00' },
  [TokenType.SECOND]: { set: '0', get: '0', inc: '12', dec: '0', adjust: true, reset: '0' },
  [TokenType.SECOND_TWO_DIGITS]: { set: '00', get: '00', inc: '12', dec: '00', adjust: true, reset: '00' }
};

describe('components/InputMoment/Descriptors', () => {
  const m = createMoment('2018-06-06T00:00:00+00:00').utc();

  test('basic usage', () => {
    Object.keys(TokenType).forEach((key) => {
      const type = TokenType[key];
      const provider = new MomentTextProvider({ format: type, value: m });
      const DescClass = descriptors[type];
      const desc = new DescClass(provider, uniqueId());
      const val = values[type];

      desc.setValueText(val.set);
      expect(desc.getValueText()).toBe(val.get);
      expect(desc.getText()).toBe(val.get);

      desc.incValue();
      expect(desc.getValueText()).toBe(val.inc);

      desc.decValue();
      expect(desc.getValueText()).toBe(val.dec);

      expect(desc.needAdjustInsertPos()).toBe(val.adjust);

      if (desc.allowInstanceEditing) {
        desc.clear();
        expect(desc.getText()).toBe('');

        expect(desc.setText('1'));
        expect(desc.getText()).toBe('1');
        expect(desc.getText()).not.toBe(desc.getValueText());

        desc.inc();
        expect(desc.getValueText()).toBe(val.get);
        desc.dec();
        expect(desc.getValueText()).toBe(val.get);

        desc.close();
        expect(desc.isEditing).toBe(false);
        expect(desc.editingText).toBe('');
        desc.reset();
      } else {
        desc.inc();
        expect(desc.getValueText()).toBe(val.inc);
        desc.dec();
        expect(desc.getValueText()).toBe(val.dec);
        desc.clear();
        desc.setText('1');
        expect(desc.getText()).toBe(val.reset);
        expect(desc.getValueText()).toBe(val.reset);
        desc.close();
      }
      expect(desc.getText()).toBe(val.reset);
      expect(desc.getValueText()).toBe(val.reset);
    });
  });

  test('edge values', () => {
    let desc;
    let provider;

    const DescY = descriptors[TokenType.YEAR];
    provider = new MomentTextProvider({ format: TokenType.YEAR, value: createMoment('2018-01-01T00:00:00+00:00').utc() });
    desc = new DescY(provider, uniqueId());
    desc.setValueText('');
    expect(desc.getValueText()).toBe('1');

    provider = new MomentTextProvider({ format: TokenType.YEAR, value: createMoment('0002-02-02T00:00:00+00:00').utc() });
    desc = new DescY(provider, uniqueId());
    desc.setValueText('');
    jest.spyOn(desc.txtProvider, 'getYear').mockImplementationOnce(() => '02');
    expect(desc.getValueText()).toBe('2');

    const DescYY = descriptors[TokenType.YEAR_TWO_DIGITS];
    provider = new MomentTextProvider({ format: TokenType.YEAR, value: createMoment('2018-01-01T00:00:00+00:00').utc() });
    desc = new DescYY(provider, uniqueId());
    desc.setValueText('');
    expect(desc.getValueText()).toBe('01');

    provider = new MomentTextProvider({ format: TokenType.YEAR, value: createMoment('0002-02-02T00:00:00+00:00').utc() });
    desc = new DescYY(provider, uniqueId());
    desc.setValueText('');
    jest.spyOn(desc.txtProvider, 'getYear').mockImplementationOnce(() => '02');
    expect(desc.getValueText()).toBe('02');

    const Desch = descriptors[TokenType.HOUTR_12];
    provider = new MomentTextProvider({ format: TokenType.HOUTR_12, value: createMoment('2018-01-01T13:00:00+00:00').utc() });
    desc = new Desch(provider, uniqueId());
    desc.setValueText('1', true);
    expect(desc.getValueText()).toBe('1');

    const Deschh = descriptors[TokenType.HOUTR_12_TWO_DIGITS];
    provider = new MomentTextProvider({ format: TokenType.HOUTR_12_TWO_DIGITS, value: createMoment('2018-01-01T13:00:00+00:00').utc() });
    desc = new Deschh(provider, uniqueId());
    desc.setValueText('13', true);
    expect(desc.getValueText()).toBe('01');
    desc.setValueText('10', true);
    expect(desc.getValueText()).toBe('10');

    const Desca = descriptors[TokenType.AMPM];
    provider = new MomentTextProvider({ format: TokenType.AMPM, value: createMoment('2018-01-01T13:00:00+00:00').utc() });
    desc = new Desca(provider, uniqueId());
    desc.setValueText('pm');
    expect(desc.getValueText()).toBe('pm');

    const DescA = descriptors[TokenType.AMPM_UPPER];
    provider = new MomentTextProvider({ format: TokenType.AMPM_UPPER, value: createMoment('2018-01-01T13:00:00+00:00').utc() });
    desc = new DescA(provider, uniqueId());
    desc.setValueText('PM');
    expect(desc.getValueText()).toBe('PM');
  });

  test('HOUTR_12 should work fine when using with pm', () => {
    m.set('hour', 13);
    const type = TokenType.HOUTR_12;
    const provider = new MomentTextProvider({ format: `${type}:mm a`, value: m });
    const DescClass = descriptors[type];
    const desc = new DescClass(provider, uniqueId());

    desc.setValueText(15);
    expect(provider.getText()).toBe('3:00 pm');

    desc.setValueText(4);
    expect(provider.getText()).toBe('4:00 pm');
  });
  test('HOUTR_12_TWO_DIGITS should work fine when using with pm', () => {
    m.set('hour', 13);
    const type = TokenType.HOUTR_12_TWO_DIGITS;
    const provider = new MomentTextProvider({ format: `${type}:mm a`, value: m });
    const DescClass = descriptors[type];
    const desc = new DescClass(provider, uniqueId());

    desc.setValueText(15);
    expect(provider.getText()).toBe('03:00 pm');

    desc.setValueText(4);
    expect(provider.getText()).toBe('04:00 pm');
  });
});

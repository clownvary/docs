import toNumber from 'lodash/toNumber';
import find from 'lodash/find';
import { Globalize } from '../../services/i18n';
import * as TokenType from './consts/TokenType';


class IDescriptor {
  constructor(provider, id, type, maxLen = 2) {
    this.txtProvider = provider;
    this.id = id;
    this.type = type;
    this.startIndex = 0;
    this.allowInstanceEditing = false;
    this.isEditing = false;
    this.editingText = '';
    this.maxLen = maxLen;
  }

  reset() {
    return false;
  }

  clear() {
    if (this.allowInstanceEditing) {
      this.isEditing = true;
      this.editingText = '';
      return true;
    }
    return this.reset();
  }

  close() {
    if (this.isEditing && this.editingText.length > 0) {
      this.setValueText(this.editingText);
    }

    this.isEditing = false;
    this.editingText = '';
  }

  inc() {
    if (this.isEditing) {
      return;
    }

    this.incValue();
  }

  dec() {
    if (this.isEditing) {
      return;
    }

    this.decValue();
  }

  getValueText() { return null; }

  getText() {
    if (this.isEditing) {
      return this.editingText;
    }

    return this.getValueText();
  }

  setValueText(value, autoBubble) {
    console.log(value);
    console.log(autoBubble);
    return false;
  }

  setText(text, autoBubble = false) {
    if (this.isEditing && text.length <= this.maxLen && /^\d+$/.test(text)) {
      this.editingText = text;
      return true;
    }

    return this.setValueText(text, autoBubble);
  }

  incValue() { }
  decValue() { }
  needAdjustInsertPos() { return true; }
}

const descriptors = {};

class clsliteral extends IDescriptor {
  constructor(provider, id, type = TokenType.LITERAL, maxLen = 100) {
    super(provider, id, type, maxLen);
    this.name = 'literal';
  }

  literal = '';
  getValueText() {
    return this.literal;
  }
}

descriptors[TokenType.LITERAL] = clsliteral;

class clsM extends IDescriptor {
  constructor(provider, id, type = TokenType.MONTH, maxLen = 100) {
    super(provider, id, type, maxLen);
    this.name = 'Month';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setMonth(1);
  }

  getValueText() {
    const m = `${this.txtProvider.getMonth()}`;
    return m;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setMonth(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
  }
}

descriptors[TokenType.MONTH] = clsM;

class clsMM extends IDescriptor {
  constructor(provider, id, type = TokenType.MONTH_TWO_DIGITS, maxLen) {
    super(provider, id, type, maxLen);
    this.name = 'Two-Digits Month';
  }

  reset() {
    return this.txtProvider.setMonth(1);
  }

  getValueText() {
    const m = `${this.txtProvider.getMonth()}`;
    return m.length === 1 ? (`0${m}`) : m;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setMonth(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
  }
}

descriptors[TokenType.MONTH_TWO_DIGITS] = clsMM;

class clsMMM extends IDescriptor {
  constructor(provider, id, type = TokenType.MONTH_SHORT_NAME, maxLen = 100) {
    super(provider, id, type, maxLen);
    this.name = 'Abbreviated Month Names';
  }

  reset() {
    return this.txtProvider.setMonth(1);
  }

  getValueText() {
    const calendar = Globalize.culture.calendars.standard;
    const m = this.txtProvider.getMonth();
    return calendar.months.namesAbbr[m - 1];
  }

  setValueText(value, autoBubble) {
    const calendar = Globalize.culture.calendars.standard;
    let m = -1;
    m = this.txtProvider.findAlikeArrayItemIndex(calendar.months.namesAbbr, value);
    if (m === -1) {
      return false;
    }
    return this.txtProvider.setMonth(m + 1, autoBubble);
  }

  incValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
  }
}

descriptors[TokenType.MONTH_SHORT_NAME] = clsMMM;

class clsMMMM extends IDescriptor {
  constructor(provider, id, type = TokenType.MONTH_LONG_NAME, maxLen = 100) {
    super(provider, id, type, maxLen);
    this.name = 'Full Month Names';
  }

  reset() {
    return this.txtProvider.setMonth(1);
  }

  getValueText() {
    const calendar = Globalize.culture.calendars.standard;
    const m = this.txtProvider.getMonth();
    return calendar.months.names[m - 1];
  }

  setValueText(value, autoBubble) {
    const calendar = Globalize.culture.calendars.standard;
    let m = -1;
    m = this.txtProvider.findAlikeArrayItemIndex(calendar.months.names, value);
    if (m === -1) {
      return false;
    }
    return this.txtProvider.setMonth(m + 1, autoBubble);
  }

  incValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
  }
}

descriptors[TokenType.MONTH_LONG_NAME] = clsMMMM;

class clsD extends IDescriptor {
  constructor(provider, id, type = TokenType.DATE, maxLen) {
    super(provider, id, type, maxLen);
    this.name = 'Date';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setDateOfMonth(1);
  }

  getValueText() {
    const dom = this.txtProvider.getDateOfMonth();
    return `${dom}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setDateOfMonth(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
  }
}

descriptors[TokenType.DATE] = clsD;

class clsDD extends IDescriptor {
  constructor(provider, id, type = TokenType.DATE_TWO_DIGITS, maxLen) {
    super(provider, id, type, maxLen);
    this.name = 'Two-digits Date';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setDateOfMonth(1);
  }

  getValueText() {
    let dom = this.txtProvider.getDateOfMonth();
    if (dom < 10) {
      dom = `0${dom}`;
    }
    return `${dom}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setDateOfMonth(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
  }
}

descriptors[TokenType.DATE_TWO_DIGITS] = clsDD;

class clsddd extends IDescriptor {
  constructor(provider, id, type = TokenType.DAY_SHORT_NAME, maxLen = 100) {
    super(provider, id, type, maxLen);
    this.name = 'Abbreviated Day Name of Week';
  }

  reset() {
    return this.txtProvider.setDayOfWeek(1, false);
  }

  getValueText() {
    const calendar = Globalize.culture.calendars.standard;
    const dw = this.txtProvider.getDayOfWeek();
    return calendar.days.namesShort[dw];
  }

  setValueText(value) {
    const calendar = Globalize.culture.calendars.standard;
    let dw = -1;
    dw = this.txtProvider.findAlikeArrayItemIndex(calendar.days.namesShort, value);
    if (dw === -1) {
      return false;
    }
    return this.txtProvider.setDayOfWeek(dw);
  }

  incValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
  }

  needAdjustInsertPos() {
    return false;
  }
}

descriptors[TokenType.DAY_SHORT_NAME] = clsddd;

class clsdddd extends IDescriptor {
  constructor(provider, id, type = TokenType.DAY_LONG_NAME, maxLen = 100) {
    super(provider, id, type, maxLen);
    this.name = 'Full Day Name of Week';
  }

  reset() {
    return this.txtProvider.setDayOfWeek(1, false);
  }

  getValueText() {
    const calendar = Globalize.culture.calendars.standard;
    const dw = this.txtProvider.getDayOfWeek();
    return calendar.days.names[dw];
  }

  setValueText(value) {
    const calendar = Globalize.culture.calendars.standard;
    let dw = -1;
    dw = this.txtProvider.findAlikeArrayItemIndex(calendar.days.names, value);
    if (dw === -1) {
      return false;
    }
    return this.txtProvider.setDayOfWeek(dw);
  }

  incValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
  }

  decValue() {
    this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
  }

  needAdjustInsertPos() {
    return false;
  }
}

descriptors[TokenType.DAY_LONG_NAME] = clsdddd;

class clsY extends IDescriptor {
  constructor(provider, id, type = TokenType.YEAR, maxLen) {
    super(provider, id, type, maxLen);
    this.name = 'One-digit Year';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setYear(Globalize.getToday().year(), false);
  }

  getValueText() {
    let y = this.txtProvider.getYear();
    y = `${y}`;
    if (y.length === 4) {
      y = y.charAt(2) + y.charAt(3);
    }
    if (y.charAt(0) === '0') {
      y = y.charAt(1);
    }
    return y;
  }

  setValueText(value) {
    value += '';
    while (value.length < 2) {
      value = `0${value}`;
    }
    let y = this.txtProvider.getYear();
    y = `${y}`;
    if (value === '00') {
      const m = this.txtProvider.getMonth();
      const dom = this.txtProvider.getDateOfMonth();
      const h = this.txtProvider.getHours();
      const min = this.txtProvider.getMinutes();
      const s = this.txtProvider.getSeconds();
      if (m === 1 && dom === 1 && !h && !min && !s) {
        y = '0001';
        value = '01';
      }
    }
    /* istanbul ignore else */
    if (y.length >= 2) {
      y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
    }
    return this.txtProvider.setYear(y);
  }

  incValue() {
    this.txtProvider.setYear(toNumber(this.txtProvider.getYear()) + 1, null, true);
  }

  decValue() {
    this.txtProvider.setYear(toNumber(this.txtProvider.getYear()) - 1, null, true);
  }
}

descriptors[TokenType.YEAR] = clsY;

class clsYY extends IDescriptor {
  constructor(provider, id, type = TokenType.YEAR_TWO_DIGITS, maxLen) {
    super(provider, id, type, maxLen);
    this.name = 'Two-digits Year';
    this.token = 'YY';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setYear(Globalize.getToday().year(), false);
  }

  getValueText() {
    let y = this.txtProvider.getYear();
    y = `${y}`;
    if (y.length === 4) {
      y = y.charAt(2) + y.charAt(3);
    }
    return y;
  }

  setValueText(value) {
    value += '';
    while (value.length < 2) {
      value = `0${value}`;
    }
    let y = this.txtProvider.getYear();
    y = `${y}`;
    if (value === '00') {
      const m = this.txtProvider.getMonth();
      const dom = this.txtProvider.getDateOfMonth();
      const h = this.txtProvider.getHours();
      const min = this.txtProvider.getMinutes();
      const s = this.txtProvider.getSeconds();
      if (m === 1 && dom === 1 && !h && !min && !s) {
        y = '0001';
        value = '01';
      }
    }
    /* istanbul ignore else */
    if (y.length >= 2) {
      y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
    }
    const aRes = this.txtProvider.setYear(y);
    return aRes;
  }

  incValue() {
    this.txtProvider.setYear(toNumber(this.txtProvider.getYear()) + 1, null, true);
  }

  decValue() {
    this.txtProvider.setYear(toNumber(this.txtProvider.getYear()) - 1, null, true);
  }
}

descriptors[TokenType.YEAR_TWO_DIGITS] = clsYY;

class clsYYYY extends IDescriptor {
  constructor(provider, id, type = TokenType.YEAR_FOUR_DIGITS, maxLen = 4) {
    super(provider, id, type, maxLen);
    this.name = 'Four-digits Year';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setYear(Globalize.getToday().year(), false);
  }

  getValueText() {
    return this.txtProvider.getYear();
  }

  setValueText(value) {
    return this.txtProvider.setYear(value);
  }

  incValue() {
    this.txtProvider.setYear(toNumber(this.txtProvider.getYear()) + 1, null, true);
  }

  decValue() {
    this.txtProvider.setYear(toNumber(this.txtProvider.getYear()) - 1, null, true);
  }
}

descriptors[TokenType.YEAR_FOUR_DIGITS] = clsYYYY;


function formatPmHours(value, txtProvider) {
  let needFormat = false;
  const amPm = find(txtProvider.descriptors,
    d => d.type === TokenType.AMPM || d.type === TokenType.AMPM_UPPER);

  if (amPm) {
    const { startIndex, maxLen } = amPm;
    const amPmString = txtProvider.getText().slice(startIndex, startIndex + maxLen);
    needFormat = amPmString.toLowerCase() === 'pm';
  }
  if (needFormat) {
    value = ((value * 1) % 12) + 12;
  }
  return value;
}
class clsh extends IDescriptor {
  constructor(provider, id, type = TokenType.HOUTR_12, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '1-Digit of 12-hour Clock';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setHours(0, false);
  }

  getValueText() {
    let h = this.txtProvider.getHours();
    if (h > 12) {
      h -= 12;
    }
    if (h === 0) {
      h = 12;
    }
    return `${h}`;
  }

  setValueText(value, autoBubble) {
    if (value * 1 === 12) {
      value = 0;
    }
    value = formatPmHours(value, this.txtProvider);

    return this.txtProvider.setHours(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
  }

  decValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
  }
}

descriptors[TokenType.HOUTR_12] = clsh;


class clshh extends IDescriptor {
  constructor(provider, id, type = TokenType.HOUTR_12_TWO_DIGITS, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '2-Digits of 12-hour Clock';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setHours(0, false);
  }

  getValueText() {
    let h = this.txtProvider.getHours();
    if (h > 12) {
      h -= 12;
    }
    if (h === 0) {
      h = 12;
    }
    if (h < 10) {
      h = `0${h}`;
    }
    return `${h}`;
  }

  setValueText(value, autoBubble) {
    value = formatPmHours(value, this.txtProvider);
    return this.txtProvider.setHours(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
  }

  decValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
  }
}

descriptors[TokenType.HOUTR_12_TWO_DIGITS] = clshh;

class clsH extends IDescriptor {
  constructor(provider, id, type = TokenType.HOUTR_24, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '1-Digit of 24-hour Clock';
    this.token = 'H';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setHours(0, false);
  }

  getValueText() {
    const h = this.txtProvider.getHours();
    return `${h}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setHours(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
  }

  decValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
  }
}

descriptors[TokenType.HOUTR_24] = clsH;


class clsHH extends IDescriptor {
  constructor(provider, id, type = TokenType.HOUTR_24_TWO_DIGITS, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '2-Digits of 24-hour Clock';
    this.token = 'HH';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setHours(0, false);
  }

  getValueText() {
    let h = this.txtProvider.getHours();
    if (h < 10) {
      h = `0${h}`;
    }
    return `${h}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setHours(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
  }

  decValue() {
    this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
  }
}

descriptors[TokenType.HOUTR_24_TWO_DIGITS] = clsHH;

class clsa extends IDescriptor {
  constructor(provider, id, type = TokenType.AMPM, maxLen) {
    super(provider, id, type, maxLen);
    this.name = 'The am/pm designator';
  }

  getValueText() {
    const calendar = Globalize.culture.calendars.standard;
    const h = this.txtProvider.getHours();
    let ds = '';
    if (h < 12) {
      /* istanbul ignore next */
      ds = calendar.AM[1] || calendar.AM[0];
    } else {
      /* istanbul ignore next */
      ds = calendar.PM[1] || calendar.PM[0];
    }
    /* istanbul ignore if */
    if (ds.length <= 0) {
      ds = ' ';
    }
    return ds;
  }

  setValueText(value) {
    let h;
    if (value.toLowerCase().indexOf('a') >= 0) {
      h = (this.txtProvider.getHours() * 1) % 12;
      this.txtProvider.setHours(h, true);
    } else if (value.toLowerCase().indexOf('p') >= 0) {
      h = ((this.txtProvider.getHours() * 1) % 12) + 12;
      this.txtProvider.setHours(h, true);
    }

    return true;
  }

  incValue() {
    const h = (this.txtProvider.getHours() + 12) % 24;
    this.txtProvider.setHours(h, true);
  }

  decValue() {
    const h = (this.txtProvider.getHours() + 12) % 24;
    this.txtProvider.setHours(h, true);
  }
}

descriptors[TokenType.AMPM] = clsa;

class clsA extends IDescriptor {
  constructor(provider, id, type = TokenType.AMPM_UPPER, maxLen) {
    super(provider, id, type, maxLen);
    this.name = 'The upper case of am/pm designator';
  }

  getValueText() {
    const calendar = Globalize.culture.calendars.standard;
    const h = this.txtProvider.getHours();
    let ds = '';
    if (h < 12) {
      /* istanbul ignore next */
      ds = calendar.AM[2] || calendar.AM[0];
    } else {
      /* istanbul ignore next */
      ds = calendar.PM[2] || calendar.PM[0];
    }
    /* istanbul ignore if */
    if (ds.length <= 0) {
      ds = ' ';
    }
    return ds;
  }

  setValueText(value) {
    let h;
    if (value.toLowerCase().indexOf('a') >= 0) {
      h = (this.txtProvider.getHours() * 1) % 12;
      this.txtProvider.setHours(h, true);
    } else if (value.toLowerCase().indexOf('p') >= 0) {
      h = ((this.txtProvider.getHours() * 1) % 12) + 12;
      this.txtProvider.setHours(h, true);
    }

    return true;
  }

  incValue() {
    const h = (this.txtProvider.getHours() + 12) % 24;
    this.txtProvider.setHours(h, true);
  }

  decValue() {
    const h = (this.txtProvider.getHours() + 12) % 24;
    this.txtProvider.setHours(h, true);
  }
}

descriptors[TokenType.AMPM_UPPER] = clsA;

class clsm extends IDescriptor {
  constructor(provider, id, type = TokenType.MINUTE, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '1-Digit of Minute';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setMinutes(0, false);
  }

  getValueText() {
    const min = this.txtProvider.getMinutes();
    return `${min}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setMinutes(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setMinutes(this.txtProvider.getMinutes() + 12, true);
  }

  decValue() {
    this.txtProvider.setMinutes(this.txtProvider.getMinutes() - 12, true);
  }
}

descriptors[TokenType.MINUTE] = clsm;

class clsmm extends IDescriptor {
  constructor(provider, id, type = TokenType.MINUTE_TWO_DIGITS, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '2-Digits of Minute';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setMinutes(0, false);
  }

  getValueText() {
    let min = this.txtProvider.getMinutes();
    if (min < 10) {
      min = `0${min}`;
    }
    return `${min}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setMinutes(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setMinutes(this.txtProvider.getMinutes() + 1, true);
  }

  decValue() {
    this.txtProvider.setMinutes(this.txtProvider.getMinutes() - 1, true);
  }
}

descriptors[TokenType.MINUTE_TWO_DIGITS] = clsmm;

class clss extends IDescriptor {
  constructor(provider, id, type = TokenType.SECOND, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '1-Digit of Second';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setSeconds(0, false);
  }

  getValueText() {
    const s = this.txtProvider.getSeconds();
    return `${s}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setSeconds(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setSeconds(this.txtProvider.getSeconds() + 12, true);
  }

  decValue() {
    this.txtProvider.setSeconds(this.txtProvider.getSeconds() - 12, true);
  }
}

descriptors[TokenType.SECOND] = clss;

class clsss extends IDescriptor {
  constructor(provider, id, type = TokenType.SECOND_TWO_DIGITS, maxLen) {
    super(provider, id, type, maxLen);
    this.name = '2-Digits of Second';
    this.allowInstanceEditing = true;
  }

  reset() {
    return this.txtProvider.setSeconds(0, false);
  }

  getValueText() {
    let s = this.txtProvider.getSeconds();
    if (s < 10) {
      s = `0${s}`;
    }
    return `${s}`;
  }

  setValueText(value, autoBubble) {
    return this.txtProvider.setSeconds(value, autoBubble);
  }

  incValue() {
    this.txtProvider.setSeconds(this.txtProvider.getSeconds() + 12, true);
  }

  decValue() {
    this.txtProvider.setSeconds(this.txtProvider.getSeconds() - 12, true);
  }
}

descriptors[TokenType.SECOND_TWO_DIGITS] = clsss;

export default descriptors;


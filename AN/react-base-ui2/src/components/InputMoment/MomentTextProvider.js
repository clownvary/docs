import moment from 'moment';
import indexOf from 'lodash/indexOf';
import filter from 'lodash/filter';
import toNumber from 'lodash/toNumber';
import isNil from 'lodash/isNil';
import Globalize from '../../services/i18n';
import { momentHelper } from '../../utils';
import ITextProvider from '../InputBase/ITextProvider';
import * as TokenType from './consts/TokenType';
import descriptors from './Descriptors';

/* eslint no-continue: 0 */
/* eslint default-case: 0 */

class MomentTextProvider extends ITextProvider {

  constructor(props) {
    super(props);

    const {
      value = null,
      format = 'd'
    } = props;

    this.value = momentHelper.createMoment(value);
    this.format = format;
    this.descriptors = [];
    this.descPositions = [];
    this.fields = [];
    this.activeFieldIndex = 0;
    this.maskPartsCount = 0;
    this.pattern = Globalize.toMomentFormat(format);
    this.build();
  }

  increment() {
    const field = this.getField();
    if (this.isValid() && field) {
      field.inc();
    }
    return true;
  }

  decrement() {
    const field = this.getField();
    if (this.isValid() && field) {
      field.dec();
    }
    return true;
  }

  isValid() {
    return momentHelper.isValid(this.value);
  }

  setValue(value) {
    this.value = momentHelper.createMoment(value);
    return true;
  }

  getValue() {
    return this.value;
  }

  setText(text) {
    const val = this.parse(text);
    this.setValue(val);
  }

  getText() {
    let s = '';

    if (!momentHelper.isValid(this.value)) {
      return s;
    }

    try {
      const positions = [];
      for (let i = 0; i < this.descriptors.length; i += 1) {
        this.descriptors[i].startIndex = s.length;
        const txt = '' || this.descriptors[i].getText();
        s += txt;
        for (let j = 0; j < txt.length; j += 1) {
          const dp = {};
          dp.desc = this.descriptors[i];
          dp.pos = j;
          dp.text = txt;
          dp.length = txt.length;
          positions.push(dp);
        }
      }
      this.descPositions = positions;
    } catch (e) {
      // do nothing
    }

    return s;
  }

  closeBlankField() {
    if (this.blankField) {
      this.blankField.close();
      this.blankField = null;
      return true;
    }

    this.blankField = null;
    return false;
  }

  clearField(index) {
    const field = this.getField(index);
    if (field && field.clear()) {
      this.blankField = field;
      return true;
    }

    this.blankField = null;
    return false;
  }

  getFieldCount() {
    return this.fields.length;
  }

  getField(index) {
    if (isNil(index)) {
      index = this.activeFieldIndex;
    }

    return this.fields[index];
  }

  getActiveFieldRange() {
    return this.getFieldRange();
  }

  getFieldRange(index) {
    const desc = this.getField(index);
    return desc ? {
      start: desc.startIndex,
      end: desc.startIndex + (momentHelper.isValid(this.value) ? desc.getText().length : 0)
    } : null;
  }

  getCursorFieldIndex(pos) {
    pos = Math.min(pos, this.descPositions.length - 1);
    pos = Math.max(pos, 0);
    let desc = this.descPositions[pos].desc;
    if (desc.type === TokenType.LITERAL) {
      const i = indexOf(this.descriptors, desc);
      let found = false;
      if (i >= 0) {
        for (let j = i - 1; j >= 0; j -= 1) {
          if (this.descriptors[j].type !== TokenType.LITERAL) {
            desc = this.descriptors[j];
            found = true;
            break;
          }
        }
        if (!found) {
          for (let j = i + 1; j < this.descriptors.length; j += 1) {
            if (this.descriptors[j].type !== TokenType.LITERAL) {
              desc = this.descriptors[j];
              found = true;
              break;
            }
          }
        }
      }

      if (!found) {
        return -1;
      }
    }
    return indexOf(this.fields, desc);
  }

  needToMove(pos, ch) {
    if (!momentHelper.isValid(this.value)) {
      return false;
    }

    const desc = this.fields[this.activeFieldIndex];
    if (pos >= desc.maxLen) { return true; }

    const val = toNumber(ch);
    if (isNaN(val)) { return false; }

    switch (desc.type) {
      case TokenType.MONTH:
      case TokenType.MONTH_TWO_DIGITS:
      case TokenType.HOUTR_12:
      case TokenType.HOUTR_12_TWO_DIGITS:
        return val > 1;

      case TokenType.HOUTR_24:
      case TokenType.HOUTR_24_TWO_DIGITS:
        return val > 2;

      case TokenType.DATE:
      case TokenType.DATE_TWO_DIGITS:
        return val > 3;

      case TokenType.MINUTE:
      case TokenType.MINUTE_TWO_DIGITS:
      case TokenType.SECOND:
      case TokenType.SECOND_TWO_DIGITS:
        return val > 6;
    }

    return false;
  }

  build() {
    this.descriptors = [];
    let curPattern = '';
    let prevCh = '';
    let literalNext = false;
    let escaped = false;

    const dumpPattern = () => {
      if (curPattern.length > 0) {
        if (!this.handlePattern(curPattern)) {
          this.descriptors.push(this.createDescriptor('literal', prevCh));
        }
        curPattern = '';
      }
    };

    for (let i = 0; i < this.pattern.length; i += 1) {
      const ch = this.pattern.charAt(i);

      if (ch === ']' && literalNext) {
        literalNext = false;
        continue;
      }

      if (escaped || literalNext) {
        this.descriptors.push(this.createDescriptor('literal', ch));
        curPattern = '';
        escaped = false;
        continue;
      }

      if (ch === '\\') {
        escaped = true;
        dumpPattern();
        continue;
      }

      if (ch === '[') {
        literalNext = true;
        dumpPattern();
        continue;
      }

      if (i === 0) {
        prevCh = ch;
      }
      if (prevCh !== ch && curPattern.length > 0) {
        if (!this.handlePattern(curPattern)) {
          this.descriptors.push(this.createDescriptor('literal', prevCh));
        }
        curPattern = '';
      }
      curPattern += ch;
      prevCh = ch;
    }

    dumpPattern();

    this.fields = filter(this.descriptors, d => d.type !== TokenType.LITERAL);
  }

  set(name, value, autoBubble = false) {
    try {
      value = toNumber(value);
      if (isNaN(value)) {
        return false;
      }

      if (name === 'month') {
        value -= 1;
      }

      if (!autoBubble) {
        if (name === 'month') {
          if (value > 11 || value < 0) {
            value = 0;
          }
        }

        if (name === 'date') {
          if (value > this.value.daysInMonth() || value < 1) {
            value = 1;
          }
        }

        if (name === 'day') {
          if (value > 6) {
            value = 0;
          }
        }

        if (name === 'hour') {
          if (value > 23) {
            value = 0;
          }
        }

        if (name === 'minute' || name === 'second') {
          if (value > 59) {
            value = 0;
          }
        }
      }

      const newValue = moment(this.value);
      newValue.set(name, value);

      if (momentHelper.isValid(newValue)) {
        this.setValue(newValue);
        return true;
      }
    } catch (e) {
      // do nothing
    }
    return false;
  }

  setYear(year) {
    return this.set('year', year, false);
  }

  setMonth(month, autoBubble = true) {
    return this.set('month', month, autoBubble);
  }

  setDateOfMonth(date, autoBubble) {
    return this.set('date', date, autoBubble);
  }

  setHours(hour, autoBubble) {
    return this.set('hour', hour, autoBubble);
  }

  setMinutes(minute, autoBubble) {
    return this.set('minute', minute, autoBubble);
  }

  setSeconds(second, autoBubble) {
    return this.set('second', second, autoBubble);
  }

  setDayOfWeek(day, autoBubble) {
    return this.set('day', day, autoBubble);
  }

  getYear() {
    try {
      let year = this.value.year();
      year = `${year}`;
      while (year.length < 4) {
        year = `0${year}`;
      }
      return `${year}`;
    } catch (e) {
      // do nothing
    }
    return '';
  }

  getMonth() {
    return this.value.month() + 1;
  }

  getDateOfMonth() {
    return this.value.date();
  }

  getDayOfWeek() {
    return this.value.day();
  }

  getHours() {
    return this.value.hour();
  }

  getMinutes() {
    return this.value.minute();
  }

  getSeconds() {
    return this.value.second();
  }

  handlePattern(p) {
    let reg = /Y{4}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.YEAR_FOUR_DIGITS));
      return true;
    }
    reg = /Y{2,2}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.YEAR_TWO_DIGITS));
      return true;
    }
    reg = /Y{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.YEAR));
      return true;
    }
    reg = /d{4,4}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.DAY_LONG_NAME));
      return true;
    }
    reg = /d{3,3}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.DAY_SHORT_NAME));
      return true;
    }
    reg = /D{2,2}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.DATE_TWO_DIGITS));
      return true;
    }
    reg = /D{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.DATE));
      return true;
    }
    reg = /M{4,4}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.MONTH_LONG_NAME));
      return true;
    }
    reg = /M{3,3}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.MONTH_SHORT_NAME));
      return true;
    }
    reg = /M{2,2}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.MONTH_TWO_DIGITS));
      return true;
    }
    reg = /M{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.MONTH));
      return true;
    }
    reg = /h{2,2}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.HOUTR_12_TWO_DIGITS));
      return true;
    }
    reg = /h{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.HOUTR_12));
      return true;
    }
    reg = /H{2,2}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.HOUTR_24_TWO_DIGITS));
      return true;
    }
    reg = /H{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.HOUTR_24));
      return true;
    }
    reg = /m{2,2}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.MINUTE_TWO_DIGITS));
      return true;
    }
    reg = /m{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.MINUTE));
      return true;
    }
    reg = /s{2,2}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.SECOND_TWO_DIGITS));
      return true;
    }
    reg = /s{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.SECOND));
      return true;
    }
    reg = /a{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.AMPM));
      return true;
    }
    reg = /A{1,1}/;
    if (reg.test(p)) {
      this.descriptors.push(this.createDescriptor(TokenType.AMPM_UPPER));
      return true;
    }
    return false;
  }

  createDescriptor(token, literal) {
    let desc = null;
    const id = this.maskPartsCount;
    this.maskPartsCount += 1;

    const DescriptorClass = descriptors[token];
    if (DescriptorClass) {
      desc = new DescriptorClass(this, id);
      if (literal) {
        desc.literal = literal;
      }
    }

    return desc;
  }


  parse(str) {
    let pattern = this.pattern || Globalize.ANDateTimeFormat;

    let m = null;
    if (pattern.indexOf('MMM') !== -1 || pattern.indexOf('MMMM') !== -1) {
      m = moment(str);
      if (m.isValid()) {
        return m;
      }
    }

    const patterns = [];
    const template = [];

    pattern = pattern.replace('DD', 'D');
    pattern = pattern.replace('A', 'a');
    pattern = pattern.replace(/d{2,4}\/*/g, '');

    if (pattern.indexOf('MMM') !== -1 || pattern.indexOf('MMMM') !== -1) {
      template.push(pattern);
      template.push(pattern.replace('MM', 'M'));
    } else {
      template.push(pattern);
    }


    template.forEach((p) => {
      patterns.push(p);

      const patchSep = (pt) => {
        const sep = '/';
        if (pt.indexOf(sep) !== -1) {
          patterns.push(pt.replace(new RegExp(sep, 'g'), '-'));
          patterns.push(pt.replace(new RegExp(sep, 'g'), '.'));
        }
      };

      patchSep(p);
      if (p.indexOf('YYYY') !== -1) {
        p = p.replace('YYYY', 'YY');
        patterns.push(p);
        patchSep(p);
      }
    });

    m = moment(str, patterns);

    if (!m.isValid()) {
      m = Globalize.getToday();
    }

    return m;
  }

  removeLiterals(s) {
    const reg = /[\s|+|\-|.|:|()=]/g;
    return s.replace(reg, '');
  }

  getFirstDelimiterPos(a, b) {
    let i = 0;
    let j = 0;
    while (i < b.length && j < a.length) {
      const ch1 = b.charAt(i);
      const ch2 = a.charAt(j);
      if (ch1 === ch2) {
        j += 1;
      } else {
        return j - 1;
      }
      i += 1;
    }
    return a.length - 1;
  }

  findAlikeArrayItemIndex(arr, txt) {
    let index = -1;
    let pos = 99999;
    for (let i = 0; i < arr.length; i += 1) {
      const k = arr[i].toLowerCase().indexOf(txt.toLowerCase());
      if (k !== -1 && k < pos) {
        pos = k;
        index = i;
      }
    }
    return index;
  }

  isFieldGap(input) {
    if (this.activeFieldIndex < this.descriptors.length) {
      const desc = this.descriptors[this.activeFieldIndex];
      return (desc.type === TokenType.LITERAL && input === desc.literal);
    }

    return false;
  }

  setActiveField(index) {
    index = Math.min(index, this.getFieldCount() - 1);
    index = Math.max(index, 0);
    if (this.activeFieldIndex !== index) {
      this.activeFieldIndex = index;
      return true;
    }
    return false;
  }
}

export default MomentTextProvider;

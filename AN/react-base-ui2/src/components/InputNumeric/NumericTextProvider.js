
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';
import { Globalize } from '../../services/i18n';
import * as charValidator from '../../utils/charValidator';
import InputResult from '../InputBase/InputResult';
import ITextProvider from '../InputBase/ITextProvider';
import * as NumericType from '../../consts/NumericType';
import NumericHelper from '../../utils/NumericHelper';

const MAX_LENGTH = 10;

class NumericTextProvider extends ITextProvider {
  constructor(props) {
    super(props);

    const {
      type = NumericType.DECIMAL,
      showGroup = true,
      decimals = 2,
      min,
      max
    } = props;

    this.type = type;
    this.showGroup = showGroup;
    this.decimals = decimals;
    this.min = min * 1;
    this.max = max * 1;

    this.valueInString = '';
    this.currentText = '';
  }

  updateRange(min, max) {
    this.min = min * 1;
    this.max = max * 1;
  }

  updateCultureContext() {
    this.cultureContext = Globalize.getNumericCultureContext(this.type);

      // consider decimal definition in culture
      // <=-2:  culture decimals
      // -1:    as it is
      // >=0:   custom
    if (this.decimals >= -1) {
      this.cultureContext.decimals = this.decimals;
    }

    if (!this.showGroup) {
      this.cultureContext.groupSizes = [0];
    }
  }

  getCultureContext() {
    if (!this.cultureContext) {
      this.updateCultureContext();
    }

    return this.cultureContext;
  }

  isValid() {
    return isString(this.valueInString) && this.valueInString;
  }

  isNegative() {
    return NumericHelper.isNegative(this.valueInString);
  }

  isZero(value) {
    try {
      value = isNil(value) ? this.valueInString : value;
      return this.safeParse(value) === 0;
    } catch (e) {
      // do nothing
    }
    return false;
  }

  getDecimalPos() {
    const cc = this.getCultureContext();
    return NumericHelper.getDecimalPos(this.currentText, cc);
  }

  invertSign() {
    const neg = this.isNegative();
    let textValue = this.valueInString || '0';
    textValue = neg ? textValue.replace(/[-()]/g, '') : `-${textValue}`;

    if (this.isZero(textValue)) {
      textValue = neg ? '0' : '-0';
    }
    return this.format(textValue * 1);
  }

  toPositive() {
    if (this.isNegative() || this.isBlank) {
      this.invertSign();
      return true;
    }

    return false;
  }

  stepTo(step) {
    try {
      const value = this.getValue();
      let newValue = value + step;

      let decimals = this.getCultureContext().decimals;
      decimals = decimals < 0 ? 8 : decimals;
      newValue = newValue.toFixed(decimals);
      return this.format(newValue * 1, true);
    } catch (e) {
      // do nothing
    }

    return false;
  }

  increment(step = 1) {
    return this.stepTo(step);
  }

  decrement(step = 1) {
    return this.stepTo(step * -1);
  }

  insertAt(input, position, rh = new InputResult()) {
    const cc = this.getCultureContext();
    if (input.length > 1) {
      input = NumericHelper.stripSymbols(input, cc);
    }

    position = this.getInputablePos(position);
    const text = this.currentText;
    const isBlank = this.isBlank;
    /* istanbul ignore next */
    const slicePos = position > text.length ? text.length - 1 : position;
    let head = text.substring(0, slicePos);

    if (!isBlank) {
      // Can't insert at the end with fixed decimals
      if (cc.decimals > 0 && text === head) {
        return false;
      }

      const decimalPos = this.getDecimalPos();
      const textInteger = NumericHelper.stripSymbols(text.substring(0, decimalPos));
      if (position <= decimalPos && textInteger.length >= MAX_LENGTH) {
        return false;
      }
    }

    rh.testPosition = head.length + input.length;
    if (head.indexOf(cc.decimalSep) === -1 && this.isZero(head)) {
      head = head.replace(/[0]/g, '');
      rh.testPosition = head.length + input.length;
    }
    const tail = text.substring(slicePos, text.length);
    const nextText = head + input + tail;
    this.parse(nextText);

    // reset cursor to decimal
    if (isBlank && !this.isBlank) {
      rh.testPosition = this.getDecimalPos();
    }

    try {
      if (input.length === 1) {
        if (this.showGroup) {
          head += input;
          const newHead = this.currentText.substring(0, rh.testPosition);

          const r = new RegExp(`${cc.groupSep}`, 'gi');
          const l1 = (head.match(r) || []).length;
          const l2 = (newHead.match(r) || []).length;

          if (l1 !== l2) {
            rh.testPosition += 1;
          }
        }
      }
    } catch (e) {
      // do nothing
    }

    return true;
  }

  remove(start, end, rh) {
    const replacing = !rh;
    rh = rh || new InputResult();
    const cc = this.getCultureContext();
    rh.testPosition = start;
    try {
      if (start === end && start === this.getDecimalPos()) {
        return false;
      }

      const text = this.currentText;
      const head = text.slice(0, start);
      const tail = text.slice(end + 1);
      const nextText = head + tail;
      this.parse(replacing ? (nextText || '0') : nextText);

      const n = NumericHelper.stripSymbols(nextText, cc);
      if (n === '' || n.indexOf('.') === 0) {
        if (replacing) {
          // force next inputing starting before decimal point
          this.isBlank = true;
        } else {
          rh.testPosition = this.getDecimalPos();
        }
      }

      if (replacing && this.isZero(nextText)) {
        // force next inputing starting before decimal point
        this.isBlank = true;
      }

      if (start === end && this.showGroup) {
        try {
          const groupSep = cc.groupSep;
          const newBegText = this.currentText.substring(0, start);
          if (this.countSeperator(newBegText, groupSep)
            !== this.countSeperator(nextText, groupSep)) {
            rh.testPosition -= 1;
            if (text.indexOf(cc.currencySymbol) === rh.testPosition ||
              text.indexOf(cc.percentSymbol) === rh.testPosition) {
              rh.testPosition += 1;
            }
          }
        } catch (e1) {
          // do nothing
        }
      }
    } catch (e2) {
      // do nothing
    }
    return true;
  }

  getValue() {
    if (this.isBlank) {
      return null;
    }
    return this.valueInString ? this.valueInString * 1 : null;
  }

  setValue(value) {
    return this.format(value);
  }

  getText() {
    const text = this.isBlank ? '' : this.currentText;
    return this.isValid() ? text : '';
  }

  setText(text) {
    this.parse(text);
  }

  safeParse(value) {
    if (value === null) { return 0; }

    const cc = this.getCultureContext();
    value = NumericHelper.stripSymbols(value, cc);

    try {
      value = parseFloat(value);
      if (isNaN(value)) {
        value = 0;
      }
    } catch (e) {
      value = 0;
    }

    return value;
  }

  countSeperator(text, sep) {
    let c = 0;
    let pos = text.indexOf(sep);
    while (pos !== -1) {
      c += 1;
      pos = text.indexOf(sep, pos + 1);
    }
    return c;
  }

  getInputablePos(position) {
    const text = this.currentText;
    position = Math.min(position, text.length);

    if (this.isBlank) {
      return this.getDecimalPos();
    }

    const cc = this.getCultureContext();
    while (position < text.length) {
      const ch = text.charAt(position);
      if (!charValidator.isDigit(ch) &&
        ch !== cc.groupSep &&
        ch !== cc.decimalSep) {
        position += 1;
      } else {
        break;
      }
    }

    return position;
  }

  // parse string value
  parse(value) {
    const txtValue = `${value}`;
    try {
      if (txtValue.trim().length === 0) {
        this.format(0);
        return true;
      }

      const parsedValue = Globalize.parseNumeric(txtValue, this.type);
      return this.format(parsedValue);
    } catch (e) {
      // do nothing
    }

    return false;
  }

  // Parameter value is a Number
  internalFormat(value) {
    if (isNil(value)) return { value: '0', text: '' };

    const cc = this.getCultureContext();
    const txtValue = NumericHelper.toFixedString(value, cc.decimals, false);
    const text = Globalize.formatNumeric(value, this.type, false, cc);

    return { value: txtValue, text };
  }

  // Format a value
  format(value, checkRange = false) {
    let updateOnly = false;
    if (isNil(value)) {
      value = this.valueInString ? this.valueInString * 1 : 0;
      updateOnly = true;
    }

    if (checkRange) {
      if (value < this.min || value > this.max) {
        return false;
      }
    }

    const { value: valueInString, text } = this.internalFormat(value);
    this.valueInString = valueInString;
    this.currentText = text;

    if (!updateOnly) {
      this.isBlank = false;
    }

    return true;
  }
}

export default NumericTextProvider;


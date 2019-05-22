
import PropTypes from 'prop-types';
import identity from 'lodash/identity';
import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import toString from 'lodash/toString';
import map from 'lodash/map';
import { InputBase, InputBaseProps } from '../InputBase';
import NumericTextProvider from './NumericTextProvider';
import * as NumericType from '../../consts/NumericType';
import Browser from '../../utils/browser';
import { isDigit } from '../../utils/charValidator';
import { DefaultCSSPrefix } from '../../consts';

const { bool, string, number, oneOfType, func } = PropTypes;
export const NUM_MIN = -9999999999.99;
export const NUM_MAX = 9999999999.99;

/* eslint no-continue: 0 */
/* eslint default-case: 0 */

/** Default PropTypes of InputNumeric.
 * @memberof InputNumeric
 * @augments InputBase
*/
const InputNumericPropTypes = {
  /** The type of the InputNumeric.
   * @type {NumericType}
  */
  type: string,
  /** The current value.
   * @type {string|number|boolean}
  */
  value: oneOfType([string, number, bool]),
  /** Determines the minimal value that can be entered.
   * @type {number}
  */
  min: number,
  /** Determines the maximum value that can be entered.
   * @type {number}
  */
  max: number,
  /** Indicates whether the thousands group separator will be inserted between  each digital group.
   * (number of digits in thousands group depends on the selected Culture)
   * @type {boolean}
  */
  showGroup: bool,
  /** Indicates the custom setting for decimal places to display.
   * @type {number}
  */
  decimals: number,
  /** Determines how much to increase/decrease the input field.
   * @type {number}
  */
  increment: number,
  /** Allow increment or decrement by typing the up or down keys.
   * @type {boolean}
  */
  allowKeySpin: bool,
  /** Determines the left or right alignment of text.
   * @type {string}
  */
  textAlign: string,
  /** A function called when the value of the input is changed.
   * @type {func}
  */
  onValueChange: func,
  /** Determines whether blank text is displayed after selecting all and pressing delete.
   * @type {boolean}
  */
  allowBlank: bool,
  listClass: string
};

/** Default Props for InputNumeric class */
const InputNumericProps = {
  ...InputBaseProps,
  type: NumericType.NUMBER,
  value: null,
  min: NUM_MIN,
  max: NUM_MAX,
  showGroup: false,
  decimals: 2,
  increment: 1,
  allowKeySpin: true,
  textAlign: 'right',
  onValueChange: identity,
  allowBlank: true,
  listClass: 'input-numeric-list'
};

/** InputNumeric component allows you to input numeric values only.
 *
 * InputNumeric has 3 types of style: they are: 'number', 'currency' and 'percent'.
 *
 * This can be determined by changing the type prop.
 */
class InputNumeric extends InputBase {
  static displayName = 'InputNumeric';
  static propTypes = InputNumericPropTypes;
  static defaultProps = InputNumericProps;

  componentDidMount() {
    this.silence = true;
    super.componentDidMount();

    Object.defineProperties(this, {
      value: {
        get() {
          /* istanbul ignore next */
          return this.textProvider ? this.getValue() : this.input.value;
        },
        set(v) {
          this.setValue(v);
        }
      }
    });

    const {
      value
    } = this.props;

    if (!isNil(value)) {
      this.setValue(value);
    }

    this.updateWCAG();
    this.silence = false;
  }

  createTextProvider() {
    const tp = new NumericTextProvider(this.props);
    const { value } = this.props;
    if (isNil(value)) {
      tp.isBlank = true;
    }

    return tp;
  }

  updateCultureContext(propName, propValue) {
    const value = this.getValue();
    if (propName) {
      this.textProvider[propName] = propValue;
    }
    this.textProvider.updateCultureContext();
    this.setValue(value, true);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (nextProps.min !== this.props.min || nextProps.max !== this.props.max) {
      this.updateRange(nextProps.min, nextProps.max);
    }

    if (nextProps.decimals !== this.props.decimals) {
      this.updateCultureContext('decimals', nextProps.decimals);
    }

    if (nextProps.showGroup !== this.props.showGroup) {
      this.updateCultureContext('showGroup', nextProps.showGroup);
    }

    if (nextProps.locale !== this.props.locale) {
      this.updateCultureContext();
    }

    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value);
    } else {
      const currentValue = this.textProvider.getValue();
      /* istanbul ignore else */
      if (isNumber(currentValue)) {
        /* istanbul ignore else */
        if ((isNumber(nextProps.min) && currentValue < nextProps.min) ||
          (isNumber(nextProps.max) && currentValue > nextProps.max)) {
          this.setValue(currentValue);
        }
      }
    }
  }

  updateWCAG() {
    /* istanbul ignore next */
    let {
      min = NUM_MIN,
      max = NUM_MAX
    } = this.props;

    // in case string is passed
    min *= 1;
    max *= 1;

    this.input.setAttribute('aria-valuemin', min);
    this.input.setAttribute('aria-valuemax', max);
    this.input.setAttribute('aria-valuenow', this.textProvider.getValue());
  }

  componentDidUpdate() {
    this.updateWCAG();
  }

  isDegradeMode() {
    return Browser.android;
  }

  getContainerClassName() {
    return `${DefaultCSSPrefix}-input-numeric`;
  }

  onKeyPressPreview(ch) {
    const tp = this.textProvider;
    const cc = tp.getCultureContext();
    const decSep = cc.decimalSep;
    const isBlank = tp.isBlank;
    let txt;
    let decPos;
    let curPos;

    /* istanbul ignore if */
    if (this.isDegradeMode()) {
      if (ch && ch.length === 1) {
        if (isDigit(ch) ||
          ch === '.' ||
          ch === decSep ||
          ch === cc.percentSymbol ||
          ch === cc.currencySymbol ||
          ch === '+' ||
          ch === '-') {
          return false;
        }
      }

      return true;
    }

    switch (ch) {
      case cc.percentSymbol:
      case cc.currencySymbol:
        return true;

      case '.':
      case decSep:
        if (!isBlank) {
          txt = tp.getText();
          decPos = txt.indexOf(decSep) + 1;
          curPos = txt.length;
          if (this.selection.start !== this.selection.end || this.selection.start !== decPos) {
              // This is selection or cursor not behind the decimal point
            curPos = decPos;
          } else {
              // Invers the cursor before the decimal point
            curPos = decPos - 1;
          }

          this.select({ start: curPos, end: curPos });
        }
        return true;
      case '+':
        if (!tp.isZero() && !isBlank) {
          if (tp.toPositive()) {
            curPos = Math.max(0, this.selection.start - 1);
            super.updateText({ start: curPos, end: curPos });
          }
        }
        return true;
      case '-':
      case '(':
      case ')':
        if (!tp.isZero() && !isBlank) {
          tp.invertSign();
          if (tp.isNegative()) {
            curPos = this.selection.start + 1;
          } else {
            curPos = Math.max(0, this.selection.start - 1);
          }
          super.updateText({ start: curPos, end: curPos });
        }
        return true;
      default:
        break;
    }

    if (ch && ch.length === 1 && !isDigit(ch)) {
      return true;
    }

    return false;
  }

  forceToRange() {
    let { min, max } = this.props;
    min *= 1;
    max *= 1;

    const value = this.getValue();
    if (value < min) {
      this.setValue(min);
    } else if (value > max) {
      this.setValue(max);
    }
  }

  onInputBlur(e) {
    this.syncText();
    this.forceToRange();
    e.value = this.getValue();
    super.onInputBlur(e);
  }

  onIMEBreakThrough() {
    const selection = this.getSelection();
    const isBlank = this.isBlank();
    this.syncText();
    if (isBlank) {
      this.resetCursor();
    } else {
      this.select(selection);
    }
  }

  getDecimalPos() {
    let decimal = this.input.value.indexOf('.');
    if (decimal === -1) {
      decimal = this.input.value.length;
    }

    return decimal;
  }

  resetCursor() {
    const decimal = this.getDecimalPos();
    const selRange = { start: decimal, end: decimal };
    this.select(selRange);
  }

  deleteSelection(backSpace) {
    if (!this.allowEdit()) { return; }

    const isSelectAll = this.isSelectAll();
    const { allowBlank } = this.props;
    if (isSelectAll && allowBlank) {
      this.textProvider.setText('');
      this.textProvider.isBlank = true;
      this.updateText();
      return;
    }

    super.deleteSelection(backSpace);

    if (isSelectAll) {
      this.resetCursor();
    }
  }

  onTextChange() {
    this.onValueChange();
  }

  onValueChange() {
    const { min, max } = this.props;

    const val = this.getValue();
    if (toString(val) !== toString(this.preValue)) {
      this.preValue = val;
      this.input.setAttribute('aria-valuenow', val);
      const outOfRange = val < min * 1 || val > max * 1;

      this.triggerEvent('onValueChange', {
        value: val,
        outOfRange
      });

      this.setState({
        stateClassName: outOfRange ? 'state-out-of-range' : ''
      });
    }
  }

  getValue() {
    const tp = this.textProvider;
    let value = tp.getValue();
    const { type } = this.props;
    if (type === NumericType.PERCENT) {
      value = this.fromPercentValue(value);
    }

    return value;
  }

  toPercentValue(value) {
    value *= 100;
    return value.toFixed(2) * 1;
  }

  fromPercentValue(value) {
    value /= 100;
    const cc = this.textProvider.getCultureContext();
    if (cc.decimals >= 0) {
      const txtValue = value.toFixed(cc.decimals + 2);
      value = txtValue * 1;
    }
    return value;
  }

  setValue(value, force = false) {
    try {
      if (isBoolean(value)) {
        value = value ? 1 : 0;
      } else if (isString(value)) {
        value = this.textProvider.safeParse(value);
      }

      const { type } = this.props;
      if (type === NumericType.PERCENT) {
        value = this.toPercentValue(value);
      }

      value *= 1;
      const txtValue = `${value}`;

      if (value === this.textProvider.getValue() && !force) {
        return true;
      }

      if (this.textProvider.setValue(value)) {
        this.updateText();
      } else {
        this.setText(txtValue);
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  updateRange(min = NUM_MIN, max = NUM_MAX) {
    /* istanbul ignore else */
    if (this.textProvider) {
      this.textProvider.updateRange(min, max);

      const val = this.getValue();
      const outOfRange = val < min * 1 || val > max * 1;
      this.setState({
        stateClassName: outOfRange ? 'state-out-of-range' : ''
      });
    }
  }

  isBlank() {
    return this.textProvider && this.textProvider.isBlank;
  }

  doSpin(up = false) {
    if (this.isBlank()) {
      return;
    }

    /* istanbul ignore next */
    const { increment = 1 } = this.props;
    const step = Math.max(1, increment);
    /* istanbul ignore else */
    if (this.textProvider[up ? 'increment' : 'decrement'](step)) {
      this.updateText();
      this.resetCursor();
    }
  }

  createListItems(items) {
    const tp = this.textProvider;
    const { type } = this.props;
    /* istanbul ignore next */
    const listItems = map(items, (value, index) => {
      value *= 1;
      let percentValue = value;
      if (type === NumericType.PERCENT) {
        percentValue = this.toPercentValue(percentValue);
      }

      return {
        text: tp.internalFormat(percentValue).text,
        value,
        index
      };
    }) || [];

    return listItems;
  }

  onListSelected(indexes) {
    if (isEmpty(this.listItems) || isEmpty(indexes)) {
      return;
    }

    const i = indexes[0];
    if (i >= 0) {
      const item = this.listItems[i];
      if (item) {
        this.textProvider.isBlank = false;
        this.setValue(item.value);
      }
    }
  }

  findInList() {
    if (isEmpty(this.listItems)) {
      return [-1];
    }

    const value = this.getValue();
    const index = findIndex(this.listItems, item => item.value === value);
    return [index];
  }
}

export {
  InputNumericProps
};

/**
 * @react-component
 */
export default InputNumeric;

import moment from 'moment';
import PropTypes, { bool, string, number, func } from 'prop-types';
import isString from 'lodash/isString';
import identity from 'lodash/identity';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import debounce from 'lodash/debounce';
import { InputBase, InputBaseProps } from '../InputBase';
import { momentHelper } from '../../utils';
import MomentTextProvider from './MomentTextProvider';
import { Calendar } from '../Calendar';
import { DefaultCSSPrefix, KeyCode } from '../../consts';
import { confirm } from '../../services/dialog';
import { Globalize } from '../../services/i18n';

/* eslint no-continue: 0 */
/* eslint default-case: 0 */

/** Default PropTypes of InputMoment.
 * @memberof InputMoment
*/
const InputMomentPropTypes = {
  /**
   * Gets or sets the date value for a date input.
  */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date),
    string
  ]),
  /**
   * Determines the minimal date that can be entered.
  */
  min: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date)
  ]),
  /**
   * Determines the maximum date that can be entered.
  */
  max: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date)
  ]),
  /** The format pattern to display the date value.
   *
   * InputMoment supports two types of formats: Standard Format and Custom Format.
   *
   * A standard date and time format string uses a single format specifier to
   *  define the text representation of a date and time value.
   *
   *  Possible values for Standard Format are:
   *
   *  - "d": ShortDatePattern  M/D/YYYY
   *  - "D": LongDatePattern  dddd, MMMM DD, YYYY
   *  - "f": Full date and time (long date and short time)  dddd, MMMM DD, YYYY h:mm A
   *  - "F": Full date and time (long date and long time) dddd, MMMM DD, YYYY h:mm:ss A
   *  - "g": General (short date and short time) M/d/YYYY h:mm A
   *  - "G": General (short date and long time) M/d/YYYY h:mm:ss A
   *  - "m": month/day pattern MMMM DD
   *  - "M": month/day pattern MMMM DD
   *  - "s": sortable format that does not vary by culture
   *  -      YYYY\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss
   *  - "t": short time pattern h:mm A
   *  - "T": long time pattern h:mm:ss A
   *  - "u": Universal Sortable DateTime Pattern, same to s
   *  - "U": Full date and time (long date and long time) using universal time
   *  -    same to F
   *  - "y": month/year pattern YYYY MMMM
   *  - "Y": month/year pattern YYYY MMMM
   *
   *  Any date and time format string that contains more than one character, including white space,
   *  is interpreted as a custom date and time format string. For example:
   *  "mmm-DD-YYYY", "mmmm d, YYYY", "mm/DD/YYYY", "d-mmm-YYYY", "ddd, mmmm DD, YYYY" etc.
   *
   *  Below are the custom date and time format specifiers:
   *
   *  - "D": The day of the month, from 1 through 31.
   *  - "DD": The day of the month, from 01 through 31.
   *  - "ddd": The abbreviated name of the day of the week.
   *  - "dddd": The full name of the day of the week.
   *  - "m": The minute, from 0 through 59.
   *  - "mm": The minute, from 00 through 59.
   *  - "M": The month, from 1 through 12.
   *  - "MM": The month, from 01 through 12.
   *  - "MMM": The abbreviated name of the month.
   *  - "MMMM": The full name of the month.
   *  - "Y": The year, from 0 to 99.
   *  - "YY": The year, from 00 to 99
   *  - "YYYY": The year as a four-digit number
   *  - "h": The hour, using a 12-hour clock from 1 to 12.
   *  - "hh": The hour, using a 12-hour clock from 01 to 12.
   *  - "H": The hour, using a 24-hour clock from 0 to 23.
   *  - "HH": The hour, using a 24-hour clock from 00 to 23.
   *  - "s": The second, from 0 through 59.
   *  - "ss": The second, from 00 through 59.
   *  - "a": The am/pm designator.
   *  - "A": The AM/PM designator.
   * @type {string}
  */
  format: string,
  /**
   * Allow spinning value by up/down key.
  */
  allowKeySpin: bool,
  /**
   * Make the popup calender auto resize to input width
   */
  flexibleCalendar: bool,
  /**
   * Icon class name for the 1st trigger button.
  */
  triggerIcon: string,
  /**
   * Icon class name for the 1st trigger button in toggle state.
  */
  triggerIconToggle: string,
  /**
   * Icon class name for the 2nd trigger button.
  */
  triggerIcon2: string,
  /**
   * Icon class name for the 2nd trigger button in toggle state.
  */
  triggerIconToggle2: string,
  /**
   * Step in minutes when generating the time picker list.
  */
  timeStep: number,
  /**
   * Callback function that will be called when the calendar is dropdown.
  */
  onCalendarOpen: func,
  /**
   * Callback function that will be called when the calendar is closed.
  */
  onCalendarClose: func,
  /**
   * The onValueChange event handler.A function called when the value of the input is changed.
  */
  onValueChange: func
};

/** Default Props for InputMoment */
export const InputMomentProps = {
  ...InputBaseProps,
  value: null,
  min: undefined,
  max: undefined,
  format: 'd',
  allowKeySpin: true,
  flexibleCalendar: false,
  triggerIcon: 'icon-calendar-m',
  triggerIconToggle: '',
  triggerIcon2: 'icon-clock-m',
  triggerIconToggle2: '',
  timeStep: 30,
  onCalendarOpen: identity,
  onCalendarClose: identity,
  onValueChange: identity
};

/** InputMoment component allows you validate and enter manually date and time. */
class InputMoment extends InputBase {
  static displayName = 'InputMoment';
  static defaultProps = InputMomentProps;
  static propTypes = InputMomentPropTypes;

  constructor(props) {
    super(props);

    const { value } = this.props;
    this.defaultValue = this.preMoment = momentHelper.createMoment(value);
    this.debouncedOnStopTyping = debounce(this.onStopTyping, 2000);
  }

  componentDidMount() {
    super.componentDidMount();
    this.resetTimeStamp();

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

    Object.defineProperties(this, {
      text: {
        get() {
          /* istanbul ignore next */
          return this.textProvider ? this.textProvider.getText() : this.input.value;
        },
        set(v) {
          this.setText(v);
        }
      }
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    super.componentWillReceiveProps(nextProps, nextContext);

    const {
      value: prevValue,
      timeStep: prevTimeStep,
      min: prevMin,
      max: prevMax,
      format: preFormat
    } = this.props;

    const {
      value: nextValue,
      timeStep: nextTimeStep,
      min: nextMin,
      max: nextMax,
      format: nextFormat
    } = nextProps;

    if (nextValue !== prevValue && !momentHelper.isSame(nextValue, prevValue)) {
      this.setValue(nextValue, false);
      this.needCheckRange = true;
    }

    if (!momentHelper.isSame(nextMin, prevMin) ||
        !momentHelper.isSame(nextMax, prevMax)) {
      this.needCheckRange = true;
    }

    if (preFormat !== nextFormat) {
      const value = this.textProvider.getValue();
      this.textProvider = new MomentTextProvider(nextProps);
      this.setValue(value);
    }

    if (nextTimeStep !== prevTimeStep) {
      this.listItems = this.createListItems();
    }
  }

  componentDidUpdate() {
    if (this.needCheckRange) {
      this.forceToRange(true);
    }

    this.needCheckRange = false;
    this.preMoment = momentHelper.createMoment(this.props.value);
  }

  createTextProvider() {
    return new MomentTextProvider(this.props);
  }

  getContainerClassName() {
    return `${DefaultCSSPrefix}-input-moment`;
  }

  isBlank() {
    return this.getValue() === null;
  }

  onClear() {
    const { allowBlank } = this.props;
    if (allowBlank) {
      this.setValue(null);
    }
  }

  onInputClick(e) {
    super.onInputClick(e);
    this.highLightCursor();
  }

  getValue() {
    return this.textProvider.getValue();
  }

  setValue(value, withEvent = true) {
    if (isString(value)) {
      this.textProvider.setText(value);
    } else {
      this.textProvider.setValue(value);
    }

    this.updateText();
    this.highLightField();
    this.onValueChange(withEvent);
  }

  resetTimeStamp() {
    this.cursorPos = 0;
    this.timeStamp = new Date('1900/1/1');
  }

  highLightField(index) {
    if (isUndefined(index)) {
      index = this.textProvider.activeFieldIndex;
    }

    if (index < 0) { return; }

    if (this.isFocused()) {
      const range = this.textProvider.getFieldRange(index);
      /* istanbul ignore else */
      if (range) {
        window.setTimeout(() => {
          this.select(range);
        });
      }
    }
  }

  highLightCursor(pos) {
    if (!this.allowEdit() || !this.textProvider.isValid()) {
      return;
    }

    if (pos === undefined) {
      const selRange = this.getSelection();
      pos = Math.max(0, selRange.start);
    }

    const index = this.textProvider.getCursorFieldIndex(pos);
    /* istanbul ignore if */
    if (index < 0) { return; }
    this.setActiveField(index);
    this.highLightField(index);
  }

  onMouseUp(e) {
    super.onMouseUp(e);
    if (this.isFocused() && !this.isSelectAll()) {
      const prevSelection = this.selection;
      const selRange = this.getSelection();

      if (
        (selRange.start !== selRange.end) &&
        (
          (prevSelection.start !== selRange.start) ||
          (prevSelection.end !== selRange.end)
        )
      ) {
        this.selection = selRange;
        this.highLightCursor();
      }
    }
  }

  setActiveField(index) {
    if (this.textProvider.isValid() && this.textProvider.setActiveField(index)) {
      this.onStopTyping();
      this.resetTimeStamp();
    }
  }

  toNextField() {
    this.setActiveField(this.textProvider.activeFieldIndex + 1);
  }

  toPrevField() {
    this.setActiveField(this.textProvider.activeFieldIndex - 1);
  }

  toFirstField() {
    this.setActiveField(0);
  }

  toLastField() {
    this.setActiveField(this.textProvider.getFieldCount());
  }

  doSpin(up = false) {
    /* istanbul ignore else */
    if (this.textProvider[up ? 'increment' : 'decrement']()) {
      this.updateText();
      this.highLightField();
      this.onValueChange();
    }
  }

  onInputFocus(e) {
    if (!this.allowEdit()) {
      return;
    }

    this.imeMode = false;
    window.setTimeout(() => {
      this.highLightCursor();
      this.resetTimeStamp();
    }, 10);

    super.onInputFocus(e);
  }

  doBlur() {
    this.silence = true;
    this.onStopTyping();
    this.silence = false;

    this.forceToRange();
    this.imeMode = false;
  }

  onInputBlur(e) {
    this.doBlur();

    this.onValueChange();
    e.value = this.getValue();
    super.onInputBlur(e);
  }

  onIMEBreakThrough() {
    this.imeMode = true;
    this.initValue();
  }

  getMomentRange(system = false) {
    let momentMin;
    let momentMax;
    if (system) {
      momentMin = momentHelper.createMoment(new Date(1900, 0, 1));
      momentMax = Globalize.getToday().add(50, 'year');
    } else {
      const { min, max } = this.props;
      momentMin = momentHelper.createMoment(min);
      momentMax = momentHelper.createMoment(max);
    }

    return { min: momentMin, max: momentMax };
  }

  onStopTyping = () => {
    if (this.imeMode) {
      this.setValue(this.input.value);
    }

    if (this.textProvider.closeBlankField()) {
      this.updateText();
    }

    this.highLightField();
  }

  initValue(text) {
    text = text || this.input.value;
    if (!this.textProvider.isValid() && /^\d+$/.test(text)) {
      const num = parseInt(text, 10);
      const value = moment().date(num === 0 ? 10 : num).hour(num);
      this.setValue(value);
      return true;
    }
    return false;
  }

  onKeyPressPreview(ch) {
    const field = this.textProvider.getField();
    if (field) {
      if (ch === ' ') {
        return true;
      }

      const isDigit = /\d/.test(ch);
      if (field.allowInstanceEditing && !isDigit) {
        return true;
      }

      if (this.initValue(ch)) {
        return true;
      }

      const fieldGap = this.textProvider.isFieldGap(ch);
      if (fieldGap) {
        this.toNextField();
        return true;
      }

      const now = new Date();
      const lastTime = this.timeStamp;
      this.timeStamp = now;
      const startTyping = (now.getTime() - lastTime.getTime()) > 1000;
      if (startTyping) {
        this.textProvider.clearField();
      }

      const txt = startTyping ? ch : (field.getText() + ch);
      const ret = field.setText(txt);
      if (ret) {
        this.updateText();
        this.highLightField();
      } else {
        this.triggerEvent('onInvalidInput', { char: ch });
      }
    }

    return true;
  }

  onKeyDownPreview(e) {
    const key = e.keyCode || e.which;
    switch (key) {
      case KeyCode.LEFT:
        this.toPrevField();
        return true;

      case KeyCode.RIGHT:
        this.toNextField();
        return true;

      case KeyCode.TAB:
      case KeyCode.SPACE:
      case KeyCode.COMMA:
      case KeyCode.DECIMAL_POINT:
      case KeyCode.FORWARD_SLASH:
        if (this.textProvider.isValid()) {
          if (e.shiftKey) {
            if (this.textProvider.activeFieldIndex > 0) {
              this.toPrevField();
              return true;
            }
          } else if (this.textProvider.activeFieldIndex < this.textProvider.getFieldCount() - 1) {
            this.toNextField();
            return true;
          }
        }
        break;

      case KeyCode.HOME:
        this.toFirstField();
        return true;

      case KeyCode.END:
        this.toLastField();
        return true;
    }

    return false;
  }

  deleteSelection() {
    if (!this.allowEdit()) { return; }

    const { allowBlank } = this.props;

    if (this.isSelectAll()) {
      if (allowBlank) {
        this.setValue(null);
      }
    } else if (this.textProvider.clearField()) {
      this.updateText();
      this.highLightField();
    }
  }

  onTextChange() {
    this.forceToRange(false);
  }

  forceToRange(autoFix = true) {
    let value = this.getValue();
    let { min, max } = this.getMomentRange();

    if (value && autoFix) {
      let newValue = value;
      if (min) {
        newValue = moment.max(min, newValue);
      }

      if (max) {
        newValue = moment.min(max, newValue);
      }

      if (newValue && !momentHelper.isSame(newValue, value)) {
        this.setValue(newValue);
        value = newValue;
        newValue = null;
      }

      const { min: minSystem, max: maxSystem } = this.getMomentRange(true);
      min = minSystem;
      max = maxSystem;

      if (value < min) {
        confirm('The entry date is too old (earlier than 1900).', { title: 'Out of range' });
        newValue = min;
      } else if (value > max) {
        confirm('The entry date is too far in the future (more than fifty years).', { title: 'Out of range' });
        newValue = max;
      }

      if (newValue && !momentHelper.isSame(newValue, value)) {
        this.setValue(newValue);
        value = newValue;
      }
    }

    const outOfRange = value ? !momentHelper.isInRange(value, min, max) : false;
    this.setState({
      stateClassName: outOfRange ? 'state-out-of-range' : ''
    });
  }

  onValueChange(withEvent = true) {
    const m = momentHelper.createMoment(this.getValue());

    if (!momentHelper.isSame(this.preMoment, m)) {
      this.preMoment = m;
      if (withEvent) {
        this.triggerEvent('onValueChange', {
          value: m,
          nativeDate: m ? m.toDate() : null
        });
      }
    }
  }

  onTriggerClick() {
    this.popupCalendar();
  }

  onCalendarOpen() {
    this.triggerEvent('onCalendarOpen');
    this.doBlur();
  }

  onCalendarClose() {
    this.triggerEvent('onCalendarClose');
  }

  popupCalendar() {
    const target = this.input;

    const popupOptions = {
      target,
      showShadow: true,
      distance: 4,
      closeByEscape: true,
      focus: true,
      ...this.props.listPopupOptions
    };

    const momentValue = this.getValue();
    const value = momentValue && momentValue.isValid() ? [momentValue] : [];
    const { disabledDates, min, max, flexibleCalendar } = this.props; // for calendar config
    const calendarOptions = {
      min,
      max,
      disabledDates,
      value,
      valueChanged: (v) => {
        if (this.calendar) {
          this.calendar.cancel();
        }
        const d = v.length ? v[0] : null;
        if (d) {
          const dateStr = d.format('YYYY-MM-DD');
          const timeStr = momentValue && momentValue.isValid() ? momentValue.format('HH:mm:ss') : '00:00:00';
          const newValue = moment(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm:ss');
          this.setValue(newValue);
        }
      },
      ...this.props.listConfig
    };
    if (flexibleCalendar) {
      calendarOptions.className = `${DefaultCSSPrefix}-input-calendar__flexible`;
      calendarOptions.style = {
        width: this.node.offsetWidth
      };
    }

    const calendar = Calendar.popup(calendarOptions, popupOptions);
    calendar.result.catch(() => { });

    if (calendar !== this.calendar) {
      this.calendar = calendar;
      this.onCalendarOpen();

      calendar.result.then(() => {
        this.onCalendarClose();
      }).catch(() => {
        this.onCalendarClose();
      });
    }
  }

  generateTimeRange() {
    const times = [];
    const start = 0;
    const end = 1440;
    const step = parseInt(this.props.timeStep, 10);
    let time = start;
    let nexttime = 0;
    do {
      times.push(time);
      nexttime = time + step;
      time = nexttime;
    } while (time < end);
    return times;
  }

  getTimeFormat() {
    return this.textProvider.pattern || 'hh:mm A';
  }

  generateTimeData(times) {
    const format = this.getTimeFormat();
    return times.map((time, index) => {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;

      const timeText = moment(`${hours}:${minutes}`, 'HH:mm').format(format);
      const timeValue = moment(`${hours}:${minutes}`, 'HH:mm').format('HH:mm');
      return {
        text: timeText,
        value: timeValue,
        index
      };
    });
  }

  onListOpen() {
    super.onListOpen();
    this.doBlur();
  }

  onTrigger2Click() {
    this.popupList();
  }

  createListItems() {
    const timeRange = this.generateTimeRange();
    return this.generateTimeData(timeRange);
  }

  onListSelected(indexes) {
    if (isEmpty(this.listItems) || isEmpty(indexes)) {
      return;
    }

    const i = indexes[0];
    if (i >= 0) {
      const item = this.listItems[i];
      if (item) {
        const dateStr = this.preMoment && this.preMoment.isValid() ? this.preMoment.format('YYYY-MM-DD') : '1970-01-01';
        const timeStr = item.value ? moment(item.value, 'HH:mm').format('HH:mm:ss') : '00:00:00';
        const newValue = moment(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm:ss');
        this.setValue(newValue);
      }
    }
  }

  findInList() {
    const text = this.getText();
    if (!text || isEmpty(this.listItems)) {
      return [-1];
    }

    const index = findIndex(this.listItems, item =>
      momentHelper.isSameTime(item.text, text, this.getTimeFormat()));
    return [index];
  }
}

/**
 * @react-component
 */
export default InputMoment;

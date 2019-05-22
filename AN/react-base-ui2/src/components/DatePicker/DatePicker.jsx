import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';

import { cls } from '../../utils';
import Input from '../Input';

import { Calendar, SelectionMode, getSafeValue } from '../Calendar';


function defaultFormatDate(value) {
  if (!value) {
    return '';
  }

  let tmp = value;
  if (isArray(value)) {
    tmp = value[0];
  }

  tmp = moment(tmp);
  if (!tmp.isValid()) {
    return '';
  }

  return tmp.format('MM/DD/YYYY');
}

/**
 * Default PropTypes of DatePicker.
 */
const DatePickerPropTypes = {
  /**
   * Determines the class name.
   */
  className: PropTypes.string,
  /**
   * Determines the style.
   */
  style: PropTypes.object,
  /**
   * Determines the date picker name attribute.
   */
  name: PropTypes.string,
  /**
   * whether to display the date picker icon.
   */
  showIcon: PropTypes.bool,
  /**
   * whether to have errors.
   */
  errored: PropTypes.bool,
  /**
   * Determines the min date.
   */
  min: PropTypes.instanceOf(moment),
  /**
   * Determines the max date.
   */
  max: PropTypes.instanceOf(moment),
  /**
   * Determines the min date value.
   */
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
  /**
   * Determines the default date.
   */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.arrayOf(PropTypes.instanceOf(moment))
  ]),
  /**
   * A function called when format date.
   */
  formatDate: PropTypes.func,
  /**
   * A function called when format date to text.
   */
  formatTextValue: PropTypes.func,
  /**
   * A function called when date changed.
   */
  onValueChange: PropTypes.func,
  /**
   * A function called when date canlendar open.
   */
  onCalendarOpen: PropTypes.func,
  /**
   * A function called when date canlendar close.
   */
  onCalendarClose: PropTypes.func
};


/** UI component that displays DatePicker with variant settings.*/
class DatePicker extends PureComponent {
  static displayName = 'DatePicker';
  static propTypes = DatePickerPropTypes;

  constructor(props) {
    super(props);

    this.calendar = null;
    this.state = {
      value: getSafeValue(props.value)
    };
  }

  componentDidMount = () => {
    Object.defineProperties(this, {
      value: {
        get() {
          return this.state.value;
        },
        set(v) {
          this.setState({ value: getSafeValue(v) },
            () => {
              const { onValueChange } = this.props;
              if (isFunction(onValueChange)) {
                onValueChange({
                  value: this.state.value
                });
              }
            });
        }
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    const newValue = getSafeValue(nextProps.value);
    const oldValue = getSafeValue(this.props.value);
    if (newValue.map(v => v.format('MM/DD/YYYY')).join(';') !==
      oldValue.map(v => v.format('MM/DD/YYYY')).join(';')) {
      this.setState({ value: newValue });
    }
  }

  onFocus(e) {
    this.popupCalendar();

    const { onFocus } = this.props;
    if (isFunction(onFocus)) {
      onFocus(e);
    }

    e.stopPropagation();
    e.preventDefault();
  }

  getTextValue(value) {
    const { formatTextValue } = this.props;
    if (isFunction(formatTextValue)) {
      return formatTextValue(value);
    }

    return this.defaultFormatTextValue(value);
  }

  defaultFormatTextValue(value) {
    if (!isArray(value)) {
      value = [value];
    }

    if (isEmpty(value)) return '';

    if (value.length > 1) {
      return `${value.length} date(s) selected`;
    }

    return this.formatDate(value[0]);
  }

  formatDate(value) {
    const { formatDate } = this.props;
    if (isFunction(formatDate)) {
      return formatDate(value);
    }

    return defaultFormatDate(value);
  }

  popupCalendar() {
    const target = this.input.input;

    const popupOptions = {
      target,
      showShadow: true,
      distance: 0,
      closeByEscape: true
    };

    let calendar = null;
    const value = this.state.value;
    const calendarOptions = {
      selectMode: SelectionMode.MULTIPLE,
      value,
      valueChanged: (v) => {
        this.value = v;
      },
      min: this.props.min,
      max: this.props.max,
      disabledDates: this.props.disabledDates,
      'data-qa-id': this.props['data-qa-id'] && `${this.props['data-qa-id']}-calendar`
    };

    calendar = Calendar.popup(calendarOptions, popupOptions);
    if (calendar !== this.calendar) {
      this.calendar = calendar;
      const { onCalendarOpen, onCalendarClose } = this.props;
      if (isFunction(onCalendarOpen)) {
        onCalendarOpen();
      }

      calendar.result.then(() => {
        if (isFunction(onCalendarClose)) {
          onCalendarClose();
        }
      }).catch(() => {
        if (isFunction(onCalendarClose)) {
          onCalendarClose();
        }
      });
    }
  }

  render = () => {
    const {
      className, style, name,
      showIcon, errored,
      'data-qa-id': dataQAId
    } = this.props;

    return (
      <div
        className={cls`date-picker ${className || ''}`}
        style={style}
      >
        <Input
          data-qa-id={dataQAId}
          ref={(ref) => { this.input = ref; }}
          name={name}
          postIcon={showIcon ? 'icon-calendar' : undefined}
          errored={errored}
          onFocus={e => this.onFocus(e)}
          value={this.getTextValue(this.state.value)}
        />
      </div>
    );
  }
}

export default DatePicker;

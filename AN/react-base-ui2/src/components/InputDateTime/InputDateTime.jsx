import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isFunction from 'lodash/isFunction';
import identity from 'lodash/identity';
import { momentHelper } from '../../utils';
import InputDate from '../InputDate';
import InputTime from '../InputTime';

const { func, string, number, object, oneOfType } = PropTypes;

export const defaultProps = {
  /**
   * Determines the default date value for a date input.
   */
  value: null,
  dateFormat: 'dddd, MMM DD, YYYY',
  timeFormat: 'HH:mm A',
  timeStep: 30,
  /**
  * The onValueChange event handler.
  * A function called when the value of the input is changed.
  */
  onValueChange: identity
};

/**
 * InputDateTime Component
 * @class
 */
export default class InputDateTime extends React.PureComponent {
  static displayName = 'InputDateTime';
  static defaultProps = defaultProps;

  static propTypes = {
    value: oneOfType([string, number, object]),
    className: string,
    dateFormat: string,
    timeFormat: string,
    timeStep: number,
    onValueChange: func
  };

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      value: moment(value)
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      value: prevValue
    } = this.props;

    const {
      value: nextValue
    } = nextProps;

    if (!momentHelper.isSame(nextValue, prevValue)) {
      this.setState({
        value: nextValue
      });
    }
  }

  handleValueChange(e, isDate = true) {
    const { value: nextValue } = e;
    const { value } = this.state;

    const dateValue = isDate ? nextValue : value;
    const timeValue = isDate ? value : nextValue;

    const dateStr = dateValue.format('YYYY-MM-DD');
    const timeStr = timeValue.format('HH:mm:ss');
    const newValue = moment(`${dateStr} ${timeStr}`, 'YYYY-MM-DD HH:mm:ss');
    this.setState({
      value: newValue
    });

    const { onValueChange } = this.props;
    if (isFunction(onValueChange)) {
      onValueChange({
        value: newValue
      });
    }
  }

  render() {
    const {
      style,
      className = '',
      dateFormat,
      timeFormat,
      timeStep,
      ...rest
    } = this.props;
    const { value } = this.state;

    return (
      <div
        className={`an-input-datetime ${className}`}
        style={style}
        ref={(elem) => { this.inputDateTime = elem; }}
        data-qa-id={this.props['data-qa-id']}
      >
        <InputDate
          {...rest}
          value={value}
          format={dateFormat}
          className="an-input-datetime__date"
          onValueChange={e => this.handleValueChange(e, true)}
          allowBlank={false}
          showTrigger2={false}
        />
        <InputTime
          value={value}
          format={timeFormat}
          timeStep={timeStep}
          className="an-input-datetime__time"
          onValueChange={e => this.handleValueChange(e, false)}
          allowBlank={false}
        />
      </div>
    );
  }
}

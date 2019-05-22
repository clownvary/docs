import React from 'react';
import {
  bool,
  string,
  func
} from 'prop-types';
import map from 'lodash/map';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import uniqueId from 'lodash/uniqueId';
import isFunction from 'lodash/isFunction';

import Dropdown from '../Dropdown';
import ScreenReaderOnly from '../ScreenReaderOnly';

/**
 * Default PropTypes of Duration.
 */
const DurationPropTypes = {
  /**
   * Sets the duration, the format is 'hh:mm:ss'.
  */
  value: string, // hh:mm:ss
  /**
   * Whether the duration list is disabled.
  */
  disabled: bool,
  /**
   * Customize aria-label.
  */
  ariaLabel: string,
  /**
   * Customize aria-labelledby.
  */
  ariaLabelledbyProvider: func,
  /**
   * The callback function that is triggered when changes the duration.
  */
  onChange: func
};

/** UI component of Duration.*/
class Duration extends React.PureComponent {
  static displayName = 'Duration';
  static propTypes = DurationPropTypes;

  static fixTwo(num) {
    if (!isNil(num)) {
      const v = `0${num}`;
      return v.substring(v.length - 2, v.length);
    }

    return '';
  }

  static getData() {
    const hours = map(Array(25),
      (v, i) => ({ text: Duration.fixTwo(i), value: Duration.fixTwo(i) }));
    const minutes = map(Array(60),
      (v, i) => ({ text: Duration.fixTwo(i), value: Duration.fixTwo(i) }));
    const seconds = map(Array(60),
      (v, i) => ({ text: Duration.fixTwo(i), value: Duration.fixTwo(i) }));

    return {
      hours,
      minutes,
      seconds
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      ...this.getValue(props.value),
      ...Duration.getData()
    };
    this._uniqueId = uniqueId('an-duration-');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      const { hour, minute, second } = this.getValue(nextProps.value);

      this.setState({
        hour, minute, second
      });
    }
  }

  onChange(durationUnit, value) {
    this.setState({ [durationUnit]: value }, () => {
      const { onChange } = this.props;
      if (isFunction(onChange)) {
        const { hour, minute, second } = this.state;
        const duration = `${hour}:${minute}:${second}`;

        onChange(duration);
      }
    });
  }

  getValue(value) {
    const returnVal = { hour: '00', minute: '00', second: '00' };

    if (isString(value) && /^\d{1,2}:\d{1,2}:\d{1,2}$/.test(value)) {
      const [hour, minute, second] = value.split(':');
      returnVal.hour = Duration.fixTwo(hour);
      returnVal.minute = Duration.fixTwo(minute);
      returnVal.second = Duration.fixTwo(second);
    }

    return returnVal;
  }

  render() {
    const { disabled, ariaLabel, ariaLabelledbyProvider } = this.props;
    const hourTextId = `${this._uniqueId}_hour`;
    const minuteTextId = `${this._uniqueId}_minute`;
    const secondTextId = `${this._uniqueId}_second`;

    return (
      <div className="duration">
        <Dropdown
          data={this.state.hours}
          value={this.state.hour}
          disabled={disabled}
          ariaLabel={ariaLabel}
          ariaLabelExtraEndText="hour"
          ariaLabelledbyProvider={(ids) => {
            const newIds = `${hourTextId}${ids ? ` ${ids}` : ''}`;
            return ariaLabelledbyProvider && ariaLabelledbyProvider(newIds);
          }}
          onChange={({ value }) => this.onChange('hour', value)}
        />
        <span className="txt">hrs</span>
        <ScreenReaderOnly id={hourTextId}>
          {'focusing on hour select box, current value is '}
        </ScreenReaderOnly>
        <Dropdown
          data={this.state.minutes}
          value={this.state.minute}
          disabled={disabled}
          ariaLabel={ariaLabel}
          ariaLabelExtraEndText="minute"
          ariaLabelledbyProvider={(ids) => {
            const newIds = `${minuteTextId}${ids ? ` ${ids}` : ''}`;
            return ariaLabelledbyProvider && ariaLabelledbyProvider(newIds);
          }}
          onChange={({ value }) => this.onChange('minute', value)}
        />
        <span className="txt">min</span>
        <ScreenReaderOnly id={minuteTextId}>
          {'focusing on minute select box, current value is '}
        </ScreenReaderOnly>
        <Dropdown
          data={this.state.seconds}
          value={this.state.second}
          disabled={disabled}
          ariaLabel={ariaLabel}
          ariaLabelExtraEndText="second"
          ariaLabelledbyProvider={(ids) => {
            const newIds = `${secondTextId}${ids ? ` ${ids}` : ''}`;
            return ariaLabelledbyProvider && ariaLabelledbyProvider(newIds);
          }}
          onChange={({ value }) => this.onChange('second', value)}
        />
        <span className="txt">sec</span>
        <ScreenReaderOnly id={secondTextId}>
          {'focusing on second select box, current value is '}
        </ScreenReaderOnly>
      </div>
    );
  }
}

export default Duration;

import React from 'react';
import { string, bool, array, number, instanceOf } from 'prop-types';
import moment from 'moment';
import { TimeRange } from './TimeRange';
import { Dropdown } from '../Dropdown';
import { DefaultCSSPrefix } from '../../consts';
import { cls } from '../../utils';
import MomentRange from '../../common/MomentRange';

/**
 * Default PropTypes of InputTimeRange.
 */
const InputTimeRangePropTypes = {
  /**
   * The format pattern to display the time.
   */
  format: string,
  /**
   * Step in time unit when generating the time picker list.
   */
  step: number,
  /**
   * Whether or not to edit time.
   */
  disabled: bool,
  /**
   * Determines the current selected timeRange
   */
  value: instanceOf(MomentRange),
  /**
   * Whether or not to show text tip.
   */
  showTextTip: bool,
  /**
   * Determines the time range dropdowm list.
   */
  items: array
};

/** Default Props for InputTimeRange */
const InputTimeRangeProps = {
  format: 'h:mm',
  step: 60,
  disabled: false,
  showTextTip: true,
  items: [],
  value: null
};

/** UI component that displays InputTimeRange with variant settings.*/
class InputTimeRange extends React.PureComponent {
  static displayName = 'InputTimeRange';
  static defaultProps = InputTimeRangeProps;
  static propTypes = InputTimeRangePropTypes;

  constructor(props) {
    super(props);
    const { format, value } = this.props;
    const range = value || new MomentRange({
      start: moment(new Date(), format),
      end: moment(new Date(), format)
    });
    const { start, end } = range;
    this.state = {
      range,
      startText: start ? start.format(format) : '',
      endText: end ? end.format(format) : '',
      showEditArea: false,
      start,
      end,
      value: null
    };
  }

  onCancel() {
    this.setState({ showEditArea: false });
  }

  onCheck(start, end) {
    const { format, onValueChange } = this.props;
    const timeRange = new MomentRange({ start, end });

    this.setState(
      {
        showEditArea: false,
        startText: start.format(format),
        endText: end.format(format),
        range: timeRange,
        value: null
      }, () => {
      onValueChange(timeRange);
    });
  }

  onChange(value) {
    const { format, onValueChange } = this.props;
    const timeRange = new MomentRange({
      start: moment(value.start, format),
      end: moment(value.end, format)
    });

    this.setState({
      value,
      range: timeRange
    }, () => {
      onValueChange(timeRange);
    });
  }

  getContainerClassName() {
    return `${DefaultCSSPrefix}-input-time-range`;
  }

  showEditArea() {
    !this.props.disabled && this.setState({ showEditArea: true });
  }


  render() {
    const { format, disabled, items, step, showTextTip } = this.props;
    const { startText, endText, showEditArea, range } = this.state;
    const text = startText ? `${startText} to ${endText}` : '';

    return (
      <div className={this.getContainerClassName()}>
        <div className={cls`an-input-time-range-text-area ${showEditArea ? 'u-hidden' : ''} `} >
          <Dropdown
            data={items}
            text={text}
            disabled={disabled}
            value={this.state.value}
            showTextTip={showTextTip}
            onChange={({ value }) => this.onChange(value)}
          />
          <i
            className={cls`icon icon-edit ${disabled ? 'icon-edit-disabled' : ''} `}
            aria-label={'edit time'}
            aria-disabled={disabled}
            onClick={() => this.showEditArea()}
          />
        </div>
        <div className={cls`an-input-time-range-edit-area ${showEditArea ? '' : 'u-hidden'} `} >
          <TimeRange
            format={format}
            range={range}
            step={step}
            onCheck={(start, end) => { this.onCheck(start, end); }}
            onCancel={() => { this.onCancel(); }}
          />
        </div>
      </div>
    );
  }
}

export {
  InputTimeRange,
  InputTimeRangeProps
};

export default InputTimeRange;

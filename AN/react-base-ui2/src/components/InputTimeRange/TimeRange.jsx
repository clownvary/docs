import React from 'react';
import moment from 'moment';
import { string, number } from 'prop-types';
import { InputTime } from '../InputTime';
import { DefaultCSSPrefix } from '../../consts';

/**
 * Default PropTypes of TimeRange.
 */
const TimeRangePropTypes = {
  /**
   * The format pattern to display the time.
   */
  format: string,
  /**
   * Step in time unit when generating the time picker list.
   */
  step: number,
  /**
   * Which type of time unit to increase or decrease by hour or minute or second.
   */
  unit: string
};

/** Default Props for TimeRange */
const TimeRangeProps = {
  format: 'h:mm',
  step: 30,
  unit: 'minute'
};

/** UI component that displays TimeRange with variant settings.*/
class TimeRange extends React.PureComponent {
  static displayName = 'TimeRange';
  static defaultProps = TimeRangeProps;
  static propTypes = TimeRangePropTypes;

  constructor(props) {
    super(props);
    const { range } = this.props;
    const { start, end } = range;

    this.state = { start, end };
  }

  componentWillReceiveProps(nextProps) {
    const { range: { start, end } } = nextProps;

    this.setState({ start, end });
  }

  onStartChange(e) {
    const { format, unit, step } = this.props;
    const text = e.value.format(format);
    const value = moment(text, format);

    this.setState({
      start: value,
      end: e.value.add(step, unit)
    });
  }

  onEndChange(e) {
    const { start, end } = this.state;
    const { unit } = this.props;

    const diff = e.value.diff(start, unit);
    const isSame = start.isSame(e.value, unit);

    if (!isSame) {
      /* istanbul ignore else */
      if (diff > 0) {
        this.setState({ end: e.value });
      } else if (diff < 0) {
        this.setState({ end: e.value }, () => {
          this.setState({ end });
        });
      }
    } else {
      this.setState({ end: e.value }, () => {
        this.setState({ end });
      });
    }
  }

  getContainerClassName() {
    return `${DefaultCSSPrefix}-time-range`;
  }

  cancelEdit() {
    const { range: { start, end } } = this.props;
    const { onCancel } = this.props;

    this.setState({
      start,
      end
    }, () => {
      onCancel();
    });
  }

  checkEdit() {
    const { start, end } = this.state;
    this.props.onCheck(start, end);
  }

  render() {
    const { format, step } = this.props;
    const { start, end } = this.state;

    return (
      <div className={this.getContainerClassName()} >
        <div>
          <InputTime
            value={start}
            format={format}
            aria-label={'start time'}
            timeStep={step}
            onValueChange={(e) => {
              this.onStartChange(e, e.value);
            }}
          />
        </div>
        <div className="an-time-range-gap">-</div>
        <div>
          <InputTime
            value={end}
            format={format}
            aria-label={'end time'}
            timeStep={step}
            onValueChange={(e) => { this.onEndChange(e); }}
          />
        </div>
        <i
          className="icon icon-check-thin"
          aria-label={'confirm editting icon'}
          onClick={() => this.checkEdit()}
        />
        <i
          className="icon icon-close-thin"
          aria-label={'canel editting icon'}
          onClick={() => this.cancelEdit()}
        />
      </div>
    );
  }
}

export {
  TimeRange,
  TimeRangeProps
};

export default TimeRange;

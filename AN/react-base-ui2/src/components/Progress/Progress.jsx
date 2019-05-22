import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Size3 } from '../../consts';

/**
 * Default PropTypes of Progress.
 */
const ProgressPropTypes = {
  /**
   * Set the completion percentage.
   */
  percent: PropTypes.number,

  /**
   * Determines the progress size.
   */
  size: PropTypes.string,

  /**
   * Whether to display the progress value.
   */
  showInfo: PropTypes.bool
};

/** Default Props for Progress. */
const ProgressProps = {
  percent: 0,
  showInfo: true,
  size: Size3.MEDIUM
};

/** UI component that displays Progress with variant settings.*/
class Progress extends React.PureComponent {
  static displayName = 'Progress';
  static defaultProps = ProgressProps;
  static propTypes = ProgressPropTypes;

  render() {
    const { className, percent, showInfo, size } = this.props;
    const progressInfo = <span className={'an-progress__text'}>{percent}%</span>;

    const classString = classNames('an-progress', {
      'an-progress--show-info': showInfo,
      [`an-progress--${size}`]: size
    }, className);

    return (
      <div className={classString}>
        <div className={'outer'}>
          <div className={'inner'}>
            <div className={'meter'} style={{ width: `${percent}%` }} />
          </div>
        </div>
        {showInfo && progressInfo}
      </div>
    );
  }
}

export default Progress;

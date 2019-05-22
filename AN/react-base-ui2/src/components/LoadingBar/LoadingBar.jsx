import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Size3 } from '../../consts';

/** Default PropTypes for LoadingBar
 * @memberof LoadingBar
*/
const LoadingBarPropTypes = {
  /** Determines whether the loading status is displayed for global scope.
   * @type {boolean}
   */
  fullScreen: PropTypes.bool,
  /** The indicating text.
   * @type {string}
   */
  text: PropTypes.string,
  /** Determines whether showing the mask background.
   * @type {boolean}
   */
  showMask: PropTypes.bool,
  /** The spin size.
   * Only sm/md/lg are supported.
   * @type {Size}
   */
  spinSize: PropTypes.string
};

const LoadingBarProps = {
  fullScreen: false,
  text: '',
  showMasK: true,
  spinSize: Size3.SMALL
};

/** UI Component that displays loading or waiting status. */
class LoadingBar extends PureComponent {
  static displayName = 'LoadingBar';
  static propTypes = LoadingBarPropTypes;
  static defaultProps = LoadingBarProps;

  render() {
    const { fullScreen = false, text = '', className, showMask = true, spinSize = Size3.SMALL } = this.props;

    return (
      <div className={classNames(fullScreen ? 'loading-bar fullscreen' : `loading-bar ${spinSize}`, className)}>
        {
          showMask && <div className="loading-bar__mask" />
        }
        <div className="loading-bar__outer-box">
          <div className="loading-bar__icon">
            <i className="icon icon-loading-m icon-spin" />
            <div className="loading-bar__text">{text}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingBar;

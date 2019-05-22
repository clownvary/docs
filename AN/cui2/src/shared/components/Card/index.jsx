import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.less';

export class Card extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    fullfill: PropTypes.bool,
    enableHover: PropTypes.bool,
  }

  static defaultProps = {
    fullfill: false,
    enableHover: false
  }

  render() {
    const { className, fullfill, enableHover, children, ...rest  } = this.props;
    return (
      <div
        className={classNames('card', className, { ['card--fullfill']: fullfill, ['card--hover']: enableHover })}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

export default Card;

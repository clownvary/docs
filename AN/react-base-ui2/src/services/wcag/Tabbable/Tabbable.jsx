import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DefaultCSSPrefix } from '../../../consts';

/* eslint-disable no-script-url */

const TabbablePropTypes = {
  prefixCls: PropTypes.string,
  /**
   * class names which were applied to component container div.
   */
  className: PropTypes.string,
  /**
   * the callback function which is triggered when clicking the component.
   */
  onClick: PropTypes.func
};

const TabbableDefaultProps = {
  prefixCls: `${DefaultCSSPrefix}-tabbable`
};

class Tabbable extends React.Component {

  static propTypes = TabbablePropTypes;
  static defaultProps = TabbableDefaultProps;

  handleClick = (e) => {
    const { onClick } = this.props;
    onClick && onClick(e);
  }

  render() {
    const { prefixCls, className, children, ...rest } = this.props;
    return (
      <span onClick={this.handleClick} className={classNames(prefixCls, className)}>
        <a
          href="javascript:void(0)"
          role="button"
          className={`${prefixCls}__fake-link`}
          {...rest}
        >
          {children}
          <span style={{ display: 'none' }}>wcag_hidden_text</span>
        </a>
      </span>
    );
  }
}

export default Tabbable;

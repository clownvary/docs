import React from 'react';
import { string, bool, oneOf, node } from 'prop-types';
import cn from 'classnames';

import './index.less';

const _propTypes = {
  bold: bool,
  className: string,
  children: node,
  size: oneOf(['xs', 's', 'm', 'l', 'xl']),
  align: oneOf(['left', 'center', 'right']),
  type: oneOf(['primary', 'seconday', 'super', 'attention'])
};

const _defaultProps = {
  bold: false,
  size: 's',
  align: 'left',
  type: 'seconday'
};

class Text extends React.Component {
  static displayName = 'Text';

  static propTypes = _propTypes;
  static defaultProps = _defaultProps;

  render() {
      const {
        size,
        type,
        bold,
        align,
        children,
        className
      } = this.props;
      const classes = cn(
        'an-text',
        {
          'an-text--bold': bold,
          [`an-text--size-${size}`]: size,
          [`an-text--align-${align}`]: align,
          [`an-text--type-${type}`]: type
        },
        className
      );

      return (
          <div className={classes}>
            {children}
          </div>
      );
  }
}

export default Text;

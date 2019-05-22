import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'react-base-ui/lib/components/Button';

import './index.less';

export class IconButton extends React.PureComponent {

  static propTypes = {
    ...Button.propTypes,
    className: PropTypes.string,
    icon: PropTypes.string
  };

  static defaultProps = {
    type: 'minimal'
  };

  render() {
    const { icon, children, className, ...rest } = this.props;
    const onlyIcon = !children;
    return (
      <Button
        className={classNames({ 'btn-icon-only': onlyIcon }, className)}
        {...rest}
      >
        { icon && <i className={`icon ${icon}`} /> }
        { children }
      </Button>
    );
  }
}

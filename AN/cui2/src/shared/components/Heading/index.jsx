import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Heading extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    level: PropTypes.number,
    align: PropTypes.oneOf(['left', 'center', 'right'])
  };

  static defaultProps = {
    align: 'left',
    level: 2
  };

  render() {
    const { level, align, className, ...rest } = this.props;
    const HeadingTag = `h${level}`;
    return (
      <HeadingTag className={classNames(className, `u-text-${align}`)} {...rest}>
        { this.props.children }
      </HeadingTag>
    );
  }
}

export default Heading;

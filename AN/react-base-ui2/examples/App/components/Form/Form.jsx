import React from 'react';
import classNames from 'classnames';

export default class Form extends React.PureComponent {
  render() {
    const {
      className,
      title,
      center = false,
      children,
      size = 'sm',
      ...rest
    } = this.props;

    return (
      <div className={classNames('an-form', className, { center }, size)} {...rest}>
        {title && <span className="an-form__title">{title}</span>}
        {children}
      </div>
    );
  }
}

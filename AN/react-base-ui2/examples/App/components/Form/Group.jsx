import React from 'react';
import classNames from 'classnames';

export default class Group extends React.PureComponent {
  render() {
    const { className, children } = this.props;

    return (
      <div className={classNames('an-form__group', className)}>
        {children}
      </div>
    );
  }
}

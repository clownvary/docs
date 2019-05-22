import React from 'react';
import classNames from 'classnames';

import './index.less';

export default class ErrorPage extends React.PureComponent {

  static defaultProps = {
    classes: 'an-module-container error-component'
  }

  render() {
    const {className, classes, children, ...rest} = this.props;

    return (
      <div {...rest} className={classNames(classes, className)}>
        <div className="error-component-layout u-color-secondarytext">
          {children}
        </div>
      </div>
    );
  }

}

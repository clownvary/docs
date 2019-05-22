import React, { PureComponent } from 'react';
import classNames from 'classnames';


export default class ErrorList extends PureComponent {
  render() {
    const { messages, className, ...props } = this.props;
    return (
      <div {...props} className={classNames('an-error-list', className)}>
        { messages.map((msg, i) => (
          <div key={i} className="an-error">
            <span className="icon aaui-alert-error-icon icon-times-circle" />
            <span>{msg}</span>
          </div>
          )
        )
      }
      </div>
    );
  }
}

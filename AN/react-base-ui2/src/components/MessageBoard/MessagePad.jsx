
import React, { PureComponent } from 'react';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Alert from '../Alert/Alert';
import { SafeText } from '../SafeText';


class MessagePad extends PureComponent {
  static displayName = 'MessagePad';

  static propTypes = {
    message: PropTypes.shape({}),
    onClose: PropTypes.func
  };

  static defaultProps = {
  };

  render() {
    const { message, onClose, className } = this.props;
    const { details = [], type, id, title, dismissable = false } = message;
    const contentClass = details.length > 1 ? 'message-content' : 'message-content single-line';

    return (
      <Alert
        key={id}
        type={type}
        noClose={!dismissable}
        onClose={() => onClose(id)}
        className={classNames('message-pad', className)}
      >
        <div className={contentClass}>
          {
            title ? <span className="title">{title}</span> : undefined
          }

          <ul>
            {details.map((line, i) => {
              if (isString(line)) {
                return <SafeText dangerMode tagName="li" text={line} key={i} />;
              }

              return <li key={i}>{line}</li>;
            })}
          </ul>
        </div>
      </Alert>
    );
  }
}

export default MessagePad;

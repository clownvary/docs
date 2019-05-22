import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { isIE } from 'react-base-ui/lib/utils/browser';
import './index.less';

export default class Iframe extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string
  };

  componentWillUnmount() {
    if (isIE() && this.iframe) {
      this.iframe.src = 'about:blank';
    }
  }

  onIframeRef = (ref) => {
    this.iframe = ref;
  }

  render() {
    const { className, ...rest } = this.props;
    const classes = cls('an-iframe', className);

    return (
      <iframe
        {...rest}
        ref={this.onIframeRef}
        className={classes}
      />
    );
  }
}

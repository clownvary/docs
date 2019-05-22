import _extends from 'babel-runtime/helpers/extends';
import _Map from 'babel-runtime/core-js/map';
import React from 'react';
import ReactDOM from 'react-dom';

import AlertBar from './AlertBar';
import { noop } from '../shared/utils';

var alertMap = new _Map();

function clear() {
  alertMap.forEach(function (_ref) {
    var close = _ref.close;
    return close();
  });
  alertMap.clear();
}

function alert(options) {
  var props = _extends({
    onClose: noop,
    multiple: false,
    inverse: true
  }, options);
  var originalOnClose = props.onClose;
  var div = document.createElement('div');

  if (!props.multiple) {
    clear();
  }

  document.body.appendChild(div);

  function close() {
    alertMap.delete(div);
    // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
    var unmountResult = ReactDOM.unmountComponentAtNode(div);

    unmountResult && div.parentNode && div.parentNode.removeChild(div);

    originalOnClose.apply(undefined, arguments);
  }

  props.onClose = close;
  alertMap.set(div, { close: close });
  ReactDOM.render(React.createElement(AlertBar, props), div);

  return {
    close: close
  };
}

export { alert, clear };
'use strict';

exports.__esModule = true;
exports.reset = exports.hide = exports.show = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _LoadingCounter = require('./LoadingCounter');

var _LoadingCounter2 = _interopRequireDefault(_LoadingCounter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadingCounter = new _LoadingCounter2.default();
// There only should be one global loading instance
var loadingInstance = void 0;

function _close(div) {
  // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
  var unmountResult = _reactDom2.default.unmountComponentAtNode(div);

  unmountResult && div.parentNode && div.parentNode.removeChild(div);
}

function show() {
  if (loadingCounter.isEmpty()) {
    var div = document.createElement('div');

    document.body.appendChild(div);

    _reactDom2.default.render(_react2.default.createElement(_Loading2.default, null), div);

    loadingInstance = {
      close: function close() {
        loadingCounter.clear();
        _close(div);
      },
      counter: loadingCounter
    };
  }

  loadingCounter.add();

  return loadingInstance;
}

function hide() {
  loadingCounter.dec();

  if (loadingCounter.isEmpty()) {
    loadingInstance.close();
  }
}

function reset() {
  loadingCounter.clear();
}

exports.show = show;
exports.hide = hide;
exports.reset = reset;
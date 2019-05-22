'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = confirm;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
function confirm(options) {
  var _this = this;

  var props = (0, _extends3.default)({
    suppressCancel: false,
    suppressOk: false,
    onCancel: _utils.noop,
    onOk: _utils.noop,
    cancelText: 'Cancel',
    okText: 'Confirm'
  }, options);

  var div = document.createElement('div');
  document.body.appendChild(div);
  var animationFrame = void 0;

  function close() {
    // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
    var unmountResult = _reactDom2.default.unmountComponentAtNode(div);

    unmountResult && div.parentNode && div.parentNode.removeChild(div);

    cancelAnimationFrame(animationFrame);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args && args[0] && args[0].triggerCancel) {
      props.onCancel.apply(props, args);
    }
  }

  function wrapOnClick(actionFn, closeFn) {
    return function onClick() {
      var resultFromActionFn = actionFn();

      if (!resultFromActionFn) {
        closeFn();
      }

      // if returning a promise
      if (resultFromActionFn && typeof resultFromActionFn.then === 'function') {
        resultFromActionFn.then(function () {
          closeFn.apply(undefined, arguments);
        });
      }
    };
  }

  props.close = function () {
    // See https://github.com/facebook/react/issues/3298 "React fails to unmount component from within event handler"
    requestAnimationFrame(close.bind(_this, { triggerCancel: true }));
  };
  props.handleCancel = wrapOnClick(props.onCancel, close);
  props.handleOk = wrapOnClick(props.onOk, close);

  function modalConfirm(_ref) {
    var shown = _ref.shown,
        suppressOk = _ref.suppressOk,
        suppressCancel = _ref.suppressCancel,
        close = _ref.close,
        handleCancel = _ref.handleCancel,
        handleOk = _ref.handleOk,
        title = _ref.title,
        content = _ref.content,
        cancelText = _ref.cancelText,
        okText = _ref.okText,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['shown', 'suppressOk', 'suppressCancel', 'close', 'handleCancel', 'handleOk', 'title', 'content', 'cancelText', 'okText']);

    return _react2.default.createElement(
      _Modal2.default,
      (0, _extends3.default)({ title: title, shown: shown, onClose: close }, rest),
      _react2.default.createElement(
        'div',
        { className: 'modal-body' },
        content
      ),
      _react2.default.createElement(
        'div',
        { className: 'modal-footer' },
        suppressCancel || _react2.default.createElement(
          _Button2.default,
          { type: 'secondary', onClick: handleCancel },
          cancelText
        ),
        suppressOk || _react2.default.createElement(
          _Button2.default,
          { type: 'primary', onClick: handleOk },
          okText
        )
      )
    );
  }

  function render(props) {
    _reactDom2.default.render(modalConfirm((0, _utils.omit)(props, ['onCancel', 'onOk'])), div);
  }

  animationFrame = requestAnimationFrame(function () {
    return render((0, _extends3.default)({}, props, { shown: true }));
  });

  modalConfirm.propTypes = {
    shown: _propTypes.bool,
    suppressCancel: _propTypes.bool,
    suppressOk: _propTypes.bool,

    close: _propTypes.func,
    handleCancel: _propTypes.func,
    handleOk: _propTypes.func,

    title: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.node]),
    content: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.node]),
    cancelText: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.node]),
    okText: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.node])
  };

  render(props);

  return {
    close: close
  };
}
module.exports = exports['default'];
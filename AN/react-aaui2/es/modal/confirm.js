import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
/* eslint-disable no-shadow */
import React from 'react';
import ReactDOM from 'react-dom';
import { bool, string, func, node, oneOfType } from 'prop-types';

import Modal from './Modal';
import Button from '../Button';
import { noop, omit } from '../shared/utils';

export default function confirm(options) {
  var _this = this;

  var props = _extends({
    suppressCancel: false,
    suppressOk: false,
    onCancel: noop,
    onOk: noop,
    cancelText: 'Cancel',
    okText: 'Confirm'
  }, options);

  var div = document.createElement('div');
  document.body.appendChild(div);
  var animationFrame = void 0;

  function close() {
    // Refer to https://facebook.github.io/react/docs/react-dom.html#unmountcomponentatnode
    var unmountResult = ReactDOM.unmountComponentAtNode(div);

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
        rest = _objectWithoutProperties(_ref, ['shown', 'suppressOk', 'suppressCancel', 'close', 'handleCancel', 'handleOk', 'title', 'content', 'cancelText', 'okText']);

    return React.createElement(
      Modal,
      _extends({ title: title, shown: shown, onClose: close }, rest),
      React.createElement(
        'div',
        { className: 'modal-body' },
        content
      ),
      React.createElement(
        'div',
        { className: 'modal-footer' },
        suppressCancel || React.createElement(
          Button,
          { type: 'secondary', onClick: handleCancel },
          cancelText
        ),
        suppressOk || React.createElement(
          Button,
          { type: 'primary', onClick: handleOk },
          okText
        )
      )
    );
  }

  function render(props) {
    ReactDOM.render(modalConfirm(omit(props, ['onCancel', 'onOk'])), div);
  }

  animationFrame = requestAnimationFrame(function () {
    return render(_extends({}, props, { shown: true }));
  });

  modalConfirm.propTypes = {
    shown: bool,
    suppressCancel: bool,
    suppressOk: bool,

    close: func,
    handleCancel: func,
    handleOk: func,

    title: oneOfType([string, node]),
    content: oneOfType([string, node]),
    cancelText: oneOfType([string, node]),
    okText: oneOfType([string, node])
  };

  render(props);

  return {
    close: close
  };
}
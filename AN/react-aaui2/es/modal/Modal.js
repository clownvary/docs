import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { string, bool, object, func, array, element, oneOfType } from 'prop-types';

import KEY_CODES from '../shared/keyCodes';
import scopeTab from '../shared/scopeTab';

var propTypes = {
  className: string,
  onClose: func,
  title: string,
  style: object,
  shown: bool,
  children: oneOfType([array, object, func, element])
};

var defaultProps = {
  shown: false
};

var Modal = function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  function Modal() {
    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.componentDidMount = function () {
      if (_this.props.shown) {
        _this.fixBody();
        _this.autoFocus();
      }
      _this.focusAfterRender = true;
      _this.handleTab = scopeTab(_this.root);
    }, _this.componentDidUpdate = function (_ref) {
      var shown = _ref.shown;

      if (shown !== _this.props.shown) {
        if (_this.props.shown) {
          _this.fixBody();
          _this.originFocusEl = document.activeElement;
          /* istanbul ignore else */
          if (_this.focusAfterRender) {
            _this.autoFocus();
          }
        } else {
          _this.unfixBody();
          _this.originFocusEl && _this.originFocusEl.focus();
          _this.focusAfterRender = true;
          clearTimeout(_this.removeTimer);
        }
      }
    }, _this.autoFocus = function () {
      _this.removeTimer = setTimeout(function () {
        _this.focusContent();
        _this.focusAfterRender = false;
      }, 100);
    }, _this.fixBody = function () {
      var bodyStyles = document.body.style;
      var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      _this.bodyOverflowX = bodyStyles.overflowX;
      _this.bodyOverflowY = bodyStyles.overflowY;
      _this.bodyPaddingRight = bodyStyles.paddingRight;

      bodyStyles.overflowX = bodyStyles.overflowY = 'hidden';

      /* istanbul ignore else */
      if (scrollbarWidth > 0) {
        var paddingRight = getComputedStyle(document.body).paddingRight;
        _this.root.style.paddingRight = bodyStyles.paddingRight = parseInt(paddingRight, 10) + parseInt(scrollbarWidth, 0) + 'px';
      }
    }, _this.unfixBody = function () {
      var bodyStyles = document.body.style;
      bodyStyles.overflowX = _this.bodyOverflowX;
      bodyStyles.overflowY = _this.bodyOverflowY;
      bodyStyles.paddingRight = _this.bodyPaddingRight;
      _this.root.style.paddingRight = '';
    }, _this.focusContent = function () {
      if (!_this.contentHasFocus()) {
        _this.closeIcon.focus();
      }
    }, _this.contentHasFocus = function () {
      return document.activeElement === _this.root || _this.root.contains(document.activeElement);
    }, _this.handleModalKeydown = function (e) {
      switch (e.keyCode) {
        case KEY_CODES.ESCAPE:
          _this.props.onClose(e);
          break;
        case KEY_CODES.TAB:
          _this.handleTab(e);
          break;
        default:
          break;
      }
    }, _this.handleCloseIconKeydown = function (e) {
      switch (e.keyCode) {
        case KEY_CODES.SPACE:
          _this.props.onClose(e);
          e.preventDefault();
          break;
        default:
          break;
      }
    }, _this.bindRootRef = function (ref) {
      _this.root = ref;
    }, _this.bindBoxRef = function (ref) {
      _this.box = ref;
    }, _this.bindCloseIconRef = function (ref) {
      _this.closeIcon = ref;
    }, _this.render = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          style = _this$props.style,
          title = _this$props.title,
          shown = _this$props.shown,
          onClose = _this$props.onClose,
          children = _this$props.children,
          rest = _objectWithoutProperties(_this$props, ['className', 'style', 'title', 'shown', 'onClose', 'children']);

      var classes = classnames({
        modal: true,
        'is-open': shown
      }, className);

      return React.createElement(
        'div',
        _extends({}, rest, { className: 'modal-wrap', role: 'dialog' }),
        React.createElement(
          'div',
          {
            className: classes,
            style: style,
            ref: _this.bindRootRef,
            onKeyDown: _this.handleModalKeydown
          },
          React.createElement(
            'section',
            { className: 'modal-box', ref: _this.bindBoxRef },
            React.createElement(
              'header',
              { className: 'modal-header' },
              React.createElement(
                'h3',
                { className: 'modal-title' },
                title
              ),
              React.createElement('span', {
                role: 'button',
                className: 'icon-close modal-close',
                tabIndex: '0',
                'aria-label': 'close-dialog',
                ref: _this.bindCloseIconRef,
                onClick: onClose,
                onKeyDown: _this.handleCloseIconKeydown
              })
            ),
            children
          )
        ),
        React.createElement('div', { className: 'modal-mask' })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unfixBody();
  };

  return Modal;
}(PureComponent);

export default Modal;


Modal.displayName = 'AAUIModal';
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _keyCodes = require('../shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

var _scopeTab = require('../shared/scopeTab');

var _scopeTab2 = _interopRequireDefault(_scopeTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  onClose: _propTypes.func,
  title: _propTypes.string,
  style: _propTypes.object,
  shown: _propTypes.bool,
  children: (0, _propTypes.oneOfType)([_propTypes.array, _propTypes.object, _propTypes.func, _propTypes.element])
};

var defaultProps = {
  shown: false
};

var Modal = function (_PureComponent) {
  (0, _inherits3.default)(Modal, _PureComponent);

  function Modal() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.componentDidMount = function () {
      if (_this.props.shown) {
        _this.fixBody();
        _this.autoFocus();
      }
      _this.focusAfterRender = true;
      _this.handleTab = (0, _scopeTab2.default)(_this.root);
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
        case _keyCodes2.default.ESCAPE:
          _this.props.onClose(e);
          break;
        case _keyCodes2.default.TAB:
          _this.handleTab(e);
          break;
        default:
          break;
      }
    }, _this.handleCloseIconKeydown = function (e) {
      switch (e.keyCode) {
        case _keyCodes2.default.SPACE:
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
          rest = (0, _objectWithoutProperties3.default)(_this$props, ['className', 'style', 'title', 'shown', 'onClose', 'children']);

      var classes = (0, _classnames2.default)({
        modal: true,
        'is-open': shown
      }, className);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, rest, { className: 'modal-wrap', role: 'dialog' }),
        _react2.default.createElement(
          'div',
          {
            className: classes,
            style: style,
            ref: _this.bindRootRef,
            onKeyDown: _this.handleModalKeydown
          },
          _react2.default.createElement(
            'section',
            { className: 'modal-box', ref: _this.bindBoxRef },
            _react2.default.createElement(
              'header',
              { className: 'modal-header' },
              _react2.default.createElement(
                'h3',
                { className: 'modal-title' },
                title
              ),
              _react2.default.createElement('span', {
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
        _react2.default.createElement('div', { className: 'modal-mask' })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unfixBody();
  };

  return Modal;
}(_react.PureComponent);

exports.default = Modal;


Modal.displayName = 'AAUIModal';
Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
module.exports = exports['default'];
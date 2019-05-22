'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _utils = require('../shared/utils');

var _keyCodes = require('../shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccordionPanel = function (_PureComponent) {
  (0, _inherits3.default)(AccordionPanel, _PureComponent);

  function AccordionPanel() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AccordionPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.setAccordionBodyContainer = function (container) {
      _this._container = container;
    }, _this.setWrappedComponentInstance = function (content) {
      _this._content = content;
    }, _this.setWrappedFocusInstance = function (focusNode) {
      _this._focusNode = focusNode;
    }, _this.startTransition = function () {
      if (_this._isTransitionEnd) {
        _this._isTransitionEnd = false;
        if (_this.props.active && _this._container) {
          _this._height = _this._container.offsetHeight;
          _this._container.style.height = _this._height + 'px';
        }
        return true;
      }
      return false;
    }, _this.endTransition = function () {
      _this._isTransitionEnd = true;
    }, _this.validateTransition = function (action) {
      if (_this.props.transition.trim()) {
        if (_this.startTransition()) {
          window.requestAnimationFrame(function () {
            action();
          });
        }
      } else {
        action();
      }
    }, _this.handleClick = function (index) {
      return function (e) {
        e.preventDefault();
        if (!_this.props.disabled) {
          _this.validateTransition(function () {
            _this.props.setStatus(index, !_this.props.active);
          });
        }
      };
    }, _this.handleKeyDown = function (e) {
      var _this$props = _this.props,
          index = _this$props.index,
          active = _this$props.active,
          disabled = _this$props.disabled;
      var ENTER = _keyCodes2.default.ENTER,
          SPACE = _keyCodes2.default.SPACE,
          UPARROW = _keyCodes2.default.UPARROW,
          DOWNARROW = _keyCodes2.default.DOWNARROW;

      var operationKeyCodes = [ENTER, SPACE, UPARROW, DOWNARROW];

      e.persist();
      if (operationKeyCodes.indexOf(e.keyCode) !== -1) {
        e.preventDefault();
      }
      var changeFocus = function changeFocus() {
        _this.props.onChangeFocus(index, !active, e.keyCode, _this._focusNode, disabled);
      };
      if (e.keyCode === ENTER || e.keyCode === SPACE) {
        _this.validateTransition(changeFocus);
      } else {
        changeFocus();
      }
    }, _this.handleTransitionEnd = function () {
      if (_this.props.active) {
        _this._container.style.height = 'auto';
      }
      _this.endTransition();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  AccordionPanel.prototype.componentDidMount = function componentDidMount() {
    if (this._content && this.props.transition) {
      this._height = this._content.offsetHeight;
    }
    this._isTransitionEnd = true;
    this.props.onInitChildren(this.props.index, this.props.disabled ? undefined : this._focusNode);
  };

  AccordionPanel.prototype.render = function render() {
    var _props = this.props,
        active = _props.active,
        children = _props.children,
        index = _props.index,
        complete = _props.complete,
        className = _props.className,
        title = _props.title,
        disabled = _props.disabled,
        openIcon = _props.openIcon,
        closeIcon = _props.closeIcon,
        completeIcon = _props.completeIcon;

    var transition = this.props.transition.trim();

    var iconClassName = void 0;
    if (complete) {
      iconClassName = completeIcon;
    } else {
      iconClassName = active ? closeIcon : openIcon;
    }

    var containerHeight = void 0;
    if (active) {
      containerHeight = transition ? this._height : 'auto';
    } else {
      containerHeight = 0;
    }

    return _react2.default.createElement(
      'div',
      {
        className: 'accordion ' + (active ? 'accordion--show' : '') + ' ' + (disabled ? 'accordion--disabled' : '') + ' ' + (complete ? 'accordion--complete' : '') + ' ' + (className || '')
      },
      _react2.default.createElement(
        'div',
        {
          ref: this.setWrappedFocusInstance,
          onKeyDown: this.handleKeyDown,
          tabIndex: disabled ? undefined : 0,
          className: 'accordion__header'
        },
        _react2.default.createElement(
          'div',
          { className: 'accordion__header-text' },
          title
        ),
        _react2.default.createElement(
          'div',
          { className: 'accordion__header-icon' },
          _react2.default.createElement(
            'a',
            { onClick: this.handleClick(index) },
            _react2.default.createElement('i', { className: iconClassName })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'accordion__body-container',
          style: {
            transition: '' + (transition || 'none'),
            overflow: 'hidden',
            height: containerHeight
          },
          ref: this.setAccordionBodyContainer,
          onTransitionEnd: this.handleTransitionEnd
        },
        _react2.default.createElement(
          'div',
          {
            className: 'accordion__body',
            ref: this.setWrappedComponentInstance
          },
          children
        )
      )
    );
  };

  return AccordionPanel;
}(_react.PureComponent);

AccordionPanel.propTypes = {
  className: _propTypes.string,
  children: _propTypes.node,
  onInitChildren: _propTypes.func,
  setStatus: _propTypes.func,
  index: _propTypes.number,
  transition: _propTypes.string,
  active: _propTypes.bool,
  title: _propTypes.string,
  openIcon: _propTypes.node,
  closeIcon: _propTypes.node,
  completeIcon: _propTypes.node,
  disabled: _propTypes.bool,
  complete: _propTypes.bool,
  onChangeFocus: _propTypes.func
};
AccordionPanel.defaultProps = {
  openIcon: 'icon-plus',
  closeIcon: 'icon-minus',
  completeIcon: 'icon-check',
  onInitChildren: _utils.noop,
  setStatus: _utils.noop,
  onChangeFocus: _utils.noop
};
exports.default = AccordionPanel;
module.exports = exports['default'];
'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _AccordionPanel = require('./AccordionPanel');

var _AccordionPanel2 = _interopRequireDefault(_AccordionPanel);

var _keyCodes = require('../shared/keyCodes');

var _keyCodes2 = _interopRequireDefault(_keyCodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Accordion = function (_PureComponent) {
  (0, _inherits3.default)(Accordion, _PureComponent);

  function Accordion() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Accordion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      status: {},
      focusableChildren: []
    }, _this.setStatus = function (key, active) {
      var status = (0, _extends3.default)({}, _this.state.status);

      if (_this.props.multiSelectable) {
        status[key] = active;
      } else {
        _react2.default.Children.forEach(_this.props.children, function (child, k) {
          status[k] = false;
        });
        status[key] = active;
      }
      _this.setState({
        status: status
      });
    }, _this.handleInitChildren = function (index, children) {
      if (children) {
        _this.setState({
          focusableChildren: [].concat(_this.state.focusableChildren, [children])
        });
      } else {
        _this.setState({
          focusableChildren: [].concat(_this.state.focusableChildren)
        });
      }
    }, _this.handleChildChangeFocus = function (index, active, keyCode, children, disabled) {
      var focusableChildren = _this.state.focusableChildren;
      var currentIndex = focusableChildren.indexOf(children);
      var maxIndex = focusableChildren.length - 1;

      switch (keyCode) {
        case _keyCodes2.default.ENTER:
        case _keyCodes2.default.SPACE:
          if (!disabled) {
            _this.setStatus(index, active);
          }
          break;
        case _keyCodes2.default.DOWNARROW:
          children.blur();
          focusableChildren[currentIndex + 1 >= maxIndex ? maxIndex : currentIndex + 1].focus();
          break;
        case _keyCodes2.default.UPARROW:
          children.blur();
          focusableChildren[currentIndex - 1 <= 0 ? 0 : currentIndex - 1].focus();
          break;
        default:
          break;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Accordion.prototype.render = function render() {
    var _this2 = this;

    var status = this.state.status;

    var items = [];

    _react2.default.Children.map(this.props.children, function (child, key) {
      var item = _react2.default.cloneElement(child, {
        key: key,
        index: key,
        active: status[key] !== undefined ? status[key] : child.props.active,
        transition: _this2.props.transition,
        onInitChildren: _this2.handleInitChildren,
        setStatus: _this2.setStatus,
        onChangeFocus: _this2.handleChildChangeFocus
      });

      items.push(item);
    });
    return _react2.default.createElement(
      'div',
      { className: 'accordion-group ' + (this.props.className || '') },
      items
    );
  };

  return Accordion;
}(_react.PureComponent);

Accordion.propTypes = {
  className: _propTypes.string,
  children: _propTypes.node,
  multiSelectable: _propTypes.bool,
  transition: _propTypes.string
};
Accordion.defaultProps = {
  multiSelectable: false,
  transition: 'height 0.2s ease'
};
exports.default = Accordion;


Accordion.Panel = _AccordionPanel2.default;
module.exports = exports['default'];
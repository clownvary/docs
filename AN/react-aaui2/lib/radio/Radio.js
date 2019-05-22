'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperties = require('babel-runtime/core-js/object/define-properties');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _RadioComponent = require('./RadioComponent');

var _RadioComponent2 = _interopRequireDefault(_RadioComponent);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function (_Component) {
  (0, _inherits3.default)(Radio, _Component);

  function Radio() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Radio);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.setRef = function (radioComponent) {
      _this.radioComponent = radioComponent;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  Radio.prototype.componentDidMount = function componentDidMount() {
    (0, _defineProperties2.default)(this, {
      checked: {
        get: function get() {
          return this.radioComponent.checked;
        },
        set: function set(v) {
          this.radioComponent.checked = !!v;
        }
      }
    });
  };

  Radio.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        rest = (0, _objectWithoutProperties3.default)(_props, ['children']);
    var auiRadioGroup = this.context.auiRadioGroup;

    // Proxy `onChange`, `checked` and `disabled` to `auiRadioGroup`

    if (auiRadioGroup) {
      rest.onChange = auiRadioGroup.onChange;
      rest.checked = this.props.value === auiRadioGroup.value;
      rest.disabled = this.props.disabled || auiRadioGroup.disabled;
      rest.size = this.props.size || auiRadioGroup.size;
      rest.name = this.props.name || auiRadioGroup.name;
    }

    return _react2.default.createElement(
      _RadioComponent2.default,
      (0, _extends3.default)({ ref: this.setRef }, rest),
      children
    );
  };

  return Radio;
}(_react.Component);

Radio.displayName = 'AUIRadio';
Radio.propTypes = {
  value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]),
  disabled: _propTypes.bool,
  size: _propTypes.string,
  name: _propTypes.string,
  children: _propTypes.node,
  onChange: _propTypes.func
};
Radio.defaultProps = {
  onChange: _utils.identity
};
Radio.contextTypes = {
  auiRadioGroup: _propTypes.object };
exports.default = Radio;
module.exports = exports['default'];
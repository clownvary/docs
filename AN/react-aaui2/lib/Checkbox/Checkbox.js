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

var _CheckboxComponent = require('./CheckboxComponent');

var _CheckboxComponent2 = _interopRequireDefault(_CheckboxComponent);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function (_Component) {
  (0, _inherits3.default)(Checkbox, _Component);

  function Checkbox() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.setRef = function (checkboxComponent) {
      _this.checkboxComponent = checkboxComponent;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  // Support legacy API for `this.refs.checkbox.checked`
  // It's not recommended because it breaks component encapsulation and
  // it violates the unidirectional data flow for React
  Checkbox.prototype.componentDidMount = function componentDidMount() {
    (0, _defineProperties2.default)(this, {
      checked: {
        get: function get() {
          return this.checkboxComponent.checked;
        },
        set: function set(v) {
          this.checkboxComponent.checked = !!v;
        }
      }
    });
  };

  Checkbox.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        rest = (0, _objectWithoutProperties3.default)(_props, ['children']);
    var auiCheckboxGroup = this.context.auiCheckboxGroup;

    // Proxy `onChange`, `checked` and `disabled` to `auiCheckboxGroup`

    if (auiCheckboxGroup) {
      rest.onChange = auiCheckboxGroup.onChange;
      rest.checked = auiCheckboxGroup.value && auiCheckboxGroup.value.indexOf(this.props.value) !== -1;
      rest.disabled = this.props.disabled || auiCheckboxGroup.disabled;
      rest.size = this.props.size || auiCheckboxGroup.size;
      rest.name = this.props.name || auiCheckboxGroup.name;
    }

    return _react2.default.createElement(
      _CheckboxComponent2.default,
      (0, _extends3.default)({ ref: this.setRef }, rest),
      children
    );
  };

  return Checkbox;
}(_react.Component);

Checkbox.displayName = 'AUICheckbox';
Checkbox.propTypes = {
  disabled: _propTypes.bool,
  size: _propTypes.string,
  name: _propTypes.string,
  children: _propTypes.node,
  onChange: _propTypes.func,
  value: _propTypes.any // eslint-disable-line
};
Checkbox.defaultProps = {
  onChange: _utils.identity
};
Checkbox.contextTypes = {
  auiCheckboxGroup: _propTypes.object };
exports.default = Checkbox;
module.exports = exports['default'];
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);

var _CheckboxComponent = require('./CheckboxComponent');var _CheckboxComponent2 = _interopRequireDefault(_CheckboxComponent);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                            * Default PropTypes of Checkbox.
                                                                                                                                                                                                                           */
var CheckboxPropTypes = {
  /**
                           * Determines enable/disable state.
                           */
  disabled: _propTypes.bool,
  /**
                              * Determines the Checkbox size.
                              */
  size: _propTypes.string,
  /**
                            * Field name.
                            */
  name: _propTypes.string,
  /**
                            * Child nodes.
                            */
  children: _propTypes.node,
  /**
                              * Fires when value change.
                             */
  onChange: _propTypes.func,
  /**
                              * Checkbox value.
                              */
  value: _propTypes.any // eslint-disable-line
};

var CheckboxProps = {
  onChange: _identity2.default };


/** UI component of Checkbox */var
Checkbox = function (_Component) {(0, _inherits3.default)(Checkbox, _Component);function Checkbox() {(0, _classCallCheck3.default)(this, Checkbox);return (0, _possibleConstructorReturn3.default)(this, (Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).apply(this, arguments));}(0, _createClass3.default)(Checkbox, [{ key: 'componentDidMount',








    // Support legacy API for `this.refs.checkbox.checked`
    // It's not recommended because it breaks component encapsulation and
    // it violates the unidirectional data flow for React
    value: function componentDidMount() {
      (0, _defineProperties2.default)(this, {
        checked: {
          get: function get() {
            return this.checkboxComponent.checked;
          },
          set: function set(v) {
            this.checkboxComponent.checked = !!v;
          } } });


    } }, { key: 'render', value: function render()

    {var _this2 = this;var _props =
      this.props,children = _props.children,rest = (0, _objectWithoutProperties3.default)(_props, ['children']);var
      auiCheckboxGroup = this.context.auiCheckboxGroup;

      // Proxy `onChange`, `checked` and `disabled` to `auiCheckboxGroup`
      if (auiCheckboxGroup) {
        rest.onChange = auiCheckboxGroup.onChange;
        rest.checked =
        auiCheckboxGroup.value &&
        auiCheckboxGroup.value.indexOf(this.props.value) !== -1;
        rest.disabled = this.props.disabled || auiCheckboxGroup.disabled;
        rest.size = this.props.size || auiCheckboxGroup.size;
        rest.name = this.props.name || auiCheckboxGroup.name;
      }

      return (
        _react2.default.createElement(_CheckboxComponent2.default, (0, _extends3.default)({
            ref: function ref(c) {_this2.checkboxComponent = c;} },
          rest),

          children));


    } }]);return Checkbox;}(_react.Component);Checkbox.displayName = 'Checkbox';Checkbox.propTypes = CheckboxPropTypes;Checkbox.defaultProps = CheckboxProps;Checkbox.contextTypes = { auiCheckboxGroup: _propTypes.object };exports.default =


Checkbox;module.exports = exports['default'];
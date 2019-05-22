'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);

var _RadioComponent = require('./RadioComponent');var _RadioComponent2 = _interopRequireDefault(_RadioComponent);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of Radio.
                                                                                                                                                                                                                * @memberof Radio
                                                                                                                                                                                                               */
var RadioPropTypes = {
  /** Radio value.
                        * @type {string|number}
                        */
  value: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.number]),
  /** Determines enable/disable state.
                                                                             * @type {boolean}
                                                                             */
  disabled: _propTypes.bool,
  /** Determines the Radio size.
                              * @type {Size}
                              */
  size: _propTypes.string,
  /** Field name.
                            * @type {string}
                            */
  name: _propTypes.string,
  /** Child nodes.
                            * @type {node}
                            */
  children: _propTypes.node,
  /**  Fires when value change.
                              * @event
                              * @type {func}
                             */
  onChange: _propTypes.func };


var RadioProps = {
  onChange: _identity2.default };


/** UI component of Radio */var
Radio = function (_Component) {(0, _inherits3.default)(Radio, _Component);function Radio() {var _ref;var _temp, _this, _ret;(0, _classCallCheck3.default)(this, Radio);for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Radio.__proto__ || (0, _getPrototypeOf2.default)(Radio)).call.apply(_ref, [this].concat(args))), _this), _this.
























    setRef = function (radioComponent) {
      _this.radioComponent = radioComponent;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);}(0, _createClass3.default)(Radio, [{ key: 'componentDidMount', // Support legacy API for `this.refs.checkbox.checked`
    // It's not recommended because it breaks component encapsulation and
    // it violates the unidirectional data flow for React
    value: function componentDidMount() {(0, _defineProperties2.default)(this, { checked: { get: function get() {return this.radioComponent.checked;}, set: function set(v) {this.radioComponent.checked = !!v;} } });} }, { key: 'render', value: function render() {var _props = this.props,children = _props.children,rest = (0, _objectWithoutProperties3.default)(_props, ['children']);var
      auiRadioGroup = this.context.auiRadioGroup;

      // Proxy `onChange`, `checked` and `disabled` to `auiRadioGroup`
      if (auiRadioGroup) {
        rest.onChange = auiRadioGroup.onChange;
        rest.checked = this.props.value === auiRadioGroup.value;
        rest.disabled = this.props.disabled || auiRadioGroup.disabled;
        rest.size = this.props.size || auiRadioGroup.size;
        rest.name = this.props.name || auiRadioGroup.name;
      }

      return (
        _react2.default.createElement(_RadioComponent2.default, (0, _extends3.default)({ ref: this.setRef }, rest),
          children));


    } }]);return Radio;}(_react.Component);Radio.displayName = 'Radio';Radio.propTypes = RadioPropTypes;Radio.defaultProps = RadioProps;Radio.contextTypes = { auiRadioGroup: _propTypes.object };exports.default =


Radio;module.exports = exports['default'];
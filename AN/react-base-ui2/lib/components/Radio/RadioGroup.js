'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');









var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);

var _Radio = require('./Radio');var _Radio2 = _interopRequireDefault(_Radio);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of  RadioGroup.
                                                                                                                                                                            * @memberof RadioGroup
                                                                                                                                                                           */
var RadioGroupPropTypes = {
  /** Determines the enable/disable state.
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
  /** Customize CSS class name.
                            * @type {string}
                            */
  className: _propTypes.string,
  /**  Fires when value change.
                                 * @event
                                 * @type {func}
                                */
  onChange: _propTypes.func,
  /** Array of child items. Each item is a text/value pair.
                              * @type {object}
                              */
  data: (0, _propTypes.arrayOf)(
  (0, _propTypes.shape)({
    text: _propTypes.string.isRequired,
    value: _propTypes.any.isRequired // eslint-disable-line
  })),

  /** Child node
        * @type {node}
        */
  children: _propTypes.node,
  /** Value of radio group.
                              * @type {any}
                              */
  value: _propTypes.any, // eslint-disable-line
  /** Radio group value in default state.
   * @type {any}
   */
  defaultValue: _propTypes.any // eslint-disable-line
};

var RadioGroupProps = {
  onChange: _identity2.default };


/** UI component that displays a group of Radio. */var
RadioGroup = function (_PureComponent) {(0, _inherits3.default)(RadioGroup, _PureComponent);








  function RadioGroup(props) {(0, _classCallCheck3.default)(this, RadioGroup);var _this = (0, _possibleConstructorReturn3.default)(this, (RadioGroup.__proto__ || (0, _getPrototypeOf2.default)(RadioGroup)).call(this,
    props));_initialiseProps.call(_this);

    var value = void 0;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }

    _this.state = {
      value: value };return _this;

  }(0, _createClass3.default)(RadioGroup, [{ key: 'getChildContext', value: function getChildContext()

    {
      return {
        auiRadioGroup: {
          onChange: this.onChange,
          value: this.state.value,
          disabled: this.props.disabled,
          size: this.props.size,
          name: this.props.name } };


    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value });

      }
    } }, { key: 'render', value: function render()














    {var _props =
      this.props,className = _props.className,data = _props.data;
      var classes = (0, _classnames2.default)('radio-group', className);
      var children = this.props.children;

      if (data) {
        children = data.map(function (_ref, index) {var text = _ref.text,value = _ref.value,rest = (0, _objectWithoutProperties3.default)(_ref, ['text', 'value']);return (
            _react2.default.createElement(_Radio2.default, (0, _extends3.default)({ key: value + '_' + index, value: value }, rest),
              text));});


      }

      return _react2.default.createElement('div', { className: classes }, children);
    } }]);return RadioGroup;}(_react.PureComponent);RadioGroup.displayName = 'RadioGroup';RadioGroup.propTypes = RadioGroupPropTypes;RadioGroup.defaultProps = RadioGroupProps;RadioGroup.childContextTypes = { auiRadioGroup: _propTypes.object };var _initialiseProps = function _initialiseProps() {var _this2 = this;this.onChange = function (e) {var value = e.target.value;var onChange = _this2.props.onChange;if (!('value' in _this2.props)) {_this2.setState({ value: value });}onChange(e);};};exports.default =


RadioGroup;module.exports = exports['default'];
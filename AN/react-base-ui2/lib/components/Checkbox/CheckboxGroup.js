'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');










var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);

var _Checkbox = require('./Checkbox');var _Checkbox2 = _interopRequireDefault(_Checkbox);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/** Default PropTypes of  CheckboxGroup.
                                                                                                                                                                                        * @memberof CheckboxGroup
                                                                                                                                                                                       */
var CheckboxGroupPropTypes = {
  /**
                                * Determines the enable/disable state.
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
                            * Customize CSS class name.
                            */
  className: _propTypes.string,
  /**
                                 * Fires when value change.
                                 */
  onChange: _propTypes.func,
  /**
                              * Array of child items. Each item is a text/value pair.
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
  /**
                              * Array of checked value.
                              */
  value: _propTypes.array, // eslint-disable-line
  /**
   * Array of checked value in default state.
   */
  defaultValue: _propTypes.array // eslint-disable-line
};

var CheckboxGroupProps = {
  onChange: _identity2.default };


/** UI component that displays a group of Checkbox. */var
CheckboxGroup = function (_PureComponent) {(0, _inherits3.default)(CheckboxGroup, _PureComponent);








  function CheckboxGroup(props) {(0, _classCallCheck3.default)(this, CheckboxGroup);var _this = (0, _possibleConstructorReturn3.default)(this, (CheckboxGroup.__proto__ || (0, _getPrototypeOf2.default)(CheckboxGroup)).call(this,
    props));_initialiseProps.call(_this);

    var value = [];
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }

    _this.state = {
      value: value };return _this;

  }(0, _createClass3.default)(CheckboxGroup, [{ key: 'getChildContext', value: function getChildContext()

    {
      return {
        auiCheckboxGroup: {
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
      var classes = (0, _classnames2.default)('checkbox-group', className);
      var children = this.props.children;

      if (data) {
        children = data.map(function (_ref, index) {var text = _ref.text,value = _ref.value,rest = (0, _objectWithoutProperties3.default)(_ref, ['text', 'value']);return (
            _react2.default.createElement(_Checkbox2.default, (0, _extends3.default)({ key: index, value: value }, rest),
              text));});


      }

      return _react2.default.createElement('div', { className: classes }, children);
    } }]);return CheckboxGroup;}(_react.PureComponent);CheckboxGroup.displayName = 'CheckboxGroup';CheckboxGroup.propTypes = CheckboxGroupPropTypes;CheckboxGroup.defaultProps = CheckboxGroupProps;CheckboxGroup.childContextTypes = { auiCheckboxGroup: _propTypes.object };var _initialiseProps = function _initialiseProps() {var _this2 = this;this.onChange = function (e, _ref2) {var optionValue = _ref2.value; // Should construct one new array for re-rendering
    var value = [].concat((0, _toConsumableArray3.default)(_this2.state.value));var onChange = _this2.props.onChange;var index = value.indexOf(optionValue);if (index === -1) {// If NOT found, then add it
      value.push(optionValue);} else {// If found, then delete it
      value.splice(index, 1);}if (!('value' in _this2.props)) {_this2.setState({ value: value });}onChange(value);};};exports.default = CheckboxGroup;module.exports = exports['default'];
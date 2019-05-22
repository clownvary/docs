'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _classnames = require('classnames');var _classnames2 = _interopRequireDefault(_classnames);
var _fill = require('lodash/fill');var _fill2 = _interopRequireDefault(_fill);
var _isInteger = require('lodash/isInteger');var _isInteger2 = _interopRequireDefault(_isInteger);
var _flatten = require('lodash/flatten');var _flatten2 = _interopRequireDefault(_flatten);

var _Input = require('../Input');var _Input2 = _interopRequireDefault(_Input);
var _MaskFormatter = require('./utils/MaskFormatter');var _MaskFormatter2 = _interopRequireDefault(_MaskFormatter);
var _getPureNumber = require('./utils/getPureNumber');var _getPureNumber2 = _interopRequireDefault(_getPureNumber);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                  * Default PropTypes for InputBankCard
                                                                                                                                                                                                                  */
var InputBankCardPropTypes = {
  /**
                                * A list of class names to pass along to the container element of component.
                                * Default value is "".
                                */
  className: _propTypes2.default.string,
  /**
                                          * Externally exposed value.
                                          * Default value is null.
                                          */
  value: _propTypes2.default.string,
  /**
                                      * Set the length of a group's numbers.
                                      * Default value is 4.
                                      */
  group: _propTypes2.default.number,
  /**
                                      * Set the length of numbers that are allowed to enter.
                                      * Default is 16.
                                      */
  maxLength: _propTypes2.default.number,
  /**
                                          * Determines the delimiter between each group.
                                          */
  gapChar: _propTypes2.default.string,
  /**
                                        * Determines the prompt character displaying.
                                        */
  showPrompt: _propTypes2.default.bool,
  /**
                                         * Determines the number only can be inserted at empty position.
                                         */
  keepPosition: _propTypes2.default.bool,
  /**
                                           * The callback function that is triggered when changes the number.
                                           */
  onInput: _propTypes2.default.func };


var InputBankCardProps = {
  className: '',
  group: 4,
  maxLength: 16,
  gapChar: ' ',
  showPrompt: false,
  keepPosition: false,
  value: '' };


/**
                * @description
                * The module includes the blow points:
                *
                * 1. Automatic recognition some types of credit-card:
                *    Visa, MasterCard, American Express, Diners Club, Discover, JCB.
                * 2. Automatic formatting the card number,
                * 3. Default set 4 digits number as a group, the user can set the number'length of the group,
                * 4. Groups are separated by spaces.
                *
                * @class
                */var
InputBankCard = function (_React$Component) {(0, _inherits3.default)(InputBankCard, _React$Component);




  function InputBankCard(props) {(0, _classCallCheck3.default)(this, InputBankCard);var _this = (0, _possibleConstructorReturn3.default)(this, (InputBankCard.__proto__ || (0, _getPrototypeOf2.default)(InputBankCard)).call(this,
    props));_this.

























































































    handleChange = function (e) {
      var input = e.target;var _this$props =
      _this.props,onChange = _this$props.onChange,onInput = _this$props.onInput;var _this$maskFormatter$e =


      _this.maskFormatter.execute(input.value, _this.preValue, input.selectionStart),value = _this$maskFormatter$e.value,caretPosition = _this$maskFormatter$e.caretPosition;

      _this.preValue = value;
      input.value = value;

      // istanbul ignore if
      if (input.setSelectionRange) {
        input.setSelectionRange(caretPosition, caretPosition);
      }

      var pureValue = (0, _getPureNumber2.default)(value);

      onChange && onChange(e, value, pureValue);
      onInput && onInput(e, value, pureValue);
    };_this.preValue = '';return _this;}(0, _createClass3.default)(InputBankCard, [{ key: 'componentDidMount', value: function componentDidMount() {this.maskFormatter = this.getMaskFormatter();this.update();} }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(nextProps) {var needUpdate = false;if (nextProps.maxLength !== this.props.maxLength || nextProps.group !== this.props.group || nextProps.gapChar !== this.props.gapChar) {var mask = this.getMask(nextProps.group, nextProps.maxLength, nextProps.gapChar);this.maskFormatter.mask = mask;needUpdate = true;}if (nextProps.showPrompt !== this.props.showPrompt) {this.maskFormatter.showPrompt = nextProps.showPrompt;needUpdate = true;}if (nextProps.keepPosition !== this.props.keepPosition) {this.maskFormatter.keepPosition = nextProps.keepPosition;needUpdate = true;} // istanbul ignore else
      if (needUpdate) {this.maskFormatter.template = this.maskFormatter.getTemplate();this.update(this.preValue);}} }, { key: 'getMaskFormatter', value: function getMaskFormatter() {// istanbul ignore else
      if (!this.maskFormatter) {this.maskFormatter = this.createMaskFormatter();}return this.maskFormatter;} }, { key: 'getMask', value: function getMask() {var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.group;var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.maxLength;var gapChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.gapChar;group = group || 0;if (!maxLength) {return [];}if (!group || !gapChar) {return (0, _fill2.default)(Array(maxLength), /\d/);}var average = maxLength / group;var averageInteger = parseInt(average, 10);var gapCount = average > averageInteger ? averageInteger : averageInteger - 1;return (0, _flatten2.default)((0, _fill2.default)(Array(maxLength + gapCount), /\d/).map(function (item, i) {return (0, _isInteger2.default)((i + 1) / (group + 1)) ? gapChar.split('') : item;}));} }, { key: 'update', value: function update(value) {value = value === undefined ? this.props.value : value;var _maskFormatter$execut = this.maskFormatter.execute(value, this.preValue, value.length),_value = _maskFormatter$execut.value;this.preValue = _value;this.input.input.value = _value;} }, { key: 'createMaskFormatter', value: function createMaskFormatter() {var _props = this.props,showPrompt = _props.showPrompt,keepPosition = _props.keepPosition;var mask = this.getMask();return new _MaskFormatter2.default({ mask: mask, showPrompt: showPrompt, keepPosition: keepPosition });} }, { key: 'render', value: function render() {var _this2 = this;var _props2 =



      this.props,className = _props2.className,rest = (0, _objectWithoutProperties3.default)(_props2, ['className']);

      // Delete the default attribute maxLength of the Input,
      // The maxLength of the InputBankCard is controlled by function `formatCardNumber`
      delete rest.value;
      delete rest.group;
      delete rest.gapChar;
      delete rest.maxLength;
      delete rest.showPrompt;
      delete rest.keepPosition;

      return (
        _react2.default.createElement('div', { className: (0, _classnames2.default)('input-bank-card-base', className) },
          _react2.default.createElement(_Input2.default, (0, _extends3.default)({},
          rest, {
            className: className,
            type: 'text',
            ref: function ref(_ref) {return _this2.input = _ref;},
            value: this.preValue,
            onInput: function onInput(e) {return _this2.handleChange(e);} }))));



    } }]);return InputBankCard;}(_react2.default.Component);InputBankCard.displayName = 'InputBankCard';InputBankCard.propTypes = InputBankCardPropTypes;InputBankCard.defaultProps = InputBankCardProps;exports.default = InputBankCard;module.exports = exports['default'];
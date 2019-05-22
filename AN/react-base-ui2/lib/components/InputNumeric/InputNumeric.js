'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.InputNumericProps = exports.NUM_MAX = exports.NUM_MIN = undefined;var _defineProperties = require('babel-runtime/core-js/object/define-properties');var _defineProperties2 = _interopRequireDefault(_defineProperties);var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _get2 = require('babel-runtime/helpers/get');var _get3 = _interopRequireDefault(_get2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);
var _propTypes = require('prop-types');var _propTypes2 = _interopRequireDefault(_propTypes);
var _identity = require('lodash/identity');var _identity2 = _interopRequireDefault(_identity);
var _isNil = require('lodash/isNil');var _isNil2 = _interopRequireDefault(_isNil);
var _isBoolean = require('lodash/isBoolean');var _isBoolean2 = _interopRequireDefault(_isBoolean);
var _isString = require('lodash/isString');var _isString2 = _interopRequireDefault(_isString);
var _isNumber = require('lodash/isNumber');var _isNumber2 = _interopRequireDefault(_isNumber);
var _isEmpty = require('lodash/isEmpty');var _isEmpty2 = _interopRequireDefault(_isEmpty);
var _findIndex = require('lodash/findIndex');var _findIndex2 = _interopRequireDefault(_findIndex);
var _toString = require('lodash/toString');var _toString2 = _interopRequireDefault(_toString);
var _map = require('lodash/map');var _map2 = _interopRequireDefault(_map);
var _InputBase2 = require('../InputBase');
var _NumericTextProvider = require('./NumericTextProvider');var _NumericTextProvider2 = _interopRequireDefault(_NumericTextProvider);
var _NumericType = require('../../consts/NumericType');var NumericType = _interopRequireWildcard(_NumericType);
var _browser = require('../../utils/browser');var _browser2 = _interopRequireDefault(_browser);
var _charValidator = require('../../utils/charValidator');
var _consts = require('../../consts');function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

bool = _propTypes2.default.bool,string = _propTypes2.default.string,number = _propTypes2.default.number,oneOfType = _propTypes2.default.oneOfType,func = _propTypes2.default.func;
var NUM_MIN = exports.NUM_MIN = -9999999999.99;
var NUM_MAX = exports.NUM_MAX = 9999999999.99;

/* eslint no-continue: 0 */
/* eslint default-case: 0 */

/** Default PropTypes of InputNumeric.
                              * @memberof InputNumeric
                              * @augments InputBase
                             */
var InputNumericPropTypes = {
  /** The type of the InputNumeric.
                               * @type {NumericType}
                              */
  type: string,
  /** The current value.
                 * @type {string|number|boolean}
                */
  value: oneOfType([string, number, bool]),
  /** Determines the minimal value that can be entered.
                                             * @type {number}
                                            */
  min: number,
  /** Determines the maximum value that can be entered.
                * @type {number}
               */
  max: number,
  /** Indicates whether the thousands group separator will be inserted between  each digital group.
                * (number of digits in thousands group depends on the selected Culture)
                * @type {boolean}
               */
  showGroup: bool,
  /** Indicates the custom setting for decimal places to display.
                    * @type {number}
                   */
  decimals: number,
  /** Determines how much to increase/decrease the input field.
                     * @type {number}
                    */
  increment: number,
  /** Allow increment or decrement by typing the up or down keys.
                      * @type {boolean}
                     */
  allowKeySpin: bool,
  /** Determines the left or right alignment of text.
                       * @type {string}
                      */
  textAlign: string,
  /** A function called when the value of the input is changed.
                      * @type {func}
                     */
  onValueChange: func,
  /** Determines whether blank text is displayed after selecting all and pressing delete.
                        * @type {boolean}
                       */
  allowBlank: bool,
  listClass: string };


/** Default Props for InputNumeric class */
var InputNumericProps = (0, _extends3.default)({},
_InputBase2.InputBaseProps, {
  type: NumericType.NUMBER,
  value: null,
  min: NUM_MIN,
  max: NUM_MAX,
  showGroup: false,
  decimals: 2,
  increment: 1,
  allowKeySpin: true,
  textAlign: 'right',
  onValueChange: _identity2.default,
  allowBlank: true,
  listClass: 'input-numeric-list' });


/** InputNumeric component allows you to input numeric values only.
                                       *
                                       * InputNumeric has 3 types of style: they are: 'number', 'currency' and 'percent'.
                                       *
                                       * This can be determined by changing the type prop.
                                       */var
InputNumeric = function (_InputBase) {(0, _inherits3.default)(InputNumeric, _InputBase);function InputNumeric() {(0, _classCallCheck3.default)(this, InputNumeric);return (0, _possibleConstructorReturn3.default)(this, (InputNumeric.__proto__ || (0, _getPrototypeOf2.default)(InputNumeric)).apply(this, arguments));}(0, _createClass3.default)(InputNumeric, [{ key: 'componentDidMount', value: function componentDidMount()




    {
      this.silence = true;
      (0, _get3.default)(InputNumeric.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputNumeric.prototype), 'componentDidMount', this).call(this);

      (0, _defineProperties2.default)(this, {
        value: {
          get: function get() {
            /* istanbul ignore next */
            return this.textProvider ? this.getValue() : this.input.value;
          },
          set: function set(v) {
            this.setValue(v);
          } } });var




      value =
      this.props.value;

      if (!(0, _isNil2.default)(value)) {
        this.setValue(value);
      }

      this.updateWCAG();
      this.silence = false;
    } }, { key: 'createTextProvider', value: function createTextProvider()

    {
      var tp = new _NumericTextProvider2.default(this.props);var
      value = this.props.value;
      if ((0, _isNil2.default)(value)) {
        tp.isBlank = true;
      }

      return tp;
    } }, { key: 'updateCultureContext', value: function updateCultureContext(

    propName, propValue) {
      var value = this.getValue();
      if (propName) {
        this.textProvider[propName] = propValue;
      }
      this.textProvider.updateCultureContext();
      this.setValue(value, true);
    } }, { key: 'componentWillReceiveProps', value: function componentWillReceiveProps(

    nextProps, nextContext) {
      (0, _get3.default)(InputNumeric.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputNumeric.prototype), 'componentWillReceiveProps', this).call(this, nextProps, nextContext);

      if (nextProps.min !== this.props.min || nextProps.max !== this.props.max) {
        this.updateRange(nextProps.min, nextProps.max);
      }

      if (nextProps.decimals !== this.props.decimals) {
        this.updateCultureContext('decimals', nextProps.decimals);
      }

      if (nextProps.showGroup !== this.props.showGroup) {
        this.updateCultureContext('showGroup', nextProps.showGroup);
      }

      if (nextProps.locale !== this.props.locale) {
        this.updateCultureContext();
      }

      if (nextProps.value !== this.props.value) {
        this.setValue(nextProps.value);
      } else {
        var currentValue = this.textProvider.getValue();
        /* istanbul ignore else */
        if ((0, _isNumber2.default)(currentValue)) {
          /* istanbul ignore else */
          if ((0, _isNumber2.default)(nextProps.min) && currentValue < nextProps.min ||
          (0, _isNumber2.default)(nextProps.max) && currentValue > nextProps.max) {
            this.setValue(currentValue);
          }
        }
      }
    } }, { key: 'updateWCAG', value: function updateWCAG()

    {
      /* istanbul ignore next */var _props =



      this.props,_props$min = _props.min,min = _props$min === undefined ? NUM_MIN : _props$min,_props$max = _props.max,max = _props$max === undefined ? NUM_MAX : _props$max;

      // in case string is passed
      min *= 1;
      max *= 1;

      this.input.setAttribute('aria-valuemin', min);
      this.input.setAttribute('aria-valuemax', max);
      this.input.setAttribute('aria-valuenow', this.textProvider.getValue());
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()

    {
      this.updateWCAG();
    } }, { key: 'isDegradeMode', value: function isDegradeMode()

    {
      return _browser2.default.android;
    } }, { key: 'getContainerClassName', value: function getContainerClassName()

    {
      return _consts.DefaultCSSPrefix + '-input-numeric';
    } }, { key: 'onKeyPressPreview', value: function onKeyPressPreview(

    ch) {
      var tp = this.textProvider;
      var cc = tp.getCultureContext();
      var decSep = cc.decimalSep;
      var isBlank = tp.isBlank;
      var txt = void 0;
      var decPos = void 0;
      var curPos = void 0;

      /* istanbul ignore if */
      if (this.isDegradeMode()) {
        if (ch && ch.length === 1) {
          if ((0, _charValidator.isDigit)(ch) ||
          ch === '.' ||
          ch === decSep ||
          ch === cc.percentSymbol ||
          ch === cc.currencySymbol ||
          ch === '+' ||
          ch === '-') {
            return false;
          }
        }

        return true;
      }

      switch (ch) {
        case cc.percentSymbol:
        case cc.currencySymbol:
          return true;

        case '.':
        case decSep:
          if (!isBlank) {
            txt = tp.getText();
            decPos = txt.indexOf(decSep) + 1;
            curPos = txt.length;
            if (this.selection.start !== this.selection.end || this.selection.start !== decPos) {
              // This is selection or cursor not behind the decimal point
              curPos = decPos;
            } else {
              // Invers the cursor before the decimal point
              curPos = decPos - 1;
            }

            this.select({ start: curPos, end: curPos });
          }
          return true;
        case '+':
          if (!tp.isZero() && !isBlank) {
            if (tp.toPositive()) {
              curPos = Math.max(0, this.selection.start - 1);
              (0, _get3.default)(InputNumeric.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputNumeric.prototype), 'updateText', this).call(this, { start: curPos, end: curPos });
            }
          }
          return true;
        case '-':
        case '(':
        case ')':
          if (!tp.isZero() && !isBlank) {
            tp.invertSign();
            if (tp.isNegative()) {
              curPos = this.selection.start + 1;
            } else {
              curPos = Math.max(0, this.selection.start - 1);
            }
            (0, _get3.default)(InputNumeric.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputNumeric.prototype), 'updateText', this).call(this, { start: curPos, end: curPos });
          }
          return true;
        default:
          break;}


      if (ch && ch.length === 1 && !(0, _charValidator.isDigit)(ch)) {
        return true;
      }

      return false;
    } }, { key: 'forceToRange', value: function forceToRange()

    {var _props2 =
      this.props,min = _props2.min,max = _props2.max;
      min *= 1;
      max *= 1;

      var value = this.getValue();
      if (value < min) {
        this.setValue(min);
      } else if (value > max) {
        this.setValue(max);
      }
    } }, { key: 'onInputBlur', value: function onInputBlur(

    e) {
      this.syncText();
      this.forceToRange();
      e.value = this.getValue();
      (0, _get3.default)(InputNumeric.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputNumeric.prototype), 'onInputBlur', this).call(this, e);
    } }, { key: 'onIMEBreakThrough', value: function onIMEBreakThrough()

    {
      var selection = this.getSelection();
      var isBlank = this.isBlank();
      this.syncText();
      if (isBlank) {
        this.resetCursor();
      } else {
        this.select(selection);
      }
    } }, { key: 'getDecimalPos', value: function getDecimalPos()

    {
      var decimal = this.input.value.indexOf('.');
      if (decimal === -1) {
        decimal = this.input.value.length;
      }

      return decimal;
    } }, { key: 'resetCursor', value: function resetCursor()

    {
      var decimal = this.getDecimalPos();
      var selRange = { start: decimal, end: decimal };
      this.select(selRange);
    } }, { key: 'deleteSelection', value: function deleteSelection(

    backSpace) {
      if (!this.allowEdit()) {return;}

      var isSelectAll = this.isSelectAll();var
      allowBlank = this.props.allowBlank;
      if (isSelectAll && allowBlank) {
        this.textProvider.setText('');
        this.textProvider.isBlank = true;
        this.updateText();
        return;
      }

      (0, _get3.default)(InputNumeric.prototype.__proto__ || (0, _getPrototypeOf2.default)(InputNumeric.prototype), 'deleteSelection', this).call(this, backSpace);

      if (isSelectAll) {
        this.resetCursor();
      }
    } }, { key: 'onTextChange', value: function onTextChange()

    {
      this.onValueChange();
    } }, { key: 'onValueChange', value: function onValueChange()

    {var _props3 =
      this.props,min = _props3.min,max = _props3.max;

      var val = this.getValue();
      if ((0, _toString2.default)(val) !== (0, _toString2.default)(this.preValue)) {
        this.preValue = val;
        this.input.setAttribute('aria-valuenow', val);
        var outOfRange = val < min * 1 || val > max * 1;

        this.triggerEvent('onValueChange', {
          value: val,
          outOfRange: outOfRange });


        this.setState({
          stateClassName: outOfRange ? 'state-out-of-range' : '' });

      }
    } }, { key: 'getValue', value: function getValue()

    {
      var tp = this.textProvider;
      var value = tp.getValue();var
      type = this.props.type;
      if (type === NumericType.PERCENT) {
        value = this.fromPercentValue(value);
      }

      return value;
    } }, { key: 'toPercentValue', value: function toPercentValue(

    value) {
      value *= 100;
      return value.toFixed(2) * 1;
    } }, { key: 'fromPercentValue', value: function fromPercentValue(

    value) {
      value /= 100;
      var cc = this.textProvider.getCultureContext();
      if (cc.decimals >= 0) {
        var txtValue = value.toFixed(cc.decimals + 2);
        value = txtValue * 1;
      }
      return value;
    } }, { key: 'setValue', value: function setValue(

    value) {var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      try {
        if ((0, _isBoolean2.default)(value)) {
          value = value ? 1 : 0;
        } else if ((0, _isString2.default)(value)) {
          value = this.textProvider.safeParse(value);
        }var

        type = this.props.type;
        if (type === NumericType.PERCENT) {
          value = this.toPercentValue(value);
        }

        value *= 1;
        var txtValue = '' + value;

        if (value === this.textProvider.getValue() && !force) {
          return true;
        }

        if (this.textProvider.setValue(value)) {
          this.updateText();
        } else {
          this.setText(txtValue);
        }

        return true;
      } catch (e) {
        return false;
      }
    } }, { key: 'updateRange', value: function updateRange()

    {var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NUM_MIN;var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NUM_MAX;
      /* istanbul ignore else */
      if (this.textProvider) {
        this.textProvider.updateRange(min, max);

        var val = this.getValue();
        var outOfRange = val < min * 1 || val > max * 1;
        this.setState({
          stateClassName: outOfRange ? 'state-out-of-range' : '' });

      }
    } }, { key: 'isBlank', value: function isBlank()

    {
      return this.textProvider && this.textProvider.isBlank;
    } }, { key: 'doSpin', value: function doSpin()

    {var up = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.isBlank()) {
        return;
      }

      /* istanbul ignore next */var _props$increment =
      this.props.increment,increment = _props$increment === undefined ? 1 : _props$increment;
      var step = Math.max(1, increment);
      /* istanbul ignore else */
      if (this.textProvider[up ? 'increment' : 'decrement'](step)) {
        this.updateText();
        this.resetCursor();
      }
    } }, { key: 'createListItems', value: function createListItems(

    items) {var _this2 = this;
      var tp = this.textProvider;var
      type = this.props.type;
      /* istanbul ignore next */
      var listItems = (0, _map2.default)(items, function (value, index) {
        value *= 1;
        var percentValue = value;
        if (type === NumericType.PERCENT) {
          percentValue = _this2.toPercentValue(percentValue);
        }

        return {
          text: tp.internalFormat(percentValue).text,
          value: value,
          index: index };

      }) || [];

      return listItems;
    } }, { key: 'onListSelected', value: function onListSelected(

    indexes) {
      if ((0, _isEmpty2.default)(this.listItems) || (0, _isEmpty2.default)(indexes)) {
        return;
      }

      var i = indexes[0];
      if (i >= 0) {
        var item = this.listItems[i];
        if (item) {
          this.textProvider.isBlank = false;
          this.setValue(item.value);
        }
      }
    } }, { key: 'findInList', value: function findInList()

    {
      if ((0, _isEmpty2.default)(this.listItems)) {
        return [-1];
      }

      var value = this.getValue();
      var index = (0, _findIndex2.default)(this.listItems, function (item) {return item.value === value;});
      return [index];
    } }]);return InputNumeric;}(_InputBase2.InputBase);InputNumeric.displayName = 'InputNumeric';InputNumeric.propTypes = InputNumericPropTypes;InputNumeric.defaultProps = InputNumericProps;exports.



InputNumericProps = InputNumericProps;


/**
                                        * @react-component
                                        */exports.default =
InputNumeric;
'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _toNumber = require('lodash/toNumber');var _toNumber2 = _interopRequireDefault(_toNumber);
var _find = require('lodash/find');var _find2 = _interopRequireDefault(_find);
var _i18n = require('../../services/i18n');
var _TokenType = require('./consts/TokenType');var TokenType = _interopRequireWildcard(_TokenType);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


IDescriptor = function () {
  function IDescriptor(provider, id, type) {var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;(0, _classCallCheck3.default)(this, IDescriptor);
    this.txtProvider = provider;
    this.id = id;
    this.type = type;
    this.startIndex = 0;
    this.allowInstanceEditing = false;
    this.isEditing = false;
    this.editingText = '';
    this.maxLen = maxLen;
  }(0, _createClass3.default)(IDescriptor, [{ key: 'reset', value: function reset()

    {
      return false;
    } }, { key: 'clear', value: function clear()

    {
      if (this.allowInstanceEditing) {
        this.isEditing = true;
        this.editingText = '';
        return true;
      }
      return this.reset();
    } }, { key: 'close', value: function close()

    {
      if (this.isEditing && this.editingText.length > 0) {
        this.setValueText(this.editingText);
      }

      this.isEditing = false;
      this.editingText = '';
    } }, { key: 'inc', value: function inc()

    {
      if (this.isEditing) {
        return;
      }

      this.incValue();
    } }, { key: 'dec', value: function dec()

    {
      if (this.isEditing) {
        return;
      }

      this.decValue();
    } }, { key: 'getValueText', value: function getValueText()

    {return null;} }, { key: 'getText', value: function getText()

    {
      if (this.isEditing) {
        return this.editingText;
      }

      return this.getValueText();
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      console.log(value);
      console.log(autoBubble);
      return false;
    } }, { key: 'setText', value: function setText(

    text) {var autoBubble = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.isEditing && text.length <= this.maxLen && /^\d+$/.test(text)) {
        this.editingText = text;
        return true;
      }

      return this.setValueText(text, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {} }, { key: 'decValue', value: function decValue()
    {} }, { key: 'needAdjustInsertPos', value: function needAdjustInsertPos()
    {return true;} }]);return IDescriptor;}();


var descriptors = {};var

clsliteral = function (_IDescriptor) {(0, _inherits3.default)(clsliteral, _IDescriptor);
  function clsliteral(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.LITERAL;var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;(0, _classCallCheck3.default)(this, clsliteral);var _this = (0, _possibleConstructorReturn3.default)(this, (clsliteral.__proto__ || (0, _getPrototypeOf2.default)(clsliteral)).call(this,
    provider, id, type, maxLen));_this.



    literal = '';_this.name = 'literal';return _this;}(0, _createClass3.default)(clsliteral, [{ key: 'getValueText', value: function getValueText()
    {
      return this.literal;
    } }]);return clsliteral;}(IDescriptor);


descriptors[TokenType.LITERAL] = clsliteral;var

clsM = function (_IDescriptor2) {(0, _inherits3.default)(clsM, _IDescriptor2);
  function clsM(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.MONTH;var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;(0, _classCallCheck3.default)(this, clsM);var _this2 = (0, _possibleConstructorReturn3.default)(this, (clsM.__proto__ || (0, _getPrototypeOf2.default)(clsM)).call(this,
    provider, id, type, maxLen));
    _this2.name = 'Month';
    _this2.allowInstanceEditing = true;return _this2;
  }(0, _createClass3.default)(clsM, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setMonth(1);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var m = '' + this.txtProvider.getMonth();
      return m;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setMonth(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
    } }]);return clsM;}(IDescriptor);


descriptors[TokenType.MONTH] = clsM;var

clsMM = function (_IDescriptor3) {(0, _inherits3.default)(clsMM, _IDescriptor3);
  function clsMM(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.MONTH_TWO_DIGITS;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsMM);var _this3 = (0, _possibleConstructorReturn3.default)(this, (clsMM.__proto__ || (0, _getPrototypeOf2.default)(clsMM)).call(this,
    provider, id, type, maxLen));
    _this3.name = 'Two-Digits Month';return _this3;
  }(0, _createClass3.default)(clsMM, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setMonth(1);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var m = '' + this.txtProvider.getMonth();
      return m.length === 1 ? '0' + m : m;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setMonth(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
    } }]);return clsMM;}(IDescriptor);


descriptors[TokenType.MONTH_TWO_DIGITS] = clsMM;var

clsMMM = function (_IDescriptor4) {(0, _inherits3.default)(clsMMM, _IDescriptor4);
  function clsMMM(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.MONTH_SHORT_NAME;var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;(0, _classCallCheck3.default)(this, clsMMM);var _this4 = (0, _possibleConstructorReturn3.default)(this, (clsMMM.__proto__ || (0, _getPrototypeOf2.default)(clsMMM)).call(this,
    provider, id, type, maxLen));
    _this4.name = 'Abbreviated Month Names';return _this4;
  }(0, _createClass3.default)(clsMMM, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setMonth(1);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var m = this.txtProvider.getMonth();
      return calendar.months.namesAbbr[m - 1];
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var m = -1;
      m = this.txtProvider.findAlikeArrayItemIndex(calendar.months.namesAbbr, value);
      if (m === -1) {
        return false;
      }
      return this.txtProvider.setMonth(m + 1, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
    } }]);return clsMMM;}(IDescriptor);


descriptors[TokenType.MONTH_SHORT_NAME] = clsMMM;var

clsMMMM = function (_IDescriptor5) {(0, _inherits3.default)(clsMMMM, _IDescriptor5);
  function clsMMMM(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.MONTH_LONG_NAME;var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;(0, _classCallCheck3.default)(this, clsMMMM);var _this5 = (0, _possibleConstructorReturn3.default)(this, (clsMMMM.__proto__ || (0, _getPrototypeOf2.default)(clsMMMM)).call(this,
    provider, id, type, maxLen));
    _this5.name = 'Full Month Names';return _this5;
  }(0, _createClass3.default)(clsMMMM, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setMonth(1);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var m = this.txtProvider.getMonth();
      return calendar.months.names[m - 1];
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var m = -1;
      m = this.txtProvider.findAlikeArrayItemIndex(calendar.months.names, value);
      if (m === -1) {
        return false;
      }
      return this.txtProvider.setMonth(m + 1, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setMonth(this.txtProvider.getMonth() - 1, true);
    } }]);return clsMMMM;}(IDescriptor);


descriptors[TokenType.MONTH_LONG_NAME] = clsMMMM;var

clsD = function (_IDescriptor6) {(0, _inherits3.default)(clsD, _IDescriptor6);
  function clsD(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.DATE;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsD);var _this6 = (0, _possibleConstructorReturn3.default)(this, (clsD.__proto__ || (0, _getPrototypeOf2.default)(clsD)).call(this,
    provider, id, type, maxLen));
    _this6.name = 'Date';
    _this6.allowInstanceEditing = true;return _this6;
  }(0, _createClass3.default)(clsD, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setDateOfMonth(1);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var dom = this.txtProvider.getDateOfMonth();
      return '' + dom;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setDateOfMonth(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
    } }]);return clsD;}(IDescriptor);


descriptors[TokenType.DATE] = clsD;var

clsDD = function (_IDescriptor7) {(0, _inherits3.default)(clsDD, _IDescriptor7);
  function clsDD(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.DATE_TWO_DIGITS;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsDD);var _this7 = (0, _possibleConstructorReturn3.default)(this, (clsDD.__proto__ || (0, _getPrototypeOf2.default)(clsDD)).call(this,
    provider, id, type, maxLen));
    _this7.name = 'Two-digits Date';
    _this7.allowInstanceEditing = true;return _this7;
  }(0, _createClass3.default)(clsDD, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setDateOfMonth(1);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var dom = this.txtProvider.getDateOfMonth();
      if (dom < 10) {
        dom = '0' + dom;
      }
      return '' + dom;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setDateOfMonth(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
    } }]);return clsDD;}(IDescriptor);


descriptors[TokenType.DATE_TWO_DIGITS] = clsDD;var

clsddd = function (_IDescriptor8) {(0, _inherits3.default)(clsddd, _IDescriptor8);
  function clsddd(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.DAY_SHORT_NAME;var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;(0, _classCallCheck3.default)(this, clsddd);var _this8 = (0, _possibleConstructorReturn3.default)(this, (clsddd.__proto__ || (0, _getPrototypeOf2.default)(clsddd)).call(this,
    provider, id, type, maxLen));
    _this8.name = 'Abbreviated Day Name of Week';return _this8;
  }(0, _createClass3.default)(clsddd, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setDayOfWeek(1, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var dw = this.txtProvider.getDayOfWeek();
      return calendar.days.namesShort[dw];
    } }, { key: 'setValueText', value: function setValueText(

    value) {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var dw = -1;
      dw = this.txtProvider.findAlikeArrayItemIndex(calendar.days.namesShort, value);
      if (dw === -1) {
        return false;
      }
      return this.txtProvider.setDayOfWeek(dw);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
    } }, { key: 'needAdjustInsertPos', value: function needAdjustInsertPos()

    {
      return false;
    } }]);return clsddd;}(IDescriptor);


descriptors[TokenType.DAY_SHORT_NAME] = clsddd;var

clsdddd = function (_IDescriptor9) {(0, _inherits3.default)(clsdddd, _IDescriptor9);
  function clsdddd(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.DAY_LONG_NAME;var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;(0, _classCallCheck3.default)(this, clsdddd);var _this9 = (0, _possibleConstructorReturn3.default)(this, (clsdddd.__proto__ || (0, _getPrototypeOf2.default)(clsdddd)).call(this,
    provider, id, type, maxLen));
    _this9.name = 'Full Day Name of Week';return _this9;
  }(0, _createClass3.default)(clsdddd, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setDayOfWeek(1, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var dw = this.txtProvider.getDayOfWeek();
      return calendar.days.names[dw];
    } }, { key: 'setValueText', value: function setValueText(

    value) {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var dw = -1;
      dw = this.txtProvider.findAlikeArrayItemIndex(calendar.days.names, value);
      if (dw === -1) {
        return false;
      }
      return this.txtProvider.setDayOfWeek(dw);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setDateOfMonth(this.txtProvider.getDateOfMonth() - 1, true);
    } }, { key: 'needAdjustInsertPos', value: function needAdjustInsertPos()

    {
      return false;
    } }]);return clsdddd;}(IDescriptor);


descriptors[TokenType.DAY_LONG_NAME] = clsdddd;var

clsY = function (_IDescriptor10) {(0, _inherits3.default)(clsY, _IDescriptor10);
  function clsY(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.YEAR;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsY);var _this10 = (0, _possibleConstructorReturn3.default)(this, (clsY.__proto__ || (0, _getPrototypeOf2.default)(clsY)).call(this,
    provider, id, type, maxLen));
    _this10.name = 'One-digit Year';
    _this10.allowInstanceEditing = true;return _this10;
  }(0, _createClass3.default)(clsY, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setYear(_i18n.Globalize.getToday().year(), false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var y = this.txtProvider.getYear();
      y = '' + y;
      if (y.length === 4) {
        y = y.charAt(2) + y.charAt(3);
      }
      if (y.charAt(0) === '0') {
        y = y.charAt(1);
      }
      return y;
    } }, { key: 'setValueText', value: function setValueText(

    value) {
      value += '';
      while (value.length < 2) {
        value = '0' + value;
      }
      var y = this.txtProvider.getYear();
      y = '' + y;
      if (value === '00') {
        var m = this.txtProvider.getMonth();
        var dom = this.txtProvider.getDateOfMonth();
        var h = this.txtProvider.getHours();
        var min = this.txtProvider.getMinutes();
        var s = this.txtProvider.getSeconds();
        if (m === 1 && dom === 1 && !h && !min && !s) {
          y = '0001';
          value = '01';
        }
      }
      /* istanbul ignore else */
      if (y.length >= 2) {
        y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
      }
      return this.txtProvider.setYear(y);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setYear((0, _toNumber2.default)(this.txtProvider.getYear()) + 1, null, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setYear((0, _toNumber2.default)(this.txtProvider.getYear()) - 1, null, true);
    } }]);return clsY;}(IDescriptor);


descriptors[TokenType.YEAR] = clsY;var

clsYY = function (_IDescriptor11) {(0, _inherits3.default)(clsYY, _IDescriptor11);
  function clsYY(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.YEAR_TWO_DIGITS;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsYY);var _this11 = (0, _possibleConstructorReturn3.default)(this, (clsYY.__proto__ || (0, _getPrototypeOf2.default)(clsYY)).call(this,
    provider, id, type, maxLen));
    _this11.name = 'Two-digits Year';
    _this11.token = 'YY';
    _this11.allowInstanceEditing = true;return _this11;
  }(0, _createClass3.default)(clsYY, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setYear(_i18n.Globalize.getToday().year(), false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var y = this.txtProvider.getYear();
      y = '' + y;
      if (y.length === 4) {
        y = y.charAt(2) + y.charAt(3);
      }
      return y;
    } }, { key: 'setValueText', value: function setValueText(

    value) {
      value += '';
      while (value.length < 2) {
        value = '0' + value;
      }
      var y = this.txtProvider.getYear();
      y = '' + y;
      if (value === '00') {
        var m = this.txtProvider.getMonth();
        var dom = this.txtProvider.getDateOfMonth();
        var h = this.txtProvider.getHours();
        var min = this.txtProvider.getMinutes();
        var s = this.txtProvider.getSeconds();
        if (m === 1 && dom === 1 && !h && !min && !s) {
          y = '0001';
          value = '01';
        }
      }
      /* istanbul ignore else */
      if (y.length >= 2) {
        y = y.charAt(0) + y.charAt(1) + value.charAt(0) + value.charAt(1);
      }
      var aRes = this.txtProvider.setYear(y);
      return aRes;
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setYear((0, _toNumber2.default)(this.txtProvider.getYear()) + 1, null, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setYear((0, _toNumber2.default)(this.txtProvider.getYear()) - 1, null, true);
    } }]);return clsYY;}(IDescriptor);


descriptors[TokenType.YEAR_TWO_DIGITS] = clsYY;var

clsYYYY = function (_IDescriptor12) {(0, _inherits3.default)(clsYYYY, _IDescriptor12);
  function clsYYYY(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.YEAR_FOUR_DIGITS;var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4;(0, _classCallCheck3.default)(this, clsYYYY);var _this12 = (0, _possibleConstructorReturn3.default)(this, (clsYYYY.__proto__ || (0, _getPrototypeOf2.default)(clsYYYY)).call(this,
    provider, id, type, maxLen));
    _this12.name = 'Four-digits Year';
    _this12.allowInstanceEditing = true;return _this12;
  }(0, _createClass3.default)(clsYYYY, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setYear(_i18n.Globalize.getToday().year(), false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      return this.txtProvider.getYear();
    } }, { key: 'setValueText', value: function setValueText(

    value) {
      return this.txtProvider.setYear(value);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setYear((0, _toNumber2.default)(this.txtProvider.getYear()) + 1, null, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setYear((0, _toNumber2.default)(this.txtProvider.getYear()) - 1, null, true);
    } }]);return clsYYYY;}(IDescriptor);


descriptors[TokenType.YEAR_FOUR_DIGITS] = clsYYYY;


function formatPmHours(value, txtProvider) {
  var needFormat = false;
  var amPm = (0, _find2.default)(txtProvider.descriptors,
  function (d) {return d.type === TokenType.AMPM || d.type === TokenType.AMPM_UPPER;});

  if (amPm) {var
    startIndex = amPm.startIndex,maxLen = amPm.maxLen;
    var amPmString = txtProvider.getText().slice(startIndex, startIndex + maxLen);
    needFormat = amPmString.toLowerCase() === 'pm';
  }
  if (needFormat) {
    value = value * 1 % 12 + 12;
  }
  return value;
}var
clsh = function (_IDescriptor13) {(0, _inherits3.default)(clsh, _IDescriptor13);
  function clsh(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.HOUTR_12;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsh);var _this13 = (0, _possibleConstructorReturn3.default)(this, (clsh.__proto__ || (0, _getPrototypeOf2.default)(clsh)).call(this,
    provider, id, type, maxLen));
    _this13.name = '1-Digit of 12-hour Clock';
    _this13.allowInstanceEditing = true;return _this13;
  }(0, _createClass3.default)(clsh, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setHours(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var h = this.txtProvider.getHours();
      if (h > 12) {
        h -= 12;
      }
      if (h === 0) {
        h = 12;
      }
      return '' + h;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      if (value * 1 === 12) {
        value = 0;
      }
      value = formatPmHours(value, this.txtProvider);

      return this.txtProvider.setHours(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
    } }]);return clsh;}(IDescriptor);


descriptors[TokenType.HOUTR_12] = clsh;var


clshh = function (_IDescriptor14) {(0, _inherits3.default)(clshh, _IDescriptor14);
  function clshh(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.HOUTR_12_TWO_DIGITS;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clshh);var _this14 = (0, _possibleConstructorReturn3.default)(this, (clshh.__proto__ || (0, _getPrototypeOf2.default)(clshh)).call(this,
    provider, id, type, maxLen));
    _this14.name = '2-Digits of 12-hour Clock';
    _this14.allowInstanceEditing = true;return _this14;
  }(0, _createClass3.default)(clshh, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setHours(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var h = this.txtProvider.getHours();
      if (h > 12) {
        h -= 12;
      }
      if (h === 0) {
        h = 12;
      }
      if (h < 10) {
        h = '0' + h;
      }
      return '' + h;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      value = formatPmHours(value, this.txtProvider);
      return this.txtProvider.setHours(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
    } }]);return clshh;}(IDescriptor);


descriptors[TokenType.HOUTR_12_TWO_DIGITS] = clshh;var

clsH = function (_IDescriptor15) {(0, _inherits3.default)(clsH, _IDescriptor15);
  function clsH(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.HOUTR_24;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsH);var _this15 = (0, _possibleConstructorReturn3.default)(this, (clsH.__proto__ || (0, _getPrototypeOf2.default)(clsH)).call(this,
    provider, id, type, maxLen));
    _this15.name = '1-Digit of 24-hour Clock';
    _this15.token = 'H';
    _this15.allowInstanceEditing = true;return _this15;
  }(0, _createClass3.default)(clsH, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setHours(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var h = this.txtProvider.getHours();
      return '' + h;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setHours(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
    } }]);return clsH;}(IDescriptor);


descriptors[TokenType.HOUTR_24] = clsH;var


clsHH = function (_IDescriptor16) {(0, _inherits3.default)(clsHH, _IDescriptor16);
  function clsHH(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.HOUTR_24_TWO_DIGITS;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsHH);var _this16 = (0, _possibleConstructorReturn3.default)(this, (clsHH.__proto__ || (0, _getPrototypeOf2.default)(clsHH)).call(this,
    provider, id, type, maxLen));
    _this16.name = '2-Digits of 24-hour Clock';
    _this16.token = 'HH';
    _this16.allowInstanceEditing = true;return _this16;
  }(0, _createClass3.default)(clsHH, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setHours(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var h = this.txtProvider.getHours();
      if (h < 10) {
        h = '0' + h;
      }
      return '' + h;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setHours(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setHours(this.txtProvider.getHours() - 1, true);
    } }]);return clsHH;}(IDescriptor);


descriptors[TokenType.HOUTR_24_TWO_DIGITS] = clsHH;var

clsa = function (_IDescriptor17) {(0, _inherits3.default)(clsa, _IDescriptor17);
  function clsa(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.AMPM;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsa);var _this17 = (0, _possibleConstructorReturn3.default)(this, (clsa.__proto__ || (0, _getPrototypeOf2.default)(clsa)).call(this,
    provider, id, type, maxLen));
    _this17.name = 'The am/pm designator';return _this17;
  }(0, _createClass3.default)(clsa, [{ key: 'getValueText', value: function getValueText()

    {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var h = this.txtProvider.getHours();
      var ds = '';
      if (h < 12) {
        /* istanbul ignore next */
        ds = calendar.AM[1] || calendar.AM[0];
      } else {
        /* istanbul ignore next */
        ds = calendar.PM[1] || calendar.PM[0];
      }
      /* istanbul ignore if */
      if (ds.length <= 0) {
        ds = ' ';
      }
      return ds;
    } }, { key: 'setValueText', value: function setValueText(

    value) {
      var h = void 0;
      if (value.toLowerCase().indexOf('a') >= 0) {
        h = this.txtProvider.getHours() * 1 % 12;
        this.txtProvider.setHours(h, true);
      } else if (value.toLowerCase().indexOf('p') >= 0) {
        h = this.txtProvider.getHours() * 1 % 12 + 12;
        this.txtProvider.setHours(h, true);
      }

      return true;
    } }, { key: 'incValue', value: function incValue()

    {
      var h = (this.txtProvider.getHours() + 12) % 24;
      this.txtProvider.setHours(h, true);
    } }, { key: 'decValue', value: function decValue()

    {
      var h = (this.txtProvider.getHours() + 12) % 24;
      this.txtProvider.setHours(h, true);
    } }]);return clsa;}(IDescriptor);


descriptors[TokenType.AMPM] = clsa;var

clsA = function (_IDescriptor18) {(0, _inherits3.default)(clsA, _IDescriptor18);
  function clsA(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.AMPM_UPPER;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsA);var _this18 = (0, _possibleConstructorReturn3.default)(this, (clsA.__proto__ || (0, _getPrototypeOf2.default)(clsA)).call(this,
    provider, id, type, maxLen));
    _this18.name = 'The upper case of am/pm designator';return _this18;
  }(0, _createClass3.default)(clsA, [{ key: 'getValueText', value: function getValueText()

    {
      var calendar = _i18n.Globalize.culture.calendars.standard;
      var h = this.txtProvider.getHours();
      var ds = '';
      if (h < 12) {
        /* istanbul ignore next */
        ds = calendar.AM[2] || calendar.AM[0];
      } else {
        /* istanbul ignore next */
        ds = calendar.PM[2] || calendar.PM[0];
      }
      /* istanbul ignore if */
      if (ds.length <= 0) {
        ds = ' ';
      }
      return ds;
    } }, { key: 'setValueText', value: function setValueText(

    value) {
      var h = void 0;
      if (value.toLowerCase().indexOf('a') >= 0) {
        h = this.txtProvider.getHours() * 1 % 12;
        this.txtProvider.setHours(h, true);
      } else if (value.toLowerCase().indexOf('p') >= 0) {
        h = this.txtProvider.getHours() * 1 % 12 + 12;
        this.txtProvider.setHours(h, true);
      }

      return true;
    } }, { key: 'incValue', value: function incValue()

    {
      var h = (this.txtProvider.getHours() + 12) % 24;
      this.txtProvider.setHours(h, true);
    } }, { key: 'decValue', value: function decValue()

    {
      var h = (this.txtProvider.getHours() + 12) % 24;
      this.txtProvider.setHours(h, true);
    } }]);return clsA;}(IDescriptor);


descriptors[TokenType.AMPM_UPPER] = clsA;var

clsm = function (_IDescriptor19) {(0, _inherits3.default)(clsm, _IDescriptor19);
  function clsm(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.MINUTE;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsm);var _this19 = (0, _possibleConstructorReturn3.default)(this, (clsm.__proto__ || (0, _getPrototypeOf2.default)(clsm)).call(this,
    provider, id, type, maxLen));
    _this19.name = '1-Digit of Minute';
    _this19.allowInstanceEditing = true;return _this19;
  }(0, _createClass3.default)(clsm, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setMinutes(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var min = this.txtProvider.getMinutes();
      return '' + min;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setMinutes(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setMinutes(this.txtProvider.getMinutes() + 12, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setMinutes(this.txtProvider.getMinutes() - 12, true);
    } }]);return clsm;}(IDescriptor);


descriptors[TokenType.MINUTE] = clsm;var

clsmm = function (_IDescriptor20) {(0, _inherits3.default)(clsmm, _IDescriptor20);
  function clsmm(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.MINUTE_TWO_DIGITS;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsmm);var _this20 = (0, _possibleConstructorReturn3.default)(this, (clsmm.__proto__ || (0, _getPrototypeOf2.default)(clsmm)).call(this,
    provider, id, type, maxLen));
    _this20.name = '2-Digits of Minute';
    _this20.allowInstanceEditing = true;return _this20;
  }(0, _createClass3.default)(clsmm, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setMinutes(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var min = this.txtProvider.getMinutes();
      if (min < 10) {
        min = '0' + min;
      }
      return '' + min;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setMinutes(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setMinutes(this.txtProvider.getMinutes() + 1, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setMinutes(this.txtProvider.getMinutes() - 1, true);
    } }]);return clsmm;}(IDescriptor);


descriptors[TokenType.MINUTE_TWO_DIGITS] = clsmm;var

clss = function (_IDescriptor21) {(0, _inherits3.default)(clss, _IDescriptor21);
  function clss(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.SECOND;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clss);var _this21 = (0, _possibleConstructorReturn3.default)(this, (clss.__proto__ || (0, _getPrototypeOf2.default)(clss)).call(this,
    provider, id, type, maxLen));
    _this21.name = '1-Digit of Second';
    _this21.allowInstanceEditing = true;return _this21;
  }(0, _createClass3.default)(clss, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setSeconds(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var s = this.txtProvider.getSeconds();
      return '' + s;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setSeconds(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setSeconds(this.txtProvider.getSeconds() + 12, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setSeconds(this.txtProvider.getSeconds() - 12, true);
    } }]);return clss;}(IDescriptor);


descriptors[TokenType.SECOND] = clss;var

clsss = function (_IDescriptor22) {(0, _inherits3.default)(clsss, _IDescriptor22);
  function clsss(provider, id) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TokenType.SECOND_TWO_DIGITS;var maxLen = arguments[3];(0, _classCallCheck3.default)(this, clsss);var _this22 = (0, _possibleConstructorReturn3.default)(this, (clsss.__proto__ || (0, _getPrototypeOf2.default)(clsss)).call(this,
    provider, id, type, maxLen));
    _this22.name = '2-Digits of Second';
    _this22.allowInstanceEditing = true;return _this22;
  }(0, _createClass3.default)(clsss, [{ key: 'reset', value: function reset()

    {
      return this.txtProvider.setSeconds(0, false);
    } }, { key: 'getValueText', value: function getValueText()

    {
      var s = this.txtProvider.getSeconds();
      if (s < 10) {
        s = '0' + s;
      }
      return '' + s;
    } }, { key: 'setValueText', value: function setValueText(

    value, autoBubble) {
      return this.txtProvider.setSeconds(value, autoBubble);
    } }, { key: 'incValue', value: function incValue()

    {
      this.txtProvider.setSeconds(this.txtProvider.getSeconds() + 12, true);
    } }, { key: 'decValue', value: function decValue()

    {
      this.txtProvider.setSeconds(this.txtProvider.getSeconds() - 12, true);
    } }]);return clsss;}(IDescriptor);


descriptors[TokenType.SECOND_TWO_DIGITS] = clsss;exports.default =

descriptors;module.exports = exports['default'];
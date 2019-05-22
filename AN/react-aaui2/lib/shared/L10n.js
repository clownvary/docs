'use strict';

exports.__esModule = true;
exports.defaultValidationMsgKeys = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _createListenerCollection = require('./createListenerCollection');

var _createListenerCollection2 = _interopRequireDefault(_createListenerCollection);

var _DateTimeSymbols = require('../form/config/DateTimeSymbols');

var DateTimeSymbols = _interopRequireWildcard(_DateTimeSymbols);

var _currenciesConfig = require('../form/config/currenciesConfig');

var currenciesConfig = _interopRequireWildcard(_currenciesConfig);

var _utils = require('./utils');

var _dateTimeParser = require('./dateTimeParser');

var _dateTimeParser2 = _interopRequireDefault(_dateTimeParser);

var _dateTimeFormatter = require('./dateTimeFormatter');

var _dateTimeFormatter2 = _interopRequireDefault(_dateTimeFormatter);

var _currencyFormatter = require('./currencyFormatter');

var _currencyFormatter2 = _interopRequireDefault(_currencyFormatter);

var _en_US = require('../../i18n/en_US.json');

var _en_US2 = _interopRequireDefault(_en_US);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultValidationMsgKeys = exports.defaultValidationMsgKeys = {
  required: 'react-aaui.validation.required',
  limit: 'react-aaui.validation.limitation',
  max: 'react-aaui.validation.max',
  min: 'react-aaui.validation.min',
  invalid: 'react-aaui.validation.invalid'
};
var DEFAULT_LOCALE = 'en_US';
var DEFAULT_CURRENCY_CODE = 'USD';

var L10n = function () {
  function L10n() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$locale = _ref.locale,
        locale = _ref$locale === undefined ? DEFAULT_LOCALE : _ref$locale,
        _ref$messages = _ref.messages,
        messages = _ref$messages === undefined ? {} : _ref$messages,
        _ref$config = _ref.config,
        config = _ref$config === undefined ? {} : _ref$config;

    (0, _classCallCheck3.default)(this, L10n);

    this._locale = locale;
    this._messages = (0, _extends3.default)({}, _en_US2.default, messages);
    this._config = (0, _extends3.default)({
      dateTimeSymbol: DateTimeSymbols[DEFAULT_LOCALE],
      currenciesConfig: currenciesConfig
    }, config);
    this.initDefaultMsg();
    this.listeners = (0, _createListenerCollection2.default)();
  }

  L10n.prototype.initDefaultMsg = function initDefaultMsg() {
    var _this = this;

    (0, _keys2.default)(defaultValidationMsgKeys).forEach(function (k) {
      _this[k] = defaultValidationMsgKeys[k];
    });
  };

  L10n.prototype.notify = function notify() {
    this.listeners.notify();
  };

  L10n.prototype.subscribe = function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    return this.listeners.subscribe(listener);
  };

  L10n.prototype.formatMessage = function formatMessage(id, values) {
    var defaultMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var message = this.messages[id];

    if (message) {
      if (values) {
        return (0, _utils.interpolate)(message, values);
      }

      return message;
    }

    return defaultMessage;
  };

  L10n.prototype.formatDateTime = function formatDateTime(date) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var dateFormatter = (0, _dateTimeFormatter2.default)(this.config.dateTimeSymbol);
    var template = this.config.dateTimeSymbol.FORMAT[format] || format;

    return dateFormatter(template, date);
  };

  L10n.prototype.parseDateTime = function parseDateTime(value, format) {
    var dateParser = (0, _dateTimeParser2.default)(this.config.dateTimeSymbol);
    var template = this.config.dateTimeSymbol.FORMAT[format] || format;

    return dateParser(value, template);
  };

  L10n.prototype.formatCurrency = function formatCurrency(amount) {
    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CURRENCY_CODE;
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var currencyConfig = this.config.currenciesConfig[code];
    if (!currencyConfig) {
      throw Error('Unable to identify currency code: "' + code + '"');
    }

    var formatConfig = currencyConfig.formatConfig,
        getLocalizeTemplate = currencyConfig.getLocalizeTemplate;

    var config = (0, _extends3.default)({
      template: getLocalizeTemplate(this.locale)
    }, formatConfig, format);

    return (0, _currencyFormatter2.default)(amount, config);
  };

  (0, _createClass3.default)(L10n, [{
    key: 'locale',
    get: function get() {
      return this._locale;
    },
    set: function set(value) {
      this._locale = value;
      this._config.dateTimeSymbol = DateTimeSymbols[this._locale];

      this.notify();
    }
  }, {
    key: 'messages',
    get: function get() {
      return this._messages;
    },
    set: function set(value) {
      this._messages = value;
      this.notify();
    }
  }, {
    key: 'config',
    get: function get() {
      return this._config;
    },
    set: function set(value) {
      this._config = value;
    }
  }]);
  return L10n;
}();

exports.default = L10n;
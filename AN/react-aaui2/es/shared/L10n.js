import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import createListenerCollection from './createListenerCollection';
import * as DateTimeSymbols from '../form/config/DateTimeSymbols';
import * as currenciesConfig from '../form/config/currenciesConfig';
import { interpolate } from './utils';
import dateTimeParser from './dateTimeParser';
import dateTimeFormatter from './dateTimeFormatter';
import currencyFormatter from './currencyFormatter';
import DEFAULT_MESSAGES from '../../i18n/en_US.json';

export var defaultValidationMsgKeys = {
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

    _classCallCheck(this, L10n);

    this._locale = locale;
    this._messages = _extends({}, DEFAULT_MESSAGES, messages);
    this._config = _extends({
      dateTimeSymbol: DateTimeSymbols[DEFAULT_LOCALE],
      currenciesConfig: currenciesConfig
    }, config);
    this.initDefaultMsg();
    this.listeners = createListenerCollection();
  }

  L10n.prototype.initDefaultMsg = function initDefaultMsg() {
    var _this = this;

    _Object$keys(defaultValidationMsgKeys).forEach(function (k) {
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
        return interpolate(message, values);
      }

      return message;
    }

    return defaultMessage;
  };

  L10n.prototype.formatDateTime = function formatDateTime(date) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var dateFormatter = dateTimeFormatter(this.config.dateTimeSymbol);
    var template = this.config.dateTimeSymbol.FORMAT[format] || format;

    return dateFormatter(template, date);
  };

  L10n.prototype.parseDateTime = function parseDateTime(value, format) {
    var dateParser = dateTimeParser(this.config.dateTimeSymbol);
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

    var config = _extends({
      template: getLocalizeTemplate(this.locale)
    }, formatConfig, format);

    return currencyFormatter(amount, config);
  };

  _createClass(L10n, [{
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

export default L10n;
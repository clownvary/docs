'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);
var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactIntl = require('react-intl');
var _isFunction = require('lodash/isFunction');var _isFunction2 = _interopRequireDefault(_isFunction);
var _Globalize = require('./Globalize');var _Globalize2 = _interopRequireDefault(_Globalize);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var


GlobalizeSink = function (_Component) {(0, _inherits3.default)(GlobalizeSink, _Component);






  function GlobalizeSink(props, context) {(0, _classCallCheck3.default)(this, GlobalizeSink);var _this = (0, _possibleConstructorReturn3.default)(this, (GlobalizeSink.__proto__ || (0, _getPrototypeOf2.default)(GlobalizeSink)).call(this,
    props, context));var

    intl = context.intl;
    _Globalize2.default.intl = intl;return _this;
  }(0, _createClass3.default)(GlobalizeSink, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      this.onIntlChange(_Globalize2.default.intl);
    } }, { key: 'shouldComponentUpdate', value: function shouldComponentUpdate(

    nextProps, nextState, nextContext) {var _context$intl =
      this.context.intl,intl = _context$intl === undefined ? {} : _context$intl;var _nextContext$intl =
      nextContext.intl,nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;

      /* istanbul ignore next */
      var intlChanged = nextIntl.locale !== intl.locale;
      // istanbul ignore if
      if (intlChanged) {
        _Globalize2.default.intl = nextIntl;
        this.onIntlChange(nextIntl);
      }

      return intlChanged;
    } }, { key: 'onIntlChange', value: function onIntlChange(

    intl) {var
      onIntlChange = this.props.onIntlChange;
      if ((0, _isFunction2.default)(onIntlChange)) {
        onIntlChange({
          intl: intl });

      }
    } }, { key: 'render', value: function render()

    {
      return _react2.default.createElement('span', { className: 'u-hidden' });
    } }]);return GlobalizeSink;}(_react.Component);GlobalizeSink.displayName = 'ANGlobalizeSink';GlobalizeSink.contextTypes = { intl: _reactIntl.intlShape };exports.default = GlobalizeSink;module.exports = exports['default'];
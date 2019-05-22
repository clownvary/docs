'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _L10nProvider$childCo;

var _react = require('react');

var _propTypes = require('prop-types');

var _L10n = require('./L10n');

var _L10n2 = _interopRequireDefault(_L10n);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var l10nName = 'aauiL10n';

var L10nProvider = function (_PureComponent) {
  (0, _inherits3.default)(L10nProvider, _PureComponent);

  function L10nProvider(props, context) {
    (0, _classCallCheck3.default)(this, L10nProvider);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props, context));

    _this.state = { messages: props.messages || {} };
    _this.l10n = props.l10n || new _L10n2.default(props, context);
    return _this;
  }

  L10nProvider.prototype.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[l10nName] = this.l10n, _ref;
  };

  L10nProvider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var modules = [import( /* webpackChunkName: "AUI/L10n/[request]" */
    '../../i18n/' + this.props.locale + '.json')];

    if (this.props.messagePath) {
      var messageLocalPath = '' + this.props.messagePath.replace('{locale}', this.props.locale);
      modules.push(import('' + messageLocalPath));
    }

    _promise2.default.all(modules).then(function (messages) {
      _this2.syncMessages((0, _extends3.default)({}, messages[0], messages[1]));
    });
  };

  L10nProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this3 = this;

    if (this.props.locale !== nextProps.locale) {
      this.l10n.locale = nextProps.locale;

      var modules = [import( /* webpackChunkName: "AUI/L10n/[request]" */
      '../../i18n/' + this.l10n.locale + '.json')];

      if (nextProps.messagePath) {
        var messageLocalPath = '' + nextProps.messagePath.replace('{locale}', this.l10n.locale);
        modules.push(import('' + messageLocalPath));
      }

      _promise2.default.all(modules).then(function (messages) {
        _this3.syncMessages((0, _extends3.default)({}, messages[0], messages[1]));
      });
    }

    if (this.props.messages !== nextProps.messages) {
      this.syncMessages(nextProps.messages);
    }
  };

  L10nProvider.prototype.syncMessages = function syncMessages(messages) {
    this.l10n.messages = (0, _extends3.default)({}, this.l10n.messages, messages);

    this.setState({
      messages: this.l10n.messages
    });
  };

  L10nProvider.prototype.render = function render() {
    return _react.Children.only(this.props.children);
  };

  return L10nProvider;
}(_react.PureComponent);

L10nProvider.propTypes = {
  locale: _propTypes.string,
  messages: _propTypes.object, // eslint-disable-line
  l10n: _propTypes.object, // eslint-disable-line
  messagePath: _propTypes.string, // eslint-disable-line
  children: _propTypes.node
};
L10nProvider.defaultProps = {
  locale: 'en_US'
};
L10nProvider.childContextTypes = (_L10nProvider$childCo = {}, _L10nProvider$childCo[l10nName] = _types.aauiL10nShape, _L10nProvider$childCo);
exports.default = L10nProvider;
module.exports = exports['default'];
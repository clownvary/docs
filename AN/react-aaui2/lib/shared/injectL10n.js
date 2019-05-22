'use strict';

exports.__esModule = true;

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = injectL10n;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _L10n = require('./L10n');

var _L10n2 = _interopRequireDefault(_L10n);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _types = require('./types');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var staticL10n = new _L10n2.default();

function injectL10n() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var aauiL10nConfigPropKeys = (0, _keys2.default)(_types.aauiL10nConfigPropTypes);
  var aauiL10nFuncPropKeys = (0, _keys2.default)(_types.aauiL10nFuncPropTypes);

  var aauiL10nName = 'aauiL10n';
  var _options$l10nName = options.l10nName,
      l10nName = _options$l10nName === undefined ? 'l10n' : _options$l10nName;


  return function wrapWithInjectL10n(WrappedComponent) {
    var InjectL10n = function (_PureComponent) {
      (0, _inherits3.default)(InjectL10n, _PureComponent);

      function InjectL10n(props) {
        (0, _classCallCheck3.default)(this, InjectL10n);

        var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props));

        _this.getBoundL10n = function () {
          var _ref;

          var l10n = _this.context[aauiL10nName] || staticL10n;
          var boundFuncs = aauiL10nFuncPropKeys.reduce(function (funcs, name) {
            var _extends2;

            return (0, _extends5.default)({}, funcs, (_extends2 = {}, _extends2[name] = l10n[name].bind(l10n), _extends2));
          }, {});
          var boundConfig = aauiL10nConfigPropKeys.reduce(function (config, name) {
            var _extends3;

            return (0, _extends5.default)({}, config, (_extends3 = {}, _extends3[name] = l10n[name], _extends3));
          }, {});

          return _ref = {}, _ref[l10nName] = (0, _extends5.default)({}, l10n, boundConfig, boundFuncs), _ref;
        };

        _this.unsubscribe = null;
        return _this;
      }

      InjectL10n.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        if (this.context[aauiL10nName]) {
          this.unsubscribe = this.context[aauiL10nName].subscribe(function () {
            return _this2.forceUpdate();
          });
        }
      };

      InjectL10n.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }

        this.unsubscribe = null;
      };

      InjectL10n.prototype.render = function render() {
        var finalProps = (0, _utils.omit)(this.props, [aauiL10nName]);

        return _react2.default.createElement(WrappedComponent, (0, _extends5.default)({}, finalProps, this.getBoundL10n()));
      };

      return InjectL10n;
    }(_react.PureComponent);

    InjectL10n.displayName = 'InjectL10n(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
    InjectL10n.contextTypes = { aauiL10n: _types.aauiL10nShape };


    return InjectL10n;
  };
}
module.exports = exports['default'];
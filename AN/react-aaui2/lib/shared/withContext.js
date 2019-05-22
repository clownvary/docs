'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withContext = function withContext(childContextTypes, getChildContext) {
  return function (BaseComponent) {
    var WithContext = function (_PureComponent) {
      (0, _inherits3.default)(WithContext, _PureComponent);

      function WithContext() {
        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, WithContext);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.getChildContext = function () {
          return getChildContext(_this.props);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      WithContext.prototype.render = function render() {
        return _react2.default.createElement(BaseComponent, this.props);
      };

      return WithContext;
    }(_react.PureComponent);

    WithContext.childContextTypes = childContextTypes;

    return WithContext;
  };
};

exports.default = withContext;
module.exports = exports['default'];
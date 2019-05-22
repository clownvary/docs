'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordTextInput = function (_PureComponent) {
  (0, _inherits3.default)(PasswordTextInput, _PureComponent);

  function PasswordTextInput() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PasswordTextInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      type: 'password'
    }, _this.handleIconClick = function () {
      _this.setState(function (preState) {
        return {
          type: preState.type === 'password' ? 'text' : 'password'
        };
      });
    }, _this.renderIconComponent = function (props) {
      var type = _this.state.type;

      var icon = type === 'password' ? 'icon-lock' : 'icon-unlock';

      return _react2.default.createElement(
        'span',
        props,
        _react2.default.createElement('i', { className: 'icon ' + icon, onClick: _this.handleIconClick })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  PasswordTextInput.prototype.render = function render() {
    return _react2.default.createElement(_TextInput2.default, (0, _extends3.default)({
      icon: true,
      type: this.state.type,
      PreComponent: this.renderIconComponent
    }, this.props));
  };

  return PasswordTextInput;
}(_react.PureComponent);

PasswordTextInput.displayName = 'PasswordTextInput';
exports.default = PasswordTextInput;
module.exports = exports['default'];
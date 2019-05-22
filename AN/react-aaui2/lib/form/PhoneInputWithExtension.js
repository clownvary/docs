'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _types = require('./types');

var _TextInput = require('./TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _PhoneInput = require('./PhoneInput');

var _PhoneInput2 = _interopRequireDefault(_PhoneInput);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Row = require('../grid/Row');

var _Row2 = _interopRequireDefault(_Row);

var _Col = require('../grid/Col');

var _Col2 = _interopRequireDefault(_Col);

var _utils = require('../shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhoneInputWithExtension = function (_React$PureComponent) {
  (0, _inherits3.default)(PhoneInputWithExtension, _React$PureComponent);

  function PhoneInputWithExtension() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PhoneInputWithExtension);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {}, _this.getExtensionName = function () {
      return _this.props.extensionName || _this.props.name + 'Extension';
    }, _this.handlePhoneExtChange = function () {
      var api = _this.props.api;


      _this.setState({
        phoneExt: api.getValueByName(_this.getExtensionName())
      });
    }, _this.handlePhoneInputExtensionBlur = function () {
      var _this$props = _this.props,
          name = _this$props.name,
          value = _this$props.value,
          api = _this$props.api;

      var _api$validateByName = api.validateByName(value, name),
          errMsg = _api$validateByName.errMsg;

      var extErrMsg = api.getErrorByName(_this.getExtensionName());

      if (errMsg || extErrMsg) {
        api.setError(errMsg || extErrMsg);
      } else {
        api.setError(null);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  PhoneInputWithExtension.prototype.render = function render() {
    var _props = this.props,
        name = _props.name,
        rules = _props.rules,
        rest = (0, _objectWithoutProperties3.default)(_props, ['name', 'rules']);


    return _react2.default.createElement(
      _Row2.default,
      { gutter: 15, onBlur: this.handlePhoneInputExtensionBlur },
      _react2.default.createElement(
        _Col2.default,
        { span: 8 },
        _react2.default.createElement(_Field2.default, (0, _extends3.default)({
          component: _PhoneInput2.default,
          name: name,
          rules: rules
        }, (0, _utils.omit)(rest, ['extensionName'])))
      ),
      _react2.default.createElement(
        _Col2.default,
        { span: 4 },
        _react2.default.createElement(_Field2.default, {
          component: _TextInput2.default,
          rules: 'regexp:(^[0-9]*$)',
          name: this.getExtensionName(),
          value: this.state.phoneExt,
          onChange: this.handlePhoneExtChange
        })
      )
    );
  };

  return PhoneInputWithExtension;
}(_react2.default.PureComponent);

PhoneInputWithExtension.propTypes = (0, _extends3.default)({
  name: _propTypes.string,
  extensionName: _propTypes.string,
  value: _propTypes.string,
  phoneRules: _propTypes.string
}, _types.FormFieldAPIPropTypes);
exports.default = (0, _connectForm2.default)()(PhoneInputWithExtension);
module.exports = exports['default'];
'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _TextArea = require('../TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _utils = require('../shared/utils');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = (0, _extends3.default)({}, _types.FormFieldAPIPropTypes);

var FormTextArea = function (_PureComponent) {
  (0, _inherits3.default)(FormTextArea, _PureComponent);

  function FormTextArea() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FormTextArea);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleBlur = function (e) {
      var _this$props = _this.props,
          onValidate = _this$props.api.onValidate,
          onBlur = _this$props.onBlur,
          value = _this$props.value;


      onValidate(value);
      onBlur(e);
    }, _this.handleChange = function (e) {
      var _this$props2 = _this.props,
          setValue = _this$props2.api.setValue,
          onChange = _this$props2.onChange;


      setValue(e.target.value);
      onChange(e);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  FormTextArea.prototype.render = function render() {
    var rest = (0, _objectWithoutProperties3.default)(this.props, []);


    return _react2.default.createElement(_TextArea2.default, (0, _extends3.default)({
      type: 'text'
    }, (0, _utils.omit)(rest, ['api', 'l10n', 'rules']), {
      onBlur: this.handleBlur,
      onChange: this.handleChange
    }));
  };

  return FormTextArea;
}(_react.PureComponent);

FormTextArea.displayName = 'TextArea';
FormTextArea.propTypes = propTypes;
FormTextArea.defaultProps = {
  onChange: _utils.noop,
  onBlur: _utils.noop
};
exports.default = (0, _connectForm2.default)()(FormTextArea);
module.exports = exports['default'];
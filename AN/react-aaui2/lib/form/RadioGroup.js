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

var _utils = require('../shared/utils');

var _radio = require('../radio');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormRadioGroup = function (_PureComponent) {
  (0, _inherits3.default)(FormRadioGroup, _PureComponent);

  function FormRadioGroup() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FormRadioGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (e) {
      var _this$props = _this.props,
          setValue = _this$props.api.setValue,
          onChange = _this$props.onChange;


      setValue(e.target.value);
      onChange(e);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  FormRadioGroup.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        rest = (0, _objectWithoutProperties3.default)(_props, ['children']);


    return _react2.default.createElement(
      _radio.RadioGroup,
      (0, _extends3.default)({}, (0, _utils.omit)(rest, ['api', 'rules']), {
        onChange: this.handleChange
      }),
      children
    );
  };

  return FormRadioGroup;
}(_react.PureComponent);

FormRadioGroup.displayName = 'AUIRadioGroup';
FormRadioGroup.propTypes = (0, _extends3.default)({}, _types.FormFieldAPIPropTypes, {
  children: _propTypes.node
});
FormRadioGroup.defaultProps = {
  onChange: _utils.noop
};
exports.default = (0, _connectForm2.default)()(FormRadioGroup);
module.exports = exports['default'];
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

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _Dropdown = require('../Dropdown');

var _utils = require('../shared/utils');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLACEHOLDER_SELECT = 'react-aaui.common.dropdown.notice.select';

var Select = function (_PureComponent) {
  (0, _inherits3.default)(Select, _PureComponent);

  function Select() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var value = _ref.value;
      var _this$props = _this.props,
          _this$props$api = _this$props.api,
          setValue = _this$props$api.setValue,
          onValidate = _this$props$api.onValidate,
          onChange = _this$props.onChange;


      onValidate(value);
      setValue(value);
      onChange({ value: value });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Select.prototype.render = function render() {
    var _props = this.props,
        l10n = _props.l10n,
        rest = (0, _objectWithoutProperties3.default)(_props, ['l10n']);


    return _react2.default.createElement(_Dropdown.Select, (0, _extends3.default)({
      placeholder: l10n.formatMessage(PLACEHOLDER_SELECT)
    }, (0, _utils.omit)(rest, ['api', 'rules']), {
      onChange: this.handleChange
    }));
  };

  return Select;
}(_react.PureComponent);

Select.displayName = 'Select';
Select.propTypes = (0, _extends3.default)({}, _types.FormFieldAPIPropTypes);
Select.defaultProps = {
  onChange: _utils.noop
};
exports.default = (0, _connectForm2.default)()(Select);
module.exports = exports['default'];
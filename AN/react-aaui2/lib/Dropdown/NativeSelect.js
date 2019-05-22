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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../shared/utils');

var _dataAccess = require('../shared/data-access');

var da = _interopRequireWildcard(_dataAccess);

var _injectL10n = require('../shared/injectL10n');

var _injectL10n2 = _interopRequireDefault(_injectL10n);

var _types = require('../shared/types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_Component) {
  (0, _inherits3.default)(Select, _Component);

  function Select() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Select);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleSelectChange = function (e) {
      var value = e.target.value;
      var onChange = _this.props.onChange;


      onChange({ value: value });
    }, _this.render = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          preIcon = _this$props.preIcon,
          placeholder = _this$props.placeholder,
          size = _this$props.size,
          theme = _this$props.theme,
          isMoreButton = _this$props.isMoreButton,
          style = _this$props.style,
          data = _this$props.data,
          l10n = _this$props.l10n,
          rest = (0, _objectWithoutProperties3.default)(_this$props, ['className', 'disabled', 'preIcon', 'placeholder', 'size', 'theme', 'isMoreButton', 'style', 'data', 'l10n']);

      var validProps = (0, _utils.filterValidProps)(rest);

      var classes = (0, _classnames2.default)('dropdown', 'dropdown--native', 'dropdown--' + theme, 'dropdown--' + size, {
        'dropdown--disabled': disabled
      }, className);
      var selectClasses = (0, _classnames2.default)({
        dropdown__button: true,
        dropdown__select: true,
        disabled: disabled
      });

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: classes, style: style }, validProps),
        preIcon && _react2.default.createElement('i', { className: 'dropdown__prefix-icon ' + preIcon }),
        _react2.default.createElement(
          'select',
          (0, _extends3.default)({
            className: selectClasses,
            onChange: _this.handleSelectChange,
            disabled: disabled
          }, (0, _utils.omit)(rest, ['onChange', 'uncontrolled', 'filterPlaceholder', 'highlight', 'maxHeight'])),
          !rest.value && !rest.defaultValue && _react2.default.createElement(
            'option',
            { value: 'prompt' },
            placeholder || l10n.formatMessage('react-aaui.common.dropdown.notice.select')
          ),
          data.map(function (item) {
            return _react2.default.createElement(
              'option',
              { value: item.value, key: item.value },
              da.get(item, 'text')
            );
          })
        ),
        isMoreButton ? _react2.default.createElement('span', { className: 'icon-caret-down' }) : _react2.default.createElement('span', { className: 'icon-chevron-down' })
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return Select;
}(_react.Component);

Select.propTypes = {
  className: _propTypes.string,
  value: _propTypes.string,
  defaultValue: _propTypes.string,
  placeholder: _propTypes.string,
  preIcon: _propTypes.string,
  size: (0, _propTypes.oneOf)(['m', 'lg']),
  theme: (0, _propTypes.oneOf)(['flat', 'gradient', 'borderless']),
  isMoreButton: _propTypes.bool,
  disabled: _propTypes.bool,
  data: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    text: _propTypes.string,
    value: _propTypes.string
  })),
  style: _propTypes.object, // eslint-disable-line
  onChange: _propTypes.func,
  l10n: _types.aauiL10nShape
};
Select.defaultProps = {
  size: 'm',
  theme: 'flat',
  onChange: _utils.noop
};
exports.default = (0, _injectL10n2.default)()(Select);
module.exports = exports['default'];
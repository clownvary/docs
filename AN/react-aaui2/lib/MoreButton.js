'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  className: _propTypes.string,
  title: _propTypes.string,
  data: _propTypes.object,
  style: _propTypes.object,
  filter: _propTypes.bool,
  filterPlaceholder: _propTypes.string,
  disabled: _propTypes.bool
};

var MoreButton = function (_PureComponent) {
  (0, _inherits3.default)(MoreButton, _PureComponent);

  function MoreButton() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MoreButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var v = _ref.value;

      var handler = _this.props.data[v];

      if (typeof handler === 'function') {
        handler(v);
      }
    }, _this.render = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          style = _this$props.style,
          title = _this$props.title,
          filter = _this$props.filter,
          filterPlaceholder = _this$props.filterPlaceholder,
          disabled = _this$props.disabled;

      var classes = (0, _classnames2.default)('more-button', className);
      var data = (0, _keys2.default)(_this.props.data).map(function (k) {
        return { text: k, value: k };
      });

      return _react2.default.createElement(_Dropdown2.default, {
        className: classes,
        style: style,
        placeholder: title,
        filter: filter,
        filterPlaceholder: filterPlaceholder,
        data: data,
        value: '',
        disabled: disabled,
        isMoreButton: true,
        onChange: _this.handleChange
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return MoreButton;
}(_react.PureComponent);

MoreButton.displayName = 'AUIMoreButton';
MoreButton.propTypes = propTypes;
MoreButton.defaultProps = {
  title: 'More'
};
exports.default = MoreButton;
module.exports = exports['default'];
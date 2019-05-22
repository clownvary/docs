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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _connectForm = require('./connectForm');

var _connectForm2 = _interopRequireDefault(_connectForm);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _propTypes2.default.func,
    node = _propTypes2.default.node;

var propTypes = (0, _extends3.default)({}, _types.FormFieldPropTypes, {
  children: node,
  onChange: func
});

var NestedForm = function (_PureComponent) {
  (0, _inherits3.default)(NestedForm, _PureComponent);

  function NestedForm() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, NestedForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var values = _ref.values,
          errors = _ref.errors;
      var _this$props = _this.props,
          _this$props$api = _this$props.api,
          setValue = _this$props$api.setValue,
          setError = _this$props$api.setError,
          onChange = _this$props.onChange;


      setValue(values);
      setError(errors);

      if (typeof onChange === 'function') {
        onChange({ values: values, errors: errors });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  NestedForm.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        rest = (0, _objectWithoutProperties3.default)(_props, ['children']);


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, (0, _extends3.default)({}, rest, {
          onChange: _this2.handleChange
        }));
      })
    );
  };

  return NestedForm;
}(_react.PureComponent);

NestedForm.propTypes = propTypes;

exports.default = (0, _connectForm2.default)()(NestedForm);
module.exports = exports['default'];
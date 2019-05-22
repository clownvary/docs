'use strict';

exports.__esModule = true;
exports.FormError = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _getContext = require('../shared/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _types = require('./types');

var _utils = require('./utils');

var _alert = require('../alert');

var _alert2 = _interopRequireDefault(_alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aauiFormStore = (0, _keys2.default)(_types.FormStorePropTypes)[0];

var FormError = exports.FormError = function (_PureComponent) {
  (0, _inherits3.default)(FormError, _PureComponent);

  function FormError(props, context) {
    (0, _classCallCheck3.default)(this, FormError);

    var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props, context));

    _this.getFormErrorState = function () {
      var _ref;

      var name = _this.props.name;
      var _this$state$errors = _this.state.errors,
          errors = _this$state$errors === undefined ? {} : _this$state$errors;


      return {
        errors: !name ? errors : (_ref = {}, _ref[name] = errors[name], _ref)
      };
    };

    _this.handleChange = function () {
      var fields = _this.store.getState();

      var _reduceFields = (0, _utils.reduceFields)(fields),
          errors = _reduceFields.errors,
          isValid = _reduceFields.isValid;

      _this.setState({ errors: errors, isValid: isValid });
    };

    _this.state = (0, _extends3.default)({ errors: {}, isValid: true }, props);
    _this.store = props[aauiFormStore] || context[aauiFormStore];
    return _this;
  }

  FormError.prototype.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.store.subscribe(this.handleChange);
  };

  FormError.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  };

  FormError.prototype.render = function render() {
    var _props = this.props,
        errorText = _props.errorText,
        children = _props.children;
    var isValid = this.state.isValid;

    var renderProp = Array.isArray(children) ? children[0] : children;

    return !isValid && _react2.default.createElement(
      _alert2.default,
      { type: 'danger', noClose: true },
      errorText,
      renderProp && renderProp(this.getFormErrorState())
    );
  };

  return FormError;
}(_react.PureComponent);

FormError.displayName = 'FormError';
FormError.propTypes = {
  name: _propTypes.string,
  errorText: _propTypes.node,
  children: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.array])
};
FormError.defaultProps = {
  errorText: _react2.default.createElement(
    'strong',
    null,
    'Error'
  )
};
exports.default = (0, _getContext2.default)(_types.FormStorePropTypes)(FormError);
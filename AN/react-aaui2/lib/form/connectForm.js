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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _getDisplayName = require('../shared/getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

var _utils = require('../shared/utils');

var _validation = require('./validation');

var _module = require('./module');

var _module2 = _interopRequireDefault(_module);

var _types = require('./types');

var _injectL10n = require('../shared/injectL10n');

var _injectL10n2 = _interopRequireDefault(_injectL10n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aauiFormStore = (0, _keys2.default)(_types.FormStorePropTypes)[0];
var FormFieldConfig = {
  validator: function validator() {
    return function (validationResult) {
      return validationResult;
    };
  },
  parser: _utils.identity,
  formatter: _utils.identity
};
var connectForm = function connectForm() {
  var formFieldConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (WrappedComponent) {
    var Connect = function (_PureComponent) {
      (0, _inherits3.default)(Connect, _PureComponent);

      function Connect(props, context) {
        (0, _classCallCheck3.default)(this, Connect);

        var _this = (0, _possibleConstructorReturn3.default)(this, _PureComponent.call(this, props, context));

        _this.onValidate = function (value) {
          var _this$validate = _this.validate(value),
              errMsg = _this$validate.errMsg;

          _this.store.setError(_this.props.name, errMsg);
        };

        _this.setWrappedComponentInstance = function (ref) {
          _this.wrappedComponentInstance = ref;
        };

        _this.getApi = function () {
          return {
            onValidate: _this.onValidate,
            setValue: _this.boundSetValue,
            getValue: _this.boundGetValue,
            getValueByName: _this.boundGetValueByName,
            setError: _this.boundSetError,
            getError: _this.boundGetError,
            getErrorByName: _this.boundGetErrorByName,
            validateByName: _this.validateByName
          };
        };

        _this.validateByName = function (value, name) {
          return _this.store.validators[name](value);
        };

        _this.validate = function (value) {
          var _this$props = _this.props,
              name = _this$props.name,
              required = _this$props.required,
              validator = _this$props.validator,
              parser = _this$props.parser,
              rules = _this$props.rules,
              l10n = _this$props.l10n,
              rest = (0, _objectWithoutProperties3.default)(_this$props, ['name', 'required', 'validator', 'parser', 'rules', 'l10n']);

          var validators = [];

          validators.push(_validation.ruleRunner);

          // Here is for your custom validation function
          if (validator && typeof validator === 'function') {
            validators.push(validator);
          }

          var chain = validators.map(function (validateFunc) {
            return validateFunc((0, _extends3.default)({
              l10n: l10n,
              rules: required ? 'required|' + rules : rules
            }, rest));
          });

          var _reduceReducers = _utils.reduceReducers.apply(undefined, chain)(new _validation.ValidationResult(name, parser(value, { l10n: l10n }), null)),
              errMsg = _reduceReducers.errMsg;

          return {
            name: name,
            value: value,
            errMsg: errMsg
          };
        };

        _this.store = props[aauiFormStore] || context[aauiFormStore] || new _store2.default();

        _this.boundSetValue = _this.store.setValue.bind(_this, props.name);
        _this.boundGetValue = _this.store.getValue.bind(_this, props.name);
        _this.boundSetError = _this.store.setError.bind(_this, props.name);
        _this.boundGetError = _this.store.getError.bind(_this, props.name);
        _this.boundGetErrorByName = _this.store.getError.bind(_this);
        _this.boundGetValueByName = _this.store.getValue.bind(_this);
        _this.boundApi = _this.getApi();
        return _this;
      }

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!this.unregister) {
          this.unregister = this.store.injectReducer(this.props.name, _module2.default);
        }

        if (!this.unregisterValidator && this.store.tryInjectValidator) {
          this.unregisterValidator = this.store.tryInjectValidator(this.props.name, this.validate);
        }
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.unregister) {
          this.unregister(this.props.name);
        }

        this.unregister = null;

        if (this.unregisterValidator) {
          this.unregisterValidator(this.props.name);
        }

        this.unregisterValidator = null;
      };

      Connect.prototype.getWrappedComponentInstance = function getWrappedComponentInstance() {
        return this.wrappedComponentInstance;
      };

      Connect.prototype.render = function render() {
        // Filter out props and don't pass through the component hierarchy
        var _props = this.props,
            errMsg = _props.errMsg,
            formatter = _props.formatter,
            value = _props.value,
            rest = (0, _objectWithoutProperties3.default)(_props, ['errMsg', 'formatter', 'value']);


        var wrappedComponentProps = (0, _extends3.default)({
          ref: this.setWrappedComponentInstance,
          api: this.boundApi
        }, rest);

        if ('value' in this.props) {
          wrappedComponentProps = (0, _extends3.default)({}, wrappedComponentProps, {
            value: errMsg ? value : formatter(value, this.props)
          });
        }

        this.renderedElement = (0, _react.createElement)(WrappedComponent, (0, _utils.omit)(wrappedComponentProps, ['required', 'validator', 'parser']));

        return this.renderedElement;
      };

      return Connect;
    }(_react.PureComponent);

    Connect.displayName = 'Connect(' + (0, _getDisplayName2.default)(WrappedComponent) + ')';
    Connect.WrappedComponent = WrappedComponent;
    Connect.propTypes = (0, _extends3.default)({}, _types.FormFieldPropTypes);
    Connect.contextTypes = (0, _extends3.default)({}, _types.FormStorePropTypes);
    Connect.defaultProps = (0, _extends3.default)({}, FormFieldConfig, formFieldConfig);


    return (0, _injectL10n2.default)()(Connect);
  };
};

exports.default = connectForm;
module.exports = exports['default'];
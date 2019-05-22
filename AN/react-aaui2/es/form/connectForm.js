import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import { PureComponent, createElement } from 'react';

import Store from './store';
import getDisplayName from '../shared/getDisplayName';
import { identity, reduceReducers, omit } from '../shared/utils';
import { ValidationResult, ruleRunner } from './validation';
import reducer from './module';
import { FormFieldPropTypes, FormStorePropTypes } from './types';
import injectL10n from '../shared/injectL10n';

var aauiFormStore = _Object$keys(FormStorePropTypes)[0];
var FormFieldConfig = {
  validator: function validator() {
    return function (validationResult) {
      return validationResult;
    };
  },
  parser: identity,
  formatter: identity
};
var connectForm = function connectForm() {
  var formFieldConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (WrappedComponent) {
    var Connect = function (_PureComponent) {
      _inherits(Connect, _PureComponent);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props, context));

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
              rest = _objectWithoutProperties(_this$props, ['name', 'required', 'validator', 'parser', 'rules', 'l10n']);

          var validators = [];

          validators.push(ruleRunner);

          // Here is for your custom validation function
          if (validator && typeof validator === 'function') {
            validators.push(validator);
          }

          var chain = validators.map(function (validateFunc) {
            return validateFunc(_extends({
              l10n: l10n,
              rules: required ? 'required|' + rules : rules
            }, rest));
          });

          var _reduceReducers = reduceReducers.apply(undefined, chain)(new ValidationResult(name, parser(value, { l10n: l10n }), null)),
              errMsg = _reduceReducers.errMsg;

          return {
            name: name,
            value: value,
            errMsg: errMsg
          };
        };

        _this.store = props[aauiFormStore] || context[aauiFormStore] || new Store();

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
          this.unregister = this.store.injectReducer(this.props.name, reducer);
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
            rest = _objectWithoutProperties(_props, ['errMsg', 'formatter', 'value']);

        var wrappedComponentProps = _extends({
          ref: this.setWrappedComponentInstance,
          api: this.boundApi
        }, rest);

        if ('value' in this.props) {
          wrappedComponentProps = _extends({}, wrappedComponentProps, {
            value: errMsg ? value : formatter(value, this.props)
          });
        }

        this.renderedElement = createElement(WrappedComponent, omit(wrappedComponentProps, ['required', 'validator', 'parser']));

        return this.renderedElement;
      };

      return Connect;
    }(PureComponent);

    Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
    Connect.WrappedComponent = WrappedComponent;
    Connect.propTypes = _extends({}, FormFieldPropTypes);
    Connect.contextTypes = _extends({}, FormStorePropTypes);
    Connect.defaultProps = _extends({}, FormFieldConfig, formFieldConfig);


    return injectL10n()(Connect);
  };
};

export default connectForm;
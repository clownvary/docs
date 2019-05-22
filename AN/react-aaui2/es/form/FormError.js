import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import React, { PureComponent } from 'react';
import { string, func, array, node, oneOfType } from 'prop-types';

import getContext from '../shared/getContext';
import { FormStorePropTypes } from './types';
import { reduceFields } from './utils';
import Alert from '../alert';

var aauiFormStore = _Object$keys(FormStorePropTypes)[0];

export var FormError = function (_PureComponent) {
  _inherits(FormError, _PureComponent);

  function FormError(props, context) {
    _classCallCheck(this, FormError);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props, context));

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

      var _reduceFields = reduceFields(fields),
          errors = _reduceFields.errors,
          isValid = _reduceFields.isValid;

      _this.setState({ errors: errors, isValid: isValid });
    };

    _this.state = _extends({ errors: {}, isValid: true }, props);
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

    return !isValid && React.createElement(
      Alert,
      { type: 'danger', noClose: true },
      errorText,
      renderProp && renderProp(this.getFormErrorState())
    );
  };

  return FormError;
}(PureComponent);

FormError.displayName = 'FormError';
FormError.propTypes = {
  name: string,
  errorText: node,
  children: oneOfType([func, array])
};
FormError.defaultProps = {
  errorText: React.createElement(
    'strong',
    null,
    'Error'
  )
};
export default getContext(FormStorePropTypes)(FormError);